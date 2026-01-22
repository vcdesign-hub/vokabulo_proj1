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
















