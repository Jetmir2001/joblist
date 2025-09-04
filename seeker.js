 document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeForm");
  const previewDiv = document.getElementById("resumePreview");
  const previewContent = document.getElementById("previewContent");
  const downloadBtn = document.getElementById("downloadBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const skills = document.getElementById("skills").value;
    const experience = document.getElementById("experience").value;
    const education = document.getElementById("education").value;

    // Generate resume HTML
    const resumeHTML = `
      <div class="resume">
        <h3>${fullName}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h4>Skills</h4>
        <p>${skills}</p>
        <h4>Experience</h4>
        <p>${experience}</p>
        <h4>Education</h4>
        <p>${education}</p>
      </div>
    `;

    previewContent.innerHTML = resumeHTML;

    // Show preview container
    previewDiv.style.display = "block";

    // Scroll to preview
    previewDiv.scrollIntoView({ behavior: "smooth" });
  });

  // Download PDF
  downloadBtn.addEventListener("click", () => {
    html2pdf().from(previewContent).save("My_Resume.pdf");
  });
});
