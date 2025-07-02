const elementObserve = {
  firstPage: {
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
      // console.log(entry);

      if (entry.target.tagName === "IMG") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(elementObserve.firstPage.bgFire);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200);
          }
        }
      }

      if (entry.target.className === "main-page") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(elementObserve.firstPage.textContent);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 100);
          }
        }
      }
      
      if (entry.target.className === "text-content") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(elementObserve.secondPage.textContent);
            setTimeout(() => {
              entry.target.classList.add("show");
            }, 200);
          }
        }
      }

      
      if (entry.target.className === "box-content") {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.25) {
            observer.unobserve(elementObserve.thirdPage.boxContent);
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
observer.observe(elementObserve.firstPage.bgFire);
observer.observe(elementObserve.firstPage.textContent);
observer.observe(elementObserve.secondPage.textContent);
observer.observe(elementObserve.thirdPage.title);
observer.observe(elementObserve.thirdPage.boxContent);

function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}
