// Simple form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('valuationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Show loading
            submitBtn.innerHTML = '📨 Wysyłanie...';
            submitBtn.disabled = true;
            
            // Show success after 1 second
            setTimeout(function() {
                alert('✅ Dziękujemy! Twoja wycena została zapisana.\n\n📞 Proszę zadzwonić: +48 123 456 789\n📱 Lub napisać na WhatsApp z zdjęciami auta!');
                
                // Reset form
                form.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
        
        console.log('✅ Form found and event listener added');
    } else {
        console.log('❌ Form not found! Check id="valuationForm"');
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
