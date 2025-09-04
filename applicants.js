 // applicants.js - single consolidated script
document.addEventListener("DOMContentLoaded", () => {

  // ---------- Helper to try multiple possible IDs ----------
  function $id(...ids) {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) return el;
    }
    return null;
  }

  // ---------- Data: edit / extend this array ----------
  const APPLICANTS = [
    { name: "Arben Krasniqi", role: "Frontend Developer", email: "arben.k@example.com",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "Prishtinë", experienceLevel: "Mid",
      skills: ["JavaScript","React","CSS","HTML"],
      experienceText: "3 years building responsive web apps and SPAs." },

    { name: "Elira Gashi", role: "UI/UX Designer", email: "elira.g@example.com",
      photo: "wom.jpg",
      location: "Tirana", experienceLevel: "Senior",
      skills: ["Figma","Adobe XD","Illustrator","Wireframing"],
      experienceText: "Designed user-friendly interfaces for 5+ startups." },

    { name: "Leon Gashi", role: "Backend Developer", email: "milan.s@example.com",
      photo: "man.jpg",
      location: "Skopje", experienceLevel: "Junior",
      skills: ["Python","Django","SQL"],
      experienceText: "Worked on REST APIs and data modeling." },

    { name: "Leart Berisha", role: "Java Engineer", email: "leart.b@example.com",
      photo: "https://randomuser.me/api/portraits/men/15.jpg",
      location: "Prishtinë", experienceLevel: "Senior",
      skills: ["Java","Spring Boot","Microservices"],
      experienceText: "5+ years building microservices and backend systems." }
  ];

  // ---------- DOM lookups (try variants so you don't have to rename HTML instantly) ----------
  const container = $id("applicants-list","applicantsList","applicants-container","applicants-container","applicants");
  const searchInput = $id("searchBar","searchInput","search");
  const locationFilter = $id("locationFilter","filterLocation");
  const experienceFilter = $id("experienceFilter","filterExperience");
  const modal = $id("profileModal","profile-modal");
  const modalCloseBtn = $id("closeModal","close-btn","close-btn");
  const modalName = $id("modal-name","modalName");
  const modalRole = $id("modal-role","modalRole");
  const modalEmail = $id("modal-email","modalEmail");
  const modalPhoto = $id("modal-photo","modalPhoto");
  const modalSkills = $id("modal-skills","modalSkills");
  const modalExperience = $id("modal-experience","modalExperience");

  if (!container) {
    console.error("Applicants container not found. Make sure your HTML has an element with id 'applicants-list' (or 'applicantsList' / 'applicants-container').");
    return;
  }

  // ---------- Render function ----------
  function render(list) {
    container.innerHTML = "";
    if (!list.length) {
      const p = document.createElement("p");
      p.textContent = "No applicants found.";
      p.style.gridColumn = "1/-1";
      container.appendChild(p);
      return;
    }

    list.forEach((app, idx) => {
      const card = document.createElement("div");
      card.className = "applicant-card";
      card.innerHTML = `
        <img src="${app.photo}" alt="${app.name}" loading="lazy">
        <h3>${escapeHtml(app.name)}</h3>
        <p class="role">${escapeHtml(app.role)}</p>
        <p class="meta"><strong>Location:</strong> ${escapeHtml(app.location)} • <strong>Level:</strong> ${escapeHtml(app.experienceLevel)}</p>
        <div class="skills">${(app.skills||[]).slice(0,6).map(s => `<span class="skill">${escapeHtml(s)}</span>`).join("")}</div>
        <div class="actions"><button class="view-btn" data-index="${idx}">View Profile</button></div>
      `;
      container.appendChild(card);
    });
  }

  // ---------- Simple escaping helper ----------
  function escapeHtml(str){
    if (!str && str !== 0) return "";
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  // ---------- Filter logic ----------
  function applyFilters() {
    const q = (searchInput && searchInput.value || "").trim().toLowerCase();
    const loc = (locationFilter && locationFilter.value) || "";
    const exp = (experienceFilter && experienceFilter.value) || "";

    const filtered = APPLICANTS.filter(a => {
      const matchesQuery = !q ||
        a.name.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        (a.skills && a.skills.join(" ").toLowerCase().includes(q)) ||
        (a.experienceText && a.experienceText.toLowerCase().includes(q));

      const matchesLoc = !loc || (a.location && a.location === loc);
      const matchesExp = !exp || (a.experienceLevel && a.experienceLevel === exp);

      return matchesQuery && matchesLoc && matchesExp;
    });

    render(filtered);
  }

  // ---------- Populate filter selects if present ----------
  if (locationFilter) {
    const locations = Array.from(new Set(APPLICANTS.map(a => a.location).filter(Boolean))).sort();
    locations.forEach(loc => {
      const opt = document.createElement("option");
      opt.value = loc; opt.textContent = loc;
      locationFilter.appendChild(opt);
    });
  }

  if (experienceFilter) {
    const levels = Array.from(new Set(APPLICANTS.map(a => a.experienceLevel).filter(Boolean))).sort();
    levels.forEach(l => {
      const opt = document.createElement("option");
      opt.value = l; opt.textContent = l;
      experienceFilter.appendChild(opt);
    });
  }

  // ---------- Event handlers ----------
  // Search / filters
  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (locationFilter) locationFilter.addEventListener("change", applyFilters);
  if (experienceFilter) experienceFilter.addEventListener("change", applyFilters);

  // Delegated click for view buttons
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-btn");
    if (!btn) return;
    const idx = Number(btn.dataset.index);
    if (Number.isFinite(idx) && APPLICANTS[idx]) {
      openModal(APPLICANTS[idx]);
    }
  });

  // ---------- Modal open/close ----------
  function openModal(applicant) {
    if (!modal) { console.warn("Modal element not found."); return; }
    if (modalPhoto) modalPhoto.src = applicant.photo || "";
    if (modalName) modalName.textContent = applicant.name || "";
    if (modalRole) modalRole.textContent = applicant.role || "";
    if (modalEmail) modalEmail.textContent = applicant.email || "";
    if (modalExperience) modalExperience.textContent = applicant.experienceText || "";
    if (modalSkills) {
      modalSkills.innerHTML = "";
      (applicant.skills || []).forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        modalSkills.appendChild(li);
      });
    }
    modal.classList.remove("hidden");
    // focus for accessibility
    (modalCloseBtn || modal).focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add("hidden");
  }

  // click outside modal or press Esc to close
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

  // ---------- Initial render ----------
  render(APPLICANTS);
});
