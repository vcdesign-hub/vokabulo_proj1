document.addEventListener('DOMContentLoaded', () => {
  console.log("Global.js loaded");

  // --- 1. HERO VIDEO AUTOPLAY ---
  const video = document.getElementById('hero-video');
  setTimeout(() => {
    if(video) {
      video.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, 1800);

  // --- 2. OBSERVER FOR ANIMATIONS ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.js-visual-trigger').forEach((el) => observer.observe(el));

  // --- 3. FEATURE ACCORDION ---
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // --- 4. FEATURE TABS ---
  const tabBtns = document.querySelectorAll('.f-tab-btn');
  const tabImgs = document.querySelectorAll('.f-tab-img');
  
  if (tabBtns.length > 0) {
    let currentTab = 0;
    const switchTab = (index) => {
      tabBtns.forEach(btn => btn.classList.remove('active'));
      tabImgs.forEach(img => img.classList.remove('active'));
      if(tabBtns[index]) tabBtns[index].classList.add('active');
      if(tabImgs[index]) tabImgs[index].classList.add('active');
      currentTab = index;
    };

    tabBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        switchTab(idx);
        clearInterval(tabInterval); // Stop auto-play on interaction
      });
    });

    // const tabInterval = setInterval(() => {
    //   switchTab((currentTab + 1) % tabBtns.length);
    // }, 5000);
  }

  // --- 5. PERSPECTIVE SCROLL (iPad Section) ---
  const scrollSection = document.getElementById('perspective-showcase');
  const ipadGroup = document.getElementById('ipad-group');
  const floatLeft = document.getElementById('float-left');
  const floatRight = document.getElementById('float-right');
  const cycleTitles = document.querySelectorAll('.cycle-title');

  // Text Cycler
  if (cycleTitles.length > 0) {
    let titleIndex = 0;
    setInterval(() => {
      cycleTitles[titleIndex].style.opacity = '0';
      cycleTitles[titleIndex].style.transform = 'translateY(10px)';
      titleIndex = (titleIndex + 1) % cycleTitles.length;
      cycleTitles[titleIndex].style.opacity = '1';
      cycleTitles[titleIndex].style.transform = 'translateY(0)';
    }, 2500);
  }

  // Scroll Animation
  if (scrollSection && ipadGroup) {
    window.addEventListener('scroll', () => {
      const rect = scrollSection.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (scrollSection.offsetHeight - window.innerHeight)));
      
      const rotateX = 25 - (progress * 25);
      const scale = 0.9 + (progress * 0.1);
      
      ipadGroup.style.transform = `rotateX(${rotateX}deg) scale(${scale})`;

      if (progress > 0.4) {
        if(floatLeft) { floatLeft.style.opacity = '1'; floatLeft.style.transform = 'translate(-60px, -50%)'; }
        if(floatRight) { floatRight.style.opacity = '1'; floatRight.style.transform = 'translate(60px, 0)'; }
      } else {
        if(floatLeft) { floatLeft.style.opacity = '0'; floatLeft.style.transform = 'translate(40px, -50%)'; }
        if(floatRight) { floatRight.style.opacity = '0'; floatRight.style.transform = 'translate(-40px, 0)'; }
      }
    });
  }

  




  



 // --- 7. SEAMLESS INFINITE SLIDER ---
const track = document.getElementById('showcase-track');
const nextBtn = document.getElementById('next-slide');
const prevBtn = document.getElementById('prev-slide');

