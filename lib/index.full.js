!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Swiper=e()}(this,function(){"use strict";function i(){return(i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}function h(e,t){void 0===t&&(t=[]),Array.isArray(t)||(t=[t]),t.forEach(function(t){return!e.classList.contains(t)&&e.classList.add(t)})}function u(e,t){void 0===t&&(t=[]),Array.isArray(t)||(t=[t]),t.forEach(function(t){return e.classList.contains(t)&&e.classList.remove(t)})}function o(t,e){var i,n=getComputedStyle(t).transform.replace(/[a-z]|\(|\)|\s/g,"").split(",").map(parseFloat);return 16===n.length?i=n.slice(12,14):6===n.length&&(i=n.slice(4,6)),i[e?0:1]||0}var s=["INPUT","SELECT","OPTION","TEXTAREA","BUTTON","VIDEO"],t=function(){function n(t,e){e=n.formatConfig(e),t="string"==typeof t?document.body.querySelector(t):t,this.index=0,this.scrolling=!1,this.config=e,this.supportTouch=Boolean("ontouchstart"in window||0<window.navigator.maxTouchPoints||0<window.navigator.msMaxTouchPoints||window.DocumentTouch&&document instanceof DocumentTouch),this.$el=t,this.$wrapper=t.querySelector("."+e.wrapperClass),this.eventHub={},this.initPlugins(e.plugins||n.plugins),this.emit("before-init",this),this.initListener(),this.initTouchStatus(),this.initWheelStatus(),this.update(),this.attachListener(),this.emit("after-init",this),this.scroll(e.initialSlide)}n.use=function(t){n.plugins=t},n.formatConfig=function(t){void 0===t&&(t={});return t.mousewheel&&(t.mousewheel=i({invert:!1,sensitivity:1},t.mousewheel)),i({},{direction:"horizontal",touchRatio:1,touchAngle:45,longSwipesRatio:.5,initialSlide:0,loop:!1,mousewheel:!1,pagination:!1,passiveListeners:!0,resistance:!0,resistanceRatio:.85,speed:300,longSwipesMs:300,intermittent:0,spaceBetween:0,slidePrevClass:"swiper-slide-prev",slideNextClass:"swiper-slide-next",slideActiveClass:"swiper-slide-active",slideClass:"swiper-slide",wrapperClass:"swiper-wrapper",touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchMoveStopPropagation:!1,excludeElements:[]},{},t)};var t=n.prototype;return t.initPlugins=function(t){var e=this;(t||[]).forEach(function(t){return t(e)})},t.on=function(t,e){var i=this.eventHub;i[t]?i[t].push(e):i[t]=[e]},t.off=function(t,e){var i=this.eventHub;if(i[t]){var n=i[t].indexOf(e);-1<n&&i[t].splice(n,1)}},t.emit=function(t){for(var e=arguments.length,i=new Array(1<e?e-1:0),n=1;n<e;n++)i[n-1]=arguments[n];var s=this.eventHub;s[t]&&s[t].forEach(function(t){return t.apply(void 0,i)})},t.initListener=function(){var l=this,a=this.$wrapper,r=this.config,c=this.supportTouch;this.listeners={handleTouchStart:function(t){for(var e=0;e<r.excludeElements.length;e++)if(r.excludeElements[e].contains(t.target))return;l.initTouchStatus();var i=l.touchStatus,n=r.touchStartPreventDefault&&-1===s.indexOf(t.target.nodeName)||r.touchStartForcePreventDefault;i.startOffset=o(a,l.isHorizontal),l.transform(i.startOffset),a.style.transition="none",i.isTouchStart=!0,i.touchStartTime=Date.now(),i.touchTracks.push({x:c?t.touches[0].pageX:t.pageX,y:c?t.touches[0].pageY:t.pageY}),n&&!r.passiveListeners&&t.preventDefault()},handleTouchMove:function(t){var e=l.touchStatus,i=e.touchTracks;if(e.isTouchStart&&!e.isScrolling){r.touchMoveStopPropagation&&t.stopPropagation();var n={x:c?t.touches[0].pageX:t.pageX,y:c?t.touches[0].pageY:t.pageY},s={x:n.x-i[i.length-1].x,y:n.y-i[i.length-1].y};i.push(n);var a=180*Math.atan2(Math.abs(s.y),Math.abs(s.x))/Math.PI,o=0;l.isHorizontal?a<r.touchAngle||e.isTouching?(e.isTouching=!0,o=s.x,t.preventDefault()):e.isScrolling=!0:90-a<r.touchAngle||e.isTouching?(e.isTouching=!0,o=s.y,t.preventDefault()):e.isScrolling=!0,l.scrollPixel(o*r.touchRatio)}},handleTouchEnd:function(){if(l.touchStatus.isTouchStart){var t=l.index,e=l.slideSize,i=l.touchStatus,n=Date.now()-i.touchStartTime,s=o(a,l.isHorizontal)-i.startOffset;a.style.transition="transform ease "+r.speed+"ms",n>l.config.longSwipesMs?Math.abs(s)>=e*r.longSwipesRatio?l.scroll(0<s?t-1:t+1,!0):l.scroll(t,!0):0==s?l.scroll(t,!0):l.scroll(0<s?t-1:t+1,!0),l.initTouchStatus()}},handleWheel:function(t){var e=l.index,i=l.wheelStatus,n=t.deltaY;(0<Math.abs(n)-Math.abs(i.wheelDelta)||!i.wheeling)&&Math.abs(n)>=r.mousewheel.sensitivity&&l.scroll(0<n?e-1:e+1),i.wheelDelta=n,clearTimeout(i.wheelingTimer),i.wheeling=!0,i.wheelingTimer=setTimeout(function(){l.initWheelStatus()},200),t.preventDefault(),t.stopPropagation()}}},t.attachListener=function(){var t=this.$el,e=this.config,i=this.supportTouch,n=this.listeners,s=n.handleTouchStart,a=n.handleTouchMove,o=n.handleTouchEnd,l=n.handleWheel;i?(t.addEventListener("touchstart",s,{passive:e.passiveListeners,capture:!1},!1),t.addEventListener("touchmove",a),t.addEventListener("touchend",o),t.addEventListener("touchcancel",o)):(t.addEventListener("mousedown",s),document.addEventListener("mousemove",a),document.addEventListener("mouseup",o)),e.mousewheel&&t.addEventListener("wheel",l)},t.detachListener=function(){var t=this.$el,e=this.listeners,i=e.handleTouchStart,n=e.handleTouchMove,s=e.handleTouchEnd,a=e.handleWheel;t.removeEventListener("touchstart",i),t.removeEventListener("touchmove",n),t.removeEventListener("touchend",s),t.removeEventListener("touchcancel",s),t.removeEventListener("mousedown",i),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",s),t.removeEventListener("wheel",a)},t.transform=function(t){this.$wrapper.style.transform=this.isHorizontal?"translate3d("+t+"px, 0, 0)":"translate3d(0, "+t+"px, 0)"},t.scroll=function(t,e){var i=this;if(void 0===t&&(t=0),void 0===e&&(e=!1),!this.scrolling||e){var n=this.config,s=this.minIndex,a=this.maxIndex;t=t<s?s:a<t?a:t,this.emit("before-slide",this.index,this,t);var o=t*this.boxSize;this.scrolling=!0,this.transform(-o);var l=this.$list[t],r=this.$list[t-1],c=this.$list[t+1];l&&(h(l,n.slideActiveClass),u(l,[n.slidePrevClass,n.slideNextClass])),r&&(h(r,n.slidePrevClass),u(r,[n.slideActiveClass,n.slideNextClass])),c&&(h(c,n.slideNextClass),u(c,[n.slideActiveClass,n.slidePrevClass])),this.index=t,setTimeout(function(){i.scrolling=!1,i.emit("after-slide",t,i)},this.config.speed+this.config.intermittent)}},t.scrollPixel=function(t){var e=t.toExponential().split("e")[1],i=e<=0?Math.pow(10,-(e-1)):1;this.config.resistance&&(0<t&&0===this.index?t-=Math.pow(t*i,this.config.resistanceRatio)/i:t<0&&this.index===this.maxIndex&&(t+=Math.pow(-t*i,this.config.resistanceRatio)/i));var n=o(this.$wrapper,this.isHorizontal);this.transform(n+t)},t.initTouchStatus=function(){this.touchStatus={touchTracks:[],startOffset:0,touchStartTime:0,isTouchStart:!1,isScrolling:!1,isTouching:!1}},t.initWheelStatus=function(){this.wheelStatus={wheeling:!1,wheelDelta:0,wheelingTimer:!1}},t.update=function(){var e=this,t=this.$el,i=this.$wrapper,n=this.index,s=this.config,a=i.style,o="horizontal"===s.direction;this.isHorizontal=o,this.$list=[].slice.call(t.getElementsByClassName(s.slideClass)),this.minIndex=0,this.maxIndex=this.$list.length-1,this.slideSize=o?t.offsetWidth:t.offsetHeight,this.boxSize=this.slideSize+s.spaceBetween,this.$list.forEach(function(t){t.style[o?"width":"height"]=e.slideSize+"px",t.style[o?"margin-right":"margin-bottom"]=s.spaceBetween+"px"}),t.style.overflow="hidden",a.willChange="transform",a.transition="transform ease "+this.config.speed+"ms",a[o?"width":"height"]=this.boxSize*this.$list.length+"px",a.display="flex",a.flexDirection=o?"row":"column",this.transform(-n*this.boxSize)},t.destroy=function(){var t=this.$el,e=this.$wrapper,i=this.config.slideActiveClass;this.emit("before-destroy",this),this.$list.forEach(function(t){t.removeAttribute("style"),u(t,[i])}),e.removeAttribute("style"),t.removeAttribute("style"),this.detachListener(),this.emit("after-destroy",this),this.$el=null,this.$list=[],this.$wrapper=null,this.eventHub={},this.config=n.formatConfig()},n}();var e=[function(a){var o=a.config;o.lazyload&&(a.lazyload={load:function(t){var e=a.$list[t];if(e){var i=[].slice.call(e.getElementsByClassName(o.lazyload.elementClass)),n=[].slice.call(e.getElementsByClassName(o.lazyload.preloaderClass));i.forEach(function(t){if(t.hasAttribute("data-src")){var e=t.getAttribute("data-src");h(t,[o.lazyload.loadingClass]),u(t,[o.lazyload.loadedClass]),t.src=e,t.onload=function(){return s(t)},t.onerror=function(){return s(t)}}})}function s(t){t.removeAttribute("data-src"),h(t,[o.lazyload.loadedClass]),u(t,[o.lazyload.loadingClass]),t.onloaded=null,t.onerror=null,t.isLoaded=!0,i.every(function(t){return t.isLoaded})&&n.forEach(function(t){t.parentElement.removeChild(t)})}},loadRange:function(t,e){if(a.lazyload.load(t),o.lazyload.loadPrevNext&&1<=e)for(var i=1;i<=e;i++)a.lazyload.load(t+i),a.lazyload.load(t-i)}},a.on("before-init",function(){o.lazyload=i({loadPrevNext:!1,loadPrevNextAmount:1,loadOnTransitionStart:!1,elementClass:"swiper-lazy",loadingClass:"swiper-lazy-loading",loadedClass:"swiper-lazy-loaded",preloaderClass:"swiper-lazy-preloader"},o.lazyload)}),o.lazyload.loadOnTransitionStart?a.on("before-slide",function(t,e,i){e.lazyload.loadRange(i,o.lazyload.loadPrevNextAmount)}):a.on("after-slide",function(t,e){e.lazyload.loadRange(t,o.lazyload.loadPrevNextAmount)}),a.on("after-destroy",function(t){t.config.lazyload&&delete t.lazyload}))},function(t){t.on("before-init",function(t){var e=t.config;e.pagination&&(e.pagination=i({clickable:!1,bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active"},e.pagination))}),t.on("after-init",function(n){var t=n.config;if(t.pagination){var e=t.pagination,s=e.bulletClass,a=e.bulletActiveClass,i="string"==typeof t.pagination.el?document.body.querySelector(t.pagination.el):t.pagination.el,o=[],l=document.createDocumentFragment();t.excludeElements.push(i),n.$pagination=i,n.$pageList=o,n.$list.forEach(function(t,e){var i=document.createElement("div");h(i,e===n.index?[s,a]:s),o.push(i),l.appendChild(i)}),i.appendChild(l),t.pagination.clickable&&i.addEventListener("click",function(t){n.scroll(o.indexOf(t.target)),t.stopPropagation()})}}),t.on("after-destroy",function(t){t.config.pagination&&(t.$pagination.innerHTML="",t.$pageList=[],t.$pagination=null)}),t.on("after-slide",function(i,t){var n=t.config.pagination.bulletActiveClass;t.$pageList&&t.$pageList.forEach(function(t,e){e===i?h(t,n):u(t,n)})})}];return t.use(e),t});