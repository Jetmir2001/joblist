 // Sample employers array: add/remove items here
const EMPLOYERS = [
  {
    id: "technova",
    name: "TechNova",
    industry: "IT",
    location: "Prishtinë",
    size: "150 - 300 employees",
    logo: "webdev.jpg",
    website: "https://technova.example",
    short: "Innovative software house building web and mobile products.",
    description: "TechNova is a fast-growing software company focusing on scalable web apps, cloud services and UX-driven products. We hire front-end, back-end and devops talent.",
  },
  {
    id: "codeworks",
    name: "CodeWorks",
    industry: "IT",
    location: "Pejë",
    size: "50 - 150 employees",
    logo: "csl.jpg",
    website: "https://codeworks.example",
    short: "Fast paced development & consulting.",
    description: "CodeWorks provides custom software development and IT consulting services. We value clean code, collaboration and continuous learning.",
  },
  {
    id: "albank",
    name: "AL Bank",
    industry: "Finance",
    location: "Ferizaj",
    size: "300+ employees",
    logo: "bank.jpg",
    website: "https://albank.example",
    short: "Leading banking services in the region.",
    description: "AL Bank is focused on secure financial services, digital banking and customer-first solutions. We recruit for finance, risk, and engineering roles.",
  },
  {
    id: "healthfirst",
    name: "HealthFirst",
    industry: "Healthcare",
    location: "Prizren",
    size: "80 - 200 employees",
    logo: "troja.jpg",
    website: "",
    short: "Healthcare provider & medtech innovator.",
    description: "HealthFirst combines clinical expertise with tech to improve patient outcomes. Hiring across clinical, engineering and operations teams.",
  }
];

// Helper: get jobs from localStorage if present, else empty array
function getJobs() {
  try {
    const raw = localStorage.getItem("jobs");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Render employers into grid
function renderGrid(list) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  if (!list.length) {
    document.getElementById("noResults").classList.remove("hidden");
    return;
  }
  document.getElementById("noResults").classList.add("hidden");

  list.forEach(emp => {
    const el = document.createElement("article");
    el.className = "card employer-card";
    el.tabIndex = 0;
    el.setAttribute("data-id", emp.id);
    el.innerHTML = `
      <img class="logo" src="${emp.logo}" alt="${emp.name} logo" onerror="this.src='https://via.placeholder.com/120?text=Logo'">
      <h3>${emp.name}</h3>
      <div class="industry">${emp.industry}</div>
      <div class="location">${emp.location}</div>
      <p class="short">${emp.short}</p>
    `;
    // open modal on click
    el.addEventListener("click", () => openProfile(emp.id));
    el.addEventListener("keypress", (e) => { if (e.key === "Enter") openProfile(emp.id); });
    grid.appendChild(el);
  });
}

// Build filter options dynamically
function populateFilters(list) {
  const industrySet = new Set();
  const locationSet = new Set();
  list.forEach(e => { industrySet.add(e.industry); locationSet.add(e.location); });

  const industryFilter = document.getElementById("industryFilter");
  const locationFilter = document.getElementById("locationFilter");

  // Clear existing (except first option)
  industryFilter.querySelectorAll("option:not(:first-child)").forEach(n => n.remove());
  locationFilter.querySelectorAll("option:not(:first-child)").forEach(n => n.remove());

  Array.from(industrySet).sort().forEach(i => {
    const opt = document.createElement("option"); opt.value = i; opt.textContent = i; industryFilter.appendChild(opt);
  });
  Array.from(locationSet).sort().forEach(l => {
    const opt = document.createElement("option"); opt.value = l; opt.textContent = l; locationFilter.appendChild(opt);
  });
}

// Filtering logic
function applyFilters() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const industry = document.getElementById("industryFilter").value;
  const location = document.getElementById("locationFilter").value;

  const filtered = EMPLOYERS.filter(e => {
    const matchesQuery = !q || e.name.toLowerCase().includes(q) || e.short.toLowerCase().includes(q) || (e.description || "").toLowerCase().includes(q);
    const matchesIndustry = !industry || e.industry === industry;
    const matchesLocation = !location || e.location === location;
    return matchesQuery && matchesIndustry && matchesLocation;
  });
  renderGrid(filtered);
}

// Modal functions
function openProfile(id) {
  const emp = EMPLOYERS.find(x => x.id === id);
  if (!emp) return;
  const modal = document.getElementById("profileModal");
  document.getElementById("modalLogo").src = emp.logo;
  document.getElementById("modalLogo").alt = emp.name + " logo";
  document.getElementById("modalName").textContent = emp.name;
  document.getElementById("modalIndustry").textContent = emp.industry;
  document.getElementById("modalLocation").textContent = emp.location;
  document.getElementById("modalSize").textContent = emp.size || "";
  document.getElementById("modalDesc").textContent = emp.description || emp.short || "";
  const website = document.getElementById("modalWebsite");
  if (emp.website) { website.href = emp.website; website.classList.remove("hidden"); }
  else website.classList.add("hidden");

  // list jobs for this company (from localStorage 'jobs' if available)
  const jobs = getJobs().filter(j => (j.company || j.companyName || j.company_name || j.company) && (j.company.toLowerCase() === emp.name.toLowerCase() || (j.companyName && j.companyName.toLowerCase() === emp.name.toLowerCase())));
  const jobsList = document.getElementById("modalJobs");
  jobsList.innerHTML = "";
  if (jobs.length) {
    jobs.forEach(job => {
      const li = document.createElement("li");
      const title = job.title || job.jobTitle || job.jobTitle || "Job";
      li.innerHTML = `<div class="title">${title}</div><a class="job-link" href="detaje.html?id=0">View</a>`;
      jobsList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "No open positions listed.";
    jobsList.appendChild(li);
  }

  modal.classList.remove("hidden");
  // focus for accessibility
  document.getElementById("modalClose").focus();
}

// Close modal
function closeModal() {
  const modal = document.getElementById("profileModal");
  modal.classList.add("hidden");
}

// Setup events
document.addEventListener("DOMContentLoaded", () => {
  populateFilters(EMPLOYERS);
  renderGrid(EMPLOYERS);

  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("industryFilter").addEventListener("change", applyFilters);
  document.getElementById("locationFilter").addEventListener("change", applyFilters);

  // modal events
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("profileModal").addEventListener("click", (e) => {
    if (e.target.id === "profileModal") closeModal();
  });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
});
