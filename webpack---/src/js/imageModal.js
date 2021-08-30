import {
    fixBody,
    unfixBody
} from "./fixBody";

const ImageModal = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$imageContainer = document.querySelector(
            _settings.imageContainer
        );
    }

    function initModal() {
        const existingModal = document.querySelector(`.${_settings.class}`);

        if (existingModal) {
            _settings.$imageModal = existingModal;
            return;
        }

        var newModal = document.createElement("div");
        newModal.classList.add(_settings.class);
        newModal.innerHTML = `
    <button class="image-modal__close-btn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="15px" height="15px" focusable="false"><title>Schließen</title><defs><style>.a{fill:#fff}</style></defs><path class="a" d="M14.286 0l.71417785.71417785-14.2856783 14.2856783-.71417785-.71417785z"/><path class="a" d="M15 14.286l-.71417785.71417785L.00014385.71449955.7143217.0003217z"/></svg>
		</button>
    <div class="image-modal__image-container"></div>
    `;

        newModal.addEventListener("click", closeModal);

        document.body.appendChild(newModal);
        _settings.$imageModal = newModal;
    }

    function bindEvents() {
        _settings.$el.addEventListener("click", handleClick);
    }

    function handleClick(e) {
        e.preventDefault();

        const image = _settings.$el.getAttribute(_settings.el);
        const width = _settings.$el.getAttribute(_settings.width);
        const height = _settings.$el.getAttribute(_settings.height);
        const orientation =
            parseInt(width) > parseInt(height) ? "landscape" : "portrait";

        openModal(image, width, height, orientation);
    }

    function openModal(image, width, height, orientation) {
        // fix body
        fixBody();

        // add classes
        _settings.$imageModal.classList.add(`${_settings.class}--${orientation}`);
        if (width) _settings.$imageContainer.style.maxWidth = `${width}px`;
        if (height) _settings.$imageContainer.style.maxHeight = `${height}px`;

        // load image
        _settings.$imageContainer.style.backgroundImage = `url(${image})`;

        // activate
        _settings.$imageModal.style.display = "block";

        // show
        setTimeout(() => {
            _settings.$imageModal.classList.add(_settings.activeClass);
        }, 100);
    }

    function closeModal() {
        // hide
        _settings.$imageModal.classList.remove(_settings.activeClass);

        setTimeout(() => {
            // deactivate
            _settings.$imageModal.style.display = "";

            // unload image
            _settings.$imageContainer.style.backgroundImage = "";
            _settings.$imageContainer.style.maxWidth = "";
            _settings.$imageContainer.style.maxHeight = "";

            // reset classes
            _settings.$imageModal.className = _settings.class;

            // unfix body
            unfixBody();
        }, 500);
    }

    function init() {
        if (_settings.$el.getAttribute(_settings.gallery)) return;

        initModal();
        cacheDom();
        bindEvents();

        return _self;
    }

    return init();
};

export {
    ImageModal
};