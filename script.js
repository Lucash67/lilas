const TEAM = {
  secretaria: {
    title: "Secretaria",
    members: [
      { name: "Lara Dantas", course: "Fonoaudiologia", role: "Presidente", photo: "lara-dantas" },
      { name: "Isadora Ribeiro", course: "Fonoaudiologia", role: "Vice-presidente", photo: "isadora-ribeiro" },
    ],
  },
  tesouraria: {
    title: "Tesouraria",
    members: [
      { name: "Andressa Maria", course: "Psicologia", role: "Tesouraria", photo: "andressa-maria" },
      { name: "Marina Freire", course: "Medicina", role: "Tesouraria", photo: "marina-freire" },
    ],
  },
  marketing: {
    title: "Marketing",
    members: [
      { name: "Anna Schevchenco", course: "Odontologia", role: "Coordenadora", photo: "anna-schevchenco" },
      { name: "Clarisbella Lima", course: "Fonoaudiologia", photo: "clarisbella-lima" },
      { name: "Dora Feijóo", course: "Fonoaudiologia", photo: "dora-feijoo" },
      { name: "Naiá Bentes", course: "Fonoaudiologia", photo: "naia-bentes" },
      { name: "Gabriela Barreto", course: "Odontologia", photo: "gabriela-barreto" },
      { name: "Maria Clara", course: "Fonoaudiologia", photo: "maria-clara" },
      { name: "Esley Edilon", course: "Odontologia", photo: "esley-edilon" },
    ],
  },
  extensao: {
    title: "Extensão",
    members: [
      { name: "Marina Freire", course: "Medicina", role: "Coordenadora", photo: "marina-freire" },
      { name: "Andressa Maria", course: "Psicologia", photo: "andressa-maria" },
      { name: "Domingos Teixeira", course: "Educação Física", photo: "domingos-teixeira" },
      { name: "Gabriela Barreto", course: "Odontologia", photo: "gabriela-barreto" },
      { name: "Mariana Sousa", course: "Psicologia", photo: "mariana-sousa" },
      { name: "Lídia Mendonça", course: "Medicina", photo: "lidia-mendonca" },
      { name: "Maria Gabriela", course: "Psicologia", photo: "maria-gabriela" },
      { name: "Naiá Bentes", course: "Fonoaudiologia", photo: "naia-bentes" },
      { name: "Esley Edilon", course: "Odontologia", photo: "esley-edilon" },
      { name: "Letícia Maria", course: "Psicologia", photo: "leticia-maria" },
      { name: "Mª Gabriela", course: "Medicina", photo: "ma-gabriela" },
    ],
  },
  pesquisa: {
    title: "Pesquisa",
    members: [
      { name: "Clarisbella Lima", course: "Fonoaudiologia", role: "Coordenadora", photo: "clarisbella-lima" },
      { name: "Marina Freire", course: "Medicina", photo: "marina-freire" },
      { name: "Anna Schevchenco", course: "Odontologia", photo: "anna-schevchenco" },
      { name: "Eduarda Vasconcelos", course: "Psicologia", photo: "eduarda-vasconcelos" },
      { name: "Maria Gabriela", course: "Psicologia", photo: "maria-gabriela" },
      { name: "Dante Luca", course: "Psicologia", photo: "dante-luca" },
      { name: "Maria Clara", course: "Fonoaudiologia", photo: "maria-clara" },
      { name: "Lídia Mendonça", course: "Medicina", photo: "lidia-mendonca" },
    ],
  },
  ensino: {
    title: "Ensino",
    members: [
      { name: "Andressa Maria", course: "Psicologia", role: "Coordenadora", photo: "andressa-maria" },
      { name: "Dante Luca", course: "Psicologia", photo: "dante-luca" },
      { name: "Mª Gabriela", course: "Medicina", photo: "ma-gabriela" },
      { name: "Mariana Sousa", course: "Psicologia", photo: "mariana-sousa" },
      { name: "Dora Feijóo", course: "Fonoaudiologia", photo: "dora-feijoo" },
    ],
  },
};

const PHOTO_VERSION = "7";
const COURSE_ORDER = [
  "Fonoaudiologia",
  "Psicologia",
  "Medicina",
  "Odontologia",
  "Educação Física",
];
const ROLE_RANK = {
  Presidente: 0,
  "Vice-presidente": 1,
  Coordenadora: 2,
  Tesouraria: 3,
};

const scrollTasks = [];
let scrollFrame = 0;

function registerScrollTask(task) {
  scrollTasks.push(task);
  task();
}

function scheduleScrollTasks() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0;
    scrollTasks.forEach((task) => task());
  });
}

window.addEventListener("scroll", scheduleScrollTasks, { passive: true });

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function photoSrc(photo) {
  return `assets/members/${photo}.jpg?v=${PHOTO_VERSION}`;
}

