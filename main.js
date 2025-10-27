/* jshint esversion: 6 */
/* global gsap, ScrollTrigger */

// SCROLL PROGRESS BAR
function updateScrollProgress() {
  // calulate scroll depth and update progress bar
  const totalHeight = // calculate total scrollable height of document
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPosition = document.documentElement.scrollTop; // get current verticle scroll position
  const scrollPercent = (scrollPosition / totalHeight) * 100; // calculate percentage of document scrolled 0 to 100
  const progressBar = document.getElementById("scroll-progress-bar"); // get shoelace progress bar element using id
  if (progressBar) {
    // if element is found update its value
    progressBar.value = scrollPercent; // value must be number 0 to 100 for shoelace component
  }
}

// scroll event listener for progress bar for it to update when user scrolls
window.addEventListener("scroll", updateScrollProgress);
// run function when page loads and show correct position when page reloads
updateScrollProgress();

// BACKSTORY

// dissapearing back to top arrow
const backToTop = document.querySelector(".back-to-top");
const homeSection = document.getElementById("home");

window.addEventListener("scroll", function () {
  const homeButtom = homeSection.offsetHeight - 100; // trigger point
  if (window.scrollY > homeButtom) {
    backToTop.classList.add("visible"); // show arrow
  } else {
    backToTop.classList.remove("visible"); // hide arrow in home section
  }
});

// COMMUNITIES

// club carousels
(function () {
  const carousels = document.querySelectorAll(".clubcarousel");

  carousels.forEach(function (wrap) {
    const track = wrap.querySelector(".track");
    const slides = Array.from(wrap.querySelectorAll(".slide"));
    const prevBtn = wrap.querySelector(".arrowleft");
    const nextBtn = wrap.querySelector(".arrowright");
    const dotsWrap = wrap.querySelector(".dots");

    let index = 0;

    // dots to match number of slides
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = i == 0 ? "dotactive" : "dot";
      b.setAttribute("aria-label", `go to slide ${i + 1}`);
      b.addEventListener("click", function () {
        goTo(i);
      });
      dotsWrap.appendChild(b);
    });

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dotsWrap.querySelectorAll("button").forEach(function (d, i) {
        d.className = i === index ? "dotactive" : "dot";
      });
    }

    function goTo(i) {
      index = Math.max(0, Math.min(i, slides.length - 1));
      update();
    }

    prevBtn.type = "button"; /* prevent button defautling to submit */
    nextBtn.type = "button";

    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
    });
    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
    });

    // initialise
    update();

    // keep slides aligned if widths change
    window.addEventListener("resize", function () {
      update();
    });
  });
})();

// TIPS AND TRICKS

// arrow interactivity
document.querySelectorAll(".carousel-section").forEach(function (section) {
  const carousel = section.querySelector(".carousel");
  const leftArrow = section.querySelector(".arrow-left");
  const rightArrow = section.querySelector(".arrow-right");

  const scrollAmount = carousel.clientWidth; //scroll amount per click

  leftArrow.addEventListener("click", function () {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", function () {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});

// dots interactivity
document.addEventListener("DOMContentLoaded", function () {
  // wait until DOM is fully loaded
  const carousels = document.querySelectorAll(".carousel-section"); // select all carousels on page

  carousels.forEach(function (section) {
    const carousel = section.querySelector(".carousel"); // scroll container
    const dots = section.querySelectorAll(".dot"); // all dots for carousel

    dots.forEach(function (dot, index) {
      // make dots clickable
      dot.addEventListener("click", function () {
        const slideWidth = carousel.clientWidth; // width of one slide
        carousel.scrollTo({
          left: slideWidth * index, // move to selected slide
          behavior: "smooth",
        });

        dots.forEach(function (d) {
          d.classList.remove("active");
        }); // update dot when clicked
        dot.classList.add("active");
      });
    });

    carousel.addEventListener("scroll", function () {
      // dot hightlighting while user scrolls
      const slideWidth = carousel.clientWidth;
      const scrollPosition = carousel.scrollLeft;
      const index = Math.round(scrollPosition / slideWidth);

      dots.forEach(function (d, i) {
        // remove inactive dot and highlight current one
        d.classList.toggle("active", i === index);
      });
    });
  });
});

// shoelace alert for "more" button
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".alert-toast");
  const alert = container
    ? container.querySelector("sl-alert[variant='success']")
    : null;
  if (!alert) return; // prevent errors if alert isn't found

  document.querySelectorAll("sl-button.morelink").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // stop instant navigation so toast appears

      alert.toast(); // shoelace function

      const href = button.getAttribute("href"); // open link after toast shows
      const target = button.getAttribute("target") || "_blank";
      setTimeout(function () {
        window.open(href, target, "noopener");
      }, 1000); // delay so toast has time to render
    });
  });
});

// GSAP animations
document.addEventListener("DOMContentLoaded", function () {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".faqcard").forEach(function (card) {
    gsap.from(card, {
      opacity: 0,
      y: 30, // start 30px lower
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card, // each card triggers its own animation
        start: "top 85%", // when card nears viewport
        markers: false, // for testing *****
      },
    });
  });
});
