function scrollTo(destination, offset) {
    const start = window.pageYOffset;
    const startTime =
        "now" in window.performance ? performance.now() : new Date().getTime();
    const offsetHeight = offset || 50;

    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.getElementsByTagName("body")[0].clientHeight;
    const destinationOffset =
        typeof destination === "number" ? destination : destination.offsetTop;
    const destinationOffsetBasis = Math.round(
        documentHeight - destinationOffset < windowHeight ?
        documentHeight - windowHeight :
        destinationOffset
    );
    const destinationOffsetToScroll =
        destinationOffsetBasis === 0 ? 0 : destinationOffsetBasis - offsetHeight;

    if ("requestAnimationFrame" in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        return;
    }

    function scroll() {
        const now =
            "now" in window.performance ? performance.now() : new Date().getTime();
        let time = Math.min(1, (now - startTime) / 2000);
        const timeFunction =
            time < 0.5 ?
            8 * time * time * time * time :
            1 - 8 * --time * time * time * time;
        window.scroll(
            0,
            Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
        );

        if (Math.round(window.pageYOffset) === destinationOffsetToScroll) {
            return;
        }

        requestAnimationFrame(scroll);
    }

    scroll();
}

export {
    scrollTo
};