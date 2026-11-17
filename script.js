/**
 * Shreya Gautam Portfolio - Multi-page & Shared Interactive Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initTheme();
  initTypewriter();
  initStatsCounter();
  initRoleTabs();
  initPubFilters();
  initBibtexToggles();
  initProjectFilters();
  initContactActions();
  initScrollReveal();
  initFooter();
});

/* ----------------------------------------------------
 * 1. Global Navigation & Mobile Menu
 * ---------------------------------------------------- */
function initNavbar() {
  const navContainer = document.getElementById("site-nav");
  if (!navContainer) return;

  const currentPage = document.body.dataset.page || "home";

  navContainer.innerHTML = `
    <div class="container nav-container">
      <a href="index-multipage.html" class="brand">Shreya<span>.</span>Gautam</a>
      
      <div class="nav-links" id="nav-links">
        <a href="index-multipage.html" class="nav-link ${currentPage === 'home' ? 'active' : ''}">Home</a>
        <a href="about.html" class="nav-link ${currentPage === 'about' ? 'active' : ''}">About</a>
        <a href="research.html" class="nav-link ${currentPage === 'research' ? 'active' : ''}">Research</a>
        <a href="publications.html" class="nav-link ${currentPage === 'publications' ? 'active' : ''}">Publications</a>
        <a href="projects.html" class="nav-link ${currentPage === 'projects' ? 'active' : ''}">Projects</a>
        <a href="experience.html" class="nav-link ${currentPage === 'experience' ? 'active' : ''}">Experience</a>
        <a href="contact.html" class="nav-link ${currentPage === 'contact' ? 'active' : ''}">Contact</a>
      </div>

      <div class="nav-right">
        <button id="theme-toggle-btn" class="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
          <span class="theme-icon">🌙</span>
        </button>
        <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Open menu">
          ☰
        </button>
      </div>
    </div>
  `;

  // Mobile menu toggle
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
}

/* ----------------------------------------------------
 * 2. Theme Switcher (Dark / Light)
 * ---------------------------------------------------- */
function initTheme() {
  const savedTheme = localStorage.getItem("sg_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#theme-toggle-btn");
    if (!btn) return;
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sg_theme", next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector(".theme-icon");
  if (icon) {
    icon.textContent = theme === "light" ? "☀️" : "🌙";
  }
}

/* ----------------------------------------------------
 * 3. Typewriter Effect
 * ---------------------------------------------------- */
function initTypewriter() {
  const el = document.getElementById("typed");
  if (!el) return;

  const raw = el.getAttribute("data-phrases") || "";
  const phrases = raw.split("|").map(p => p.trim()).filter(Boolean);
  if (!phrases.length) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = currentPhrase.substring(0, charIndex);
    } else {
      charIndex++;
      el.textContent = currentPhrase.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(tick, typeSpeed);
  }

  tick();
}

/* ----------------------------------------------------
 * 4. Animated Stats Counter
 * ---------------------------------------------------- */
function initStatsCounter() {
  const statElements = document.querySelectorAll(".stat .num");
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statElements.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-count"), 10) || 0;
  const suffix = el.getAttribute("data-suffix") || "";
  const duration = 1600;
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const eased = 1 - (1 - progress) * (1 - progress);
    const currentVal = Math.round(eased * target);

    el.textContent = currentVal.toLocaleString() + suffix;

    if (frame >= totalFrames) {
      el.textContent = target.toLocaleString() + suffix;
      clearInterval(counter);
    }
  }, frameRate);
}

/* ----------------------------------------------------
 * 5. Role Switcher ("Find My Fit")
 * ---------------------------------------------------- */
