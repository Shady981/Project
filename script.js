/* ======================================================
   GLOBAL JS – Accident Analysis Project
   Final Clean Version (Professional / Graduation Level)
====================================================== */

console.log("✅ script.js connected successfully");

/* ================= GSAP PLUGINS ================= */
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  TextPlugin,
  ScrollToPlugin
);

document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     SMOOTH SCROLL (OPTIONAL – SAFE)
  ====================================================== */
  if (document.querySelector("#smooth-wrapper")) {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true
    });
  }

  /* ======================================================
     SMOOTH ANCHOR SCROLL
  ====================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        gsap.to(window, {
          duration: 1,
          scrollTo: target.offsetTop - 150,
          ease: "power2.out"
        });
      }
    });
  });

  /* ======================================================
     ACTIVE NAV LINK (TOP NAVBAR)
  ====================================================== */
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* ======================================================
     SUB NAV ACTIVE (PAGE 2 & 3)
  ====================================================== */
  document.querySelectorAll("section[id]").forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setSubActive(section.id),
      onEnterBack: () => setSubActive(section.id)
    });
  });

  function setSubActive(id) {
    document.querySelectorAll(".sub-btn").forEach(btn => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("href") === `#${id}`
      );
    });
  }

  /* ======================================================
     REVEAL ANIMATIONS
  ====================================================== */
  gsap.utils.toArray(".card, .insight-card, .kpi-box").forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%"
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  /* ======================================================
     TEXT ANIMATION
     usage:
     class="animate-text" data-text="NEW TEXT"
  ====================================================== */
  document.querySelectorAll(".animate-text").forEach(el => {
    gsap.to(el, {
      duration: 1,
      text: {
        value: el.dataset.text,
        delimiter: " "
      },
      scrollTrigger: {
        trigger: el,
        start: "top 90%"
      }
    });
  });

  /* ======================================================
     IMAGE MODAL (CLICK TO ZOOM)
  ====================================================== */
  const modal = document.createElement("div");
  modal.id = "imgModal";
  modal.innerHTML = `<span>&times;</span><img />`;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  modal.addEventListener("click", () => modal.style.display = "none");

  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
    });
  });

  /* ======================================================
     SCROLL TO TOP / BOTTOM
  ====================================================== */
  const topBtn = document.getElementById("scrollTop");
  const bottomBtn = document.getElementById("scrollBottom");

  if (topBtn) {
    topBtn.onclick = () =>
      gsap.to(window, { scrollTo: 0, duration: 1 });
  }

  if (bottomBtn) {
    bottomBtn.onclick = () =>
      gsap.to(window, {
        scrollTo: document.body.scrollHeight,
        duration: 1
      });
  }

  /* ======================================================
     PROGRESS BAR (PAGE 2)
  ====================================================== */
  const progress = document.getElementById("progress-bar");
  if (progress) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: self => {
        progress.style.width = `${self.progress * 100}%`;
      }
    });
  }

  /* ======================================================
     NAVBAR SHADOW ON SCROLL
  ====================================================== */
  ScrollTrigger.create({
    start: 50,
    onEnter: () =>
      gsap.to(".navbar", {
        boxShadow: "0 12px 35px rgba(0,0,0,.25)"
      }),
    onLeaveBack: () =>
      gsap.to(".navbar", {
        boxShadow: "0 8px 28px rgba(0,0,0,.18)"
      })
  });

});

/* ======================================================
   MODAL STYLES (INJECTED)
====================================================== */
const style = document.createElement("style");
style.innerHTML = `
#imgModal{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.85);
  display:none;
  align-items:center;
  justify-content:center;
  z-index:99999;
}
#imgModal img{
  max-width:90%;
  max-height:90%;
  border-radius:14px;
}
#imgModal span{
  position:absolute;
  top:30px;
  right:40px;
  font-size:42px;
  color:white;
  cursor:pointer;
}
.sub-btn.active{
  background:#16a34a !important;
}
`;
document.head.appendChild(style);
/* ================= DARK MODE TOGGLE ================= */
const darkBtn = document.getElementById("darkToggle");

if (darkBtn) {

 const darkBtn = document.getElementById("darkToggle");

if (darkBtn) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkBtn.innerText = "☀️";
  }

  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      darkBtn.innerText = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      darkBtn.innerText = "🌙";
    }
  });
}
}
// Scroll arrows
const upBtn = document.getElementById("scrollUp");
const downBtn = document.getElementById("scrollDown");

if(upBtn && downBtn){
  upBtn.onclick = () => {
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  downBtn.onclick = () => {
    window.scrollTo({
      top:document.body.scrollHeight,
      behavior:"smooth"
    });
  };
}
// Appreciation message for supervisor
const collegeLogo = document.getElementById("collegeLogo");

if(collegeLogo){
  collegeLogo.addEventListener("click", () => {
    alert(
      "We sincerely thank Dr. Rasha Abobakr for her continuous support, guidance, and cooperation throughout our graduation project.\n\nWe wish her continued success and excellence."
    );
  });
}
// Footer year range
const yearSpan = document.getElementById("yearRange");
if(yearSpan){
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  yearSpan.textContent =
    currentYear > startYear ? `${startYear} – ${currentYear}` : startYear;
}
// Mobile Navbar Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if(menuToggle && navLinks){
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}
