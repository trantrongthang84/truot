const ImageReveal = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {
        clicking: false,
    };

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$section = document.querySelector(_settings.section);
        _settings.$el = _settings.$section.querySelector(_settings.el);
        _settings.$image = _settings.$section.querySelector(_settings.image);
        _settings.$cursor = _settings.$section.querySelector(_settings.cursor);
    }

    function bindEvents() {
        _settings.$el.addEventListener("mousemove", handleMouseMove);
        _settings.$cursor.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        _settings.$el.addEventListener("touchmove", handleMouseMove);
        _settings.$cursor.addEventListener("touchstart", handleMouseDown);
        window.addEventListener("touchend", handleMouseUp);
    }

    function handleMouseMove(e) {
        const pageX = e.targetTouches ? e.targetTouches[0].clientX : e.pageX;
        const containerWidth = _settings.$el.offsetWidth;
        const absX = pageX - _settings.$el.offsetLeft;
        const relX = Math.round(100 / (containerWidth / absX));

        if (_settings.clicking) _settings.$image.style.width = relX + "%";
    }

    function handleMouseDown() {
        _settings.clicking = true;
        _settings.$cursor.classList.add(_settings.cursorClickedClass);
    }

    function handleMouseUp() {
        _settings.clicking = false;
        _settings.$cursor.classList.remove(_settings.cursorClickedClass);
    }

    function init() {
        cacheDom();
        bindEvents();

        return _self;
    }

    return init();
};

export {
    ImageReveal
};