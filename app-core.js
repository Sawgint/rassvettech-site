// app-core.js — маршруты, лайтбокс, почта, hash, и ВПРЫСК СТИЛЕЙ (SCOPED)
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- CSS INJECTION (scoped к #rassvet-root) ----------
  const STYLE_CSS = `
#rassvet-root{
  --bg:#f4f9ff; --card:#ffffff; --ink:#0c1b2a; --muted:#415066;
  --brand:#2e7cf6; --brand2:#3aa0ff; --line:#e6efff;
  --shadow:0 18px 40px rgba(17,43,102,.12);
  --r:18px; --mw:1120px;
  color:var(--ink);
  background:radial-gradient(1200px 420px at 50% -120px,#eaf3ff 15%,transparent 60%), var(--bg);
  line-height:1.55; letter-spacing:.1px;
}
#rassvet-root *{box-sizing:border-box}
#rassvet-root img,#rassvet-root video,#rassvet-root canvas,#rassvet-root svg{max-width:100%;height:auto;display:block}

/* Header */
#rassvet-root header{position:relative;padding:56px 18px 16px;text-align:center;border-bottom:1px solid var(--line)}
#rassvet-root .contact-pill{
  position:absolute; right:16px; top:16px; display:inline-flex; gap:.5rem; align-items:center;
  padding:8px 14px; border-radius:999px; background:#fff; border:1px solid var(--line); color:var(--brand);
  box-shadow:var(--shadow); font-weight:600; white-space:nowrap;
}
#rassvet-root h1.logo{
  margin:6px auto 8px; font-size:clamp(40px,5vw,72px); font-weight:900; letter-spacing:.6px;
  background:linear-gradient(90deg,var(--brand),var(--brand2)); -webkit-background-clip:text; background-clip:text; color:transparent;
}
#rassvet-root .hero-desc{max-width:min(920px,100%);margin:10px auto 0;padding:0 12px;text-align:left;color:var(--muted)}
#rassvet-root .ornament{user-select:none;letter-spacing:.4ch;font-size:15px;color:#97b7ff;white-space:nowrap;overflow:hidden;padding:6px 10px}

/* Top nav */
#rassvet-root .topnav{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:18px 0 8px}
#rassvet-root .tab{
  border:1px solid var(--line);background:#fff;color:var(--ink);padding:10px 14px;border-radius:12px;cursor:pointer;
  box-shadow:var(--shadow);transition:transform .15s ease, box-shadow .15s ease;font-weight:700
}
#rassvet-root .tab:hover{transform:translateY(-2px)}
#rassvet-root .tab.active{background:linear-gradient(90deg,#f9fbff,#eef6ff);border-color:#dbe7ff;color:#0f2e7a}

/* Languages */
#rassvet-root .topbar{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:12px 0 0}
#rassvet-root .lang{display:flex;gap:8px}
#rassvet-root .lang button{border:1px solid var(--line);background:#fff;color:#20428a;padding:8px 10px;border-radius:10px;cursor:pointer;font-weight:700}
#rassvet-root .lang button.active{background:#e9f2ff}

/* Layout */
#rassvet-root main{max-width:var(--mw);margin:0 auto;padding:22px 16px 80px}
#rassvet-root section{margin:28px 0}
#rassvet-root .card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);box-shadow:var(--shadow);padding:22px}
#rassvet-root h2{margin:0 0 12px;font-size:1.6rem;letter-spacing:.2px}
#rassvet-root h3{margin:14px 0 8px;font-size:1.1rem}
#rassvet-root .grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
#rassvet-root .feature{padding:14px;border:1px solid var(--line);border-radius:14px;background:#fff}
#rassvet-root .muted{color:var(--muted)}
#rassvet-root .tag{padding:6px 10px;border-radius:999px;background:#eef5ff;color:#0f57d7;border:1px solid #d8e7ff;font-size:.82rem}

/* Gallery */
#rassvet-root .gallery{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));align-items:start}
#rassvet-root figure{margin:0;overflow:hidden;border-radius:14px;border:1px solid var(--line);background:#fff;box-shadow:var(--shadow)}
#rassvet-root .shot{width:100%;aspect-ratio:4/3;object-fit:contain;background:#eff5ff;transition:transform .35s ease, filter .35s ease}
#rassvet-root figure:hover .shot{transform:scale(1.02);filter:saturate(1.05)}
#rassvet-root figcaption{padding:10px 12px;border-top:1px solid var(--line);color:#62779a;display:flex;justify-content:space-between;align-items:center}

/* Donate cards */
#rassvet-root .donate-3d{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
#rassvet-root .donbtn{
  position:relative;isolation:isolate;display:block;text-decoration:none;color:#0b2d88;background:#fff;
  padding:14px;border:1px solid var(--line);border-radius:14px;box-shadow:var(--shadow);transform-style:preserve-3d;transition:transform .2s ease
}
#rassvet-root .donbtn::after{content:"";position:absolute;inset:0;border-radius:14px;z-index:-1;background:radial-gradient(120px 40px at 20% 0%, rgba(46,124,246,.25), transparent 60%);transform:translateZ(-6px)}
#rassvet-root .donbtn:hover{transform:translateY(-3px) rotateX(2deg)}
#rassvet-root .donbtn small{display:block;color:var(--muted);margin-top:6px}

/* Lightbox + a11y */
#rassvet-root .lightbox{position:fixed;inset:0;background:rgba(11,18,30,.75);display:none;align-items:center;justify-content:center;padding:18px;z-index:9999}
#rassvet-root .lightbox.open{display:flex}
#rassvet-root .lightbox img{max-width:min(1100px,92vw);max-height:82vh;border-radius:16px;box-shadow:0 16px 60px rgba(0,0,0,.5)}
#rassvet-root .close{position:absolute;top:14px;right:16px;width:40px;height:40px;border-radius:999px;border:1px solid var(--line);background:#fff;font-size:20px;display:grid;place-items:center;cursor:pointer}
#rassvet-root .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,1,1);white-space:nowrap;border:0}

/* Footer */
#rassvet-root footer{border-top:1px solid var(--line);padding:24px 12px 40px;text-align:center;color:#6b7fa1}
#rassvet-root .symbols{font-size:1.2rem;color:#7ea8ff;margin:10px 0}
#rassvet-root .credits{font-weight:700}

/* Routes */
#rassvet-root .route{display:none}
#rassvet-root .route.active{display:block}

@media (max-width:560px){
  #rassvet-root .shot{aspect-ratio:3/2}
}
  `.trim();

  function injectStyles() {
    // удалим старую версию, если перезаливаем
    const old = document.getElementById("rsvt-style");
    if (old) old.remove();
    const st = document.createElement("style");
    st.id = "rsvt-style";
    st.type = "text/css";
    st.appendChild(document.createTextNode(STYLE_CSS));
    document.head.appendChild(st);
  }

  // ---------------- CONTACT EMAIL (НЕ кликабельная версия) ----------------
  function applyContactEmail() {
    const span = $("#rassvet-root #contactEmail");
    if (!span) return;

    const fromLS = (localStorage.getItem("rassvettech_email") || "").trim();
    const inHTML = (span.textContent || "").trim();
    const email  = fromLS || inHTML || "Varzanov.86@mail.ru";

    span.textContent = email;
  }

  // ---------------- LIGHTBOX ----------------
  let lightbox, lbImg;

  function ensureLightbox() {
    const root = $("#rassvet-root");
    if (!root) return;
    lightbox = root.querySelector(".lightbox");
    if (lightbox) {
      lbImg = lightbox.querySelector("img");
      return;
    }
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <button class="close" type="button" aria-label="Close">×</button>
      <img alt="">
    `;
    root.appendChild(lightbox);
    lbImg = lightbox.querySelector("img");

    lightbox.addEventListener("click", (e) => {
      if (e.target.classList.contains("close") || e.target === lightbox) {
        lightbox.classList.remove("open");
        lbImg.removeAttribute("src");
      }
    });
  }

  function bindGallery() {
    ensureLightbox();
    $$("#rassvet-root .gallery img.shot").forEach((img) => {
      img.addEventListener("click", () => {
        const full = img.getAttribute("data-full") || img.src;
        lbImg.src = full;
        lightbox.classList.add("open");
      });
    });
  }

  // ---------------- ROUTER ----------------
  const ACTIVE = "active";
  const KNOWN  = new Set(["drone", "mask", "robot", "mirror", "tattoo", "originality", "future"]);

  function showRoute(name) {
    if (!KNOWN.has(name)) name = "drone";

    // Секции
    $$("#rassvet-root .route").forEach((sec) => {
      sec.classList.toggle(ACTIVE, sec.id === `route-${name}`);
    });

    // Верхние табы
    $$("#rassvet-root nav.topnav .tab[data-route]").forEach((btn) => {
      const on = btn.getAttribute("data-route") === name;
      btn.classList.toggle(ACTIVE, on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });

    // Скролл к началу
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function routeFromHash() {
    const h = (location.hash || "").replace("#", "").trim();
    return KNOWN.has(h) ? h : "drone";
  }

  function bindTopNav() {
    const top = $("#rassvet-root nav.topnav");
    if (!top) return;
    top.addEventListener("click", (e) => {
      const b = e.target.closest(".tab[data-route]");
      if (!b) return;
      const r = b.getAttribute("data-route");
      if (!r) return;
      if (location.hash !== `#${r}`) location.hash = r;
      showRoute(r);
    });
  }

  function bindFooterRoutes() {
    $$("#rassvet-root #site-footer a[data-route]").forEach((a) => {
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        const r = a.getAttribute("data-route");
        if (!r) return;
        if (location.hash !== `#${r}`) location.hash = r;
        showRoute(r);
      });
    });
  }

  // Реакция на изменение hash
  window.addEventListener("hashchange", () => showRoute(routeFromHash()));

  // ---------------- READY ----------------
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  ready(() => {
    injectStyles();        // важно: стили до отрисовки
    bindTopNav();
    bindFooterRoutes();
    bindGallery();
    applyContactEmail();
    showRoute(routeFromHash()); // первичный рендер
  });

  // Небольшое публичное API
  window.RASSVETTECH_APP = {
    goto: showRoute,
    setEmail(email) {
      if (!email) return;
      localStorage.setItem("rassvettech_email", email);
      applyContactEmail();
    },
    refreshGallery: bindGallery,
    reinjectStyles: injectStyles
  };
})();

