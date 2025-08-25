// app-core.js — маршруты, лайтбокс, почта, hash
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------------- CONTACT EMAIL (НЕ кликабельная версия) ----------------
  function applyContactEmail() {
    const span = $("#contactEmail");
    if (!span) return;

    const fromLS = (localStorage.getItem("rassvettech_email") || "").trim();
    const inHTML = (span.textContent || "").trim();
    const email  = fromLS || inHTML || "Varzanov.86@mail.ru";

    span.textContent = email;
  }

  // ---------------- LIGHTBOX ----------------
  let lightbox, lbImg;

  function ensureLightbox() {
    lightbox = $(".lightbox");
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
    document.body.appendChild(lightbox);
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
    $$(".gallery img.shot").forEach((img) => {
      img.addEventListener("click", () => {
        const full = img.getAttribute("data-full") || img.src;
        lbImg.src = full;
        lightbox.classList.add("open");
      });
    });
  }

  // ---------------- ROUTER ----------------
  const ACTIVE = "active";
  const KNOWN  = new Set(["drone", "mask", "robot", "mirror", "originality", "future"]);

  function showRoute(name) {
    if (!KNOWN.has(name)) name = "drone";

    // Секции
    $$(".route").forEach((sec) => {
      sec.classList.toggle(ACTIVE, sec.id === `route-${name}`);
    });

    // Верхние табы
    $$("nav.topnav .tab[data-route]").forEach((btn) => {
      const on = btn.getAttribute("data-route") === name;
      btn.classList.toggle(ACTIVE, on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });

    // Скролл к началу (без ошибки behavior:"instant")
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function routeFromHash() {
    const h = (location.hash || "").replace("#", "").trim();
    return KNOWN.has(h) ? h : "drone";
  }

  function bindTopNav() {
    const top = $("nav.topnav");
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
    $$("#site-footer a[data-route]").forEach((a) => {
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
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();
  }

  ready(() => {
    bindTopNav();
    bindFooterRoutes();
    bindGallery();
    applyContactEmail();
    showRoute(routeFromHash()); // первичный рендер
  });

  // Небольшое API
  window.RASSVETTECH_APP = {
    goto: showRoute,
    setEmail(email) {
      if (!email) return;
      localStorage.setItem("rassvettech_email", email);
      applyContactEmail();
    },
  };
})();

// app-i18n.js — полные строки локализаций EN / RU / JP / KO / ZH
(function () {
  "use strict";
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // ===================== STRINGS =====================
  const STR = {
    /* ============== EN ============== */
    en: {
      site_title: "RASSVETTECH — Intelligent Projects Hub",
      meta_desc: "RASSVETTECH: Drone projector ANDrew, EIDOS face-mask display, AnestAI anesthesia assistant, and VITA Mirror. Elegant. Multilingual.",

      brand: "RASSVETTECH",
      hero_desc:
        "Four living ideas under one dawn: ANDrew — a drone that projects content anywhere; EIDOS — a face-mask display for people and robots; AnestAI — an ethical anesthesia assistant; and VITA Mirror — a personal reflection device. Built with care, open to the world.",
      nav_drone: "ANDrew Drone",
      nav_mask: "EIDOS Mask",
      nav_robot: "AnestAI",
      nav_mirror: "VITA Mirror",
      nav_originality: "Originality / Legal",
      nav_future: "Future",

      // DRONE
      drone_title: "ANDrew — Flying Projector",
      drone_intro: "A compact drone that docks, charges, and projects. Movies at the camp, recipes in the kitchen, tutorials on a wall — anywhere you need a screen.",
      drone_feat1_h: "Dock & Charge",
      drone_feat1_p: "Magnetic base with safe contact pads and quick alignment.",
      drone_feat2_h: "Quiet Optics",
      drone_feat2_p: "Low-noise fans and tuned PWM so sound doesn’t spoil the scene.",
      drone_feat3_h: "Smart Beam",
      drone_feat3_p: "Auto-keystone, focus, and ambient-light compensation.",
      drone_feat4_h: "App & Voice",
      drone_feat4_p: "Cast from phone or ask the assistant to play YouTube or your files.",

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
      don_tron_s: "Low fees USDT",
      don_btc_s: "Main chain",

      // MASK (EIDOS)
      mask_title: "EIDOS — Face-Mask Display",
      mask_intro: "A display-mask that can show a chosen identity: people for robots, or robot faces for people. For accessibility, privacy, performance, and art.",
      tag_mask: "EIDOS Mask",
      don_mask_h: "Support EIDOS",
      mask_robotics_h: "EIDOS Mask Robotics",
      mask_human_h: "EIDOS Mask Human",
      mask_robotics_p1: "EIDOS Mask Robotics is a revolutionary facial display system for humanoid robots. Instead of complex mechanical mimicry, the mask uses a flexible screen that can show any face, emotion, or persona.",
      mask_robotics_p2: "This frees internal space, reduces maintenance cost, and boosts reliability. The result is a light, adaptable, and human-like interface for communication, service, and entertainment tasks.",
      mask_human_p1: "EIDOS Mask Human brings the same concept to people: a lightweight display-mask worn on the face that lets you instantly change appearance — from celebrities and digital avatars to familiar faces.",
      mask_human_p2: "For safety, the battery is placed on the belt, with thin cables routed through the straps, so the screen doesn’t heat the skin. Openings for eyes, nose, and mouth maintain comfort during long use.",
      mask_human_p3: "Use cases: from social interactions and games to psychological therapy and rehabilitation.",

      // ROBOT (AnestAI)
      tag_robot: "AnestAI",
      robot_title: "AnestAI — Anesthesia Assistant",
      robot_intro: "An ethical assistant for anesthesiologists: sensing, guidance, and checklists that follow the protocol and keep the patient first.",
      robot_feat1_h: "Clean UI",
      robot_feat1_p: "Readable timelines, alerts, and gentle color semantics.",
      robot_feat2_h: "Sensors",
      robot_feat2_p: "Connect SpO₂, HR, BP, EtCO₂ and more via safe adapters.",
      robot_feat3_h: "Protocol",
      robot_feat3_p: "Contextual steps and double-confirm on critical actions.",
      robot_feat4_h: "Offline First",
      robot_feat4_p: "Works without internet; syncs when clinic policy allows.",
      robot_gal_h: "Console & Use",
      don_robot_h: "Support AnestAI",

      // VITA MIRROR
      tag_mirror: "VITA Mirror",
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

      // ORIGINALITY / FUTURE
      orig_title: "Originality & Legal",
      orig_text: "All concepts, texts, and images on this page are original to the RASSVETTECH project unless otherwise stated. Respect licenses and human dignity.",
      future_title: "Future",
      future_text: "We ship small, learn fast, and keep ethics first. If you want to help — write, fork, or donate. Dawn belongs to everyone.",

      // LEGAL
      legal_en_1: "The RASSVETTECH website and its materials are protected by copyright and international agreements.",
      legal_en_2: "© RASSVETTECH™, 2025. All rights reserved.",
      legal_en_3: "Contact: Varzanov.86@mail.ru",

      credits: "Made by RASSVETTECH Team — with care for people."
    },

    /* ============== RU ============== */
    ru: {
      site_title: "RASSVETTECH — Центр разумных проектов",
      meta_desc: "RASSVETTECH: дрон-проектор ANDrew, маска-дисплей EIDOS, ассистент анестезии AnestAI и зеркало VITA. Красиво. Мультиязычно.",

      brand: "RASSVETTECH",
      hero_desc: "Четыре живые идеи под одним рассветом: ANDrew — дрон-проектор; EIDOS — маска-дисплей для людей и роботов; AnestAI — этичный ассистент анестезии; и VITA Mirror — устройство личной рефлексии. Создано с заботой, открыто миру.",
      nav_drone: "Дрон ANDrew",
      nav_mask: "Маска EIDOS",
      nav_robot: "AnestAI",
      nav_mirror: "VITA Зеркало",
      nav_originality: "Оригинальность / Право",
      nav_future: "Будущее",

      drone_title: "ANDrew — Летающий проектор",
      drone_intro: "Компактный дрон стыкуется, заряжается и проецирует. Фильмы у костра, рецепты на кухне, уроки на стене — где угодно.",
      drone_feat1_h: "Стыковка и зарядка",
      drone_feat1_p: "Магнитное основание, безопасные контакты и точная центрировка.",
      drone_feat2_h: "Тихая оптика",
      drone_feat2_p: "Низкий шум и настроенный ШИМ, чтобы звук не мешал сцене.",
      drone_feat3_h: "Умный луч",
      drone_feat3_p: "Автокоррекция трапеции, фокус и компенсация освещённости.",
      drone_feat4_h: "Приложение и голос",
      drone_feat4_p: "Каст с телефона или просьба ассистенту включить YouTube/файлы.",

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

      mask_title: "EIDOS — Маска-дисплей",
      mask_intro: "Маска-экран показывает выбранную идентичность: роботам — человека, людям — лицо робота. Для доступности, приватности, производительности и искусства.",
      tag_mask: "Маска EIDOS",
      don_mask_h: "Поддержать EIDOS",
      mask_robotics_h: "EIDOS Mask Robotics",
      mask_human_h: "EIDOS Mask Human",
      mask_robotics_p1: "EIDOS Mask Robotics — революционная система лицевого отображения для гуманоидных роботов. Вместо сложных механизмов мимики маска использует гибкий экран, который может показывать любое лицо, эмоцию или образ.",
      mask_robotics_p2: "Это освобождает внутреннее пространство, снижает расходы на обслуживание и повышает надёжность. Результат — лёгкий, адаптивный и максимально человечный интерфейс для общения, сервиса и развлечений.",
      mask_human_p1: "EIDOS Mask Human переносит ту же концепцию на людей: лёгкая маска-дисплей, надеваемая на лицо и позволяющая мгновенно менять облик — от знаменитостей и цифровых аватаров до лиц близких.",
      mask_human_p2: "Для безопасности аккумулятор вынесен на пояс, тонкие провода проходят в ремешках, поэтому экран не нагревает кожу. Отверстия для глаз, носа и рта сохраняют комфорт при длительном ношении.",
      mask_human_p3: "Применения: от социальных взаимодействий и игр до психологической терапии и реабилитации.",

      tag_robot: "AnestAI",
      robot_title: "AnestAI — ассистент анестезии",
      robot_intro: "Этичный помощник анестезиолога: сенсоры, подсказки и чек-листы по протоколу — во главе пациент.",
      robot_feat1_h: "Чистый интерфейс",
      robot_feat1_p: "Читаемые таймлайны, алерты и мягкая цветовая семантика.",
      robot_feat2_h: "Сенсоры",
      robot_feat2_p: "SpO₂, ЧСС, АД, EtCO₂ и др. через безопасные адаптеры.",
      robot_feat3_h: "Протокол",
      robot_feat3_p: "Контекстные шаги и двойное подтверждение критичных действий.",
      robot_feat4_h: "Offline-режим",
      robot_feat4_p: "Работает без интернета; синхронизация по политике клиники.",
      robot_gal_h: "Консоль и применение",
      don_robot_h: "Поддержать AnestAI",

      tag_mirror: "VITA Зеркало",
      mirror_title: "VITA Mirror — личная рефлексия",
      mirror_intro: "Домашнее зеркало со спокойным интерфейсом, фокусом дня и мягкими подсказками. Не для рекламы — для тебя.",
      mirror_gal_h: "Концепты",
      don_mirror_h: "Поддержать VITA Mirror",

      mirror_apps_title: "VITA Mirror — экосистема приложений и идеи",
      mirror_health_h: "Здоровье и фитнес",
      mirror_health_fitmirror: "FitMirror: корректировка осанки и обучающие тренировки в реальном времени.",
      mirror_health_healthpulse: "HealthPulse: синхронизация с часами — пульс, давление, шаги.",
      mirror_health_sleepcare: "SleepCare: анализ сна и персональные рекомендации с утра.",
      mirror_edu_h: "Обучение",
      mirror_edu_edumirror: "EduMirror: виртуальный учитель для уроков и домашки перед зеркалом.",
      mirror_edu_langmirror: "LangMirror: практика языков через живой диалог с ИИ.",
      mirror_edu_storytime: "StoryTime: интерактивные сказки с анимированными персонажами в отражении.",
      mirror_psych_h: "Психология и благополучие",
      mirror_psych_moodmirror: "MoodMirror: распознаёт настроение и предлагает музыку, дыхание, отдых.",
      mirror_psych_therapyai: "TherapyAI: поддерживающие беседы и лёгкая психотерапия.",
      mirror_mem_h: "Память и эмоции",
      mirror_mem_memorylink: "MemoryLink: воссоздаёт встречи с ушедшими близкими по фото/видео/голосу.",
      mirror_mem_timemachine: "TimeMachine: напоминания о лекарствах, детских зубах, заботе о себе.",
      mirror_mem_friendmirror: "FriendMirror: виртуальные друзья, напарники, поддерживающие собеседники.",
      mirror_inv_h: "Преимущества для инвесторов",
      mirror_inv_streams: "Много источников выручки: каждое приложение — подписка или реклама.",
      mirror_inv_ecosystem: "Эффект экосистемы: зеркало становится собственным «App Store».",
      mirror_inv_markets: "Огромные рынки: здоровье, красота, образование, психология, умный дом.",

      orig_title: "Оригинальность и Право",
      orig_text: "Все концепты, тексты и изображения — оригинальные материалы проекта RASSVETTECH, если не указано иное. Уважайте лицензии и достоинство.",
      future_title: "Будущее",
      future_text: "Запускаем малыми шагами, учимся быстро и держим этику на первом месте. Хотите помочь — пишите, форкайте, поддерживайте.",

      legal_ru_1: "Сайт RASSVETTECH и материалы охраняются авторским правом и международными соглашениями.",
      legal_ru_2: "© RASSVETTECH™, 2025. Все права защищены.",
      legal_ru_3: "Контакт: Varzanov.86@mail.ru",

      credits: "Сделано командой RASSVETTECH — с заботой о людях."
    },

    /* ============== JP ============== */
    jp: {
      site_title: "RASSVETTECH — インテリジェント・プロジェクト・ハブ",
      meta_desc: "RASSVETTECH: ドローン投影 ANDrew、EIDOS マスク、AnestAI、VITA Mirror。エレガント、多言語対応。",

      brand: "RASSVETTECH",
      hero_desc: "ひとつの夜明けの下にある四つの生きたアイデア：ANDrew — どこでもコンテンツを投影できるドローン；EIDOS — 人とロボットのためのフェイスマスク・ディスプレイ；AnestAI — 倫理的な麻酔アシスタント；VITA Mirror — 個人的なリフレクション・デバイス。思いやりを込めてつくられ、世界に開かれています。",
      nav_drone: "ANDrew ドローン",
      nav_mask: "EIDOS マスク",
      nav_robot: "AnestAI",
      nav_mirror: "VITA ミラー",
      nav_originality: "オリジナリティ / 法務",
      nav_future: "未来",

      drone_title: "ANDrew — フライング・プロジェクタ",
      drone_intro: "ドックし、充電し、投影します。キャンプの映画、キッチンのレシピ、壁でのチュートリアル——画面が必要な場所ならどこでも。",
      drone_feat1_h: "ドック＆充電",
      drone_feat1_p: "安全な接点を備えた磁気ベースと素早い位置合わせ。",
      drone_feat2_h: "静音オプティクス",
      drone_feat2_p: "低ノイズファンと調整済みPWMで、音がシーンを邪魔しません。",
      drone_feat3_h: "スマートビーム",
      drone_feat3_p: "自動台形補正、フォーカス、環境光補償。",
      drone_feat4_h: "アプリ＆音声",
      drone_feat4_p: "スマホからキャスト、またはアシスタントに YouTube/ファイルの再生を依頼。",

      gallery_h: "ギャラリー",
      gal1_t: "ブラックドック — コンパクト",
      gal2_t: "ホワイトドック — ラウンドパッド",
      gal3_t: "バッテリーパック — ライト",
      gal4_t: "バッテリーパック — ダーク",
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
      mask_intro: "選択したアイデンティティを表示できるマスク：ロボットには人の顔を、人にはロボットの顔を。アクセシビリティ、プライバシー、性能、アートのために。",
      tag_mask: "EIDOS マスク",
      don_mask_h: "EIDOS を支援",
      mask_robotics_h: "EIDOS Mask Robotics",
      mask_human_h: "EIDOS Mask Human",
      mask_robotics_p1: "EIDOS Mask Robotics はヒューマノイドロボット向けの革新的な顔表示システムです。複雑な機械的表情ではなく、柔軟なスクリーンで任意の顔・感情・ペルソナを表示します。",
      mask_robotics_p2: "内部スペースを節約し保守コストを削減、信頼性を向上。対話・サービス・エンタメに適した軽量で適応的な、人間らしいインターフェースです。",
      mask_human_p1: "EIDOS Mask Human は同じコンセプトを人へ拡張。顔に装着する軽量ディスプレイマスクで、有名人やデジタルアバター、身近な人の顔まで瞬時に切替可能。",
      mask_human_p2: "安全のためバッテリーはベルト側、細いケーブルはストラップ内。肌が熱くならず、目・鼻・口の開口部で長時間でも快適。",
      mask_human_p3: "用途：ソーシャル、ゲーム、心理療法、リハビリ。",

      tag_robot: "AnestAI",
      robot_title: "AnestAI — 麻酔アシスタント",
      robot_intro: "倫理に基づく麻酔科支援：センシング、ガイダンス、プロトコル準拠のチェックリストで患者第一。",
      robot_feat1_h: "クリーンUI",
      robot_feat1_p: "読みやすいタイムライン、アラート、柔らかな色の意味付け。",
      robot_feat2_h: "センサー",
      robot_feat2_p: "SpO₂・心拍・血圧・EtCO₂ を安全に接続。",
      robot_feat3_h: "プロトコル",
      robot_feat3_p: "状況別ステップと重要操作のダブル確認。",
      robot_feat4_h: "オフライン優先",
      robot_feat4_p: "ネット不要。院内ポリシーに従って同期。",
      robot_gal_h: "コンソール＆使用例",
      don_robot_h: "AnestAI を支援",

      tag_mirror: "VITA ミラー",
      mirror_title: "VITA Mirror — 個人リフレクション",
      mirror_intro: "落ち着いたUI、毎日のフォーカス、やさしいムードキューを備えたホームミラー。広告ではなく、あなたのために。",
      mirror_gal_h: "コンセプト",
      don_mirror_h: "VITA Mirror を支援",

      mirror_apps_title: "VITA Mirror — アプリ・エコシステムとアイデア",
      mirror_health_h: "ヘルス＆フィットネス",
      mirror_health_fitmirror: "FitMirror：リアルタイムで姿勢補正とトレーニングデモ。",
      mirror_health_healthpulse: "HealthPulse：スマートウォッチと連携し、脈拍・血圧・歩数を表示。",
      mirror_health_sleepcare: "SleepCare：睡眠分析とパーソナライズされた朝の提案。",
      mirror_edu_h: "教育",
      mirror_edu_edumirror: "EduMirror：鏡の前で授業や宿題を行うバーチャル教師。",
      mirror_edu_langmirror: "LangMirror：AI とライブ会話で語学練習。",
      mirror_edu_storytime: "StoryTime：反射内のアニメキャラクターによるインタラクティブ物語。",
      mirror_psych_h: "心理＆ウェルビーイング",
      mirror_psych_moodmirror: "MoodMirror：気分を検出し、音楽・呼吸・休息を提案。",
      mirror_psych_therapyai: "TherapyAI：支援的な会話とライトな心理療法。",
      mirror_mem_h: "記憶と感情",
      mirror_mem_memorylink: "MemoryLink：写真・動画・声で、故人との再会を再構成。",
      mirror_mem_timemachine: "TimeMachine：投薬、子どもの歯、ウェルネスのリマインダー。",
      mirror_mem_friendmirror: "FriendMirror：バーチャルな友人・相棒・支援的パートナー。",
      mirror_inv_h: "投資家への利点",
      mirror_inv_streams: "複数の収益源：アプリごとにサブスクや広告を選択可能。",
      mirror_inv_ecosystem: "エコシステム効果：鏡が独自の“App Store”になる。",
      mirror_inv_markets: "巨大市場：ヘルス、美容、教育、心理、スマートホーム。",

      legal_en_1: "RASSVETTECH website and materials are protected by copyright and international agreements.",
      legal_en_2: "© RASSVETTECH™, 2025. All rights reserved.",
      legal_en_3: "Contact: Varzanov.86@mail.ru",

      credits: "RASSVETTECH チームより。"
    },

    /* ============== KO ============== */
    ko: {
      site_title: "RASSVETTECH — 지능형 프로젝트 허브",
      meta_desc: "RASSVETTECH: ANDrew 드론 프로젝터, EIDOS 마스크 디스플레이, AnestAI 마취 보조, VITA 미러. 우아함, 다국어.",

      brand: "RASSVETTECH",
      hero_desc: "하나의 새벽 아래 네 가지 살아있는 아이디어: ANDrew — 어디서나 콘텐츠를 투영하는 드론; EIDOS — 사람과 로봇을 위한 얼굴 마스크 디스플레이; AnestAI — 윤리적인 마취 보조; VITA Mirror — 개인 리플렉션 장치. 배려로 만들어졌고, 세계에 열려 있습니다.",
      nav_drone: "ANDrew 드론",
      nav_mask: "EIDOS 마스크",
      nav_robot: "AnestAI",
      nav_mirror: "VITA 미러",
      nav_originality: "오리지널리티 / 법률",
      nav_future: "미래",

      drone_title: "ANDrew — 비행 프로젝터",
      drone_intro: "도킹·충전·투사. 캠핑 영화, 주방 레시피, 벽면 튜토리얼 — 화면이 필요한 어디든지.",
      drone_feat1_h: "도킹 & 충전",
      drone_feat1_p: "안전 접점과 빠른 정렬의 자기 베이스.",
      drone_feat2_h: "저소음 광학",
      drone_feat2_p: "저소음 팬과 조정된 PWM.",
      drone_feat3_h: "스마트 빔",
      drone_feat3_p: "자동 키스톤, 포커스, 주변광 보정.",
      drone_feat4_h: "앱 & 음성",
      drone_feat4_p: "휴대폰 캐스트 또는 어시스턴트에 YouTube/파일 재생 요청.",

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
      don_eth_s: "글로벌·신뢰",
      don_tron_s: "USDT 저수수료",
      don_btc_s: "메인체인",

      mask_title: "EIDOS — 페이스 마스크 디스플레이",
      mask_intro: "선택한 정체성을 표시하는 마스크: 로봇에는 사람 얼굴, 사람에게는 로봇 얼굴. 접근성·프라이버시·성능·예술.",
      tag_mask: "EIDOS 마스크",
      don_mask_h: "EIDOS 후원",
      mask_robotics_h: "EIDOS Mask Robotics",
      mask_human_h: "EIDOS Mask Human",
      mask_robotics_p1: "EIDOS Mask Robotics는 휴머노이드 로봇용 얼굴 디스플레이 시스템입니다. 유연한 스크린으로 어떤 얼굴·감정·페르소나도 표시합니다.",
      mask_robotics_p2: "내부 공간 절약, 유지비 절감, 신뢰성 향상. 소통·서비스·엔터테인먼트에 적합한 가볍고 사람다운 인터페이스.",
      mask_human_p1: "EIDOS Mask Human은 같은 개념을 사람에게 확장. 얼굴에 착용하는 경량 디스플레이 마스크로 즉시 외형 전환.",
      mask_human_p2: "배터리는 벨트, 케이블은 스트랩 — 피부 과열 없음. 눈·코·입 개구부로 장시간 착용도 편안.",
      mask_human_p3: "용도: 사회적 상호작용·게임·심리 치료·재활.",

      tag_robot: "AnestAI",
      robot_title: "AnestAI — 마취 보조",
      robot_intro: "윤리 중심의 마취과 보조: 센싱, 가이드, 프로토콜 체크리스트.",
      robot_feat1_h: "깔끔한 UI",
      robot_feat1_p: "가독성 높은 타임라인과 알림.",
      robot_feat2_h: "센서",
      robot_feat2_p: "SpO₂·심박·혈압·EtCO₂ 연결.",
      robot_feat3_h: "프로토콜",
      robot_feat3_p: "상황별 단계·중요 동작 이중 확인.",
      robot_feat4_h: "오프라인 우선",
      robot_feat4_p: "인터넷 없이 동작, 정책에 따라 동기화.",
      robot_gal_h: "콘솔 & 사용",
      don_robot_h: "AnestAI 후원",

      tag_mirror: "VITA 미러",
      mirror_title: "VITA Mirror — 개인 리플렉션",
      mirror_intro: "차분한 UI, 일일 포커스, 부드러운 무드 큐를 갖춘 홈 미러. 광고가 아니라 당신을 위해.",
      mirror_gal_h: "콘셉트",
      don_mirror_h: "VITA Mirror 후원",

      mirror_apps_title: "VITA Mirror — 앱 에코시스템 & 아이디어",
      mirror_health_h: "건강 & 피트니스",
      mirror_health_fitmirror: "FitMirror: 실시간 자세 교정과 트레이닝 데모.",
      mirror_health_healthpulse: "HealthPulse: 스마트워치 연동 — 맥박·혈압·걸음 수.",
      mirror_health_sleepcare: "SleepCare: 수면 분석과 개인화된 아침 추천.",
      mirror_edu_h: "교육",
      mirror_edu_edumirror: "EduMirror: 거울 앞에서 수업과 숙제를 돕는 가상 교사.",
      mirror_edu_langmirror: "LangMirror: AI와 라이브 대화로 언어 연습.",
      mirror_edu_storytime: "StoryTime: 반사 속 애니 캐릭터와 상호작용 이야기.",
      mirror_psych_h: "심리 & 웰빙",
      mirror_psych_moodmirror: "MoodMirror: 기분을 감지해 음악·호흡·휴식을 제안.",
      mirror_psych_therapyai: "TherapyAI: 지지적 대화와 가벼운 심리치료.",
      mirror_mem_h: "기억 & 감정",
      mirror_mem_memorylink: "MemoryLink: 사진/영상/음성으로 고인과의 만남을 재현.",
      mirror_mem_timemachine: "TimeMachine: 복약·아이 치아·웰빙 알림.",
      mirror_mem_friendmirror: "FriendMirror: 가상 동반자·친구·지원 파트너.",
      mirror_inv_h: "투자자 장점",
      mirror_inv_streams: "다양한 수익원: 앱마다 구독/광고 선택.",
      mirror_inv_ecosystem: "에코시스템 효과: 미러가 자체 ‘App Store’.",
      mirror_inv_markets: "거대한 시장: 건강·뷰티·교육·심리·스마트홈.",

      legal_en_1: "RASSVETTECH website and materials are protected by copyright and international agreements.",
      legal_en_2: "© RASSVETTECH™, 2025. All rights reserved.",
      legal_en_3: "Contact: Varzanov.86@mail.ru",

      credits: "RASSVETTECH 팀."
    },

    /* ============== ZH ============== */
    zh: {
      site_title: "RASSVETTECH — 智能项目枢纽",
      meta_desc: "RASSVETTECH：ANDrew 投影无人机、EIDOS 面罩显示、AnestAI 麻醉助手、VITA 镜子。优雅，多语言。",

      brand: "RASSVETTECH",
      hero_desc: "同一黎明下的四个鲜活创意：ANDrew——可在任何地方投射内容的无人机；EIDOS——为人和机器人设计的面罩显示；AnestAI——讲求伦理的麻醉助手；VITA Mirror——个人反思设备。以关怀打造，向世界开放。",
      nav_drone: "ANDrew 无人机",
      nav_mask: "EIDOS 面罩",
      nav_robot: "AnestAI",
      nav_mirror: "VITA 镜",
      nav_originality: "原创 / 法务",
      nav_future: "未来",

      drone_title: "ANDrew — 飞行投影",
      drone_intro: "对接、充电、投影。营地电影、厨房食谱、墙面教程——哪里需要屏幕就投到哪里。",
      drone_feat1_h: "底座对接与充电",
      drone_feat1_p: "磁吸底座与安全触点，快速校准定位。",
      drone_feat2_h: "低噪光学",
      drone_feat2_p: "低噪风扇与调校 PWM。",
      drone_feat3_h: "智能光束",
      drone_feat3_p: "自动梯形校正、对焦与环境光补偿。",
      drone_feat4_h: "应用与语音",
      drone_feat4_p: "手机投屏，或让助手播放 YouTube/你的文件。",

      gallery_h: "图库",
      gal1_t: "黑色底座 — 紧凑",
      gal2_t: "白色底座 — 圆形垫",
      gal3_t: "电池包 — 浅色",
      gal4_t: "电池包 — 深色",
      gal5_t: "电影之夜",
      gal6_t: "厨房里的 YouTube",
      tag_charging: "充电",
      tag_battery: "电池",
      tag_cinema: "影院",
      tag_youtube: "YouTube",

      don_andrew_h: "支持 ANDrew",
      don_ton_s: "快速、低费用",
      don_eth_s: "全球且可靠",
      don_tron_s: "USDT 低费用",
      don_btc_s: "主链",

      mask_title: "EIDOS — 面罩显示",
      mask_intro: "可显示所选身份的显示面罩：为机器人显示人脸、为人显示机器脸。用于无障碍、隐私、性能与艺术。",
      tag_mask: "EIDOS 面罩",
      don_mask_h: "支持 EIDOS",
      mask_robotics_h: "EIDOS Mask Robotics",
      mask_human_h: "EIDOS Mask Human",
      mask_robotics_p1: "EIDOS Mask Robotics 是类人机器人用的创新面部显示系统。柔性屏幕可显示任意面孔、情绪或形象，不必依赖复杂机械表情。",
      mask_robotics_p2: "这释放内部空间、降低维护成本并提升可靠性。结果是轻量、可适应、具有人性化的交互界面，适合沟通、服务与娱乐。",
      mask_human_p1: "EIDOS Mask Human 将同一理念带到人身上：佩戴在脸上的轻量显示面罩，可瞬时切换外观——从名人和数字化身到亲友面孔。",
      mask_human_p2: "电池置于腰带，细线缆穿过绑带，避免屏幕加热皮肤；保留眼鼻口的开口，长时间佩戴也舒适。",
      mask_human_p3: "应用：从社交与游戏到心理疗愈与康复训练。",

      tag_robot: "AnestAI",
      robot_title: "AnestAI — 麻醉助手",
      robot_intro: "面向麻醉科的伦理助手：传感、引导与遵循流程的检查清单，以病人为先。",
      robot_feat1_h: "清爽界面",
      robot_feat1_p: "可读时间轴与提示，柔和色彩语义。",
      robot_feat2_h: "传感器",
      robot_feat2_p: "通过安全适配器连接 SpO₂/心率/血压/EtCO₂ 等。",
      robot_feat3_h: "流程规范",
      robot_feat3_p: "情景化步骤与关键操作的双重确认。",
      robot_feat4_h: "离线优先",
      robot_feat4_p: "无需联网；按院方策略同步。",
      robot_gal_h: "控制台与使用",
      don_robot_h: "支持 AnestAI",

      tag_mirror: "VITA 镜",
      mirror_title: "VITA Mirror — 个人反思",
      mirror_intro: "具备宁静 UI、每日专注与温和情绪提示的家用镜子。不是广告，为的是你自己。",
      mirror_gal_h: "概念",
      don_mirror_h: "支持 VITA Mirror",

      mirror_apps_title: "VITA Mirror — 应用生态与创意",
      mirror_health_h: "健康与健身",
      mirror_health_fitmirror: "FitMirror：实时姿势纠正与训练演示。",
      mirror_health_healthpulse: "HealthPulse：与智能手表同步，显示脉搏、血压与步数。",
      mirror_health_sleepcare: "SleepCare：睡眠分析与个性化的晨间建议。",
      mirror_edu_h: "教育",
      mirror_edu_edumirror: "EduMirror：在镜子前上课与做作业的虚拟教师。",
      mirror_edu_langmirror: "LangMirror：通过与 AI 的实时对话练习语言。",
      mirror_edu_storytime: "StoryTime：镜中动画角色参与的互动故事。",
      mirror_psych_h: "心理与福祉",
      mirror_psych_moodmirror: "MoodMirror：识别情绪并推荐音乐、呼吸练习与休息。",
      mirror_psych_therapyai: "TherapyAI：支持性对话与轻量心理治疗。",
      mirror_mem_h: "记忆与情感",
      mirror_mem_memorylink: "MemoryLink：通过照片/视频/声音重现与逝者的相逢。",
      mirror_mem_timemachine: "TimeMachine：用药、孩子长牙与健康提醒。",
      mirror_mem_friendmirror: "FriendMirror：虚拟同伴、朋友与支持伙伴。",
      mirror_inv_h: "对投资者的优势",
      mirror_inv_streams: "多元收入：每个应用可采用订阅或广告。",
      mirror_inv_ecosystem: "生态效应：镜子成为其自身的“应用商店”。",
      mirror_inv_markets: "庞大市场：健康、美妆、教育、心理、智能家居。",

      legal_en_1: "RASSVETTECH website and materials are protected by copyright and international agreements.",
      legal_en_2: "© RASSVETTECH™, 2025. All rights reserved.",
      legal_en_3: "Contact: Varzanov.86@mail.ru",

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

  // ---------- Auto-wire: навесить data-i18n там, где забыли ----------
  function autoWireMissingKeys() {
    // EIDOS headings
    const mask = $('#route-mask');
    if (mask) {
      const h3s = Array.from(mask.querySelectorAll('h3'));
      const hRob = h3s.find(el => /EIDOS\s+Mask\s+Robotics/i.test(el.textContent) && !el.hasAttribute('data-i18n'));
      const hHum = h3s.find(el => /EIDOS\s+Mask\s+Human/i.test(el.textContent) && !el.hasAttribute('data-i18n'));
      if (hRob) hRob.setAttribute('data-i18n', 'mask_robotics_h');
      if (hHum) hHum.setAttribute('data-i18n', 'mask_human_h');
    }

    // VITA Mirror app-ecosystem block
    const vm = $('#route-mirror');
    if (vm) {
      const card = Array.from(vm.querySelectorAll('.card'))
        .find(c => /VITA\s+Mirror.*App\s+Ecosystem/i.test(c.textContent) && !c.querySelector('[data-i18n="mirror_apps_title"]'));
      if (card) {
        const h3 = card.querySelector('h3');
        if (h3 && !h3.hasAttribute('data-i18n')) h3.setAttribute('data-i18n', 'mirror_apps_title');

        const mapH4 = new Map([
          [/Health/i, 'mirror_health_h'],
          [/Education/i, 'mirror_edu_h'],
          [/Psychology|Well-Being/i, 'mirror_psych_h'],
          [/Memories|Emotions/i, 'mirror_mem_h'],
          [/Investor|Investors/i, 'mirror_inv_h'],
        ]);
        card.querySelectorAll('h4').forEach(h4=>{
          if (!h4.hasAttribute('data-i18n')) {
            for (const [re,key] of mapH4.entries()) {
              if (re.test(h4.textContent)) { h4.setAttribute('data-i18n', key); break; }
            }
          }
        });

        const mapLi = [
          [/^FitMirror/i, 'mirror_health_fitmirror'],
          [/^HealthPulse/i, 'mirror_health_healthpulse'],
          [/^SleepCare/i, 'mirror_health_sleepcare'],
          [/^EduMirror/i, 'mirror_edu_edumirror'],
          [/^LangMirror/i, 'mirror_edu_langmirror'],
          [/^StoryTime/i, 'mirror_edu_storytime'],
          [/^MoodMirror/i, 'mirror_psych_moodmirror'],
          [/^TherapyAI/i, 'mirror_psych_therapyai'],
          [/^MemoryLink/i, 'mirror_mem_memorylink'],
          [/^TimeMachine/i, 'mirror_mem_timemachine'],
          [/^FriendMirror/i, 'mirror_mem_friendmirror'],
        ];
        card.querySelectorAll('li').forEach(li=>{
          if (!li.hasAttribute('data-i18n')) {
            const t = li.textContent.trim();
            let found = false;
            for (const [re,key] of mapLi) {
              if (re.test(t)) { li.setAttribute('data-i18n', key); found = true; break; }
            }
            if (!found) {
              const s = t.toLowerCase();
              if (s.includes('revenue') || s.includes('подпис') || s.includes('收入')) li.setAttribute('data-i18n','mirror_inv_streams');
              else if (s.includes('ecosystem') || s.includes('экосистем') || s.includes('生态')) li.setAttribute('data-i18n','mirror_inv_ecosystem');
              else if (s.includes('markets') || s.includes('рынк') || s.includes('市场')) li.setAttribute('data-i18n','mirror_inv_markets');
            }
          }
        });
      }
    }
  }

  // ---------- i18n apply (без затирания текста при пустых ключах) ----------
  let current = detectLang();

  function applyI18n(lang) {
    const dict = STR[lang] || STR[DEFAULT_LANG];

    // Title & Meta
    const t = $("#site-title");
    const m = $("#metaDesc");
    if (t) t.textContent = dict.site_title || STR.en.site_title;
    if (m) m.setAttribute("content", dict.meta_desc || STR.en.meta_desc);
    document.title = dict.site_title || STR.en.site_title;

    // data-i18n text (safe)
    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = (dict[key] !== undefined ? dict[key] : STR.en[key]);
      if (typeof val === "string" && val.length > 0) {
        if (/^(INPUT|TEXTAREA)$/.test(el.tagName)) el.setAttribute("placeholder", val);
        else el.textContent = val;
      } // иначе оставляем существующий текст, ничего не трогаем
    });

    // lang buttons
    $$(".lng").forEach(b => {
      const on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    // Footer RU/EN block
    const ru = $(".legal-ru");
    const en = $(".legal-en");
    if (ru && en) {
      if (lang === "ru") { ru.style.display = ""; en.style.display = "none"; }
      else { ru.style.display = "none"; en.style.display = ""; }
    }

    localStorage.setItem("rassvettech_lang", lang);
    current = lang;
  }

  function bindLangBar() {
    const bar = $("#langbar");
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

  // ---------- INIT ----------
  ready(() => {
    bindLangBar();
    autoWireMissingKeys();     // проставим недостающие data-i18n, если в HTML забыли
    applyI18n(current);        // применим переводы
  });

  // ---------- Public API ----------
  window.RASSVETTECH_I18N = {
    set: (lang) => STR[lang] && applyI18n(lang),
    get: () => current,
    strings: STR
  };
})();