if (track) {
  let slides = Array.from(document.querySelectorAll('.showcase-slide'));
  const originalCount = slides.length;

  // 1. Clone slides for the infinite loop
  const firstClones = slides.map(s => s.cloneNode(true));
  const lastClones = slides.map(s => s.cloneNode(true));
  
  firstClones.forEach(clone => track.appendChild(clone));
  lastClones.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));

  // 2. Setup state
  const allSlides = Array.from(track.querySelectorAll('.showcase-slide'));
  let slideIndex = originalCount; // Start at the first "real" slide
  let isTransitioning = false;

  const getMoveAmount = (index) => {
    const slideWidth = allSlides[0].offsetWidth;
    const gap = 32; 
    const centerOffset = (window.innerWidth / 2) - (slideWidth / 2);
    return centerOffset - (index * (slideWidth + gap));
  };

  const updateSlider = (smooth = true) => {
    track.style.transition = smooth ? 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none';
    track.style.transform = `translateX(${getMoveAmount(slideIndex)}px)`;

    // Update active classes for all visible slides
    allSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === slideIndex);
    });
  };

  // 3. The "Teleport" Logic - This fixes the glitch
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    
    // If we reach the end clones, jump back to the start of real slides
    if (slideIndex >= originalCount * 2) {
      slideIndex = originalCount;
      updateSlider(false);
    } 
    // If we reach the start clones, jump back to the end of real slides
    else if (slideIndex < originalCount) {
      slideIndex = originalCount * 2 - 1;
      updateSlider(false);
    }
  });

  nextBtn?.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    slideIndex++;
    updateSlider();
  });

  prevBtn?.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    slideIndex--;
    updateSlider();
  });

  window.addEventListener('resize', () => updateSlider(false));
  
  // Initial position without animation
  requestAnimationFrame(() => {
    updateSlider(false);
  });
}








  const buttons = document.querySelectorAll('.faq-btn');
  const visuals = document.querySelectorAll('.faq-visual');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const index = btn.getAttribute('data-index');

      // 1. GUARD CLAUSE: If it's already open, do nothing. 
      // This prevents the visual from disappearing when clicking the same item.
      if (isExpanded) return;

      // 2. Close all other accordions
      buttons.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const content = b.nextElementSibling;
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
      });

      // 3. Hide all visuals
      visuals.forEach(v => {
        v.classList.replace('opacity-100', 'opacity-0');
      });

      // 4. Open the clicked accordion
      btn.setAttribute('aria-expanded', 'true');
      const content = btn.nextElementSibling;
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';

      // 5. Show the corresponding visual
      const targetVisual = document.getElementById(`visual-${index}`);
      if (targetVisual) {
        targetVisual.classList.replace('opacity-0', 'opacity-100');
      }
    });
  });








});












