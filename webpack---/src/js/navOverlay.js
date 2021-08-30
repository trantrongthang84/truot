const NavOverlay = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$el = document.querySelector(_settings.el);
        _settings.$openButtons = document.querySelectorAll(_settings.openButton);
        _settings.$closeButton = _settings.$el.querySelector(_settings.closeButton);
    }

    function bindEvents() {
        _settings.$openButtons.forEach((el) => {
            el.addEventListener("click", openNavigation);
        });

        _settings.$closeButton.addEventListener("click", closeNavigation);
    }

    function openNavigation(e) {
        e.preventDefault();

        _settings.$el.classList.add(_settings.activeClass);
    }

    function closeNavigation(e) {
        e.preventDefault();

        _settings.$el.classList.remove(_settings.activeClass);
    }

    function init() {
        cacheDom();
        bindEvents();

        return _self;
    }

    return init();
};

export {
    NavOverlay
};