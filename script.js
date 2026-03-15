// Build email link at runtime to bypass Cloudflare obfuscation
const u = "aswinta0a";
const d = "gmail.com";
const emailCard = document.getElementById("email-card");
const emailDisplay = document.getElementById("email-display");
if (emailCard && emailDisplay) {
  const addr = u + "@" + d;
  emailCard.href = "mailto:" + addr;
  emailDisplay.textContent = addr;
}

// Animate skill bars when skills section comes into view
const skillsSection = document.getElementById("skills");
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".bar-fill").forEach(bar => {
        bar.classList.add("animate");
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

if (skillsSection) barObserver.observe(skillsSection);

// Hamburger menu toggle
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  toggle.classList.toggle("open");
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[data-label]");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Scroll reveal — add hidden via JS so content shows even if observer fails
const reveals = document.querySelectorAll(".reveal");
reveals.forEach(el => el.classList.add("hidden"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden");
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });

reveals.forEach(el => observer.observe(el));

// Hero fade-in on load
window.addEventListener("load", () => {
  document.querySelector(".hero-content").style.opacity = "1";
  document.querySelector(".hero-content").style.transform = "translateY(0)";
});

// Typewriter effect
const phrases = [
  "Ethical Hacker",
  "Web App Pentester",
  "Threat Hunter",
  "Security Enthusiast",
  "CTF Player",
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const typeEl = document.getElementById("typewriter");

function type() {
  if (!typeEl) return;
  const current = phrases[phraseIndex];
  if (deleting) {
    typeEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 60);
  } else {
    typeEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 90);
  }
}

type();
