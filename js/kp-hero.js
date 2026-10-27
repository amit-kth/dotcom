/* =========================================================================
   HERO  ·  kp-hero.js  —  product switcher + number count-up
   -------------------------------------------------------------------------
   Replaces the Owl carousel for the hero only. The three product visuals are
   driven by real tabs: click, arrow keys, or Home/End. Nothing is
   auto-rotated, so the hero never changes under the reader.

   No jQuery, no globals, and no second carousel instance. Everything degrades
   to "the first product is showing" if this file never runs.
   ========================================================================= */
(function () {
    "use strict";

    var root = document.querySelector(".kp-hero");
    if (!root) return;

    var tabs = Array.prototype.slice.call(root.querySelectorAll(".kp-hero-tabs button"));
    var slides = Array.prototype.slice.call(root.querySelectorAll(".kp-hero-slide"));
    var glows = Array.prototype.slice.call(root.querySelectorAll(".kp-hero-glow span"));
    var link = root.querySelector(".kp-hero-product");
    var nameEl = root.querySelector(".kp-hero-product-name");
    var kindEl = root.querySelector(".kp-hero-product-kind");

    /* --- product switcher ------------------------------------------------- */
    function select(index, focusTab) {
        if (index < 0 || index >= tabs.length) return;

        tabs.forEach(function (tab, i) {
            var on = i === index;
            tab.setAttribute("aria-selected", on ? "true" : "false");
            tab.setAttribute("tabindex", on ? "0" : "-1");
        });

        slides.forEach(function (slide, i) {
            var on = i === index;
            slide.classList.toggle("is-active", on);
            slide.setAttribute("aria-hidden", on ? "false" : "true");
        });

        glows.forEach(function (glow, i) {
            glow.classList.toggle("is-active", i === index);
        });

        /* the product link follows the active tab */
        var tab = tabs[index];
        if (link) {
            if (tab.getAttribute("data-href")) link.setAttribute("href", tab.getAttribute("data-href"));
            if (tab.getAttribute("data-name")) link.setAttribute("aria-label", "View " + tab.getAttribute("data-name"));
        }
        if (nameEl && tab.getAttribute("data-name")) nameEl.textContent = tab.getAttribute("data-name");
        if (kindEl && tab.getAttribute("data-kind")) kindEl.textContent = tab.getAttribute("data-kind");

        if (focusTab) tab.focus();
    }

    if (tabs.length && slides.length) {
        tabs.forEach(function (tab, i) {
            tab.addEventListener("click", function () {
                select(i, false);
            });

            tab.addEventListener("keydown", function (event) {
                var next = -1;
                if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (i + 1) % tabs.length;
                else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = tabs.length - 1;
                if (next < 0) return;
                event.preventDefault();
                select(next, true);
            });
        });

        /* initial state */
        select(0, false);
    }

    /* --- numbers ---------------------------------------------------------- */
    /* Real figures that already appear on the page; counting them up just makes
       them earn their place. Reduced-motion users get the final value at once. */
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var counters = Array.prototype.slice.call(root.querySelectorAll("[data-count]"));

    function runCounter(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        if (isNaN(target)) return;
        var suffix = el.getAttribute("data-suffix") || "";

        if (reduce || !window.requestAnimationFrame) {
            el.textContent = target.toLocaleString("en-US") + suffix;
            return;
        }

        var duration = 1400;
        var start = null;

        function step(now) {
            if (start === null) start = now;
            var p = Math.min(1, (now - start) / duration);
            /* ease-out so the number settles instead of ticking mechanically */
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
            if (p < 1) window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }

    if (!counters.length) return;

    if (!("IntersectionObserver" in window)) {
        counters.forEach(runCounter);
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            runCounter(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.4 });

    counters.forEach(function (el) {
        observer.observe(el);
    });
})();
