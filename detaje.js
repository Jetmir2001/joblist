 const jobs = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Prishtinë",
    type: "Remote",
    salary: "€1200 - €1500/month",
    experience: "2+ years",
    date: "2 days ago",
    description: "Develop and maintain user-facing features for our web applications using HTML, CSS, and JavaScript.",
    responsibilities: [
      "Implement responsive web designs and ensure cross-browser compatibility.",
      "Collaborate with UX/UI designers to improve usability.",
      "Optimize web applications for speed and scalability.",
      "Work with backend developers to integrate APIs."
    ],
    requirements: [
      "Strong knowledge of HTML, CSS, and JavaScript.",
      "Experience with React or Vue.js is a plus.",
      "Good problem-solving skills and attention to detail.",
      "Ability to work in a remote team."
    ],
    team: "You will be part of a dynamic frontend team, collaborating with designers and backend engineers in an agile environment.",
    logo: "webdev.jpg"
  },
  {
    title: "Backend Developer",
    company: "CodeWorks",
    location: "Prizren",
    type: "Full-time",
    salary: "€1300 - €1600/month",
    experience: "3+ years",
    date: "1 week ago",
    description: "Design and implement server-side logic, database structures, and APIs to support web applications.",
    responsibilities: [
      "Develop RESTful APIs and microservices.",
      "Ensure performance, security, and scalability of applications.",
      "Collaborate with frontend developers to integrate APIs.",
      "Maintain and optimize database queries and structures."
    ],
    requirements: [
      "Strong knowledge of Node.js, Python, or PHP.",
      "Experience with SQL and NoSQL databases.",
      "Familiarity with cloud services like AWS or Azure.",
      "Ability to troubleshoot and debug complex issues."
    ],
    team: "You will work with a backend-focused team, interacting closely with frontend developers and DevOps engineers."
  },
  {
    id: 3,
    title: "Team Member",
    company: "Burger King",
    location: "Gjakove",
    type: "Full-time",
    salary: "€800 - €1000/month",
    experience: "1+ years",
    date: "1 week ago",
    description: "Assist in daily restaurant operations and customer service.",
    responsibilities: [
      "Serve customers efficiently",
      "Maintain cleanliness",
      "Follow safety guidelines"
    ],
    requirements: [
      "Friendly and outgoing",
      "Team player",
      "Previous experience a plus"
    ],
    team: "You will work with a fast-paced hospitality team.",
    logo: "bg.jpg"
  },
  {
    id: 4,
    title: "Waiter",
    company: "Troja",
    location: "Prishtine",
    type: "Full-time",
    salary: "€850 - €1100/month",
    experience: "1+ years",
    date: "1 week ago",
    description: "Provide excellent service to restaurant customers.",
    responsibilities: [
      "Take orders accurately",
      "Serve food and drinks",
      "Assist with setup and cleanup"
    ],
    requirements: [
      "Good communication skills",
      "Hospitality experience preferred"
    ],
    team: "Join our friendly dining team.",
    logo: "restaurant.jpg"
  },
  {
    id: 5,
    title: "Sales Person",
    company: "CodeWorks",
    location: "Peja",
    type: "Full-time",
    salary: "€1200 - €1500/month",
    experience: "2+ years",
    date: "1 week ago",
    description: "Drive sales and maintain client relationships.",
    responsibilities: [
      "Contact potential clients",
      "Manage sales pipeline",
      "Achieve monthly targets"
    ],
    requirements: [
      "Strong communication",
      "Experience in sales"
    ],
    team: "Part of our dynamic sales department.",
    logo: "hr.jpg"
  },
  {
    id: 6,
    title: "Mechanic",
    company: "Auto Repair",
    location: "Prishtine",
    type: "Full-time",
    salary: "€900 - €1200/month",
    experience: "3+ years",
    date: "1 week ago",
    description: "Repair and maintain vehicles in a busy workshop.",
    responsibilities: [
      "Diagnose vehicle issues",
      "Perform repairs and maintenance",
      "Ensure safety standards"
    ],
    requirements: [
      "Experience with car repairs",
      "Technical skills and attention to detail"
    ],
    team: "Work with a skilled automotive team.",
    logo: "ash.jpg"
  },
  {
    id: 7,
    title: "Construction Worker",
    company: "BuiltA",
    location: "Gjilan",
    type: "Full-time",
    salary: "€1000 - €1300/month",
    experience: "2+ years",
    date: "1 week ago",
    description: "Perform construction tasks and site maintenance.",
    responsibilities: [
      "Assist in building projects",
      "Operate machinery",
      "Follow safety regulations"
    ],
    requirements: [
      "Construction experience preferred",
      "Physical fitness"
    ],
    team: "Join our construction team working on local projects.",
    logo: "csc.jpg"
  },
  {
    id: 8,
    title: "Accountant",
    company: "AL Bank",
    location: "Ferizaj",
    type: "Full-time",
    salary: "€1100 - €1400/month",
    experience: "3+ years",
    date: "1 week ago",
    description: "Manage financial records and prepare reports.",
    responsibilities: [
      "Bookkeeping and reconciliation",
      "Prepare financial statements",
      "Ensure compliance with regulations"
    ],
    requirements: [
      "Accounting degree",
      "Experience with financial software"
    ],
    team: "Work within the bank’s finance department.",
    logo: "bank.jpg"
  },
  {
    id: 9,
    title: "Graphic Designer",
    company: "GD",
    location: "Prishtine",
    type: "Full-time",
    salary: "€1000 - €1300/month",
    experience: "2+ years",
    date: "1 week ago",
    description: "Design visuals and creative content for clients.",
    responsibilities: [
      "Create graphics and layouts",
      "Work with marketing teams",
      "Ensure brand consistency"
    ],
    requirements: [
      "Proficiency in Adobe Suite",
      "Creative mindset"
    ],
    team: "Collaborate with other designers in the creative team.",
    logo: "creat.jpg"
  },
  {
    id: 10,
    title: "Cyber Security Analyst",
    company: "CodeWorks",
    location: "Peja",
    type: "Full-time",
    salary: "€1200 - €1500/month",
    experience: "2+ years",
    date: "1 week ago",
    description: "Monitor and protect company systems from threats.",
    responsibilities: [
      "Conduct security audits",
      "Investigate breaches",
      "Implement security protocols"
    ],
    requirements: [
      "Knowledge of cybersecurity tools",
      "Analytical mindset"
    ],
    team: "Work with IT and security teams to protect data.",
    logo: "csl.jpg"
  },
  
];



