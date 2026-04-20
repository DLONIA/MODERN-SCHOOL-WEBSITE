 const menuBtn = document.getElementById('menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const sideClose = document.getElementById('side-close');
    const overlay = document.getElementById('side-overlay');

    function openMenu() {
      sideMenu.classList.add('show');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      sideMenu.classList.remove('show');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    sideClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => {
        if (el.isIntersecting) {
          el.target.classList.add('visible');
          observer.unobserve(el.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));