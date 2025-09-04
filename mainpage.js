 // ===== Counters =====
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 200;

    if(count < target){
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target;
    }
  }
  updateCount();
});

// ===== Blog Accordion =====
document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.toggle-btn');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const post = btn.closest('.blog-post');
      const content = post.querySelector('.blog-content');

      if(post.classList.contains('active')){
        content.style.maxHeight = null;
        post.classList.remove('active');
        btn.textContent = '+';
      } else {
        document.querySelectorAll('.blog-post.active').forEach(activePost => {
          activePost.querySelector('.blog-content').style.maxHeight = null;
          activePost.classList.remove('active');
          activePost.querySelector('.toggle-btn').textContent = '+';
        });

        content.style.maxHeight = content.scrollHeight + 'px';
        post.classList.add('active');
        btn.textContent = '−';
      }
    });
  });
});

// ===== Job Apply Navigation =====
