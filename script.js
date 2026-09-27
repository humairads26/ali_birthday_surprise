/* ============================================================
   MR. SOLUTION — BIRTHDAY WEBSITE
   Main Script — All interactivity, animations, particles
   ============================================================ */

'use strict';

// ============================================================
// STATE
// ============================================================
let currentPage = 1;
const TOTAL_PAGES = 10;
let transitioning = false;

// Photo reveal state
const photos = [
  {
    src: 'images/photo1.jpg',
    beforeCaption: "Let's start with the one you like the most… ",
    afterCaption: "Of course, I had to give your favourite one the first place. 🤍"
  },
  {
    src: 'images/photo4.jpg',
    beforeCaption: "Some pictures don't need a special occasion…\nthey simply capture a moment perfectly.",
    afterCaption: "And this one definitely deserved a place here. ✨"
  },
  {
    src: 'images/photo6.jpg',
    beforeCaption: "And then there are those random moments…\nthat somehow become part of the memories.",
    afterCaption: "A little different from the usual…\nbut that's exactly why I chose it. "
  },
  {
    src: 'images/photo3.jpg',
    beforeCaption: "Calm. Confident. And completely your own vibe.",
    afterCaption: "This one had to be here. 🖤"
  },
  {
    src: 'images/photo2.jpg',
    beforeCaption: "Okay… this one brings a completely different vibe. ✨",
    afterCaption: "Formal mode: activated. "
  },
  {
    src: 'images/photo10.jpg',
    beforeCaption: "And finally… one last picture.",
    afterCaption: "Because every little collection of memories needs a proper ending.\n\nAnd this one felt like the right way to end it. 🤍"
  }
];
let currentPhotoIndex = 0;
let curtainsOpen = false;

// Canvas contexts
const canvasMap = {};

