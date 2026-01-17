document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-video');
    
    // Animation is 2.5s total.
    // We start the video at 1.8s (1800ms) so it plays just as the phone faces the user.
    setTimeout(() => {
      if(video) {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      }
    }, 1800); 
  });



document.addEventListener('DOMContentLoaded', () => {
    // ... existing video code ...
    const video = document.getElementById('hero-video');
    setTimeout(() => {
      if(video) {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      }
    }, 1800);

    // --- NEW CODE START ---
    
    // Setup the observer to watch for the cards
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 20% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add 'active' class to trigger CSS animations
          entry.target.classList.add('active');
          // Stop watching once animated
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Tell observer to watch all cards with our trigger class
    document.querySelectorAll('.js-visual-trigger').forEach((el) => {
      observer.observe(el);
    });
    
    // --- NEW CODE END ---
  });











  // ... existing code ...

  // --- 3. Feature Accordion Logic ---
  const cards = document.querySelectorAll('.feature-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // 1. Remove active class from all cards
      cards.forEach(c => c.classList.remove('active'));
      
      // 2. Add active class to clicked card
      card.classList.add('active');
    });
  });