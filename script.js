// =========================================
// DESIGN 2 — CALM EDITORIAL
// =========================================

// 1. Mobile menu
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.textContent = isOpen ? 'Close' : 'Menu';
});
nav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.textContent = 'Menu';
  })
);

// 2. Scroll reveal: elements with class "reveal" fade in when they enter the screen
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // only animate once
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. Accordion: only one item open at a time
const accItems = document.querySelectorAll('.acc-item');

accItems.forEach(item => {
  const head = item.querySelector('.acc-head');
  const body = item.querySelector('.acc-body');

  head.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');

    // close all
    accItems.forEach(other => {
      other.classList.remove('open');
      other.querySelector('.acc-body').style.maxHeight = null;
    });

    // open the clicked one (unless it was already open)
    if (!wasOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// Open the first item by default
accItems[0].querySelector('.acc-head').click();

// 4. Flip cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// 5. Contact form validation
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements.name;
  const email = form.elements.email;

  const nameOk = name.value.trim() !== '';
  const emailOk = /^\S+@\S+\.\S+$/.test(email.value);

  name.classList.toggle('error', !nameOk);
  email.classList.toggle('error', !emailOk);

  if (!nameOk || !emailOk) {
    formMessage.textContent = 'Please add your name and a valid email.';
    return;
  }

  // TODO: connect to a form service or backend
  formMessage.textContent = `Thanks ${name.value.trim()}, we'll be in touch soon.`;
  form.reset();
});