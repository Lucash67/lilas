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
const SECTOR_IDS = Object.keys(TEAM);
let activeSector = "secretaria";

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

function memberCard(member, index) {
  const role = member.role
    ? `<span class="member-role">${escapeHtml(member.role)}</span>`
    : "";

  return `
    <article class="member-card" style="animation-delay: ${index * 70}ms">
      <div class="member-photo">
        <img src="${photoSrc(member.photo)}" alt="Foto de ${escapeHtml(member.name)}" loading="lazy" />
      </div>
      <h3>${escapeHtml(member.name)}</h3>
      <p class="member-course">${escapeHtml(member.course || "")}</p>
      ${role}
    </article>
  `;
}

function renderTeam() {
  const root = document.getElementById("team-sectors");
  if (!root) return;

  root.innerHTML = Object.entries(TEAM)
    .map(([id, sector]) => {
      const active = id === activeSector;
      return `
        <div
          class="sector-block ${active ? "is-active" : ""}"
          id="sector-${id}"
          role="tabpanel"
          aria-labelledby="tab-${id}"
          ${active ? "" : "hidden"}
        >
          <h3 class="sector-title">${escapeHtml(sector.title)}</h3>
          <div class="member-grid">
            ${sector.members.map((member, index) => memberCard(member, index)).join("")}
          </div>
        </div>
      `;
    })
    .join("");
}

function setActiveSector(sectorId) {
  if (!TEAM[sectorId]) return;
  activeSector = sectorId;

  document.querySelectorAll(".sector-tab").forEach((tab) => {
    const on = tab.dataset.sector === sectorId;
    tab.classList.toggle("is-active", on);
    tab.setAttribute("aria-selected", on ? "true" : "false");
    tab.tabIndex = on ? 0 : -1;
  });

  renderTeam();
}

function setupTabs() {
  const tabs = [...document.querySelectorAll(".sector-tab")];

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveSector(tab.dataset.sector));

    tab.addEventListener("keydown", (event) => {
      const index = tabs.indexOf(tab);
      let next = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        next = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        next = 0;
      } else if (event.key === "End") {
        next = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      tabs[next].focus();
      setActiveSector(tabs[next].dataset.sector);
    });
  });
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

setupTabs();
setupNav();
setupHeaderScroll();
setupReveal();
renderTeam();
