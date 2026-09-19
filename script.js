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

function initialOf(name) {
  const letter = String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z]/g, "");
  return (letter.charAt(0) || "L").toUpperCase();
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

function pessoaCard(person, index) {
  const role = person.roleLabel
    ? `<span class="member-role">${escapeHtml(person.roleLabel)}</span>`
    : "";

  return `
    <article class="member-card pessoa-card" data-initial="${escapeHtml(initialOf(person.name))}" tabindex="0" style="animation-delay: ${index * 50}ms">
      <div class="member-photo">
        <img src="${photoSrc(person.photo)}" alt="Foto de ${escapeHtml(person.name)}" loading="lazy" decoding="async" />
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
            ${group.members.map((person, index) => pessoaCard(person, index)).join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

function setupHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    const scrolled = window.scrollY > 12;
    header.classList.toggle("is-scrolled", scrolled);
    header.style.boxShadow = scrolled ? "0 8px 24px rgba(156, 38, 151, 0.08)" : "none";
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
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

function bindHandScene(section, hand) {
  if (!section || !hand) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) hand.resume();
        else hand.pause();
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
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

function setupEncontro() {
  const el = document.getElementById("lilas-hand");
  if (!el || !window.LilasHand) return;

  const root = document.querySelector(".encontro");
  const glyphs = [...document.querySelectorAll(".encontro-name [data-glyph]")];
  const reveal = (name) => {
    const node = document.querySelector(`[data-encontro="${name}"]`);
    if (node) node.classList.add("is-in");
  };

  const hand = window.LilasHand.mount(el);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (root) root.classList.add("is-ready");
  reveal("whisper");

  const play = async () => {
    if (reduced) {
      glyphs.forEach((glyph) => glyph.classList.add("is-on"));
      reveal("name");
      reveal("full");
      reveal("meta");
      reveal("seal");
      await hand.show("L");
      hand.idle();
      return;
    }

    await hand.spell("LILAS", {
      hold: 380,
      move: 260,
      chips: false,
      onLetter(index) {
        reveal("name");
        glyphs.forEach((glyph, i) => {
          glyph.classList.toggle("is-on", i === index);
          glyph.classList.toggle("is-done", i <= index);
        });
      },
    });

    await hand.show("L");
    reveal("full");
    window.setTimeout(() => reveal("meta"), 180);
    window.setTimeout(() => reveal("seal"), 360);
    hand.idle();
  };

  play();
  bindHandScene(root, hand);
}

function setupEscuta() {
  const el = document.getElementById("escuta-hand");
  const section = document.getElementById("escuta");
  if (!el || !section || !window.LilasHand) return;

  const reveal = (name) => {
    const node = document.querySelector(`[data-escuta="${name}"]`);
    if (node) node.classList.add("is-in");
  };

  const hand = window.LilasHand.mount(el);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let played = false;

  const play = async () => {
    if (played) return;
    played = true;
    reveal("whisper");
    reveal("year");
    reveal("hook");

    if (reduced) {
      await hand.show("L");
      hand.idle();
      return;
    }

    await hand.spell("LIGA", {
      hold: 340,
      move: 240,
      chips: false,
    });
    await hand.show("L");
    hand.idle();
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
    { threshold: 0.28, rootMargin: "0px 0px -10% 0px" }
  );

  observer.observe(section);
  bindHandScene(section, hand);
}

function setupGesto() {
  const el = document.getElementById("gesto-hand");
  const section = document.getElementById("gesto");
  if (!el || !section || !window.LilasHand) return;

  const glyphs = [...document.querySelectorAll(".gesto-libras [data-glyph]")];
  const reveal = (name) => {
    const node = document.querySelector(`[data-gesto="${name}"]`);
    if (node) node.classList.add("is-in");
  };

  const hand = window.LilasHand.mount(el);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let played = false;

  const play = async () => {
    if (played) return;
    played = true;
    reveal("whisper");
    reveal("phrase");

    if (reduced) {
      glyphs.forEach((glyph) => glyph.classList.add("is-on", "is-done"));
      reveal("aside");
      await hand.show("L");
      hand.idle();
      return;
    }

    await hand.spell("LIBRAS", {
      hold: 320,
      move: 220,
      chips: false,
      onLetter(index) {
        glyphs.forEach((glyph, i) => {
          glyph.classList.toggle("is-on", i === index);
          glyph.classList.toggle("is-done", i <= index);
        });
      },
    });

    reveal("aside");
    await hand.show("L");
    hand.idle();
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
    { threshold: 0.28, rootMargin: "0px 0px -10% 0px" }
  );

  observer.observe(section);
  bindHandScene(section, hand);
}

function setupCaminhos() {
  const el = document.getElementById("caminhos-hand");
  const section = document.getElementById("caminhos");
  if (!el || !section || !window.LilasHand) return;

  const reveal = (name) => {
    const node = document.querySelector(`[data-caminhos="${name}"]`);
    if (node) node.classList.add("is-in");
  };

  const hand = window.LilasHand.mount(el);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let played = false;

  const play = async () => {
    if (played) return;
    played = true;
    reveal("whisper");
    reveal("hook");
    await hand.show("L");
    hand.idle();
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
    { threshold: 0.24, rootMargin: "0px 0px -10% 0px" }
  );

  observer.observe(section);
  bindHandScene(section, hand);
}

function setupPessoas() {
  const el = document.getElementById("pessoas-hand");
  const section = document.getElementById("pessoas");
  if (!el || !section || !window.LilasHand) return;

  const reveal = (name) => {
    const node = document.querySelector(`[data-pessoas="${name}"]`);
    if (node) node.classList.add("is-in");
  };

  const hand = window.LilasHand.mount(el);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let played = false;
  let leaveTimer = 0;

  const play = async () => {
    if (played) return;
    played = true;
    reveal("whisper");
    reveal("hook");
    await hand.show("L");
    hand.idle();
  };

  if (!reduced) {
    section.addEventListener("pointerover", (event) => {
      const card = event.target.closest("[data-initial]");
      if (!card || !section.contains(card)) return;
      window.clearTimeout(leaveTimer);
      hand.show(card.dataset.initial);
    });

    section.addEventListener("pointerout", (event) => {
      const card = event.target.closest("[data-initial]");
      if (!card) return;
      const next = event.relatedTarget && event.relatedTarget.closest
        ? event.relatedTarget.closest("[data-initial]")
        : null;
      if (next && section.contains(next)) return;
      leaveTimer = window.setTimeout(() => {
        hand.show("L").then(() => hand.idle());
      }, 220);
    });

    section.addEventListener("focusin", (event) => {
      const card = event.target.closest("[data-initial]");
      if (!card) return;
      window.clearTimeout(leaveTimer);
      hand.show(card.dataset.initial);
    });

    section.addEventListener("focusout", (event) => {
      const next = event.relatedTarget && event.relatedTarget.closest
        ? event.relatedTarget.closest("[data-initial]")
        : null;
      if (next && section.contains(next)) return;
      leaveTimer = window.setTimeout(() => {
        hand.show("L").then(() => hand.idle());
      }, 220);
    });
  }

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
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  observer.observe(section);
  bindHandScene(section, hand);
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

setupNav();
setupNavWatch();
setupHeaderScroll();
renderPessoas();
setupReveal();
setupEncontro();
setupEscuta();
setupGesto();
setupCaminhos();
setupPessoas();
setupTempo();
