/* =========================================================================
   COUNTER  ·  kp-stats.js  —  count-up + reveal
   -------------------------------------------------------------------------
   The figures in the markup already hold their final values, so the block is
   correct with JavaScript disabled or if this file never runs. This only:
     - adds .kp-js so the CSS may hide the columns before they are revealed
       (without JS the class is absent and everything stays visible);
     - animates 1,549 and 1,245 up from zero, once, when scrolled into view;
     - marks the section .is-in to run the reveal.

   The middle "13" is the image-filled numeral and is not animated — its fill
   is a background clipped to the glyphs.

   Reduced motion: final values straight away, no reveal, no counting.
   No jQuery, no globals.
   ========================================================================= */
(function () {
    "use strict";

    var section = document.querySelector(".counter-style-01");
    if (!section) return;

    var figures = Array.prototype.slice.call(
        section.querySelectorAll(".countup[data-count]")
    );

    var reduce = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    /* en-US grouping matches the way the values are written in the markup */
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
            /* ease-out cubic: quick off the mark, settles instead of ticking */
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = format(Math.round(target * eased));
            if (progress < 1) window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }

    function run() {
        figures.forEach(countUp);
        section.classList.add("is-in");
    }

    /* reduced motion: final values, no reveal, nothing hidden */
    if (reduce) {
        run();
        return;
    }

    /* Only hide the columns when there is something to reveal later. If the
       block is already on screen (deep link, reload part-way down) or the
       browser cannot observe it, it is shown at once — .kp-js is never added,
       so there is no state in which content can be left invisible. */
    var rect = section.getBoundingClientRect();
    var onScreen = rect.top < window.innerHeight && rect.bottom > 0;

    if (onScreen || !("IntersectionObserver" in window)) {
        run();
        return;
    }

    section.classList.add("kp-js");

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            run();
        });
    }, { threshold: 0.15 });

    observer.observe(section);
})();