function collectPeople() {
  const map = new Map();

  Object.values(TEAM).forEach((sector) => {
    sector.members.forEach((member) => {
      if (!map.has(member.photo)) {
        map.set(member.photo, {
          name: member.name,
          course: member.course,
          photo: member.photo,
          rank: 9,
          roleLabel: "",
          sectors: [],
        });
      }

      const person = map.get(member.photo);
      if (!person.sectors.includes(sector.title)) {
        person.sectors.push(sector.title);
      }

      if (!member.role) return;
      const rank = ROLE_RANK[member.role] ?? 8;
      if (rank >= person.rank) return;

      person.rank = rank;
      person.roleLabel =
        member.role === "Coordenadora"
          ? `Coordenação de ${sector.title}`
          : member.role;
    });
  });

  return COURSE_ORDER.map((course) => ({
    course,
    members: [...map.values()]
      .filter((person) => person.course === course)
      .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name, "pt")),
  })).filter((group) => group.members.length);
}

function pessoaCard(person) {
  const role = person.roleLabel
    ? `<span class="member-role">${escapeHtml(person.roleLabel)}</span>`
    : "";

  return `
    <article class="member-card pessoa-card" tabindex="0">
      <div class="member-photo">
        <img src="${photoSrc(person.photo)}" alt="Foto de ${escapeHtml(person.name)}" width="118" height="118" loading="lazy" decoding="async" />
      </div>
      <h3>${escapeHtml(person.name)}</h3>
      ${role}
      <p class="pessoa-setores">${escapeHtml(person.sectors.join(" · "))}</p>
    </article>
  `;
}

