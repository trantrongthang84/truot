import debounce from "./debounce";

const RevealText = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$section = document.querySelector(`.${_settings.sectionClass}`);
        _settings.$paragraph = _settings.$section.querySelector(
            _settings.paragraph
        );
    }

    function bindEvents() {
        window.addEventListener("scroll", handleScroll);
    }

    var handleScroll = debounce(function() {
        if (
            window.scrollY + window.innerHeight >
            _settings.$section.getBoundingClientRect().top + window.pageYOffset
        ) {
            _settings.$section.classList.add(
                `${_settings.sectionClass}--in-viewport`
            );
        } else {
            _settings.$section.classList.remove(
                `${_settings.sectionClass}--in-viewport`
            );
        }
    }, 10);

    function splitLines() {
        var spans = _settings.$paragraph.children,
            top = 0,
            tmp = "";

        _settings.$paragraph.innerHTML = _settings.$paragraph.textContent.replace(
            /\S+/g,
            "<n>$&</n>"
        );

        for (let i = 0; i < spans.length; i++) {
            var rect = spans[i].getBoundingClientRect().top;

            if (top < rect) tmp += `</span><span class="${_settings.lineClass}">`;
            top = rect;

            tmp += spans[i].textContent + " ";
        }

        _settings.$paragraph.innerHTML = tmp += "</span>";
    }

    function init() {
        cacheDom();
        bindEvents();
        setTimeout(splitLines, 10);

        return _self;
    }

    return init();
};

export {
    RevealText
};