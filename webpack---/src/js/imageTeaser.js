const ImageTeaser = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$text = _settings.$el.querySelector(_settings.textEl);
    }

    function bindEvents() {
        window.addEventListener("resize", setPosition);
    }

    function setPosition() {
        const topValue = getStickyValue();

        if (topValue > 0) {
            _settings.$text.style.position = "sticky";
            _settings.$text.style.top = `${topValue}px`;
        } else {
            _settings.$text.style.position = "relative";
        }
    }

    function getStickyValue() {
        const winHeight = window.innerHeight;
        const elHeight = _settings.$text.clientHeight;

        return winHeight > elHeight ? (winHeight - elHeight) / 2 : 0;
    }

    function init() {
        cacheDom();
        bindEvents();
        setPosition();

        return _self;
    }

    return init();
};

export {
    ImageTeaser
};