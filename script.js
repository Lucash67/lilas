const TEAM = {
  secretaria: {
    title: "Secretaria",
    members: [
      { name: "Lara Dantas", course: "Fonoaudiologia", role: "Presidente", photo: "lara-dantas" },
      { name: "Isadora Ribeiro", course: "Fonoaudiologia", role: "Vice-presidente", photo: "isadora-ribeiro" },
      { name: "Andressa Maria", course: "Psicologia", role: "Secretária", photo: "andressa-maria" },
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

function memberCard(member) {
  const role = member.role
    ? `<span class="member-role">${member.role}</span>`
    : "";

  return `
    <article class="member-card">
      <div class="member-photo">
        <img src="assets/members/${member.photo}.jpg" alt="Foto de ${member.name}" loading="lazy" />
      </div>
      <h3>${member.name}</h3>
      <p class="member-course">${member.course}</p>
      ${role}
    </article>
  `;
}

function renderTeam() {
  const root = document.getElementById("team-sectors");
  if (!root) return;

  root.innerHTML = Object.entries(TEAM)
    .map(([id, sector], index) => {
      const active = index === 0 ? "is-active" : "";
      const hidden = index === 0 ? "" : 'hidden';
      return `
        <div class="sector-block ${active}" id="sector-${id}" data-sector="${id}" ${hidden}>
          <h3 class="sector-title">${sector.title}</h3>
          <div class="member-grid">
            ${sector.members.map(memberCard).join("")}
          </div>
        </div>
      `;
    })
    .join("");
}

function setupTabs() {
  const tabs = document.querySelectorAll(".sector-tab");
  const blocks = () => document.querySelectorAll(".sector-block");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const sector = tab.dataset.sector;

      tabs.forEach((t) => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });

      blocks().forEach((block) => {
        const match = block.dataset.sector === sector;
        block.classList.toggle("is-active", match);
        block.hidden = !match;
      });
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

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });
}

function setupHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.style.boxShadow =
      window.scrollY > 12 ? "0 8px 24px rgba(156, 38, 151, 0.08)" : "none";
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

renderTeam();
setupTabs();
setupNav();
setupHeaderScroll();
