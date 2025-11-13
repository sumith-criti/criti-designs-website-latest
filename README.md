# Criti Designs Website

A premium, modern website for Criti Developers LLP - an architecture and design studio specializing in compact, luxurious, and sustainable spaces.

## 🎨 Design Philosophy

This website is inspired by the high-end, cinematic style of Minale+Mann, featuring:
- Minimalist, premium aesthetics
- Elegant typography and spacing
- Smooth animations and transitions
- Neutral color palette (white, charcoal, muted gold)
- Responsive design for all devices

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Intersection Observer** - Scroll-triggered animations

## 📁 Project Structure

```
criti-designs-website/
├── app/
│   ├── about/          # About page
│   ├── contact/        # Contact page with form
│   ├── projects/       # Projects gallery and detail pages
│   ├── services/       # Services page
│   ├── layout.tsx      # Root layout with Navbar & Footer
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
└── public/             # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Features

### Homepage
- Fullscreen hero section with background image
- Tagline overlay
- Introduction section
- Featured projects showcase
- Smooth scroll animations

### About Page
- Studio information
- Philosophy section
- Team members with hover effects

### Projects Page
- Filterable project grid
- Hover reveal animations
- Individual project detail pages with:
  - Hero image
  - Project description
  - Highlights
  - Image gallery (masonry layout)

### Services Page
- Three-column service layout
- Service descriptions
- Process overview
- Call-to-action section

### Contact Page
- Contact form (ready for EmailJS integration)
- Google Maps embed
- Contact information
- Social media links

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- `charcoal`: #2C2C2C
- `muted-gold`: #D4AF37
- `gold-accent`: #B8941E

### Typography
Fonts are configured in `app/layout.tsx`:
- **Inter** - Body text
- **Playfair Display** - Display headings
- **Poppins** - Alternative font option

### Content
- Update project data in `app/projects/[slug]/page.tsx`
- Modify team members in `app/about/page.tsx`
- Update contact information in `app/contact/page.tsx` and `components/Footer.tsx`

## 📧 Contact Form Setup

The contact form is ready for EmailJS integration. To set it up:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update `app/contact/page.tsx` with your EmailJS credentials:
   - Replace `YOUR_SERVICE_ID`
   - Replace `YOUR_TEMPLATE_ID`
   - Replace `YOUR_PUBLIC_KEY`
4. Uncomment the EmailJS code in the `handleSubmit` function

## 🗺️ Google Maps Setup

Update the Google Maps embed URL in `app/contact/page.tsx` with your actual studio location coordinates.

## 🖼️ Images

Currently using Unsplash placeholder images. Replace with actual project images:
- Update image URLs in project data
- Use Next.js Image component for optimized loading
- Ensure images are properly sized for performance

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

## 📄 License

This project is created for Criti Developers LLP.

## 🔧 Future Enhancements

- [ ] Add blog section
- [ ] Integrate CMS for content management
- [ ] Add project filtering by category
- [ ] Implement image lightbox for gallery
- [ ] Add dark mode toggle
- [ ] SEO optimization with meta tags
- [ ] Add analytics tracking

## 📞 Support

For questions or support, contact info@critidesigns.com

---

Built with ❤️ for Criti Designs



