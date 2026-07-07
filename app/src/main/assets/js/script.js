/**
 * Greenline Pest Control - Client-side Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. PRE-LOADER HIDE
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
        // Safety timeout in case load event takes too long
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 3000);
    }

    // 2. DISMISSIBLE TOP BANNER
    const topBanner = document.getElementById('topBanner');
    const closeBannerBtn = document.getElementById('closeBanner');
    if (topBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            topBanner.style.opacity = '0';
            topBanner.style.height = '0';
            setTimeout(() => {
                topBanner.style.display = 'none';
            }, 300);
        });
    }

    // 3. STICKY NAVBAR STYLING & BACK TO TOP BUTTON
    const header = document.querySelector('header');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky Navbar
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollPos > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    // 4. MOBILE NAVBAR NAVIGATION
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

    function toggleMobileMenu() {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
        navOverlay.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    }

    if (hamburger && mobileNav && navOverlay) {
        hamburger.addEventListener('click', toggleMobileMenu);
        navOverlay.addEventListener('click', toggleMobileMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('open')) {
                    toggleMobileMenu();
                }
            });
        });
    }

    // 5. SCROLL-REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal');
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', checkReveal);
    // Initial check on load
    setTimeout(checkReveal, 200);

    // 6. ANIMATED TRUST COUNTERS (DYNAMIC COUNTERS)
    const counters = document.querySelectorAll('.trust-number');
    let counterAnimated = false;

    function animateCounters() {
        if (counterAnimated || counters.length === 0) return;

        const trustSection = document.querySelector('.trust-bar');
        if (!trustSection) return;

        const rect = trustSection.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (visible) {
            counterAnimated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const suffix = counter.getAttribute('data-suffix') || '';
                let current = 0;
                const duration = 1500; // ms
                const stepTime = Math.max(Math.floor(duration / target), 10);
                
                const timer = setInterval(() => {
                    current += Math.ceil(target / (duration / stepTime));
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = current + suffix;
                }, stepTime);
            });
        }
    }
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check if initially visible

    // 7. TESTIMONIALS CAROUSEL
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (track) {
        const slides = Array.from(track.children);
        let currentIndex = 0;
        let autoPlayTimer;

        // Get count of visible slides based on window width
        function getVisibleCount() {
            if (window.innerWidth >= 992) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        // Generate dot indicators
        function setupDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const visibleCount = getVisibleCount();
            const dotCount = Math.max(slides.length - visibleCount + 1, 1);
            
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoplay();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateCarousel() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            const visibleCount = getVisibleCount();
            
            // Constrain index
            const maxIndex = Math.max(slides.length - visibleCount, 0);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            const amountToMove = currentIndex * (slideWidth + 30); // 30 is the gap in CSS
            track.style.transform = `translateX(-${amountToMove}px)`;

            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.carousel-dot');
                dots.forEach((dot, idx) => {
                    if (idx === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(slides.length - visibleCount, 0);
            if (currentIndex >= maxIndex) {
                currentIndex = 0; // wrap around
            } else {
                currentIndex++;
            }
            updateCarousel();
        }

        function prevSlide() {
            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(slides.length - visibleCount, 0);
            if (currentIndex <= 0) {
                currentIndex = maxIndex; // wrap around
            } else {
                currentIndex--;
            }
            updateCarousel();
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoplay();
            });
        }

        function startAutoplay() {
            autoPlayTimer = setInterval(nextSlide, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoPlayTimer);
            startAutoplay();
        }

        // Initialize Carousel
        setupDots();
        updateCarousel();
        startAutoplay();

        window.addEventListener('resize', () => {
            setupDots();
            updateCarousel();
        });

        // Pause autoplay on mouse enter
        track.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
        track.addEventListener('mouseleave', startAutoplay);
    }

    // 8. BOOKING MODAL & WHATSAPP AUTO-FILL
    const modalOverlay = document.getElementById('bookingModalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const bookingForm = document.getElementById('bookingForm');
    const serviceDropdown = document.getElementById('serviceNeeded');

    // Trigger buttons
    const triggerButtons = document.querySelectorAll('[data-open-modal]');

    let previouslyFocusedElement = null;

    function openModal(preSelectedService = "") {
        if (!modalOverlay) return;
        
        previouslyFocusedElement = document.activeElement;
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Pre-select service/package if tagged
        if (preSelectedService && serviceDropdown) {
            serviceDropdown.value = preSelectedService;
        }

        // Focus first field
        const firstInput = bookingForm.querySelector('input');
        if (firstInput) setTimeout(() => firstInput.focus(), 100);

        // Trap focus
        document.addEventListener('keydown', trapFocus);
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
        
        // Reset form errors
        const errorTexts = bookingForm.querySelectorAll('.form-error');
        errorTexts.forEach(el => el.style.display = 'none');
        const invalidInputs = bookingForm.querySelectorAll('.form-control');
        invalidInputs.forEach(el => el.classList.remove('invalid'));

        document.removeEventListener('keydown', trapFocus);
        if (previouslyFocusedElement) previouslyFocusedElement.focus();
    }

    function trapFocus(e) {
        if (!modalOverlay || !modalOverlay.classList.contains('open')) return;
        
        const focusableElements = modalOverlay.querySelectorAll('a, button, input, select, textarea');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }

    if (triggerButtons.length > 0) {
        triggerButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const service = btn.getAttribute('data-service') || "";
                openModal(service);
            });
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Form validation and WhatsApp forward
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Fetch values
            const nameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const mobileInput = document.getElementById('mobileNumber');
            const serviceSelect = document.getElementById('serviceNeeded');
            const addressInput = document.getElementById('propertyAddress');
            const dateInput = document.getElementById('preferredDate');
            const timeSelect = document.getElementById('preferredTime');
            const messageInput = document.getElementById('additionalMessage');

            let isValid = true;

            // Helper for validation display
            function validateField(input, condition, errorId) {
                const errorEl = document.getElementById(errorId);
                if (condition) {
                    input.classList.remove('invalid');
                    if (errorEl) errorEl.style.display = 'none';
                } else {
                    input.classList.add('invalid');
                    if (errorEl) errorEl.style.display = 'block';
                    isValid = false;
                }
            }

            // Name: min 2 characters
            validateField(nameInput, nameInput.value.trim().length >= 2, 'nameError');

            // Email: optional, but if present must be valid
            const emailValue = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmailValid = emailValue === "" || emailPattern.test(emailValue);
            validateField(emailInput, isEmailValid, 'emailError');

            // Mobile: exactly 10 digits starting with 6-9
            const mobileValue = mobileInput.value.trim();
            const mobilePattern = /^[6-9]\d{9}$/;
            validateField(mobileInput, mobilePattern.test(mobileValue), 'mobileError');

            // Service: required
            validateField(serviceSelect, serviceSelect.value !== "", 'serviceError');

            // Address: required
            validateField(addressInput, addressInput.value.trim().length > 0, 'addressError');

            // Date: required
            validateField(dateInput, dateInput.value !== "", 'dateError');

            // Time: required
            validateField(timeSelect, timeSelect.value !== "", 'timeError');

            if (!isValid) {
                // Focus on the first invalid element
                const firstInvalid = bookingForm.querySelector('.form-control.invalid');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Build Message
            const emailString = emailValue || "Not provided";
            const messageString = messageInput.value.trim() || "None";
            const messageText = `New Booking Request - Greenline Pest Control

Name: ${nameInput.value.trim()}
Mobile: ${mobileInput.value.trim()}
Email: ${emailString}
Service/Package: ${serviceSelect.value}
Address: ${addressInput.value.trim()}
Preferred Date: ${dateInput.value}
Preferred Time: ${timeSelect.value}
Message: ${messageString}

Please confirm this booking.`;

            // URL Encode Properly
            const encodedMessage = encodeURIComponent(messageText);
            const waUrl = `https://wa.me/917559352915?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(waUrl, "_blank");

            // Close Modal
            closeModal();

            // Clear Form Inputs
            bookingForm.reset();

            // Show Custom On-page Confirmation Banner
            const confirmationBanner = document.getElementById('confirmationBanner');
            if (confirmationBanner) {
                confirmationBanner.classList.add('show');
                
                const dismissBannerBtn = document.getElementById('closeConfirmBanner');
                if (dismissBannerBtn) {
                    dismissBannerBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        confirmationBanner.classList.remove('show');
                    });
                }

                // Auto hide after 15 seconds
                setTimeout(() => {
                    confirmationBanner.classList.remove('show');
                }, 15000);
            }
        });
    }
});