function renderPessoas() {
  const root = document.getElementById("pessoas-list");
  if (!root) return;

  root.innerHTML = collectPeople()
    .map(
      (group) => `
        <section class="pessoas-course" data-reveal>
          <h3>${escapeHtml(group.course)}</h3>
          <div class="member-grid">
            ${group.members.map((person) => pessoaCard(person)).join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function setupNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu");
  if (!header || !toggle || !nav) return;

  const close = () => {
    header.classList.remove("is-open");
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("nav-lock");
  };

  const open = () => {
    header.classList.add("is-open");
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
    document.body.classList.add("nav-lock");
    const first = nav.querySelector("a");
    if (first) first.focus();
  };

  toggle.addEventListener("click", () => {
    nav.classList.contains("is-open") ? close() : open();
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
    if (!nav.classList.contains("is-open") || event.key !== "Tab") return;

    const focusable = [toggle, ...nav.querySelectorAll("a")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function setupHeaderScroll() {
  const header = document.querySelector(".site-header");
  const manifesto = document.querySelector(".manifesto");
  const next = document.getElementById("escuta");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
    if (!manifesto) return;

    const top = manifesto.getBoundingClientRect().top;
    const nextTop = next ? next.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
    header.classList.toggle("is-on-dark", top < 96 && nextTop > 64);
  };

  registerScrollTask(onScroll);
}

function setupReveal() {
  const nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}

function runWhenSectionVisible(section, play, options = {}) {
  if (!section) return;
  const { threshold = 0.28, rootMargin = "0px 0px -10% 0px" } = options;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let done = false;

  const run = () => {
    if (done) return;
    done = true;
    play();
  };

  if (reduced) {
    run();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run();
        observer.disconnect();
      });
    },
    { threshold, rootMargin }
  );

  observer.observe(section);
}

function setupNavWatch() {
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const pairs = links
    .map((link) => {
      const section = document.querySelector(link.hash);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!pairs.length) return;

  const setHere = (id) => {
    pairs.forEach(({ link, section }) => {
      link.classList.toggle("is-here", section.id === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.target.id) setHere(visible.target.id);
    },
    { rootMargin: "-28% 0px -55% 0px", threshold: [0.18, 0.4, 0.7] }
  );

  pairs.forEach(({ section }) => observer.observe(section));
}

function setupHero() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.requestAnimationFrame(() => hero.classList.add("is-ready"));

  const setOpen = (value) => {
    const next = Math.max(0, Math.min(1, value));
    hero.style.setProperty("--open", next.toFixed(4));
  };

  if (reduced) {
    setOpen(0);
    return;
  }

  let mx = 0;
  let my = 0;
  let tx = 0;
  let ty = 0;
  let ticking = 0;

  const tick = () => {
    mx += (tx - mx) * 0.08;
    my += (ty - my) * 0.08;
    hero.style.setProperty("--mx", mx.toFixed(4));
    hero.style.setProperty("--my", my.toFixed(4));
    ticking = 0;
  };

  if (window.matchMedia("(pointer: fine)").matches) {
    let heroActive = true;
    const heroVisibility = new IntersectionObserver(
      ([entry]) => {
        heroActive = entry.isIntersecting;
      },
      { rootMargin: "10% 0px 10% 0px", threshold: 0 }
    );
    heroVisibility.observe(hero);

    window.addEventListener(
      "pointermove",
      (event) => {
        if (!heroActive) return;
        tx = ((event.clientX / window.innerWidth) - 0.5) * 2;
        ty = ((event.clientY / window.innerHeight) - 0.5) * 2;
        if (!ticking) ticking = window.requestAnimationFrame(tick);
      },
      { passive: true }
    );
  }

  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight * 1.15) return;
    const span = Math.max(rect.height * 0.7, 1);
    setOpen(-rect.top / span);
  };

  registerScrollTask(onScroll);
}

function setupManifesto() {
  const section = document.querySelector(".manifesto");
  if (!section) return;

  const lines = [...section.querySelectorAll("[data-manifesto]")];
  const pillars = [...section.querySelectorAll(".manifesto-pillars [data-manifesto]")];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compact = () => window.matchMedia("(max-width: 720px)").matches;

  if (reduced) {
    lines.forEach((line) => line.classList.add("is-in"));
    return;
  }

  if (compact() && pillars.length) {
    const pillarObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          pillarObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px 8% 0px" }
    );
    pillars.forEach((pillar) => pillarObserver.observe(pillar));
  }

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const view = window.innerHeight;
    if (rect.bottom < -view * 0.15 || rect.top > view * 1.15) return;

    const isCompact = compact();
    const heightScale = isCompact ? 0.92 : 0.55;
    const progress = Math.max(
      0,
      Math.min(1, (view * (isCompact ? 0.65 : 0.78) - rect.top) / Math.max(rect.height * heightScale, 1))
    );
    section.style.setProperty("--reveal", progress.toFixed(4));

    lines.forEach((line) => {
      const step = Number(line.getAttribute("data-manifesto"));
      if (isCompact && step >= 5 && step <= 7) return;

      const stepScale = isCompact ? 0.085 : 0.11;
      const at = step === 0 ? 0.04 : step * stepScale;
      line.classList.toggle("is-in", progress > at);
    });

    if (isCompact && progress > 0.42) {
      pillars.forEach((pillar) => pillar.classList.add("is-in"));
    }
  };

  registerScrollTask(onScroll);
}

function setupEscuta() {
  const section = document.getElementById("escuta");
  runWhenSectionVisible(section, () => {
    ["whisper", "year", "hook"].forEach((name) => {
      document.querySelector(`[data-escuta="${name}"]`)?.classList.add("is-in");
    });
  });
}

function setupGesto() {
  const section = document.getElementById("gesto");
  const glyphs = [...document.querySelectorAll(".gesto-libras [data-glyph]")];
  runWhenSectionVisible(section, () => {
    ["whisper", "hook", "phrase"].forEach((name) => {
      document.querySelector(`[data-gesto="${name}"]`)?.classList.add("is-in");
    });
    glyphs.forEach((glyph) => glyph.classList.add("is-done"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      document.querySelector('[data-gesto="aside"]')?.classList.add("is-in");
    }, reduced ? 0 : 180);
  });
}

function setupCaminhos() {
  const section = document.getElementById("caminhos");
  runWhenSectionVisible(
    section,
    () => {
      ["whisper", "hook"].forEach((name) => {
        document.querySelector(`[data-caminhos="${name}"]`)?.classList.add("is-in");
      });
    },
    { threshold: 0.24 }
  );
}

function setupPessoas() {
  const section = document.getElementById("pessoas");
  runWhenSectionVisible(
    section,
    () => {
      ["whisper", "hook"].forEach((name) => {
        document.querySelector(`[data-pessoas="${name}"]`)?.classList.add("is-in");
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );
}

function setupTempo() {
  const section = document.getElementById("tempo");
  if (!section) return;

  const reveal = (name) => {
    const node = document.querySelector(`[data-tempo="${name}"]`);
    if (node) node.classList.add("is-in");
  };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const play = () => {
    reveal("whisper");
    reveal("year");
    window.setTimeout(() => reveal("line"), reduced ? 0 : 140);
    window.setTimeout(() => reveal("seal"), reduced ? 0 : 280);
    window.setTimeout(() => reveal("meta"), reduced ? 0 : 400);
  };

  if (reduced) {
    play();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        play();
        observer.disconnect();
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(section);
}

function boot() {
  setupNav();
  setupNavWatch();
  setupHeaderScroll();
  renderPessoas();
  setupReveal();
  setupHero();
  setupManifesto();
  setupEscuta();
  setupGesto();
  setupCaminhos();
  setupPessoas();
  setupTempo();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
