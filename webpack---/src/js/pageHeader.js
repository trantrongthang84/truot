const PageHeader = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {
        pageHeaderScroll: 0,
        pageHeaderThreshold: 0,
    };

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$pageHeader = document.querySelector(_settings.pageHeader);
    }

    function initScrollNavigation() {
        _settings.$scrollHeader = _settings.$pageHeader.cloneNode(true);
        _settings.$scrollHeader.classList.add(_settings.pageHeaderScrollClass);
        _settings.$scrollHeader
            .querySelector(_settings.logo)
            .classList.add(_settings.logoScrollClass);

        _settings.$pageHeader.parentNode.insertBefore(
            _settings.$scrollHeader,
            _settings.$pageHeader.nextSibling
        );
    }

    function bindEvents() {
        window.addEventListener("scroll", handleScroll);
    }

    function handleScroll() {
        var st = window.pageYOffset || document.documentElement.scrollTop;

        if (st <= 200) {
            document.body.classList.remove(_settings.bodyScrollClass);
            document.body.classList.remove(_settings.bodyScrollUpClass);

            return;
        }

        if (st <= 600) {
            document.body.classList.remove(_settings.bodyScrollUpClass);

            return;
        }

        if (st < _settings.pageHeaderScroll) {
            if (st < _settings.pageHeaderThreshold - 200) {
                document.body.classList.add(_settings.bodyScrollClass);
                document.body.classList.add(_settings.bodyScrollUpClass);
            }
        } else {
            document.body.classList.remove(_settings.bodyScrollUpClass);
            document.body.classList.add(_settings.bodyScrollClass);

            _settings.pageHeaderThreshold = st <= 0 ? 0 : st;
        }

        _settings.pageHeaderScroll = st <= 0 ? 0 : st;
    }

    function init() {
        cacheDom();
        initScrollNavigation();
        bindEvents();

        return _self;
    }

    return init();
};

export {
    PageHeader
};