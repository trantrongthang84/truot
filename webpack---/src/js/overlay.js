const Overlay = function(options) {
    "use strict";

    const _self = this;
    const _settings = options;

    function cacheDom() {
        _settings.$el = document.querySelector(_settings.el);
        _settings.$close = _settings.$el.querySelector(_settings.close);
        _settings.$links = _settings.$el.querySelectorAll(
            "a:not(" + _settings.close + ")"
        );
    }

    function bindEvents() {
        _settings.$el.addEventListener("click", closeOverlay);
        _settings.$close.addEventListener("click", closeOverlay);
        _settings.$links.forEach((link) => {
            link.addEventListener("click", setSessionStorage);
        });
    }

    function closeOverlay(e) {
        e.preventDefault();

        if (e.target == _settings.$el || e.target == _settings.$close) {
            _settings.$el.classList.remove(_settings.visibilityClass);
            document.body.style.overflow = null;
            setSessionStorage();
        }
    }

    function showOverlay() {
        if (!checkIfAlreadyWasRead()) {
            _settings.$el.style.display = "block";

            setTimeout(function() {
                _settings.$el.classList.add(_settings.visibilityClass);

                document.body.style.overflow = "hidden";
            }, 2000);
        }
    }

    function checkIfAlreadyWasRead() {
        if (sessionStorage.getItem("overlay_was_read") === "1") {
            return true;
        } else {
            return false;
        }
    }

    function setSessionStorage() {
        sessionStorage.setItem("overlay_was_read", "1");
    }

    function init() {
        cacheDom();
        bindEvents();
        showOverlay();

        return _self;
    }

    return init();
};

export {
    Overlay
};