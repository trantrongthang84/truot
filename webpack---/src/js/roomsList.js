import {
    scrollTo
} from "./scrollTo";

const RoomsList = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$section = document.querySelector(_settings.section);
        _settings.$list = _settings.$section.querySelector(_settings.list);
        _settings.$roomLink = _settings.$section.querySelectorAll(
            `[${_settings.roomLink}]`
        );
        _settings.$roomItem = _settings.$section.querySelectorAll(
            `[${_settings.roomItem}]`
        );
        _settings.$typeSelect = _settings.$section.querySelector(
            _settings.typeSelect
        );
    }

    function bindEvents() {
        window.addEventListener("scroll", handleScroll);

        _settings.$roomLink.forEach((el) => {
            el.addEventListener("click", handleRoomLinkClick);
        });
    }

    function handleScroll(e) {
        if (window.innerWidth > 1280) {
            checkItemPosition();
        }
    }

    function checkItemPosition() {
        let lowestPosition = 1000;
        let lowestItem = false;

        _settings.$roomItem.forEach((el) => {
            const topPos = el.getBoundingClientRect().top;

            if (topPos > 0 && topPos < lowestPosition) {
                lowestPosition = topPos;
                lowestItem = el.getAttribute(_settings.roomItem);
            }
        });

        if (lowestItem) setActiveLink(lowestItem);
    }

    function handleRoomLinkClick(e) {
        e.preventDefault();

        const roomId = e.target.getAttribute(_settings.roomLink);
        const roomEl = document.querySelector(`[${_settings.roomItem}=${roomId}]`);

        scrollTo(roomEl, 200);
    }

    function setActiveLink(roomId) {
        _settings.$roomLink.forEach((el) => {
            roomId === el.getAttribute(_settings.roomLink) ?
                el.classList.add(_settings.roomLinkActiveClass) :
                el.classList.remove(_settings.roomLinkActiveClass);
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
    RoomsList
};