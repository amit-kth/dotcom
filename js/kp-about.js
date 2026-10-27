/* =========================================================================
   ABOUT  ·  kp-about.js  —  reveal only
   -------------------------------------------------------------------------
   Adds .is-in when the section scrolls into view so the copy and the visual
   settle in, once. .kp-js is only added when there is something to reveal
   later: if the block is already on screen, or the browser cannot observe it,
   or the visitor prefers reduced motion, the section is left visible exactly
   as the markup renders it. There is no state in which content stays hidden.

   No jQuery, no globals.
   ========================================================================= */
(function () {
    "use strict";

    var section = document.querySelector(".kp-about");
    if (!section) return;

    var reduce = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (reduce || !("IntersectionObserver" in window)) {
        section.classList.add("is-in");
        return;
    }

    var rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add("is-in");
        return;
    }

    section.classList.add("kp-js");

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            section.classList.add("is-in");
        });
    }, { threshold: 0.15 });

    observer.observe(section);
})();
