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
