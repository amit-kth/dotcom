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

    /* guarded: if matchMedia is missing, the menu still works and the
       scroll spy below does not get taken down with it */
    var desktop = window.matchMedia
        ? window.matchMedia("(min-width: 992px)")
        : { matches: false, addEventListener: null, addListener: null };

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

    /* --- scroll spy -------------------------------------------------------
       Highlights the nav item for the section currently in view.

       Only the links inside the header are touched. The theme's own handlers
       (the global `ul li` .active toggle and the product-page script) are left
       exactly as they are; this corrects the state on scroll, which is what
       was missing.
       -------------------------------------------------------------------- */
    var links = [];
    var targets = [];

    Array.prototype.forEach.call(nav.querySelectorAll('a[href^="#"]'), function (a) {
        var hash = a.getAttribute("href");
        if (!hash || hash.length < 2) return;
        var section = document.getElementById(hash.slice(1));
        if (!section) return; /* skip links without a target on this page */
        links.push(a);
        targets.push(section);
    });

    if (!links.length) return;

    function markActive(index) {
        links.forEach(function (a, i) {
            var li = a.parentNode;
            if (i === index) {
                li.classList.add("active");
                a.setAttribute("aria-current", "true");
            } else {
                li.classList.remove("active");
                a.removeAttribute("aria-current");
            }
        });
    }

    var lastIndex = -1;

    function updateActive() {
        /* a section counts as current once its top passes just under the bar */
        var line = window.pageYOffset + (header.offsetHeight || 70) + 24;
        var found = 0;

        for (var i = 0; i < targets.length; i++) {
            var top = targets[i].getBoundingClientRect().top + window.pageYOffset;
            if (top <= line) found = i;
        }

        /* at the very bottom of the page, the last section wins even if it is
           too short to have crossed the line */
        var atBottom =
            window.innerHeight + window.pageYOffset >=
            document.documentElement.scrollHeight - 4;
        if (atBottom) found = targets.length - 1;

        if (found !== lastIndex) {
            lastIndex = found;
            markActive(found);
        }
    }

    var ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
            ticking = false;
            updateActive();
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", updateActive);
    updateActive();
})();
