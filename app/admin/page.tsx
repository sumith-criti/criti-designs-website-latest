import Link from 'next/link';
import { getBlogs } from '@/lib/db';
import { BookOpen, CheckCircle, XCircle, PlusCircle, ArrowRight, Eye, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const blogs = await getBlogs();
  
  const totalBlogs = blogs.length;
  const activeBlogs = blogs.filter(b => b.isActive !== false).length;
  const inactiveBlogs = totalBlogs - activeBlogs;
  
  // Get latest 5 blogs
  const recentBlogs = blogs.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-display">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here is a summary of your blog metrics.</p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Blogs */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-5 transition-transform duration-200 hover:scale-[1.01]">
          <div className="p-4 rounded-xl bg-blue-50 text-blue-600">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Blog Posts</p>
            <h3 className="text-3xl font-bold text-gray-900">{totalBlogs}</h3>
          </div>
        </div>

        {/* Card 2: Active Blogs */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-5 transition-transform duration-200 hover:scale-[1.01]">
          <div className="p-4 rounded-xl bg-green-50 text-green-600">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active / Published</p>
            <h3 className="text-3xl font-bold text-gray-900">{activeBlogs}</h3>
          </div>
        </div>

        {/* Card 3: Inactive Blogs */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-5 transition-transform duration-200 hover:scale-[1.01]">
          <div className="p-4 rounded-xl bg-red-50 text-red-600">
            <XCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Inactive / Drafts</p>
            <h3 className="text-3xl font-bold text-gray-900">{inactiveBlogs}</h3>
          </div>
        </div>
      </div>

      {/* Split layout: Recent Blogs & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Blogs */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Blog Posts</h2>
            <Link
              href="/admin/blogs"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {recentBlogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No blogs found. Start by writing a new post!
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentBlogs.map((blog) => (
                <div key={blog.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-10 rounded overflow-hidden border bg-gray-100 flex-shrink-0">
                      <Image
                        src={blog.image}
                        alt={blog.imageAlt || blog.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                        {blog.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(blog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                        blog.isActive !== false
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {blog.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                    <Link
                      href={`/admin/edit/${blog.id}`}
                      className="text-[#A4C37D] hover:text-[#8eb065] text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/new"
              className="w-full flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700"
            >
              <span className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#A4C37D]" />
                Write New Post
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              href="/admin/blogs"
              className="w-full flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Manage Blog Posts
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700"
            >
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-500" />
                View Public Site
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
