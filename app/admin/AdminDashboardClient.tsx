'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Trash2, ExternalLink, Calendar, Search, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Blog } from '@/lib/types';

export default function AdminDashboardClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Data table states
  const [sortColumn, setSortColumn] = useState<'name' | 'slug' | 'date' | 'isActive'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset to first page when search criteria change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Reset to first page when page size changes
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle column sorting
  const handleSort = (column: 'name' | 'slug' | 'date' | 'isActive') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Render sorting arrows
  const renderSortIcon = (column: 'name' | 'slug' | 'date' | 'isActive') => {
    if (sortColumn !== column) {
      return <span className="ml-1.5 text-gray-300 font-sans text-xs">↕</span>;
    }
    return sortDirection === 'asc' ? (
      <span className="ml-1.5 text-blue-600 font-sans text-xs">▲</span>
    ) : (
      <span className="ml-1.5 text-blue-600 font-sans text-xs">▼</span>
    );
  };

  // 1. Filter
  const filteredBlogs = blogs.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.slug.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Sort
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    let valA: any = a[sortColumn];
    let valB: any = b[sortColumn];

    // Normalize isActive missing fields
    if (sortColumn === 'isActive') {
      valA = valA === undefined || valA === null ? true : valA;
      valB = valB === undefined || valB === null ? true : valB;
    }

    if (sortColumn === 'date') {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    } else if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // 3. Paginate
  const totalEntries = sortedBlogs.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBlogs = sortedBlogs.slice(startIndex, startIndex + pageSize);

  const handleToggleActive = async (id: number, currentStatus: boolean, name: string) => {
    const actionText = currentStatus ? 'deactivate' : 'activate';
    const confirmButtonColor = currentStatus ? '#d33' : '#A4C37D';
    
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${actionText} the blog post "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionText} it!`,
      cancelButtonText: 'Cancel',
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: '#aaa',
    });

    if (!result.isConfirmed) return;

    const loadingToast = toast.loading(`${currentStatus ? 'Deactivating' : 'Activating'} blog...`);
    try {
      const formData = new FormData();
      formData.append('isStatusToggle', 'true');
      formData.append('isActive', (!currentStatus).toString());

      const res = await fetch(`/api/admin/blogs?id=${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update status');
      }

      setBlogs(
        blogs.map((b) => (b.id === id ? { ...b, isActive: !currentStatus } : b))
      );
      
      Swal.fire({
        title: 'Updated!',
        text: `The blog post has been ${currentStatus ? 'deactivated' : 'activated'}.`,
        icon: 'success',
        confirmButtonColor: '#A4C37D',
      });
      
      toast.success('Status updated successfully!', { id: loadingToast });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'An error occurred', { id: loadingToast });
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to update status',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${name}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);
    const loadingToast = toast.loading('Deleting blog...');

    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete blog');
      }

      setBlogs(blogs.filter((b) => b.id !== id));
      
      Swal.fire({
        title: 'Deleted!',
        text: 'The blog post has been deleted.',
        icon: 'success',
        confirmButtonColor: '#A4C37D',
      });
      
      toast.success('Blog deleted successfully!', { id: loadingToast });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'An error occurred', { id: loadingToast });
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to delete blog',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Controls (Search & Entries selector) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search Bar */}
        <div className="relative max-w-md flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search by title or slug..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
          />
        </div>

        {/* Entries Page Size dropdown */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white cursor-pointer font-medium"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
        </div>
      </div>

      {/* Blogs List */}
      {paginatedBlogs.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center shadow-sm">
          <p className="text-gray-500 text-lg mb-4">No blogs found.</p>
          {blogs.length === 0 ? (
            <p className="text-gray-400 text-sm">Get started by creating your very first blog post!</p>
          ) : (
            <p className="text-gray-400 text-sm">Try clearing or changing your search term.</p>
          )}
        </div>
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  <th
                    className="px-6 py-4 cursor-pointer select-none hover:bg-gray-100/50 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <span className="flex items-center">
                      Blog Info {renderSortIcon('name')}
                    </span>
                  </th>
                  <th
                    className="px-6 py-4 cursor-pointer select-none hover:bg-gray-100/50 transition-colors"
                    onClick={() => handleSort('slug')}
                  >
                    <span className="flex items-center">
                      Slug {renderSortIcon('slug')}
                    </span>
                  </th>
                  <th
                    className="px-6 py-4 cursor-pointer select-none hover:bg-gray-100/50 transition-colors"
                    onClick={() => handleSort('date')}
                  >
                    <span className="flex items-center">
                      Publish Date {renderSortIcon('date')}
                    </span>
                  </th>
                  <th
                    className="px-6 py-4 cursor-pointer select-none hover:bg-gray-100/50 transition-colors text-center"
                    onClick={() => handleSort('isActive')}
                  >
                    <span className="flex items-center justify-center">
                      Status {renderSortIcon('isActive')}
                    </span>
                  </th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {paginatedBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="relative w-16 h-10 rounded overflow-hidden bg-gray-100 border flex-shrink-0">
                        <Image
                          src={blog.image}
                          alt={blog.imageAlt || blog.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-semibold text-gray-900 truncate max-w-xs md:max-w-md">
                        {blog.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500 truncate max-w-[200px]">
                      {blog.slug}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(blog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleActive(blog.id, blog.isActive !== false, blog.name)}
                        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full cursor-pointer transition-colors duration-200 border-none ${
                          blog.isActive !== false
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {blog.isActive !== false ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        View <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`/admin/edit/${blog.id}`}
                        className="inline-flex items-center gap-1 text-[#A4C37D] hover:text-[#8eb065] font-medium transition-colors"
                      >
                        Edit <Edit className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDelete(blog.id, blog.name)}
                        disabled={deletingId === blog.id}
                        className="text-red-600 hover:text-red-800 disabled:text-red-300 font-medium transition-colors inline-flex items-center gap-1 animate-none border-none bg-transparent cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Data Table Footer Pagination Controls */}
          <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
            <div>
              Showing {totalEntries === 0 ? 0 : startIndex + 1} to{' '}
              {Math.min(startIndex + pageSize, totalEntries)} of {totalEntries} entries
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors select-none cursor-pointer"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 border rounded-lg transition-all select-none cursor-pointer ${
                      currentPage === page
                        ? 'bg-blue-600 border-blue-600 text-white font-semibold'
                        : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors select-none cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