// ============================================================
// INIT
// ============================================================
function initApp() {
  initGlobalStars();
  initFloatingHearts();
  // Setup page 1 canvas
  const p1canvas = document.getElementById('canvas1');
  if (p1canvas) {
    p1canvas.width = window.innerWidth;
    p1canvas.height = window.innerHeight;
  }
  initPage1();
  setTimeout(() => startPage1Sequence(), 400);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ============================================================
// PAGE NAVIGATION
// ============================================================
function goToPage(pageNum) {
  if (pageNum === currentPage) return;
  transitioning = true;
  setTimeout(() => { transitioning = false; }, 1200);

  const isForward = pageNum > currentPage;
  const overlay = document.getElementById('pageTransition');
  if (overlay) overlay.classList.add('active');

  setTimeout(() => {
    // Hide current page with directional animation
    const currentEl = document.getElementById(`page${currentPage}`);
    if (currentEl) {
      currentEl.classList.remove('active');
      const exitClass = isForward ? 'exit-forward' : 'exit-backward';
      currentEl.classList.add(exitClass);
      setTimeout(() => currentEl.classList.remove('exit-forward', 'exit-backward'), 800);
    }

    // Show new page
    currentPage = pageNum;
    GlobalAtmosphereSystem.startCanvas('globalCanvas', pageNum);
    const newEl = document.getElementById(`page${pageNum}`);
    if (newEl) {
      newEl.classList.add('active');
    }

    // Show/hide back button (hidden on page 1)
    const backBtn = document.getElementById('globalBackBtn');
    if (backBtn) {
      if (pageNum <= 1) {
        backBtn.classList.add('hidden');
      } else {
        backBtn.classList.remove('hidden');
      }
    }

    // Remove transition overlay
    setTimeout(() => {
      if (overlay) overlay.classList.remove('active');
      transitioning = false;
      // Init new page animations
      initPageOnEnter(pageNum);
    }, 550);
  }, 450);
}

// Navigate to the previous page
function goToPrevPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

function initPageOnEnter(pageNum) {
  switch (pageNum) {
    case 2: initPage2(); break;
    case 3: initPage3(); break;
    case 4: initPage4(); break;
    case 5: initPage5(); break;
    case 6: initPage6(); break;
    case 7: initPage7(); break;
    case 8: initPage8(); break;
    case 9: initPage9(); break;
    case 10: initPage10(); break;
  }
}


// ============================================================
// GLOBAL BACKGROUND ATMOSPHERE ENGINE
// Cinematic Night Sky & Luxury Birthday Atmosphere System
// ============================================================
const GlobalAtmosphereSystem = (function() {
  const isMobile = window.innerWidth <= 768;
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Curated Luxury Palette: Champagne (#D8B878), Warm Ivory (#F5EBDD), Deep Burgundy (59, 10, 26), Deep Wine (107, 20, 45)
  const CHAMPAGNE = '216, 184, 120';
  const WARM_IVORY = '245, 235, 221';
  const BURGUNDY = '59, 10, 26';
  const WINE = '107, 20, 45';

  const PAGE_CONFIGS = {
    1: { starCount: isMobile ? 50 : 100, particleCount: isMobile ? 14 : 28, heartCount: 4, bokehCount: 3, sparkleCount: 10 },
    2: { starCount: isMobile ? 55 : 110, particleCount: isMobile ? 18 : 36, heartCount: 3, bokehCount: 4, sparkleCount: 14 },
    3: { starCount: isMobile ? 40 : 80, particleCount: isMobile ? 10 : 20, heartCount: 3, bokehCount: 3, sparkleCount: 6 },
    4: { starCount: isMobile ? 40 : 80, particleCount: isMobile ? 10 : 20, heartCount: 3, bokehCount: 3, sparkleCount: 6 },
    5: { starCount: isMobile ? 48 : 95, particleCount: isMobile ? 15 : 30, heartCount: 4, bokehCount: 6, sparkleCount: 8 },
    6: { starCount: isMobile ? 38 : 75, particleCount: isMobile ? 9 : 18, heartCount: 3, bokehCount: 3, sparkleCount: 5 },
    7: { starCount: isMobile ? 35 : 70, particleCount: isMobile ? 11 : 22, heartCount: 3, bokehCount: 3, sparkleCount: 7 },
    8: { starCount: isMobile ? 42 : 85, particleCount: isMobile ? 13 : 25, heartCount: 4, bokehCount: 4, sparkleCount: 9 },
    9: { starCount: isMobile ? 45 : 90, particleCount: isMobile ? 12 : 24, heartCount: 3, bokehCount: 4, sparkleCount: 7 },
    10: { starCount: isMobile ? 65 : 130, particleCount: isMobile ? 20 : 40, heartCount: 6, bokehCount: 6, sparkleCount: 16 }
  };

  const activeLoops = {};

  function createStar(w, h) {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      baseAlpha: Math.random() * 0.55 + 0.08,
      speed: (Math.random() * 0.006 + 0.002) * (prefersReducedMotion ? 0.3 : 1),
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.35 ? CHAMPAGNE : WARM_IVORY
    };
  }

  function createSparkle(w, h) {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 4 + 2.5,
      life: 0,
      maxLife: Math.random() * 140 + 90,
      delay: Math.random() * 200,
      color: CHAMPAGNE
    };
  }

  function createParticle(w, h) {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.8,
      vx: (Math.random() - 0.5) * 0.14 * (prefersReducedMotion ? 0.3 : 1),
      vy: -(Math.random() * 0.20 + 0.06) * (prefersReducedMotion ? 0.3 : 1),
      wobbleSpeed: (Math.random() * 0.012 + 0.004) * (prefersReducedMotion ? 0.3 : 1),
      wobbleAmp: Math.random() * 10 + 4,
      phase: Math.random() * Math.PI * 2,
      baseAlpha: Math.random() * 0.30 + 0.10,
      color: Math.random() > 0.45 ? CHAMPAGNE : (Math.random() > 0.5 ? WARM_IVORY : WINE)
    };
  }

  function createHeart(w, h) {
    return {
      x: Math.random() * w,
      y: h + Math.random() * 150,
      size: Math.random() * 5 + 6,
      vy: -(Math.random() * 0.18 + 0.06) * (prefersReducedMotion ? 0.3 : 1),
      wobbleSpeed: (Math.random() * 0.010 + 0.003) * (prefersReducedMotion ? 0.3 : 1),
      wobbleAmp: Math.random() * 12 + 4,
      phase: Math.random() * Math.PI * 2,
      baseAlpha: Math.random() * 0.16 + 0.05,
      color: Math.random() > 0.25 ? WARM_IVORY : CHAMPAGNE
    };
  }

  function createBokeh(w, h) {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 28 + 18,
      vx: (Math.random() - 0.5) * 0.06 * (prefersReducedMotion ? 0.3 : 1),
      vy: (Math.random() - 0.5) * 0.06 * (prefersReducedMotion ? 0.3 : 1),
      alpha: Math.random() * 0.06 + 0.02,
      color: Math.random() > 0.4 ? CHAMPAGNE : WINE
    };
  }

  function drawHeartPath(ctx, x, y, size) {
    ctx.beginPath();
    const h = size * 0.3;
    ctx.moveTo(x, y + h);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + h);
    ctx.bezierCurveTo(x - size / 2, y + (size + h) / 2, x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + h) / 2, x + size / 2, y + h);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + h);
    ctx.closePath();
  }

  function startCanvas(canvasId, pageNum, extraDrawCallback) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const cfg = PAGE_CONFIGS[pageNum] || PAGE_CONFIGS[1];

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: cfg.starCount }, () => createStar(w, h));
    const sparkles = Array.from({ length: cfg.sparkleCount || 8 }, () => createSparkle(w, h));
    const particles = Array.from({ length: cfg.particleCount }, () => createParticle(w, h));
    const hearts = Array.from({ length: cfg.heartCount }, () => createHeart(w, h));
    const bokehs = Array.from({ length: cfg.bokehCount }, () => createBokeh(w, h));

    function handleResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    function loop() {
      const isGlobal = canvasId === 'globalCanvas';
      const pageEl = document.getElementById(`page${pageNum}`);
      
      if (!isGlobal && pageEl && !pageEl.classList.contains('active')) {
        activeLoops[canvasId] = requestAnimationFrame(loop);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.001;

      // 1. Atmospheric Ambient Soft Glow
      const isFinalPage = pageNum === 10;
      const glowGrad = ctx.createRadialGradient(w * 0.5, h * 0.4, 10, w * 0.5, h * 0.4, w * (isFinalPage ? 0.75 : 0.65));
      const pulseAlpha = (Math.sin(t * 0.3) * 0.03 + (isFinalPage ? 0.09 : 0.06)) * (prefersReducedMotion ? 0.5 : 1);
      glowGrad.addColorStop(0, `rgba(${BURGUNDY}, ${pulseAlpha})`);
      glowGrad.addColorStop(0.5, `rgba(${WINE}, ${pulseAlpha * 0.5})`);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Soft Bokeh Light Dust
      bokehs.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -40) b.x = w + 40;
        if (b.x > w + 40) b.x = -40;
        if (b.y < -40) b.y = h + 40;
        if (b.y > h + 40) b.y = -40;

        const bGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        bGrad.addColorStop(0, `rgba(${b.color}, ${b.alpha})`);
        bGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Twinkling Stars ✨
      stars.forEach(s => {
        const twinkle = Math.sin(t * s.speed * 10 + s.phase) * 0.45 + 0.55;
        const currentAlpha = Math.max(0.04, Math.min(0.95, s.baseAlpha * twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${currentAlpha.toFixed(3)})`;
        ctx.fill();

        // Subtle outer glow for larger stars
        if (s.r > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color}, ${(currentAlpha * 0.25).toFixed(3)})`;
          ctx.fill();
        }
      });

      // 4. Occasional Champagne Sparkles 🌟
      sparkles.forEach((sp, idx) => {
        if (sp.delay > 0) {
          sp.delay--;
          return;
        }
        sp.life++;
        const halfLife = sp.maxLife / 2;
        let spAlpha = 0;
        if (sp.life <= halfLife) {
          spAlpha = (sp.life / halfLife) * 0.7;
        } else {
          spAlpha = (1 - (sp.life - halfLife) / halfLife) * 0.7;
        }

        if (sp.life >= sp.maxLife) {
          sparkles[idx] = createSparkle(w, h);
          return;
        }

        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.strokeStyle = `rgba(${CHAMPAGNE}, ${spAlpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-sp.size, 0); ctx.lineTo(sp.size, 0);
        ctx.moveTo(0, -sp.size); ctx.lineTo(0, sp.size);
        ctx.stroke();
        ctx.restore();
      });

      // 5. Floating Particles ✨
      particles.forEach(p => {
        p.y += p.vy;
        p.phase += p.wobbleSpeed;
        const currentX = p.x + Math.sin(p.phase) * p.wobbleAmp;

        if (p.y < -20) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }

        ctx.beginPath();
        ctx.arc(currentX, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha.toFixed(3)})`;
        ctx.fill();

        // Subtle glowing dust aura
        if (p.r > 1.4) {
          ctx.beginPath();
          ctx.arc(currentX, p.y, p.r * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${CHAMPAGNE}, ${(p.baseAlpha * 0.2).toFixed(3)})`;
          ctx.fill();
        }
      });

      // 6. Subtle Floating Hearts 🤍
      hearts.forEach(hItem => {
        hItem.y += hItem.vy;
        hItem.phase += hItem.wobbleSpeed;
        const currentX = hItem.x + Math.sin(hItem.phase) * hItem.wobbleAmp;

        if (hItem.y < -30) {
          hItem.y = h + 30;
          hItem.x = Math.random() * w;
        }

        ctx.save();
        ctx.fillStyle = `rgba(${hItem.color}, ${hItem.baseAlpha.toFixed(3)})`;
        drawHeartPath(ctx, currentX, hItem.y, hItem.size);
        ctx.fill();
        ctx.restore();
      });

      // 7. Custom Page-Specific Overlay Render (Sparks, Fireworks, Confetti)
      if (typeof extraDrawCallback === 'function') {
        extraDrawCallback(ctx, w, h, t);
      }

      activeLoops[canvasId] = requestAnimationFrame(loop);
    }

    if (activeLoops[canvasId]) {
      cancelAnimationFrame(activeLoops[canvasId]);
    }
    loop();
  }

  return {
    startCanvas,
    PAGE_CONFIGS
  };
})();

// ============================================================
// GLOBAL STARS
// ============================================================
function initGlobalStars() {
  const canvas = document.getElementById('globalCanvas');
  if (canvas) {
    canvas.style.display = 'block';
    GlobalAtmosphereSystem.startCanvas('globalCanvas', currentPage);
  }
}

// ============================================================
// GLOBAL FLOATING HEARTS ATMOSPHERE
// Small warm ivory/champagne hearts drifting upward behind all content
// ============================================================
let globalHearts = [];
let heartsAnimationId = null;

function initFloatingHearts() {
  const container = document.getElementById('floatingHeartsContainer');
  if (!container) return;

  const isMobile = window.innerWidth <= 768;
  const HEART_COUNT = isMobile ? 4 : 8; // Desktop: 8 hearts, Mobile: 4 hearts

  const COLORS = ['#F5EBDD', '#F5EBDD', '#D8B878', '#EAD8B8', '#F5EBDD'];
  const GLOW_COLORS = ['rgba(245, 235, 221, 0.6)', 'rgba(216, 184, 120, 0.5)', 'rgba(245, 235, 221, 0.4)'];
  const SVG_HEART = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

  container.innerHTML = '';
  globalHearts = [];

  const h = window.innerHeight;

  for (let i = 0; i < HEART_COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'fh';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = SVG_HEART;

    const isLarge = Math.random() < 0.15;
    const size = isLarge 
      ? (17 + Math.random() * 2) 
      : (isMobile ? (9 + Math.random() * 5) : (10 + Math.random() * 6));

    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const glowColor = GLOW_COLORS[Math.floor(Math.random() * GLOW_COLORS.length)];
    const glowSize = (3 + Math.random() * 3).toFixed(1) + 'px';

    el.style.position = 'fixed';
    el.style.width = `${size.toFixed(1)}px`;
    el.style.height = `${size.toFixed(1)}px`;
    el.style.color = color;
    el.style.filter = `drop-shadow(0 0 ${glowSize} ${glowColor})`;
    el.style.pointerEvents = 'none';
    el.style.willChange = 'transform, opacity';
    el.style.display = 'block';
    el.style.visibility = 'visible';

    container.appendChild(el);

    // Initial state randomly distributed across viewport height
    globalHearts.push({
      el,
      x: 4 + Math.random() * 88, // 4% to 92% horizontal position
      y: Math.random() * (h + 60) - 30, // distributed across screen height immediately
      speed: 0.8 + Math.random() * 0.7, // 0.8 to 1.5 px/frame (~8-14s rise time)
      wobbleSpeed: 0.0015 + Math.random() * 0.002,
      wobbleAmp: 10 + Math.random() * 18,
      phase: Math.random() * Math.PI * 2,
      size
    });
  }

  if (heartsAnimationId) cancelAnimationFrame(heartsAnimationId);

  function animateHearts(timestamp) {
    const screenH = window.innerHeight;
    const time = timestamp || performance.now();

    globalHearts.forEach((hObj) => {
      hObj.y -= hObj.speed;
      
      // Reset to bottom when floating off top of viewport
      if (hObj.y < -40) {
        hObj.y = screenH + 20;
        hObj.x = 4 + Math.random() * 88;
      }

      // Horizontal drift (gentle sway)
      const drift = Math.sin(time * hObj.wobbleSpeed + hObj.phase) * hObj.wobbleAmp;

      // Opacity fade-in near bottom, fade-out near top
      let opacity = 0.75;
      if (hObj.y > screenH - 80) {
        opacity = Math.max(0, (screenH - hObj.y) / 80) * 0.75;
      } else if (hObj.y < 100) {
        opacity = Math.max(0, (hObj.y + 40) / 140) * 0.75;
      }

      hObj.el.style.transform = `translate3d(${drift.toFixed(1)}px, 0, 0)`;
      hObj.el.style.left = `${hObj.x.toFixed(2)}%`;
      hObj.el.style.top = `${hObj.y.toFixed(1)}px`;
      hObj.el.style.opacity = opacity.toFixed(2);
    });

    heartsAnimationId = requestAnimationFrame(animateHearts);
  }

  heartsAnimationId = requestAnimationFrame(animateHearts);
}


// ============================================================
// PAGE 1 — MR. SOLUTION REVEAL
// ============================================================
// ============================================================
// PAGE 1 — CINEMATIC BIRTHDAY SURPRISE (ENGINE)
// ============================================================
let p1CanvasAnimationId = null;

function initPage1() {
  initP1CelestialCanvas();
}


// ---- Cinematic "20" Elegant Light Reveal ----
function triggerP1ElegantReveal20() {
  const wrap    = document.getElementById('p1BdayTitle');
  const reveal  = document.getElementById('p1TwentyReveal');
  const aura    = document.getElementById('p1TwentyGlowAura');
  const number  = document.getElementById('p1TwentyNumber');
  const sweep   = document.getElementById('p1TwentySweep');
  const heading = document.getElementById('p1BdayHeading');
  const hdgWrap = document.getElementById('p1BdayHeadingWrap');
  const hdgAura = document.getElementById('p1BdayHeadingAura');
  const hdgSweep = document.getElementById('p1BdayHeadingSweep');
  const glow    = document.getElementById('p1AmbientGlow');

  // Step 1: Show the wrap container (fades in from translateY)
  if (wrap) {
    wrap.classList.remove('hidden');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrap.classList.add('visible');
      });
    });
  }

  // Step 2: Calm moment — deepen ambient glow subtly
  if (glow) {
    glow.style.transition = 'background 1.2s ease';
    glow.style.background = 'radial-gradient(ellipse, rgba(216,184,120,0.12) 0%, rgba(59,10,26,0.45) 55%, transparent 80%)';
  }

  // Step 3: Warm Champagne aura glows in from center
  setTimeout(() => {
    if (reveal) reveal.classList.add('glow-active');
    setTimeout(() => {
      if (aura) aura.classList.add('lit');
    }, 300);
  }, 400);

  // Step 4: The "20" emerges from the warm light
  setTimeout(() => {
    if (number) number.classList.add('emerged');
  }, 900);

  // Step 5: Light sweep crosses the number once
  setTimeout(() => {
    if (sweep) sweep.classList.add('sweeping');
    const canvas = document.getElementById('canvas1');
    if (canvas) triggerP1Sparks(canvas.width / 2, canvas.height * 0.44, 18);
  }, 1600);

  // Step 6: Hold the "20" briefly then settle
  setTimeout(() => {
    if (number) {
      number.style.filter =
        'drop-shadow(0 0 10px rgba(216,184,120,0.40)) drop-shadow(0 0 22px rgba(216,184,120,0.18)) drop-shadow(0 2px 6px rgba(0,0,0,0.35))';
      number.style.transition = 'filter 1.6s ease';
    }
    if (aura) {
      aura.style.opacity = '0.55';
      aura.style.transition = 'opacity 1.6s ease';
    }
  }, 3400);

  // Step 7: "WELCOME TO YOUR 20s, ALI." — cinematic milestone reveal
  setTimeout(() => {
    if (heading) heading.classList.add('revealed');
    // Glow aura behind the heading lights up
    if (hdgAura) {
      setTimeout(() => { hdgAura.style.opacity = '1'; }, 300);
    }
    // Light sweep crosses the heading title once
    if (hdgSweep) {
      setTimeout(() => { hdgSweep.classList.add('sweeping'); }, 600);
    }
    // Sparse champagne sparkles around the heading
    if (hdgWrap) {
      setTimeout(() => _spawnHdgSparkles(hdgWrap), 700);
    }
  }, 2200);
}

// Spawn a few tiny champagne sparkle dots around the heading
function _spawnHdgSparkles(parent) {
  const positions = [
    { x: '8%',  y: '-18%' },
    { x: '88%', y: '-22%' },
    { x: '50%', y: '-28%' },
    { x: '18%', y: '110%' },
    { x: '78%', y: '115%' },
  ];
  positions.forEach((pos, idx) => {
    const s = document.createElement('div');
    s.className = 'p1-hdg-sparkle';
    const sz = (3 + Math.random() * 4).toFixed(1);
    s.style.cssText = [
      `left: ${pos.x}`,
      `top: ${pos.y}`,
      `width: ${sz}px`,
      `height: ${sz}px`,
      `--dur: ${(1.2 + Math.random() * 0.8).toFixed(1)}s`,
      `--delay: ${(idx * 0.12).toFixed(2)}s`,
    ].join(';');
    parent.appendChild(s);
    // Remove after animation
    setTimeout(() => s.remove(), 2200);
  });
}



function initP1CelestialCanvas() {
  window.p1Sparks = [];
  GlobalAtmosphereSystem.startCanvas('canvas1', 1, (ctx, width, height, t) => {
    // Draw Celebration Sparks
    if (window.p1Sparks && window.p1Sparks.length > 0) {
      for (let i = window.p1Sparks.length - 1; i >= 0; i--) {
        const sp = window.p1Sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.012;
        if (sp.alpha <= 0) {
          window.p1Sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fillStyle = sp.color ? sp.color.replace('ALPHA', sp.alpha) : `rgba(216, 184, 120, ${sp.alpha})`;
        ctx.fill();
      }
    }
  });
}

// Trigger celebratory particle explosion
function triggerP1Sparks(x, y, count = 35) {
  const colors = [
    'rgba(240, 225, 194, ALPHA)',
    'rgba(107, 20, 45, ALPHA)',
    'rgba(255, 255, 255, ALPHA)'
  ];
  for (let i = 0; i< count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    window.p1Sparks.push({
      x: x || window.innerWidth / 2,
      y: y || window.innerHeight / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: Math.random() * 2.5 + 1,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

// Main Multi-Stage Story Timeline (Refined Smooth Pacing)
function startPage1Sequence() {
  const p1 = document.getElementById('p1Phase1');
  const p2 = document.getElementById('p1Phase2');
  const p3 = document.getElementById('p1Phase3');
  const p4 = document.getElementById('p1Phase4');
  const p5 = document.getElementById('p1Phase5');
  const glow = document.getElementById('p1AmbientGlow');

  // --- STAGE 1: Opening Reflection ---
  const s1Lines = ['p1-p1-l1', 'p1-p1-l2', 'p1-p1-l3', 'p1-p1-l4'];
  const s1Delays = [100, 1600, 3100, 4600];

  s1Lines.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('visible');
    }, s1Delays[i]);
  });

  // End Stage 1 -> Fade Out & Seamlessly Show Stage 2
  setTimeout(() => {
    if (p1) {
      p1.style.opacity = '0';
      p1.style.transform = 'translateY(-20px)';
      p1.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      setTimeout(() => p1.classList.add('hidden'), 600);
    }
  }, 6800);

  // --- STAGE 2: Birthday Transition & Particle "20" Visual Event ---
  setTimeout(() => {
    if (p2) p2.classList.remove('hidden');
    if (glow) glow.classList.add('bday-glow');

    // Line 1: "But today isn't just another day."
    setTimeout(() => {
      const l1 = document.getElementById('p1-p2-l1');
      if (l1) l1.classList.add('visible');
    }, 150);

    // Line 2: "Someone special is turning 20."
    setTimeout(() => {
      const l2 = document.getElementById('p1-p2-l2');
      if (l2) l2.classList.add('visible');
    }, 1400);


    // Step: Trigger the new elegant DOM-based "20" cinematic reveal
    setTimeout(() => {
      triggerP1ElegantReveal20();
    }, 2600);

    // The heading "WELCOME TO YOUR 20s, ALI." is revealed internally
    // by triggerP1ElegantReveal20() at +4200ms from its call (~6800ms from stage 2 start)


  }, 7200);

  // End Stage 2 -> Seamless Fade Out
  // Extended so "WELCOME TO YOUR 20s, ALI." is comfortably visible before transition
  setTimeout(() => {
    if (p2) {
      p2.style.opacity = '0';
      p2.style.transform = 'translateY(-20px)';
      p2.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      setTimeout(() => p2.classList.add('hidden'), 600);
    }
  }, 17200);

  // --- STAGE 3: Nickname Setup ---
  setTimeout(() => {
    if (p3) p3.classList.remove('hidden');
    if (glow) glow.classList.remove('bday-glow');

    setTimeout(() => {
      const l1 = document.getElementById('p1-p3-l1');
      if (l1) l1.classList.add('visible');
    }, 150);

    setTimeout(() => {
      const l2 = document.getElementById('p1-p3-l2');
      if (l2) l2.classList.add('visible');
    }, 1300);

    setTimeout(() => {
      const l3 = document.getElementById('p1-p3-l3');
      if (l3) l3.classList.add('visible');
    }, 2500);

  }, 17600);

  // End Stage 3 -> Seamless Fade Out
  setTimeout(() => {
    if (p3) {
      p3.style.opacity = '0';
      p3.style.transform = 'translateY(-20px)';
      p3.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      setTimeout(() => p3.classList.add('hidden'), 600);
    }
  }, 21200);

  // --- STAGE 4: MR. SOLUTION Cinematic Light Sweep Reveal ---
  setTimeout(() => {
    if (p4) p4.classList.remove('hidden');
    if (glow) glow.classList.add('title-glow');

    const container = document.getElementById('p1TitleContainer');
    const beam = document.getElementById('p1LightBeam');
    const chars = document.querySelectorAll('#p1HeroTitle .p1-char-reveal');

    if (container) container.classList.add('visible');
    if (beam) beam.classList.add('sweeping');

    const charDelayStep = 140;
    chars.forEach((c, idx) => {
      setTimeout(() => {
        c.classList.add('illuminated');
      }, 200 + idx * charDelayStep);
    });

    setTimeout(() => {
      triggerP1Sparks(window.innerWidth / 2, window.innerHeight * 0.45, 60);
    }, 200 + chars.length * charDelayStep + 150);

  }, 21800);

  // --- STAGE 5: Personal Signature Quote & Action CTA Button ---
  setTimeout(() => {
    if (p5) p5.classList.remove('hidden');

    setTimeout(() => {
      const l1 = document.getElementById('p1-p5-l1');
      if (l1) l1.classList.add('visible');
    }, 150);

    setTimeout(() => {
      const l2 = document.getElementById('p1-p5-l2');
      if (l2) l2.classList.add('visible');
    }, 1100);

    setTimeout(() => {
      const qCard = document.getElementById('p1QuoteCard');
      if (qCard) qCard.classList.add('visible');
    }, 2000);

    // Reveal ENTER THE SURPRISE Button right under quote card!
    setTimeout(() => {
      const cta = document.getElementById('p1CtaWrap');
      if (cta) cta.classList.add('visible');
    }, 2700);

  }, 24500);
}

// Button Click Transition
function handleP1Enter() {
  const toast = document.getElementById('p1Toast');
  if (toast) toast.classList.add('visible');

  setTimeout(() => {
    goToPage(2);
    if (toast) toast.classList.remove('visible');
  }, 700);
}

// ============================================================
// PAGE 2 — BIRTHDAY CELEBRATION (ENGINE & INTERACTIVITY)
// ============================================================
// ============================================================
// PAGE 2 — BIRTHDAY CELEBRATION (ENGINE & INTERACTIVITY)
// ============================================================
let p2CakeAlreadyCut = false;
let p2StarBoost = 0;
let p2SkyFlashAlpha = 0;
window.p2Sparks = [];
window.p2Confetti = [];
window.p2Fireworks = [];
window.p2Rockets = [];

function initPage2() {
  p2CakeAlreadyCut = false;
  p2StarBoost = 0;
  p2SkyFlashAlpha = 0;
  window.p2Sparks = [];
  window.p2Confetti = [];
  window.p2Fireworks = [];
  window.p2Rockets = [];

  // Reset DOM states if re-entered
  const qStage = document.getElementById('p2QuestionPhase');
  const cStage = document.getElementById('p2CelebrationPhase');
  const choices = document.getElementById('p2InitialChoices');
  const noBox = document.getElementById('p2NoReactionBox');
  const bdayTitle = document.getElementById('p2BdayTitleWrap');
  const cakeWrap = document.getElementById('p2CakeWrapper');
  const cakeContainer = document.getElementById('p2CakeContainer');
  const cakeAura = document.getElementById('p2CakeAura');
  const wishText = document.getElementById('p2WishText');
  const cutWrap = document.getElementById('p2CutBtnWrap');
  const cutBtn = document.getElementById('p2CutBtn');
  const duaCard = document.getElementById('p2DuaCard');
  const continueWrap = document.getElementById('p2ContinueWrap');

  if (qStage) {
    qStage.classList.remove('hidden');
    qStage.style.opacity = '1';
    qStage.style.transform = 'scale(1)';
  }
  if (cStage) cStage.classList.add('hidden');
  if (choices) choices.classList.remove('hidden');
  if (noBox) noBox.classList.add('hidden');
  if (bdayTitle) bdayTitle.classList.remove('visible');
  if (cakeWrap) cakeWrap.classList.remove('visible');
  if (cakeContainer) cakeContainer.classList.remove('blowing', 'blown', 'cut');
  if (cakeAura) cakeAura.classList.remove('glow-boost');
  if (wishText) wishText.classList.remove('visible');
  if (cutWrap) {
    cutWrap.classList.remove('hidden', 'visible');
    cutWrap.style.opacity = '';
    cutWrap.style.transform = '';
  }
  if (cutBtn) cutBtn.disabled = false;
  if (duaCard) {
    duaCard.classList.add('hidden');
    duaCard.classList.remove('visible');
  }
  if (continueWrap) {
    continueWrap.classList.add('hidden');
    continueWrap.classList.remove('visible');
  }

  initP2Canvas();
  initP2Balloons();
  startP2QuestionSequence();
}

function initP2Canvas() {
  GlobalAtmosphereSystem.startCanvas('canvas2', 2, (ctx, width, height, t) => {
    // Star Boost Decay
    if (p2StarBoost > 0) {
      p2StarBoost -= 0.008;
      if (p2StarBoost < 0) p2StarBoost = 0;
    }

    // 0. Ambient Sky Illumination Flash on Explosion
    if (p2SkyFlashAlpha > 0.003) {
      const flashGrad = ctx.createRadialGradient(width * 0.5, height * 0.35, 0, width * 0.5, height * 0.35, width * 0.75);
      flashGrad.addColorStop(0, `rgba(107, 20, 45, ${(p2SkyFlashAlpha * 0.45).toFixed(3)})`);
      flashGrad.addColorStop(0.5, `rgba(245, 217, 138, ${(p2SkyFlashAlpha * 0.15).toFixed(3)})`);
      flashGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = flashGrad;
      ctx.fillRect(0, 0, width, height);
      p2SkyFlashAlpha *= 0.90;
    }

    // 1. Draw Rocket Ascent Trails
    if (window.p2Rockets && window.p2Rockets.length > 0) {
      for (let i = window.p2Rockets.length - 1; i >= 0; i--) {
        const r = window.p2Rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        for (let j = 0; j < r.trail.length - 1; j++) {
          const pt1 = r.trail[j];
          const pt2 = r.trail[j + 1];
          const trAlpha = (j / r.trail.length) * 0.75;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = `rgba(245, 235, 221, ${trAlpha})`;
          ctx.lineWidth = (j / r.trail.length) * 2.2 + 0.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        if (r.vy < 0 && r.y <= r.targetY) {
          createCinematicBurst(r.x, r.targetY, r.depth, r.type);
          p2SkyFlashAlpha = Math.min(0.22, p2SkyFlashAlpha + 0.12);
          window.p2Rockets.splice(i, 1);
        }
      }
    }

    // 2. Draw Radial Spark Trails & Glowing Heads
    if (window.p2Fireworks && window.p2Fireworks.length > 0) {
      for (let i = window.p2Fireworks.length - 1; i >= 0; i--) {
        const p = window.p2Fireworks[i];
        p.prevX = p.x;
        p.prevY = p.y;

        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;

        p.x += p.vx;
        p.y += p.vy;

        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          window.p2Fireworks.splice(i, 1);
          continue;
        }

        const safeAlpha = Math.max(0, p.alpha).toFixed(3);

        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.color.replace('ALPHA', safeAlpha);
        ctx.lineWidth = p.lineWidth;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.headSize * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${(safeAlpha * 0.85).toFixed(3)})`;
        ctx.fill();
      }
    }

    // 3. Draw Confetti
    if (window.p2Confetti && window.p2Confetti.length > 0) {
      for (let i = window.p2Confetti.length - 1; i >= 0; i--) {
        const c = window.p2Confetti[i];
        c.x += c.vx; c.y += c.vy;
        c.vy += c.gravity; c.vx *= 0.98;
        c.rotation += c.rotSpeed;
        c.alpha -= 0.01;
        if (c.alpha <= 0) {
          window.p2Confetti.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        ctx.globalAlpha = c.alpha;
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      }
    }

    // 4. Draw Celebration Sparks
    if (window.p2Sparks && window.p2Sparks.length > 0) {
      for (let i = window.p2Sparks.length - 1; i >= 0; i--) {
        const sp = window.p2Sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.014;
        if (sp.alpha <= 0) {
          window.p2Sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fillStyle = sp.color.replace('ALPHA', sp.alpha);
        ctx.fill();
      }
    }
  });
}

function initP2Balloons() {
  const container = document.getElementById('p2BalloonsLayer');
  if (!container) return;
  container.innerHTML = '';

  const isMobile = window.innerWidth<= 768;
  const count = isMobile ? 4 : 7;
  const balloonTypes = ['blue', 'silver', 'pearl', 'sapphire'];

  for (let i = 0; i< count; i++) {
    const item = document.createElement('div');
    item.className = 'p2-balloon-item';

    const type = balloonTypes[i % balloonTypes.length];
    const isLeft = i % 2 === 0;

    let posX;
    if (isMobile) {
      posX = isLeft ? (2 + i * 2) : (92 - i * 2);
    } else {
      posX = isLeft ? (3 + (i * 5) % 15) : (80 + (i * 5) % 15);
    }

    const scale = 0.75 + Math.random() * 0.35;
    const delay = Math.random() * 8;
    const duration = 16 + Math.random() * 8;
    const initialRotation = -10 + Math.random() * 20;

    item.style.left = `${posX}%`;
    item.style.transform = `scale(${scale}) rotate(${initialRotation}deg)`;
    item.style.animationDelay = `${delay}s`;
    item.style.animationDuration = `${duration}s`;

    item.innerHTML = getRealisticBalloonSVG(type, i);
    container.appendChild(item);
  }
}

function getRealisticBalloonSVG(type, id) {
  let gradDefs = '';

  if (type === 'blue') {
    gradDefs = `
<radialGradient id="gradBlue_${id}" cx="35%" cy="30%" r="65%">
<stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
<stop offset="18%" stop-color="#A83254"/>
<stop offset="55%" stop-color="#6B142D"/>
<stop offset="85%" stop-color="#3B0A1A"/>
<stop offset="100%" stop-color="#15030A"/>
</radialGradient>`;
  } else if (type === 'silver') {
    gradDefs = `
<radialGradient id="gradSilver_${id}" cx="35%" cy="30%" r="65%">
<stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
<stop offset="20%" stop-color="#FAF6EE"/>
<stop offset="60%" stop-color="#F0E1C2"/>
<stop offset="90%" stop-color="#D4C9B8"/>
<stop offset="100%" stop-color="#5C4D38"/>
</radialGradient>`;
  } else if (type === 'pearl') {
    gradDefs = `
<radialGradient id="gradPearl_${id}" cx="35%" cy="30%" r="65%">
<stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.98"/>
<stop offset="25%" stop-color="#FAF6EE"/>
<stop offset="65%" stop-color="#E6D2A7"/>
<stop offset="95%" stop-color="#B8A482"/>
<stop offset="100%" stop-color="#3B2E1C"/>
</radialGradient>`;
  } else {
    gradDefs = `
<radialGradient id="gradSapphire_${id}" cx="35%" cy="30%" r="65%">
<stop offset="0%" stop-color="#F5D0DC" stop-opacity="0.85"/>
<stop offset="20%" stop-color="#9C2449"/>
<stop offset="60%" stop-color="#6B142D"/>
<stop offset="90%" stop-color="#2D0612"/>
<stop offset="100%" stop-color="#0F0206"/>
</radialGradient>`;
  }

  const fillUrl = `url(#grad${type.charAt(0).toUpperCase() + type.slice(1)}_${id})`;
  const knotColor = (type === 'silver' || type === 'pearl') ? '#5C4D38' : '#3B0A1A';
  const knotCap = (type === 'silver' || type === 'pearl') ? '#F0E1C2' : '#6B142D';

  return `
<svg class="real-balloon-svg" viewBox="0 0 100 160" width="80" height="128" aria-hidden="true">
<defs>
        ${gradDefs}
<filter id="balloonShadow_${id}" x="-25%" y="-25%" width="150%" height="150%">
<feDropShadow dx="3" dy="10" stdDeviation="6" flood-color="#000000" flood-opacity="0.45"/>
</filter>
</defs>

<!-- Dangling Curved String -->
<path d="M50,94 Q44,114 56,132 T46,156" fill="none" stroke="rgba(221, 231, 240, 0.45)" stroke-width="1.3" stroke-linecap="round"/>

<!-- Knot -->
<path d="M44,94 L56,94 L58,100 L42,100 Z" fill="${knotColor}" opacity="0.95"/>
<ellipse cx="50" cy="94" rx="5" ry="2" fill="${knotCap}"/>

<!-- Inflated Party Balloon Silhouette -->
<path d="M 50,4
               C 74,4 90,24 90,48
               C 90,72 68,90 53,94
               L 47,94
               C 32,90 10,72 10,48
               C 10,24 26,4 50,4 Z"
            fill="${fillUrl}" filter="url(#balloonShadow_${id})"/>

<!-- Upper-Left Surface Specular Highlight -->
<ellipse cx="34" cy="24" rx="9" ry="14" transform="rotate(-22 34 24)" fill="#FFFFFF" opacity="0.5" />
<ellipse cx="27" cy="36" rx="3" ry="5" transform="rotate(-22 27 36)" fill="#FFFFFF" opacity="0.35" />
</svg>
  `;
}

function startP2QuestionSequence() {
  const l1 = document.getElementById('p2-q-l1');
  const l2 = document.getElementById('p2-q-l2');
  const l3 = document.getElementById('p2-q-l3');
  const choices = document.getElementById('p2InitialChoices');

  setTimeout(() => { if (l1) l1.classList.add('visible'); }, 300);
  setTimeout(() => { if (l2) l2.classList.add('visible'); }, 2200);
  setTimeout(() => { if (l3) l3.classList.add('visible'); }, 4200);
  setTimeout(() => { if (choices) choices.classList.add('visible'); }, 5800);
}

function p2AnswerNo() {
  const choices = document.getElementById('p2InitialChoices');
  const noBox = document.getElementById('p2NoReactionBox');
  if (choices) choices.classList.add('hidden');
  if (noBox) {
    noBox.classList.remove('hidden');
    noBox.style.animation = 'none';
    void noBox.offsetWidth; // trigger reflow
    noBox.style.animation = 'boxShake 0.5s ease-in-out';
  }
}

// 1. User clicks YES / SHOW ME
function p2AnswerYes() {
  const qStage = document.getElementById('p2QuestionPhase');
  const cStage = document.getElementById('p2CelebrationPhase');
  const glow = document.getElementById('p2AmbientGlow');

  if (qStage) {
    qStage.style.opacity = '0';
    qStage.style.transform = 'scale(0.95)';
    qStage.style.transition = 'all 0.6s ease';
    setTimeout(() => qStage.classList.add('hidden'), 600);
  }

  setTimeout(() => {
    if (cStage) cStage.classList.remove('hidden');
    if (glow) glow.classList.add('bday-glow');

    // 2. Birthday celebration begins
    launchFireworks();

    // 3. Reveal: HAPPY 20TH BIRTHDAY, ALI! 🎂 (Main birthday celebration moment)
    setTimeout(() => {
      const bdayTitle = document.getElementById('p2BdayTitleWrap');
      if (bdayTitle) bdayTitle.classList.add('visible');
    }, 400);

    // 4. After HAPPY 20TH BIRTHDAY reveal, show the cake
    setTimeout(() => {
      const cakeWrap = document.getElementById('p2CakeWrapper');
      if (cakeWrap) cakeWrap.classList.add('visible');
    }, 1600);

    // 5. Show: Make a wish... 🌟
    setTimeout(() => {
      const wishText = document.getElementById('p2WishText');
      if (wishText) wishText.classList.add('visible');
    }, 2800);

    // 6. Then show interactive button: CUT THE CAKE 🎂
    setTimeout(() => {
      const cutWrap = document.getElementById('p2CutBtnWrap');
      if (cutWrap) {
        cutWrap.classList.remove('hidden');
        cutWrap.classList.add('visible');
        cutWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 3800);

  }, 700);
}

// 7 & 8. User clicks BLOW THE CANDLES 🕯️✨ -> Candle flames go OFF & celebration fireworks activate
function p2CutCake() {
  if (p2CakeAlreadyCut) return;
  p2CakeAlreadyCut = true;

  const cutBtn = document.getElementById('p2CutBtn');
  const cutBtnWrap = document.getElementById('p2CutBtnWrap');
  const cakeContainer = document.getElementById('p2CakeContainer');
  const cakeAura = document.getElementById('p2CakeAura');
  const duaCard = document.getElementById('p2DuaCard');
  const continueWrap = document.getElementById('p2ContinueWrap');

  if (cutBtn) cutBtn.disabled = true;

  // 1. Candle flames extinguishes (lights go OFF!) and smoke puffs up
  if (cakeContainer) {
    cakeContainer.classList.remove('cut');
    cakeContainer.classList.add('blowing', 'blown');
  }

  // 2. Celebration begins (fireworks, confetti, ambient lighting boost)
  setTimeout(() => {
    if (cakeAura) cakeAura.classList.add('glow-boost');
    p2StarBoost = 1.0;

    const rect = cakeContainer ? cakeContainer.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    triggerP2Sparks(cx, cy, 90);
    triggerP2Confetti(cx, cy, 120);
    if (typeof triggerP2Fireworks === 'function') {
      triggerP2Fireworks(cx, cy - 40);
    }
    reactP2Balloons();
  }, 600);

  // Hide Blow Candles button wrapper
  setTimeout(() => {
    if (cutBtnWrap) {
      cutBtnWrap.style.opacity = '0';
      cutBtnWrap.style.transform = 'translateY(10px)';
      cutBtnWrap.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      setTimeout(() => cutBtnWrap.classList.add('hidden'), 600);
    }
  }, 900);

  // 3. Reveal Dua / Birthday Wish Card
  setTimeout(() => {
    if (duaCard) {
      duaCard.classList.remove('hidden');
      void duaCard.offsetWidth; // trigger reflow
      duaCard.classList.add('visible');
      duaCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 1600);

  // 4. Reveal CONTINUE THE STORY button
  setTimeout(() => {
    if (continueWrap) {
      continueWrap.classList.remove('hidden');
      void continueWrap.offsetWidth; // trigger reflow
      continueWrap.classList.add('visible');
      continueWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 3800);
}

function reactP2Balloons() {
  const balloons = document.querySelectorAll('.p2-balloon-item');
  balloons.forEach((b, idx) => {
    setTimeout(() => {
      b.classList.add('reacting');
      setTimeout(() => b.classList.remove('reacting'), 1300);
    }, idx * 60);
  });
}

function triggerP2Sparks(x, y, count = 50) {
  const colors = [
    'rgba(245, 217, 138, ALPHA)',
    'rgba(240, 225, 194, ALPHA)',
    'rgba(255, 255, 255, ALPHA)'
  ];
  for (let i = 0; i< count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1.5;
    window.p2Sparks.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      r: Math.random() * 2.5 + 1,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function triggerP2Confetti(cx, cy, count = 75) {
  const colors = ['#F0E1C2', '#6B142D', '#FAF6EE', '#E6D2A7', '#3B0A1A', '#D4C9B8'];
  for (let i = 0; i< count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 2;
    window.p2Confetti.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: Math.random() * 10 + 4,
      h: Math.random() * 5 + 3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      alpha: 1,
      gravity: 0.15
    });
  }
}

// REALISTIC CINEMATIC FIREWORKS ENGINE (Canvas 2)
function getFireworkPalette(type) {
  switch (type) {
    case 'blue':
      return [
        'rgba(255, 255, 255, ALPHA)',
        'rgba(240, 225, 194, ALPHA)',
        'rgba(168, 50, 84, ALPHA)',
        'rgba(107, 20, 45, ALPHA)'
      ];
    case 'silver':
      return [
        'rgba(255, 255, 255, ALPHA)',
        'rgba(250, 246, 238, ALPHA)',
        'rgba(240, 225, 194, ALPHA)',
        'rgba(212, 201, 184, ALPHA)'
      ];
    case 'sapphire':
      return [
        'rgba(255, 255, 255, ALPHA)',
        'rgba(245, 208, 220, ALPHA)',
        'rgba(107, 20, 45, ALPHA)',
        'rgba(59, 10, 26, ALPHA)'
      ];
    case 'gold':
    default:
      return [
        'rgba(255, 255, 255, ALPHA)',
        'rgba(240, 225, 194, ALPHA)',
        'rgba(230, 210, 167, ALPHA)',
        'rgba(168, 50, 84, ALPHA)'
      ];
  }
}

function launchSingleRocket(targetX, targetY, depth = 'fg', type = 'blue') {
  const canvas = document.getElementById('canvas2');
  const height = canvas ? canvas.height : window.innerHeight;

  const startX = targetX + (Math.random() - 0.5) * 40;
  const startY = height + 20;

  const flightTime = 38 + Math.floor(Math.random() * 10);
  const vx = (targetX - startX) / flightTime;
  const vy = (targetY - startY) / flightTime;

  window.p2Rockets.push({
    x: startX,
    y: startY,
    targetY: targetY,
    vx: vx,
    vy: vy,
    trail: [],
    depth: depth,
    type: type
  });
}

function createCinematicBurst(x, y, depth = 'fg', type = 'blue') {
  const isMobile = window.innerWidth<= 768;
  const isBg = depth === 'bg';

  const sparkCount = isMobile ? (isBg ? 26 : 36) : (isBg ? 46 : 68);
  const baseSpeed = isBg ? (isMobile ? 2.2 : 3.0) : (isMobile ? 3.8 : 5.8);
  const maxAlpha = isBg ? 0.65 : 0.95;
  const lineScale = isBg ? 1.0 : 1.7;
  const palette = getFireworkPalette(type);

  for (let i = 0; i< sparkCount; i++) {
    const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.22;
    const speedMult = Math.random()< 0.25 ? (0.4 + Math.random() * 0.3) : (0.75 + Math.random() * 0.45);
    const speed = baseSpeed * speedMult;

    window.p2Fireworks.push({
      x: x,
      y: y,
      prevX: x,
      prevY: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      drag: 0.962,
      gravity: isBg ? 0.045 : 0.065,
      alpha: maxAlpha,
      decay: 0.01 + Math.random() * 0.012,
      color: palette[Math.floor(Math.random() * palette.length)],
      lineWidth: (1.0 + Math.random() * 1.4) * lineScale,
      headSize: (1.2 + Math.random() * 1.5) * lineScale,
      depth: depth
    });
  }
}

function launchFireworks() {
  const canvas = document.getElementById('canvas2');
  if (!canvas) return;
  const width = canvas.width || window.innerWidth;
  const height = canvas.height || window.innerHeight;
  const isMobile = window.innerWidth<= 768;

  const sequence = isMobile ? [
    [0.25, 0.28, 'bg', 'blue', 0],
    [0.75, 0.22, 'fg', 'silver', 600],
    [0.50, 0.32, 'fg', 'sapphire', 1400],
    [0.20, 0.38, 'fg', 'gold', 2100]
  ] : [
    [0.18, 0.25, 'bg', 'blue', 0],
    [0.82, 0.22, 'fg', 'silver', 550],
    [0.48, 0.28, 'fg', 'sapphire', 1200],
    [0.30, 0.38, 'bg', 'gold', 1850],
    [0.70, 0.35, 'fg', 'blue', 2500],
    [0.50, 0.20, 'fg', 'silver', 3200]
  ];

  sequence.forEach(([rx, ry, depth, type, delay]) => {
    setTimeout(() => {
      launchSingleRocket(width * rx, height * ry, depth, type);
    }, delay);
  });
}

function triggerP2Fireworks(x, y) {
  launchSingleRocket(x, y - 40, 'fg', 'silver');
  setTimeout(() => {
    launchSingleRocket(x - 120, y - 60, 'bg', 'blue');
  }, 350);
  setTimeout(() => {
    launchSingleRocket(x + 120, y - 70, 'fg', 'gold');
  }, 750);
}

function launchSmallFireworks() {
  const canvas = document.getElementById('canvas2');
  if (!canvas) return;
  const width = canvas.width || window.innerWidth;
  const height = canvas.height || window.innerHeight;

  for (let i = 0; i< 3; i++) {
    setTimeout(() => {
      const rx = 0.2 + Math.random() * 0.6;
      const ry = 0.2 + Math.random() * 0.3;
      launchSingleRocket(width * rx, height * ry, 'bg', 'blue');
    }, i * 400);
  }
}

// ============================================================
// PAGE 3 — THE STORY BEHIND US (CINEMATIC FRIENDSHIP STORY)
// ============================================================
let p3CanvasAnimationId = null;
let p3SparkleParticles = [];
let p3StarGlowBoost = 1.0;

function initPage3() {
  initP3Canvas();
  animateP3Story();
}

function triggerP3SparkleBurst(x, y, count = 25, color = '#F0E1C2') {
  for (let i = 0; i< count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2.5 + 0.8;
    p3SparkleParticles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.5,
      r: Math.random() * 2.2 + 0.8,
      alpha: 1.0,
      decay: Math.random() * 0.02 + 0.012,
      color: color
    });
  }
}

function initP3Canvas() {
  p3SparkleParticles = [];
  p3StarGlowBoost = 1.0;
  GlobalAtmosphereSystem.startCanvas('canvas3', 3, (ctx, width, height, t) => {
    // Render Active Sparkle Particles (Bursts & Milestones)
    for (let i = p3SparkleParticles.length - 1; i >= 0; i--) {
      const sp = p3SparkleParticles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.alpha -= sp.decay;

      if (sp.alpha <= 0) {
        p3SparkleParticles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      ctx.fillStyle = sp.color;
      ctx.globalAlpha = Math.max(0, sp.alpha);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  });
}

function animateP3Story() {
  const sub1 = document.getElementById('p3Sub1');
  const sub2 = document.getElementById('p3Sub2');
  const line = document.getElementById('p3JourneyLine');
  const page3El = document.getElementById('page3');

  // Reset elements
  if (page3El) page3El.classList.remove('p3-bro-focus');
  if (sub1) sub1.classList.remove('visible');
  if (sub2) sub2.classList.remove('visible');
  if (line) line.style.height = '0%';

  const chapters = document.querySelectorAll('.p3-chapter');
  chapters.forEach(c => c.classList.remove('visible'));

  const finalSec = document.getElementById('p3FinalSec');
  if (finalSec) finalSec.classList.remove('visible');

  const bro1 = document.getElementById('p3Bro1');
  const bro2 = document.getElementById('p3Bro2');
  const broBeam = document.getElementById('p3BroBeam');
  const broExplain = document.getElementById('p3BroExplain');
  if (bro1) bro1.classList.remove('visible');
  if (bro2) bro2.classList.remove('visible');
  if (broBeam) broBeam.classList.remove('active');
  if (broExplain) broExplain.classList.remove('visible');

  const finalCard = document.querySelector('.p3-card-final');
  if (finalCard) finalCard.classList.remove('glow-active');

  // Sequence Start
  // 1. Subtitle 1
  setTimeout(() => {
    if (sub1) sub1.classList.add('visible');
  }, 400);

  // 2. Subtitle 2 after pause
  setTimeout(() => {
    if (sub2) sub2.classList.add('visible');
  }, 2200);

  // 3. Journey Line begins expanding down
  setTimeout(() => {
    if (line) line.style.height = '100%';
  }, 3800);

  // 4. Milestone & Chapter Observer
  const observerOptions = { threshold: 0.2 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Node milestone sparkle burst
        const node = entry.target.querySelector('.p3-node');
        if (node) {
          node.classList.add('node-pulse');
          const rect = node.getBoundingClientRect();
          triggerP3SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20, '#F5D98A');
        }

        // Specific Chapter 3 BRO animation & focus background
        if (entry.target.id === 'p3Ch3') {
          if (page3El) page3El.classList.add('p3-bro-focus');

          setTimeout(() => {
            if (bro1) bro1.classList.add('visible');
          }, 300);

          setTimeout(() => {
            if (broBeam) broBeam.classList.add('active');
          }, 1100);

          setTimeout(() => {
            if (bro2) bro2.classList.add('visible');
            const bro2El = document.getElementById('p3Bro2');
            if (bro2El) {
              const r = bro2El.getBoundingClientRect();
              triggerP3SparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 35, '#F5D98A');
            }
          }, 1800);

          setTimeout(() => {
            if (broExplain) broExplain.classList.add('visible');
          }, 2800);
        }

        // Specific Chapter 5 BEST FRIENDS reveal boost
        if (entry.target.id === 'p3Ch5') {
          if (finalCard) finalCard.classList.add('glow-active');
          const bfTitle = entry.target.querySelector('.p3-bf-title');
          if (bfTitle) {
            const r = bfTitle.getBoundingClientRect();
            triggerP3SparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 50, '#FFFFFF');
            p3StarGlowBoost = 1.6;
            setTimeout(() => { p3StarGlowBoost = 1.0; }, 2200);
          }
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  chapters.forEach(ch => observer.observe(ch));
  if (finalSec) observer.observe(finalSec);

  // Fallback timed trigger for chapters
  chapters.forEach((ch, idx) => {
    setTimeout(() => {
      ch.classList.add('visible');
      const node = ch.querySelector('.p3-node');
      if (node) {
        node.classList.add('node-pulse');
        const rect = node.getBoundingClientRect();
        triggerP3SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18, '#F5D98A');
      }

      if (ch.id === 'p3Ch3') {
        if (page3El) page3El.classList.add('p3-bro-focus');
        setTimeout(() => { if (bro1) bro1.classList.add('visible'); }, 300);
        setTimeout(() => { if (broBeam) broBeam.classList.add('active'); }, 1100);
        setTimeout(() => {
          if (bro2) bro2.classList.add('visible');
          const bro2El = document.getElementById('p3Bro2');
          if (bro2El) {
            const r = bro2El.getBoundingClientRect();
            triggerP3SparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 30, '#F5D98A');
          }
        }, 1800);
        setTimeout(() => { if (broExplain) broExplain.classList.add('visible'); }, 2800);
      }

      if (ch.id === 'p3Ch5') {
        if (finalCard) finalCard.classList.add('glow-active');
        const bfTitle = ch.querySelector('.p3-bf-title');
        if (bfTitle) {
          const r = bfTitle.getBoundingClientRect();
          triggerP3SparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 45, '#FFFFFF');
          p3StarGlowBoost = 1.6;
          setTimeout(() => { p3StarGlowBoost = 1.0; }, 2200);
        }
      }
    }, 4200 + idx * 1400);
  });

  setTimeout(() => {
    if (finalSec) finalSec.classList.add('visible');
  }, 4200 + chapters.length * 1400 + 1000);
}

// ============================================================
// PAGE 4 — THE THINGS I NOTICE (CINEMATIC DISCOVERY)
// ============================================================
let p4CanvasAnimationId = null;
let p4SparkleParticles = [];
let p4StarGlowBoost = 1.0;
let p4CurrentQualityIndex = -1;
let p4AutoTimer = null;
let p4IsFinished = false;

const P4_QUALITIES = [
  {
    num: "QUALITY 01 / 06",
    icon: "🧩",
    title: "A PROBLEM SOLVER",
    text: '"When I don\'t know what to do, you somehow make the problem feel solvable."',
    color: "#F0E1C2"
  },
  {
    num: "QUALITY 02 / 06",
    icon: "🔥",
    title: "YOU DON'T GIVE UP",
    text: '"Even when something doesn\'t make sense at first, you keep trying instead of giving up."',
    color: "#E6D2A7"
  },
  {
    num: "QUALITY 03 / 06",
    icon: "💼",
    title: "YOU TAKE YOUR WORK SERIOUSLY",
    text: '"Your dedication towards your work is something I genuinely admire."',
    color: "#FAF6EE"
  },
  {
    num: "QUALITY 04 / 06",
    icon: "🧭",
    title: "A GUIDE",
    text: '"You don\'t just give an answer—you explain things until they actually make sense."',
    color: "#F0E1C2"
  },
  {
    num: "QUALITY 05 / 06",
    icon: "🤍",
    title: "YOU CARE",
    text: '"You notice when something is bothering me and take the time to help me understand it."',
    color: "#FFFFFF"
  },
  {
    num: "QUALITY 06 / 06",
    icon: "💡",
    title: "YOU MAKE ME THINK DIFFERENTLY",
    text: '"You encourage me to take initiative, explore things and not be afraid of trying."',
    color: "#FFE8A3"
  }
];

function triggerP4SparkleBurst(x, y, count = 25, color = '#F0E1C2') {
  for (let i = 0; i< count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2.8 + 0.8;
    p4SparkleParticles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.4,
      r: Math.random() * 2.4 + 0.8,
      alpha: 1.0,
      decay: Math.random() * 0.02 + 0.012,
      color: color
    });
  }
}

function initPage4() {
  initP4Canvas();
  animateP4Story();
}

function initP4Canvas() {
  p4SparkleParticles = [];
  p4StarGlowBoost = 1.0;
  GlobalAtmosphereSystem.startCanvas('canvas4', 4, (ctx, width, height, t) => {
    // Sparkles
    for (let i = p4SparkleParticles.length - 1; i >= 0; i--) {
      const sp = p4SparkleParticles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.alpha -= sp.decay;

      if (sp.alpha <= 0) {
        p4SparkleParticles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      ctx.fillStyle = sp.color;
      ctx.globalAlpha = Math.max(0, sp.alpha);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  });
}

function animateP4Story() {
  p4CurrentQualityIndex = -1;
  p4IsFinished = false;
  if (p4AutoTimer) clearTimeout(p4AutoTimer);

  const sub1 = document.getElementById('p4Sub1');
  const sub2 = document.getElementById('p4Sub2');
  const centerPoint = document.getElementById('p4CenterPoint');
  const qualityDisplay = document.getElementById('p4QualityDisplay');
  const ring = document.getElementById('p4ConvergenceRing');
  const msReveal = document.getElementById('p4MrSolutionReveal');
  const finalMsg = document.getElementById('p4FinalMessage');

  // Reset states
  if (sub1) sub1.classList.remove('visible');
  if (sub2) sub2.classList.remove('visible');
  if (centerPoint) centerPoint.classList.remove('visible');
  if (qualityDisplay) qualityDisplay.classList.remove('active');
  if (ring) { ring.classList.remove('active', 'converge'); }
  if (msReveal) msReveal.classList.remove('active');
  if (finalMsg) finalMsg.classList.remove('active');

  // Opening sequence
  setTimeout(() => { if (sub1) sub1.classList.add('visible'); }, 400);
  setTimeout(() => { if (sub2) sub2.classList.add('visible'); }, 2200);
  setTimeout(() => {
    if (centerPoint) centerPoint.classList.add('visible');
  }, 3800);

  // Start Quality Reveals
  p4AutoTimer = setTimeout(() => {
    p4ShowQuality(0);
  }, 5000);
}

function p4ShowQuality(index) {
  if (index< 0 || index >= P4_QUALITIES.length) {
    p4TriggerBuildUpAndReveal();
    return;
  }

  p4CurrentQualityIndex = index;
  const qData = P4_QUALITIES[index];

  const qualityDisplay = document.getElementById('p4QualityDisplay');
  const icon = document.getElementById('p4Icon');
  const num = document.getElementById('p4Num');
  const title = document.getElementById('p4Title');
  const text = document.getElementById('p4Text');

  if (qualityDisplay) qualityDisplay.classList.remove('active');

  setTimeout(() => {
    if (icon) icon.textContent = qData.icon;
    if (num) num.textContent = qData.num;
    if (title) title.textContent = qData.title;
    if (text) text.textContent = qData.text;

    if (qualityDisplay) {
      qualityDisplay.style.borderColor = `rgba(${index === 4 ? '255,255,255' : '245,217,138'}, 0.3)`;
      qualityDisplay.classList.add('active');

      const rect = qualityDisplay.getBoundingClientRect();
      triggerP4SparkleBurst(rect.left + rect.width / 2, rect.top + 60, 20, qData.color);
    }

    // Auto schedule next quality after reading time (5.8 seconds)
    if (p4AutoTimer) clearTimeout(p4AutoTimer);
    p4AutoTimer = setTimeout(() => {
      p4ShowQuality(index + 1);
    }, 5800);

  }, 400);
}

function p4AdvanceQuality() {
  if (p4IsFinished) return;
  if (p4CurrentQualityIndex< P4_QUALITIES.length - 1) {
    if (p4AutoTimer) clearTimeout(p4AutoTimer);
    p4ShowQuality(p4CurrentQualityIndex + 1);
  } else if (p4CurrentQualityIndex === P4_QUALITIES.length - 1) {
    if (p4AutoTimer) clearTimeout(p4AutoTimer);
    p4TriggerBuildUpAndReveal();
  }
}

function p4TriggerBuildUpAndReveal() {
  if (p4IsFinished) return;
  p4IsFinished = true;
  if (p4AutoTimer) clearTimeout(p4AutoTimer);

  const qualityDisplay = document.getElementById('p4QualityDisplay');
  const ring = document.getElementById('p4ConvergenceRing');
  const msReveal = document.getElementById('p4MrSolutionReveal');
  const finalMsg = document.getElementById('p4FinalMessage');
  const centerPoint = document.getElementById('p4CenterPoint');

  if (qualityDisplay) qualityDisplay.classList.remove('active');

  // 1. Show 6 symbols in orbiting convergence ring
  setTimeout(() => {
    if (ring) ring.classList.add('active');
    if (centerPoint) {
      const rect = centerPoint.getBoundingClientRect();
      triggerP4SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30, '#F5D98A');
    }
  }, 600);

  // 2. Converge symbols into center
  setTimeout(() => {
    if (ring) ring.classList.add('converge');
  }, 2200);

  // 3. Reveal MR. SOLUTION
  setTimeout(() => {
    if (ring) ring.classList.remove('active', 'converge');
    if (msReveal) msReveal.classList.add('active');

    const msTitle = document.getElementById('p4MsTitle');
    if (msTitle) {
      const rect = msTitle.getBoundingClientRect();
      triggerP4SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 50, '#F5D98A');
    }
    p4StarGlowBoost = 1.6;
    setTimeout(() => { p4StarGlowBoost = 1.0; }, 2400);

  }, 3600);

  // 4. Reveal Final Message Conclusion
  setTimeout(() => {
    if (finalMsg) finalMsg.classList.add('active');
  }, 6200);
}

// ============================================================
// PAGE 5 — CINEMATIC MEMORY THEATER
// ============================================================
let p5CanvasAnimationId = null;
let p5SparkleParticles = [];
let p5CurrentMemoryIndex = 0;
let p5AutoTimer = null;
let p5IsTransitioning = false;

const P5_MEMORIES = [
  {
    src: 'images/photo1.jpg',
    before1: "Let's start with your favourite one... ",
    before2: "Of course, this one had to have the first place. 🤍",
    after: "Starting with the one you like the most felt only right. "
  },
  {
    src: 'images/photo4.jpg',
    before1: "Some pictures just have their own vibe...",
    before2: "And this one definitely has it. ✨",
    after: "Some moments don't need a special reason to become memorable."
  },
  {
    src: 'images/photo6.jpg',
    before1: "Then there are the completely random moments...",
    before2: "Somehow, those are often the ones we remember. ",
    after: "A little different from the usual... and that's exactly why it belongs here."
  },
  {
    src: 'images/photo3.jpg',
    before1: "Okay... this one has a different kind of vibe. 🖤",
    before2: "Calm. Confident. Completely you.",
    after: "This one simply had to make the collection."
  },
  {
    src: 'images/photo2.jpg',
    before1: "Formal mode: activated. ",
    before2: "Okay... I had to include this one.",
    after: "Definitely a different side of the collection. ✨"
  },
  {
    src: 'images/photo10.jpg',
    before1: "And finally... one last memory.",
    before2: "Because every little collection deserves a proper ending. 🤍",
    after: "And somehow, this felt like the right one to end with."
  }
];

function triggerP5SparkleBurst(x, y, count = 25, color = '#F0E1C2') {
  for (let i = 0; i< count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2.8 + 0.8;
    p5SparkleParticles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.4,
      r: Math.random() * 2.4 + 0.8,
      alpha: 1.0,
      decay: Math.random() * 0.02 + 0.012,
      color: color
    });
  }
}

