// ===================================================================
// Aegis — products.js
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
      y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.08,
    });
    tl.to("[data-page-title]", {
      x: -3, skewX: 1.5, duration: 0.04, repeat: 4, yoyo: true, ease: "power1.inOut",
    }, "-=0.25");
    tl.set("[data-page-title]", { x: 0, skewX: 0 });
    tl.from(".page-hero__eyebrow", { opacity: 0, y: -10, duration: 0.4 }, 0);
    tl.from(".page-hero__sub",     { opacity: 0, y: 16,  duration: 0.5 }, "-=0.45");
  } else {
    gsap.set([titleLines, ".page-hero__eyebrow", ".page-hero__sub"], { opacity: 1, y: 0 });
  }

  /* ---------------------------------------------------------------
     router card: scan line sweeping down
  --------------------------------------------------------------- */
  const scanLine = document.querySelector(".pcard__scan-line");

  if (scanLine && !prefersReducedMotion) {
    gsap.set(scanLine, { attr: { y1: -10, y2: -10 } });

    gsap.to(scanLine, {
      attr: { y1: 310, y2: 310 },
      duration: 2.8,
      repeat: -1,
      ease: "power1.inOut",
      repeatDelay: 1.8,
    });
  }

  /* ---------------------------------------------------------------
     VPN card: traveling pulse dot along center stream
  --------------------------------------------------------------- */
  const vpnDot = document.querySelector(".pcard__vpn-dot");

  if (vpnDot && !prefersReducedMotion) {
    gsap.fromTo(
      vpnDot,
      { attr: { cx: 0, cy: 150 } },
      {
        attr: { cx: 290, cy: 150 },
        duration: 2.2,
        repeat: -1,
        ease: "none",
        repeatDelay: 0.6,
      }
    );

    /* also pulse opacity */
    gsap.fromTo(
      vpnDot,
      { opacity: 0 },
      { opacity: 0.85, duration: 0.3, repeat: -1, yoyo: true, ease: "none", repeatDelay: 1.5 }
    );
  }

  /* ---------------------------------------------------------------
     router card: subtle glow pulse on the chip rect
  --------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    const chipRect = document.querySelector(".pcard__deco-svg--router rect:nth-child(3)");
    if (chipRect) {
      gsap.to(chipRect, {
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }

  /* ---------------------------------------------------------------
     pcard drawer: open / close
  --------------------------------------------------------------- */
  const pcards = document.querySelectorAll("[data-pcard]");

  pcards.forEach((pcard) => {
    pcard.addEventListener("click", () => {
      const type       = pcard.dataset.pcard;
      const pdrawer    = document.querySelector(`[data-pdrawer="${type}"]`);
      const isOpen     = pcard.getAttribute("aria-expanded") === "true";
      const triggerTxt = pcard.querySelector(".pcard__trigger-text");

      /* close any other open drawer */
      pcards.forEach((other) => {
        if (other !== pcard && other.getAttribute("aria-expanded") === "true") {
          const otherType    = other.dataset.pcard;
          const otherDrawer  = document.querySelector(`[data-pdrawer="${otherType}"]`);
          const otherTrigger = other.querySelector(".pcard__trigger-text");
          closeDrawer(other, otherDrawer, otherTrigger);
        }
      });

      if (isOpen) {
        closeDrawer(pcard, pdrawer, triggerTxt);
      } else {
        openDrawer(pcard, pdrawer, triggerTxt);
      }
    });
  });

  function openDrawer(pcard, pdrawer, triggerTxt) {
    if (!pdrawer) return;

    pcard.setAttribute("aria-expanded", "true");
    if (triggerTxt) triggerTxt.textContent = "Скрыть";

    /* measure natural height */
    gsap.set(pdrawer, { height: "auto", overflow: "hidden" });
    const targetH = pdrawer.offsetHeight;
    gsap.set(pdrawer, { height: 0 });

    const items = pdrawer.querySelectorAll(".pmodel, .psub");
    gsap.set(items, { opacity: 0, y: 18 });

    const tl = gsap.timeline();
    tl.to(pdrawer, { height: targetH, duration: 0.46, ease: "power3.out" });
    tl.to(
      items,
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" },
      "-=0.22"
    );

    /* smooth scroll so drawer is visible */
    tl.add(() => {
      pdrawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, "+=0.05");
  }

  function closeDrawer(pcard, pdrawer, triggerTxt) {
    if (!pdrawer) return;

    pcard.setAttribute("aria-expanded", "false");

    /* restore original button label based on product type */
    if (triggerTxt) {
      triggerTxt.textContent = pcard.dataset.pcard === "router"
        ? "Выбрать модель"
        : "Выбрать тариф";
    }

    gsap.to(pdrawer, {
      height: 0,
      duration: 0.32,
      ease: "power2.in",
      onComplete: () => gsap.set(pdrawer, { clearProps: "all", height: 0 }),
    });
  }

  /* close drawer on ESC */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    pcards.forEach((pcard) => {
      if (pcard.getAttribute("aria-expanded") === "true") {
        const type    = pcard.dataset.pcard;
        const pdrawer = document.querySelector(`[data-pdrawer="${type}"]`);
        const trigTxt = pcard.querySelector(".pcard__trigger-text");
        closeDrawer(pcard, pdrawer, trigTxt);
      }
    });
  });

  /* ---------------------------------------------------------------
     scroll reveals
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

    /* products head */
    revealOnScroll(".products__eyebrow");
    revealOnScroll(".products__title",   { delay: 0.05 });
    revealOnScroll(".products__lead",    { delay: 0.1 });

    /* product cards stagger */
    gsap.from(".products__slot", {
      opacity: 0,
      y: 32,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".products__pair",
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    /* included */
    revealOnScroll(".included__eyebrow");
    revealOnScroll(".included__title",   { delay: 0.05 });
    revealOnScroll(".included__lead",    { delay: 0.1 });

    gsap.from(".included__item", {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".included__grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    /* delivery */
    revealOnScroll(".delivery__eyebrow");
    revealOnScroll(".delivery__title",   { delay: 0.05 });

    gsap.from(".delivery__item", {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".delivery__grid",
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
