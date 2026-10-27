/* =========================================================================
   HERO  ·  kp-hero.js  —  arrows + slide dots
   -------------------------------------------------------------------------
   js/main.js already initialises the carousel on #home-slider (and again via
   .slider-fade1); this file adds no second instance. It only talks to the
   instance that already exists through Owl's public events and API, so the
   carousel keeps its existing config, timing and touch behaviour.

   The active dot is resolved by matching the visible slide's image file, not
   by index arithmetic: with loop:true Owl clones slides, so index maths
   shifts by the clone count and silently breaks.
   ========================================================================= */
(function () {
    "use strict";

    var root = document.querySelector(".kp-hero");
    if (!root) return;

    var slider = root.querySelector("#home-slider");
    var dotsBox = root.querySelector(".kp-hero-dots");
    var prev = root.querySelector(".kp-hero-arrow--prev");
    var next = root.querySelector(".kp-hero-arrow--next");
    if (!slider) return;

    var $ = window.jQuery;
    if (!$) return;

    var $slider = $(slider);

    /* if the project ever drops jQuery, the arrows stay inert rather than throwing */
    function go(step) {
        $slider.trigger(step > 0 ? "next.owl.carousel" : "prev.owl.carousel", [400]);
    }

    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });

    /* --- dots ------------------------------------------------------------ */
    var buttons = [];

    function fileOf(src) {
        return (src || "").split("/").pop();
    }

    /* Works whether or not Owl has already wrapped the slides: before init the
       .item elements are direct children, after init they sit inside .owl-item.
       Clones (added for loop:true) are skipped and duplicates removed, so the
       dot count always equals the number of real slides. */
    function slideSources() {
        var out = [];
        var seen = {};
        Array.prototype.forEach.call(slider.querySelectorAll(".item img"), function (img) {
            var wrapper = img.parentNode;
            while (wrapper && wrapper !== slider && !wrapper.classList.contains("owl-item")) {
                wrapper = wrapper.parentNode;
            }
            if (wrapper && wrapper.classList && wrapper.classList.contains("cloned")) return;
            var src = img.getAttribute("src") || "";
            var key = fileOf(src);
            if (!key || seen[key]) return;
            seen[key] = true;
            out.push(src);
        });
        return out;
    }

    var slides = slideSources();

    function buildDots() {
        if (!dotsBox || !slides.length || buttons.length) return;

        slides.forEach(function (src, i) {
            var b = document.createElement("button");
            b.type = "button";
            b.setAttribute("aria-label", "Show slide " + (i + 1) + " of " + slides.length);
            b.setAttribute("aria-current", i === 0 ? "true" : "false");
            b.addEventListener("click", function () {
                /* jump through the slider's own API so loop/clones stay consistent */
                if ($slider.data("owl.carousel")) {
                    $slider.trigger("to.owl.carousel", [i, 400]);
                }
            });
            dotsBox.appendChild(b);
            buttons.push(b);
        });
    }

    function sync() {
        if (!buttons.length) return;
        /* bias to the incoming slide while a crossfade is mid-flight */
        var actives = slider.querySelectorAll(".owl-item.active .item img");
        var active = actives.length ? actives[actives.length - 1] : null;
        var current = fileOf(active && active.getAttribute("src"));
        buttons.forEach(function (b, i) {
            b.setAttribute("aria-current", fileOf(slides[i]) === current ? "true" : "false");
        });
    }

    /* --- blurred backdrop ------------------------------------------------ */
    /* The area around the frame shows a blurred, low-opacity copy of the
       current slide, crossfaded between two stacked layers. */
    var bgLayers = root.querySelectorAll(".kp-hero-bg");
    var front = 0;

    function setBackdrop(src) {
        if (!src || bgLayers.length < 2) return;
        var incoming = bgLayers[1 - front];
        var outgoing = bgLayers[front];
        incoming.style.backgroundImage = 'url("' + src + '")';
        incoming.classList.add("is-active");
        outgoing.classList.remove("is-active");
        front = 1 - front;
    }

    buildDots();
    sync();

    $slider.on("initialized.owl.carousel refreshed.owl.carousel changed.owl.carousel translated.owl.carousel", function () {
        buildDots();
        sync();
        var active = slider.querySelector(".owl-item.active .item img");
        if (active) setBackdrop(active.getAttribute("src"));
    });
})();
