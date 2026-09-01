// ===================================================================
// Aegis — contacts.js
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
    tl.from(".page-hero__sub",     { opacity: 0, y: 16,  duration: 0.5 }, "-=0.45");
  } else {
    gsap.set([titleLines, ".page-hero__eyebrow", ".page-hero__sub"], {
      opacity: 1,
      y: 0,
    });
  }

  /* ---------------------------------------------------------------
     FAQ accordion
  --------------------------------------------------------------- */
  const faqButtons = document.querySelectorAll("[data-faq-btn]");

  faqButtons.forEach((btn) => {
    const answer = btn.nextElementSibling;

    // начальное состояние
    gsap.set(answer, { height: 0 });

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // закрываем все остальные
      faqButtons.forEach((otherBtn) => {
        if (otherBtn !== btn && otherBtn.getAttribute("aria-expanded") === "true") {
          otherBtn.setAttribute("aria-expanded", "false");
          const otherAnswer = otherBtn.nextElementSibling;

          if (prefersReducedMotion) {
            gsap.set(otherAnswer, { height: 0 });
          } else {
            gsap.to(otherAnswer, { height: 0, duration: 0.32, ease: "power2.in" });
          }
        }
      });

      // переключаем текущий
      if (isOpen) {
        btn.setAttribute("aria-expanded", "false");
        if (prefersReducedMotion) {
          gsap.set(answer, { height: 0 });
        } else {
          gsap.to(answer, { height: 0, duration: 0.32, ease: "power2.in" });
        }
      } else {
        btn.setAttribute("aria-expanded", "true");
        const naturalHeight = answer.scrollHeight;

        if (prefersReducedMotion) {
          gsap.set(answer, { height: naturalHeight });
        } else {
          gsap.to(answer, { height: naturalHeight, duration: 0.38, ease: "power2.out" });
        }
      }
    });
  });

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

    /* contact section */
    revealOnScroll(".contact__eyebrow");
    revealOnScroll(".contact__title",  { delay: 0.05 });
    revealOnScroll(".contact__lead",   { delay: 0.1 });

    gsap.from(".contact__card", {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".contact__grid",
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    /* faq section */
    revealOnScroll(".faq__eyebrow");
    revealOnScroll(".faq__title",      { delay: 0.05 });
    revealOnScroll(".faq__lead",       { delay: 0.1 });

    gsap.from(".faq__item", {
      opacity: 0,
      y: 16,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.07,
      scrollTrigger: {
        trigger: ".faq__list",
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    /* cta-final */
    revealOnScroll(".cta-final__title");
    revealOnScroll(".cta-final__text",    { delay: 0.1 });
    revealOnScroll(".cta-final__actions", { delay: 0.15 });
  }
});
