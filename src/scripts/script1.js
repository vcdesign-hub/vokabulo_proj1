// script.js

// 1. TAILWIND CONFIGURATION
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#2684FC',
                'background-light': '#FFFFFF',
                'background-dark': '#111827',
                'surface-light': '#F3F4F6',
                'surface-dark': '#1F2937',
                'text-main': '#111827'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 20px 40px -10px rgba(0,0,0,0.1)',
            }
        }
    }
}

// 2. PAGE INTERACTIVITY (Runs when HTML is ready)
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       THEME TOGGLE LOGIC
       ========================================= */
    const root = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    
    // Check storage or system preference on load
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const setTheme = (mode) => {
        if (mode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', mode);
    };

    // Apply initial theme
    if (storedTheme) {
        setTheme(storedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    }

    // Button Click Listener
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = root.classList.contains('dark');
            setTheme(isDark ? 'light' : 'dark');
        });
    }

    /* =========================================
       NAVBAR SCROLL EFFECT
       ========================================= */
    const navbarBg = document.getElementById('navbar-bg');
    const scrollThreshold = 20; // px

    function updateNavbar() {
        if (!navbarBg) return;

        if (window.scrollY > scrollThreshold) {
            // Scrolled State
            navbarBg.classList.add(
                'backdrop-blur-xl',
                'bg-white/80',
                'dark:bg-gray-900/80',
                'border-b',
                'md:border',
                'border-white/20',
                'dark:border-gray-700/50',
                'shadow-sm',
                'md:shadow-2xl',
                'navbar-glass'
            );
            navbarBg.classList.remove('bg-transparent', 'border-transparent', 'shadow-none');
        } else {
            // Top State
            navbarBg.classList.add('bg-transparent', 'border-transparent', 'shadow-none');
            navbarBg.classList.remove(
                'backdrop-blur-xl',
                'bg-white/80',
                'dark:bg-gray-900/80',
                'border-b',
                'md:border',
                'border-white/20',
                'dark:border-gray-700/50',
                'shadow-sm',
                'md:shadow-2xl',
                'navbar-glass'
            );
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Run once on load

    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const mobileMenuButton = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isClosed = mobileMenu.classList.contains('invisible');

            if (isClosed) {
                // OPEN MENU
                mobileMenu.classList.remove('opacity-0', 'invisible', '-translate-y-2');
                mobileMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                // CLOSE MENU
                mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
                mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.classList.contains('invisible')) {
                mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
                mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });
    }

    /* =========================================
       HOW IT WORKS (Image Switcher)
       ========================================= */
    const howItWorksItems = document.querySelectorAll('.how-it-works-item');
    const howItWorksImage = document.getElementById('how-it-works-image');

    howItWorksItems.forEach(item => {
        item.addEventListener('click', () => {
            // Reset active states
            howItWorksItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Switch image
            const newImage = item.dataset.image;
            if (howItWorksImage && newImage) {
                howItWorksImage.style.opacity = '0';
                setTimeout(() => {
                    howItWorksImage.src = newImage;
                    howItWorksImage.style.opacity = '1';
                }, 200);
            }
        });
    });

    /* =========================================
       FAQ ACCORDION
       ========================================= */
    const faqItems = document.querySelectorAll('.group');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('p');
            const icon = item.querySelector('.fa-plus');
            
            if (answer) answer.classList.toggle('hidden');
            if (icon) {
                icon.classList.toggle('rotate-45');
                icon.style.transition = 'transform 0.3s ease';
            }
        });
    });

    /* =========================================
       SCROLL SPY (For Support/Help Pages)
       ========================================= */
    const updateActiveSection = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.help-nav-items a');
        
        if (sections.length === 0) return; // Exit if not on support page

        let activeId = '';
        const scrollPos = window.scrollY + 150; 

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                activeId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (activeId && link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', updateActiveSection);

    /* =========================================
       SEARCH FUNCTIONALITY
       ========================================= */
    const searchInput = document.getElementById('help-search');
    const helpItems = document.querySelectorAll('.help-nav-items li');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            
            helpItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const parentSection = item.closest('.help-nav-section');
                
                if (text.includes(term)) {
                    item.classList.remove('hidden-by-search');
                    if (parentSection) parentSection.classList.remove('hidden-by-search');
                } else {
                    item.classList.add('hidden-by-search');
                }
            });

            // Hide empty sections
            document.querySelectorAll('.help-nav-section').forEach(section => {
                const visibleItems = section.querySelectorAll('li:not(.hidden-by-search)');
                if (visibleItems.length === 0 && term !== '') {
                    section.classList.add('hidden-by-search');
                } else if (visibleItems.length > 0) {
                    section.classList.remove('hidden-by-search');
                }
            });
        });
    }



    /* =========================================
       SIDEBAR ACCORDION LOGIC
       ========================================= */
       const navHeaders = document.querySelectorAll('.help-nav-section-header');

       navHeaders.forEach(header => {
           header.addEventListener('click', (e) => {
               // If clicking the actual link text, allow default navigation (jump to section)
               if (e.target.tagName === 'A') return; 
   
               e.preventDefault();
               const section = header.parentElement;
               const list = section.querySelector('ul');
               const icon = header.querySelector('.fa-chevron-down');
   
               // Toggle visibility using hidden class
               const isClosed = list.classList.contains('hidden');
               
               if (isClosed) {
                   // Open
                   list.classList.remove('hidden');
                   icon.style.transform = 'rotate(0deg)';
               } else {
                   // Close
                   list.classList.add('hidden');
                   icon.style.transform = 'rotate(-90deg)';
               }
           });
       });

    /* =========================================
       DOWNLOAD MODAL (DYNAMIC INJECTION)
       ========================================= */
    
    // 1. Define the Modal HTML in one place
    const modalHTML = `
    <div id="download-modal" class="fixed inset-0 z-[100] hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity backdrop-blur-sm" id="modal-backdrop"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm border border-gray-200 dark:border-gray-700">
                    
                    <button type="button" class="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none" id="close-modal-btn">
                        <span class="sr-only">Close</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-center">
                        <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 sm:h-12 sm:w-12 mb-4">
                            <i class="fab fa-apple text-blue-600 dark:text-blue-400 text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold leading-6 text-gray-900 dark:text-white mb-2" id="modal-title">Get Vokabulo</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Scan the QR code with your iPhone or iPad camera to download Vokabulo directly from the App Store.
                        </p>
                        
                        <div class="bg-white p-2 rounded-xl inline-block shadow-sm border border-gray-100 mb-4">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://apps.apple.com/app/vokabulo" alt="App Store QR Code" class="w-36 h-36 object-contain rounded-lg">
                        </div>

                        <div class="mt-2">
                             <p class="text-xs text-gray-400 dark:text-gray-500">Requires iOS 15.0 or later</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    // 2. Inject the Modal into the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 3. Initialize Logic
    // FIXED: Changed from '.download-trigger' to '.open-modal-btn' to match your HTML
    const downloadButtons = document.querySelectorAll('.open-modal-btn'); 
    
    const downloadModal = document.getElementById('download-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');

    // Function to open modal
    function openModal() {
        if (downloadModal) {
            downloadModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    // Function to close modal
    function closeModal() {
        if (downloadModal) {
            downloadModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    // Attach click listeners to all download buttons
    if (downloadButtons.length > 0) {
        downloadButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); 
                openModal();
            });
        });
    }

    // Close on X button click
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close on backdrop click
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    // Close on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && downloadModal && !downloadModal.classList.contains('hidden')) {
            closeModal();
        }
    });









    /* =========================================
       SCROLL ANIMATIONS (Intersection Observer)
       ========================================= */
       const animGroups = document.querySelectorAll('.anim-group');

       const observerOptions = {
           threshold: 0.2 // Trigger when 20% of the element is visible
       };
   
       const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   const target = entry.target;
                   target.classList.add('active'); // Adds the class that starts CSS animations
                   
                   // Special handling for the Circular Progress Bar
                   // We animate the stroke-dashoffset specifically here
                   const circle = target.querySelector('#progress-circle');
                   if (circle) {
                       // Circumference is approx 351. 
                       // To show ~30% progress (blue part), we offset by 70%.
                       // 351 * 0.7 = 245 offset
                       setTimeout(() => {
                           circle.style.strokeDashoffset = '245'; 
                       }, 200);
                   }
   
                   // Stop observing once animated (so it doesn't reset)
                   observer.unobserve(target);
               }
           });
       }, observerOptions);
   
       animGroups.forEach(group => {
           observer.observe(group);
       });






    
});