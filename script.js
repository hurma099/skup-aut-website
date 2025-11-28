// Smooth scroll for navigation
document.querySelectorAll('nav a, .nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Form handling with SendGrid
document.getElementById('valuationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '📨 Wysyłanie...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        brand: this.querySelector('[name="brand"]').value,
        year: this.querySelector('[name="year"]').value,
        mileage: this.querySelector('[name="mileage"]').value,
        condition: this.querySelector('[name="condition"]').value,
        general_condition: this.querySelector('[name="general_condition"]').value,
        damages: getCheckboxValues('damages'),
        equipment: getCheckboxValues('equipment'),
        service_history: this.querySelector('[name="service_history"]').value,
        additional_info: this.querySelector('[name="additional_info"]').value || 'Brak uwag',
        name: this.querySelector('[name="name"]').value,
        phone: this.querySelector('[name="phone"]').value,
        email: this.querySelector('[name="email"]').value,
        date: new Date().toLocaleString('pl-PL')
    };
    
    // Send email using SendGrid
    sendEmailSendGrid(formData)
        .then(function(response) {
            if (response.ok) {
                alert('✅ Dziękujemy! Twoja wycena została wysłana. Skontaktujemy się z Tobą w ciągu 15 minut!');
                document.getElementById('valuationForm').reset();
            } else {
                throw new Error('Błąd wysyłania');
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
            alert('❌ Przepraszamy, wystąpił błąd. Proszę spróbować ponownie lub zadzwonić bezpośrednio.');
        })
        .finally(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});

// SendGrid API function
async function sendEmailSendGrid(formData) {
    // ZASTĄP TYM KLUCZEM: Twój SendGrid API Key
    const SENDGRID_API_KEY = 'SG.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';
    
    // ZASTĄP TYM ID: Twój Template ID z SendGrid
    const TEMPLATE_ID = 'd-b0fb400d34d742908d693e773e5f968e ';
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{ 
                    email: 'skupnaszybko@gmail.com',
                    name: 'Skup Aut'
                }],
                dynamic_template_data: formData
            }],
            from: { 
                email: 'noreply@skupaut.pl', 
                name: 'Skup Aut - Formularz' 
            },
            reply_to: {
                email: formData.email,
                name: formData.name
            },
            template_id: TEMPLATE_ID
        })
    });
    
    return response;
}

// Helper function to get checkbox values
function getCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value).join(', ') || 'Brak';
}

// Phone number validation
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^\d+]/g, '');
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(76, 29, 149, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.background = 'var(--primary-purple)';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    }
});

// Animation on scroll
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

// Observe elements for animation
document.querySelectorAll('.advantage, .offer-item, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Update footer year
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} SKUP AUT. Wszelkie prawa zastrzeżone.`;
    }
});
