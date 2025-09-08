/* Hydro Bot enhanced interactions + i18n - VERSÃO LIMPA */
(function () {
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  // Loader
  window.addEventListener("load", () => {
    const loader = $("#loader");
    if (loader) {
      setTimeout(() => loader.classList.add("hide"), 200);
    }
  });

  // Mobile nav toggle
  const toggle = $(".nav-toggle");
  const nav = $("#nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Year
  $$("[data-year]").forEach((s) => (s.textContent = new Date().getFullYear()));

  // Back to top
  const back = $("#backToTop");
  if (back) {
    const onScroll = () => {
      if (window.scrollY > 400) back.classList.add("show");
      else back.classList.remove("show");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    back.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
    onScroll();
  }

  // Reveal on scroll
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // Lightbox para galeria
  function setupLightbox() {
    const items = $$(".gallery-item");
    if (!items.length) return;

    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML =
      '<div class="lb-wrapper"><img alt=""><div class="caption"></div></div>';
    document.body.appendChild(lb);

    const img = $("img", lb);
    const caption = $(".caption", lb);

    function open(src, captionKey) {
      img.src = src;
      const currentLang = localStorage.getItem("lang") || "pt";
      const captionText =
        translations[currentLang] && translations[currentLang][captionKey]
          ? translations[currentLang][captionKey]
          : captionKey || "";
      caption.textContent = captionText;
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
    }

    function close() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      img.src = "";
    }

    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    items.forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const captionKey =
          a.getAttribute("data-caption-key") || a.getAttribute("data-caption");
        open(a.getAttribute("href"), captionKey);
      });
    });
  }
  setupLightbox();

  // Tilt effect
  function setupTilt() {
    const tiltEls = $$(".tilt");
    tiltEls.forEach((el) => {
      let rect;
      function updateRect() {
        rect = el.getBoundingClientRect();
      }
      updateRect();
      window.addEventListener("resize", updateRect);

      el.addEventListener("mousemove", (e) => {
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * 6;
        const ry = (x - 0.5) * 6;
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform =
          "perspective(800px) rotateX(0deg) rotateY(0deg)";
      });
    });
  }
  setupTilt();

  /* ======================
       SISTEMA DE I18N
  ====================== */
  const translations = {
    pt: {
      home: "Home",
      project: "Projeto",
      cases: "Casos",
      contact: "Contato",
      heroTitle:
        "Inovação no combate e <span class='accent'>prevenção de incêndios</span>",
      heroSubtitle:
        "O Hydro Bot integra sensores, visão computacional e resposta rápida para proteger pessoas e ambientes críticos.",
      seeProject: "Ver Projeto",
      seeCases: "Casos de Incêndio",
      why: "Por que Hydro Bot?",
      whyText:
        'O nome Hydro Bot une dois conceitos: "Hydro", que remete à água usada no combate ao fogo, e "Bot", de robô. Assim, ele representa um robô autônomo que utiliza água para extinguir incêndios - <strong>agilidade</strong>, <strong>precisão</strong> e <strong>segurança</strong>.',
      how: "Como funciona",
      howItem1:
        "O Hydro Bot detecta fogo com sensores, navega sozinho por corredores, e usa um spray de água do reservatório para apagar o incêndio.",
      howItem2:
        "Todo o sistema é controlado por um Arduino e alimentado por baterias.",
      highlights: "Destaques",
      highlight1: "Resposta Rápida",
      highlight1Text: "Minimizamos o tempo crítico entre detecção e combate.",
      highlight2: "Escalável",
      highlight2Text:
        "Do laboratório à indústria, adaptável a diferentes cenários.",
      highlight3: "Monitoramento",
      highlight3Text:
        "Dados e imagens para análise posterior e melhoria contínua.",
      architecture: "Arquitetura",
      architectureText:
        "Integração de sensores, câmera, módulo de decisão e atuadores para resposta automática.",
      sensor1: "Sensor de fumaça/temperatura",
      sensor2: "Visão computacional para detecção de chamas",
      sensor3: "Acionamento de bomba/aspersão",
      projectPhotos: "Fotos do projeto:",
      seeFireCases: "Ver sobre casos de incêndios",
      casesTitle: "Galeria de Casos de Incêndio",
      casesInstructions: "Clique nas imagens para ampliar.",
      case1Caption:
        "Um curto-circuito em um carregador de celular provocou um incêndio em um apartamento.",
      case2Caption:
        "O incêndio começou quando o sobrinho do proprietário fumava deitado na cama e deixou a bituca acesa cair sobre o colchão.",
      case3Caption:
        "O incêndio no Instituto Butantan em 2010 foi provavelmente causado por um curto-circuito ou sobrecarga elétrica.",
      firefighterTestimony: "Depoimento de um Bombeiro",
      firefighterName: "NOME DO BOMBEIRO",
      videoNotSupported: "Seu navegador não suporta reproduzir este vídeo.",
      contactText: "Envie um e-mail para",
      footer: "Todos os direitos reservados.",
      loading: "Carregando…",
    },
    en: {
      home: "Home",
      project: "Project",
      cases: "Cases",
      contact: "Contact",
      heroTitle:
        "Innovation in fire <span class='accent'>prevention and control</span>",
      heroSubtitle:
        "Hydro Bot integrates sensors, computer vision, and rapid response to protect people and critical environments.",
      seeProject: "See Project",
      seeCases: "Fire Cases",
      why: "Why Hydro Bot?",
      whyText:
        'The name Hydro Bot combines two concepts: "Hydro", referring to the water used to fight fire, and "Bot", for robot. It represents an autonomous robot that uses water to extinguish fires - <strong>agility</strong>, <strong>precision</strong>, and <strong>safety</strong>.',
      how: "How it works",
      howItem1:
        "Hydro Bot detects fire with sensors, navigates autonomously through corridors, and uses a water spray from the reservoir to extinguish the fire.",
      howItem2: "The system can be controlled via the app or through its own system.",
      highlights: "Highlights",
      highlight1: "Quick Response",
      highlight1Text: "We minimize the critical time between detection and action.",
      highlight2: "Scalable",
      highlight2Text: "From labs to industry, adaptable to various scenarios.",
      highlight3: "Monitoring",
      highlight3Text: "Data and images for analysis and continuous improvement.",
      architecture: "Architecture",
      architectureText:
        "Integration of sensors, camera, decision module and actuators for automatic response.",
      sensor1: "Smoke/temperature sensor",
      sensor2: "Computer vision for flame detection",
      sensor3: "Pump/sprinkler activation",
      projectPhotos: "Project photos:",
      seeFireCases: "See about fire cases",
      casesTitle: "Fire Cases Gallery",
      casesInstructions: "Click on images to enlarge.",
      case1Caption:
        "A short circuit in a cell phone charger caused a fire in an apartment.",
      case2Caption:
        "The fire started when the owner's nephew was smoking lying in bed and let the lit cigarette butt fall on the mattress.",
      case3Caption:
        "The fire at the Butantan Institute in 2010 was probably caused by a short circuit or electrical overload.",
      firefighterTestimony: "Firefighter Testimonial",
      firefighterName: "FIREFIGHTER NAME",
      videoNotSupported: "Your browser does not support playing this video.",
      contactText: "Send an email to",
      footer: "All rights reserved.",
      loading: "Loading…",
    },
    es: {
      home: "Inicio",
      project: "Proyecto",
      cases: "Casos",
      contact: "Contacto",
      heroTitle:
        "Innovación en <span class='accent'>prevención y control de incendios</span>",
      heroSubtitle:
        "Hydro Bot integra sensores, visión por computadora y respuesta rápida para proteger personas y entornos críticos.",
      seeProject: "Ver Proyecto",
      seeCases: "Casos de Incendio",
      why: "¿Por qué Hydro Bot?",
      whyText:
        'El nombre Hydro Bot une dos conceptos: "Hydro", que remite al agua usada para apagar el fuego, y "Bot", de robot. Representa un robot autónomo que utiliza agua para extinguir incendios - <strong>agilidad</strong>, <strong>precisión</strong> y <strong>seguridad</strong>.',
      how: "Cómo funciona",
      howItem1:
        "Hydro Bot detecta fuego con sensores, navega autónomamente por pasillos, y usa un spray de agua del reservorio para extinguir el incendio.",
      howItem2:
        "El sistema se puede controlar a través de la aplicación o mediante su propio sistema.",
      highlights: "Aspectos destacados",
      highlight1: "Respuesta Rápida",
      highlight1Text: "Minimizamos el tiempo crítico entre detección y combate.",
      highlight2: "Escalable",
      highlight2Text:
        "Del laboratorio a la industria, adaptable a diferentes escenarios.",
      highlight3: "Monitoreo",
      highlight3Text:
        "Datos e imágenes para análisis posterior y mejora continua.",
      architecture: "Arquitectura",
      architectureText:
        "Integración de sensores, cámara, módulo de decisión y actuadores para respuesta automática.",
      sensor1: "Sensor de humo/temperatura",
      sensor2: "Visión por computadora para detección de llamas",
      sensor3: "Activación de bomba/aspersión",
      projectPhotos: "Fotos del proyecto:",
      seeFireCases: "Ver sobre casos de incendios",
      casesTitle: "Galería de Casos de Incendio",
      casesInstructions: "Haz clic en las imágenes para ampliar.",
      case1Caption:
        "Un cortocircuito en un cargador de celular provocó un incendio en un apartamento.",
      case2Caption:
        "El incendio comenzó cuando el sobrino del propietario fumaba acostado en la cama y dejó caer la colilla encendida sobre el colchón.",
      case3Caption:
        "El incendio en el Instituto Butantan en 2010 fue probablemente causado por un cortocircuito o sobrecarga eléctrica.",
      firefighterTestimony: "Testimonio de un Bombero",
      firefighterName: "NOMBRE DEL BOMBERO",
      videoNotSupported: "Su navegador no soporta reproducir este video.",
      contactText: "Envíe un correo a",
      footer: "Todos los derechos reservados.",
      loading: "Cargando…",
    },
  };

  function setLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;
    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        if (el.tagName.toLowerCase() === "input") {
          el.placeholder = dict[key];
        } else {
          el.innerHTML = dict[key];
        }
      }
    });
    $$(".gallery-item").forEach((item) => {
      const captionKey = item.getAttribute("data-caption-key");
      if (captionKey && dict[captionKey]) {
        item.setAttribute("data-caption", dict[captionKey]);
      }
    });
    localStorage.setItem("lang", lang);
    $$(".lang-btn").forEach((btn) => btn.classList.remove("active"));
    const activeBtn = $(`[data-lang="${lang}"]`);
    if (activeBtn) activeBtn.classList.add("active");
  }

  const savedLang = localStorage.getItem("lang") || "pt";
  setLanguage(savedLang);

  $$(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);
      currentLang = lang; // também atualiza a voz
    });
  });
})();