// ================================
// DETAJE.JS - FULLY WORKING VERSION
// ================================

document.addEventListener("DOMContentLoaded", () => {

  const jobDetailsContainer = document.getElementById("job-details");


  let selectedJob = JSON.parse(sessionStorage.getItem("selectedJob"));


  // ✅ Server fallback: if no job found in sessionStorage, fetch by ID from backend
if (!selectedJob) {
  const jobId = new URLSearchParams(window.location.search).get("id");
  if (jobId) {
    fetch(`http://localhost:4000/api/jobs/${jobId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          selectedJob = data;
          jobDetailsContainer.innerHTML = `
            <div class="job-details-card">
              <h2>${selectedJob.title}</h2>
              <p><strong>Company:</strong> ${selectedJob.company}</p>
              <p><strong>Location:</strong> ${selectedJob.location}</p>
              <p><strong>Type:</strong> ${selectedJob.type}</p>
              <p><strong>Category:</strong> ${selectedJob.category}</p>
              <p><strong>Description:</strong> ${selectedJob.details}</p>
            </div>
          `;
        }
      })
      .catch(err => console.warn("Server not reachable, no job details", err));
  }
}






  // 1. Get job from sessionStorage (Apply Now click)
  let job = JSON.parse(sessionStorage.getItem("selectedJob"));

  // 2. If no job in sessionStorage, check URL id for default/posted jobs
  if (!job) {
    const params = new URLSearchParams(window.location.search);
    const jobIndex = params.get("id");
    const jobs = JSON.parse(localStorage.getItem("jobs")) || []; // all jobs
    if (jobIndex != null && jobs[jobIndex]) {
      job = jobs[jobIndex];
    }
  }




  // 3. If still no job, show error
  if (!job) {
    jobDetailsContainer.innerHTML = "<p>Job not found.</p>";
    return;
  }

  // 4. Render job details
  jobDetailsContainer.innerHTML = `
    <div class="job-details-card">
      <div class="left-column">
        ${job.logo ? `<img src="${job.logo}" alt="${job.company} Logo" class="job-logo-large">` : ''}
        <h2>${job.title}</h2>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Type:</strong> ${job.type}</p>
        <p><strong>Salary:</strong> ${job.salary || 'N/A'}</p>
        <p><strong>Experience:</strong> ${job.experience || 'N/A'}</p>
        <p><strong>Posted:</strong> ${job.date || 'N/A'}</p>
        <h3>Description</h3>
        <p>${job.description || 'No description provided.'}</p>
      </div>

      <div class="right-column">
        <h3>Responsibilities</h3>
        <ul>${job.responsibilities ? job.responsibilities.map(r => `<li>${r}</li>`).join('') : '<li>N/A</li>'}</ul>

        <h3>Requirements</h3>
        <ul>${job.requirements ? job.requirements.map(r => `<li>${r}</li>`).join('') : '<li>N/A</li>'}</ul>

        <h3>Team</h3>
        <p>${job.team || 'N/A'}</p>

        <button id="apply-btn" class="btn-apply">Apply for this Job</button>

        <div class="share-job">
          <p><strong>Share this job:</strong></p>
          <a href="https://www.facebook.com/" target="_blank" class="share-icon fb"><i class="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com/" target="_blank" class="share-icon tw"><i class="fab fa-twitter"></i></a>
          <a href="https://www.linkedin.com/" target="_blank" class="share-icon li"><i class="fab fa-linkedin-in"></i></a>
          <a href="https://www.instagram.com/" target="_blank" class="share-icon ig"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  `;

  // 5. Apply form logic
  const applyBtn = document.getElementById("apply-btn");

  applyBtn.addEventListener("click", () => {
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

    setTimeout(() => {
      document.getElementById("apply-form").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    const applyForm = document.getElementById("apply-form");
    const applyMessage = document.getElementById("apply-message");

    // Get saved applications or empty array
    const applications = JSON.parse(localStorage.getItem("applications")) || [];

    // Prevent multiple applications for the same job
    if (applications.some(app => app.jobTitle === job.title && app.jobCompany === job.company)) {
      applyForm.innerHTML = "<p>You have already applied for this job.</p>";
      return;
    }

    applyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("applicant-name").value;
      const email = document.getElementById("applicant-email").value;
      const cv = document.getElementById("applicant-cv").files[0];
      const cover = document.getElementById("cover-letter").value;

      if (!cv) { alert("Please upload your CV."); return; }

      applications.push({
        jobTitle: job.title,
        jobCompany: job.company,
        name,
        email,
        cvName: cv.name,
        coverLetter: cover,
        date: new Date().toISOString()
      });
      localStorage.setItem("applications", JSON.stringify(applications));

      applyMessage.textContent = "Application submitted successfully!";
      applyForm.querySelectorAll("input, textarea, button").forEach(el => el.disabled = true);
    });
  });

});
