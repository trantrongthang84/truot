import datepicker from "js-datepicker";
import "js-datepicker/src/datepicker.scss";

const Datepicker = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {
        days: {
            de: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
            en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        },
        months: {
            de: [
                "Jänner",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember"
            ],
            en: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ]
        },
        languages: {
            de: "de-DE",
            en: "en-US"
        }
    };

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$datepicker = document.querySelectorAll(_settings.datepicker);
    }

    function initDatepickers() {
        const options = {
            id: 1,
            position: window.innerWidth <= 768 ? "c" : "tl",
            customDays: _settings.days[LANG],
            customMonths: _settings.months[LANG],
            minDate: new Date(),
            disableYearOverlay: true,
            startDay: 1,
            formatter: (input, date) => {
                const value = date.toLocaleDateString(
                    _settings.languages[LANG], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    }
                );
                input.value = value;
            },
            onSelect: (instance, date) => {
                if (typeof date === "undefined") {
                    _settings.$datepicker.forEach((picker) => {
                        picker.setDate();
                    });
                }
            }
        };

        _settings.$datepicker.forEach((picker) => {
            datepicker(picker, options);
        });
    }

    function init() {
        cacheDom();
        initDatepickers();

        return _self;
    }

    return init();
};

export {
    Datepicker
};