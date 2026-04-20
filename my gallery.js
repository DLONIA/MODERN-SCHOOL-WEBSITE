 // ── FILTER ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        items.forEach(item => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.style.display = match ? '' : 'none';
        });
      });
    });

    // ── LIGHTBOX ──
    const lightbox  = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lbImg');
    const lbCaption = document.getElementById('lbCaption');
    const lbTag     = document.getElementById('lbTag');
    let currentIndex = 0;
    let visibleItems = [];

    function getVisibleItems() {
      return [...items].filter(i => i.style.display !== 'none');
    }

    function showSlide(i) {
      const item = visibleItems[i];
      const img  = item.querySelector('img');
      lbImg.src  = img ? img.src : '';
      lbImg.alt  = img ? img.alt : '';
      lbCaption.textContent = item.dataset.label;
      lbTag.textContent     = item.dataset.tag;
    }

    function openLightbox(index) {
      visibleItems = getVisibleItems();
      currentIndex = index;
      showSlide(currentIndex);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    items.forEach(item => {
      item.addEventListener('click', () => {
        visibleItems = getVisibleItems();
        openLightbox(visibleItems.indexOf(item));
      });
    });

    document.getElementById('lbClose').addEventListener('click', closeLightbox);

    document.getElementById('lbPrev').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      showSlide(currentIndex);
    });

    document.getElementById('lbNext').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % visibleItems.length;
      showSlide(currentIndex);
    });

    // Close on backdrop click
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft')  {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        showSlide(currentIndex);
      }
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        showSlide(currentIndex);
      }
    });