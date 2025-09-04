 document.addEventListener("DOMContentLoaded", () => {
  const jobsTableBody = document.getElementById("jobsTableBody");
  const totalJobsEl = document.getElementById("totalJobs");
  const totalViewsEl = document.getElementById("totalViews");
  const totalApplicationsEl = document.getElementById("totalApplications");

  const modal = document.getElementById("editJobModal");
  const closeModal = document.getElementById("closeModal");
  const editForm = document.getElementById("editJobForm");
  let editingJobIndex = null;

  // Load jobs from localStorage
  let jobs = JSON.parse(localStorage.getItem("publishedJobs")) || [];

  function updateDashboard() {
    jobsTableBody.innerHTML = "";
    let totalViews = 0, totalApplications = 0;

    jobs.forEach((job, index) => {
      totalViews += job.views || 0;
      totalApplications += job.applications || 0;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${job.title}</td>
        <td>${job.location}</td>
        <td>${job.plan || 'Basic'}</td>
        <td>${job.views || 0}</td>
        <td>${job.applications || 0}</td>
        <td>
          <button onclick="editJob(${index})">Edit</button>
          <button onclick="deleteJob(${index})">Delete</button>
        </td>
      `;
      jobsTableBody.appendChild(row);
    });

    totalJobsEl.textContent = jobs.length;
    totalViewsEl.textContent = totalViews;
    totalApplicationsEl.textContent = totalApplications;
  }

  // Edit Job
  window.editJob = (index) => {
    editingJobIndex = index;
    const job = jobs[index];
    document.getElementById("editTitle").value = job.title;
    document.getElementById("editLocation").value = job.location;
    document.getElementById("editDescription").value = job.description;
    modal.classList.remove("hidden");
  };

  // Save changes
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    jobs[editingJobIndex].title = document.getElementById("editTitle").value;
    jobs[editingJobIndex].location = document.getElementById("editLocation").value;
    jobs[editingJobIndex].description = document.getElementById("editDescription").value;

    localStorage.setItem("publishedJobs", JSON.stringify(jobs));
    modal.classList.add("hidden");
    updateDashboard();
  });

  // Delete job
  window.deleteJob = (index) => {
    if(confirm("Are you sure you want to delete this job?")) {
      jobs.splice(index, 1);
      localStorage.setItem("publishedJobs", JSON.stringify(jobs));
      updateDashboard();
    }
  };

  // Close modal
  closeModal.addEventListener("click", () => modal.classList.add("hidden"));

  // Logout
 // Post Job button
const postJobBtn = document.getElementById("postJobBtn");
postJobBtn.addEventListener("click", () => {
  window.location.href = "post-job.html";
});


  updateDashboard();
});
