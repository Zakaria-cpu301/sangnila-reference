const elements = {
  firstPage: {
    sideBar: document.querySelector(".sidebar"),
    bgFire: document.querySelector(".first-page > img"),
    textContent: document.querySelector(".first-page .main-page"),
  },
  secondPage: {
    textContent: document.querySelector(".second-page > .text-content"),
  },
  thirdPage: {
    title: document.querySelector(".third-page > h1"),
    boxContent: document.querySelector(".third-page > .box-content"),
  },
};

const observer = new IntersectionObserver(
  (entriesObject) => {
    entriesObject.forEach((entry) => {
      console.log(entry);

      if (entry.target.tagName === "IMG") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(elements.firstPage.bgFire);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200);
          }
        }
      }

      if (entry.target.className === "main-page") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(elements.firstPage.textContent);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 100);
          }
        }
      }
      
      if (entry.target.className === "text-content") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(elements.secondPage.textContent);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200);
          }
        }
      }

      if (entry.target.offsetParent.className === 'third-page' && entry.target.tagName === 'H1') {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(elements.thirdPage.title)
            setTimeout(() => {
              entry.target.classList.add("show")
            }, 200);
          }
        }
      }

      if (entry.target.className === "box-content") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(elements.thirdPage.boxContent)
            setTimeout(() => {
              entry.target.children[0].classList.add("active");
              entry.target.children[2].classList.add("active");
            }, 200);
          }
        }
      }
    });
  },
  {
    threshold: [0, 0.25, 0.5],
  }
);
observer.observe(elements.firstPage.bgFire);
observer.observe(elements.firstPage.textContent);
observer.observe(elements.secondPage.textContent);
observer.observe(elements.thirdPage.title);
observer.observe(elements.thirdPage.boxContent);

let iClick = 0
const showSidebar = () => {
  iClick++
  if (iClick % 2 === 0) elements.firstPage.sideBar.style.display = "none"
  else elements.firstPage.sideBar.style.display = "flex"
}

document.addEventListener("DOMContentLoaded", function () {
    const scrollContainers = document.querySelectorAll(".side-scroll");

    scrollContainers.forEach(container => {
      const items = container.querySelectorAll(".item");
      const itemWidth = items[0].offsetWidth + 100; // +100px for the gap

      // Clone items for infinite loop effect
      items.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
      });

      let scrollAmount = 0;

      function autoScroll() {
        scrollAmount += itemWidth;

        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
          container.scrollLeft = 0;
        } else {
          container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      }

      setInterval(autoScroll, 2000); // scroll every 2 seconds
      container.addEventListener("mouseenter", () => clearInterval(scrollTimer));
container.addEventListener("mouseleave", () => {
  scrollTimer = setInterval(autoScroll, 2000);
});

    });
  });