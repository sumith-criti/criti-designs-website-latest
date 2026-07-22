import { MetadataRoute } from 'next';
import { getBlogs } from '@/lib/db';
import { projectData } from './projects/[slug]/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.critidevelopers.com';

  // 1. Static pages
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/projects',
    '/services',
    '/blog',
    '/3d-elevation-kannur',
    '/architectural-design-kannur',
    '/construction-kannur',
    '/interior-design-kannur',
    '/renovation-kannur',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic projects
  const projectRoutes = Object.keys(projectData).map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 3. Dynamic blogs (Active posts only)
  let blogRoutes: any[] = [];
  try {
    const blogs = await getBlogs();
    const activeBlogs = blogs.filter((b) => b.isActive !== false);
    blogRoutes = activeBlogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap blog generation error:', error);
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
