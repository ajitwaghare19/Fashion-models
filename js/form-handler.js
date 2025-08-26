// Form handler for Special Model Management
$(document).ready(function() {
    
    // Handle contact form submission
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = form.find('input[type="submit"]');
        const originalText = submitBtn.val();
        
        // Show loading state
        submitBtn.val('Sending...').prop('disabled', true);
        
        // Collect form data
        const formData = {
            name: form.find('input[placeholder="Your Name"]').val(),
            email: form.find('input[placeholder="Your Email"]').val(),
            subject: form.find('input[placeholder="Subject"]').val(),
            message: form.find('textarea').val()
        };
        
        // Send form data
        $.ajax({
            url: '/process-form.php',
            method: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                if (response.success) {
                    showMessage('success', response.message);
                    form[0].reset();
                } else {
                    showMessage('error', response.error || 'An error occurred. Please try again.');
                }
            },
            error: function(xhr) {
                let errorMessage = 'An error occurred. Please try again.';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage('error', errorMessage);
            },
            complete: function() {
                submitBtn.val(originalText).prop('disabled', false);
            }
        });
    });
    
    // Handle modal form submission
    $('#modalRequest form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = form.find('input[type="submit"]');
        const originalText = submitBtn.val();
        
        // Show loading state
        submitBtn.val('Sending...').prop('disabled', true);
        
        // Collect form data
        const formData = {
            name: form.find('#appointment_name').val(),
            email: form.find('#appointment_email').val(),
            date: form.find('#appointment_date').val(),
            time: form.find('#appointment_time').val(),
            message: form.find('#appointment_message').val(),
            subject: 'Quote Request'
        };
        
        // Send form data
        $.ajax({
            url: '/process-form.php',
            method: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                if (response.success) {
                    showMessage('success', response.message);
                    form[0].reset();
                    $('#modalRequest').modal('hide');
                } else {
                    showMessage('error', response.error || 'An error occurred. Please try again.');
                }
            },
            error: function(xhr) {
                let errorMessage = 'An error occurred. Please try again.';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                showMessage('error', errorMessage);
            },
            complete: function() {
                submitBtn.val(originalText).prop('disabled', false);
            }
        });
    });
    
    // Function to show success/error messages
    function showMessage(type, message) {
        // Remove existing messages
        $('.alert').remove();
        
        // Create message element
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const alertHtml = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
        
        // Insert message at the top of the page
        $('body').prepend(alertHtml);
        
        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            $('.alert').fadeOut();
        }, 5000);
    }
    
    // Form validation
    function validateForm(formData) {
        const errors = [];
        
        if (!formData.name || formData.name.trim() === '') {
            errors.push('Name is required');
        }
        
        if (!formData.email || formData.email.trim() === '') {
            errors.push('Email is required');
        } else if (!isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.message || formData.message.trim() === '') {
            errors.push('Message is required');
        }
        
        return errors;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