function initPage5() {
  initP5Canvas();
  animateP5Story();
}

function initP5Canvas() {
  p5SparkleParticles = [];
  GlobalAtmosphereSystem.startCanvas('canvas5', 5, (ctx, width, height, t) => {
    // Sparkles
    for (let i = p5SparkleParticles.length - 1; i >= 0; i--) {
      const sp = p5SparkleParticles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.alpha -= sp.decay;

      if (sp.alpha <= 0) {
        p5SparkleParticles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      ctx.fillStyle = sp.color;
      ctx.globalAlpha = Math.max(0, sp.alpha);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  });
}

function animateP5Story() {
  p5CurrentMemoryIndex = 0;
  p5IsTransitioning = false;
  if (p5AutoTimer) clearTimeout(p5AutoTimer);

  const sub1 = document.getElementById('p5Sub1');
  const sub2 = document.getElementById('p5Sub2');
  const stage = document.getElementById('p5Stage');
  const finalSec = document.getElementById('p5FinalSec');

  // Reset visibility
  if (sub1) sub1.classList.add('visible');
  if (sub2) sub2.classList.add('visible');

  if (stage) {
    stage.style.display = 'flex';
    stage.classList.add('active');
  }

  if (finalSec) {
    finalSec.classList.remove('active');
    ['p5Final1', 'p5Final2', 'p5Final3', 'p5Final4', 'p5ContinueWrap'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('visible');
    });
  }

  // Immediately start first memory reveal on theater stage
  p5ShowMemory(0);
}

function p5ShowMemory(index) {
  if (index< 0 || index >= P5_MEMORIES.length) {
    p5TriggerFinalReveal();
    return;
  }

  p5IsTransitioning = true;
  p5CurrentMemoryIndex = index;
  const mData = P5_MEMORIES[index];

  const curtainLeft = document.getElementById('p5CurtainLeft');
  const curtainRight = document.getElementById('p5CurtainRight');
  const frame = document.getElementById('p5Frame');
  const photoImg = document.getElementById('p5PhotoImg');
  const beforeCapWrap = document.getElementById('p5BeforeCapWrap');
  const before1 = document.getElementById('p5Before1');
  const before2 = document.getElementById('p5Before2');
  const afterCap = document.getElementById('p5AfterCap');
  const actionWrap = document.getElementById('p5ActionWrap');
  const spotlightGlow = document.getElementById('p5SpotlightGlow');

  // 1. Ensure curtains are fully closed and frame is hidden
  if (curtainLeft) curtainLeft.classList.remove('open');
  if (curtainRight) curtainRight.classList.remove('open');
  if (frame) frame.classList.remove('active');
  if (spotlightGlow) spotlightGlow.classList.remove('active');
  if (afterCap) afterCap.classList.remove('visible');
  if (actionWrap) actionWrap.classList.remove('visible');
  if (beforeCapWrap) beforeCapWrap.classList.remove('visible');
  if (before1) before1.classList.remove('visible');
  if (before2) before2.classList.remove('visible');

  // 2. Update photo src & texts ONLY while curtains are COMPLETELY CLOSED
  if (photoImg) photoImg.src = mData.src;
  if (before1) before1.textContent = mData.before1;
  if (before2) before2.textContent = mData.before2;
  if (afterCap) afterCap.textContent = mData.after;

  // 3. Short closed-curtain moment, then show Before Captions on closed velvet curtains
  setTimeout(() => {
    if (beforeCapWrap) beforeCapWrap.classList.add('visible');
    if (before1) before1.classList.add('visible');
  }, 400);

  setTimeout(() => {
    if (before2) before2.classList.add('visible');
  }, 1700);

  // 4. Pause for user to read captions (~3.2s total), then fade caption & open curtains
  setTimeout(() => {
    // Fade out before captions as curtain opens
    if (beforeCapWrap) beforeCapWrap.classList.remove('visible');

    // Turn on soft stage spotlight
    if (spotlightGlow) spotlightGlow.classList.add('active');

    // Slowly open curtains from center toward sides
    if (curtainLeft) curtainLeft.classList.add('open');
    if (curtainRight) curtainRight.classList.add('open');

    // 5. Reveal framed photo smoothly as curtains open
    setTimeout(() => {
      if (frame) {
        frame.classList.add('active');
        const rect = frame.getBoundingClientRect();
        triggerP5SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35, '#F5D98A');
      }

      // 6. Reveal after-caption below the frame
      setTimeout(() => {
        if (afterCap) afterCap.classList.add('visible');

        // 7. Reveal NEXT MEMORY button
        setTimeout(() => {
          if (actionWrap) actionWrap.classList.add('visible');
          p5IsTransitioning = false;
        }, 700);
      }, 700);
    }, 800);
  }, 3400);
}

