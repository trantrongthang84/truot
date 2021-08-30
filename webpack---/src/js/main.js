import "core-js/stable";
require("get-root-node-polyfill/implement");

import "../scss/main.scss";

import {
    PageTransitions
} from "./pageTransitions";
import {
    DetectIE
} from "./detectIE";
import {
    NavOverlay
} from "./navOverlay";
import {
    PageHeader
} from "./pageHeader";
import {
    NewsletterForm
} from "./newsletterForm";
import {
    Button
} from "./button";
import {
    FrontSlider
} from "./frontSlider";
import {
    BookingForm
} from "./bookingForm";
import {
    RoomSlider
} from "./roomSlider";
import {
    RoomsList
} from "./roomsList";
import {
    ImageTeaser
} from "./imageTeaser";
import {
    ImageSlider
} from "./imageSlider";
import {
    ImageSlideshow
} from "./imageSlideshow";
// import { RoomGallery } from "./roomGallery";
import {
    scrollTo
} from "./scrollTo";
import {
    ContentSlider
} from "./contentSlider";
import {
    RoomSelector
} from "./roomSelector";
import {
    RoomPricing
} from "./roomPricing";
import {
    ImageGallery
} from "./imageGallery";
import {
    ImageModal
} from "./imageModal";
import {
    ImageModalGallery
} from "./imageModalGallery";
import {
    ContactForm
} from "./contactForm";
import {
    CookieNotice
} from "./cookieNotice";
import {
    RevealText
} from "./revealText";
import {
    InViewport
} from "./inViewport";
import {
    ImageReveal
} from "./imageReveal";
import {
    Datepicker
} from "./datepicker";
import {
    Overlay
} from "./overlay";

// prevent firefox from caching pages on back button
window.onunload = function() {};

// prevent ios from caching pages on back button
window.onpageshow = function(e) {
    if (e.persisted) window.location.reload();
};

