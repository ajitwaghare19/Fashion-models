// Modern Footer Functionality
$(document).ready(function() {
    
    // Add scroll-to-top button
    $('body').append('<a href="#" class="scroll-to-top"><i class="icon-arrow-up"></i></a>');
    
    // Show/hide scroll-to-top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-to-top').addClass('show');
        } else {
            $('.scroll-to-top').removeClass('show');
        }
    });
    
    // Smooth scroll to top
    $('.scroll-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
    
    // Footer link hover effects
    $('.footer-links a').hover(
        function() {
            $(this).addClass('hovered');
        },
        function() {
            $(this).removeClass('hovered');
        }
    );
    
    // Social media link tracking (optional)
    $('.social-link').on('click', function() {
        const platform = $(this).find('i').attr('class').split('-')[1];
        // You can add analytics tracking here
        console.log('Social media clicked:', platform);
    });
    
    // Footer animation on scroll
    function animateFooterOnScroll() {
        const footer = $('.modern-footer');
        const footerTop = footer.offset().top;
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop + windowHeight > footerTop) {
            footer.addClass('animated');
        }
    }
    
    // Call animation function on scroll
    $(window).on('scroll', animateFooterOnScroll);
    
    // Initialize footer animations
    animateFooterOnScroll();
    
    // Footer widget hover effects
    $('.footer-widget').hover(
        function() {
            $(this).addClass('widget-hover');
        },
        function() {
            $(this).removeClass('widget-hover');
        }
    );
    
    // Contact info click tracking
    $('.contact-item a').on('click', function() {
        const contactType = $(this).attr('href').split(':')[0];
        console.log('Contact clicked:', contactType);
    });
    
    // Footer bottom links
    $('.footer-bottom-links a').on('click', function(e) {
        e.preventDefault();
        const linkText = $(this).text();
        console.log('Footer link clicked:', linkText);
        // You can add page navigation or modal opening here
    });
    
    // Newsletter signup (if added later)
    $('#newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const email = $('#newsletter-email').val();
        if (email) {
            // Add newsletter signup logic here
            console.log('Newsletter signup:', email);
            alert('Thank you for subscribing to our newsletter!');
        }
    });
    
    // Footer responsive behavior
    function handleFooterResponsive() {
        if ($(window).width() <= 768) {
            $('.footer-widget').addClass('mobile-layout');
        } else {
            $('.footer-widget').removeClass('mobile-layout');
        }
    }
    
    // Call responsive function on load and resize
    $(window).on('load resize', handleFooterResponsive);
    
    // Footer performance optimization
    let footerScrollTimeout;
    $(window).on('scroll', function() {
        clearTimeout(footerScrollTimeout);
        footerScrollTimeout = setTimeout(function() {
            // Debounced scroll handling
        }, 100);
    });
    
    // Add loading animation to footer
    $('.modern-footer').addClass('footer-loaded');
    
    // Footer accessibility improvements
    $('.footer-links a, .social-link, .contact-item a').attr('tabindex', '0');
    
    // Keyboard navigation for footer
    $('.footer-links a, .social-link, .contact-item a').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });
    
    // Footer SEO improvements
    $('.footer-links a').each(function() {
        const linkText = $(this).text();
        const linkHref = $(this).attr('href');
        if (linkHref && linkHref !== '#') {
            $(this).attr('title', `Visit ${linkText} page`);
        }
    });
    
    // Footer analytics tracking
    $('.footer-links a, .social-link').on('click', function() {
        const linkText = $(this).text() || $(this).find('i').attr('class');
        const linkHref = $(this).attr('href');
        
        // Track footer link clicks
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'Footer',
                'event_label': linkText,
                'link_url': linkHref
            });
        }
    });
});