function initRoleTabs() {
  const tabsContainer = document.getElementById("role-tabs");
  const panel = document.getElementById("role-panel");
  if (!tabsContainer || !panel) return;

  const roleProfiles = {
    ml: {
      title: "Machine Learning Engineer",
      summary: "Designing, training, and deploying resilient predictive systems with reproducible pipelines and rigorous benchmarking.",
      points: [
        "End-to-end model development: data ingestion, preprocessing, architecture selection, and evaluation.",
        "Production inference pipelines optimized for latency, memory efficiency, and throughput.",
        "Experience benchmarking multimodal pipelines and statistical validation across diverse distributions."
      ],
      tags: ["PyTorch", "scikit-learn", "MLOps", "Model Evaluation", "Docker", "FastAPI"]
    },
    nlp: {
      title: "NLP & LLM Researcher",
      summary: "Benchmarking large language models, mitigating systemic biases, and building narrative extraction systems.",
      points: [
        "Curated and benchmarked 23,400+ LLM narrative generations across frontier models.",
        "Fine-tuning encoder-decoder and decoder-only architectures for text classification and summarization.",
        "Evaluating prompt sensitivity, representation bias, and detection of synthetic vs. human text."
      ],
      tags: ["Transformers", "Hugging Face", "LLM Bias", "Tokenization", "Sentence Embeddings", "NLTK/spaCy"]
    },
    genai: {
      title: "Generative AI Specialist",
      summary: "Building trustworthy Generative AI applications: multi-agent workflows, RAG, and domain-adapted synthesis.",
      points: [
        "Architecting Retrieval-Augmented Generation (RAG) pipelines with hybrid vector search and reranking.",
        "Developing multi-agent orchestration systems for complex task breakdown and synthesis.",
        "Generative modeling for food security and humanitarian datasets at ISI Foundation."
      ],
      tags: ["LangChain / LlamaIndex", "Vector DBs (Chroma/FAISS)", "Prompt Engineering", "Synthetic Data", "Guardrails"]
    },
    ds: {
      title: "Data Scientist",
      summary: "Extracting actionable signal from complex, noisy datasets through statistical testing and intuitive visualizations.",
      points: [
        "Curated and harmonized 266,000+ data samples across humanitarian and socio-technical domains.",
        "Hypothesis testing, distribution drift analysis, and causal inference techniques.",
        "Interactive analytics dashboards and executive communication of technical metrics."
      ],
      tags: ["Pandas / NumPy", "Statistical Modeling", "Data Wrangling", "Plotly / Seaborn", "SQL", "A/B Testing"]
    },
    research: {
      title: "Research Scientist",
      summary: "Publishing peer-reviewed scientific contributions at the intersection of AI safety, generative modeling, and society.",
      points: [
        "Research Scientist at ISI Foundation leading studies in generative modeling and AI evaluation.",
        "Author of 5 publications in leading AI/data science venues with reproducible codebases.",
        "Recipient of 2 major academic and research honours for scientific merit."
      ],
      tags: ["Peer-reviewed Papers", "Experimental Design", "AI Safety", "Scientific Writing", "BibTeX", "ISI Foundation"]
    }
  };

  const tabs = tabsContainer.querySelectorAll(".tab");

  function renderRole(roleKey) {
    const data = roleProfiles[roleKey] || roleProfiles.ml;
    tabs.forEach(t => t.classList.toggle("active", t.getAttribute("data-role") === roleKey));

    panel.innerHTML = `
      <h4>${data.title}</h4>
      <p>${data.summary}</p>
      <ul style="margin: 0.5rem 0 1.25rem 1.25rem; color: var(--text-muted); line-height: 1.7;">
        ${data.points.map(pt => `<li>${pt}</li>`).join("")}
      </ul>
      <div class="chips">
        ${data.tags.map(tag => `<span class="chip">${tag}</span>`).join("")}
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => renderRole(tab.getAttribute("data-role")));
  });

  renderRole("ml");
}

/* ----------------------------------------------------
 * 6. Publications Filters & BibTeX
 * ---------------------------------------------------- */
function initPubFilters() {
  const filterBtns = document.querySelectorAll('.filters[data-group="pubs"] .filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');
  if (!filterBtns.length || !pubCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      pubCards.forEach(card => {
        const topics = (card.dataset.topics || "").split(" ");
        if (filter === "all" || topics.includes(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function initBibtexToggles() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".bibtex-toggle-btn");
    if (!btn) return;
    const targetId = btn.dataset.target;
    const box = document.getElementById(targetId);
    if (box) {
      box.classList.toggle("show");
      btn.textContent = box.classList.contains("show") ? "Hide BibTeX" : "BibTeX";
    }
  });
}

/* ----------------------------------------------------
 * 7. Project Filters
 * ---------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filters[data-group="projects"] .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const topics = (card.dataset.topics || "").split(" ");
        if (filter === "all" || topics.includes(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ----------------------------------------------------
 * 8. Contact & Toast Notifications
 * ---------------------------------------------------- */
function initContactActions() {
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("data-copy");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => showToast(`Copied to clipboard: ${text}`));
      } else {
        showToast(text);
      }
    });
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Message sent! Thanks for reaching out.");
      contactForm.reset();
    });
  }
}

function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

/* ----------------------------------------------------
 * 9. Scroll Reveal
 * ---------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------
 * 10. Global Footer
 * ---------------------------------------------------- */
function initFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-links">
        <a href="https://github.com/ShreyaGautamm" target="_blank" rel="noopener">GitHub</a>
        <a href="https://scholar.google.com/citations?user=eaRErNwAAAAJ" target="_blank" rel="noopener">Google Scholar</a>
        <a href="https://www.linkedin.com/in/shreyagautamm" target="_blank" rel="noopener">LinkedIn</a>
        <a href="contact.html">Contact</a>
      </div>
      <p>&copy; ${new Date().getFullYear()} Shreya Gautam. Research Scientist at ISI Foundation.</p>
    </div>
  `;
}