function p5NextMemory() {
  if (p5IsTransitioning) return;
  p5IsTransitioning = true;

  const curtainLeft = document.getElementById('p5CurtainLeft');
  const curtainRight = document.getElementById('p5CurtainRight');
  const frame = document.getElementById('p5Frame');
  const afterCap = document.getElementById('p5AfterCap');
  const actionWrap = document.getElementById('p5ActionWrap');
  const spotlightGlow = document.getElementById('p5SpotlightGlow');

  // 1. Immediately hide UI elements & spotlight
  if (frame) frame.classList.remove('active');
  if (afterCap) afterCap.classList.remove('visible');
  if (actionWrap) actionWrap.classList.remove('visible');
  if (spotlightGlow) spotlightGlow.classList.remove('active');

  // 2. Start closing curtains over the current photo (which remains unchanged behind curtains)
  if (curtainLeft) curtainLeft.classList.remove('open');
  if (curtainRight) curtainRight.classList.remove('open');

  // 3. Wait for curtains to become 100% FULLY CLOSED before loading the next photo behind them
  setTimeout(() => {
    p5ShowMemory(p5CurrentMemoryIndex + 1);
  }, 1650);
}

function p5TriggerFinalReveal() {
  p5IsTransitioning = true;

  const stage = document.getElementById('p5Stage');
  const finalSec = document.getElementById('p5FinalSec');
  const l1 = document.getElementById('p5Final1');
  const l2 = document.getElementById('p5Final2');
  const l3 = document.getElementById('p5Final3');
  const l4 = document.getElementById('p5Final4');
  const continueWrap = document.getElementById('p5ContinueWrap');

  if (stage) {
    stage.classList.remove('active');
    setTimeout(() => { stage.style.display = 'none'; }, 600);
  }

  setTimeout(() => {
    if (finalSec) {
      finalSec.style.display = 'flex';
      finalSec.classList.add('active', 'visible');
    }

    setTimeout(() => {
      if (l1) {
        l1.textContent = `${P5_MEMORIES.length} pictures.`;
        l1.classList.add('visible');
        const rect = l1.getBoundingClientRect();
        triggerP5SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20, '#F5D98A');
      }
    }, 400);

    setTimeout(() => {
      if (l2) l2.classList.add('visible');
      if (l2) {
        const rect = l2.getBoundingClientRect();
        triggerP5SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25, '#FFFFFF');
      }
    }, 1500);

    setTimeout(() => {
      if (l3) l3.classList.add('visible');
      if (l3) {
        const rect = l3.getBoundingClientRect();
        triggerP5SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40, '#F5D98A');
      }
    }, 2600);

    setTimeout(() => {
      if (l4) l4.classList.add('visible');
    }, 3600);

    setTimeout(() => {
      if (continueWrap) {
        continueWrap.classList.add('active', 'visible');
      }
      p5IsTransitioning = false;
    }, 4400);
  }, 400);
}

