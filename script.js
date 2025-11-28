// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
document.getElementById('carForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем данные формы
    const formData = new FormData(this);
    const carData = {
        brand: this.querySelector('input[type="text"]').value,
        year: this.querySelector('input[type="number"]').value,
        mileage: this.querySelectorAll('input[type="text"]')[1].value,
        condition: this.querySelector('select').value,
        phone: this.querySelector('input[type="tel"]').value
    };
    
    // В реальном приложении здесь был бы AJAX запрос на сервер
    console.log('Данные формы:', carData);
    
    // Показываем сообщение об успехе
    alert('Dziękujemy za zgłoszenie! Skontaktujemy się z Tobą w ciągu 30 minut.');
    
    // Очищаем форму
    this.reset();
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 58, 138, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = '#1e3a8a';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';
    }
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за карточками услуг
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Наблюдаем за features
document.querySelectorAll('.feature').forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(30px)';
    feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(feature);
});

// Валидация телефона
document.querySelector('input[type="tel"]').addEventListener('input', function(e) {
    // Удаляем все нечисловые символы
    this.value = this.value.replace(/[^\d+]/g, '');
});

// Плавная загрузка страницы
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Добавляем текущий год в футер
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} SKUP AUT. Wszelkie prawa zastrzeżone.`;
    }
});