// ======= ACESSIBILIDADE PARA CEGOS =======

let currentLang = localStorage.getItem("lang") || "pt";

// Cria botão flutuante
const voiceBtn = document.createElement("button");
voiceBtn.id = "voice-access";
voiceBtn.innerText = "🔊 Ler Página";
voiceBtn.style.position = "fixed";
voiceBtn.style.bottom = "100px";
voiceBtn.style.right = "20px";
voiceBtn.style.padding = "12px 16px";
voiceBtn.style.borderRadius = "12px";
voiceBtn.style.background = "linear-gradient(45deg, #E63946, #00bcd4)";
voiceBtn.style.color = "#fff";
voiceBtn.style.fontWeight = "bold";
voiceBtn.style.cursor = "pointer";
voiceBtn.style.zIndex = "2000";
document.body.appendChild(voiceBtn);

// Mapeia vozes por idioma
function getVoiceForLang(lang) {
  const voices = speechSynthesis.getVoices();
  const mapping = {
    pt: ["pt-BR", "Google português do Brasil"],
    en: ["en-US", "Google US English"],
    es: ["es-ES", "Google español"],
  };
  const prefer = mapping[lang];
  if (!prefer) return voices[0];
  let voice = voices.find((v) => v.name.includes(prefer[1]));
  if (!voice) voice = voices.find((v) => v.lang === prefer[0]);
  return voice || voices[0];
}

// Função de leitura
function lerPagina() {
  const synth = window.speechSynthesis;
  if (synth.speaking) {
    synth.cancel();
    return;
  }
  const texto = document.body.innerText;
  const utter = new SpeechSynthesisUtterance(texto);
  utter.voice = getVoiceForLang(currentLang);
  utter.rate = 1.0;
  utter.pitch = 1.0;
  synth.speak(utter);
}

// Clique no botão
voiceBtn.addEventListener("click", lerPagina);

// Atalho de teclado (Ctrl + Alt + L)
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "l") {
    lerPagina();
  }
});

// Fallback loader
setTimeout(() => {
  const loader = document.querySelector("#loader");
  if (loader) {
    loader.classList.add("hide");
  }
}, 5000);
