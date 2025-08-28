// app-i18n.js — словари и применение i18n (безопасная, самодостаточная версия)
(function () {
  "use strict";
  // Защита от двойного подключения
  if (window.RASSVETTECH_I18N) return;

  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // ===== СЛОВАРИ =====
  const STR = {
    /* ========== EN ========== */
    en: {
      site_title: "RASSVETTECH — Intelligent Projects Hub",
      meta_desc: "RASSVETTECH: Drone projector ANDrew, EIDOS face-mask display, AnestAI anesthesia assistant, VITA Mirror, and TattooBot Station.",
      brand: "RASSVETTECH",
      hero_desc:
        "Five living ideas under one dawn: ANDrew — a drone that projects anywhere; EIDOS — a face-mask display for people and robots; AnestAI — an ethical anesthesia assistant; VITA Mirror — a personal reflection device; and TattooBot Station — a robotic tattoo system.",
      mission_title: "Our Mission",
      mission_text:
        "We build gentle, useful AI-devices that respect people: quiet by design, ethical by default, and simple enough to help every day — at home, in clinics, and in learning. Dawn belongs to everyone.",
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

      drone_quiet_h: "Quiet by Design",
      drone_quiet_p:
        "Drone noise is not a problem anymore. New toroidal propellers, phase-synchronized motors, and active noise cancellation reduce sound levels dramatically. Tests show drones operating as quiet as a normal conversation (~50 dB). ANDrew 2.0 follows this path — designed to be a silent companion, not a distraction.",

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

      don_andrew_h: "Support ANDrew",
      don_ton_s: "Fast, low fees",
      don_eth_s: "Global & reliable",
      don_tron_s: "Low-fee USDT",
      don_btc_s: "Main chain",

      /* MASK */
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

      /* ROBOT */
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

      /* VITA */
      mirror_title: "VITA Mirror — Personal Reflection",
      mirror_intro: "A home mirror with calm UI, daily focus, and gentle mood cues. Not for ads. For you.",
      mirror_gal_h: "Concepts",
      don_mirror_h: "Support VITA Mirror",

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

      /* ORIGINALITY / FUTURE */
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

    /* ========== RU ========== */
    ru: {
      site_title: "RASSVETTECH — Центр живых проектов",
      meta_desc: "RASSVETTECH: дрон-проектор ANDrew, маска-дисплей EIDOS, ассистент анестезии AnestAI, зеркало VITA и станция TattooBot.",
      brand: "RASSVETTECH",
      hero_desc:
        "Пять идей под одним рассветом: ANDrew — дрон-проектор; EIDOS — маска-экран для людей и роботов; AnestAI — этичный ассистент анестезиолога; VITA Mirror — зеркало личной рефлексии; TattooBot Station — роботизированная станция для татуировок.",
      mission_title: "Наша миссия",
      mission_text:
        "Мы создаём мягкие, полезные устройства с ИИ, уважающие людей: тихие по замыслу, этичные по умолчанию и простые, чтобы помогать каждый день — дома, в клиниках и в обучении. Рассвет принадлежит всем.",
      nav_drone: "Дрон ANDrew",
      nav_mask: "Маска EIDOS",
      nav_robot: "AnestAI",
      nav_mirror: "VITA Зеркало",
      nav_tattoo: "TattooBot",
      nav_originality: "Оригинальность / Право",
      nav_future: "Будущее",

      /* ...все русские строки — как в твоём коде (оставил без изменений) ... */
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
      mirror_title: "VITA Mirror — зеркало личной рефлексии",
      mirror_intro:
        "Домашнее зеркало со спокойным интерфейсом, фокусом дня и мягкими подсказками. Не для рекламы — для человека.",
      mirror_gal_h: "Концепты",
      don_mirror_h: "Поддержать VITA Mirror",
      /* ...и так далее: блоки mirror_apps_*, orig_*, tattoo_* — как в твоём коде... */
      legal_en_1: "Сайт RASSVETTECH и материалы защищены авторским правом и международными соглашениями.",
      legal_en_2: "© RASSVETTECH™, 2025. Все права защищены.",
      legal_en_3: "Контакт: Varzanov.86@mail.ru | varzanov0602@gmail.com",
      legal_disclaimer: "Концепт-изображения. Не связаны с реальными людьми и не одобрены ими.",
      credits: "Создано командой RASSVETTECH — с заботой о людях."
    },

    /* ========== JP / KO / ZH ========== */
    // Японский, корейский и китайский — возьмутся из твоего кода без изменений.
    // Чтобы не раздувать ответ, опустил их здесь, но в рабочем файле оставь полностью.
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

    // <title> и <meta name="description">
    const t = $("#site-title");
    const m = $("#metaDesc");
    if (t) t.textContent = dict.site_title || STR.en.site_title;
    if (m) m.setAttribute("content", dict.meta_desc || STR.en.meta_desc);
    document.title = dict.site_title || STR.en.site_title;

    // Все элементы с data-i18n
    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = (dict[key] !== undefined ? dict[key] : STR.en[key]);
      if (typeof val === "string" && val.length > 0) {
        if (/^(INPUT|TEXTAREA)$/.test(el.tagName)) el.setAttribute("placeholder", val);
        else el.textContent = val;
      }
    });

    // Подсветка активного языка
    $$(".lng").forEach(b => {
      const on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    // Переключение блока Legal (ru/en)
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

  // Публичное API
  window.RASSVETTECH_I18N = {
    set: (lang) => STR[lang] && applyI18n(lang),
    get: () => current,
    strings: STR
  };
})();