document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Expand/collapse navigation sections + persist state
  (() => {
    const navSections = document.querySelectorAll('.help-nav-section');
    const savedState = localStorage.getItem('help-nav-state');
    
    // If there is no saved state yet (first visit), expand only the first section.
    const expandedSections = savedState ? JSON.parse(savedState) : [];
    if (!savedState) {
      const firstSectionId = document.querySelector('.help-nav-section')?.dataset?.section;
      if (firstSectionId) expandedSections.push(firstSectionId);
    }

    navSections.forEach(section => {
      const toggle = section.querySelector('.help-nav-toggle');
      const sectionId = section.dataset.section;
      const headerLink = section.querySelector('.help-nav-section-header a');
      if (!toggle || !sectionId) return;

      const persist = () => localStorage.setItem('help-nav-state', JSON.stringify(expandedSections));

      const setExpanded = (targetId) => {
        // Accordion behavior: only one section open at a time
        navSections.forEach((s) => {
          const id = s.dataset.section;
          const t = s.querySelector('.help-nav-toggle');
          const open = id === targetId;
          s.classList.toggle('expanded', open);
          s.classList.toggle('collapsed', !open);
          if (t) t.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        expandedSections.length = 0;
        if (targetId) expandedSections.push(targetId);
        persist();
      };

      // default: only sections in expandedSections are open
      const isExpanded = expandedSections.includes(sectionId);
      section.classList.toggle('expanded', isExpanded);
      section.classList.toggle('collapsed', !isExpanded);
      toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

      const toggleSection = (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        const currentlyExpanded = section.classList.contains('expanded');
        if (currentlyExpanded) {
          setExpanded(null);
        } else {
          setExpanded(sectionId);
        }
      };

      const expandSection = () => {
        if (section.classList.contains('expanded')) return;
        setExpanded(sectionId);
      };

      toggle.addEventListener('click', toggleSection);
      headerLink?.addEventListener('click', () => expandSection());
    });
  })();

  // 2. Search functionality (Desktop & Sidebar)
  (() => {
    const normalize = (s) =>
      (s || '')
        .toString()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();

    // For a heading anchor (h2/h3), return the full text "block" until the next heading.
    const blockTextCache = new Map();
    const getBlockTextForAnchor = (anchorId) => {
      if (!anchorId) return '';
      if (blockTextCache.has(anchorId)) return blockTextCache.get(anchorId);

      const el = document.getElementById(anchorId);
      if (!el) {
        blockTextCache.set(anchorId, '');
        return '';
      }

      if (el.tagName === 'SECTION') {
        const out = normalize(el.textContent || '');
        blockTextCache.set(anchorId, out);
        return out;
      }

      const stopAt = el.tagName === 'H2' ? new Set(['H2']) : new Set(['H2', 'H3']);
      let text = el.textContent || '';
      let node = el.nextElementSibling;
      while (node) {
        if (stopAt.has(node.tagName)) break;
        text += ` ${node.textContent || ''}`;
        node = node.nextElementSibling;
      }

      const out = normalize(text);
      blockTextCache.set(anchorId, out);
      return out;
    };

    const searchInput = document.getElementById('help-search');
    const searchClear = document.getElementById('help-search-clear');
    const allNavItems = document.querySelectorAll('.help-nav-items li');
    const allNavSections = document.querySelectorAll('.help-nav-section');

    if (!searchInput) return;

    const updateClearButton = () => {
      if (searchClear) {
        searchClear.classList.toggle('visible', searchInput.value.length > 0);
      }
    };

    searchInput.addEventListener('input', (e) => {
      updateClearButton();
      const query = normalize(e.target.value || '');
      if (query === '') {
        allNavItems.forEach(item => item.classList.remove('hidden-by-search', 'highlight-match'));
        allNavSections.forEach(section => section.classList.remove('hidden-by-search'));
        return;
      }

      let hasMatches = false;
      allNavItems.forEach(item => {
        const link = item.querySelector('a');
        const text = normalize(link ? link.textContent : '');
        const href = link ? (link.getAttribute('href') || '') : '';
        const anchorId = href.startsWith('#') ? href.slice(1) : '';
        const blockText = getBlockTextForAnchor(anchorId);

        if (text.includes(query) || normalize(href).includes(query) || blockText.includes(query)) {
          item.classList.remove('hidden-by-search');
          item.classList.add('highlight-match');
          hasMatches = true;

          const parentSection = item.closest('.help-nav-section');
          if (parentSection) {
            parentSection.classList.remove('hidden-by-search', 'collapsed');
            parentSection.classList.add('expanded');
            const toggle = parentSection.querySelector('.help-nav-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'true');
          }
        } else {
          item.classList.remove('highlight-match');
          item.classList.add('hidden-by-search');
        }
      });

      allNavSections.forEach(section => {
        const items = section.querySelectorAll('.help-nav-items li');
        const visibleItems = Array.from(items).filter(item => !item.classList.contains('hidden-by-search'));
        const sectionHeader = section.querySelector('.help-nav-section-header a');
        const sectionText = normalize(sectionHeader ? sectionHeader.textContent : '');
        const sectionHref = sectionHeader ? (sectionHeader.getAttribute('href') || '') : '';
        const sectionAnchorId = sectionHref.startsWith('#') ? sectionHref.slice(1) : '';
        const sectionBlockText = getBlockTextForAnchor(sectionAnchorId);

        if (visibleItems.length > 0 || sectionText.includes(query) || sectionBlockText.includes(query)) {
          section.classList.remove('hidden-by-search');
        }
        else section.classList.add('hidden-by-search');
      });

      if (hasMatches) {
        const firstMatch = document.querySelector('.help-nav-items li.highlight-match a');
        firstMatch?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    }

    updateClearButton();
  })();

  // 3. Search functionality for floating navigation (Mobile FAB)
  (() => {
    const searchInput = document.getElementById('help-search-fab');
    const searchClear = document.getElementById('help-search-fab-clear');
    if (!searchInput) return;

    const normalize = (s) =>
      (s || '')
        .toString()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();

    // Reusing logic: Block Text Cache specific to FAB
    const blockTextCache = new Map();
    const getBlockTextForAnchor = (anchorId) => {
      if (!anchorId) return '';
      if (blockTextCache.has(anchorId)) return blockTextCache.get(anchorId);

      const el = document.getElementById(anchorId);
      if (!el) {
        blockTextCache.set(anchorId, '');
        return '';
      }

      if (el.tagName === 'SECTION') {
        const out = normalize(el.textContent || '');
        blockTextCache.set(anchorId, out);
        return out;
      }

      const stopAt = el.tagName === 'H2' ? new Set(['H2']) : new Set(['H2', 'H3']);
      let text = el.textContent || '';
      let node = el.nextElementSibling;
      while (node) {
        if (stopAt.has(node.tagName)) break;
        text += ` ${node.textContent || ''}`;
        node = node.nextElementSibling;
      }

      const out = normalize(text);
      blockTextCache.set(anchorId, out);
      return out;
    };

    const updateClearButton = () => {
      if (searchClear) {
        searchClear.classList.toggle('visible', searchInput.value.length > 0);
      }
    };

    searchInput.addEventListener('input', (e) => {
      updateClearButton();
      const query = normalize(e.target.value || '');
      const fabPanel = document.querySelector('.help-nav-fab-panel');
      const allNavItems = fabPanel ? fabPanel.querySelectorAll('.help-nav-items li') : [];
      const allNavSections = fabPanel ? fabPanel.querySelectorAll('.help-nav-section') : [];
      
      if (query === '') {
        allNavItems.forEach(item => item.style.display = '');
        allNavSections.forEach(section => section.style.display = '');
        return;
      }

      allNavItems.forEach(item => {
        const link = item.querySelector('a');
        if (!link) {
          item.style.display = 'none';
          return;
        }
        
        const anchorId = link.getAttribute('href')?.replace('#', '') || '';
        const linkText = normalize(link.textContent || '');
        const blockText = getBlockTextForAnchor(anchorId);
        if (linkText.includes(query) || blockText.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });

      allNavSections.forEach(section => {
        const sectionHeader = section.querySelector('.help-nav-section-header a');
        const sectionHref = sectionHeader ? (sectionHeader.getAttribute('href') || '') : '';
        const sectionAnchorId = sectionHref.startsWith('#') ? sectionHref.slice(1) : '';
        const sectionBlockText = getBlockTextForAnchor(sectionAnchorId);

        const items = section.querySelectorAll('.help-nav-items li');
        const visibleItems = Array.from(items).filter((li) => li.style.display !== 'none');

        if (visibleItems.length > 0 || sectionBlockText.includes(query)) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
        }
      });
    });

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    }

    updateClearButton();
  })();

  // 4. Image lightbox
  (() => {
    const dialog = document.getElementById('image-lightbox');
    const dialogImg = document.getElementById('image-lightbox-img');
    const closeBtn = document.querySelector('.image-lightbox-close');

    if (!dialog || !dialogImg) return;

    const close = () => {
      try {
        dialog.close();
      } catch { /* no-op */ }
    };

    closeBtn?.addEventListener('click', close);
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) close();
    });

    document.addEventListener('click', (e) => {
      const target = e.target instanceof Element ? e.target : null;
      const img = target?.closest?.('.help-article img');
      if (!img) return;

      const src = img.currentSrc || img.getAttribute('src') || '';
      if (!src) return;

      dialogImg.src = src;
      dialogImg.alt = img.getAttribute('alt') || '';

      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
  })();

  // 5. Theme-aware screenshots
  (() => {
    const root = document.documentElement;

    const applyThemeImages = () => {
      const isDark = root.classList.contains('theme-dark');
      document.querySelectorAll('img.support-theme-image').forEach((img) => {
        if (!img.dataset.themeFallbackInit) {
          img.dataset.themeFallbackInit = '1';
          img.addEventListener('error', () => {
            const desired = img.dataset.desiredTheme || '';
            if (desired !== 'dark') return;
            if (!img.dataset.light) return;
            img.dataset.darkMissing = '1';
            if (img.getAttribute('src') !== img.dataset.light) {
              img.setAttribute('src', img.dataset.light);
            }
          });
        }

        const next = (isDark && img.dataset.darkMissing !== '1') ? img.dataset.dark : img.dataset.light;
        if (!next) return;
        img.dataset.desiredTheme = isDark ? 'dark' : 'light';
        if (img.getAttribute('src') !== next) img.setAttribute('src', next);
      });
    };

    applyThemeImages();

    const obs = new MutationObserver(() => applyThemeImages());
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
  })();

  // 6. Highlight active section & Smooth Scroll
  (() => {
    const anchorKey = `help-scroll-anchor:${location.pathname}`;
    const scrollKey = `help-scroll-y:${location.pathname}`;
    try {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    } catch {}

    const saveScrollY = () => {
      try {
        localStorage.setItem(scrollKey, String(window.scrollY));
      } catch {}
    };

    const updateActiveSection = () => {
      const pageSections = document.querySelectorAll('.help-article section[id]');
      const navLinks = document.querySelectorAll('.help-nav-section-header a, .help-nav-items a');
      navLinks.forEach(link => link.removeAttribute('aria-current'));

      const scrollPos = window.scrollY + 150;
      let activeSection = null;
      pageSections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) activeSection = section.id;
      });
      if (!activeSection && window.scrollY < 200) activeSection = pageSections[0]?.id;
      if (activeSection) {
        const mainLink = document.querySelector(`.help-nav-section-header a[href="#${activeSection}"]`);
        mainLink?.setAttribute('aria-current', 'page');
        try {
          localStorage.setItem(anchorKey, activeSection);
        } catch {}
      }
    };

    // Throttled Scroll Listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveSection, 100);
      // Debounce saving scroll position
      clearTimeout(window.saveScrollTimer);
      window.saveScrollTimer = setTimeout(saveScrollY, 100);
    });

    // Restore scroll logic
    const restoreExactScroll = () => {
      if (location.hash) return;
      let savedY = null;
      try {
        const raw = localStorage.getItem(scrollKey);
        if (raw != null) {
          const parsed = parseInt(raw, 10);
          if (!Number.isNaN(parsed) && parsed >= 0) savedY = parsed;
        }
      } catch {}
      if (savedY == null) return;

      let attempts = 0;
      const tick = () => {
        attempts += 1;
        window.scrollTo({ top: savedY, behavior: 'auto' });
        if (Math.abs(window.scrollY - savedY) < 2) return;
        if (attempts >= 20) return;
        setTimeout(tick, 50);
      };
      requestAnimationFrame(tick);
    };

    restoreExactScroll();
    window.addEventListener('load', restoreExactScroll, { once: true });
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => restoreExactScroll()).catch(() => {});
    }

    updateActiveSection();

    // Smooth scroll interceptor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 120;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          try {
            localStorage.setItem(anchorKey, href.replace('#', ''));
          } catch {}
          // Force save scroll after animation roughly ends
          setTimeout(saveScrollY, 500);
          setTimeout(updateActiveSection, 500);
        }
      });
    });
  })();

});



