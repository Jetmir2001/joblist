 document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.toggle-btn');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const post = btn.closest('.blog-post');
      const content = post.querySelector('.blog-content');

      if (post.classList.contains('active')) {
        content.style.maxHeight = null;
        post.classList.remove('active');
        btn.textContent = '+';
      } else {
        // Close other posts
        document.querySelectorAll('.blog-post.active').forEach(activePost => {
          activePost.querySelector('.blog-content').style.maxHeight = null;
          activePost.classList.remove('active');
          activePost.querySelector('.toggle-btn').textContent = '+';
        });

        // Open this post
        content.style.maxHeight = content.scrollHeight + "px";
        post.classList.add('active');
        btn.textContent = '−';
      }
    });
  });
});
