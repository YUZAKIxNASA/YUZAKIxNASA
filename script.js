document.addEventListener('DOMContentLoaded', () => {
  
  /* ----------------------------------------------------
     1. TYPEWRITER ANIMATION (HERO SECTION)
  ---------------------------------------------------- */
  const roles = [
    "UI/UX Developer",
    "Web Developer",
    "React Developer",
    "Frontend Developer"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typewriterText = document.getElementById('typewriter-text');
  const badgeRoleText = document.getElementById('badge-role-text');

  function typeEffect() {
    const currentRole = roles[roleIdx];

    if (!isDeleting) {
      typewriterText.textContent = currentRole.substring(0, charIdx + 1);
      if (badgeRoleText) badgeRoleText.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause at end
        return;
      }
    } else {
      typewriterText.textContent = currentRole.substring(0, charIdx - 1);
      if (badgeRoleText) badgeRoleText.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }

  if (typewriterText) {
    typeEffect();
  }

  /* ----------------------------------------------------
     2. NAVBAR SCROLL EFFECT & MOBILE MENU
  ---------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy for active nav link
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  });

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  /* ----------------------------------------------------
     3. INTERACTIVE PROJECT SLIDER
  ---------------------------------------------------- */
  const projects = [
    {
      id: '01',
      title: 'StockDZ',
      subtitle: 'E-COMMERCE PLATFORM',
      year: '2024',
      category: 'YUZAKI NASA / WORK',
      shortDesc: 'A modern digital shopping experience designed around clarity, discovery and simple interaction.',
      role: 'UI / UX - Frontend Development',
      fullDesc: 'StockDZ focuses on creating a clean product experience where users can explore products, understand information quickly and move naturally through the interface.',
      highlights: [
        'Product-focused interface',
        'Clear visual hierarchy',
        'Responsive layouts',
        'Interactive components'
      ],
      technologies: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
      dashboardStats: { totalStock: '403', purchases: '6,420' },
      imageSrc: 'assets/stockdz_dashboard.png'
    },
    {
      id: '02',
      title: 'Portfolio',
      subtitle: 'PERSONAL DIGITAL EXPERIENCE',
      year: '2026',
      category: 'YUZAKI NASA / WORK',
      shortDesc: 'A personal digital space combining development, visual identity, interaction and motion.',
      role: 'Creative Development • UI / UX',
      fullDesc: 'The portfolio was designed as more than a traditional website. The goal is to create an immersive experience where typography, whitespace, motion and content work together.',
      highlights: [
        'Editorial visual direction',
        'Motion-based interactions',
        'Responsive experience',
        'Minimal design system'
      ],
      technologies: ['React', 'Framer Motion', 'Vite', 'CSS'],
      imageSrc: 'assets/portfolio_kimono.png'
    },
    {
      id: '03',
      title: 'Hangman',
      subtitle: 'INTERACTIVE GAME EXPERIENCE',
      year: '2025',
      category: 'YUZAKI NASA / WORK',
      shortDesc: 'A web-based word guessing game featuring clean typography, state management and smooth micro-interactions.',
      role: 'Frontend Development • Game Logic',
      fullDesc: 'Hangman brings classic gameplay to the web with an intuitive interface, keyboard shortcuts, dynamic score tracking, and minimal aesthetic.',
      highlights: [
        'Custom game state machine',
        'Keyboard & touch controls',
        'Responsive visual design',
        'Interactive score system'
      ],
      technologies: ['JavaScript', 'HTML5 Canvas / CSS', 'React'],
      imageSrc: ''
    }
  ];

  let currentProjectIdx = 0;
  const projectContainer = document.getElementById('project-card-container');
  const projectCounterTop = document.getElementById('project-counter-top');
  const prevBtn = document.getElementById('prev-project-btn');
  const nextBtn = document.getElementById('next-project-btn');
  const dotsContainer = document.getElementById('slider-dots-container');

  function renderProject(index) {
    const p = projects[index];
    if (!projectContainer) return;

    if (projectCounterTop) {
      projectCounterTop.textContent = `0${index + 1} / 0${projects.length}`;
    }

    const imageBlockHtml = p.imageSrc ? `
      <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem; align-items: center; background-color: var(--bg-main); padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--border-light); margin-bottom: 1.5rem;">
        <div style="grid-column: span 5; aspect-ratio: 4/3; border-radius: 0.5rem; overflow: hidden; border: 1px solid var(--border-light); background-color: #fff;">
          <img src="${p.imageSrc}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover;" />
        </div>
        <div style="grid-column: span 7;">
          ${p.dashboardStats ? `
            <div style="background-color:#fff; padding:0.75rem; border-radius:0.5rem; border:1px solid var(--border-light); margin-bottom:0.5rem;">
              <div style="font-family:var(--font-mono); font-size:0.6875rem; color:var(--text-subtle);">Total Stock</div>
              <div style="font-size:1.25rem; font-weight:700; color:var(--text-main);">${p.dashboardStats.totalStock}</div>
              <div style="font-size:0.625rem; color:#10B981; font-weight:600;">Purchases: ${p.dashboardStats.purchases}</div>
            </div>
          ` : ''}
          <p style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">${p.fullDesc}</p>
        </div>
      </div>
    ` : '';

    const highlightsHtml = p.highlights.map((h, i) => `
      <div class="highlight-item">
        <span class="font-mono text-subtle">0${i + 1}</span>
        <span>${h}</span>
      </div>
    `).join('');

    const techHtml = p.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('');

    projectContainer.innerHTML = `
      <!-- Left Panel -->
      <div class="card-panel">
        <div>
          <div class="card-top-meta">
            <span>${p.category}</span>
            <span>${p.year}</span>
          </div>

          <div class="project-id-serif">${p.id}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-sub">${p.subtitle}</p>
          <hr style="border:none; border-top:1px solid var(--border-light); width:3rem; margin-bottom:1.5rem;" />
          <p class="project-short-desc">"${p.shortDesc}"</p>
        </div>

        <div class="card-bottom-footer">
          <span>DIGITAL PROJECT</span>
          <span>${p.id} / 03</span>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="card-panel">
        <div>
          ${imageBlockHtml}

          <div class="role-badge-box">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <div>
              <span style="display:block; font-family:var(--font-mono); font-size:0.625rem; color:var(--text-subtle);">ROLE</span>
              <span style="font-size:0.75rem; font-weight:600; color:var(--text-main);">${p.role}</span>
            </div>
          </div>

          ${!p.imageSrc ? `<p style="font-size:0.875rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.5rem;">${p.fullDesc}</p>` : ''}

          <div style="margin-bottom:1.5rem;">
            <span style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-subtle); margin-bottom:0.5rem;">&lt;/&gt; WHAT I WORKED ON</span>
            <div class="highlights-grid">${highlightsHtml}</div>
          </div>

          <div>
            <span style="display:block; font-family:var(--font-mono); font-size:0.625rem; color:var(--text-subtle); margin-bottom:0.5rem;">TECHNOLOGIES</span>
            <div class="tech-pills">${techHtml}</div>
          </div>
        </div>

        <div style="padding-top:1.5rem; margin-top:1.5rem; border-top:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
          <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-subtle);">DIGITAL EXPERIENCE</span>
          <a href="#contact" style="font-size:0.75rem; font-weight:600; color:var(--text-main); text-decoration:none;">Let's talk ↗</a>
        </div>
      </div>
    `;

    renderDots();
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = projects.map((_, i) => `
      <button class="dot-btn ${i === currentProjectIdx ? 'active' : 'inactive'}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>
    `).join('');

    dotsContainer.querySelectorAll('.dot-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentProjectIdx = parseInt(e.target.getAttribute('data-index'));
        renderProject(currentProjectIdx);
      });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentProjectIdx = currentProjectIdx === 0 ? projects.length - 1 : currentProjectIdx - 1;
      renderProject(currentProjectIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentProjectIdx = currentProjectIdx === projects.length - 1 ? 0 : currentProjectIdx + 1;
      renderProject(currentProjectIdx);
    });
  }

  renderProject(0);

  /* ----------------------------------------------------
     4. MIND MAP (THINK) INTERACTIVITY
  ---------------------------------------------------- */
  const nodeCards = document.querySelectorAll('.map-node-card');
  nodeCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const nodeId = card.getAttribute('data-node');
      const line = document.getElementById(`line-${nodeId}`);
      if (line) line.classList.add('active');
    });

    card.addEventListener('mouseleave', () => {
      const nodeId = card.getAttribute('data-node');
      const line = document.getElementById(`line-${nodeId}`);
      if (line) line.classList.remove('active');
    });
  });

  /* ----------------------------------------------------
     5. CONTACT FORM SUBMISSION
  ---------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');

      setTimeout(() => {
        contactForm.reset();
        formSuccess.classList.add('hidden');
        contactForm.classList.remove('hidden');
      }, 5000);
    });
  }

  /* ----------------------------------------------------
     6. BACK TO TOP BUTTON
  ---------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
