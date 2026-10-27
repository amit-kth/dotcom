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
    var slides = [];
    $(slider).children(".item").each(function () {
        var img = this.querySelector("img");
        slides.push(img ? img.getAttribute("src") : "");
    });

    var buttons = [];

    function fileOf(src) {
        return (src || "").split("/").pop();
    }

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

    buildDots();

    $slider.on("initialized.owl.carousel refreshed.owl.carousel changed.owl.carousel translated.owl.carousel", function () {
        buildDots();
        sync();
    });
})();
