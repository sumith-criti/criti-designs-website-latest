import { getBlogs } from '@/lib/db';
import AdminDashboardClient from '../AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function ManageBlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Blogs</h1>
          <p className="text-gray-500 text-sm">Create, publish, and delete blog posts for your website.</p>
        </div>
      </div>

      <AdminDashboardClient initialBlogs={blogs} />
    </div>
  );
}
