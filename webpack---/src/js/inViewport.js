import debounce from "./debounce";

const InViewport = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function bindEvents() {
        window.addEventListener("scroll", handleScroll);
    }

    var handleScroll = debounce(function() {
        if (
            window.scrollY + window.innerHeight >
            _settings.$el.getBoundingClientRect().top + window.pageYOffset
        ) {
            _settings.$el.classList.add(_settings.activeClass);
        } else {
            _settings.$el.classList.remove(_settings.activeClass);
        }
    }, 10);

    function init() {
        bindEvents();
        handleScroll();

        return _self;
    }

    return init();
};

export {
    InViewport
};