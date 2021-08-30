import {
    Swiper,
    Autoplay
} from "swiper/js/swiper.esm.js";
import "swiper/css/swiper.min.css";

Swiper.use([Autoplay]);

const ImageSlideshow = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$el = document.querySelector(_settings.el);
    }

    function bindEvents() {}

    function initSwiper() {
        _settings.slider = new Swiper(_settings.el, {
            speed: 6000,
            slidesPerView: "auto",
            loop: true,
            loopedSlides: 5,
            allowTouchMove: false,
            centeredSlides: true,
            autoplay: {
                delay: 0,
            },
            breakpoints: {
                0: {
                    spaceBetween: 24,
                },
                769: {
                    spaceBetween: 166,
                },
            },
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
    ImageSlideshow
};