const RoomPricing = function(settings) {
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

    function handleClick(e) {
        if (e.target == _settings.$content || window.innerWidth > 768) return;

        if (_settings.isActive) {
            if (_settings.onClose) _settings.onClose();
            hideContent();
        } else {
            if (_settings.onOpen) _settings.onOpen();
            showContent();
        }
    }

    function showContent() {
        const currHeight = _settings.$el.offsetHeight;

        _settings.$el.style.height = `${currHeight}px`;
        _settings.$el.style.height = `${currHeight + getContentHeight()}px`;
        _settings.$content.style.display = "block";

        _settings.$el.classList.add(_settings.activeClass);
        _settings.isActive = true;

        setTimeout(() => {
            _settings.$el.style.height = "";
        }, 500);
    }

    function hideContent() {
        const currHeight = _settings.$el.offsetHeight;

        _settings.$el.style.height = `${currHeight}px`;
        _settings.$el.style.height = `${currHeight - getContentHeight()}px`;
        _settings.$content.style.display = "block";

        _settings.$el.classList.remove(_settings.activeClass);
        _settings.isActive = false;

        setTimeout(() => {
            _settings.$el.style.height = "";
            _settings.$content.style.display = "";
        }, 500);
    }

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
        bindEvents();

        return _self;
    }

    return init();
};

export {
    RoomPricing
};