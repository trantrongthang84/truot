import {
    Swiper,
    Navigation,
    Autoplay,
    Controller,
    EffectFade,
} from "swiper/js/swiper.esm.js";
import "swiper/css/swiper.min.css";
import debounce from "./debounce";

Swiper.use([Navigation, Autoplay, Controller, EffectFade]);

const ImageSlider = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {
        direction: false,
    };

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$section = document.querySelector(`.${_settings.sectionClass}`);
    }

    function bindEvents() {
        _settings.$section.addEventListener("mouseover", handleMouseOver);
        _settings.$section.addEventListener("mouseout", handleMouseOut);
        window.addEventListener("scroll", handleScroll);
    }

    var handleScroll = debounce(function() {
        if (
            window.scrollY + window.innerHeight >
            _settings.$section.getBoundingClientRect().top + window.pageYOffset
        ) {
            _settings.$section.classList.add(
                `${_settings.sectionClass}--in-viewport`
            );
        } else {
            _settings.$section.classList.remove(
                `${_settings.sectionClass}--in-viewport`
            );
        }
    }, 10);

    function handleMouseOver() {
        _settings.navigationSlider.autoplay.stop();
    }

    function handleMouseOut() {
        _settings.navigationSlider.autoplay.start();
    }

    function initImageSlider() {
        _settings.imageSlider = new Swiper(_settings.imageContainer, {
            speed: 500,
            loop: false,
            slidesPerView: 1,
            grabCursor: true,
            effect: "fade",
        });
    }

    function initNavigationSlider() {
        _settings.navigationSlider = new Swiper(_settings.el, {
            speed: 500,
            loop: false,
            centeredSlides: true,
            slideToClickedSlide: true,
            autoplay: {
                delay: 6000,
            },
            navigation: {
                nextEl: _settings.next,
                prevEl: _settings.prev,
            },
            breakpoints: {
                1550: {
                    slidesPerView: 7,
                    spaceBetween: 100,
                },
                1280: {
                    slidesPerView: 7,
                    spaceBetween: 50,
                },
                960: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    function setSliderController() {
        _settings.imageSlider.controller.control = _settings.navigationSlider;
        _settings.navigationSlider.controller.control = _settings.imageSlider;

        // _settings.imageSlider.on("slideChangeTransitionEnd", () => {
        // 	_settings.navigationSlider.slideTo(
        // 		_settings.imageSlider.realIndex,
        // 		500,
        // 		false
        // 	);
        // });

        // _settings.navigationSlider.on("slideChangeTransitionEnd", () => {
        // 	_settings.imageSlider.slideTo(
        // 		_settings.navigationSlider.realIndex,
        // 		500,
        // 		false
        // 	);
        // });
    }

    function init() {
        cacheDom();
        initImageSlider();
        initNavigationSlider();
        setSliderController();
        bindEvents();

        window.dispatchEvent(new Event("scroll"));

        return _self;
    }

    return init();
};

export {
    ImageSlider
};