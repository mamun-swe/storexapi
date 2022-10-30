(function ($) {
  "use strict";

  function smoothScrolling($links, $topGap,$speed=1000) {
    var links = $links;
    var topGap = $topGap;
    const animateSpeed = $speed;

    links.on("click", function () {
      if (
        location.pathname.replace(/^\//, "") ===
          this.pathname.replace(/^\//, "") &&
        location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top - topGap,
            },
            animateSpeed,
            "easeInOutExpo"
          );
          return false;
        }
      }
      return false;
    });
  }

  $(window).on("load", function () {
    smoothScrolling($(".root_resources a[href^='#']"), 85);
    smoothScrolling($("a.nextSection[href^='#']"), 85, 250);
  });
})(jQuery);
