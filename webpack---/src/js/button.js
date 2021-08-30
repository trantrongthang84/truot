const Button = function(options) {
    "use strict";

    const _self = this;
    const settings = options;

    const charClass = "character";
    const charClassActive = "character--active";
    const charClassOut = "character--out";
    const charDelay = 20;

    function prepareButton() {
        settings.el.innerHTML = settings.el.innerHTML
            .trim()
            .split("")
            .map(
                (c) =>
                `<span class="${settings.prefix}__${charClass}">${
						c === " " ? "&nbsp;" : c
					}</span>`
            )
            .join("");
    }

    function bindEvents() {
        settings.el.addEventListener("mouseover", handleMouseOver);
        settings.el.addEventListener("mouseout", handleMouseOut);
    }

    function handleMouseOver() {
        settings.el
            .querySelectorAll(`.${settings.prefix}__${charClass}`)
            .forEach((char, i) =>
                setTimeout(() => addActiveClass(char), i * charDelay)
            );
    }

    function handleMouseOut() {
        settings.el
            .querySelectorAll(`.${settings.prefix}__${charClass}`)
            .forEach((char, i) =>
                setTimeout(() => removeActiveClass(char), i * charDelay)
            );
    }

    function addActiveClass(el) {
        el.classList.remove(`${settings.prefix}__${charClassOut}`);
        el.classList.add(`${settings.prefix}__${charClassActive}`);
    }

    function removeActiveClass(el) {
        el.classList.remove(`${settings.prefix}__${charClassActive}`);
        el.classList.add(`${settings.prefix}__${charClassOut}`);
    }

    function init() {
        bindEvents();
        prepareButton();

        return _self;
    }

    return init();
};

export {
    Button
};