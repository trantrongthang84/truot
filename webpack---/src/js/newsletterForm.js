const NewsletterForm = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {};

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$el = document.querySelector(_settings.el);
    }

    function bindEvents() {
        _settings.$el.addEventListener("submit", handleSubmit);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = {};

        if (
            _settings.requireAcceptance &&
            !_settings.$el.querySelector(_settings.acceptance).checked
        )
            return;
        if (
            _settings.$el.querySelector(_settings.firstName) &&
            _settings.$el.querySelector(_settings.firstName).value
        )
            formData["Prename"] = _settings.$el.querySelector(
                _settings.firstName
            ).value;
        if (
            _settings.$el.querySelector(_settings.lastName) &&
            _settings.$el.querySelector(_settings.lastName).value
        )
            formData["Name"] = _settings.$el.querySelector(_settings.lastName).value;
        if (
            _settings.$el.querySelector(_settings.mail) &&
            _settings.$el.querySelector(_settings.mail).value
        )
            formData["EmailAddress"] = _settings.$el.querySelector(
                _settings.mail
            ).value;

        fetch(_settings.apiUrl, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(formData),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    handleSuccess();
                } else {
                    handleError();
                }
            });
    }

    function handleSuccess() {
        _settings.$el.classList.add(_settings.successClass);
    }

    function handleError() {
        _settings.$el.classList.add(_settings.errorClass);
    }

    function init() {
        cacheDom();
        bindEvents();

        return _self;
    }

    return init();
};

export {
    NewsletterForm
};