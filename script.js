/* ============================================================
   FRANCISCO GIRÓN — Personal Website JavaScript
   ============================================================ */

'use strict';

/* ---- PARTICLES ---- */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const GOLD = 'rgba(201,168,76,';
  const WHITE = 'rgba(255,255,255,';

  let W, H, particles = [], mouse = { x: -999, y: -999 };
  const COUNT = window.innerWidth < 768 ? 50 : 100;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.gold = Math.random() > 0.7;
    }
    update() {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.vx += (dx / dist) * force * 0.3;
        this.vy += (dy / dist) * force * 0.3;
      }
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.gold
        ? GOLD + this.opacity + ')'
        : WHITE + (this.opacity * 0.5) + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = GOLD + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ---- NAVBAR ---- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => a.classList.remove('active-link'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active-link');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ---- TYPEWRITER ---- */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'International Business Leader',
    'B2B Sales Strategist',
    'Revenue Operations Expert',
    'Project Management Professional',
    'Cross-Border Growth Driver',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let pauseTimer = null;

  function type() {
    const phrase = phrases[phraseIndex];

    if (!deleting) {
      el.textContent = phrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === phrase.length) {
        deleting = true;
        pauseTimer = setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = phrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        pauseTimer = setTimeout(type, 400);
        return;
      }
    }

    clearTimeout(pauseTimer);
    pauseTimer = setTimeout(type, deleting ? 45 : 85);
  }

  setTimeout(type, 1800);
})();

/* ---- SCROLL REVEAL ---- */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80 + parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* ---- COUNTER ANIMATION ---- */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ---- LANGUAGE BARS ---- */
(function initLangBars() {
  const fills = document.querySelectorAll('.lang-fill');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(f => observer.observe(f));
})();

/* ---- CONTACT FORM ---- */
(function initForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.querySelector('span').textContent;
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending...';

    // Simulate async send (replace with actual endpoint)
    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.querySelector('span').textContent = originalText;
      success.classList.remove('hidden');
      setTimeout(() => success.classList.add('hidden'), 5000);
    }, 1200);
  });
})();

/* ---- SMOOTH SCROLL OFFSET (for fixed nav) ---- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ---- SKILL TAGS HOVER RIPPLE ---- */
(function initSkillRipple() {
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;width:1px;height:1px;
        background:rgba(201,168,76,0.4);border-radius:50%;
        transform:scale(0);animation:ripple 0.6s ease;
        left:${e.offsetX}px;top:${e.offsetY}px;pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to { transform: scale(200); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();
