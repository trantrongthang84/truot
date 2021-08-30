const ContactForm = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$el = document.querySelector(_settings.el);
        _settings.$formControls = _settings.$el.querySelectorAll(
            _settings.formControl
        );
        _settings.$formSelects = _settings.$el.querySelectorAll(
            _settings.formSelect
        );
        _settings.$checkboxContainers = _settings.$el.querySelectorAll(
            _settings.checkboxContainer
        );
    }

    function prepareCheckbox() {
        _settings.$checkboxContainers.forEach((el) => {
            const formLabel = el.querySelector("label");
            formLabel.classList.add(_settings.checkboxLabelClass);

            const checkBox = document.createElement("div");
            checkBox.classList.add(_settings.checkboxClass);
            formLabel.insertBefore(
                checkBox,
                formLabel.querySelector("input").nextSibling
            );
        });
    }

    function prepareSelect() {
        _settings.$formSelects.forEach((el) => {
            el.querySelector("option[selected]").setAttribute("disabled", "disabled");
        });
    }

    function addIndicators() {
        _settings.$formControls.forEach((el) => {
            const formIndicator = document.createElement("span");
            formIndicator.classList.add(_settings.indicatorClass);
            el.parentNode.insertBefore(formIndicator, el.nextSibling);
        });
    }

    function init() {
        cacheDom();
        addIndicators();
        prepareSelect();
        prepareCheckbox();

        return _self;
    }

    return init();
};

export {
    ContactForm
};