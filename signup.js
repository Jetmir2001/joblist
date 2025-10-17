 document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
  // DOM ELEMENTS
  // ------------------------------
  const signupForm = document.getElementById("signup-form");
  const signinForm = document.getElementById("signin-form");
  const resetForm = document.getElementById("reset-form");

  const showLogin = document.getElementById("show-login");
  const showSignup = document.getElementById("show-signup");
  const forgotPassword = document.getElementById("forgot-password");
  const backToLogin = document.getElementById("back-to-login");

  // ------------------------------
  // LOCAL STORAGE HELPERS
  // ------------------------------
  const getLocalUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveLocalUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const syncUserToLocal = (user) => {
    const users = getLocalUsers();
    if (!users.find((u) => u.email === user.email)) {
      users.push(user);
      saveLocalUsers(users);
    }
  };

  // ------------------------------
  // GENERAL HELPERS
  // ------------------------------
  const toggleForms = (showForm, hideForm) => {
    hideForm.classList.add("hidden");
    showForm.classList.remove("hidden");
  };

  const handleFormError = (message) => alert(message);

  const saveUserAndRedirect = (user, redirectUrl = "agency.html") => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = redirectUrl;
  };

  const postData = async (url, payload) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
  };




  // ------------------------------
  // FORM TOGGLING
  // ------------------------------
  showLogin?.addEventListener("click", () => toggleForms(signinForm, signupForm));
  showSignup?.addEventListener("click", () => toggleForms(signupForm, signinForm));
  forgotPassword?.addEventListener("click", () => toggleForms(resetForm, signinForm));
  backToLogin?.addEventListener("click", () => toggleForms(signinForm, resetForm));

  // ------------------------------
  // SIGN UP
  // ------------------------------
  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    const role = document.querySelector('input[name="role"]:checked')?.value;

if (!role) return handleFormError("Please select a role."); if (password !== confirmPassword) return handleFormError("Passwords do not match!");
   

    const newUser = { id: Date.now(), name, email, password, role, verified: true };

    try {
      // Try server registration
      const data = await postData("http://localhost:4000/api/register", { name, email, password, role });

      syncUserToLocal(newUser); // also save online user locally
      alert(data.message + " Verify your email before logging in.");
      toggleForms(signinForm, signupForm);
    } catch (err) {
      // Offline fallback
      const users = getLocalUsers();
      if (users.find((u) => u.email === email)) return handleFormError("Email already exists (offline)");

      users.push(newUser);
      saveLocalUsers(users);

      alert("Offline: Registration saved locally. You can sign in now.");
      toggleForms(signinForm, signupForm);
    }
  });

  // ------------------------------
  // SIGN IN
  // ------------------------------
  signinForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value;

    try {
      const data = await postData("http://localhost:4000/api/login", { email, password });
      syncUserToLocal(data.user);
      saveUserAndRedirect(data.user);
    } catch (err) {
      // Offline fallback
      const users = getLocalUsers();
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) return handleFormError("Login failed (offline)");
      saveUserAndRedirect(user);
    }
  });

  // ------------------------------
  // PASSWORD RESET
  // ------------------------------
  resetForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("reset-email").value.trim();
    const newPassword = document.getElementById("reset-new-password").value;

    if (!email || !newPassword) return handleFormError("Email and new password are required.");

    try {
      const { resetToken } = await postData("http://localhost:4000/api/request-reset", { email });
      await postData("http://localhost:4000/api/reset-password", { email, token: resetToken, newPassword });

      // Update local storage too
      const users = getLocalUsers();
      const user = users.find((u) => u.email === email);
      if (user) {
        user.password = newPassword;
        saveLocalUsers(users);
      }

      alert("Password reset successful. You can now log in.");
      toggleForms(signinForm, resetForm);
    } catch (err) {
      // Offline fallback
      const users = getLocalUsers();
      const user = users.find((u) => u.email === email);
      if (!user) return handleFormError("User not found (offline)");

      user.password = newPassword;
      saveLocalUsers(users);

      alert("Offline: Password reset saved locally. You can now log in.");
      toggleForms(signinForm, resetForm);
    }
  });
});
