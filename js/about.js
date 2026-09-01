// ===================================================================
// Aegis — about.js
// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
     mobile nav (идентично main.js)
  --------------------------------------------------------------- */
  const header = document.querySelector("[data-header]");
  const burger = document.querySelector("[data-burger]");

  if (burger) {
    burger.addEventListener("click", () => {
      const isOpen = header.classList.toggle("header--menu-open");
      burger.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll(".header__mobile-link, .header__mobile-cta").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("header--menu-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------------
     page-hero: pulse lines
  --------------------------------------------------------------- */
  document.querySelectorAll(".page-hero__pulse").forEach((path, i) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: 120, strokeDashoffset: length });
    if (!prefersReducedMotion) {
      gsap.to(path, {
        strokeDashoffset: -length,
        duration: 8 + i * 2.5,
        repeat: -1,
        ease: "none",
      });
    }
  });

  /* ---------------------------------------------------------------
     page-hero: title reveal + glitch
  --------------------------------------------------------------- */
  const titleLines = document.querySelectorAll("[data-page-title] .page-hero__title-line");

  if (titleLines.length && !prefersReducedMotion) {
    gsap.set(titleLines, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(titleLines, {
      y: 0,
      opacity: 1,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.08,
    });

    tl.to(
      "[data-page-title]",
      {
        x: -3,
        skewX: 1.5,
        duration: 0.04,
        repeat: 4,
        yoyo: true,
        ease: "power1.inOut",
      },
      "-=0.25"
    );

    tl.set("[data-page-title]", { x: 0, skewX: 0 });

    tl.from(".page-hero__eyebrow", { opacity: 0, y: -10, duration: 0.4 }, 0);
    tl.from(".page-hero__sub", { opacity: 0, y: 16, duration: 0.5 }, "-=0.45");
  } else {
    gsap.set([titleLines, ".page-hero__eyebrow", ".page-hero__sub"], {
      opacity: 1,
      y: 0,
    });
  }

  /* ---------------------------------------------------------------
     scroll reveals — общая утилита
  --------------------------------------------------------------- */
  function revealOnScroll(selector, vars = {}) {
    document.querySelectorAll(selector).forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        ...vars,
      });
    });
  }

  if (!prefersReducedMotion) {

    /* manifesto */
    revealOnScroll(".manifesto__eyebrow");
    revealOnScroll(".manifesto__title",  { delay: 0.05 });
    revealOnScroll(".manifesto__text",   { delay: 0.08 });
    revealOnScroll(".manifesto__quote",  { delay: 0.12 });

    /* values */
    revealOnScroll(".values__eyebrow");
    revealOnScroll(".values__title",     { delay: 0.05 });
    revealOnScroll(".values__lead",      { delay: 0.1 });

    gsap.from(".values__card", {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".values__grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    /* team */
    revealOnScroll(".team__eyebrow");
    revealOnScroll(".team__title",       { delay: 0.05 });
    revealOnScroll(".team__lead",        { delay: 0.1 });

    gsap.from(".team__card", {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".team__grid",
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    /* cta-final */
    revealOnScroll(".cta-final__title");
    revealOnScroll(".cta-final__text",   { delay: 0.1 });
    revealOnScroll(".cta-final__actions",{ delay: 0.15 });
  }
});
