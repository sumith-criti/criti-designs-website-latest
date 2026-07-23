import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs } from '@/lib/db';

// export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.isActive === false) {
    return { title: 'Post Not Found | Criti Developers' };
  }

  return {
    title: `${blog.seoTitle || blog.name} | Criti Developers`,
    description: blog.metaDescription || `Read ${blog.name} on Criti Developers blog.`,
    keywords: blog.metaKeywords || '',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.isActive === false) notFound();

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero / Title section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-gold hover:text-gold-accent transition-colors mb-8"
          >
            ← Back to Blog
          </Link>

          {/* Date */}
          <p className="text-sm text-muted-gold font-medium mb-4 uppercase tracking-wider">
            {new Date(blog!.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Title — matches font-display pattern of other pages */}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-charcoal leading-tight mb-6">
            {blog!.name}
          </h1>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full aspect-[16/7] overflow-hidden rounded-sm bg-charcoal">
            <Image
              src={blog!.image}
              alt={blog!.imageAlt || blog!.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <article
            className="
              prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-charcoal
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-gray-600 prose-p:font-body prose-p:leading-relaxed
              prose-a:text-muted-gold prose-a:no-underline hover:prose-a:text-gold-accent
              prose-strong:text-charcoal
              prose-img:rounded-sm prose-img:shadow-md
              prose-li:text-gray-600
            "
            dangerouslySetInnerHTML={{ __html: blog!.description }}
          />
        </div>
      </section>
    </div>
  );
}
