const RoomSelector = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {
        isActive: false,
        activeRoom: "all",
    };

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$el = document.querySelector(_settings.el);
        _settings.$items = _settings.$el.querySelectorAll(_settings.item);
        _settings.$roomItems = document.querySelectorAll(`[${_settings.roomItem}]`);
    }

    function bindEvents() {
        _settings.$el.addEventListener("click", handleClick);
        _settings.$items.forEach((el) => {
            el.addEventListener("click", handleRoomChange);
        });
    }

    function handleClick(e) {
        if (_settings.isActive) {
            hideContent();
        } else {
            showContent();
        }
    }

    function showContent() {
        _settings.$el.style.height = `${getTargetHeight()}px`;
        _settings.$el.classList.add(_settings.activeClass);

        _settings.isActive = true;
    }

    function hideContent() {
        _settings.$el.style.height = "";
        _settings.$el.classList.remove(_settings.activeClass);

        _settings.isActive = false;
    }

    function getTargetHeight() {
        let targetHeight = 0;

        const clonedEl = _settings.$el.cloneNode(true);

        clonedEl.style.opacity = 0;
        clonedEl.style.position = "fixed";
        clonedEl.style.height = "auto";

        document.body.appendChild(clonedEl);
        targetHeight = clonedEl.offsetHeight - 20;
        document.body.removeChild(clonedEl);

        return targetHeight;
    }

    function handleRoomChange(e) {
        const room = e.target.getAttribute(_settings.roomId);

        if (_settings.activeRoom !== room) {
            filterItems(room);

            setTimeout(() => {
                orderItems(room);
            }, 500);
        }
    }

    function filterItems(room) {
        setTimeout(() => {
            _settings.activeRoom = room;
            _settings.$roomItems.forEach((el) => {
                el.classList.add(_settings.roomItemHideClass);
                el.classList.remove(_settings.roomItemActiveClass);
            });
        }, 0);

        setTimeout(() => {
            _settings.$roomItems.forEach((el) => {
                const elType = el.getAttribute(_settings.roomItem);

                if (elType === room || room === "all") {
                    el.style.display = "";

                    setTimeout(() => {
                        if (room !== "all") el.classList.add(_settings.roomItemActiveClass);
                        el.classList.remove(_settings.roomItemHideClass);
                    }, 100);
                } else {
                    el.style.display = "none";
                }
            });
        }, 501);
    }

    function orderItems(first) {
        let index = 2;

        _settings.$items.forEach((el) => {
            const roomId = el.getAttribute(_settings.roomId);

            if (roomId == first) {
                el.style.order = 1;
                el.classList.add(_settings.itemActiveClass);
            } else {
                el.style.order = index;
                el.classList.remove(_settings.itemActiveClass);

                index++;
            }
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
    RoomSelector
};