function p5TransitionToPage6() {
  p5IsTransitioning = false;
  transitioning = false;

  const btn1 = document.getElementById('p5BtnHeaderNext');
  const btn2 = document.getElementById('p5BtnNextMemory');
  [btn1, btn2].forEach(b => {
    if (b) {
      b.classList.add('glowing');
      b.style.transform = 'scale(0.98)';
    }
  });

  const activeBtn = btn1 || btn2;
  const btnRect = activeBtn ? activeBtn.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight/2, width: 0, height: 0 };
  triggerP5SparkleBurst(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 50, '#F5D98A');

  const overlay = document.getElementById('pageTransition');
  if (overlay) overlay.classList.add('active');

  setTimeout(() => {
    transitioning = false;
    goToPage(6);
  }, 1000);
}

// ============================================================
// PAGE 6 — OUR UNFORGETTABLE WORDS (CINEMATIC MEMORY PRESERVE)
// ============================================================
let p6CanvasAnimationId = null;
let p6SparkleParticles = [];
let p6CurrentMemory = 0;

function initPage6() {
  initP6Canvas();
  animateP6Opening();
}

function initP6Canvas() {
  p6SparkleParticles = [];
  GlobalAtmosphereSystem.startCanvas('canvas6', 6, (ctx, width, height, t) => {
    // Sparkles
    for (let i = p6SparkleParticles.length - 1; i >= 0; i--) {
      const sp = p6SparkleParticles[i];
      sp.x += sp.vx; sp.y += sp.vy; sp.alpha -= sp.decay;
      if (sp.alpha <= 0) { p6SparkleParticles.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      ctx.fillStyle = sp.color;
      ctx.globalAlpha = Math.max(0, sp.alpha);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  });
}

function triggerP6SparkleBurst(x, y, count = 25, color = '#F0E1C2') {
  for (let i = 0; i< count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2.8 + 0.8;
    p6SparkleParticles.push({
      x: x, y: y,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 0.4,
      r: Math.random() * 2.4 + 0.8, alpha: 1.0,
      decay: Math.random() * 0.02 + 0.012, color: color
    });
  }
}

function animateP6Opening() {
  p6CurrentMemory = 0;

  const opening = document.getElementById('p6Opening');
  const stage = document.getElementById('p6Stage');
  const finalRef = document.getElementById('p6FinalReflection');
  const l1 = document.getElementById('p6Open1');
  const l2 = document.getElementById('p6Open2');
  const l3 = document.getElementById('p6Open3');
  const btnWrap = document.getElementById('p6OpenBtnWrap');

  // Reset visibility & opacity
  if (opening) {
    opening.style.display = 'block';
    opening.style.opacity = '1';
  }
  if (stage) {
    stage.style.display = 'none';
    stage.style.opacity = '1';
  }
  if (finalRef) {
    finalRef.style.display = 'none';
    finalRef.style.opacity = '1';
  }

  if (l1) l1.classList.add('visible');
  if (l2) l2.classList.remove('visible');
  if (l3) l3.classList.remove('visible');
  if (btnWrap) btnWrap.classList.remove('visible');

  // Opening sequence
  setTimeout(() => { if (l2) l2.classList.add('visible'); }, 1000);
  setTimeout(() => { if (l3) l3.classList.add('visible'); }, 2200);
  setTimeout(() => { if (btnWrap) btnWrap.classList.add('visible'); }, 3400);
}

function p6StartMemories() {
  const opening = document.getElementById('p6Opening');
  const stage = document.getElementById('p6Stage');

  if (opening) {
    opening.style.transition = 'opacity 0.3s ease';
    opening.style.opacity = '0';
    setTimeout(() => {
      opening.style.display = 'none';
      if (stage) {
        stage.style.display = 'flex';
        stage.style.opacity = '1';
      }
      p6ShowMemory(1);
    }, 300);
  } else {
    if (stage) {
      stage.style.display = 'flex';
      stage.style.opacity = '1';
    }
    p6ShowMemory(1);
  }
}

function p6ShowMemory(memNum) {
  p6CurrentMemory = memNum;

  const m1 = document.getElementById('p6Mem1');
  const m2 = document.getElementById('p6Mem2');
  const m3 = document.getElementById('p6Mem3');

  // Reset cards
  [m1, m2, m3].forEach(m => {
    if (m) {
      m.classList.remove('active');
      m.style.display = 'none';
    }
  });

  if (memNum === 1 && m1) {
    m1.style.display = 'flex';
    const youRow = m1.querySelector('.p6-you');
    const aliRow = document.getElementById('p6M1Ali');
    const ref1 = document.getElementById('p6M1Ref1');
    const ref2 = document.getElementById('p6M1Ref2');
    const actionWrap = document.getElementById('p6M1ActionWrap');

    [youRow, aliRow, ref1, ref2, actionWrap].forEach(el => el && el.classList.remove('visible'));

    setTimeout(() => {
      m1.classList.add('active');
      setTimeout(() => { if (youRow) youRow.classList.add('visible'); }, 300);
      setTimeout(() => { if (aliRow) aliRow.classList.add('visible'); }, 900);
      setTimeout(() => { if (ref1) ref1.classList.add('visible'); }, 1600);
      setTimeout(() => { if (ref2) ref2.classList.add('visible'); }, 2300);
      setTimeout(() => { if (actionWrap) actionWrap.classList.add('visible'); }, 3000);
    }, 50);
  } else if (memNum === 2 && m2) {
    m2.style.display = 'flex';
    const youRow = m2.querySelector('.p6-you');
    const spotlight = document.getElementById('p6AliSpotlight');
    const lightSweep = document.getElementById('p6LightSweep');
    const chip1 = document.getElementById('p6ChipDetected');
    const chip2 = document.getElementById('p6ChipActivated');
    const chip3 = document.getElementById('p6ChipSolved');
    const ref1 = document.getElementById('p6M2Ref1');
    const ref2 = document.getElementById('p6M2Ref2');
    const actionWrap = document.getElementById('p6M2ActionWrap');

    [youRow, spotlight, lightSweep, chip1, chip2, chip3, ref1, ref2, actionWrap].forEach(el => {
      if (el) el.classList.remove('visible', 'active');
    });

    setTimeout(() => {
      m2.classList.add('active');
      setTimeout(() => { if (youRow) youRow.classList.add('visible'); }, 300);

      setTimeout(() => {
        if (spotlight) spotlight.classList.add('active');
        if (lightSweep) lightSweep.classList.add('active');
      }, 1000);

      setTimeout(() => { if (chip1) chip1.classList.add('visible'); }, 1800);
      setTimeout(() => {
        if (chip2) {
          chip2.classList.add('visible');
          const rect = chip2.getBoundingClientRect();
          triggerP6SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20, '#F5D98A');
        }
      }, 2500);
      setTimeout(() => {
        if (chip3) {
          chip3.classList.add('visible');
          const rect = chip3.getBoundingClientRect();
          triggerP6SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25, '#34D399');
        }
      }, 3200);

      setTimeout(() => { if (ref1) ref1.classList.add('visible'); }, 4000);
      setTimeout(() => { if (ref2) ref2.classList.add('visible'); }, 4800);
      setTimeout(() => { if (actionWrap) actionWrap.classList.add('visible'); }, 5600);
    }, 50);
  } else if (memNum === 3 && m3) {
    m3.style.display = 'flex';
    const subintro = document.getElementById('p6M3Subintro');
    const diamondBox = document.getElementById('p6DiamondBox');
    const l1 = document.getElementById('p6M3Line1');
    const l2 = document.getElementById('p6M3Line2');
    const l3 = document.getElementById('p6M3Line3');
    const l4 = document.getElementById('p6M3Line4');
    const actionWrap = document.getElementById('p6M3ActionWrap');

    [subintro, diamondBox, l1, l2, l3, l4, actionWrap].forEach(el => {
      if (el) el.classList.remove('visible', 'active');
    });

    setTimeout(() => {
      m3.classList.add('active');
      setTimeout(() => { if (subintro) subintro.classList.add('visible'); }, 400);

      setTimeout(() => {
        if (diamondBox) {
          diamondBox.classList.add('active');
          const rect = diamondBox.getBoundingClientRect();
          triggerP6SparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40, '#F5D98A');
        }
      }, 1200);

      setTimeout(() => { if (l1) l1.classList.add('visible'); }, 2200);
      setTimeout(() => { if (l2) l2.classList.add('visible'); }, 3000);
      setTimeout(() => { if (l3) l3.classList.add('visible'); }, 3800);
      setTimeout(() => { if (l4) l4.classList.add('visible'); }, 4600);
      setTimeout(() => { if (actionWrap) actionWrap.classList.add('visible'); }, 5400);
    }, 50);
  }
}

