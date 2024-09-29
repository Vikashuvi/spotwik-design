// Function to check which section is currently in view
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 50 && window.pageYOffset < sectionTop + sectionHeight - 50) {
            currentSection = section.id;
        }
    });

    return currentSection;
}

// Function to update active nav item
function updateActiveNavItem() {
    const currentSection = getCurrentSection();
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        if (item.getAttribute('href').slice(1) === currentSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Improved smooth scrolling function
function smoothScroll(targetId, duration) {
    const target = document.querySelector(targetId);
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - 80; // Subtract 80px to account for fixed header
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Event listener for nav items
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId, 1000); // 1000ms (1 second) duration for the scroll animation
            
            // Close mobile menu if it's open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Mobile menu functionality
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);

    // Initial call to set the active nav item
    updateActiveNavItem();
});