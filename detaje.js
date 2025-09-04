 // Read job index from URL
const params = new URLSearchParams(window.location.search);
const jobIndex = params.get("id");

const jobDetailsContainer = document.getElementById("job-details");

if (jobIndex !== null && jobs[jobIndex]) {
  const job = jobs[jobIndex];

  jobDetailsContainer.innerHTML = `
    <div class="job-details-card">
      <img src="${job.logo}" alt="${job.company} Logo" class="job-logo-large">
      <h2>${job.title}</h2>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Type:</strong> ${job.type}</p>
      <p><strong>Salary:</strong> ${job.salary || 'N/A'}</p>
      <p><strong>Experience:</strong> ${job.experience || 'N/A'}</p>
      <p><strong>Posted:</strong> ${job.date}</p>
      <h3>Description</h3>
      <p>${job.description}</p>
      <h3>Responsibilities</h3>
      <ul>
        ${job.responsibilities.map(item => `<li>${item}</li>`).join("")}
      </ul>
      <h3>Requirements</h3>
      <ul>
        ${job.requirements.map(item => `<li>${item}</li>`).join("")}
      </ul>
      <h3>Team</h3>
      <p>${job.team}</p>



            <button id="apply-btn" class="btn-apply">Apply for this Job</button>

            <div class="share-job">
      <p><strong>Share this job:</strong></p>
     <a href="https://www.facebook.com/" target="_blank" class="share-icon fb">
    <i class="fab fa-facebook-f"></i>
  </a>

  <a href="https://twitter.com/" target="_blank" class="share-icon tw">
    <i class="fab fa-twitter"></i>
  </a>

  <a href="https://www.linkedin.com/" target="_blank" class="share-icon li">
    <i class="fab fa-linkedin-in"></i>
  </a>

  <a href="https://www.instagram.com/" target="_blank" class="share-icon ig">
    <i class="fab fa-instagram"></i>
  </a>

    </div>

    </div>
  `;





} else {
  jobDetailsContainer.innerHTML = "<p>Job not found.</p>";
}
  const applyMessage = document.getElementById("apply-message");









const applyBtn = document.getElementById("apply-btn");


applyBtn.addEventListener("click", () => {
  // Prevent adding multiple forms if clicked again
  if (document.getElementById("apply-form")) return;

  const formHTML = `
    <form id="apply-form" class="apply-form">
      <h3>Submit Your Application</h3>
      <label for="applicant-name">Full Name</label>
      <input type="text" id="applicant-name" required>

      <label for="applicant-email">Email</label>
      <input type="email" id="applicant-email" required>

      <label for="applicant-cv">Upload CV (PDF/DOCX)</label>
      <input type="file" id="applicant-cv" accept=".pdf,.doc,.docx" required>

      <label for="cover-letter">Cover Letter / Message (optional)</label>
      <textarea id="cover-letter" rows="4"></textarea>

      <button type="submit">Submit Application</button>
    </form>
    <p id="apply-message" class="success-message"></p>
  `;

  jobDetailsContainer.insertAdjacentHTML("beforeend", formHTML);


  //scroll down

  setTimeout(() => {
    const applyForm = document.getElementById("apply-form");
    applyForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100); // small delay ensures form exists



  const applyForm = document.getElementById("apply-form");
  const applyMessage = document.getElementById("apply-message");

  // Check if already applied
  const applications = JSON.parse(localStorage.getItem("applications")) || [];
  const alreadyApplied = applications.some(app => app.jobIndex == jobIndex);
  if (alreadyApplied) {
    applyForm.innerHTML = "<p>You have already applied for this job.</p>";
    return;
  }

  // Handle form submission
  applyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("applicant-name").value;
    const email = document.getElementById("applicant-email").value;
    const cv = document.getElementById("applicant-cv").files[0];
    const cover = document.getElementById("cover-letter").value;

    if (!cv) {
      alert("Please upload your CV.");
      return;
    }

    // Save application in localStorage
    applications.push({
      jobIndex: jobIndex,
      name: name,
      email: email,
      cvName: cv.name,
      coverLetter: cover,
      date: new Date().toISOString()
    });

    localStorage.setItem("applications", JSON.stringify(applications));

    applyMessage.textContent = "Application submitted successfully!";
    applyForm.querySelectorAll("input, textarea, button").forEach(el => el.disabled = true);
  });
});