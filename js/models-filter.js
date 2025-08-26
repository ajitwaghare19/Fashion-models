// Models Filter JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modelItems = document.querySelectorAll('.model-item');
    const modelsGrid = document.getElementById('models-grid');

    // Initialize with fade-in animations
    function initializeAnimations() {
        modelItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Filter function
    function filterModels(category) {
        modelItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category
            const category = this.getAttribute('data-filter');
            
            // Apply filter with animation
            filterModels(category);
            
            // Add click animation to button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add hover effects to model cards
    modelItems.forEach(item => {
        const card = item.querySelector('.model-card');
        const overlay = item.querySelector('.model-overlay');
        
        if (card && overlay) {
            item.addEventListener('mouseenter', function() {
                card.style.transform = 'translateY(-10px)';
                overlay.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', function() {
                card.style.transform = 'translateY(0)';
                overlay.style.opacity = '0';
            });
        }
    });

    // Add smooth scrolling for anchor links
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

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe model items for scroll animations
    modelItems.forEach(item => {
        observer.observe(item);
    });

    // Add loading states for images
    const modelImages = document.querySelectorAll('.model-image img');
    modelImages.forEach(img => {
        const card = img.closest('.model-card');
        
        img.addEventListener('load', function() {
            if (card) {
                card.classList.remove('loading');
            }
        });
        
        img.addEventListener('error', function() {
            if (card) {
                card.classList.remove('loading');
                // Add fallback image or error state
                this.src = '/images/placeholder.jpg';
            }
        });
    });

    // Add keyboard navigation for filter buttons
    filterButtons.forEach((button, index) => {
        button.setAttribute('tabindex', '0');
        
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add search functionality (optional)
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search models...';
        searchInput.className = 'form-control mb-3';
        searchInput.style.maxWidth = '300px';
        searchInput.style.margin = '0 auto';
        
        const filterContainer = document.querySelector('.filter-container');
        if (filterContainer) {
            filterContainer.appendChild(searchInput);
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                modelItems.forEach(item => {
                    const modelName = item.querySelector('.model-name').textContent.toLowerCase();
                    
                    if (modelName.includes(searchTerm)) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        }
    }

    // Initialize everything
    initializeAnimations();
    
    // Optional: Add search functionality
    // addSearchFunctionality();
    
    console.log('Models filter initialized successfully!');
});