// app-i18n.js — полные строки локализаций EN / RU / JP / KO / ZH (без сокращений)
(function () {
  "use strict";
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  const STR = {
    /* ================= EN ================= */
    en: {
      site_title: "RASSVETTECH — Intelligent Projects Hub",
      meta_desc: "RASSVETTECH: Drone projector ANDrew, EIDOS face-mask display, AnestAI anesthesia assistant, VITA Mirror, and TattooBot Station.",
      brand: "RASSVETTECH",
      hero_desc:
        "Five living ideas under one dawn: ANDrew — a drone that projects anywhere; EIDOS — a face-mask display for people and robots; AnestAI — an ethical anesthesia assistant; VITA Mirror — a personal reflection device; and TattooBot Station — a robotic tattoo system.",
      nav_drone: "ANDrew Drone",
      nav_mask: "EIDOS Mask",
      nav_robot: "AnestAI",
      nav_mirror: "VITA Mirror",
      nav_tattoo: "TattooBot Station",
      nav_originality: "Originality / Legal",
      nav_future: "Future",

      /* DRONE */
      drone_title: "ANDrew — Flying Projector",
      drone_intro: "A compact drone that docks, charges, and projects. Movies at the camp, recipes in the kitchen, tutorials on a wall — wherever you need a screen.",
      drone_feat1_h: "Dock & Charge",
      drone_feat1_p: "Magnetic base with safe contact pads and quick alignment.",
      drone_feat2_h: "Quiet Optics",
      drone_feat2_p: "Low-noise fans and tuned PWM so sound doesn’t spoil the scene.",
      drone_feat3_h: "Smart Beam",
      drone_feat3_p: "Auto-keystone, focus, and ambient-light compensation.",
      drone_feat4_h: "App & Voice",
      drone_feat4_p: "Cast from phone or ask the assistant to play YouTube or your files.",

      /* Quiet by Design (wide block) */
      drone_quiet_h: "Quiet by Design",
      drone_quiet_p:
        "Drone noise is not a problem anymore. New toroidal propellers, phase-synchronized motors, and active noise cancellation reduce sound levels dramatically. Tests show drones operating as quiet as a normal conversation (~50 dB). ANDrew 2.0 follows this path — designed to be a silent companion, not a distraction.",

      /* Drone gallery labels */
      gallery_h: "Gallery",
      gal1_t: "Black dock — compact",
      gal2_t: "White dock — round pad",
      gal3_t: "Battery pack — light",
      gal4_t: "Battery pack — dark",
      gal5_t: "Movie night",
      gal6_t: "Kitchen YouTube",
      tag_charging: "Charging",
      tag_battery: "Battery",
      tag_cinema: "Cinema",
      tag_youtube: "YouTube",

      /* Donations — common */
      don_andrew_h: "Support ANDrew",
      don_ton_s: "Fast, low fees",
      don_eth_s: "Global & reliable",
      don_tron_s: "Low-fee USDT",
      don_btc_s: "Main chain",

      /* MASK (EIDOS) */
      mask_title: "EIDOS — Face-Mask Display",
      mask_intro:
        "A display-mask that can show a chosen identity: people for robots, or robot faces for people. For accessibility, privacy, performance, and art.",
      mask_robotics_h: "EIDOS Mask Robotics",
      mask_robotics_p1:
        "EIDOS Mask Robotics is a revolutionary facial display system for humanoid robots. Instead of complex mechanical mimicry, the mask uses a flexible screen that can show any face, emotion, or persona.",
      mask_robotics_p2:
        "This frees internal space, reduces maintenance cost, and boosts reliability. The result is a light, adaptable, and human-like interface for communication, service, and entertainment tasks.",
      mask_human_h: "EIDOS Mask Human",
      mask_human_p1:
        "EIDOS Mask Human brings the same concept to people: a lightweight display-mask worn on the face that lets you instantly change appearance — from celebrities and digital avatars to familiar faces.",
      mask_human_p2:
        "For safety, the battery is on the belt and thin cables go through the straps, so the screen doesn’t heat the skin. Openings for eyes, nose, and mouth keep comfort for long use.",
      mask_human_p3:
        "Use cases: social interactions and games, psychological therapy, rehabilitation.",
      don_mask_h: "Support EIDOS",

      /* ROBOT (AnestAI) */
      robot_title: "AnestAI — Anesthesia Assistant",
      robot_intro:
        "An ethical assistant for anesthesiologists: sensing, guidance, and checklists that follow protocol and keep the patient first.",
      robot_feat1_h: "Clean UI",
      robot_feat1_p: "Readable timelines, alerts, and soft color semantics.",
      robot_feat2_h: "Sensors",
      robot_feat2_p: "Connect SpO₂, HR, BP, EtCO₂ and more via safe adapters.",
      robot_feat3_h: "Protocol",
      robot_feat3_p: "Contextual steps and double-confirm on critical actions.",
      robot_feat4_h: "Offline First",
      robot_feat4_p: "Works without internet; syncs when clinic policy allows.",
      robot_gal_h: "Console & Use",
      don_robot_h: "Support AnestAI",

      /* VITA MIRROR */
      mirror_title: "VITA Mirror — Personal Reflection",
      mirror_intro:
        "A home mirror with calm UI, daily focus, and gentle mood cues. Not for ads. For you.",
      mirror_gal_h: "Concepts",
      don_mirror_h: "Support VITA Mirror",

      /* VITA App ecosystem */
      mirror_apps_title: "VITA Mirror — App Ecosystem & Application Ideas",
      mirror_health_h: "Health & Fitness",
      mirror_health_fitmirror: "FitMirror: real-time posture correction and training demos.",
      mirror_health_healthpulse: "HealthPulse: syncs with smartwatches to display pulse, blood pressure, and steps.",
      mirror_health_sleepcare: "SleepCare: sleep analysis and personalized morning recommendations.",
      mirror_edu_h: "Education",
      mirror_edu_edumirror: "EduMirror: virtual teacher for lessons and homework in front of the mirror.",
      mirror_edu_langmirror: "LangMirror: practice languages via live AI conversation.",
      mirror_edu_storytime: "StoryTime: interactive storytelling with animated characters in reflection.",
      mirror_psych_h: "Psychology & Well-Being",
      mirror_psych_moodmirror: "MoodMirror: detects mood and suggests music, breathing, and rest.",
      mirror_psych_therapyai: "TherapyAI: supportive conversations and light psychotherapy.",
      mirror_mem_h: "Memories & Emotions",
      mirror_mem_memorylink: "MemoryLink: recreates encounters with deceased loved ones via photo, video, and voice.",
      mirror_mem_timemachine: "TimeMachine: reminders for medicine, children’s teeth, and wellness.",
      mirror_mem_friendmirror: "FriendMirror: virtual companions, buddies, and supportive partners.",
      mirror_inv_h: "Advantages for Investors",
      mirror_inv_streams: "Multiple revenue streams: each app can use subscriptions or ads.",
      mirror_inv_ecosystem: "Ecosystem effect: the mirror becomes its own “App Store”.",
      mirror_inv_markets: "Huge markets: health, beauty, education, psychology, and smart homes.",

      /* ORIGINALITY / FUTURE (routes referenced in footer) */
      orig_title: "Originality & Legal",
      orig_text:
        "All concepts, texts, and images on this page are original to the RASSVETTECH project unless otherwise stated. Respect licenses and human dignity.",
      future_title: "Future",
      future_text:
        "We ship small, learn fast, and keep ethics first. If you want to help — write, fork, or donate. Dawn belongs to everyone.",

      /* TATTOOBOT */
      tattoo_title: "TattooBot Station — Robotic Tattoo System",
      tattoo_intro: "A compact medical–aesthetic station that unites tattoo creation and removal.",
      tattoo_look_h: "Appearance",
      tattoo_look_p:
        "Minimalist vertical stand (white/metallic) with a touch display: “Make a tattoo” / “Remove a tattoo”. A robotic arm with needle/laser. A medical couch stands in front.",
      tattoo_funcs_h: "Functions",
      tattoo_make_h: "Tattooing",
      tattoo_make_1: "Choose a design from the catalog or upload your own.",
      tattoo_make_2: "Automatic sterilization and precise robotic work.",
      tattoo_make_3: "Option to apply not only art but also digital tags (QR/NFC).",
      tattoo_remove_h: "Tattoo Removal",
      tattoo_remove_1: "Robotic laser removes drawings while leaving a soft “memory trace”.",
      tattoo_remove_2: "Reduces pain and number of sessions.",
      tattoo_feats_h: "Features",
      tattoo_feats_1: "Dual nature: create or erase — the client chooses.",
      tattoo_feats_2: "Emotional design: browse a gallery of motifs on screen.",
      tattoo_feats_3: "Medical sterility: UV lamps and easy-to-sanitize surfaces.",
      tattoo_feats_4: "AI control: analyzes skin and pigment to select optimal parameters.",
      tattoo_use_h: "Applications",
      tattoo_use_1: "Beauty salons and tattoo studios.",
      tattoo_use_2: "Medical centers (tattoo/scar/mark removal).",
      tattoo_use_3: "Future RASSVET LABS for innovation demos.",
      don_tattoo_h: "Support TattooBot Station",

      /* LEGAL */
      legal_en_1: "The RASSVETTECH website and its materials are protected by copyright and international agreements.",
      legal_en_2: "© RASSVETTECH™, 2025. All rights reserved.",
      legal_en_3: "Contact: Varzanov.86@mail.ru | varzanov0602@gmail.com",
      legal_disclaimer: "Concept images. Not affiliated with or endorsed by actual persons.",
      credits: "Made by RASSVETTECH Team — with care for people."
    },

    /* ================= RU ================= */
    ru: {
      site_title: "RASSVETTECH — Центр живых проектов",
      meta_desc: "RASSVETTECH: дрон-проектор ANDrew, маска-дисплей EIDOS, ассистент анестезии AnestAI, зеркало VITA и станция TattooBot.",
      brand: "RASSVETTECH",
      hero_desc:
        "Пять идей под одним рассветом: ANDrew — дрон-проектор; EIDOS — маска-экран для людей и роботов; AnestAI — этичный ассистент анестезиолога; VITA Mirror — зеркало личной рефлексии; TattooBot Station — роботизированная станция для татуировок.",
      nav_drone: "Дрон ANDrew",
      nav_mask: "Маска EIDOS",
      nav_robot: "AnestAI",
      nav_mirror: "VITA Зеркало",
      nav_tattoo: "TattooBot",
      nav_originality: "Оригинальность / Право",
      nav_future: "Будущее",

      /* DRONE */
      drone_title: "ANDrew — Летающий проектор",
      drone_intro: "Компактный дрон стыкуется, заряжается и проецирует. Кино у костра, рецепты на кухне, уроки на стене — где угодно.",
      drone_feat1_h: "Стыковка и зарядка",
      drone_feat1_p: "Магнитная база, безопасные контакты и точное выравнивание.",
      drone_feat2_h: "Тихая оптика",
      drone_feat2_p: "Низкошумные вентиляторы и настроенный ШИМ, чтобы звук не мешал сцене.",
      drone_feat3_h: "Умный луч",
      drone_feat3_p: "Автокоррекция трапеции, автофокус и компенсация освещённости.",
      drone_feat4_h: "Приложение и голос",
      drone_feat4_p: "Каст с телефона или просьба ассистенту включить YouTube или ваши файлы.",

      drone_quiet_h: "Тишина по замыслу",
      drone_quiet_p:
        "Шум дрона больше не проблема. Торроидальные пропеллеры, синхронизация моторов и активное шумоподавление снижают уровень звука до уровня обычного разговора (~50 дБ). ANDrew 2.0 задуман как тихий спутник, а не помеха.",

      gallery_h: "Галерея",
      gal1_t: "Чёрная база — компакт",
      gal2_t: "Белая база — круглая",
      gal3_t: "Аккумулятор — светлый",
      gal4_t: "Аккумулятор — тёмный",
      gal5_t: "Вечер кино",
      gal6_t: "YouTube на кухне",
      tag_charging: "Зарядка",
      tag_battery: "Батарея",
      tag_cinema: "Кино",
      tag_youtube: "YouTube",

      don_andrew_h: "Поддержать ANDrew",
      don_ton_s: "Быстро и дёшево",
      don_eth_s: "Надёжно и глобально",
      don_tron_s: "USDT с низкой комиссией",
      don_btc_s: "Основная сеть",

      /* MASK */
      mask_title: "EIDOS — Маска-экран",
      mask_intro:
        "Маска-дисплей показывает выбранную идентичность: роботу — человека, человеку — лицо робота. Для доступности, приватности, производительности и искусства.",
      mask_robotics_h: "EIDOS Mask Robotics",
      mask_robotics_p1:
        "EIDOS Mask Robotics — система лицевого отображения для гуманоидных роботов. Вместо сложной механики мимики используется гибкий экран, показывающий любое лицо, эмоцию или образ.",
      mask_robotics_p2:
        "Это освобождает внутреннее пространство, снижает расходы на обслуживание и повышает надёжность. Итог — лёгкий, адаптивный и «человечный» интерфейс для общения, сервиса и развлечений.",
      mask_human_h: "EIDOS Mask Human",
      mask_human_p1:
        "Та же концепция для людей: лёгкая маска-экран на лице, которая позволяет мгновенно менять внешний вид — от знаменитостей и цифровых аватаров до родных лиц.",
      mask_human_p2:
        "Для безопасности аккумулятор вынесен на пояс, тонкие провода — в ремешках; экран не греет кожу. Отверстия для глаз, носа и рта сохраняют комфорт при длительном ношении.",
      mask_human_p3:
        "Сферы применения: общение и игры, психологическая поддержка, реабилитация.",
      don_mask_h: "Поддержать EIDOS",

      /* ROBOT */
      robot_title: "AnestAI — ассистент анестезиолога",
      robot_intro:
        "Этичный помощник: сенсоры, подсказки и чек-листы по протоколу — во главе безопасность пациента.",
      robot_feat1_h: "Чистый интерфейс",
      robot_feat1_p: "Читаемые таймлайны, алерты и мягкая цветовая семантика.",
      robot_feat2_h: "Сенсоры",
      robot_feat2_p: "Подключение SpO₂, ЧСС, АД, EtCO₂ и др. через безопасные адаптеры.",
      robot_feat3_h: "Протокол",
      robot_feat3_p: "Контекстные шаги и двойное подтверждение критичных действий.",
      robot_feat4_h: "Offline-режим",
      robot_feat4_p: "Работает без интернета; синхронизация по политике клиники.",
      robot_gal_h: "Консоль и применение",
      don_robot_h: "Поддержать AnestAI",

      /* VITA MIRROR */
      mirror_title: "VITA Mirror — зеркало личной рефлексии",
      mirror_intro:
        "Домашнее зеркало со спокойным интерфейсом, фокусом дня и мягкими подсказками. Не для рекламы — для человека.",
      mirror_gal_h: "Концепты",
      don_mirror_h: "Поддержать VITA Mirror",

      mirror_apps_title: "VITA Mirror — экосистема приложений и идеи",
      mirror_health_h: "Здоровье и фитнес",
      mirror_health_fitmirror: "FitMirror: корректировка осанки и тренировочные демо в реальном времени.",
      mirror_health_healthpulse: "HealthPulse: синхронизация с часами — пульс, давление, шаги.",
      mirror_health_sleepcare: "SleepCare: анализ сна и персональные рекомендации утром.",
      mirror_edu_h: "Обучение",
      mirror_edu_edumirror: "EduMirror: виртуальный учитель для уроков и домашки у зеркала.",
      mirror_edu_langmirror: "LangMirror: языковая практика через живой разговор с ИИ.",
      mirror_edu_storytime: "StoryTime: интерактивные истории с анимированными героями в отражении.",
      mirror_psych_h: "Психология и благополучие",
      mirror_psych_moodmirror: "MoodMirror: определяет настроение и предлагает музыку, дыхание, отдых.",
      mirror_psych_therapyai: "TherapyAI: поддерживающие беседы и лёгкая психотерапия.",
      mirror_mem_h: "Память и эмоции",
      mirror_mem_memorylink: "MemoryLink: «встречи» с ушедшими близкими по фото, видео и голосу.",
      mirror_mem_timemachine: "TimeMachine: напоминания о лекарствах, детских зубах и заботе о себе.",
      mirror_mem_friendmirror: "FriendMirror: виртуальные друзья, напарники и поддержка.",
      mirror_inv_h: "Преимущества для инвесторов",
      mirror_inv_streams: "Много источников выручки: у каждого приложения — подписка или реклама.",
      mirror_inv_ecosystem: "Эффект экосистемы: зеркало становится собственным «App Store».",
      mirror_inv_markets: "Огромные рынки: здоровье, красота, образование, психология, умный дом.",

      orig_title: "Оригинальность и Право",
      orig_text:
        "Все концепты, тексты и изображения на этой странице — оригинальные материалы проекта RASSVETTECH, если не указано иное. Уважайте лицензии и человеческое достоинство.",
      future_title: "Будущее",
      future_text:
        "Делаем малыми шагами, учимся быстро и держим этику на первом месте. Хотите помочь — пишите, форкайте, поддерживайте. Рассвет — для всех.",

      /* TATTOOBOT */
      tattoo_title: "TattooBot Station — станция для татуировок",
      tattoo_intro: "Компактная медицинско-эстетическая станция, объединяющая нанесение и удаление татуировок.",
      tattoo_look_h: "Внешний вид",
      tattoo_look_p:
        "Вертикальная стойка-колонна (белый/металлик) с сенсорным экраном: «Сделать тату» / «Удалить тату». Роборука с иглой/лазером. Перед стойкой — медицинский лежак.",
      tattoo_funcs_h: "Функции",
      tattoo_make_h: "Нанесение",
      tattoo_make_1: "Выбор эскиза из каталога или загрузка своего.",
      tattoo_make_2: "Автоматическая стерилизация и высокая точность работы.",
      tattoo_make_3: "Можно нанести рисунок или цифровую метку (QR/NFC).",
      tattoo_remove_h: "Удаление",
      tattoo_remove_1: "Роботизированный лазер аккуратно удаляет рисунок, оставляя мягкий «след воспоминания».",
      tattoo_remove_2: "Меньше боли и меньше сеансов.",
      tattoo_feats_h: "Особенности",
      tattoo_feats_1: "Двойная природа: сделать или стереть — выбор клиента.",
      tattoo_feats_2: "Эмоциональный интерфейс: листайте галерею образов на экране.",
      tattoo_feats_3: "Медицинская стерильность: УФ-лампы и легко дезинфицируемые поверхности.",
      tattoo_feats_4: "ИИ-управление: анализ кожи и пигмента, подбор оптимальных параметров.",
      tattoo_use_h: "Применение",
      tattoo_use_1: "Салоны красоты и тату-студии.",
      tattoo_use_2: "Медицинские центры (удаление татуировок, шрамов, меток).",
      tattoo_use_3: "Будущие RASSVET LABS для демонстрации инноваций.",
      don_tattoo_h: "Поддержать TattooBot",

      /* LEGAL */
      legal_ru_1: "Сайт RASSVETTECH и материалы защищены авторским правом и международными соглашениями.",
      legal_ru_2: "© RASSVETTECH™, 2025. Все права защищены.",
      legal_ru_3: "Контакт: Varzanov.86@mail.ru | varzanov0602@gmail.com",
      legal_disclaimer: "Концепт-изображения. Не связаны с реальными людьми и не одобрены ими.",
      credits: "Создано командой RASSVETTECH — с заботой о людях."
    },

    /* ================= JP ================= */
    jp: {
      site_title: "RASSVETTECH — インテリジェント・プロジェクト・ハブ",
      meta_desc: "RASSVETTECH: ドローン投影 ANDrew、EIDOS マスク、AnestAI、VITA Mirror、TattooBot Station。",
      brand: "RASSVETTECH",
      hero_desc:
        "ひとつの夜明けの下にある五つの生きたアイデア：ANDrew — どこでも投影できるドローン；EIDOS — 人とロボットのためのフェイスマスク・ディスプレイ；AnestAI — 倫理的な麻酔アシスタント；VITA Mirror — 個人リフレクション；TattooBot Station — ロボティック・タトゥー・ステーション。",
      nav_drone: "ANDrew ドローン",
      nav_mask: "EIDOS マスク",
      nav_robot: "AnestAI",
      nav_mirror: "VITA ミラー",
      nav_tattoo: "TattooBot ステーション",
      nav_originality: "オリジナリティ / 法務",
      nav_future: "未来",

      drone_title: "ANDrew — フライング・プロジェクタ",
      drone_intro: "ドックし、充電し、投影。キャンプの映画、キッチンのレシピ、壁でのチュートリアル—画面が必要な場所ならどこでも。",
      drone_feat1_h: "ドック＆充電",
      drone_feat1_p: "安全な接点を備えた磁気ベースと素早い位置合わせ。",
      drone_feat2_h: "静音オプティクス",
      drone_feat2_p: "低ノイズファンと調整済みPWMで音がシーンを邪魔しない。",
      drone_feat3_h: "スマートビーム",
      drone_feat3_p: "自動台形補正、フォーカス、環境光補正。",
      drone_feat4_h: "アプリ＆音声",
      drone_feat4_p: "スマホからキャスト、またはアシスタントに YouTube やファイルの再生を依頼。",

      drone_quiet_h: "静かさをデザイン",
      drone_quiet_p:
        "騒音はもはや問題ではありません。トロイダルプロペラ、位相同期モーター、アクティブノイズキャンセリングで騒音を大幅に低減。テストでは通常の会話 (~50 dB) と同等の静かさ。ANDrew 2.0 は邪魔しない静かな相棒として設計されています。",

      gallery_h: "ギャラリー",
      gal1_t: "ブラックドック — コンパクト",
      gal2_t: "ホワイトドック — ラウンドパッド",
      gal3_t: "バッテリー — ライト",
      gal4_t: "バッテリー — ダーク",
      gal5_t: "ムービーナイト",
      gal6_t: "キッチンの YouTube",
      tag_charging: "充電",
      tag_battery: "バッテリー",
      tag_cinema: "シネマ",
      tag_youtube: "YouTube",

      don_andrew_h: "ANDrew を支援",
      don_ton_s: "高速・低手数料",
      don_eth_s: "グローバルで信頼",
      don_tron_s: "USDT 低手数料",
      don_btc_s: "メインチェーン",

      mask_title: "EIDOS — フェイスマスク・ディスプレイ",
      mask_intro:
        "選択したアイデンティティを表示できるマスク：ロボットには人の顔を、人にはロボットの顔を。アクセシビリティ、プライバシー、性能、アートのために。",
      mask_robotics_h: "EIDOS Mask Robotics",
      mask_robotics_p1:
        "ヒューマノイドロボット向けの革新的な顔表示システム。複雑な機械的表情の代わりに柔軟なスクリーンで任意の顔・感情・ペルソナを表示。",
      mask_robotics_p2:
        "内部スペースを節約し保守コストを削減、信頼性を向上。対話・サービス・エンタメに適した軽量で適応的な人間らしいインターフェース。",
      mask_human_h: "EIDOS Mask Human",
      mask_human_p1:
        "同じ概念を人へ：顔に装着する軽量ディスプレイマスクで外見を即切替（有名人、デジタルアバター、身近な顔）。",
      mask_human_p2:
        "安全のためバッテリーはベルト、細いケーブルはストラップ内。肌の加熱を避け、目鼻口の開口で長時間でも快適。",
      mask_human_p3:
        "用途：ソーシャル、ゲーム、心理療法、リハビリ。",
      don_mask_h: "EIDOS を支援",

      robot_title: "AnestAI — 麻酔アシスタント",
      robot_intro:
        "麻酔科を支援：センシング、ガイダンス、プロトコル準拠のチェックリスト。患者第一。",
      robot_feat1_h: "クリーンUI",
      robot_feat1_p: "読みやすいタイムラインとアラート、穏やかな色設計。",
      robot_feat2_h: "センサー",
      robot_feat2_p: "SpO₂・心拍・血圧・EtCO₂ を安全に接続。",
      robot_feat3_h: "プロトコル",
      robot_feat3_p: "状況別ステップと重要操作の二重確認。",
      robot_feat4_h: "オフライン優先",
      robot_feat4_p: "ネット不要。院内ポリシーに応じて同期。",
      robot_gal_h: "コンソール＆使用例",
      don_robot_h: "AnestAI を支援",

      mirror_title: "VITA Mirror — 個人リフレクション",
      mirror_intro:
        "落ち着いたUI、毎日のフォーカス、やさしいムードキューを備えたホームミラー。広告ではなく、あなたのために。",
      mirror_gal_h: "コンセプト",
      don_mirror_h: "VITA Mirror を支援",

      mirror_apps_title: "VITA Mirror — アプリ・エコシステムとアイデア",
      mirror_health_h: "ヘルス＆フィットネス",
      mirror_health_fitmirror: "FitMirror：リアルタイムで姿勢補正とトレーニングデモ。",
      mirror_health_healthpulse: "HealthPulse：スマートウォッチ連携で脈拍・血圧・歩数を表示。",
      mirror_health_sleepcare: "SleepCare：睡眠分析とパーソナライズされた朝の提案。",
      mirror_edu_h: "教育",
      mirror_edu_edumirror: "EduMirror：鏡の前で授業や宿題を行うバーチャル教師。",
      mirror_edu_langmirror: "LangMirror：AI とライブ会話で語学練習。",
      mirror_edu_storytime: "StoryTime：反射内のアニメキャラによる対話型物語。",
      mirror_psych_h: "心理＆ウェルビーイング",
      mirror_psych_moodmirror: "MoodMirror：気分を検出し音楽・呼吸・休息を提案。",
      mirror_psych_therapyai: "TherapyAI：支援的な会話とライトな心理療法。",
      mirror_mem_h: "記憶と感情",
      mirror_mem_memorylink: "MemoryLink：写真・動画・声で故人との再会を再構成。",
      mirror_mem_timemachine: "TimeMachine：服薬、子どもの歯、ウェルネスのリマインダー。",
      mirror_mem_friendmirror: "FriendMirror：バーチャルな友人・相棒・支援パートナー。",
      mirror_inv_h: "投資家への利点",
      mirror_inv_streams: "複数の収益源：アプリごとにサブスクや広告。",
      mirror_inv_ecosystem: "エコシステム効果：鏡が独自の“App Store”に。",
      mirror_inv_markets: "巨大市場：健康、美容、教育、心理、スマートホーム。",

      orig_title: "オリジナリティと法務",
      orig_text:
        "特記のない限り、本ページのコンセプト・テキスト・画像は RASSVETTECH のオリジナルです。ライセンスと人間の尊厳を尊重してください。",
      future_title: "未来",
      future_text:
        "小さく出荷し、速く学び、倫理を最優先。支援したい方は連絡・フォーク・寄付を。夜明けは皆のものです。",

      tattoo_title: "TattooBot Station — ロボティック・タトゥー・ステーション",
      tattoo_intro: "タトゥー施術と除去を統合したコンパクトな医療美学ステーション。",
      tattoo_look_h: "外観",
      tattoo_look_p:
        "白/メタリックのミニマルな縦型スタンドとタッチディスプレイ。「施術」/「除去」を選択。針/レーザーのロボットアーム。前面に医療用ベッド。",
      tattoo_funcs_h: "機能",
      tattoo_make_h: "タトゥー施術",
      tattoo_make_1: "カタログから選択、または独自デザインをアップロード。",
      tattoo_make_2: "自動滅菌と高精度の作業。",
      tattoo_make_3: "アートだけでなく QR/NFC デジタルタグも可能。",
      tattoo_remove_h: "タトゥー除去",
      tattoo_remove_1: "ロボットレーザーで安全に除去し「記憶の痕跡」を残す表現も可能。",
      tattoo_remove_2: "痛みとセッション回数を軽減。",
      tattoo_feats_h: "特徴",
      tattoo_feats_1: "二面性：彫るか消すかはクライアントの選択。",
      tattoo_feats_2: "感情的デザイン：画面上でモチーフのギャラリーを閲覧。",
      tattoo_feats_3: "医療的清潔性：UV ランプと清掃しやすい外装。",
      tattoo_feats_4: "AI 制御：肌・色素を解析し最適パラメータを選定。",
      tattoo_use_h: "用途",
      tattoo_use_1: "美容サロンとタトゥースタジオ。",
      tattoo_use_2: "医療センター（タトゥー/瘢痕/マークの除去）。",
      tattoo_use_3: "将来の RASSVET LABS でのイノベーション実演。",
      don_tattoo_h: "TattooBot を支援",

      legal_en_1: "RASSVETTECH website and materials are protected by copyright and international agreements.",
      legal_en_2: "© RASSVETTECH™, 2025. All rights reserved.",
      legal_en_3: "Contact: Varzanov.86@mail.ru | varzanov0602@gmail.com",
      legal_disclaimer: "コンセプト画像。実在の人物とは無関係であり、承認されていません。",
      credits: "RASSVETTECH チームより。"
    },

    /* ================= KO ================= */
    ko: {
      site_title: "RASSVETTECH — 지능형 프로젝트 허브",
      meta_desc: "RASSVETTECH: ANDrew 드론 프로젝터, EIDOS 마스크 디스플레이, AnestAI, VITA Mirror, TattooBot Station.",
      brand: "RASSVETTECH",
      hero_desc:
        "하나의 새벽 아래 다섯 가지 아이디어: ANDrew — 어디서나 투영하는 드론; EIDOS — 사람과 로봇을 위한 얼굴 마스크 디스플레이; AnestAI — 윤리적인 마취 보조; VITA Mirror — 개인 리플렉션; TattooBot Station — 로봇 타투 스테이션.",
      nav_drone: "ANDrew 드론",
      nav_mask: "EIDOS 마스크",
      nav_robot: "AnestAI",
      nav_mirror: "VITA 미러",
      nav_tattoo: "TattooBot 스테이션",
      nav_originality: "오리지널리티 / 법률",
      nav_future: "미래",

      drone_title: "ANDrew — 비행 프로젝터",
      drone_intro: "도킹·충전·투사. 캠핑의 영화, 주방 레시피, 벽면 튜토리얼 — 화면이 필요한 어디든지.",
      drone_feat1_h: "도킹 & 충전",
      drone_feat1_p: "안전 접점과 빠른 정렬의 자기 베이스.",
      drone_feat2_h: "저소음 광학",
      drone_feat2_p: "저소음 팬과 조정된 PWM으로 소음 최소화.",
      drone_feat3_h: "스마트 빔",
      drone_feat3_p: "자동 키스톤, 포커스, 주변광 보정.",
      drone_feat4_h: "앱 & 음성",
      drone_feat4_p: "휴대폰 캐스트 또는 어시스턴트에 YouTube/파일 재생 요청.",

      drone_quiet_h: "조용한 설계",
      drone_quiet_p:
        "소음은 더 이상 문제가 아닙니다. 토로이달 프로펠러, 위상 동기 모터, 능동 소음 제거로 대화 수준(~50 dB)까지 낮춥니다. ANDrew 2.0은 방해가 아닌 조용한 동반자로 설계되었습니다.",

      gallery_h: "갤러리",
      gal1_t: "블랙 도크 — 컴팩트",
      gal2_t: "화이트 도크 — 원형 패드",
      gal3_t: "배터리 팩 — 라이트",
      gal4_t: "배터리 팩 — 다크",
      gal5_t: "무비 나이트",
      gal6_t: "주방 YouTube",
      tag_charging: "충전",
      tag_battery: "배터리",
      tag_cinema: "시네마",
      tag_youtube: "YouTube",

      don_andrew_h: "ANDrew 후원",
      don_ton_s: "빠르고 저렴",
      don_eth_s: "글로벌/신뢰",
      don_tron_s: "USDT 저수수료",
      don_btc_s: "메인체인",

      mask_title: "EIDOS — 페이스 마스크 디스플레이",
      mask_intro:
        "선택한 정체성을 표시하는 마스크: 로봇에는 사람 얼굴, 사람에게는 로봇 얼굴. 접근성·프라이버시·성능·예술.",
      mask_robotics_h: "EIDOS Mask Robotics",
      mask_robotics_p1:
        "휴머노이드 로봇용 얼굴 표시 시스템. 복잡한 기계적 표정을 대신해 유연한 화면으로 어떤 얼굴과 감정도 표현.",
      mask_robotics_p2:
        "내부 공간 절약, 유지비 절감, 신뢰성 향상. 소통·서비스·엔터테인먼트에 적합.",
      mask_human_h: "EIDOS Mask Human",
      mask_human_p1:
        "사람을 위한 동일한 개념: 얼굴에 착용하는 경량 디스플레이 마스크로 즉시 외형 전환.",
      mask_human_p2:
        "배터리는 벨트, 얇은 케이블은 스트랩 내부 — 피부 가열 방지. 눈·코·입 개구부로 장시간 착용도 편안.",
      mask_human_p3:
        "용도: 사회적 상호작용, 게임, 심리 치료, 재활.",
      don_mask_h: "EIDOS 후원",

      robot_title: "AnestAI — 마취 보조",
      robot_intro:
        "윤리 중심의 보조: 센싱, 가이드, 프로토콜 체크리스트 — 환자 안전 우선.",
      robot_feat1_h: "깔끔한 UI",
      robot_feat1_p: "가독성 높은 타임라인과 알림, 부드러운 색 의미.",
      robot_feat2_h: "센서",
      robot_feat2_p: "SpO₂·심박·혈압·EtCO₂ 등 안전 연결.",
      robot_feat3_h: "프로토콜",
      robot_feat3_p: "상황별 단계, 중대한 동작 이중 확인.",
      robot_feat4_h: "오프라인 우선",
      robot_feat4_p: "인터넷 없이 동작, 정책에 따라 동기화.",
      robot_gal_h: "콘솔 & 사용",
      don_robot_h: "AnestAI 후원",

      mirror_title: "VITA Mirror — 개인 리플렉션",
      mirror_intro:
        "차분한 UI, 일일 포커스, 부드러운 무드 큐를 갖춘 홈 미러. 광고가 아니라 당신을 위해.",
      mirror_gal_h: "컨셉",
      don_mirror_h: "VITA Mirror 후원",

      mirror_apps_title: "VITA Mirror — 앱 에코시스템 & 아이디어",
      mirror_health_h: "건강 & 피트니스",
      mirror_health_fitmirror: "FitMirror: 실시간 자세 교정과 트레이닝 데모.",
      mirror_health_healthpulse: "HealthPulse: 스마트워치 연동 — 맥박·혈압·걸음 수.",
      mirror_health_sleepcare: "SleepCare: 수면 분석과 개인화된 아침 추천.",
      mirror_edu_h: "교육",
      mirror_edu_edumirror: "EduMirror: 거울 앞 수업/숙제를 돕는 가상 교사.",
      mirror_edu_langmirror: "LangMirror: AI와 라이브 대화로 언어 연습.",
      mirror_edu_storytime: "StoryTime: 반사 속 애니 캐릭터와 상호작용 동화.",
      mirror_psych_h: "심리 & 웰빙",
      mirror_psych_moodmirror: "MoodMirror: 기분 감지 후 음악·호흡·휴식 제안.",
      mirror_psych_therapyai: "TherapyAI: 지지적 대화와 가벼운 심리치료.",
      mirror_mem_h: "기억 & 감정",
      mirror_mem_memorylink: "MemoryLink: 사진/영상/음성으로 고인과의 재회 재현.",
      mirror_mem_timemachine: "TimeMachine: 복약·아이 치아·웰빙 알림.",
      mirror_mem_friendmirror: "FriendMirror: 가상 동반자/친구/지원 파트너.",
      mirror_inv_h: "투자자 장점",
      mirror_inv_streams: "다양한 수익원: 앱마다 구독 또는 광고.",
      mirror_inv_ecosystem: "에코시스템 효과: 미러가 자체 ‘앱 스토어’.",
      mirror_inv_markets: "거대한 시장: 건강·뷰티·교육·심리·스마트홈.",

      orig_title: "오리지널리티 및 법률",
      orig_text:
        "별도 표기가 없는 한, 본 페이지의 콘셉트/텍스트/이미지는 RASSVETTECH의 오리지널입니다. 라이선스와 인간의 존엄을 존중하세요.",
      future_title: "미래",
      future_text:
        "작게 배포, 빠르게 학습, 윤리를 최우선. 도움이 되고 싶다면 연락·포크·후원하세요. 새벽은 모두의 것입니다.",

      tattoo_title: "TattooBot Station — 로봇 타투 스테이션",
      tattoo_intro: "타투 시술과 제거를 통합한 컴팩트한 의료·미용 스테이션.",
      tattoo_look_h: "외형",
      tattoo_look_p:
        "화이트/메탈릭 미니멀 기둥과 터치 디스플레이(‘타투’/‘제거’). 바늘/레이저 로봇 팔. 전면에 의료용 침대.",
      tattoo_funcs_h: "기능",
      tattoo_make_h: "타투 시술",
      tattoo_make_1: "카탈로그 선택 또는 사용자 디자인 업로드.",
      tattoo_make_2: "자동 소독과 정밀한 로봇 작업.",
      tattoo_make_3: "예술뿐 아니라 QR/NFC 디지털 태그도 가능.",
      tattoo_remove_h: "타투 제거",
      tattoo_remove_1: "로봇 레이저가 안전하게 제거, ‘기억의 흔적’ 같은 연출 가능.",
      tattoo_remove_2: "통증과 세션 수 감소.",
      tattoo_feats_h: "특징",
      tattoo_feats_1: "이중 성격: 새기기/지우기 — 고객 선택.",
      tattoo_feats_2: "감성적 디자인: 화면에서 모티프 갤러리 탐색.",
      tattoo_feats_3: "의료적 청결: UV 램프, 손쉬운 소독.",
      tattoo_feats_4: "AI 제어: 피부/색소 분석, 최적 파라미터 설정.",
      tattoo_use_h: "활용",
      tattoo_use_1: "뷰티 살롱 및 타투 스튜디오.",
      tattoo_use_2: "의료 센터(타투/흉터/표식 제거).",
      tattoo_use_3: "향후 RASSVET LABS 데모.",
      don_tattoo_h: "TattooBot 후원",

      legal_en_1: "RASSVETTECH website and materials are protected by copyright and international agreements.",
      legal_en_2: "© RASSVETTECH™, 2025. All rights reserved.",
      legal_en_3: "Contact: Varzanov.86@mail.ru | varzanov0602@gmail.com",
      legal_disclaimer: "컨셉 이미지. 실제 인물과 관련 없으며 승인되지 않았습니다.",
      credits: "RASSVETTECH 팀."
    },

    /* ================= ZH ================= */
    zh: {
      site_title: "RASSVETTECH — 智能项目枢纽",
      meta_desc: "RASSVETTECH：ANDrew 投影无人机、EIDOS 面罩显示、AnestAI、VITA Mirror、TattooBot 工作站。",
      brand: "RASSVETTECH",
      hero_desc:
        "同一黎明下的五个创意：ANDrew——可在任何地方投射的无人机；EIDOS——为人和机器人设计的面罩显示；AnestAI——讲求伦理的麻醉助手；VITA Mirror——个人反思设备；TattooBot Station——机器人纹身工作站。",
      nav_drone: "ANDrew 无人机",
      nav_mask: "EIDOS 面罩",
      nav_robot: "AnestAI",
      nav_mirror: "VITA 镜",
      nav_tattoo: "TattooBot 工作站",
      nav_originality: "原创 / 法务",
      nav_future: "未来",

      drone_title: "ANDrew — 飞行投影",
      drone_intro: "对接、充电、投影。营地电影、厨房食谱、墙面教程——哪里需要屏幕就投到哪里。",
      drone_feat1_h: "对接与充电",
      drone_feat1_p: "磁吸底座与安全触点，快速校准定位。",
      drone_feat2_h: "低噪光学",
      drone_feat2_p: "低噪风扇与调校 PWM，声音不破坏场景。",
      drone_feat3_h: "智能光束",
      drone_feat3_p: "自动梯形校正、对焦与环境光补偿。",
      drone_feat4_h: "应用与语音",
      drone_feat4_p: "手机投屏，或让助手播放 YouTube/文件。",

      drone_quiet_h: "安静设计",
      drone_quiet_p:
        "噪音已不再是问题。环形螺旋桨、相位同步电机与主动降噪显著降低噪声。测试显示其安静度接近正常对话（约 50 dB）。ANDrew 2.0 被设计为安静的伙伴，而非干扰。",

      gallery_h: "图库",
      gal1_t: "黑色底座 — 紧凑",
      gal2_t: "白色底座 — 圆形",
      gal3_t: "电池包 — 浅色",
      gal4_t: "电池包 — 深色",
      gal5_t: "电影之夜",
      gal6_t: "厨房里的 YouTube",
      tag_charging: "充电",
      tag_battery: "电池",
      tag_cinema: "影院",
      tag_youtube: "YouTube",

      don_andrew_h: "支持 ANDrew",
      don_ton_s: "快速低费",
      don_eth_s: "全球可信",
      don_tron_s: "USDT 低费",
      don_btc_s: "主链",

      mask_title: "EIDOS — 面罩显示",
      mask_intro:
        "可显示所选身份的面罩：为机器人显示人脸、为人显示机器脸。用于无障碍、隐私、性能与艺术。",
      mask_robotics_h: "EIDOS Mask Robotics",
      mask_robotics_p1:
        "类人机器人用创新面部显示系统。以柔性屏代替复杂机械表情，可显示任意面孔与情绪。",
      mask_robotics_p2:
        "释放内部空间、降低维护成本并提高可靠性。更轻量、更易适配、更加“有人味”的交互界面。",
      mask_human_h: "EIDOS Mask Human",
      mask_human_p1:
        "同一理念用于人：佩戴在脸上的轻量面罩，可瞬间切换外观（名人、数字化身、熟悉的面孔）。",
      mask_human_p2:
        "电池置于腰带，细线缆走线于绑带中；屏幕不加热皮肤。保留眼鼻口开口，长时间佩戴更舒适。",
      mask_human_p3:
        "应用：社交与游戏、心理疗愈、康复训练。",
      don_mask_h: "支持 EIDOS",

      robot_title: "AnestAI — 麻醉助手",
      robot_intro:
        "面向麻醉科的伦理助手：传感、引导与遵循流程的检查清单，以病人为先。",
      robot_feat1_h: "清爽界面",
      robot_feat1_p: "可读时间轴与提醒，柔和的色彩语义。",
      robot_feat2_h: "传感器",
      robot_feat2_p: "通过安全适配器连接 SpO₂、心率、血压、EtCO₂ 等。",
      robot_feat3_h: "流程规范",
      robot_feat3_p: "情景化步骤与关键操作的双重确认。",
      robot_feat4_h: "离线优先",
      robot_feat4_p: "无需联网；按院方策略同步。",
      robot_gal_h: "控制台与使用",
      don_robot_h: "支持 AnestAI",

      mirror_title: "VITA Mirror — 个人反思",
      mirror_intro:
        "具备宁静 UI、每日专注与柔和情绪提示的家用镜子。不是广告，为的是你。",
      mirror_gal_h: "概念图",
      don_mirror_h: "支持 VITA Mirror",

      mirror_apps_title: "VITA Mirror — 应用生态与创意",
      mirror_health_h: "健康与健身",
      mirror_health_fitmirror: "FitMirror：实时姿势矫正与训练演示。",
      mirror_health_healthpulse: "HealthPulse：对接智能手表，显示脉搏、血压与步数。",
      mirror_health_sleepcare: "SleepCare：睡眠分析与个性化晨间建议。",
      mirror_edu_h: "教育",
      mirror_edu_edumirror: "EduMirror：镜前授课与作业的虚拟教师。",
      mirror_edu_langmirror: "LangMirror：与 AI 实时对话练语言。",
      mirror_edu_storytime: "StoryTime：镜中动画角色讲互动故事。",
      mirror_psych_h: "心理与福祉",
      mirror_psych_moodmirror: "MoodMirror：识别情绪并推荐音乐、呼吸与休息。",
      mirror_psych_therapyai: "TherapyAI：支持性对话与轻心理治疗。",
      mirror_mem_h: "记忆与情感",
      mirror_mem_memorylink: "MemoryLink：用照片/视频/声音重现与逝者的相逢。",
      mirror_mem_timemachine: "TimeMachine：用药、儿童长牙、健康提醒。",
      mirror_mem_friendmirror: "FriendMirror：虚拟同伴、朋友与支持伙伴。",
      mirror_inv_h: "对投资者的优势",
      mirror_inv_streams: "多元收入：每个应用可采用订阅或广告。",
      mirror_inv_ecosystem: "生态效应：镜子成为自身的“应用商店”。",
      mirror_inv_markets: "庞大市场：健康、美妆、教育、心理、智能家居。",

      orig_title: "原创与法务",
      orig_text:
        "除非另有说明，本页的概念、文字与图片均为 RASSVETTECH 原创。请尊重许可与人的尊严。",
      future_title: "未来",
      future_text:
        "小步快跑，快速学习，伦理优先。若想支持——请联系、Fork 或捐助。黎明属于所有人。",

      tattoo_title: "TattooBot Station — 机器人纹身工作站",
      tattoo_intro: "一个紧凑的医疗美学工作站，结合了纹身制作与去除。",
      tattoo_look_h: "外观",
      tattoo_look_p:
        "白色/金属极简立柱搭配触摸屏：“纹身 / 去除”。机器人手臂（针头/激光）。前方配医疗床。",
      tattoo_funcs_h: "功能",
      tattoo_make_h: "纹身",
      tattoo_make_1: "从目录选择或上传自定义设计。",
      tattoo_make_2: "自动消毒与高精度机器人操作。",
      tattoo_make_3: "不仅是图案，也可刻录数字标签（QR/NFC）。",
      tattoo_remove_h: "去除",
      tattoo_remove_1: "机器人激光安全去除图案，可留下柔和的“记忆痕迹”。",
      tattoo_remove_2: "减少疼痛与疗程次数。",
      tattoo_feats_h: "特点",
      tattoo_feats_1: "双重性质：雕刻或去除——由客户选择。",
      tattoo_feats_2: "情感化设计：屏幕上浏览图案图库。",
      tattoo_feats_3: "医疗级洁净：UV 灯与易清洁外壳。",
      tattoo_feats_4: "AI 控制：分析肤色与颜料，选择最佳参数。",
      tattoo_use_h: "应用",
      tattoo_use_1: "美容院与纹身工作室。",
      tattoo_use_2: "医疗中心（去除纹身/疤痕/标记）。",
      tattoo_use_3: "未来 RASSVET LABS 创新演示。",
      don_tattoo_h: "支持 TattooBot",

      legal_en_1: "RASSVETTECH website and materials are protected by copyright and international agreements.",
      legal_en_2: "© RASSVETTECH™, 2025. All rights reserved.",
      legal_en_3: "Contact: Varzanov.86@mail.ru | varzanov0602@gmail.com",
      legal_disclaimer: "概念图片。与真实人物无关，且未获其认可。",
      credits: "由 RASSVETTECH 团队打造。"
    }
  };

  const DEFAULT_LANG = "en";
  const ALL = Object.keys(STR);

  function detectLang() {
    const saved = localStorage.getItem("rassvettech_lang");
    if (saved && ALL.includes(saved)) return saved;
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("ru")) return "ru";
    if (nav.startsWith("ja") || nav.startsWith("jp")) return "jp";
    if (nav.startsWith("ko")) return "ko";
    if (nav.startsWith("zh")) return "zh";
    return DEFAULT_LANG;
  }

  let current = detectLang();

  function applyI18n(lang) {
    const dict = STR[lang] || STR[DEFAULT_LANG];
    const t = $("#site-title");
    const m = $("#metaDesc");
    if (t) t.textContent = dict.site_title || STR.en.site_title;
    if (m) m.setAttribute("content", dict.meta_desc || STR.en.meta_desc);
    document.title = dict.site_title || STR.en.site_title;

    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = (dict[key] !== undefined ? dict[key] : STR.en[key]);
      if (typeof val === "string" && val.length > 0) {
        if (/^(INPUT|TEXTAREA)$/.test(el.tagName)) el.setAttribute("placeholder", val);
        else el.textContent = val;
      }
    });

    $$(".lng").forEach(b => {
      const on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    const ru = document.querySelector("#rassvet-root .legal-ru");
    const en = document.querySelector("#rassvet-root .legal-en");
    if (ru && en) {
      if (lang === "ru") { ru.style.display = ""; en.style.display = "none"; }
      else { ru.style.display = "none"; en.style.display = ""; }
    }

    localStorage.setItem("rassvettech_lang", lang);
    current = lang;
  }

  function bindLangBar() {
    const bar = $("#rassvet-root #langbar");
    if (!bar) return;
    bar.addEventListener("click", (e) => {
      const btn = e.target.closest(".lng");
      if (!btn) return;
      const lang = btn.getAttribute("data-lang");
      if (!lang || !STR[lang]) return;
      applyI18n(lang);
    });
  }

  function ready(fn){
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, {once:true})
      : fn();
  }

  ready(() => {
    bindLangBar();
    applyI18n(current);
  });

  window.RASSVETTECH_I18N = {
    set: (lang) => STR[lang] && applyI18n(lang),
    get: () => current,
    strings: STR
  };
})();
