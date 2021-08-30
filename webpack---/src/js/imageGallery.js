import {
    scrollTo
} from "./scrollTo";

const ImageGallery = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {
        activeCategory: false,
    };

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$el = document.querySelector(_settings.el);
        _settings.$categoryLinks = _settings.$el.querySelectorAll(
            `[${_settings.categoryLink}]`
        );
        _settings.$categoryImages = _settings.$el.querySelectorAll(
            `[${_settings.categoryImage}]`
        );
    }

    function bindEvents() {
        _settings.$categoryLinks.forEach((el) => {
            el.addEventListener("click", handleCategoryClick);
        });
    }

    function handleCategoryClick(e) {
        e.preventDefault();

        const category = e.target.getAttribute(_settings.categoryLink);

        setActiveCategory(category);
        filterImages();
        scrollTo(_settings.$el);
    }

    function setActiveCategory(category) {
        _settings.$categoryLinks.forEach((el) => {
            if (
                category == el.getAttribute(_settings.categoryLink) ||
                category == _settings.activeCategory
            ) {
                el.classList.remove(_settings.categoryInactiveClass);
            } else {
                el.classList.add(_settings.categoryInactiveClass);
            }
        });

        _settings.activeCategory =
            category == _settings.activeCategory ? false : category;
    }

    function filterImages() {
        _settings.$categoryImages.forEach((el) => {
            // fade out
            setTimeout(() => {
                el.classList.add(_settings.categoryImageInactiveClass);
            }, 0);

            // hide
            setTimeout(() => {
                el.style.display = "none";
            }, 500);

            // fade in
            setTimeout(() => {
                if (!_settings.activeCategory ||
                    _settings.activeCategory == el.getAttribute(_settings.categoryImage)
                ) {
                    el.style.display = "";
                    setTimeout(() => {
                        el.classList.remove(_settings.categoryImageInactiveClass);
                    }, 100);
                }
            }, 501);
        });
    }

    function init() {
        cacheDom();
        bindEvents();

        return _self;
    }

    return init();
};

export {
    ImageGallery
};