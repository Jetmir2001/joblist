 document.addEventListener("DOMContentLoaded", function(){

  const signupForm = document.getElementById("signup-form");
  const signinForm = document.getElementById("signin-form");

  const showLogin = document.getElementById("show-login");
  const showSignup = document.getElementById("show-signup");

  // Switch forms
  showLogin.addEventListener("click", () => {
    signupForm.classList.add("hidden");
    signinForm.classList.remove("hidden");
  });
  showSignup.addEventListener("click", () => {
    signinForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  });

  // Sign Up
  signupForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    const role = document.querySelector('input[name="role"]:checked').value;

    if(password !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if(users.some(u => u.email === email)){
      alert("Email already exists!");
      return;
    }

    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    window.location.href = "agency.html";
  });

  // Sign In
  signinForm.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if(user){
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "agency.html";
    } else {
      alert("Invalid email or password!");
    }
  });

});
