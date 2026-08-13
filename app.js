/**
 * clasegitTP Interactive Slide Deck Engine
 * Built for comprehensive technical presentations on Git & GitHub collaboration.
 */

class PresentationController {
  constructor() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    
    // DOM Cache
    this.headerSlideTitle = document.getElementById('headerSlideTitle');
    this.currentPhasePill = document.getElementById('currentPhasePill');
    this.currentRoleBadge = document.getElementById('currentRoleBadge');
    this.roleAvatar = document.getElementById('roleAvatar');
    this.roleLabel = document.getElementById('roleLabel');
    this.progressBar = document.getElementById('progressBar');
    
    this.btnPrev = document.getElementById('btnPrev');
    this.btnNext = document.getElementById('btnNext');
    this.slideCurrentNum = document.getElementById('slideCurrentNum');
    this.slideTotalNum = document.getElementById('slideTotalNum');
    this.footerSlideTitle = document.getElementById('footerSlideTitle');
    
    // Modals
    this.overviewModal = document.getElementById('overviewModal');
    this.overviewGrid = document.getElementById('overviewGrid');
    this.imageModal = document.getElementById('imageModal');
    this.imageModalImg = document.getElementById('imageModalImg');
    this.imageModalTitle = document.getElementById('imageModalTitle');
    this.shortcutsModal = document.getElementById('shortcutsModal');
    this.toast = document.getElementById('toast');
    
    // Buttons
    this.btnOverview = document.getElementById('btnOverview');
    this.btnThemeToggle = document.getElementById('btnThemeToggle');
    this.btnFullscreen = document.getElementById('btnFullscreen');
    this.btnShortcuts = document.getElementById('btnShortcuts');
    