function p6TriggerFinalReflection() {
  const stage = document.getElementById('p6Stage');
  const finalRef = document.getElementById('p6FinalReflection');
  const sym1 = document.getElementById('p6Sym1');
  const sym2 = document.getElementById('p6Sym2');
  const sym3 = document.getElementById('p6Sym3');
  const l1 = document.getElementById('p6FinalLine1');
  const l2 = document.getElementById('p6FinalLine2');
  const btnWrap = document.getElementById('p6FinalBtnWrap');

  if (stage) {
    stage.style.transition = 'opacity 0.4s ease';
    stage.style.opacity = '0';
    setTimeout(() => {
      stage.style.display = 'none';
      if (finalRef) {
        finalRef.style.display = 'flex';
        finalRef.style.opacity = '1';
        setTimeout(() => finalRef.classList.add('active'), 50);

        // Symbols Trio Reveal
        setTimeout(() => {
          if (sym1) {
            sym1.classList.add('visible');
            const r = sym1.getBoundingClientRect();
            triggerP6SparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 15, '#F5D98A');
          }
        }, 400);

        setTimeout(() => {
          if (sym2) {
            sym2.classList.add('visible');
            const r = sym2.getBoundingClientRect();
            triggerP6SparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 20, '#F0E1C2');
          }
        }, 1100);

        setTimeout(() => {
          if (sym3) {
            sym3.classList.add('visible');
            const r = sym3.getBoundingClientRect();
            triggerP6SparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 25, '#FFFFFF');
          }
        }, 1800);

        // Final Words Reveal
        setTimeout(() => { if (l1) l1.classList.add('visible'); }, 2600);
        setTimeout(() => { if (l2) l2.classList.add('visible'); }, 3400);
        setTimeout(() => { if (btnWrap) btnWrap.classList.add('visible'); }, 4200);
      }
    }, 400);
  }
}

