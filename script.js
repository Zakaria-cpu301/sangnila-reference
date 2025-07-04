const elements = {
  navbar: {
    elementNav: document.querySelector(".sidebar"),
  },
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
  fourthPage: {
    title: document.querySelector(".title-four > h1"),
    textContent: document.querySelector(".title-four > p"),
    titleFrame: document.querySelector(".yt-frame h1"),
    ytFrame: document.querySelector(".yt-frame iframe"),
  },
  partner: {
    title: document.querySelector(".partner .title h1"),
    imgTransRight: document.querySelector(".img-right"),
    imgTransLeft: document.querySelector(".img-left"),
  }
};

const mediaView = {
  tablet: window.matchMedia("(max-width: 1281px)"),
  mobile: window.matchMedia("(max-width: 320px)"),
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
      if (entry.target.tagName === "H1") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.5) {
            observer.unobserve(elements.thirdPage.title);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200);
          }
        }
      }
      if (entry.target.className === "box-content") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(elements.thirdPage.boxContent);
            setTimeout(() => {
              entry.target.children[0].classList.add("active");
              entry.target.children[2].classList.add("active");
            }, 200);
          }
        }
      }
      if (
        entry.target.offsetParent.className === "fourth-page" &&
        entry.target.localName === "h1"
      ) {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.5) {
            observer.unobserve(elements.target);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200);
          }
        }
      }
      if (
        entry.target.offsetParent.className === "fourth-page" &&
        entry.target.tagName === "P"
      ) {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.5) {
            observer.unobserve(elements.fourthPage.textContent);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200);
          }
        }
      }
      if (entry.target.className === "frame") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(entry.target);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200);
          }
        }
      }
      if (entry.target.className === "img-right") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.5) {
            observer.unobserve(entry.target);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200);
          }
        }
      }
      if (entry.target.className === "img-right") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.5) {
            observer.unobserve(entry.target);
            setTimeout(() => {
              entry.target.classList.add("show");
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
observer.observe(elements.fourthPage.title);
observer.observe(elements.fourthPage.textContent);
observer.observe(elements.fourthPage.titleFrame);
observer.observe(elements.fourthPage.ytFrame);
observer.observe(elements.partner.title);
observer.observe(elements.partner.imgTransRight)
observer.observe(elements.partner.imgTransLeft)
let iClick = 0;
const showSidebar = () => {
  iClick++;
  if (iClick % 2 === 0) elements.firstPage.sideBar.style.display = "none";
  else elements.firstPage.sideBar.style.display = "flex";
};

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.navbar').classList.add("showNav")
  const scrollContainers = document.querySelectorAll(".side-scroll");

  scrollContainers.forEach((container) => {
    const items = container.querySelectorAll(".item");
    const itemWidth =
      items[0].offsetWidth + parseInt(getComputedStyle(container).gap || 100);

    // Duplicate items for seamless loop
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      container.appendChild(clone);
    });

    let currentIndex = 0;
    let isPaused = false;

    function scrollNext() {
      if (isPaused) return;

      currentIndex++;
      const maxIndex = items.length;

      if (currentIndex >= maxIndex) {
        container.scrollLeft = 0;
        currentIndex = 1;
      }

      container.scrollTo({
        left: currentIndex * itemWidth,
        behavior: "smooth",
      });
    }

    let interval = setInterval(scrollNext, 2500);

    // Pause on hover
    container.addEventListener("mouseenter", () => (isPaused = true));
    container.addEventListener("mouseleave", () => (isPaused = false));

    // ============================
    // Manual swipe support
    // ============================

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      container.classList.add("dragging");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      isPaused = true; // pause auto scroll
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.classList.remove("dragging");
      isPaused = false;
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("dragging");
      isPaused = false;
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1; // scroll-fast multiplier
      container.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    container.addEventListener("touchstart", (e) => {
      isDown = true;
      startX = e.touches[0].pageX;
      scrollLeft = container.scrollLeft;
      isPaused = true;
    });

    container.addEventListener("touchend", () => {
      isDown = false;
      isPaused = false;
    });

    container.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 1;
      container.scrollLeft = scrollLeft - walk;
    });
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const animateOnScroll = (elementSelector, animationProps) => {
//     const elements = document.querySelectorAll(elementSelector);

//     const observer = new IntersectionObserver(
//       (entries, obs) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             gsap.from(entry.target, animationProps);
//             obs.unobserve(entry.target); // agar animasi hanya terjadi sekali
//           }
//         });
//       },
//       {
//         threshold: 0.1, // elemen masuk minimal 10% ke dalam viewport
//       }
//     );

//     elements.forEach((el) => observer.observe(el));
//   };

//   animateOnScroll(".img-left", {
//     x: -400,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power3.out",
//     delay: 0.3,
//   });

//   animateOnScroll(".img-right", {
//     x: 400,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power3.out",
//     delay: 0.6,
//   });

//   animateOnScroll(".first-content", {
//     x: -400,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power3.out",
//     delay: 0.3,
//   });

//   animateOnScroll(".second-content", {
//     x: 400,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power3.out",
//     delay: 0.6,
//   });

//   // animateOnScroll(".frame", {
//   //   y: 100,
//   //   opacity: 0,
//   //   duration: 1.2,
//   //   ease: "power3.out",
//   //   delay: 0.3
//   // });
// });
