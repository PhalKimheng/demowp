jQuery(document).ready(function ($) {
  // Check if Slick is available
  if (typeof $.fn.slick === "function") {
    // Initialize each slick-slider individually
    $(".slick-slider").each(function () {
      var $slider = $(this);
      $slider.slick({
        prevArrow: $slider.siblings(".slick-prev"),
        nextArrow: $slider.siblings(".slick-next"),
      });
    });
  } else {
    console.error("Slick is not a function");
  }
});

jQuery(document).ready(function ($) {
  // Check if Slick is available
  if (typeof $.fn.slick === "function") {
    // Initialize each slick-slider individually
    let carousel = $(".slick-slider-pagination");

    carousel.each(function () {
      let slider = $(this);

      function updateVisibleDots(slider, slick, $dots, nextSlide) {
        let totalSlides = slick.slideCount;

        let itemPerSlider = slider.find(".slick-slide.slick-active").length;

        let totalDots = Math.ceil(totalSlides / itemPerSlider);

        let nextDot = nextSlide > 0 ? Math.ceil(nextSlide / itemPerSlider) : 0;
        console.log(nextDot);

        if (totalDots > 7) {
          // Hide all dots
          $dots.find("li").not(":first, :last").hide();
          $dots.find(".ellipsis-button").remove();

          function showDotsInRange(dots, start, end) {
            for (let i = start; i <= end; i++) {
              dots.find("li").eq(i).show();
            }
          }

          const ellipsisFirstLi = $("<button>")
            .addClass("ellipsis-button")
            .text("...");

          const ellipsisLastLi = $("<button>")
            .addClass("ellipsis-button")
            .text("...");

          if (nextDot > 3) {
            $dots.find("li:first").after(ellipsisFirstLi);
          }

          // Determine which dots to show based on nextDot
          if (nextDot < 4) {
            showDotsInRange($dots, 1, 4);
          } else {
            $dots
              .find("li")
              .eq(nextDot - 1)
              .show();
          }

          // Show the current dot and the surrounding dots
          $dots.find("li").eq(nextDot).show();

          if (nextDot < totalDots) {
            $dots
              .find("li")
              .eq(nextDot + 1)
              .show();
          }

          if (nextDot + 4 < totalDots) {
            $dots.find("li:last").before(ellipsisLastLi);
          }

          if (nextDot + 4 >= totalDots) {
            showDotsInRange($dots, totalDots - 5, totalDots - 1);
          }
        }
      }

      slider.on("init", function (event, slick) {
        let $dots = slider.find("ul.slick-dots");
        // updateVisibleDots(slider, $dots);
        $dots.prepend(
          '<button class="carousel-control-prev" type="button"><i class="bi bi-chevron-left"></i></button>'
        );
        $dots.append(
          '<button class="carousel-control-next" type="button"><i class="bi bi-chevron-right"></i></button>'
        );
        // Handle the click events for the buttons
        slider.find("button.carousel-control-prev ").on("click", function () {
          slider.slick("slickPrev");
        });
        slider.find("button.carousel-control-next").on("click", function () {
          slider.slick("slickNext");
        });

        $dots.find("li button").on("click", function (event) {
          event.preventDefault(); // Prevent default click behavior
          event.stopPropagation();
          let liElement = $(this).parent();
          let dotIndex = liElement.index(); // Get the index of the clicked dot

          let totalDotChildrent = $dots.children().length - 2;
          let totalLi = $dots.find("li").length;

          let totalEllipsis = $dots.find(".ellipsis-button").length;

          console.log("totalEclip", totalEllipsis);

          let itemPerSlider = slider.find(".slick-slide.slick-active").length;
          console.log(dotIndex, "dotIndex");
          if (slick.slideCount <= totalDotChildrent || itemPerSlider <= 1) {
            let different = totalDotChildrent - slick.slideCount;
            dotIndex = dotIndex - different;

            console.log("different", different, dotIndex);

            //have one ellipsis button
            if (totalDotChildrent - dotIndex <= 5) {
              dotIndex--;
            }
          } else {
            if (
              totalDotChildrent - totalLi > 1 ||
              (dotIndex > 6 &&
                totalEllipsis === 0 &&
                dotIndex < totalDotChildrent) ||
              (dotIndex > 5 && totalEllipsis > 0)
            ) {
              dotIndex--;
            }

            console.log(slick.slideCount, totalDotChildrent);

            // console.log("dotIndex 2", dotIndex);

            dotIndex = (dotIndex - 1) * itemPerSlider;
            console.log("dotIndex 2", dotIndex);
          }

          console.log("ljnsfjlb");

          // Ensure the index is within bounds
          if (dotIndex >= 0 && dotIndex < slick.slideCount) {
            slider.slick("slickGoTo", dotIndex);
          } else if (dotIndex < 0) {
            slider.slick("slickGoTo", 0);
          } else if (dotIndex > slick.slideCount) {
            slider.slick("slickGoTo", slick.slideCount - 1);
          } else {
            console.error("Invalid dot index:", dotIndex);
          }
        });

        updateVisibleDots(slider, slick, $dots, 0);

        // all child with the same height

        let slickTrack = slider.find("div.slick-track");

        let trackHeight = slickTrack.height();

        slickTrack.children(".slick-slide").css("height", trackHeight);
      });

      slider.on(
        "beforeChange",
        function (event, slick, currentSlide, nextSlide) {
          var $dots = slider.find("ul.slick-dots");
          updateVisibleDots(slider, slick, $dots, nextSlide);
        }
      );

      slider.slick({
        dots: true,
        prevArrow: slider.siblings(".slick-prev"),
        nextArrow: slider.siblings(".slick-next"),
      });
    });
  } else {
    console.error("Slick is not a function");
  }
});
