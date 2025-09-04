 document.getElementById("billingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("fullName").value.trim();
  const company = document.getElementById("company").value.trim();
  const email = document.getElementById("email").value.trim();
  const card = document.getElementById("cardNumber").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  // Simple validation
  if (name === "" || company === "" || email === "" || card.length !== 16 || cvv.length !== 3) {
    alert("⚠ Please fill all fields correctly.");
    return;
  }

  // Simulate payment success
  document.getElementById("billingForm").classList.add("hidden");
  document.getElementById("successMessage").classList.remove("hidden");
});
