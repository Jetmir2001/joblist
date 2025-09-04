 // Lightweight, self-contained client-side logic
document.addEventListener("DOMContentLoaded", () => {

  // Elements
  const jobForm = document.getElementById("job-form");
  const preview = {
    title: document.getElementById("pv-title"),
    company: document.getElementById("pv-company"),
    location: document.getElementById("pv-location"),
    type: document.getElementById("pv-type"),
    salary: document.getElementById("pv-salary"),
    desc: document.getElementById("pv-desc"),
    exp: document.getElementById("pv-exp"),
    apply: document.getElementById("pv-apply")
  };
  const previewBox = document.getElementById("preview");
  const previewBtn = document.getElementById("preview-btn");
  const publishBtn = document.getElementById("publish-btn");
  const checkoutCard = document.getElementById("checkout-card");
  const coPlan = document.getElementById("co-plan");
  const coAmount = document.getElementById("co-amount");
  const payBtn = document.getElementById("pay-btn");
  const cancelPay = document.getElementById("cancel-pay");
  const messageBox = document.getElementById("message");

  const resetMessage = () => {
    messageBox.className = "message hidden";
    messageBox.innerHTML = "";
  };

  // Read values from form fields
  function readForm() {
    return {
      title: document.getElementById("job-title").value.trim(),
      company: document.getElementById("company-name").value.trim(),
      location: document.getElementById("job-location").value.trim(),
      type: document.getElementById("job-type").value,
      experience: document.getElementById("job-exp").value,
      salary: document.getElementById("job-salary").value.trim(),
      applyTo: document.getElementById("apply-to").value.trim(),
      description: document.getElementById("job-desc").value.trim(),
      plan: (document.querySelector('input[name="plan"]:checked') || {}).value || "basic"
    };
  }

  // Update preview UI
  function updatePreview() {
    const data = readForm();
    preview.title.textContent = data.title || "Job Title";
    preview.company.textContent = data.company || "Company Name";
    preview.location.textContent = data.location || "Location";
    preview.type.textContent = data.type || "Type";
    preview.salary.textContent = data.salary || "Salary not specified";
    preview.desc.textContent = data.description || "Job description will appear here.";
    preview.exp.textContent = data.experience || "N/A";
    preview.apply.textContent = data.applyTo || "Apply link / email";
  }

  // Save job to localStorage (array)
  function saveJob(jobObj) {
    const jobs = JSON.parse(localStorage.getItem("postedJobs") || "[]");
    jobs.push(jobObj);
    localStorage.setItem("postedJobs", JSON.stringify(jobs));
  }

  // Basic validation
  function validate(data){
    if(!data.title) return "Please enter a job title.";
    if(!data.company) return "Please enter company name.";
    if(!data.applyTo) return "Please provide application link or email.";
    if(!data.description) return "Please add a job description.";
    return null;
  }

  // Compute price from plan
  function planPrice(plan){
    if(plan === "basic") return 0;
    if(plan === "premium") return 49;
    if(plan === "enterprise") return 129;
    return 0;
  }

  // Wire up input -> preview live
  ["job-title","company-name","job-location","job-type","job-salary","job-desc","job-exp","apply-to"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.addEventListener("input", updatePreview);
  });

  // Preview button
  previewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    updatePreview();
    window.scrollTo({ top: 0, behavior: "smooth" });
    resetMessage();
    messageBox.className = "message";
    messageBox.textContent = "Preview updated.";
    setTimeout(resetMessage, 1500);
  });

  // Publish click
  publishBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resetMessage();

    const data = readForm();
    const err = validate(data);
    if(err){
      messageBox.className = "message error";
      messageBox.textContent = err;
      return;
    }

    const price = planPrice(data.plan);
    if(price === 0){
      // Free posting -> save immediately
      saveJob({
        ...data,
        publishedAt: new Date().toISOString(),
        paid: false
      });
      messageBox.className = "message success";
      messageBox.textContent = "✅ Job posted successfully (Basic - free).";
      // Optionally clear form
      jobForm.reset();
      updatePreview();
      return;
    }

    // Paid: show checkout card
    checkoutCard.classList.remove("hidden");
    coPlan.textContent = data.plan.charAt(0).toUpperCase() + data.plan.slice(1);
    coAmount.textContent = `€${price}`;
    // scroll to checkout
    checkoutCard.scrollIntoView({behavior:"smooth",block:"center"});
  });

  // Cancel payment
  cancelPay.addEventListener("click", () => {
    checkoutCard.classList.add("hidden");
  });

  // Simulate payment flow
  payBtn.addEventListener("click", () => {
    // Minimal client-side validation of card fields (demo only)
    const cardName = document.getElementById("card-name").value.trim();
    const cardNum = document.getElementById("card-number").value.replace(/\s+/g,"");
    const cardExp = document.getElementById("card-exp").value.trim();
    const cardCvc = document.getElementById("card-cvc").value.trim();

    if(!cardName || cardNum.length < 12 || cardCvc.length < 3 || cardExp.length < 3) {
      messageBox.className = "message error";
      messageBox.textContent = "Please fill valid payment details (demo validation).";
      return;
    }

    // simulate processing
    payBtn.disabled = true;
    payBtn.textContent = "Processing…";

    setTimeout(() => {
      // After "payment", save job with paid:true
      const data = readForm();
      const price = planPrice(data.plan);
      saveJob({
        ...data,
        publishedAt: new Date().toISOString(),
        paid: true,
        amount: price
      });

      // success UI
      checkoutCard.classList.add("hidden");
      messageBox.className = "message success";
      messageBox.textContent = `✅ Payment successful. Job posted under ${data.plan} plan.`;
      // reset
      document.getElementById("payment-form").reset();
      document.getElementById("card-name").value = "";
      document.getElementById("card-number").value = "";
      document.getElementById("card-exp").value = "";
      document.getElementById("card-cvc").value = "";
      payBtn.disabled = false;
      payBtn.textContent = "Pay & Publish";
      jobForm.reset();
      updatePreview();
    }, 1100);
  });

  // Initialize preview on load
  updatePreview();
});


const btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    window.location.href = "agency.html";
  });