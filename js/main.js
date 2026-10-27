// Ensure jQuery is available
var e = jQuery;

// Handle Preloader
function handlePreloader() {
    $("#preloader").length && $("#preloader").delay(200).fadeOut(500);
}

// Load events
$(window).on("load", function () {
    handlePreloader();

    // Show enquiry modal after 5 seconds
    setTimeout(function () {
        $("#enq_form").modal("show");
    }, 5000);

    // Show A2HS button after 7 seconds
    setTimeout(function () {
        $(".a2hs_button").modal("show");
    }, 7000);
});

// Update header and logo on scroll
(function (e) {
    "use strict";
    var a = e(window);

    function o() {
        var o, t;
        // Full screen and screen height
        e(".full-screen").css("min-height", a.height());
        e(".screen-height").css("height", a.height() - e("header").height());
    }

    a.on("scroll", function () {
        var o = a.scrollTop(),
            t = e(".navbar-brand img");

        if (o <= 50) {
            e("header").removeClass("scrollHeader").addClass("fixedHeader");
            t.attr("src", "img/logo/logo.png");
        } else {
            e("header").removeClass("fixedHeader").addClass("scrollHeader");
            t.attr("src", "img/logo/logo.png");
        }

        e(".scroll-to-top").toggle(o > 500);
    });

    // Scroll to top action
    e(".scroll-to-top").on("click", function (a) {
        a.preventDefault();
        e("html, body").animate({ scrollTop: 0 }, 600);
    });

    // Parallax and background image handling
    e(".parallax,.bg-img").each(function () {
        if (e(this).attr("data-background")) {
            e(this).css("background-image", "url(" + e(this).data("background") + ")");
        }
    });

    // Magnific Popup for video and inline modals
    e(".story-video").magnificPopup({ delegate: ".video", type: "iframe" });
    e(".source-modal").magnificPopup({ type: "inline", mainClass: "mfp-fade", removalDelay: 160 });

    // WOW.js for animation
    new WOW({ boxClass: "wow", animateClass: "animated", offset: 0, mobile: false, live: true }).init();

    a.resize(function () {
        setTimeout(o, 500);
        event.preventDefault();
    });

    // ClipboardJS functionality
    if (e(".copy-clipboard").length) {
        new ClipboardJS(".copy-clipboard");
        e(".copy-clipboard").on("click", function () {
            var a = e(this);
            a.text("Copied");
            setTimeout(function () {
                a.text("Copy");
            }, 2000);
        });
    }

    // Initialize all sliders
    e(".testimonial-carousel1").owlCarousel({
        loop: true,
        responsiveClass: true,
        nav: true,
        navText: ["<span class='fa-solid fa-arrow-left-long'></span>", "<span class='fa-solid fa-arrow-right-long'></span>"],
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 3000,
        items: 2,
        responsive: {
            0: { items: 1, dots: false, nav: true },
            768: { items: 2 },
            1200: { items: 2 }
        }
    });

    // Client logo carousel
    e(".clientlogo-carousel").owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 1500,
        nav: false,
        dots: true,
        margin: 30,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            1200: { items: 4 }
        }
    });

    // Home slider
    e("#home-slider").owlCarousel({
        animateOut: "fadeOut",
        loop: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 1500,
        nav: false,
        dots: false
    });

    // Slider fade effect
    e(".slider-fade1").owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        nav: false,
        autoplay: false,
        smartSpeed: 1500,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
    });

    e(".slider-fade1").on("changed.owl.carousel", function (a) {
        a = a.item.index - 2;
        e(".owl-item").not(".cloned").eq(a).find("span, h1, p, a").addClass("animated fadeInUp");
    });

    // Horizontal tabs initialization
    if (e(".horizontaltab").length) {
        e(".horizontaltab").easyResponsiveTabs({
            type: "default",
            width: "auto",
            fit: true,
            tabidentify: "hor_1",
            activate: function (a) {
                var o = e(this),
                    t = e("#nested-tabInfo");
                e("span", t).text(o.text());
                t.show();
            }
        });
    }

})(jQuery);

$(document).ready(function () {
    // Initialize counterUp plugin after DOM is ready
    // $(".countup").counterUp({
    //     delay: 25,
    //     time: 2000
    // });

    // // Countdown Initialization
    // $(".countdown").countdown({
    //     date: "01 Aug 2025 00:01:00",
    //     format: "on"
    // });

    // Set current year
    $(".current-year").text(new Date().getFullYear());
});

// Initialize portfolio gallery
$(window).on("load", function () {
    e(".portfolio-gallery").lightGallery();
    e(".portfolio-link").on("click", function (e) {
        e.stopPropagation();
    });
});

// Set the dynamic width of the section title for animation
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".section-title .sm-title").forEach(title => {
        let titleWidth = title.offsetWidth;
        title.style.setProperty("--move-distance", `${titleWidth - 10}px`); // Adjust for padding
    });
});

// country code
$(document).ready(function () {
    var input = document.querySelector("#phone");
    var iti = window.intlTelInput(input, {
        initialCountry: "in", // Default country (India)
        separateDialCode: true, // Show country code separately
        preferredCountries: ["us", "gb", "in"], // Preferred countries on top
    });

    // Function to update country name with country code
    function updateCountryInfo() {
        var countryData = iti.getSelectedCountryData();
        var countryName = countryData.name; // English country name
        var nativeName = getNativeCountryName(countryData.iso2); // Native language name
        var countryCode = `+${countryData.dialCode}`; // Country code

        // ✅ **Fix: Ensure only one (भारत) appears**
        if (nativeName && countryName.includes(nativeName)) {
            nativeName = ""; // Remove duplicate native name
        }

        // **Final format: Country (Native) + Code**
        var finalCountryInfo = nativeName ? `${countryName} (${nativeName}) ${countryCode}` : `${countryName} ${countryCode}`;

        console.log("Selected Country:", finalCountryInfo); // Debugging

        // Store in hidden input field
        document.querySelector("#country_name").value = finalCountryInfo;
    }

    // Call function when country changes
    input.addEventListener("countrychange", updateCountryInfo);
    input.addEventListener("blur", updateCountryInfo);
    input.addEventListener("keyup", updateCountryInfo);

    // Set the initial country info on page load
    updateCountryInfo();

    // Function to get native country name
    function getNativeCountryName(iso2) {
        var nativeNames = {
            "in": "भारत", // India
            "us": "United States", // USA
            "gb": "United Kingdom", // UK
            "fr": "France", // France
            "de": "Deutschland", // Germany
            "es": "España", // Spain
            "cn": "中国", // China
            "jp": "日本", // Japan
        };
        return nativeNames[iso2] || ""; // Default to empty if not found
    }
});










