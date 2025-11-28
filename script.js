// Smooth scroll for navigation and form buttons
document.querySelectorAll('nav a, .btn-secondary, .advantage, .offer-item').forEach(element => {
    element.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#') && targetId !== '#contact') {
            e.preventDefault();
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

// Form handling for Formspree
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('valuationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Show loading
            submitBtn.innerHTML = '📨 Wysyłanie...';
            submitBtn.disabled = true;
            
            // Formspree will handle the actual submission
            console.log('Form submitted to Formspree');
            
            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
        
        console.log('✅ Form found and Formspree configured');
    }
});

// Phone number validation
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^\d+]/g, '');
    });
});

// Update footer year
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} SKUP AUT. Wszelkie prawa zastrzeżone.`;
    }
});
