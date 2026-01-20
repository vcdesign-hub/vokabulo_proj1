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

  




  



  // --- 7. SLIDER LOGIC (Sequence Style) ---
  const track = document.getElementById('showcase-track');
  const slides = document.querySelectorAll('.showcase-slide');
  const nextBtn = document.getElementById('next-slide');
  const prevBtn = document.getElementById('prev-slide');
  
  if (track && slides.length > 0) {
    let slideIndex = 0;

    const updateSlider = () => {
      const slideWidth = slides[0].offsetWidth;
      const gap = 32; // Matches CSS gap
      const windowWidth = window.innerWidth;
      
      // Center Math: (Screen Center) - (Slide Center)
      const centerOffset = (windowWidth / 2) - (slideWidth / 2);
      const moveAmount = centerOffset - (slideIndex * (slideWidth + gap));

      track.style.paddingLeft = '0';
      track.style.transform = `translateX(${moveAmount}px)`;

      // Active Classes
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === slideIndex);
      });
    };

    if(nextBtn) nextBtn.addEventListener('click', () => {
      slideIndex = (slideIndex + 1) % slides.length;
      updateSlider();
    });

    if(prevBtn) prevBtn.addEventListener('click', () => {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });

    window.addEventListener('resize', () => updateSlider());
    
    // Initial Calc
    setTimeout(updateSlider, 100);
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
















