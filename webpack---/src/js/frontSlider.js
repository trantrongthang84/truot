import {
    Swiper,
    Navigation,
    EffectFade,
    Autoplay,
} from "swiper/js/swiper.esm.js";
import "swiper/css/swiper.min.css";

Swiper.use([Navigation, EffectFade, Autoplay]);

const FrontSlider = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$el = document.querySelector(_settings.el);
    }

    function bindEvents() {
        _settings.$el.addEventListener("mouseover", handleMouseOver);
        _settings.$el.addEventListener("mouseout", handleMouseOut);
    }

    function handleMouseOver() {
        _settings.slider.autoplay.stop();
    }

    function handleMouseOut() {
        _settings.slider.autoplay.start();
    }

    function initSwiper() {
        _settings.slider = new Swiper(_settings.el, {
            effect: "fade",
            speed: 3000,
            autoplay: {
                delay: 3500,
            },
            navigation: {
                nextEl: ".front-slider__navigation-item--next",
                prevEl: ".front-slider__navigation-item--prev",
            },
            allowTouchMove: true,
            breakpoints: {
                768: {
                    allowTouchMove: false,
                },
            },
            loop: true,
        });
    }

    function init() {
        cacheDom();
        initSwiper();
        bindEvents();

        return _self;
    }

    return init();
};

export {
    FrontSlider
};