 document.addEventListener("DOMContentLoaded", function() {

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navContainer = document.querySelector('.nav-container');

  menuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('active');
  });

  // Contact Form
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if(!name || !email || !message){
      formMessage.style.color = "red";
      formMessage.textContent = "⚠️ Please fill in all fields.";
      return;
    }

    if(!validateEmail(email)){
      formMessage.style.color = "red";
      formMessage.textContent = "⚠️ Please enter a valid email.";
      return;
    }

    // Success
    formMessage.style.color = "green";
    formMessage.textContent = "✅ Thank you! We'll get back to you shortly.";
    contactForm.reset();
  });

  function validateEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

});



// Testimonials carousel
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
}

// Auto slide every 5 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
}, 5000);



//direct to card page
document.querySelectorAll('.select-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    const planCard = btn.closest('.plan-card');
    const planName = planCard.querySelector('h3').textContent;
    const planPrice = planCard.querySelector('.price').textContent;

    // Store plan info in sessionStorage
    sessionStorage.setItem('selectedPlan', planName);
    sessionStorage.setItem('selectedPrice', planPrice);

    // Redirect to cart page
    window.location.href = 'card.html';
  });
});
