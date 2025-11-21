const cursorMain = document.querySelector(".cursor-main");
const cursorRing = document.querySelector(".cursor-ring");
const cursorTrail = document.querySelector(".cursor-trail");
const hoverTargets = document.querySelectorAll("[data-cursor-hover]");
const body = document.body;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;
let trailX = mouseX;
let trailY = mouseY;

const ringLerpFactor = 0.14;
const trailLerpFactor = 0.1;

function lerp(start, end, alpha) {
  return start + (end - start) * alpha;
}

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  cursorMain.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;
});

function animateCursors() {
  ringX = lerp(ringX, mouseX, ringLerpFactor);
  ringY = lerp(ringY, mouseY, ringLerpFactor);

  trailX = lerp(trailX, mouseX, trailLerpFactor);
  trailY = lerp(trailY, mouseY, trailLerpFactor);

  cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`;
  cursorTrail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate3d(-50%, -50%, 0)`;

  requestAnimationFrame(animateCursors);
}

animateCursors();

hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    body.classList.add("cursor-hovering");
  });
  el.addEventListener("mouseleave", () => {
    body.classList.remove("cursor-hovering");
  });
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 88;
        const rect = target.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
});

const joinForm = document.querySelector(".join-form");
if (joinForm) {
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = joinForm.querySelector("input[type='email']");
    if (!input) return;
    const email = input.value.trim();
    if (!email) return;

    const originalPlaceholder = input.placeholder;
    input.value = "";
    input.placeholder = "Transmission received. May the Force be with you.";
    input.classList.add("success");

    setTimeout(() => {
      input.placeholder = originalPlaceholder;
      input.classList.remove("success");
    }, 2800);
  });
}
