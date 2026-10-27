/* =========================================================================
   HEADER  ·  kp-header.js  —  mobile menu only
   -------------------------------------------------------------------------
   The theme's menu plugin (js/core.min.js) binds to every <nav> element and
   expects .navbar-toggler / .navbar-nav markup. The header no longer uses
   those classes, so the plugin finds nothing to attach to and stays inert:
   this file is the single source of truth for the header menu.

   It touches nothing else on the page — no globals, no jQuery, and the
   anchor/active behaviour already handled elsewhere is left alone.
   ========================================================================= */
(function () {
    "use strict";

    var header = document.querySelector(".kp-header");
    if (!header) return;

    var burger = header.querySelector(".kp-burger");
    var nav = header.querySelector(".kp-nav");
    if (!burger || !nav) return;

    var desktop = window.matchMedia("(min-width: 992px)");

    function setOpen(open) {
        header.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    function isOpen() {
        return header.classList.contains("is-open");
    }

    burger.addEventListener("click", function () {
        setOpen(!isOpen());
    });

    /* tapping a link in the panel closes it before the page scrolls */
    nav.addEventListener("click", function (event) {
        var link = event.target && event.target.closest ? event.target.closest("a") : null;
        if (link && !desktop.matches) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && isOpen()) {
            setOpen(false);
            burger.focus();
        }
    });

    document.addEventListener("click", function (event) {
        if (isOpen() && !header.contains(event.target)) setOpen(false);
    });

    function closeOnDesktop() {
        if (desktop.matches) setOpen(false);
    }

    if (desktop.addEventListener) {
        desktop.addEventListener("change", closeOnDesktop);
    } else if (desktop.addListener) {
        desktop.addListener(closeOnDesktop);
    }

    /* nothing should stay open if the page is restored from the back/forward cache */
    window.addEventListener("pageshow", function () {
        setOpen(false);
    });
})();
