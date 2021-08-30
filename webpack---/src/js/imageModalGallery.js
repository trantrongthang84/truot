import {
    fixBody,
    unfixBody
} from "./fixBody";

const ImageModalGallery = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$galleryNodes = document.querySelectorAll(
            `[${_settings.el}=${_settings.handle}]:not(.swiper-slide-duplicate)`
        );

        _settings.$imageContainer = document.querySelector(
            `.${_settings.imageContainerClass}`
        );

        _settings.$next = _settings.$imageModal.querySelector(
            _settings.galleryNext
        );

        _settings.$prev = _settings.$imageModal.querySelector(
            _settings.galleryPrev
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
    <button class="image-modal-gallery__close-btn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="15px" height="15px" focusable="false"><title>Schließen</title><defs><style>.a{fill:#fff}</style></defs><path class="a" d="M14.286 0l.71417785.71417785-14.2856783 14.2856783-.71417785-.71417785z"/><path class="a" d="M15 14.286l-.71417785.71417785L.00014385.71449955.7143217.0003217z"/></svg>
		</button>
		<div class="image-modal-gallery__controls">
			<button class="image-modal-gallery__control image-modal-gallery__control--prev">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.707 12.707" width="26px" height="13px"><g fill="none" stroke="#fff"><path d="M25.707 6.354h-25"/><path d="M6.707 12.354l-6-6 6-6"/></g></svg>
			</button>
			<button class="image-modal-gallery__control image-modal-gallery__control--next">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.707 12.707" width="26px" height="13px"><g fill="none" stroke="#fff"><path d="M0 6.354h25"/><path d="M19 .354l6 6-6 6"/></g></svg>
			</button>
		</div>
    <div class="image-modal-gallery__image-container"></div>
    `;

        newModal.addEventListener("click", closeModal);

        document.body.appendChild(newModal);
        _settings.$imageModal = newModal;
    }

    function handleNext(e) {
        e.preventDefault();
        e.stopPropagation();

        changeImage(
            _settings.currentIndex == _settings.$galleryNodes.length - 1 ?
            0 :
            _settings.currentIndex + 1
        );
    }

    function handlePrev(e) {
        e.preventDefault();
        e.stopPropagation();

        changeImage(
            _settings.currentIndex == 0 ?
            _settings.$galleryNodes.length - 1 :
            _settings.currentIndex - 1
        );
    }

    function bindEvents() {
        _settings.$galleryNodes.forEach((el) =>
            el.addEventListener("click", handleClick)
        );
        _settings.$next.addEventListener("click", handleNext);
        _settings.$prev.addEventListener("click", handlePrev);
    }

    function handleClick(e) {
        e.preventDefault();

        _settings.$galleryNodes.forEach((el, i) => {
            if (el == e.target) _settings.currentIndex = i;
        });

        openModal();
    }

    function openModal() {
        if (window.innerWidth > 768) return;

        const currentNode = _settings.$galleryNodes[_settings.currentIndex];
        const image = currentNode.getAttribute(_settings.image);

        fixBody();
        _settings.$imageContainer.style.backgroundImage = `url(${image})`;
        _settings.$imageModal.style.display = "block";

        setTimeout(() => {
            _settings.$imageModal.classList.add(_settings.activeClass);
        }, 100);
    }

    function changeImage(index) {
        _settings.currentIndex = index;

        const newNode = _settings.$galleryNodes[_settings.currentIndex];
        const image = newNode.getAttribute(_settings.image);

        let imageEl = document.createElement("div");
        imageEl.style.backgroundImage = `url(${image})`;
        imageEl.classList.add(_settings.imageContainerClass);
        imageEl.classList.add(_settings.imageContainerHideClass);

        setTimeout(() => {
            _settings.$imageModal.appendChild(imageEl);
        }, 0);

        setTimeout(() => {
            imageEl.classList.remove(_settings.imageContainerHideClass);
        }, 100);

        setTimeout(() => {
            _settings.$imageModal.removeChild(_settings.$imageContainer);
            _settings.$imageContainer = imageEl;
        }, 1000);
    }

    function closeModal() {
        _settings.$imageModal.classList.remove(_settings.activeClass);

        setTimeout(() => {
            _settings.$imageModal.style.display = "";
            _settings.$imageModal.className = _settings.class;
            _settings.$imageContainer.style.backgroundImage = "";

            unfixBody();
        }, 500);
    }

    function init() {
        initModal();
        cacheDom();
        bindEvents();

        return _self;
    }

    return init();
};

export {
    ImageModalGallery
};