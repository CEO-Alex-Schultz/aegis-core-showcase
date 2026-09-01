// ===================================================================
// ЛАЗ — main.js
// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
     mobile nav
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
     hero: title reveal + glitch burst
  --------------------------------------------------------------- */
  const titleLines = document.querySelectorAll("[data-glitch-title] .hero__title-line");

  if (titleLines.length && !prefersReducedMotion) {
    gsap.set(titleLines, { y: 40, opacity: 0 });

    const heroTimeline = gsap.timeline({ delay: 0.15 });

    heroTimeline.to(titleLines, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.08,
    });

    heroTimeline.to(
      ".hero__title",
      {
        x: -4,
        skewX: 2,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut",
      },
      "-=0.3"
    );

    heroTimeline.set(".hero__title", { x: 0, skewX: 0 });

    heroTimeline.from(".hero__eyebrow", { opacity: 0, y: -10, duration: 0.4 }, 0);
    heroTimeline.from(".hero__subtitle", { opacity: 0, y: 16, duration: 0.5 }, "-=0.5");
    heroTimeline.from(".hero__actions", { opacity: 0, y: 16, duration: 0.5 }, "-=0.4");
    heroTimeline.from(".hero__terminal", { opacity: 0, y: 24, duration: 0.6 }, "-=0.5");
  } else {
    gsap.set([titleLines, ".hero__eyebrow", ".hero__subtitle", ".hero__actions", ".hero__terminal"], {
      opacity: 1,
      y: 0,
    });
  }

  /* ---------------------------------------------------------------
     hero: pulse lines traveling along the grid paths
  --------------------------------------------------------------- */
  document.querySelectorAll(".hero__pulse-line").forEach((path, i) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: 140, strokeDashoffset: length });
    if (!prefersReducedMotion) {
      gsap.to(path, {
        strokeDashoffset: -length,
        duration: 7 + i * 2,
        repeat: -1,
        ease: "none",
      });
    }
  });

  /* ---------------------------------------------------------------
     hero: terminal log typing
  --------------------------------------------------------------- */
  const terminalBody = document.querySelector("[data-terminal-body]");

  const LOG_LINES = [
    // { text: "zapret v2 ............ активен", cls: "ok" },
    // { text: "tgwsproxy ............ запущен", cls: "ok" },
    { text: "подкоп: проверка каналов", cls: "" },
    { text: "vless+reality ........ установлен", cls: "ok" },
    { text: "hysteria2 ............ туннель открыт", cls: "ok" },
    { text: "wireguard ............ резерв", cls: "" },
    { text: "trojan ................ резерв", cls: "" },
    { text: "проверка заблокированных доменов", cls: "warn" },
    { text: "доступ восстановлен .. готово", cls: "ok" },
  ];

  function typeTerminal() {
    if (!terminalBody) return;
    terminalBody.innerHTML = "";
    let lineIndex = 0;

    const cursor = document.createElement("span");
    cursor.className = "hero__terminal-cursor";

    function nextLine() {
      if (lineIndex >= LOG_LINES.length) {
        setTimeout(typeTerminal, 2200);
        return;
      }
      const { text, cls } = LOG_LINES[lineIndex];
      const row = document.createElement("div");
      row.className = "hero__terminal-line";
      const prompt = document.createElement("span");
      prompt.textContent = ">";
      const content = document.createElement("span");
      if (cls) content.classList.add(cls);
      row.appendChild(prompt);
      row.appendChild(content);
      terminalBody.appendChild(row);

      let charIndex = 0;
      const speed = prefersReducedMotion ? 0 : 18;

      function typeChar() {
        if (charIndex <= text.length) {
          content.textContent = text.slice(0, charIndex);
          charIndex++;
          setTimeout(typeChar, speed);
        } else {
          lineIndex++;
          setTimeout(nextLine, 260);
        }
      }
      typeChar();
    }
    nextLine();
  }

  typeTerminal();

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
    revealOnScroll(".problem__eyebrow");
    revealOnScroll(".problem__title", { delay: 0.05 });
    revealOnScroll(".problem__text", { delay: 0.1 });
    revealOnScroll(".problem__list-item", { delay: 0.05 });
    revealOnScroll(".problem__resolve", { delay: 0.1 });

    revealOnScroll(".stack__eyebrow");
    revealOnScroll(".stack__title", { delay: 0.05 });
    revealOnScroll(".stack__lead", { delay: 0.1 });

    gsap.from(".stack__card", {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".stack__grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    revealOnScroll(".process__eyebrow");
    revealOnScroll(".process__title", { delay: 0.05 });

    gsap.from(".process__item", {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".process__list",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    revealOnScroll(".cta-final__title");
    revealOnScroll(".cta-final__text", { delay: 0.1 });
    revealOnScroll(".cta-final__actions", { delay: 0.15 });
  }

  /* ---------------------------------------------------------------
     animated counters
  --------------------------------------------------------------- */
  document.querySelectorAll("[data-counter]").forEach((el) => {
    const target = parseFloat(el.dataset.target);

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        if (prefersReducedMotion) {
          el.textContent = target;
          return;
        }
        gsap.to(el, {
          textContent: target,
          duration: 1.4,
          ease: "power1.out",
          snap: { textContent: 1 },
        });
      },
    });
  });
});