function p6TransitionToPage7() {
  const btn = document.getElementById('p6BtnToP7');
  if (btn) {
    btn.classList.add('glowing');
    btn.style.transform = 'scale(0.98)';
  }

  const btnRect = btn ? btn.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight/2, width: 0, height: 0 };
  triggerP6SparkleBurst(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 50, '#F5D98A');

  const overlay = document.getElementById('pageTransition');
  if (overlay) overlay.classList.add('active');

  setTimeout(() => {
    goToPage(7);
  }, 1400);
}

// ============================================================
// PAGE 7 — HIDDEN MESSAGE / LETTER
// ============================================================
function initPage7() {
  GlobalAtmosphereSystem.startCanvas('canvas7', 7);
  animateEnvelope();
}

function animateEnvelope() {
  const envelope = document.getElementById('p7-envelope');
  const intro = document.getElementById('p7-envelope-intro');
  const letter = document.getElementById('p7-letter');

  // Click or auto-open after 3 seconds
  envelope?.addEventListener('click', openLetter);
  setTimeout(openLetter, 3000);

  function openLetter() {
    if (letter.classList.contains('hidden') === false) return;
    envelope?.removeEventListener('click', openLetter);
    intro.style.opacity = '0';
    intro.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      intro.classList.add('hidden');
      letter.classList.remove('hidden');
      letter.style.animation = 'fadeInUp 0.8s ease forwards';
      animateLetterParagraphs();
    }, 500);
  }
}

function animateLetterParagraphs() {
  const paragraphs = document.querySelectorAll('.letter-content p');
  paragraphs.forEach((p, i) => {
    setTimeout(() => {
      p.classList.add('letter-visible');
    }, i * 120);
  });
}

// ============================================================
// PAGE 8 — THE OFFICIAL FRIENDSHIP AGREEMENT (REDESIGN)
// ============================================================
let p8CurrentArticle = 0;
let p8OpeningTimer = null;
let p8IsTransitioning = false;

function initPage8() {
  p8CurrentArticle = 0;
  p8IsTransitioning = false;
  p8StartCanvas8();
  p8ResetState();
  p8RunOpeningSequence();
}

function p8ResetState() {
  if (p8OpeningTimer) clearTimeout(p8OpeningTimer);

  // Reset overlay
  const overlay = document.getElementById('p8OpeningOverlay');
  if (overlay) {
    overlay.classList.remove('fade-out', 'hidden');
  }

  const lines = ['p8RevLine1', 'p8RevLine2', 'p8RevLine3', 'p8RevLine4'];
  lines.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('visible');
  });

  const revAction = document.getElementById('p8RevAction');
  if (revAction) revAction.classList.add('hidden');

  // Reset document
  const docWrapper = document.getElementById('p8DocumentWrapper');
  if (docWrapper) docWrapper.classList.add('hidden');

  const doc = document.getElementById('p8AgreementDoc');
  if (doc) doc.classList.remove('p8-glow-pulse', 'p8-transitioning-out');

  // Reset articles
  for (let i = 1; i<= 4; i++) {
    const art = document.getElementById(`article${i}`);
    if (art) art.classList.add('hidden');
    if (art) art.classList.remove('visible', 'active-article');
  }

  // Reset nav & decision
  const nav = document.getElementById('p8ArticleNav');
  if (nav) nav.classList.remove('hidden');

  const navBtnText = document.getElementById('p8NextArtText');
  if (navBtnText) navBtnText.textContent = 'READ ARTICLE 01 →';

  const decision = document.getElementById('p8DecisionSection');
  if (decision) decision.classList.add('hidden');

  const deny = document.getElementById('p8DenyReaction');
  if (deny) deny.classList.add('hidden');

  const signSec = document.getElementById('p8SignSection');
  if (signSec) signSec.classList.add('hidden');

  const signErr = document.getElementById('p8SignError');
  if (signErr) signErr.classList.add('hidden');

  const signedState = document.getElementById('p8SignedState');
  if (signedState) signedState.classList.add('hidden');

  const outro = document.getElementById('p8FinalOutro');
  if (outro) outro.classList.add('hidden');

  const sweep = document.getElementById('p8SweepOverlay');
  if (sweep) sweep.classList.remove('active');
}

/* ------------------------------------------------------------
   Opening Reveal Sequence
   ------------------------------------------------------------ */
function p8RunOpeningSequence() {
  const line1 = document.getElementById('p8RevLine1');
  const line2 = document.getElementById('p8RevLine2');
  const line3 = document.getElementById('p8RevLine3');
  const line4 = document.getElementById('p8RevLine4');
  const revAction = document.getElementById('p8RevAction');

  setTimeout(() => { if (line1) line1.classList.add('visible'); }, 400);
  setTimeout(() => { if (line2) line2.classList.add('visible'); }, 2000);
  setTimeout(() => { if (line3) line3.classList.add('visible'); }, 3800);
  setTimeout(() => { if (line4) line4.classList.add('visible'); }, 5600);

  setTimeout(() => {
    if (revAction) revAction.classList.remove('hidden');
    if (revAction) revAction.classList.add('visible');
  }, 7200);
}

function p8RevealDocument() {
  const overlay = document.getElementById('p8OpeningOverlay');
  const docWrapper = document.getElementById('p8DocumentWrapper');

  if (overlay) overlay.classList.add('fade-out');

  setTimeout(() => {
    if (overlay) overlay.classList.add('hidden');
    if (docWrapper) {
      docWrapper.classList.remove('hidden');
      docWrapper.classList.add('visible');
    }
  }, 700);
}

/* ------------------------------------------------------------
   Article Reveal System
   ------------------------------------------------------------ */
