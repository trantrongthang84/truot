const PageTransitions = (function() {
    "use strict";

    function prepareDocument() {
        setTimeout(() => {
            document.body.classList.add("body--ready");
        }, 10);
    }

    function setTransitionListeners() {
        const linkEl = document.querySelectorAll(
            'a[href^="' +
            window.location.origin +
            '"]:not(.no-transition), a[href^="/"]:not(.no-transition)'
        );

        for (const item of linkEl) {
            if (
                item.href &&
                item.href !== window.location.href &&
                item.href.indexOf("#") == -1 &&
                item.href.indexOf("mailto") !== 0 &&
                !item.hasAttribute("target") &&
                !item.parentNode.classList.contains("no-transition")
            ) {
                item.addEventListener("click", (e) => {
                    if (e.ctrlKey || e.altKey || e.metaKey) return;

                    e.preventDefault();

                    document.body.classList.remove("body--ready");
                    document.body.classList.add("body--leaving");

                    setTimeout(() => {
                        window.location.href = item.href;
                    }, 300);
                });
            }
        }
    }

    function init() {
        prepareDocument();
        setTransitionListeners();
    }

    return {
        init,
    };
})();

export {
    PageTransitions
};