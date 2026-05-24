// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// ===== SKILL BAR ANIMATION =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-bar-fill');
            if (fill) {
                const width = fill.getAttribute('data-width');
                setTimeout(() => {
                    fill.style.width = width + '%';
                }, 200);
            }
            skillBarObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill bar items
document.querySelectorAll('.skill-bar-item').forEach(item => {
    skillBarObserver.observe(item);
});

// ===== PORTFOLIO FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check if website is on localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
            alert('⚠️ PERHATIAN!\n\nForm tidak akan bekerja di localhost/komputer lokal.\n\nSilakan:\n1. Upload website ke hosting online, ATAU\n2. Gunakan tombol WhatsApp/Email di bawah form untuk kontak langsung.\n\nTerima kasih!');
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        try {
            // Send to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                contactForm.style.display = 'none';
                successMessage.classList.add('show');
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'flex';
                    successMessage.classList.remove('show');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error message
            errorMessage.classList.add('show');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 5000);
            
            // Show alert with alternative contact methods
            setTimeout(() => {
                if (confirm('Form gagal terkirim. Apakah Anda ingin menghubungi via WhatsApp sekarang?')) {
                    window.open('https://wa.me/6289518626053?text=Halo%20Dzaky,%20saya%20ingin%20berkolaborasi%20dengan%20Anda', '_blank');
                }
            }, 1000);
        }
    });
}

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll('.about-card, .portfolio-card, .soft-skill-card, .certification-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2F5233, #3A6B3F);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    font-size: 18px;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.background = '#F4D35E';
    scrollTopBtn.style.color = '#1A1A1A';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.background = 'linear-gradient(135deg, #2F5233, #3A6B3F)';
    scrollTopBtn.style.color = 'white';
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Halo! Selamat datang di portfolio saya!', 'color: #2F5233; font-size: 18px; font-weight: bold;');
console.log('%c🚀 Website ini dibuat dengan HTML, CSS, dan JavaScript', 'color: #F4D35E; font-size: 14px;');
console.log('%c💼 Tertarik untuk berkolaborasi? Hubungi saya!', 'color: #3A6B3F; font-size: 14px;');

// ===== CHESS THEME - SCROLL PROGRESS INDICATOR =====
const scrollProgress = document.querySelector('.scroll-progress');

if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// ===== CHESS THEME - CURSOR TRAIL EFFECT - REMOVED =====
// Cursor trail removed for better usability

// ===== CHESS THEME - FLOATING CHESS PIECES SCROLL EFFECT =====
const floatingPieces = document.querySelectorAll('.chess-piece');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    floatingPieces.forEach((piece, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        piece.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// ===== CHESS THEME - INTERACTIVE CARD EFFECTS - REMOVED =====
// Tilt effect removed for better usability

// ===== CHESS THEME - ANIMATED SECTION TITLES =====
const sectionTitles = document.querySelectorAll('.section-title-wrapper');

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, 100);
            
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

sectionTitles.forEach(title => {
    titleObserver.observe(title);
});

// ===== CHESS THEME - BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== CHESS THEME - PARALLAX EFFECT FOR PAGE HEADERS =====
const pageHeaders = document.querySelectorAll('.page-header');

window.addEventListener('scroll', () => {
    pageHeaders.forEach(header => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        header.style.transform = `translateY(${rate}px)`;
    });
});

// ===== CHESS THEME - STAGGERED ANIMATION FOR GRIDS =====
const animateGrid = (gridSelector, itemSelector) => {
    const grid = document.querySelector(gridSelector);
    if (!grid) return;
    
    const items = grid.querySelectorAll(itemSelector);
    
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px) scale(0.9)';
                        
                        setTimeout(() => {
                            item.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    }, index * 100);
                });
                gridObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    gridObserver.observe(grid);
};

// Apply staggered animations to various grids
animateGrid('.skills-tags-grid', '.skill-tag-item');
animateGrid('.soft-skills-grid', '.soft-skill-card');
animateGrid('.portfolio-grid', '.portfolio-card');
animateGrid('.hobby-grid', '.hobby-item');

// ===== CHESS THEME - ENHANCED HOVER EFFECTS =====
document.querySelectorAll('.portfolio-card').forEach(card => {
    const overlay = card.querySelector('.portfolio-overlay');
    
    card.addEventListener('mouseenter', () => {
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
        }
    });
});

// ===== CHESS THEME - TYPING EFFECT FOR HERO TITLE =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const titleLines = heroTitle.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// ===== CHESS THEME - PHOTO FRAME ANIMATION =====
const photoFrame = document.querySelector('.photo-frame');
if (photoFrame) {
    const img = photoFrame.querySelector('img');
    
    if (img) {
        img.addEventListener('load', () => {
            photoFrame.style.opacity = '0';
            photoFrame.style.transform = 'scale(0.8) rotate(-5deg)';
            
            setTimeout(() => {
                photoFrame.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                photoFrame.style.opacity = '1';
                photoFrame.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    }
}

// ===== CHESS THEME - SMOOTH PAGE TRANSITIONS =====
document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Don't prevent default for external links or same page
        if (href.startsWith('http') || href === window.location.pathname) return;
        
        e.preventDefault();
        
        // Create transition overlay
        const transition = document.createElement('div');
        transition.className = 'page-transition active';
        document.body.appendChild(transition);
        
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    });
});

// ===== CHESS THEME - INTERACTIVE TIMELINE =====
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, 100);
            
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ===== CHESS THEME - NAVBAR ACTIVE STATE =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

// ===== FORM VALIDATION =====
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#E76F51';
        } else {
            input.style.borderColor = '#DEE2E6';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '#F4D35E';
    });
});

// ===== COUNTER ANIMATION (for stats) =====
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetText = target.textContent;
            const targetNumber = parseInt(targetText.replace(/\D/g, ''));
            const suffix = targetText.replace(/[0-9]/g, '');
            
            let current = 0;
            const increment = targetNumber / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    target.textContent = targetNumber + suffix;
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(current) + suffix;
                }
            }, 30);
            
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});
