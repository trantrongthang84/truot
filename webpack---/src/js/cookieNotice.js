const CookieNotice = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function checkCookies() {
        if (document.body.classList.contains(_settings.cookiesNotSetClass))
            checkBar();
    }

    function checkBar() {
        if (document.querySelector(_settings.el)) {
            setStrings();
            return;
        }

        setTimeout(checkBar, 100);
    }

    function setStrings() {
        document.querySelector(_settings.textContainer).innerHTML =
            window.STRINGS.cookieNoticeText;
        document.querySelector(_settings.buttonContainer).innerHTML =
            window.STRINGS.cookieNoticeButtonText;
    }

    function init() {
        checkCookies();

        return _self;
    }

    return init();
};

export {
    CookieNotice
};