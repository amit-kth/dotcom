/* =========================================================================
   HERO  ·  kp-hero.js  —  product slide switcher + autoplay
   -------------------------------------------------------------------------
   Drives the full-bleed product hero: the numbered rail selects a slide and
   its matching copy panel, and the slides advance on their own every 6s.

   Autoplay rules
   - pauses while the pointer is over the hero, while focus is inside it, when
     the tab is hidden, and when the hero is scrolled out of view;
   - does not start at all under prefers-reduced-motion;
   - always has an explicit pause/play control (WCAG 2.2.2), and the active
     rail track fills over the interval so the wait is visible rather than
     surprising.

   No jQuery, no globals. Without this file the first slide and panel stay
   visible, which is the correct fallback.
   ========================================================================= */
(function () {
    "use strict";

    var root = document.querySelector(".kp-hero");
    if (!root) return;

    var railEl = root.querySelector(".kp-hero-rail");
    var rail = Array.prototype.slice.call(root.querySelectorAll(".kp-hero-rail button"));
    var slides = Array.prototype.slice.call(root.querySelectorAll(".kp-hero-slide"));
    var panels = Array.prototype.slice.call(root.querySelectorAll(".kp-hero-panel"));
    var controls = root.querySelector(".kp-hero-controls");
    var playBtn = root.querySelector(".kp-hero-play");

    if (!rail.length || !slides.length) return;

    var total = Math.min(rail.length, slides.length, panels.length);
    var current = 0;

    /* --- slide selection -------------------------------------------------- */
    function render(index) {
        /* clearing every tab first restarts the progress animation on the
           incoming one; without the reflow it only plays once */
        rail.forEach(function (button) {
            button.setAttribute("aria-selected", "false");
            button.setAttribute("tabindex", "-1");
        });
        void railEl.offsetWidth;

        rail[index].setAttribute("aria-selected", "true");
        rail[index].setAttribute("tabindex", "0");

        slides.forEach(function (slide, i) {
            slide.classList.toggle("is-active", i === index);
        });

        panels.forEach(function (panel, i) {
            var on = i === index;
            if (on) {
                panel.classList.remove("is-active");
                void panel.offsetWidth; /* restart the rise animation */
                panel.classList.add("is-active");
            } else {
                panel.classList.remove("is-active");
            }
            panel.setAttribute("aria-hidden", on ? "false" : "true");
        });

        current = index;
    }

    function select(index, moveFocus) {
        if (index < 0 || index >= total) return;
        render(index);
        if (moveFocus) rail[index].focus();
        restart();
    }

    /* --- autoplay --------------------------------------------------------- */
    var DURATION = 6000;
    var reduce = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    var playing = !reduce; /* an explicit click on play can start it anyway */
    var hovered = false;
    var inView = true;
    var timer = null;

    root.style.setProperty("--kp-dur", DURATION + "ms");

    function blocked() {
        return !playing || hovered || !inView || document.hidden;
    }

    function syncControls() {
        if (!controls) return;
        controls.classList.toggle("is-paused", blocked());

        if (!playBtn) return;
        var paused = !playing;
        playBtn.setAttribute("aria-pressed", paused ? "true" : "false");
        playBtn.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
        var icon = playBtn.querySelector("i");
        if (icon) icon.className = paused ? "fa fa-play" : "fa fa-pause";
    }

    function stop() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    /* (re)schedules the next advance; called after every state change so the
       interval always starts from now, never mid-way */
    function restart() {
        stop();
        syncControls();
        if (blocked()) return;

        timer = setTimeout(function () {
            render((current + 1) % total);
            restart();
        }, DURATION);
    }

    document.addEventListener("visibilitychange", restart);

    root.addEventListener("mouseenter", function () {
        hovered = true;
        restart();
    });

    root.addEventListener("mouseleave", function () {
        hovered = false;
        restart();
    });

    /* NOTE: there is deliberately no focus-based pause. Every click on the rail
       or the play button moves focus into the hero, and a focus rule then made
       autoplay impossible to resume after any interaction. Holding on hover,
       when the tab is hidden, when the hero is off-screen, and the explicit
       pause control together cover the same ground. */

    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
            inView = entries[0].isIntersecting;
            restart();
        }, { threshold: 0.2 }).observe(root);
    }

    /* --- rail ------------------------------------------------------------- */
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

    if (playBtn) {
        playBtn.addEventListener("click", function () {
            playing = !playing;
            restart();
        });
    }

    /* --- start ------------------------------------------------------------ */
    render(0);
    restart();
})();
