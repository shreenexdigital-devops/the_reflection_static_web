
(() => {
  const config = window.REFLECTION_CONFIG || {};
  const body = document.body;
  if (body?.dataset?.service) config.defaultService = body.dataset.service;

  // Mobile/compact navigation
  const menuButton = document.querySelector('[data-menu-button]');
  const drawer = document.querySelector('[data-drawer]');
  const closeTargets = document.querySelectorAll('[data-menu-close]');
  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    if (menuButton) menuButton.setAttribute('aria-expanded', String(open));
  };
  menuButton?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  closeTargets.forEach(el => el.addEventListener('click', () => setMenu(false)));
  drawer?.addEventListener('click', (e) => { if (e.target === drawer) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Current year
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = String(new Date().getFullYear()));

  // Accessible FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question?.addEventListener('click', (event) => {
      event.preventDefault();
      const open = item.hasAttribute('open');
      document.querySelectorAll('.faq-item[open]').forEach(other => {
        if (other !== item) other.removeAttribute('open');
      });
      if (open) item.removeAttribute('open'); else item.setAttribute('open','');
      question.setAttribute('aria-expanded', String(!open));
      if (answer) answer.setAttribute('aria-hidden', String(open));
    });
  });

  // WhatsApp enquiry form
  const buildMessage = (form) => {
    const fd = new FormData(form);
    const service = fd.get('service') || config.defaultService || 'Photography / Event enquiry';
    const lines = [
      `Hello The Reflection,`,
      ``,
      `I would like to enquire about: ${service}`,
      `Name: ${fd.get('name') || '-'}`,
      `Phone: ${fd.get('phone') || '-'}`,
      `Event / Shoot Date: ${fd.get('date') || '-'}`,
      `City / Venue: ${fd.get('city') || '-'}`,
      `Message: ${fd.get('message') || '-'}`
    ];
    return lines.join('\n');
  };

  document.querySelectorAll('[data-whatsapp-form]').forEach(form => {
    const status = form.querySelector('.form-message');
    const serviceField = form.querySelector('[name="service"]');
    if (serviceField && !serviceField.value && config.defaultService) {
      serviceField.value = config.defaultService;
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const digits = (form.querySelector('[name="phone"]')?.value || '').replace(/\D/g,'');
      if (digits.length < 10) {
        if (status) status.textContent = 'Please enter a valid phone number.';
        form.querySelector('[name="phone"]')?.focus();
        return;
      }
      const message = encodeURIComponent(buildMessage(form));
      const url = `https://wa.me/${config.whatsapp || '919733996764'}?text=${message}`;
      if (status) status.textContent = 'Opening WhatsApp with your enquiry…';
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // Smooth anchor links without hijacking keyboard behavior
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        event.preventDefault();
        setMenu(false);
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
})();
