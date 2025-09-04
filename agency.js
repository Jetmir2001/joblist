 // ================================
// AGENCY.JS - CLEAN VERSION
// ================================
document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------
  // 1. JOB SEARCH & FILTER
  // ------------------------------
  const keywordInput = document.getElementById("search-keyword");
  const locationInput = document.getElementById("search-location");
  const typeSelect = document.getElementById("search-type");
  const experienceSelect = document.getElementById("search-experience");
  const searchBtn = document.getElementById("search-btn");
  const clearBtn = document.getElementById("clear-btn");
  const categoryButtons = document.querySelectorAll(".categories button");
  const jobCards = document.querySelectorAll(".job-card");
  const noResults = document.getElementById("no-results");

  let selectedCategory = "";

  function filterJobs() {
    const keyword = keywordInput.value.toLowerCase();
    const location = locationInput.value.toLowerCase();
    const type = typeSelect.value;
    const experience = experienceSelect.value;

    let visibleCount = 0;

    jobCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const company = card.querySelector("p strong")?.parentNode.textContent.toLowerCase() || "";
      const jobLocation = card.dataset.location.toLowerCase();
      const category = card.dataset.category;
      const jobType = card.dataset.type;
      const jobExperience = card.dataset.experience || "";

      const matchesKeyword = !keyword || title.includes(keyword) || company.includes(keyword);
      const matchesLocation = !location || jobLocation.includes(location);
      const matchesCategory = !selectedCategory || category === selectedCategory;
      const matchesType = !type || jobType === type;
      const matchesExperience = !experience || jobExperience === experience;

      if (matchesKeyword && matchesLocation && matchesCategory && matchesType && matchesExperience) {
        card.style.display = "block";
        card.classList.add("fade-in");
        visibleCount++;
      } else {
        card.style.display = "none";
        card.classList.remove("fade-in");
      }
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }

  searchBtn?.addEventListener("click", filterJobs);

  clearBtn?.addEventListener("click", () => {
    keywordInput.value = "";
    locationInput.value = "";
    typeSelect.value = "";
    experienceSelect.value = "";
    selectedCategory = "";
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    jobCards.forEach(card => {
      card.style.display = "block";
      card.classList.add("fade-in");
    });
    noResults.style.display = "none";
  });

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCategory = btn.dataset.category;
      filterJobs();
    });
  });

  // Show all jobs initially
  jobCards.forEach(card => card.style.display = "block");


  // ------------------------------
  // 2. JOB CARD NAVIGATION
  // ------------------------------
  jobCards.forEach((card, index) => {
    const btn = card.querySelector(".btn1");
    if (btn) {
      btn.addEventListener("click", () => {
        window.location.href = `detaje.html?id=${index}`;
      });
    }
  });


  // ------------------------------
  // 3. DYNAMIC USER ICON (if logged in)
  // ------------------------------
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const userInfoDiv = document.getElementById("user-info");

  if (loggedInUser && userInfoDiv) {
    const icon = document.createElement("div");
    icon.className = "user-icon";
    icon.textContent = loggedInUser.name[0].toUpperCase();

    const info = document.createElement("div");
    info.className = "user-hover-info";
    info.innerHTML = `
      <p><strong>${loggedInUser.name}</strong></p>
      <p>${loggedInUser.email}</p>
      <p>Role: ${loggedInUser.role}</p>
      <button id="logout-btn">Logout</button>
    `;

    userInfoDiv.appendChild(icon);
    userInfoDiv.appendChild(info);

    icon.addEventListener("mouseenter", () => info.style.display = "block");
    icon.addEventListener("mouseleave", () => info.style.display = "none");
    info.addEventListener("mouseenter", () => info.style.display = "block");
    info.addEventListener("mouseleave", () => info.style.display = "none");

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.reload();
    });
  }


  // ------------------------------
  // 4. RESPONSIVE NAVBAR TOGGLE
  // ------------------------------
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");

  hamburger?.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });

});



//account info

document.addEventListener("DOMContentLoaded", () => {
  const accountIcon = document.getElementById("account-icon");
  const accountCard = document.getElementById("account-card");
  const logoutBtn = document.getElementById("logout-btn");

  // Toggle account card on icon click
  accountIcon.addEventListener("click", () => {
    accountCard.classList.toggle("show");
    accountCard.classList.toggle("hidden");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!accountIcon.contains(e.target) && !accountCard.contains(e.target)) {
      accountCard.classList.add("hidden");
      accountCard.classList.remove("show");
    }
  });

  // Logout button functionality
  logoutBtn.addEventListener("click", () => {
    alert("Logged out!");
    // redirect or clear sessionStorage if you’re using it
    sessionStorage.clear();
    window.location.href = "signup.html";
  });

  // Fill user info dynamically if saved in sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    document.getElementById("acc-name").textContent = user.name || "John Doe";
    document.getElementById("acc-email").textContent = user.email || "john@example.com";
    document.getElementById("acc-role").textContent = user.role || "Job Seeker";
    document.getElementById("account-icon").textContent = user.name ? user.name[0].toUpperCase() : "J";
  }
});




//bookmark
