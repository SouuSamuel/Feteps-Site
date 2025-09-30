/* Hydro Bot enhanced interactions + i18n - VERSÃO UNIFICADA */
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
      documentation: "Documentação",
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
      docTitle: "Documentação do Projeto Hydro Bot",
      docSubtitle: "Acompanhe as etapas do projeto e visualize o mapa mental que organiza nossas ideias.",
      step1Title: "Etapa 1: Planejamento",
      step1Text: "Definimos objetivos, funcionalidades do Hydro Bot e a estrutura do mapa mental para organizar as ideias.",
      step2Title: "Etapa 2: Desenvolvimento",
      step2Text: "Implementação dos sensores, bombeamento de água e integração do sistema com controle remoto e aplicativo.",
      step3Title: "Etapa 3: Testes",
      step3Text: "Realizamos simulações de incêndio, ajustes de robótica e validação do funcionamento do Hydro Bot.",
      step4Title: "Etapa 4: Documentação",
      step4Text: "Criação desta página com mapa mental interativo, registro de etapas e instruções para visualização do projeto.",
      followUs: "Siga nosso Instagram:"
    },
    en: {
      home: "Home",
      project: "Project",
      cases: "Cases",
      documentation: "Documentation",
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
      docTitle: "Hydro Bot Project Documentation",
      docSubtitle: "Follow the project steps and explore the mind map that organizes our ideas.",
      step1Title: "Step 1: Planning",
      step1Text: "We defined objectives, Hydro Bot functionalities, and the mind map structure to organize ideas.",
      step2Title: "Step 2: Development",
      step2Text: "Implementation of sensors, water pumping system, and integration with remote control and app.",
      step3Title: "Step 3: Testing",
      step3Text: "We performed fire simulations, robotics adjustments, and validation of Hydro Bot's operation.",
      step4Title: "Step 4: Documentation",
      step4Text: "Creation of this page with an interactive mind map, step records, and project viewing instructions.",
      followUs: "Follow us on Instagram:"
    },
    es: {
      home: "Inicio",
      project: "Proyecto",
      cases: "Casos",
      documentation: "Documentación",
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
      highlight2: "Escalável",
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
      docTitle: "Documentación del Proyecto Hydro Bot",
      docSubtitle: "Sigue las etapas del proyecto y visualiza el mapa mental que organiza nuestras ideas.",
      step1Title: "Etapa 1: Planificación",
      step1Text: "Definimos objetivos, funcionalidades del Hydro Bot y la estructura del mapa mental para organizar las ideas.",
      step2Title: "Etapa 2: Desarrollo",
      step2Text: "Implementación de sensores, bombeo de agua e integración del sistema con control remoto y aplicación.",
      step3Title: "Etapa 3: Pruebas",
      step3Text: "Realizamos simulaciones de incendios, ajustes de robótica y validación del funcionamiento del Hydro Bot.",
      step4Title: "Etapa 4: Documentación",
      step4Text: "Creación de esta página con mapa mental interactivo, registro de etapas e instrucciones para visualizar el proyecto.",
      followUs: "Síguenos en Instagram:"
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
    window.currentLang = lang; // Exporta para uso global
  }

  const savedLang = localStorage.getItem("lang") || "pt";
  setLanguage(savedLang);

  $$(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);
    });
  });

  // Exporta currentLang globalmente
  window.currentLang = savedLang;
})();

// ======= SISTEMA DE ACESSIBILIDADE COM TOGGLE VISUAL =======

let currentLang = localStorage.getItem("lang") || "pt";

