import {
    addClass,
    removeClass
} from '../core/render/dom'
import { SwiperInstance } from '../core/index'
import { Options } from '../core/options'
import { State } from '../core/state/index'

export type SwiperPluginLazyloadOptions = {
    loadPrevNext: false
    loadPrevNextAmount: 1
    loadOnTransitionStart: false
    elementClass: 'swiper-lazy'
    loadingClass: 'swiper-lazy-loading'
    loadedClass: 'swiper-lazy-loaded'
    preloaderClass: 'swiper-lazy-preloader'
}

export type SwiperPluginLazyloadHTMLElement = HTMLImageElement & {
    isLoaded: boolean
}

/**
 * TinySwiper plugin for image lazy loading.
 *
 * @param {SwiperInstance} instance
 * @param {Options}
 */
export default function SwiperPluginLazyload (
    instance: SwiperInstance & {
        lazyload: {
            load (index: number): void
            loadRange (
                index: number,
                range: number
            ): void
        }
    },
    options: Options
) {
    if (!options.lazyload) return

    const lazyloadOptions = <SwiperPluginLazyloadOptions>options.lazyload
    const lazyload = {
        load (index: number): void {
            const $slide = instance.env.element.$list[index]

            if (!$slide) return

            const $imgs = [].slice.call($slide.getElementsByClassName(lazyloadOptions.elementClass))
            const $preloaders: HTMLElement[] = [].slice.call($slide.getElementsByClassName(lazyloadOptions.preloaderClass))

            function handleLoaded ($img: SwiperPluginLazyloadHTMLElement) {
                $img.removeAttribute('data-src')
                addClass($img, [lazyloadOptions.loadedClass])
                removeClass($img, [lazyloadOptions.loadingClass])
                $img.onload = null
                $img.onerror = null
                $img.isLoaded = true

                if ($imgs.every((item: SwiperPluginLazyloadHTMLElement) => item.isLoaded)) {
                    $preloaders.forEach(($preloader: HTMLElement) => {
                        $preloader.parentElement!.removeChild($preloader)
                    })
                }
            }

            $imgs.forEach(($img: SwiperPluginLazyloadHTMLElement) => {
                if (!$img.hasAttribute('data-src')) return

                const src = $img.getAttribute('data-src')

                addClass($img, [lazyloadOptions.loadingClass])
                removeClass($img, [lazyloadOptions.loadedClass])
                $img.src = src as string
                $img.onload = () => handleLoaded($img)
                $img.onerror = () => handleLoaded($img)
            })
        },

        loadRange (
            index: number,
            range: number
        ): void {
            lazyload.load(index)

            if (lazyloadOptions.loadPrevNext && range >= 1) {
                for (let i = 1; i <= range; i++) {
                    lazyload.load(index + i)
                    lazyload.load(index - i)
                }
            }
        }
    }

    instance.on('before-init', () => {
        options.lazyload = {
            loadPrevNext: false,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: false,
            elementClass: 'swiper-lazy',
            loadingClass: 'swiper-lazy-loading',
            loadedClass: 'swiper-lazy-loaded',
            preloaderClass: 'swiper-lazy-preloader',
            ...options.lazyload
        }
    })

    if (lazyloadOptions.loadOnTransitionStart) {
        instance.on('before-slide', (
            oldIndex: number,
            state: State,
            newIndex: number
        ) => {
            lazyload.loadRange(newIndex, lazyloadOptions.loadPrevNextAmount)
        })
    } else {
        instance.on('after-slide', (
            index: number
        ) => {
            lazyload.loadRange(index, lazyloadOptions.loadPrevNextAmount)
        })
    }

    instance.on('after-destroy', () => {
        if (!instance.lazyload) return

        delete instance.lazyload
    })
}
