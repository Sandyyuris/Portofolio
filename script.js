// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('show');
});

navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('show');
    }
});
// Slider 
let currentSlide = 0;
const slides = document.querySelectorAll('.slides img, .slides .image-placeholder');
const totalSlides = slides.length;
function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            if (slide.tagName === 'IMG') {
                slide.classList.add('active');
            } else {
                slide.style.display = 'flex';
            }
        } else {
            if (slide.tagName === 'IMG') {
                slide.classList.remove('active');
            } else {
                slide.style.display = 'none';
            }
        }
    });
}
function changeSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    showSlide(currentSlide);
}
// Initialize slider
if (totalSlides > 0) {
    showSlide(0);
}
// Cek apakah gambar berhasil dimuat
const images = document.querySelectorAll('.slides img');
let loadedImages = 0;

images.forEach(img => {
    img.onload = () => loadedImages++;
    img.onerror = () => {
        img.style.display = 'none';
        if (loadedImages === 0 && img === images[images.length - 1]) {
            document.querySelector('.image-placeholder').style.display = 'flex';
            showSlide(totalSlides - 1);
        }
    };
});
// Animasi scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});
// Scroll ke section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Header scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});