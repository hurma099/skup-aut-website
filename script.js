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
            
            // Form will be submitted to Formspree
            console.log('Form submitted to Formspree');
            
            // Restore button after form redirects
            setTimeout(() => {
                // This will only run if form doesn't redirect (error case)
                if (!submitBtn.disabled) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 5000);
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
