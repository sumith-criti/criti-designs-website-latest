# Quick Setup Guide

## Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd criti-designs-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages including Next.js, React, Tailwind CSS, Framer Motion, and others.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Note on Linting Errors

If you see TypeScript/linting errors before running `npm install`, this is normal. The errors will resolve once dependencies are installed, as the type definitions will be available.

## Next Steps

1. **Customize Content:**
   - Update contact information in `app/contact/page.tsx` and `components/Footer.tsx`
   - Replace placeholder images with actual project photos
   - Update project data in `app/projects/[slug]/page.tsx`
   - Modify team information in `app/about/page.tsx`

2. **Configure EmailJS (Optional):**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Get your Service ID, Template ID, and Public Key
   - Update `app/contact/page.tsx` with your credentials
   - Uncomment the EmailJS code in the `handleSubmit` function

3. **Update Google Maps:**
   - Replace the Google Maps embed URL in `app/contact/page.tsx` with your actual studio location

4. **Deploy:**
   - Build for production: `npm run build`
   - Deploy to Vercel, Netlify, or your preferred hosting platform

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `public/` - Static assets (images, etc.)

Happy coding! 🚀



