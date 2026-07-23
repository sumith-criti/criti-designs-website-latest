import { notFound } from 'next/navigation';
import { getBlogById } from '@/lib/db';
import EditBlogClient from './EditBlogClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;
  const blogId = parseInt(id, 10);
  if (isNaN(blogId)) {
    notFound();
  }

  const blog = await getBlogById(blogId);
  if (!blog) {
    notFound();
  }

  return <EditBlogClient blog={blog} />;
}
