 const form = document.getElementById('applyForm');
    const progressSteps = [
      document.getElementById('p1'),
      document.getElementById('p2'),
      document.getElementById('p3')
    ];
    const stepCount = document.getElementById('stepCount');
    const fields = [
      document.getElementById('name'),
      document.getElementById('classLevel'),
      document.getElementById('email')
    ];

    fields.forEach(field => {
      field.addEventListener('input', updateProgress);
      field.addEventListener('change', updateProgress);
    });

    function updateProgress() {
      let filled = 0;
      fields.forEach(f => { if (f.value.trim()) filled++; });
      progressSteps.forEach((s, i) => {
        s.classList.toggle('active', i < filled);
      });
      stepCount.textContent = Math.min(filled + 1, 3);
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      [...form.querySelectorAll('.form-group, .form-check, .form-progress, .form-submit')]
        .forEach(el => el.style.display = 'none');

      document.getElementById('successMsg').style.display = 'flex';
      progressSteps.forEach(s => s.classList.add('active'));
    });