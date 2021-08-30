export function fixBody() {
    Object.assign(document.body.style, {
        position: "fixed",
        overflow: "hidden",
        top: `-${window.scrollY}px`,
        width: "100%",
        height: "100vh",
    });
}

export function unfixBody() {
    const topPos = parseInt(document.body.style.top, 10) * -1;

    Object.assign(document.body.style, {
        position: "",
        overflow: "",
        top: "",
        width: "",
        height: "",
    });

    window.scrollTo(0, topPos);
}