import { Metadata } from 'next';
import { getBlogs } from '@/lib/db';
import BlogListClient from './BlogListClient';

// export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | Criti Developers',
  description: 'Stay updated with the latest trends in house construction, interior design, and architectural design in Kannur and across Kerala from Criti Developers.',
  keywords: 'criti developers blog, house construction blogs, interior design tips, architecture news kerala, builders blog',
};

export default async function BlogPage() {
  const allBlogs = await getBlogs();
  const blogs = allBlogs.filter((b) => b.isActive !== false);

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero Section — matches Projects/About pattern */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <BlogListClient blogs={blogs} />
        </div>
      </section>
    </div>
  );
}
