import {
    Swiper,
    Navigation
} from "swiper/js/swiper.esm.js";
import "swiper/css/swiper.min.css";
import debounce from "./debounce";

Swiper.use([Navigation]);

const RoomSlider = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$section = document.querySelector(`.${_settings.sectionClass}`);
        _settings.$el = _settings.$section.querySelector(_settings.el);
        _settings.$cursor = _settings.$section.querySelector(_settings.cursor);
        _settings.$typeLink = _settings.$section.querySelectorAll(
            `[${_settings.typeLink}]`
        );
    }

    function bindEvents() {
        document
            .querySelectorAll(`[${_settings.typeLink}]`)
            .forEach((el) => el.addEventListener("click", handleTypeLinkClick));

        if (window.innerWidth > 768) {
            _settings.$el.addEventListener("mouseover", handleMouseOver);
            _settings.$el.addEventListener("mouseout", handleMouseOut);
            _settings.$el.addEventListener("mousemove", handleMouseMove);
            _settings.$el.addEventListener("mousedown", handleMouseDown);
            _settings.$el.addEventListener("mouseup", handleMouseUp);
        }

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

    function handleTypeLinkClick(e) {
        e.preventDefault();

        const type = e.target.getAttribute(_settings.typeLink);

        activateType(type);
        slideToType(type);
    }

    function handleSlideChange() {
        const currentIndex = _settings.slider.isEnd ?
            _settings.slider.slides.length - 1 :
            _settings.slider.activeIndex;
        const currentType = _settings.slider.slides[currentIndex].getAttribute(
            _settings.typeClass
        );

        activateType(currentType);
    }

    function handleMouseOver() {
        _settings.$cursor.classList.add(_settings.cursorActiveClass);
    }

    function handleMouseOut() {
        _settings.$cursor.classList.remove(_settings.cursorActiveClass);
    }

    function handleMouseMove(e) {
        const containerWidth = _settings.$el.offsetWidth;
        const containerHeight = _settings.$el.offsetHeight;

        const absX = e.pageX - _settings.$el.offsetLeft;
        const absY = e.pageY - _settings.$el.offsetTop;

        const relX = Math.round(100 / (containerWidth / absX));
        const relY = Math.round(100 / (containerHeight / absY));

        _settings.$cursor.style.top = relY + "%";
        _settings.$cursor.style.left = relX + "%";
    }

    function handleMouseDown() {
        _settings.$cursor.classList.add(_settings.cursorClickedClass);
    }

    function handleMouseUp() {
        _settings.$cursor.classList.remove(_settings.cursorClickedClass);
    }

    function activateType(type) {
        _settings.$typeLink.forEach((el) => {
            if (el.getAttribute(_settings.typeLink) == type) {
                el.classList.add(_settings.typeActiveClass);
            } else {
                el.classList.remove(_settings.typeActiveClass);
            }
        });
    }

    function initSwiper() {
        _settings.slider = new Swiper(_settings.el, {
            speed: 200,
            spaceBetween: 24,
            grabCursor: true,
            navigation: {
                nextEl: _settings.next,
                prevEl: _settings.prev,
            },
            breakpoints: {
                1281: {
                    slidesPerView: 3.2,
                },
                961: {
                    slidesPerView: 2.5,
                },
                769: {
                    slidesPerView: 2.1,
                },
                461: {
                    slidesPerView: 1.2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
            on: {
                slideChange() {
                    handleSlideChange();
                },
                reachEnd() {
                    handleSlideChange();
                },
            },
        });
    }

    function slideToType(type) {
        for (let i = 0; i < _settings.slider.slides.length; i++) {
            if (
                type === _settings.slider.slides[i].getAttribute(_settings.typeClass)
            ) {
                _settings.slider.slideTo(i, 500);
                break;
            }
        }
    }

    function init() {
        cacheDom();
        bindEvents();
        initSwiper();

        return _self;
    }

    return init();
};

export {
    RoomSlider
};