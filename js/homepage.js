// Homepage JavaScript - Special Model Management

$(document).ready(function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Hero Slider Configuration
    $('.hero-slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut'
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        var parallax = $('.hero-slide');
        var speed = 0.5;
        
        parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    });

    // Model card hover effects
    $('.model-card').hover(
        function() {
            $(this).find('.model-overlay').fadeIn(300);
        },
        function() {
            $(this).find('.model-overlay').fadeOut(300);
        }
    );

    // Service card animations
    $('.service-card').hover(
        function() {
            $(this).find('.service-icon').addClass('pulse');
        },
        function() {
            $(this).find('.service-icon').removeClass('pulse');
        }
    );

    // Feature item hover effects
    $('.feature-item').hover(
        function() {
            $(this).find('i').addClass('bounce');
        },
        function() {
            $(this).find('i').removeClass('bounce');
        }
    );

    // Button click animations
    $('.btn').on('click', function() {
        $(this).addClass('btn-clicked');
        setTimeout(() => {
            $(this).removeClass('btn-clicked');
        }, 200);
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // Lazy loading for images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }

    // Counter animation for statistics (if needed)
    function animateCounters() {
        $('.counter').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger counter animation when in view
    $('.counter').each(function() {
        var $this = $(this);
        var counterTop = $this.offset().top;
        var counterHeight = $this.height();
        var windowHeight = $(window).height();
        var windowTop = $(window).scrollTop();
        
        if (windowTop + windowHeight > counterTop && windowTop < counterTop + counterHeight) {
            if (!$this.hasClass('animated')) {
                $this.addClass('animated');
                animateCounters();
            }
        }
    });

    // Form validation for contact forms
    $('form').on('submit', function(e) {
        var isValid = true;
        var requiredFields = $(this).find('[required]');
        
        requiredFields.each(function() {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showNotification('Please fill in all required fields.', 'error');
        }
    });

    // Notification system
    function showNotification(message, type = 'info') {
        var notification = $('<div class="notification notification-' + type + '">' + message + '</div>');
        $('body').append(notification);
        
        setTimeout(() => {
            notification.addClass('show');
        }, 100);
        
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Mobile menu toggle
    $('.js-colorlib-nav-toggle').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('menu-open');
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking on links
    $('.colorlib-main-nav a').on('click', function() {
        $('body').removeClass('menu-open');
        $('.js-colorlib-nav-toggle').removeClass('active');
    });

    // Preloader (if needed)
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });

    // Back to top button
    var backToTop = $('<a href="#" class="back-to-top"><i class="icon-arrow-up"></i></a>');
    $('body').append(backToTop);

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });

    backToTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Typing effect for hero title (optional)
    function typeWriter(element, text, speed = 100) {
        var i = 0;
        element.html('');
        
        function type() {
            if (i < text.length) {
                element.html(element.html() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect if needed
    // typeWriter($('.hero-title'), 'Discover Exceptional Talent');

    // Performance optimization: Debounce scroll events
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Apply debouncing to scroll events
    var debouncedScroll = debounce(function() {
        // Scroll-based animations and effects
    }, 10);

    $(window).on('scroll', debouncedScroll);

    // Accessibility improvements
    $('a, button').on('focus', function() {
        $(this).addClass('focus-visible');
    }).on('blur', function() {
        $(this).removeClass('focus-visible');
    });

    // Keyboard navigation
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('body').removeClass('menu-open');
            $('.js-colorlib-nav-toggle').removeClass('active');
        }
    });

    // Analytics tracking for important interactions
    $('.hero-buttons .btn, .cta-section .btn').on('click', function() {
        var action = $(this).text().trim();
        var href = $(this).attr('href');
        
        // Track button clicks (replace with your analytics code)
        console.log('Button clicked:', action, 'Link:', href);
    });

    // Model card interactions
    $('.model-card').on('click', function() {
        var modelName = $(this).find('h4').text();
        console.log('Model viewed:', modelName);
    });

    // Service card interactions
    $('.service-card').on('click', function() {
        var serviceName = $(this).find('h4').text();
        console.log('Service viewed:', serviceName);
    });

    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Console log for debugging
    console.log('Special Model Management - Homepage loaded successfully!');
});

// CSS for additional animations
const additionalStyles = `
<style>
.btn-clicked {
    transform: scale(0.95) !important;
}

.pulse {
    animation: pulse 0.6s ease-in-out;
}

.bounce {
    animation: bounce 0.6s ease-in-out;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification-info {
    background: #007bff;
}

.notification-error {
    background: #dc3545;
}

.notification-success {
    background: #28a745;
}

.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #007bff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
}

.back-to-top.show {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    background: #0056b3;
    transform: translateY(-3px);
}

.focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

header.scrolled {
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(10px);
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy.loaded {
    opacity: 1;
}

@media (max-width: 768px) {
    .back-to-top {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);
