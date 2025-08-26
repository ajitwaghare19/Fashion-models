# Special Model Management Website

A modern, responsive website for Special Model Management - a modeling agency based in Poland.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Model Portfolios**: Individual pages for each model with photo galleries
- **Contact Forms**: Functional contact and submission forms with backend processing
- **Modern UI**: Clean, professional design using Bootstrap 4
- **Image Galleries**: Carousel-based photo displays
- **SEO Optimized**: Proper meta tags and semantic HTML

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (jQuery)
- **Framework**: Bootstrap 4.1.0
- **Backend**: PHP (for form processing)
- **Libraries**: 
  - Owl Carousel (image sliders)
  - AOS (Animate On Scroll)
  - Magnific Popup (lightbox)
  - Google Fonts

## Setup Instructions

### Prerequisites

- Web server with PHP support (Apache/Nginx)
- PHP 7.0 or higher
- Mail server configured (for form submissions)

### Installation

1. **Clone or download** the project files to your web server directory
2. **Configure your web server** to serve files from the project root
3. **Set up PHP mail** functionality:
   - Ensure PHP mail() function is enabled
   - Configure your server's mail settings
   - Test email functionality

### Configuration

#### Google Maps API
1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Replace `YOUR_API_KEY_HERE` in all HTML files with your actual API key
3. Files to update:
   - `index.html`
   - `about/index.html`
   - `contact/index.html`
   - `submissions/index.html`
   - `models/index.html`
   - All model portfolio pages

#### Email Configuration
1. Update the recipient email in `process-form.php`:
   ```php
   $to = 'marcelina@specialmodelmgmt.com'; // Change to your email
   ```

#### Form Processing
The website includes a PHP backend for form processing:
- **File**: `process-form.php`
- **Features**: 
  - Input validation
  - Email sanitization
  - CSRF protection
  - Logging of submissions
  - JSON responses

### File Structure

```
specialmodelmgmt/
├── index.html                 # Home page
├── about/                     # About page
├── contact/                   # Contact page
├── submissions/               # Model submissions page
├── models/                    # Model portfolios
│   ├── index.html            # Models listing
│   ├── alina_falkova/        # Individual model pages
│   ├── carla/
│   ├── erika/
│   ├── lika/
│   ├── lina/
│   └── tanya/
├── css/                       # Stylesheets
├── js/                        # JavaScript files
│   ├── main.js               # Main functionality
│   └── form-handler.js       # Form processing
├── images/                    # Images and assets
├── fonts/                     # Font files
├── process-form.php          # Backend form processing
└── README.md                 # This file
```

## Recent Fixes Applied

### 1. Broken Links
- Fixed internal navigation links to use proper paths
- Updated home page links to use root paths

### 2. Google Maps API Security
- Removed hardcoded API key from source code
- Replaced with placeholder `YOUR_API_KEY_HERE`
- Fixed malformed script URLs in model pages

### 3. Form Processing
- Added PHP backend (`process-form.php`) for form submissions
- Created JavaScript form handler (`js/form-handler.js`)
- Implemented AJAX form submission with validation
- Added success/error message display

### 4. Navigation Consistency
- Fixed navigation menu structure across all pages
- Corrected active page highlighting
- Standardized link paths

### 5. Code Cleanup
- Removed large commented-out sections from about page
- Cleaned up duplicate content
- Improved code organization

## Usage

### Adding New Models
1. Create a new folder in `models/` with the model's name
2. Add model photos (named consistently, e.g., `modelname_smm_1.jpg`)
3. Create `index.html` following the existing template
4. Add model information to `models/index.html`
5. Create `snapshots/` folder if needed

### Updating Content
- Edit HTML files directly to update text content
- Replace images in the `images/` folder
- Update model information in respective model pages

### Customizing Styles
- Main stylesheet: `css/style.css`
- Bootstrap customization: `scss/style.scss`
- Font configurations in CSS files

## Security Considerations

- **API Keys**: Never commit API keys to version control
- **Form Validation**: Server-side validation implemented in PHP
- **Input Sanitization**: All user inputs are sanitized
- **CSRF Protection**: Form processing includes basic CSRF protection
- **Email Security**: Email addresses are validated and sanitized

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## Performance Optimization

- Images are optimized for web
- CSS and JavaScript are minified
- Lazy loading implemented for image galleries
- Responsive images for different screen sizes

## Contact Information

- **Email**: marcelina@specialmodelmgmt.com
- **Phone**: +48 570135846
- **Address**: Pleśna 36, 33-171, Poland
- **Instagram**: @specialmodelmgmt

## License

This project is proprietary to Special Model Management. All rights reserved.

## Support

For technical support or questions about the website, contact the development team or refer to the contact information above.
