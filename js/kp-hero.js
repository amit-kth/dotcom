/* =========================================================================
   HERO  ·  kp-hero.js  —  product slide switcher
   -------------------------------------------------------------------------
   Drives the full-bleed product hero: the numbered rail selects a slide and
   its matching copy panel. Click, Arrow keys, Home and End are supported.

   Deliberately no autoplay: the hero carries the page's main statement, so it
   does not change under someone who is reading it.

   No jQuery, no globals. Without this file the first slide and panel simply
   stay visible, which is the correct fallback.
   ========================================================================= */
(function () {
    "use strict";

    var root = document.querySelector(".kp-hero");
    if (!root) return;

    var rail = Array.prototype.slice.call(root.querySelectorAll(".kp-hero-rail button"));
    var slides = Array.prototype.slice.call(root.querySelectorAll(".kp-hero-slide"));
    var panels = Array.prototype.slice.call(root.querySelectorAll(".kp-hero-panel"));

    if (!rail.length || !slides.length) return;

    var total = Math.min(rail.length, slides.length, panels.length);

    function select(index, moveFocus) {
        if (index < 0 || index >= total) return;

        for (var i = 0; i < total; i++) {
            var on = i === index;

            rail[i].setAttribute("aria-selected", on ? "true" : "false");
            rail[i].setAttribute("tabindex", on ? "0" : "-1");

            /* the outgoing slide crossfades out under the incoming one, so both
               carry the class briefly; CSS handles the stacking via z-index */
            slides[i].classList.toggle("is-active", on);

            if (on) {
                /* restart the rise animation on the incoming panel */
                panels[i].classList.remove("is-active");
                /* eslint-disable-next-line no-unused-expressions */
                void panels[i].offsetWidth;
                panels[i].classList.add("is-active");
            } else {
                panels[i].classList.remove("is-active");
            }
            panels[i].setAttribute("aria-hidden", on ? "false" : "true");
        }

        if (moveFocus) rail[index].focus();
    }

    rail.forEach(function (button, i) {
        button.addEventListener("click", function () {
            select(i, false);
        });

        button.addEventListener("keydown", function (event) {
            var next = -1;

            if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (i + 1) % total;
            else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (i - 1 + total) % total;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = total - 1;

            if (next < 0) return;
            event.preventDefault();
            select(next, true);
        });
    });

    /* the markup already ships with slide 1 active; this only normalises state
       for browsers restoring a page from the back/forward cache */
    window.addEventListener("pageshow", function () {
        select(0, false);
    });
})();
