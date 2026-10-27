/* =========================================================================
   PROOF BAND  ·  kp-stats.js  —  count-up + reveal
   -------------------------------------------------------------------------
   The figures in the markup already hold their final values, so the band is
   correct with JavaScript disabled or if this file never runs. This only
   animates 0 -> final once, when the band scrolls into view.

   Reduced motion gets the final value immediately with no animation.
   No jQuery, no globals.
   ========================================================================= */
(function () {
    "use strict";

    var band = document.querySelector(".kp-stats");
    if (!band) return;

    var figures = Array.prototype.slice.call(band.querySelectorAll(".kp-stat-figure[data-count]"));
    if (!figures.length) return;

    var reduce = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    /* Indian and US grouping both give 1,549 / 1,245; en-US is used so the
       formatting matches what is written in the markup */
    function format(value) {
        return value.toLocaleString("en-US");
    }

    function countUp(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        if (isNaN(target)) return;

        if (reduce || !window.requestAnimationFrame) {
            el.textContent = format(target);
            return;
        }

        var duration = 1500;
        var started = null;

        function step(now) {
            if (started === null) started = now;
            var progress = Math.min(1, (now - started) / duration);
            /* ease-out cubic: quick start, settles rather than ticking */
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = format(Math.round(target * eased));
            if (progress < 1) window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }

    function run() {
        figures.forEach(countUp);
        band.classList.add("is-in");
    }

    if (!("IntersectionObserver" in window)) {
        run();
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            run();
        });
    }, { threshold: 0.25 });

    observer.observe(band);
})();
