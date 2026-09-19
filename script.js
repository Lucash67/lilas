const DEFAULT_TEAM = {
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

const PHOTO_LIBRARY = [
  "lara-dantas",
  "isadora-ribeiro",
  "andressa-maria",
  "marina-freire",
  "anna-schevchenco",
  "clarisbella-lima",
  "dora-feijoo",
  "naia-bentes",
  "gabriela-barreto",
  "maria-clara",
  "esley-edilon",
  "domingos-teixeira",
  "mariana-sousa",
  "lidia-mendonca",
  "maria-gabriela",
  "leticia-maria",
  "ma-gabriela",
  "eduarda-vasconcelos",
  "dante-luca",
];

const STORAGE_TEAM = "lilas-team-data-v2";
const STORAGE_PHOTOS = "lilas-custom-photos-v2";

let TEAM = loadTeam();
let customPhotos = loadCustomPhotos();
let editMode = false;
let activeSector = "secretaria";
let photoPickerTarget = null;

// Clear outdated editor cache that still had "Secretária"
try {
  localStorage.removeItem("lilas-team-data");
  localStorage.removeItem("lilas-custom-photos");
} catch (e) {
  /* ignore */
}

function loadTeam() {
  try {
    const raw = localStorage.getItem(STORAGE_TEAM);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore */
  }
  return structuredClone(DEFAULT_TEAM);
}

function loadCustomPhotos() {
  try {
    const raw = localStorage.getItem(STORAGE_PHOTOS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore */
  }
  return {};
}

function saveAll() {
  localStorage.setItem(STORAGE_TEAM, JSON.stringify(TEAM));
  localStorage.setItem(STORAGE_PHOTOS, JSON.stringify(customPhotos));
}

const PHOTO_VERSION = "4";

function photoSrc(photo) {
  if (customPhotos[photo]) return customPhotos[photo];
  if (String(photo).startsWith("data:")) return photo;
  return `assets/members/${photo}.jpg?v=${PHOTO_VERSION}`;
}

function memberCard(member, sectorId, index) {
  const role = member.role
    ? `<span class="member-role">${escapeHtml(member.role)}</span>`
    : editMode
      ? `<span class="member-role member-role-empty">Sem cargo</span>`
      : "";

  if (!editMode) {
    return `
      <article class="member-card">
        <div class="member-photo">
          <img src="${photoSrc(member.photo)}" alt="Foto de ${escapeHtml(member.name)}" loading="lazy" />
        </div>
        <h3>${escapeHtml(member.name)}</h3>
        <p class="member-course">${escapeHtml(member.course || "")}</p>
        ${role}
      </article>
    `;
  }

  return `
    <article class="member-card is-editing" data-sector="${sectorId}" data-index="${index}">
      <button class="photo-edit-btn" type="button" title="Trocar foto" data-action="photo">
        <div class="member-photo">
          <img src="${photoSrc(member.photo)}" alt="Foto de ${escapeHtml(member.name)}" />
        </div>
        <span class="photo-edit-label">Trocar foto</span>
      </button>
      <label class="edit-field">
        <span>Nome</span>
        <input type="text" data-field="name" value="${escapeAttr(member.name)}" />
      </label>
      <label class="edit-field">
        <span>Curso</span>
        <input type="text" data-field="course" value="${escapeAttr(member.course || "")}" />
      </label>
      <label class="edit-field">
        <span>Cargo</span>
        <input type="text" data-field="role" value="${escapeAttr(member.role || "")}" placeholder="Opcional" />
      </label>
    </article>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function renderTeam() {
  const root = document.getElementById("team-sectors");
  if (!root) return;

  root.innerHTML = Object.entries(TEAM)
    .map(([id, sector]) => {
      const active = id === activeSector ? "is-active" : "";
      const hidden = id === activeSector ? "" : "hidden";
      return `
        <div class="sector-block ${active}" id="sector-${id}" data-sector="${id}" ${hidden}>
          <h3 class="sector-title">${escapeHtml(sector.title)}</h3>
          <div class="member-grid">
            ${sector.members.map((member, index) => memberCard(member, id, index)).join("")}
          </div>
        </div>
      `;
    })
    .join("");

  if (editMode) bindEditHandlers();
}

function bindEditHandlers() {
  document.querySelectorAll(".member-card.is-editing").forEach((card) => {
    const sectorId = card.dataset.sector;
    const index = Number(card.dataset.index);

    card.querySelectorAll("input[data-field]").forEach((input) => {
      input.addEventListener("change", () => {
        updateMemberField(sectorId, index, input.dataset.field, input.value.trim());
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          input.blur();
        }
      });
    });

    const photoBtn = card.querySelector('[data-action="photo"]');
    if (photoBtn) {
      photoBtn.addEventListener("click", () => openPhotoPicker(sectorId, index));
    }
  });
}

function updateMemberField(sectorId, index, field, value) {
  const member = TEAM[sectorId].members[index];
  const photoKey = member.photo;

  if (field === "role") {
    if (value) member.role = value;
    else delete member.role;
  } else {
    member[field] = value;
  }

  // Same photo = same person → sync name and course across sectors
  if (field === "name" || field === "course") {
    Object.values(TEAM).forEach((sector) => {
      sector.members.forEach((other) => {
        if (other.photo === photoKey) other[field] = value;
      });
    });
  }

  saveAll();
  renderTeam();
}

function setMemberPhoto(sectorId, index, photoId) {
  const member = TEAM[sectorId].members[index];
  member.photo = photoId;

  Object.values(TEAM).forEach((sector) => {
    sector.members.forEach((other) => {
      if (other.name === member.name) other.photo = photoId;
    });
  });

  saveAll();
  closePhotoPicker();
  renderTeam();
}

function openPhotoPicker(sectorId, index) {
  photoPickerTarget = { sectorId, index };
  const modal = document.getElementById("photo-picker");
  const grid = document.getElementById("photo-picker-grid");
  if (!modal || !grid) return;

  const keys = [
    ...PHOTO_LIBRARY,
    ...Object.keys(customPhotos).filter((k) => !PHOTO_LIBRARY.includes(k)),
  ];

  grid.innerHTML = keys
    .map(
      (key) => `
      <button type="button" class="photo-pick" data-photo="${escapeAttr(key)}">
        <img src="${photoSrc(key)}" alt="" />
      </button>
    `
    )
    .join("");

  grid.querySelectorAll(".photo-pick").forEach((btn) => {
    btn.addEventListener("click", () => {
      setMemberPhoto(sectorId, index, btn.dataset.photo);
    });
  });

  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closePhotoPicker() {
  const modal = document.getElementById("photo-picker");
  if (modal) modal.hidden = true;
  document.body.classList.remove("modal-open");
  photoPickerTarget = null;
}

function handlePhotoUpload(file) {
  if (!file || !photoPickerTarget) return;
  const reader = new FileReader();
  reader.onload = () => {
    const id = `custom-${Date.now()}`;
    customPhotos[id] = reader.result;
    setMemberPhoto(photoPickerTarget.sectorId, photoPickerTarget.index, id);
  };
  reader.readAsDataURL(file);
}

function setEditMode(on) {
  editMode = on;
  document.body.classList.toggle("edit-mode", on);
  const toggle = document.getElementById("edit-toggle");
  const bar = document.getElementById("edit-bar");
  if (toggle) {
    toggle.textContent = on ? "Concluir edição" : "Editar time";
    toggle.setAttribute("aria-pressed", on ? "true" : "false");
  }
  if (bar) bar.hidden = !on;
  renderTeam();
}

function exportTeamData() {
  const blob = new Blob([JSON.stringify({ team: TEAM, customPhotos }, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lilas-time.json";
  a.click();
  URL.revokeObjectURL(url);
}

function resetTeamData() {
  if (!confirm("Restaurar nomes e fotos originais? Suas edições locais serão apagadas.")) return;
  localStorage.removeItem(STORAGE_TEAM);
  localStorage.removeItem(STORAGE_PHOTOS);
  TEAM = structuredClone(DEFAULT_TEAM);
  customPhotos = {};
  renderTeam();
}

function setupTabs() {
  const tabs = document.querySelectorAll(".sector-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeSector = tab.dataset.sector;

      tabs.forEach((t) => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });

      renderTeam();
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

function setupEditor() {
  const toggle = document.getElementById("edit-toggle");
  const exportBtn = document.getElementById("edit-export");
  const resetBtn = document.getElementById("edit-reset");
  const modal = document.getElementById("photo-picker");
  const closeBtn = document.getElementById("photo-picker-close");
  const upload = document.getElementById("photo-upload");

  if (toggle) toggle.addEventListener("click", () => setEditMode(!editMode));
  if (exportBtn) exportBtn.addEventListener("click", exportTeamData);
  if (resetBtn) resetBtn.addEventListener("click", resetTeamData);
  if (closeBtn) closeBtn.addEventListener("click", closePhotoPicker);
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closePhotoPicker();
    });
  }
  if (upload) {
    upload.addEventListener("change", () => {
      const file = upload.files && upload.files[0];
      handlePhotoUpload(file);
      upload.value = "";
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePhotoPicker();
  });
}

setupEditor();
setupTabs();
setupNav();
setupHeaderScroll();
renderTeam();