(function() {
    PageTransitions.init();
    DetectIE.init();

    if (document.querySelector(".page-header")) {
        new PageHeader({
            pageHeader: ".page-header",
            pageHeaderScrollClass: "page-header--scroll",
            bodyScrollClass: "body--scroll",
            bodyScrollUpClass: "body--scroll-up",
            bodyScrollDownClass: "body--scroll-down",
            logo: ".header-logo",
            logoScrollClass: "header-logo--scroll"
        });
    }

    if (document.querySelector(".newsletter-form")) {
        new NewsletterForm({
            el: ".newsletter-form",
            successClass: "newsletter-form--success",
            errorClass: "newsletter-form--error",
            firstName: "#newsletter-first-name",
            lastName: "#newsletter-last-name",
            mail: "#newsletter-mail",
            acceptance: "#newsletter-policy",
            requireAcceptance: true,
            apiUrl: "https://frontend.casablanca.at/de/api/A_8970_DASBL/c_COMP1/NMS/TrySubscribe"
        });
    }

    if (document.querySelector(".newsletter-cancellation")) {
        new NewsletterForm({
            el: ".newsletter-cancellation",
            successClass: "newsletter-cancellation--success",
            errorClass: "newsletter-cancellation--error",
            mail: "#newsletter-cancellation-email",
            apiUrl: "https://frontend.casablanca.at/de/api/A_8970_DASBL/c_COMP1/NMS/TryUnsubscribe"
        });
    }

    if (document.querySelector(".nav-overlay")) {
        new NavOverlay({
            el: ".nav-overlay",
            activeClass: "nav-overlay--active",
            openButton: ".page-header__menu-toggle",
            closeButton: ".nav-overlay__close",
            closeButtonHide: "nav-overlay__close--hide"
        });
    }

    document.querySelectorAll(".brand-button").forEach((el) => {
        new Button({
            el,
            prefix: "brand-button"
        });
    });

    if (document.querySelector(".content-button")) {
        document.querySelectorAll(".content-button").forEach((el) => {
            new Button({
                el,
                prefix: "content-button"
            });
        });
    }

    document.querySelectorAll("[data-scroll-to]").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();

            const scrollTarget = el.getAttribute("data-scroll-to");
            const scrollOffset = el.getAttribute("data-scroll-offset") || 0;
            const scrollEl = isNaN(scrollTarget) ?
                document.querySelector(scrollTarget) :
                parseInt(scrollTarget);

            scrollTo(scrollEl, scrollOffset);
        });
    });

    if (document.querySelector(".front-slider__container")) {
        new FrontSlider({
            el: ".front-slider__container",
            pagination: ".front-slider__pagination"
        });
    }

    if (document.querySelector(".booking-form")) {
        new BookingForm({
            form: ".booking-form",
            start: "#booking-form__start-date",
            end: "#booking-form__end-date",
            persons: "#booking-form__persons"
        });
    }

    if (document.querySelector(".room-slider")) {
        new RoomSlider({
            sectionClass: "room-slider",
            el: ".room-slider__container",
            next: ".room-slider__navigation-item--next",
            prev: ".room-slider__navigation-item--prev",
            typeLink: "data-room-type-link",
            typeClass: "data-room-type",
            typeActiveClass: "room-slider__type-link--active",
            cursor: ".room-slider__cursor",
            cursorActiveClass: "room-slider__cursor--active",
            cursorClickedClass: "room-slider__cursor--clicked"
        });
    }

    if (document.querySelector(".rooms-list")) {
        new RoomsList({
            section: ".rooms-list",
            roomLink: "data-room-link",
            roomLinkActiveClass: "rooms-list__navigation-link--active",
            roomItem: "data-room-item"
        });
    }

    if (document.querySelector(".image-teaser")) {
        document.querySelectorAll(".image-teaser").forEach((el) => {
            if (!el.classList.contains("image-teaser--static")) {
                new ImageTeaser({
                    $el: el,
                    textEl: ".image-teaser__text",
                    scrollElClass: "image-teaser__scroll"
                });
            }
        });
    }

    if (document.querySelector(".image-slider")) {
        new ImageSlider({
            sectionClass: "image-slider",
            el: ".image-slider__container",
            next: ".image-slider__navigation-item--next",
            prev: ".image-slider__navigation-item--prev",
            imageContainer: ".image-slider__image-backgrounds"
        });
    }

    if (document.querySelector(".image-slideshow")) {
        new ImageSlideshow({
            el: ".image-slideshow__container"
        });
    }

    // if (document.querySelector(".room-gallery")) {
    // 	new RoomGallery({
    // 		section: ".room-gallery",
    // 		el: ".room-gallery__container",
    // 		next: ".room-gallery__navigation-item--next",
    // 		prev: ".room-gallery__navigation-item--prev",
    // 		imageContainer: ".room-gallery__image-backgrounds",
    // 		imageClass: "room-gallery__image",
    // 		imageActiveClass: "room-gallery__image--active",
    // 		backgroundImage: "data-room-gallery-background",
    // 	});
    // }

    if (document.querySelector(".content-slider")) {
        const contentSliders = [];

        document.querySelectorAll(".content-slider").forEach((el, elIndex) => {
            const contentSlider = new ContentSlider({
                $el: el,
                activeClass: "content-slider--active",
                content: ".content-slider__content",
                onOpen() {
                    contentSliders.forEach((slider, sliderIndex) => {
                        if (elIndex !== sliderIndex) slider.hideContent();
                    });
                }
            });

            contentSliders.push(contentSlider);
        });
    }

    if (document.querySelector(".room-pricing__table")) {
        document.querySelectorAll(".room-pricing__table").forEach((el) => {
            new RoomPricing({
                $el: el,
                activeClass: "room-pricing__table--active",
                content: ".room-pricing__container"
            });
        });
    }

    if (document.querySelector(".room-selector")) {
        new RoomSelector({
            el: ".room-selector",
            activeClass: "room-selector--active",
            item: ".room-selector__item",
            itemActiveClass: "room-selector__item--active",
            roomId: "data-room-selector-id",
            roomItem: "data-room-item",
            roomItemHideClass: "rooms-list__item--hide",
            roomItemActiveClass: "rooms-list__item--active"
        });
    }

    if (document.querySelector(".image-gallery")) {
        new ImageGallery({
            el: ".image-gallery",
            categoryLink: "data-image-gallery-category-link",
            categoryInactiveClass: "image-gallery__link--inactive",
            categoryImage: "data-image-gallery-category-image",
            categoryImageInactiveClass: "image-gallery__image-item--inactive"
        });
    }

    if (document.querySelector("[data-image-modal]")) {
        document.querySelectorAll("[data-image-modal]").forEach((el) => {
            new ImageModal({
                el: "data-image-modal",
                $el: el,
                class: "image-modal",
                activeClass: "image-modal--active",
                width: "data-image-modal-width",
                height: "data-image-modal-height",
                imageContainer: ".image-modal__image-container",
                closeButton: ".image-modal__close-btn",
                gallery: "data-image-modal-gallery"
            });
        });
    }

    if (document.querySelector("[data-image-modal-gallery]")) {
        const imageGalleries = [];

        document
            .querySelectorAll("[data-image-modal-gallery]")
            .forEach((el) => {
                const galleryHandle = el.getAttribute(
                    "data-image-modal-gallery"
                );
                if (galleryHandle && imageGalleries.indexOf(galleryHandle) < 0)
                    imageGalleries.push(galleryHandle);
            });

        imageGalleries.forEach((handle) => {
            new ImageModalGallery({
                handle,
                el: "data-image-modal-gallery",
                image: "data-image-modal-gallery-image",
                class: "image-modal-gallery",
                activeClass: "image-modal-gallery--active",
                width: "data-image-modal-width",
                height: "data-image-modal-height",
                imageContainerClass: "image-modal-gallery__image-container",
                imageContainerHideClass: "image-modal-gallery__image-container--hide",
                closeButton: ".image-modal-gallery__close-btn",
                galleryNext: ".image-modal-gallery__control--next",
                galleryPrev: ".image-modal-gallery__control--prev"
            });
        });
    }

    if (document.querySelector(".wpcf7-form")) {
        new ContactForm({
            el: ".wpcf7-form",
            formControl: ".wpcf7-form-control",
            indicatorClass: "form__input-indicator",
            formSelect: ".wpcf7-select",
            checkboxContainer: ".wpcf7-acceptance",
            checkboxLabelClass: "form__checkbox-container",
            checkboxClass: "form__checkbox"
        });
    }

    if (document.querySelector(".reveal-text")) {
        new RevealText({
            sectionClass: "reveal-text",
            paragraph: ".reveal-text__paragraph",
            lineClass: "reveal-text__part"
        });
    }

    if (document.querySelector(".in-viewport")) {
        document.querySelectorAll(".in-viewport").forEach((el) => {
            new InViewport({
                $el: el,
                activeClass: "in-viewport--active"
            });
        });
    }

    new CookieNotice({
        el: "#cookie-notice",
        cookiesNotSetClass: "cookies-not-set",
        textContainer: "#cn-notice-text",
        buttonContainer: "#cn-accept-cookie"
    });

    if (document.querySelector(".image-reveal")) {
        new ImageReveal({
            section: ".image-reveal",
            el: ".image-reveal__content",
            image: ".image-reveal__image--right",
            cursor: ".image-reveal__cursor",
            cursorActiveClass: "image-reveal__cursor--active",
            cursorClickedClass: "image-reveal__cursor--clicked"
        });
    }

    if (document.querySelector(".datepicker-form")) {
        new Datepicker({
            datepicker: ".datepicker-form .datepicker"
        });
    }

    if (document.querySelector(".overlay")) {
        new Overlay({
            el: ".overlay",
            close: ".overlay__close",
            visibilityClass: "overlay--visible"
        });
    }
})();