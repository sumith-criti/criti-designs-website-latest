'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import CKEditor from '@/components/ui/CKEditor';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [description, setDescription] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Image upload preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      if (!imageAlt) {
        setImageAlt(file.name.split('.')[0].replace(/[-_]+/g, ' '));
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(generatedSlug);
    setSeoTitle(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Blog title is required');
      return;
    }
    if (!description.trim()) {
      toast.error('Blog description content is required');
      return;
    }
    if (!imageFile && !imageUrl) {
      toast.error('Please upload a cover image or provide an image URL');
      return;
    }

    setLoading(true);
    const saveToast = toast.loading('Publishing blog post...');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('slug', slug);
      formData.append('imageAlt', imageAlt);
      formData.append('description', description);
      formData.append('seoTitle', seoTitle);
      formData.append('metaDescription', metaDescription);
      formData.append('metaKeywords', metaKeywords);
      formData.append('date', date);

      if (imageFile) {
        formData.append('imageFile', imageFile);
      } else {
        formData.append('imageUrl', imageUrl);
      }

      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create blog post');
      }

      toast.success('Blog post published successfully!', { id: saveToast });
      router.push('/admin/blogs');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'An error occurred while saving', { id: saveToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="p-2 bg-white hover:bg-gray-100 border rounded-lg transition-colors text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Blog</h1>
          <p className="text-gray-500 text-sm">Write, optimize, and publish a new article.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core details */}
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Article Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blog Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Modern Architecture Trends in 2026"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL endpoint) *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9\-]+/g, ''))}
                placeholder="modern-architecture-trends-2026"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Text *</label>
              <input
                type="text"
                required
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="e.g. Modern house facade design in Kannur"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cover Image *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* File upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 transition-colors relative bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-700">Click to upload file</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
              </div>

              {/* URL fallback / Image Preview */}
              <div className="flex flex-col justify-between border rounded-lg p-4 bg-gray-50">
                {imagePreview ? (
                  <div className="relative w-full h-32 rounded overflow-hidden border bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                        setImageUrl('');
                      }}
                      className="absolute top-2 right-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded shadow transition-colors border-none cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col justify-center">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Or paste Image URL:</label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setImagePreview(e.target.value || null);
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Description */}
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Description / Body Content *</h2>
          <CKEditor value={description} onChange={setDescription} />
        </div>

        {/* SEO Metadata */}
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">SEO Optimization</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Page Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Modern Architecture Designs in Kannur | Criti Developers"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Describe this article for search engine snippets (typically under 160 characters)..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords (comma separated)</label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="architecture, interior design, kannur, home construction"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin"
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 bg-white font-medium transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#A4C37D] hover:bg-[#8eb065] text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 border-none cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Publishing...
              </>
            ) : (
              'Publish Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
