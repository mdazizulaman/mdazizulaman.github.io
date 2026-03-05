// Dynamic copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const icon = themeToggle.querySelector('i');

// Check for saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon(next);
});

function updateIcon(theme) {
    icon.className = theme === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
}

// Sticky nav shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const hIcon = hamburger.querySelector('i');
    hIcon.className = navLinks.classList.contains('open') ? 'bi bi-x-lg' : 'bi bi-list';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelector('i').className = 'bi bi-list';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = navLinks.querySelectorAll('a');

function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navItems.forEach(a => a.classList.remove('active'));
            const active = navLinks.querySelector(`a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Scroll fade-in animation
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));
