const ContentSlider = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {
        isActive: false,
    };

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$content = _settings.$el.querySelector(_settings.content);
    }

    function bindEvents() {
        _settings.$el.addEventListener("click", handleClick);
    }

    function prepareSlider() {
        _settings.$content.style.display = "none";
    }

    function handleClick(e) {
        if (e.target == _settings.$content) return;

        if (_settings.isActive) {
            if (_settings.onClose) _settings.onClose();
            _self.hideContent();
        } else {
            if (_settings.onOpen) _settings.onOpen();
            _self.showContent();
        }
    }

    _self.showContent = function() {
        const currHeight = _settings.$el.offsetHeight;

        _settings.$el.style.height = `${currHeight}px`;
        _settings.$el.style.height = `${currHeight + getContentHeight()}px`;
        _settings.$content.style.display = "block";

        _settings.$el.classList.add(_settings.activeClass);
        _settings.isActive = true;

        setTimeout(() => {
            _settings.$el.style.height = "";
        }, 500);
    };

    _self.hideContent = function() {
        const currHeight = _settings.$el.offsetHeight;

        _settings.$el.style.height = `${currHeight}px`;
        _settings.$el.style.height = `${currHeight - getContentHeight()}px`;

        _settings.$el.classList.remove(_settings.activeClass);
        _settings.isActive = false;

        setTimeout(() => {
            _settings.$el.style.height = "";
            _settings.$content.style.display = "none";
        }, 800);
    };

    function getContentHeight() {
        let contentHeight = 0;

        _settings.$content.style.opacity = 0;
        _settings.$content.style.position = "absolute";
        _settings.$content.style.display = "block";

        contentHeight = _settings.$content.offsetHeight;

        _settings.$content.style.opacity = "";
        _settings.$content.style.position = "";
        _settings.$content.style.display = "";

        return contentHeight;
    }

    function init() {
        cacheDom();
        prepareSlider();
        bindEvents();

        return _self;
    }

    return init();
};

export {
    ContentSlider
};