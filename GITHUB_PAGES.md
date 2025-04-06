# GitHub Pages Deployment Instructions

## Setting Up GitHub Pages Deployment

1. Create a GitHub repository for your project
2. Add all project files to the repository
3. In the GitHub repository settings, navigate to Pages
4. Set up GitHub Pages to deploy from the main branch /docs folder
5. Modify your vite.config.ts to output the build to the /docs folder:

```javascript
export default defineConfig({
  build: {
    outDir: "docs",
  },
  // ... other config
});
```

6. Run `npm run build` to generate the static site
7. Commit and push the changes to GitHub
8. Go to the GitHub repository settings and ensure GitHub Pages is enabled

## Static Form Handling

For the contact and tutoring forms to work properly in a static site environment, you'll need to set up a form handling service:

1. Sign up for a form submission service like Formspree (https://formspree.io) or FormSubmit (https://formsubmit.co)
2. Create a form endpoint
3. Update the submitFormToService function in utils.ts with your form endpoint:

```javascript
export async function submitFormToService<T>(formData: T, formType: "contact" | "tutoring"): Promise<{ success: boolean, message?: string }> {
  try {
    // Replace with your Formspree endpoints
    const endpoint = formType === "contact"
      ? "https://formspree.io/f/your-contact-form-id"
      : "https://formspree.io/f/your-tutoring-form-id";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return { success: true, message: "Form submitted successfully!" };
    } else {
      const error = await response.json();
      return { success: false, message: error.message || "Something went wrong" };
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "There was a problem submitting your form. Please try again."
    };
  }
}
```