function p8AdvanceArticle() {
  if (p8CurrentArticle< 4) {
    p8CurrentArticle++;

    // Deactivate previous active article
    if (p8CurrentArticle > 1) {
      const prevArt = document.getElementById(`article${p8CurrentArticle - 1}`);
      if (prevArt) prevArt.classList.remove('active-article');
    }

    const currentArt = document.getElementById(`article${p8CurrentArticle}`);
    if (currentArt) {
      currentArt.classList.remove('hidden');
      currentArt.classList.add('visible', 'active-article');
      currentArt.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const navBtnText = document.getElementById('p8NextArtText');
    if (p8CurrentArticle === 1 && navBtnText) navBtnText.textContent = 'READ ARTICLE 02 →';
    else if (p8CurrentArticle === 2 && navBtnText) navBtnText.textContent = 'READ ARTICLE 03 →';
    else if (p8CurrentArticle === 3 && navBtnText) navBtnText.textContent = 'READ ARTICLE 04 →';
    else if (p8CurrentArticle === 4) {
      const nav = document.getElementById('p8ArticleNav');
      if (nav) nav.classList.add('hidden');

      setTimeout(() => {
        const decision = document.getElementById('p8DecisionSection');
        if (decision) {
          decision.classList.remove('hidden');
          decision.classList.add('visible');
          decision.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 500);
    }
  }
}

/* ------------------------------------------------------------
   Decision Handling
   ------------------------------------------------------------ */
function p8AgreeAccept() {
  const decision = document.getElementById('p8DecisionSection');
  const signSec = document.getElementById('p8SignSection');
  const doc = document.getElementById('p8AgreementDoc');

  if (doc) {
    doc.classList.add('p8-glow-pulse');
    setTimeout(() => doc.classList.remove('p8-glow-pulse'), 1500);
  }

  if (decision) decision.classList.add('hidden');

  if (signSec) {
    signSec.classList.remove('hidden');
    signSec.classList.add('visible');
    signSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function p8AgreeDeny() {
  const decision = document.getElementById('p8DecisionSection');
  const deny = document.getElementById('p8DenyReaction');

  if (decision) decision.classList.add('hidden');
  if (deny) {
    deny.classList.remove('hidden');
    deny.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function p8AgreeTryAgain() {
  const deny = document.getElementById('p8DenyReaction');
  const decision = document.getElementById('p8DecisionSection');

  if (deny) deny.classList.add('hidden');
  if (decision) {
    decision.classList.remove('hidden');
    decision.classList.add('visible');
    decision.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ------------------------------------------------------------
   Signature Logic
   ------------------------------------------------------------ */
function p8SignAgreement() {
  const input = document.getElementById('signatureInput');
  const signSec = document.getElementById('p8SignSection');
  const signErr = document.getElementById('p8SignError');
  const signedState = document.getElementById('p8SignedState');
  const sigDisplay = document.getElementById('acceptedSig');

  const name = input ? input.value.trim() : '';

  if (!name) {
    if (signErr) signErr.classList.remove('hidden');
    return;
  }

  if (signErr) signErr.classList.add('hidden');
  if (signSec) signSec.classList.add('hidden');

  if (sigDisplay) sigDisplay.textContent = name;
  if (signedState) {
    signedState.classList.remove('hidden');
    signedState.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Celebratory particles & seal
  launchSignConfetti();

  setTimeout(() => {
    const outro = document.getElementById('p8FinalOutro');
    if (outro) {
      outro.classList.remove('hidden');
      outro.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 1200);
}

/* ------------------------------------------------------------
   Transition to Page 9
   ------------------------------------------------------------ */
function p8ProceedToPage9() {
  if (p8IsTransitioning) return;
  p8IsTransitioning = true;

  const btn = document.getElementById('p8BtnPage9');
  if (btn) btn.disabled = true;

  const doc = document.getElementById('p8AgreementDoc');
  if (doc) doc.classList.add('p8-transitioning-out');

  const sweep = document.getElementById('p8SweepOverlay');
  if (sweep) sweep.classList.add('active');

  // Ascending cyan/gold particles
  launchSignConfetti();

  setTimeout(() => {
    if (sweep) sweep.classList.remove('active');
    p8IsTransitioning = false;
    transitioning = false;
    goToPage(9);
  }, 900);
}

/* ------------------------------------------------------------
   Page 8 Custom Canvas Background Particles
   ------------------------------------------------------------ */
function p8StartCanvas8() {
  GlobalAtmosphereSystem.startCanvas('canvas8', 8);
}

function launchSignConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9000;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const particles = [];
  const colors = ['#F0E1C2', '#6B142D', '#FAF6EE', '#E6D2A7'];

  for (let i = 0; i< 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      alpha: 1,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.alpha -= 0.008;
      if (p.y > canvas.height || p.alpha<= 0) { particles.splice(i, 1); continue; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
      ctx.restore();
    }
    if (particles.length > 0) requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();
}

// ============================================================
// PAGE 9 — FINAL WORDS BEFORE ENDING
// ============================================================
function initPage9() {
  GlobalAtmosphereSystem.startCanvas('canvas9', 9);
  animatePage9Sequence();
}

function animatePage9Sequence() {
  const lines = ['p9-l1', 'p9-l2', 'p9-l3', 'p9-l4', 'p9-l5', 'p9-l6', 'p9-l7', 'p9-l8', 'p9-l9', 'p9-l10'];
  const delays = [200, 700, 1200, 1700, 2200, 2700, 3200, 3700, 4200, 4700];

  lines.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('visible');
        if (id === 'p9-l9' || id === 'p9-l10') {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }, delays[i]);
  });

  // Automatically transition to Page 10 (YOU MATTER) after reading "No complicated reason."
  setTimeout(() => {
    if (currentPage === 9) {
      goToPage(10);
    }
  }, 6500);
}

// ============================================================
// PAGE 10 — FINAL BIRTHDAY ENDING
// ============================================================
function initPage10() {
  GlobalAtmosphereSystem.startCanvas('canvas10', 10);
  animatePage10Sequence();
}

function animatePage10Sequence() {
  // 1. Begin immediately with cinematic reveal of YOU MATTER. 🤍
  const youMatter = document.getElementById('p10-you-matter');
  if (youMatter) {
    youMatter.classList.remove('hidden');
    void youMatter.offsetWidth; // reflow
    youMatter.classList.add('visible');
    youMatter.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // 2. Short cinematic pause (1.5s) before revealing remaining elements on same page
  setTimeout(() => {
    const afterPause = document.getElementById('p10-after-pause');
    if (afterPause) {
      afterPause.classList.remove('hidden');
      afterPause.classList.add('visible');
    }

    // 3. Happy Birthday once again, Ali. 🎂✨
    setTimeout(() => {
      const hbd = document.getElementById('p10-hbd');
      if (hbd) hbd.classList.add('visible');
    }, 200);

    // 4. — From your sometimes immature, sometimes stubborn, but genuinely grateful best friend. 🫶
    setTimeout(() => {
      const sig = document.getElementById('p10-sig');
      if (sig) sig.classList.add('visible');
    }, 1000);

    // 5. THE END
    setTimeout(() => {
      const theEnd = document.getElementById('p10-the-end');
      if (theEnd) theEnd.classList.add('visible');
    }, 1800);

    // 6. Or maybe just the beginning of another memory. ✨
    setTimeout(() => {
      const subEnd = document.getElementById('p10-sub-end');
      if (subEnd) subEnd.classList.add('visible');
    }, 2600);

    // 7 & 8. Final Buttons Together: [EXPERIENCE AGAIN] [BACK]
    setTimeout(() => {
      const actions = document.getElementById('p10-actions');
      if (actions) {
        actions.classList.add('visible');
        actions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 3400);

  }, 1500);
}

// ============================================================
// PARTICLE SYSTEM
// ============================================================
function startParticles(canvasId, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const parentSection = canvas.closest('.page');
  if (!parentSection) return;

  function resize() {
    canvas.width = parentSection.offsetWidth || window.innerWidth;
    canvas.height = parentSection.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const ctx = canvas.getContext('2d');
  const { type = 'stars', count = 40 } = options;
  const isMobile = window.innerWidth<= 768;
  const effectiveCount = isMobile ? Math.max(12, Math.floor(count * 0.5)) : count;
  const particles = [];

  for (let i = 0; i< effectiveCount; i++) {
    particles.push(createParticle(canvas, type));
  }

  function draw() {
    // Only animate if parent is active
    if (!parentSection.classList.contains('active')) {
      requestAnimationFrame(draw);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, idx) => {
      p.life -= p.decay;
      if (p.life<= 0) {
        particles[idx] = createParticle(canvas, type);
        return;
      }

      p.x += p.vx;
      p.y += p.vy;
      if (p.x< 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y< 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      const alpha = p.life;

      if (type === 'hearts') {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(p.size / 10, p.size / 10);
        ctx.globalAlpha = alpha * 0.5;
        ctx.fillStyle = `rgba(240, 225, 194, 1)`;
        ctx.font = '20px serif';
        ctx.textAlign = 'center';
        ctx.fillText('♡', 0, 0);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = type === 'stars'
          ? `rgba(250, 246, 238, ${alpha * 0.6})`
          : (type === 'soft'
              ? `rgba(240, 225, 194, ${alpha * 0.25})`
              : (Math.random() > 0.5
                  ? `rgba(107, 20, 45, ${alpha * 0.4})`
                  : `rgba(240, 225, 194, ${alpha * 0.5})`));
        ctx.fill();

        // Subtle glow for champagne particles
        if (type === 'soft' || type === 'mixed') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 225, 194, ${alpha * 0.05})`;
          ctx.fill();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

function createParticle(canvas, type) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: type === 'hearts' ? -Math.random() * 0.5 - 0.2 : (Math.random() - 0.5) * 0.3,
    size: Math.random() * (type === 'hearts' ? 10 : 3) + 1,
    life: Math.random() * 0.6 + 0.4,
    decay: Math.random() * 0.003 + 0.001
  };
}

// ============================================================
// LIGHT RAYS
// ============================================================
function startLightRays(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  const ctx = canvas.getContext('2d');
  const rays = [];

  for (let i = 0; i< 5; i++) {
    rays.push({
      angle: (Math.PI / 8) * i - Math.PI / 4,
      width: Math.random() * 60 + 20,
      alpha: Math.random() * 0.04 + 0.01,
      speed: Math.random() * 0.0003 + 0.0001,
      phase: Math.random() * Math.PI * 2
    });
  }

  function draw() {
    const t = Date.now() * 0.001;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = -canvas.height * 0.3;

    rays.forEach(ray => {
      const a = ray.angle + Math.sin(t * ray.speed + ray.phase) * 0.1;
      const dx = Math.sin(a);
      const dy = Math.cos(a);
      const length = canvas.height * 2;

      const grad = ctx.createLinearGradient(cx, cy, cx + dx * length, cy + dy * length);
      grad.addColorStop(0, `rgba(240, 225, 194, ${ray.alpha})`);
      grad.addColorStop(1, 'rgba(240, 225, 194, 0)');

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(-ray.width / 2, 0);
      ctx.lineTo(ray.width / 2, 0);
      ctx.lineTo(ray.width / 2 + 30, length);
      ctx.lineTo(-ray.width / 2 - 30, length);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// ============================================================
// UTILITY
// ============================================================
window.addEventListener('resize', () => {
  const globalCanvas = document.getElementById('globalCanvas');
  if (globalCanvas) {
    globalCanvas.width = window.innerWidth;
    globalCanvas.height = window.innerHeight;
  }
});

// ============================================================
// MUSIC SYSTEM — Persistent Background Audio
// Single audio instance · No duplicate listeners · Loop-safe
// ============================================================
const MusicSystem = (function () {
  'use strict';

  let audio = null;
  let btn = null;
  let control = null;
  let _initialized = false;

  // -- Internal helpers --

  function _getElements() {
    audio   = document.getElementById('bgMusic');
    btn     = document.getElementById('musicBtn');
    control = document.getElementById('musicControl');
  }

  function _setPlaying(playing) {
    if (!btn) return;
    btn.setAttribute('data-playing', playing ? 'true' : 'false');
    btn.setAttribute('aria-label', playing ? 'Mute music' : 'Unmute music');

    const icon  = btn.querySelector('.music-icon');
    const label = btn.querySelector('.music-label');
    if (icon)  icon.textContent  = playing ? '♫' : '♪';
    if (label) label.textContent = playing ? 'SOUND OFF' : 'SOUND ON';
  }

  function _showControl() {
    if (control) {
      control.classList.remove('hidden');
    }
  }

  function _onBtnClick() {
    if (!audio) return;
    if (audio.paused) {
      // Resume / start
      audio.play().then(() => {
        _setPlaying(true);
      }).catch((err) => {
        console.warn('[MusicSystem] play() blocked:', err);
      });
    } else {
      // Mute / pause
      audio.pause();
      _setPlaying(false);
    }
  }

  // Reveal control and show SOUND ON prompt (does NOT autoplay)
  function _revealControl() {
    _showControl();
    _setPlaying(false); // label = "SOUND ON", icon = ♪
  }

  // -- Public API --

  function init() {
    if (_initialized) return;
    _initialized = true;

    _getElements();

    if (!audio || !btn || !control) {
      console.warn('[MusicSystem] Required elements not found — aborting.');
      return;
    }

    // Set volume: ~13%
    audio.volume = 0.13;

    // `loop` attribute already set on the <audio> element.
    // The browser handles seamless looping natively — no extra logic needed.

    // Wire up the toggle button (single listener only)
    btn.addEventListener('click', _onBtnClick);

    // Show the control immediately — user must click to start sound
    _revealControl();

    // Handle audio errors gracefully
    audio.addEventListener('error', (e) => {
      console.warn('[MusicSystem] Audio error:', e);
    });

    // Ensure correct UI state if audio somehow plays (e.g., restored by browser)
    audio.addEventListener('play', () => _setPlaying(true));
    audio.addEventListener('pause', () => _setPlaying(false));
  }

  return { init };
})();

// Initialise once the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', MusicSystem.init);
} else {
  MusicSystem.init();
}
