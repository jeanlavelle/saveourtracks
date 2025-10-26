// SCROLL PROGRESS BAR
function updateScrollProgress() {
  // calulate scroll depth and update progress bar
  const totalHeight = // calculate total scrollable height of document
    document.documentElement.scrollHeight - // total height of content
    document.documentElement.clientHeight; // visable window height
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

window.addEventListener("scroll", () => {
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

  carousels.forEach((wrap) => {
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
      b.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(b);
    });

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dotsWrap.querySelectorAll("button").forEach((d, i) => {
        d.className = i === index ? "dotactive" : "dot";
      });
    }

    function goTo(i) {
      index = Math.max(0, Math.min(i, slides.length - 1));
      update();
    }

    prevBtn.type = "button"; /* prevent button defautling to submit */
    nextBtn.type = "button";

    prevBtn.addEventListener("click", () => goTo(index - 1));
    nextBtn.addEventListener("click", () => goTo(index + 1));

    // initialise
    update();

    // keep slides aligned if widths change
    window.addEventListener("resize", () => update());
  });
})();

// TIPS AND TRICKS

// arrow interactivity
document.querySelectorAll(".carousel-section").forEach((section) => {
  const carousel = section.querySelector(".carousel");
  const leftArrow = section.querySelector(".arrow-left");
  const rightArrow = section.querySelector(".arrow-right");

  const scrollAmount = carousel.clientWidth; //scroll amount per click

  leftArrow.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});

// dots interactivity
document.addEventListener("DOMContentLoaded", () => {
  // wait until DOM is fully loaded
  const carousels = document.querySelectorAll(".carousel-section"); // select all carousels on page

  carousels.forEach((section) => {
    const carousel = section.querySelector(".carousel"); // scroll container
    const dots = section.querySelectorAll(".dot"); // all dots for carousel

    dots.forEach((dot, index) => {
      // make dots clickable
      dot.addEventListener("click", () => {
        const slideWidth = carousel.clientWidth; // width of one slide
        carousel.scrollTo({
          left: slideWidth * index, // move to selected slide
          behavior: "smooth",
        });

        dots.forEach((d) => d.classList.remove("active")); // update dot when clicked
        dot.classList.add("active");
      });
    });

    carousel.addEventListener("scroll", () => {
      // dot hightlighting while user scrolls
      const slideWidth = carousel.clientWidth;
      const scrollPosition = carousel.scrollLeft;
      const index = Math.round(scrollPosition / slideWidth);

      dots.forEach((d, i) => {
        // remove inactive dot and highlight current one
        d.classList.toggle("active", i === index);
      });
    });
  });
});

// shoelace alert for "more" button
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".alert-toast");
  const alert = container?.querySelector("sl-alert[variant='success']");
  if (!alert) return; // prevent errors if alert isn't found

  document.querySelectorAll("sl-button.morelink").forEach((button) => {
    button.addEventListener("click", (ev) => {
      ev.preventDefault(); // stop instant navigation so toast appears

      alert.toast(); // shoelace function

      const href = button.getAttribute("href"); // open link after toast shows
      const target = button.getAttribute("target") || "_blank";
      setTimeout(() => {
        window.open(href, target, "noopener");
      }, 1000); // delay so toast has time to render
    });
  });
});

// GSAP animations
document.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".faqcard").forEach((card) => {
    gsap.to(card, {
      scrollTrigger: card, // animation begins when this card enters viewport
      opacity: 1,
      y: -30,
      duration: 0.8,
      ease: "power2.out",
    });
  });
});
