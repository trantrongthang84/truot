import datepicker from "js-datepicker";
import "js-datepicker/src/datepicker.scss";

const BookingForm = function(settings) {
    "use strict";

    const _self = this;
    const _settings = {
        days: {
            de: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
            en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
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
                "Dezember",
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
                "December",
            ],
        },
        languages: {
            de: "de-DE",
            en: "en-US",
        },
    };

    Object.assign(_settings, settings);

    function cacheDom() {
        _settings.$form = document.querySelector(_settings.form);
        _settings.$start = document.querySelector(_settings.start);
        _settings.$end = document.querySelector(_settings.end);
        _settings.$persons = document.querySelector(_settings.persons);
    }

    function bindEvents() {
        _settings.$form.addEventListener("submit", handleSubmit);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const queryFields = {
            casaarrival: parseDate(_settings.$start.value),
            casadeparture: parseDate(_settings.$end.value),
            casaadults: _settings.$persons.value || false,
            casaroomtype: ROOM_ID,
        };

        const queryString = Object.values(queryFields)
            .reduce((result, el, i) => {
                if (el) result.push(`${Object.keys(queryFields)[i]}=${el}`);
                return result;
            }, [])
            .join("&");

        window.location = `${BOOKING_PAGE}?${queryString}`;
    }

    function parseDate(date) {
        if (!date) return false;

        let dateString = "";
        // target = 'YYYY-MM-DD'

        if (LANG === "de") {
            const dateParts = date.split(".");
            dateString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        }

        if (LANG === "en") {
            const dateParts = date.split("/");
            dateString = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
        }

        return dateString;
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
                const value = date.toLocaleDateString(_settings.languages[LANG], {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                });
                input.value = value;
            },
            onSelect: (instance, date) => {
                if (typeof date === "undefined") {
                    _settings.startPicker.setDate();
                    _settings.endPicker.setDate();
                }
            },
        };

        _settings.startPicker = datepicker(_settings.$start, options);
        _settings.endPicker = datepicker(_settings.$end, options);
    }

    function init() {
        cacheDom();
        bindEvents();
        initDatepickers();

        return _self;
    }

    return init();
};

export {
    BookingForm
};