// Criar botão de voz apenas se não existir
if (!document.getElementById('voice-access') && !document.getElementById('voice-btn')) {
  const voiceBtn = document.createElement("button");
  voiceBtn.id = "voice-access";
  voiceBtn.innerHTML = "🔊";
  voiceBtn.setAttribute("aria-label", "Ouvir o conteúdo da página");
  voiceBtn.setAttribute("title", "Pressione Ctrl+Alt+L para ouvir");
  voiceBtn.style.position = "fixed";
  voiceBtn.style.bottom = "90px";
  voiceBtn.style.right = "20px";
  voiceBtn.style.width = "50px";
  voiceBtn.style.height = "50px";
  voiceBtn.style.borderRadius = "50%";
  voiceBtn.style.background = "linear-gradient(45deg, #4CAF50, #00bcd4)";
  voiceBtn.style.color = "#fff";
  voiceBtn.style.fontSize = "20px";
  voiceBtn.style.display = "flex";
  voiceBtn.style.alignItems = "center";
  voiceBtn.style.justifyContent = "center";
  voiceBtn.style.cursor = "pointer";
  voiceBtn.style.zIndex = "1000";
  voiceBtn.style.border = "none";
  voiceBtn.style.boxShadow = "0 4px 15px rgba(76,175,80,0.3)";
  voiceBtn.style.transition = "all 0.3s ease";
  document.body.appendChild(voiceBtn);

  // Hover effect
  voiceBtn.addEventListener("mouseenter", () => {
    voiceBtn.style.transform = "scale(1.05)";
    voiceBtn.style.boxShadow = "0 6px 20px rgba(76,175,80,0.4)";
  });
  voiceBtn.addEventListener("mouseleave", () => {
    voiceBtn.style.transform = "scale(1)";
    voiceBtn.style.boxShadow = "0 4px 15px rgba(76,175,80,0.3)";
  });
}

// Função para obter voz por idioma
function getVoiceForLang(lang) {
  const voices = speechSynthesis.getVoices();
  const mapping = {
    pt: ["pt-BR", "pt"],
    en: ["en-US", "en"],
    es: ["es-ES", "es"],
  };
  const preferredLangs = mapping[lang] || ["pt-BR"];
  for (const prefLang of preferredLangs) {
    const voice = voices.find((v) => v.lang.includes(prefLang));
    if (voice) return voice;
  }
  return voices[0];
}

// Função de leitura COM TOGGLE VISUAL
function lerPagina() {
  const synth = window.speechSynthesis;
  const voiceBtn = document.getElementById('voice-access') || document.getElementById('voice-btn');
  
  if (synth.speaking) {
    synth.cancel();
    if (voiceBtn) voiceBtn.innerHTML = "🔊";
    return;
  }

  // Extrai texto da página
  const mainContent = document.querySelector('main');
  const textElements = mainContent ? mainContent.querySelectorAll('h1, h2, h3, p, td, th, .component-name, .component-function') : [];
  
  let textToRead = '';
  textElements.forEach(el => {
    if (el.offsetParent !== null) {
      textToRead += el.textContent.trim() + '. ';
    }
  });

  if (!textToRead) {
    textToRead = document.body.innerText;
  }

  const utter = new SpeechSynthesisUtterance(textToRead);
  utter.voice = getVoiceForLang(window.currentLang || currentLang);
  utter.rate = 0.9;
  utter.pitch = 1.0;

  // Muda ícone quando começa
  utter.onstart = () => {
    if (voiceBtn) voiceBtn.innerHTML = "⏸️";
  };

  // Restaura ícone quando termina
  utter.onend = () => {
    if (voiceBtn) voiceBtn.innerHTML = "🔊";
  };

  synth.speak(utter);
}

// Event listeners
const voiceBtn = document.getElementById('voice-access') || document.getElementById('voice-btn');
if (voiceBtn) {
  voiceBtn.addEventListener("click", lerPagina);
}

// Atalho de teclado (Ctrl + Alt + L)
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "l") {
    e.preventDefault();
    lerPagina();
  }
});

// Garantir vozes carregadas
speechSynthesis.getVoices();
speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};

// Fallback loader
setTimeout(() => {
  const loader = document.querySelector("#loader");
  if (loader) {
    loader.classList.add("hide");
  }
}, 5000);

// Chat balloon toggle
(function(){
  const chatBtn = document.getElementById('chat-btn');
  const chatBox = document.getElementById('chat-box');
  if(chatBtn && chatBox){
    chatBtn.addEventListener('click', () => {
      chatBox.classList.toggle('active');
      const input = document.getElementById('chat-input');
      if (chatBox.classList.contains('active') && input) input.focus();
    });
  }
})();

/* ==== public i18n helpers ==== */
try {
  window.setAppLanguage = (lang) => {
    const btn = document.querySelector('.lang-btn[data-lang="'+lang+'"]');
    if (btn) btn.click();
  };
} catch (e) {}