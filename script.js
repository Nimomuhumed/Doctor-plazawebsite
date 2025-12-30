// Main JavaScript for Garissa Doctors Plaza Website

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // Appointment Form Submission
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const notes = document.getElementById('notes').value.trim();
            
            // Basic validation
            if (!name || !phone || !service || !date) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Format date
            const formattedDate = new Date(date).toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Create WhatsApp message
            const whatsappNumber = '254796786279';
            const message = `*NEW APPOINTMENT REQUEST*%0A%0A` +
                           `*Name:* ${name}%0A` +
                           `*Phone:* ${phone}%0A` +
                           `*Service:* ${service}%0A` +
                           `*Preferred Date:* ${formattedDate}%0A` +
                           `*Notes:* ${notes || 'None'}%0A%0A` +
                           `_This appointment request was sent via Garissa Doctors Plaza website_`;
            
            // Open WhatsApp
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(whatsappURL, '_blank');
            
            // Reset form
            appointmentForm.reset();
            
            // Show success message
            alert('Opening WhatsApp with your appointment details. Please send the message to confirm your booking.');
        });
    }
    
    // Set minimum date for appointment to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // Doctor page WhatsApp buttons
    document.querySelectorAll('.whatsapp-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const doctorName = this.closest('.doctor-card').querySelector('h3').textContent;
            const whatsappURL = `https://wa.me/254796786279?text=Hello%20${encodeURIComponent(doctorName)},%20I'd%20like%20to%20book%20an%20appointment%20with%20you.`;
            window.open(whatsappURL, '_blank');
        });
    });
    
    // Active navigation link highlighting
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-list a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            
            if (currentPage === linkPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage.includes('index.html') && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // Admin dashboard functionality
    const adminTable = document.querySelector('.admin-table');
    if (adminTable) {
        // Add sample data rows dynamically
        const addSampleDataBtn = document.querySelector('.btn[href="#"]');
        if (addSampleDataBtn && addSampleDataBtn.textContent.includes('Add New')) {
            addSampleDataBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('In a full implementation, this would open a form to add new data. This is a frontend-only demonstration.');
            });
        }
    }
    
    // Update current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(element => {
        if (element.textContent.includes('2023')) {
            element.textContent = element.textContent.replace('2023', currentYear);
        }
    });
});

// Form validation helper
function validatePhoneNumber(phone) {
    const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
// Update active navigation for admin pages
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Check for main pages
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage.includes('index.html') && linkPage === 'index.html') ||
            (currentPage.includes('doctors.html') && linkPage === 'doctors.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        
        // Special handling for admin link
        if (link.classList.contains('admin-btn') && window.location.pathname.includes('admin')) {
            link.classList.add('active');
        }
    });
}