    this.init();
  }

  init() {
    // Set total slides in UI
    if (this.slideTotalNum) {
      this.slideTotalNum.textContent = this.totalSlides;
    }

    // Restore saved theme if any
    const savedTheme = localStorage.getItem('clasegit_theme') || 'theme-dark';
    document.body.className = savedTheme;

    // Build overview cards
    this.buildOverviewGrid();

    // Attach Event Listeners
    this.attachEventListeners();

    // Show initial slide
    this.showSlide(this.currentIndex);

    // Initialize Simulator SVG Graph
    this.runSimStep(1);
  }

  attachEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Top action buttons
    if (this.btnOverview) {
      this.btnOverview.addEventListener('click', () => this.toggleOverview(true));
    }
    if (this.btnThemeToggle) {
      this.btnThemeToggle.addEventListener('click', () => this.toggleTheme());
    }
    if (this.btnFullscreen) {
      this.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
    }
    if (this.btnShortcuts) {
      this.btnShortcuts.addEventListener('click', () => this.toggleShortcuts(true));
    }

    // Modal backdrop click to close
    [this.overviewModal, this.imageModal, this.shortcutsModal].forEach(modal => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    });

    // Touch swipe support for mobile/tablets
    let touchStartX = 0;
    let touchEndX = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        this.nextSlide(); // Swipe left -> Next
      } else if (touchEndX - touchStartX > 50) {
        this.prevSlide(); // Swipe right -> Prev
      }
    }, { passive: true });
  }

  handleKeydown(e) {
    // Ignore keydown if user is in an input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
      case 'Enter':
        e.preventDefault();
        this.nextSlide();
        break;

      case 'ArrowLeft':
      case 'PageUp':
      case 'Backspace':
        e.preventDefault();
        this.prevSlide();
        break;

      case 'Home':
        e.preventDefault();
        this.goToSlide(1);
        break;

      case 'End':
        e.preventDefault();
        this.goToSlide(this.totalSlides);
        break;

      case 'o':
      case 'O':
      case 'g':
      case 'G':
        this.toggleOverview();
        break;

      case 'f':
      case 'F':
        this.toggleFullscreen();
        break;

      case 't':
      case 'T':
        this.toggleTheme();
        break;

      case '?':
        this.toggleShortcuts();
        break;

      case 'Escape':
        this.closeAllModals();
        break;
    }
  }

  showSlide(index) {
    if (index < 0 || index >= this.totalSlides) return;

    this.slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev');
      if (i === index) {
        slide.classList.add('active');
      } else if (i < index) {
        slide.classList.add('prev');
      }
    });

    this.currentIndex = index;
    const currentSlide = this.slides[index];

    // Read attributes from active slide
    const title = currentSlide.getAttribute('data-title') || `Diapositiva ${index + 1}`;
    const phase = currentSlide.getAttribute('data-phase') || 'Trabajo Práctico';
    const role = currentSlide.getAttribute('data-role') || 'Git & GitHub';
    const roleAvatar = currentSlide.getAttribute('data-role-avatar') || '📌';

    // Update Header
    if (this.headerSlideTitle) this.headerSlideTitle.textContent = title;
    if (this.currentPhasePill) this.currentPhasePill.textContent = phase;
    if (this.roleAvatar) this.roleAvatar.textContent = roleAvatar;
    if (this.roleLabel) this.roleLabel.textContent = role;

    // Update Footer
    if (this.slideCurrentNum) this.slideCurrentNum.textContent = index + 1;
    if (this.footerSlideTitle) this.footerSlideTitle.textContent = title;

    // Update Progress Bar
    const progressPercent = ((index + 1) / this.totalSlides) * 100;
    if (this.progressBar) this.progressBar.style.width = `${progressPercent}%`;

    // Update Prev / Next buttons state
    if (this.btnPrev) this.btnPrev.disabled = index === 0;
    if (this.btnNext) {
      if (index === this.totalSlides - 1) {
        this.btnNext.innerHTML = `<span>Finalizar</span> <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>`;
      } else {
        this.btnNext.innerHTML = `<span>Siguiente</span> <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>`;
      }
    }

    // Highlight in overview grid
    this.updateOverviewActiveCard(index);
  }

  nextSlide() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.showSlide(this.currentIndex + 1);
    } else {
      this.showToast('🎉 ¡Has completado todo el circuito del Trabajo Práctico!');
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.showSlide(this.currentIndex - 1);
    }
  }

  goToSlide(slideNumber) {
    const targetIndex = slideNumber - 1;
    if (targetIndex >= 0 && targetIndex < this.totalSlides) {
      this.showSlide(targetIndex);
      this.closeAllModals();
    }
  }

  buildOverviewGrid() {
    if (!this.overviewGrid) return;
    this.overviewGrid.innerHTML = '';

    this.slides.forEach((slide, index) => {
      const title = slide.getAttribute('data-title') || `Diapositiva ${index + 1}`;
      const phase = slide.getAttribute('data-phase') || 'General';
      const roleAvatar = slide.getAttribute('data-role-avatar') || '📌';

      const card = document.createElement('div');
      card.className = `overview-card ${index === this.currentIndex ? 'active-slide' : ''}`;
      card.id = `overview-card-${index}`;
      card.innerHTML = `
        <div class="oc-top">
          <span class="oc-num">#${index + 1}</span>
          <span class="oc-role">${roleAvatar}</span>
        </div>
        <div class="oc-title">${title}</div>
        <div class="oc-phase">${phase}</div>
      `;

      card.addEventListener('click', () => {
        this.goToSlide(index + 1);
      });

      this.overviewGrid.appendChild(card);
    });
  }

  updateOverviewActiveCard(activeIndex) {
    const cards = document.querySelectorAll('.overview-card');
    cards.forEach((card, i) => {
      if (i === activeIndex) {
        card.classList.add('active-slide');
      } else {
        card.classList.remove('active-slide');
      }
    });
  }

  toggleOverview(forceState) {
    if (!this.overviewModal) return;
    const shouldOpen = forceState !== undefined ? forceState : !this.overviewModal.classList.contains('open');
    if (shouldOpen) {
      this.overviewModal.classList.add('open');
      this.overviewModal.setAttribute('aria-hidden', 'false');
      // Scroll active card into view
      const activeCard = document.getElementById(`overview-card-${this.currentIndex}`);
      if (activeCard) activeCard.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      this.overviewModal.classList.remove('open');
      this.overviewModal.setAttribute('aria-hidden', 'true');
    }
  }

  openImageModal(src, title) {
    if (!this.imageModal || !this.imageModalImg) return;
    this.imageModalImg.src = src;
    if (this.imageModalTitle) this.imageModalTitle.textContent = title || 'Captura de Pantalla';
    this.imageModal.classList.add('open');
    this.imageModal.setAttribute('aria-hidden', 'false');
  }

  closeImageModal() {
    if (!this.imageModal) return;
    this.imageModal.classList.remove('open');
    this.imageModal.setAttribute('aria-hidden', 'true');
  }

  toggleShortcuts(forceState) {
    if (!this.shortcutsModal) return;
    const shouldOpen = forceState !== undefined ? forceState : !this.shortcutsModal.classList.contains('open');
    if (shouldOpen) {
      this.shortcutsModal.classList.add('open');
      this.shortcutsModal.setAttribute('aria-hidden', 'false');
    } else {
      this.shortcutsModal.classList.remove('open');
      this.shortcutsModal.setAttribute('aria-hidden', 'true');
    }
  }

  closeAllModals() {
    [this.overviewModal, this.imageModal, this.shortcutsModal].forEach(modal => {
      if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    if (isDark) {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      localStorage.setItem('clasegit_theme', 'theme-light');
      this.showToast('☀️ Modo Claro activado');
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      localStorage.setItem('clasegit_theme', 'theme-dark');
      this.showToast('🌙 Modo Oscuro activado');
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error al intentar pantalla completa: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  copyCode(btnElement) {
    const terminalCard = btnElement.closest('.terminal-card') || btnElement.parentElement.parentElement;
    const codeBlock = terminalCard ? terminalCard.querySelector('pre') : null;
    if (!codeBlock) return;

    // Clean prompt symbols and comments for clean copying
    const textToCopy = codeBlock.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = btnElement.textContent;
      btnElement.textContent = '¡Copiado!';
      btnElement.classList.add('copied');
      this.showToast('📋 Código copiado al portapapeles');

      setTimeout(() => {
        btnElement.textContent = originalText;
        btnElement.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      this.showToast('No se pudo copiar automáticamente');
    });
  }

  showToast(message) {
    if (!this.toast) return;
    this.toast.textContent = message;
    this.toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toast.classList.remove('show');
    }, 2800);
  }

  // Interactive Sandbox (Slide 20)
  resolveSandbox(choice) {
    const sandboxText = document.getElementById('sandboxText');
    if (!sandboxText) return;

    let resolvedLine = '';
    let explanation = '';

    if (choice === 'a') {
      resolvedLine = '3. Hornear a 220 grados por 15 minutos.';
      explanation = 'Aceptaste la propuesta de Dev A (Horno fuerte).';
    } else if (choice === 'b') {
      resolvedLine = '3. Hornear a 180 grados por 30 minutos.';
      explanation = 'Aceptaste la propuesta de Dev B (Cocción lenta).';
    } else if (choice === 'team') {
      resolvedLine = '3. Hornear a 200 grados por 20 minutos.';
      explanation = '⭐ ¡Excelente! Llegaron al acuerdo consensuado de equipo (200°C / 20 min).';
    } else if (choice === 'abort') {
      sandboxText.innerHTML = `<span class="c-comment"># $ git merge --abort ejecutado con éxito:</span>
# Se canceló el merge. El archivo volvió a su estado previo intacto:

# Receta de Pizza Casera

Ingredientes:
- 500g de harina
- 10g de levadura
- 1 cucharada de sal

Instrucciones:
1. Mezclar la harina con agua.
2. Dejar leudar 1 hora.
<span class="c-rose font-bold">3. Hornear a 180 grados por 30 minutos.</span>

<span class="c-comment"># Estado de la rama: fix/tiempo-b (limpio, sin marcas ni conflicto pendiente)</span>`;
      this.showToast('🚨 Merge cancelado con git merge --abort. Tu rama volvió a su estado previo.');
      return;
    }

    sandboxText.innerHTML = `<span class="c-comment"># Receta de Pizza Casera (Conflicto Resuelto Limpiamente)</span>

Ingredientes:
- 500g de harina
- 10g de levadura
- 1 cucharada de sal

Instrucciones:
1. Mezclar la harina con agua.
2. Dejar leudar 1 hora.
<span class="c-green font-bold">${resolvedLine}</span>

<span class="c-comment"># Marcas &lt;&lt;&lt;&lt;&lt;&lt;&lt;, =======, &gt;&gt;&gt;&gt;&gt;&gt;&gt; eliminadas con éxito.</span>`;

    this.showToast(explanation);
  }

  // Interactive Simulator Engine (Slide 24)
  runSimStep(step) {
    // Update active button
    for (let i = 1; i <= 6; i++) {
      const btn = document.getElementById(`simStep${i}`);
      if (btn) {
        if (i === step) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    }

    const simRoleLabel = document.getElementById('simRoleLabel');
    const simTerminalOutput = document.getElementById('simTerminalOutput');
    const simFileOutput = document.getElementById('simFileOutput');
    const simGraphCanvas = document.getElementById('simGraphCanvas');

    if (!simTerminalOutput || !simFileOutput || !simGraphCanvas) return;

    switch (step) {
      case 1:
        if (simRoleLabel) simRoleLabel.textContent = '👑 Docente / Líder';
        simTerminalOutput.innerHTML = `<code><span class="c-prompt">$ </span>echo "# ClaseGitTP" >> README.md
<span class="c-prompt">$ </span>git init
<span class="c-prompt">$ </span>git add README.md && git commit -m "first commit"
<span class="c-prompt">$ </span>git branch -M main
<span class="c-prompt">$ </span>git remote add origin https://github.com/fiemcasals/ClaseGitTP.git
<span class="c-prompt">$ </span>git push -u origin main
<span class="c-green">✔ Rama 'main' vinculada con origin/main en GitHub</span></code>`;

        simFileOutput.innerHTML = `<code>(README.md creado con '# ClaseGitTP')
(receta.txt aún no existe)</code>`;

        simGraphCanvas.innerHTML = this.renderSimSvgGraph(1);
        break;

      case 2:
        if (simRoleLabel) simRoleLabel.textContent = '👨‍💻 Dev A';
        simTerminalOutput.innerHTML = `<code><span class="c-prompt">$ </span>git clone https://github.com/fiemcasals/ClaseGitTP.git && cd ClaseGitTP
<span class="c-prompt">$ </span>cat << 'EOF' > receta.txt
# Receta de Pizza Casera
Ingredientes:
- 500g de harina
Instrucciones:
1. Mezclar la harina con agua.
EOF
<span class="c-prompt">$ </span>git add receta.txt
<span class="c-prompt">$ </span>git commit -m "docs: agregar estructura inicial de la receta"
<span class="c-prompt">$ </span>git push origin main
<span class="c-green">✔ Commit publicado en main remoto</span></code>`;

        simFileOutput.innerHTML = `<code># Receta de Pizza Casera

Ingredientes:
- 500g de harina

Instrucciones:
1. Mezclar la harina con agua.</code>`;

        simGraphCanvas.innerHTML = this.renderSimSvgGraph(2);
        break;

      case 3:
        if (simRoleLabel) simRoleLabel.textContent = '👩‍💻 Dev B';
        simTerminalOutput.innerHTML = `<code><span class="c-comment"># Docente agrega a Dev B en Settings > Collaborators</span>
<span class="c-prompt">$ </span>git clone https://github.com/fiemcasals/ClaseGitTP.git && cd ClaseGitTP
<span class="c-prompt">$ </span>git status
<span class="c-out">On branch main, up to date with 'origin/main'.</span>
<span class="c-green">✔ Dev B tiene receta.txt sincronizado y permisos de Write</span></code>`;

        simFileOutput.innerHTML = `<code># Receta de Pizza Casera

Ingredientes:
- 500g de harina

Instrucciones:
1. Mezclar la harina con agua.</code>`;

        simGraphCanvas.innerHTML = this.renderSimSvgGraph(3);
        break;

      case 4:
        if (simRoleLabel) simRoleLabel.textContent = '🔀 Dev A & Dev B (Paralelo)';
        simTerminalOutput.innerHTML = `<code><span class="c-cyan"># Dev A:</span> git checkout -b feature/ingredientes -> agrega levadura/sal -> PR #1 -> Merge
<span class="c-rose"># Dev B:</span> git checkout -b feature/instrucciones -> agrega pasos 2 y 3 -> PR #2 -> Merge
<span class="c-green"># Ambos:</span> git checkout main && git pull origin main
<span class="c-green">✔ Merges limpios sin conflicto (hunks independientes)</span></code>`;

        simFileOutput.innerHTML = `<code># Receta de Pizza Casera

Ingredientes:
- 500g de harina
<span class="c-green">- 10g de levadura (Dev A)</span>
<span class="c-green">- 1 cucharada de sal (Dev A)</span>

Instrucciones:
1. Mezclar la harina con agua.
<span class="c-cyan">2. Dejar leudar 1 hora (Dev B)</span>
<span class="c-cyan">3. Hornear a 200 grados (Dev B)</span></code>`;

        simGraphCanvas.innerHTML = this.renderSimSvgGraph(4);
        break;

      case 5:
        if (simRoleLabel) simRoleLabel.textContent = '💥 Dev A vs Dev B (Conflicto)';
        simTerminalOutput.innerHTML = `<code><span class="c-cyan"># Dev A:</span> fix/tiempo-a -> "3. Hornear a 220° por 15m" -> Push & Merge a main en GitHub
<span class="c-rose"># Dev B:</span> fix/tiempo-b -> "3. Hornear a 180° por 30m" -> Push fix/tiempo-b
<span class="c-rose"># Dev B intenta:</span> git fetch origin && git merge origin/main
<span class="c-red font-bold">CONFLICT (content): Merge conflict in receta.txt</span>
<span class="c-red">Automatic merge failed; fix conflicts and then commit.</span></code>`;

        simFileOutput.innerHTML = `<code>Instrucciones:
1. Mezclar la harina con agua.
2. Dejar leudar 1 hora.
<span class="c-red"><<<<<<< HEAD
3. Hornear a 180 grados por 30 minutos.
=======
3. Hornear a 220 grados por 15 minutos.
>>>>>>> origin/main</span></code>`;

        simGraphCanvas.innerHTML = this.renderSimSvgGraph(5);
        break;

      case 6:
        if (simRoleLabel) simRoleLabel.textContent = '✅ Resolución & Cierre';
        simTerminalOutput.innerHTML = `<code><span class="c-rose"># Dev B resuelve manualmente:</span> "3. Hornear a 200 grados por 20 minutos."
<span class="c-prompt">$ </span>git add receta.txt
<span class="c-prompt">$ </span>git commit -m "fix: resolver conflicto de temperatura de horneado"
<span class="c-prompt">$ </span>git push origin fix/tiempo-b
<span class="c-comment"># Dev B abre PR en GitHub y realiza el Merge final.</span>
<span class="c-green"># Ambos: git checkout main && git pull origin main</span>
<span class="c-green">✔ Circuito completado al 100% sin discrepancias</span></code>`;

        simFileOutput.innerHTML = `<code># Receta de Pizza Casera

Ingredientes:
- 500g de harina
- 10g de levadura
- 1 cucharada de sal

Instrucciones:
1. Mezclar la harina con agua.
2. Dejar leudar 1 hora.
<span class="c-green font-bold">3. Hornear a 200 grados por 20 minutos.</span></code>`;

        simGraphCanvas.innerHTML = this.renderSimSvgGraph(6);
        break;
    }
  }

  renderSimSvgGraph(step) {
    // Generates an interactive animated SVG showing git branches and nodes
    return `
      <svg class="graph-svg" viewBox="0 0 700 130" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mainLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3b82f6"/>
            <stop offset="100%" stop-color="#60a5fa"/>
          </linearGradient>
        </defs>

        <!-- Main Trunk Line -->
        <line x1="40" y1="65" x2="${step >= 4 ? 660 : (step >= 2 ? 380 : 150)}" y2="65" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
        <text x="15" y="69" fill="#60a5fa" font-family="Fira Code, monospace" font-size="11" font-weight="700">main</text>

        <!-- Node 1: Initial Commit -->
        <circle cx="50" cy="65" r="7" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
        <text x="50" y="90" fill="#94a3b8" font-family="Fira Code, monospace" font-size="9" text-anchor="middle">init</text>

        ${step >= 2 ? `
          <!-- Node 2: Dev A receta base -->
          <circle cx="130" cy="65" r="7" fill="#06b6d4" stroke="#ffffff" stroke-width="2"/>
          <text x="130" y="90" fill="#06b6d4" font-family="Fira Code, monospace" font-size="9" text-anchor="middle">receta.txt</text>
        ` : ''}

        ${step >= 4 ? `
          <!-- Branch 1: feature/ingredientes (Green) -->
          <path d="M 130 65 Q 160 25 210 25 L 270 25 Q 310 25 340 65" fill="none" stroke="#10b981" stroke-width="3"/>
          <circle cx="240" cy="25" r="6" fill="#10b981" stroke="#ffffff" stroke-width="1.5"/>
          <text x="240" y="15" fill="#34d399" font-family="Fira Code, monospace" font-size="9" text-anchor="middle">feat/ingredientes</text>

          <!-- Branch 2: feature/instrucciones (Cyan) -->
          <path d="M 130 65 Q 160 105 210 105 L 300 105 Q 340 105 380 65" fill="none" stroke="#06b6d4" stroke-width="3"/>
          <circle cx="260" cy="105" r="6" fill="#06b6d4" stroke="#ffffff" stroke-width="1.5"/>
          <text x="260" y="122" fill="#38bdf8" font-family="Fira Code, monospace" font-size="9" text-anchor="middle">feat/instrucciones</text>

          <!-- Merge Node 1 & 2 on main -->
          <circle cx="340" cy="65" r="7" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
          <text x="340" y="90" fill="#34d399" font-family="Fira Code, monospace" font-size="9" text-anchor="middle">Merge PR#1</text>

          <circle cx="380" cy="65" r="7" fill="#06b6d4" stroke="#ffffff" stroke-width="2"/>
          <text x="380" y="50" fill="#38bdf8" font-family="Fira Code, monospace" font-size="9" text-anchor="middle">Merge PR#2</text>
        ` : ''}

        ${step >= 5 ? `
          <!-- Fix A branch (merged to main) -->
          <path d="M 380 65 Q 410 25 450 25 Q 490 25 520 65" fill="none" stroke="#f59e0b" stroke-width="3"/>
          <circle cx="450" cy="25" r="6" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>
          <text x="450" y="15" fill="#fbbf24" font-family="Fira Code, monospace" font-size="9" text-anchor="middle">fix/tiempo-a (220°)</text>

          <circle cx="520" cy="65" r="7" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
          <text x="520" y="90" fill="#fbbf24" font-family="Fira Code, monospace" font-size="9" text-anchor="middle">PR#3 Merged</text>

          <!-- Fix B branch (Conflict or Resolved) -->
          <path d="M 380 65 Q 420 105 480 105 ${step === 6 ? 'Q 560 105 620 65' : 'L 540 105'}" fill="none" stroke="${step === 6 ? '#8b5cf6' : '#ef4444'}" stroke-width="3" ${step === 5 ? 'stroke-dasharray="4,4"' : ''}/>
          
          <circle cx="480" cy="105" r="6" fill="${step === 6 ? '#8b5cf6' : '#ef4444'}" stroke="#ffffff" stroke-width="1.5"/>
          <text x="480" y="122" fill="${step === 6 ? '#c084fc' : '#f87171'}" font-family="Fira Code, monospace" font-size="9" text-anchor="middle">${step === 6 ? 'fix/tiempo-b (Resolved)' : 'fix/tiempo-b (💥 CONFLICT)'}</text>
        ` : ''}

        ${step === 6 ? `
          <!-- Final Merge Node -->
          <circle cx="620" cy="65" r="8" fill="#10b981" stroke="#ffffff" stroke-width="2.5"/>
          <text x="620" y="90" fill="#34d399" font-family="Fira Code, monospace" font-size="10" font-weight="700" text-anchor="middle">Merge PR#4 (Consolidado)</text>
        ` : ''}
      </svg>
    `;
  }
}

// Instantiate presentation on DOM ready
let presentation;
document.addEventListener('DOMContentLoaded', () => {
  presentation = new PresentationController();
});
