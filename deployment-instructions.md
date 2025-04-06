# Yoshi Sound Portfolio - Deployment Instructions

## GitHub Pages Deployment Guide

This document provides step-by-step instructions to deploy the Yoshi Sound Portfolio website to GitHub Pages.

### Prerequisites
- A GitHub account
- Git installed on your computer

### Setting Up the Repository

1. Create a new repository on GitHub (e.g., `yoshi-sound-portfolio`)
2. Clone the repository to your local machine
3. Copy all files from this project to the repository folder


### Configure Build Settings

1. Modify the `vite.config.ts` file to add a proper base path for GitHub Pages:

```typescript
import { defineConfig } from 'vite';
// other imports...

// https://vitejs.dev/config/
export default defineConfig({
  // Add this line for GitHub Pages deployment
  base: '/yoshi-sound-portfolio/', // replace with your repository name
  
  // Existing config settings...
  plugins: [/* your plugins */],
  // other configuration...
});
```

2. To use the `docs` folder for GitHub Pages (optional but recommended):

```typescript
export default defineConfig({
  base: '/yoshi-sound-portfolio/', // replace with your repository name
  build: {
    outDir: 'docs',
  },
  // other config...
});
```

### Updating Form Submission Endpoints

Since GitHub Pages only hosts static content, you need to set up external form handling:

1. Sign up for [Formspree](https://formspree.io) or another form service
2. Create two form endpoints: one for Contact and one for Tutoring
3. Update the `submitFormToService` function in `client/src/lib/utils.ts`:

```typescript
export async function submitFormToService<T>(formData: T, formType: 'contact' | 'tutoring'): Promise<{ success: boolean, message?: string }> {
  try {
    // Replace with your actual Formspree endpoints
    const endpoint = formType === 'contact'
      ? 'https://formspree.io/f/your-contact-form-id'
      : 'https://formspree.io/f/your-tutoring-form-id';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return { success: true, message: 'Form submitted successfully!' };
    } else {
      const error = await response.json();
      return { success: false, message: error.message || 'Something went wrong' };
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'There was a problem submitting your form. Please try again.'
    };
  }
}
```
### Building and Deploying

1. Build the project:
   ```
   npm run build
   ```

2. Configure GitHub Pages:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/docs" folder
   - Click "Save"

3. Visit your site at: `https://yourusername.github.io/yoshi-sound-portfolio/`

### Handling SPA Routing in GitHub Pages

The project includes two important files for proper SPA routing on GitHub Pages:

1. `public/404.html` - Handles 404 errors and redirects to the main page
2. SPA routing script in `client/index.html` - Processes redirects

### Additional Resources

- [Vite Static Deploy Documentation](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Formspree Documentation](https://formspree.io/documentation/)
