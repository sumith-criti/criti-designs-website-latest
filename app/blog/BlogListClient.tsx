'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Blog } from '@/lib/types';

export default function BlogListClient({ blogs }: { blogs: Blog[] }) {
  const [search, setSearch] = useState('');

  const filteredBlogs = blogs.filter((blog) =>
    blog.name.toLowerCase().includes(search.toLowerCase()) ||
    blog.description.replace(/<[^>]*>/g, '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero heading — same pattern as Projects page */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-display text-5xl md:text-7xl font-bold text-charcoal mb-6"
      >
        Our Blogs
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
      >
        Insights, guides, and ideas on architecture, interiors & construction
      </motion.p>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="max-w-md mx-auto mb-16"
      >
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 border border-gray-200 rounded-sm bg-background text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-muted-gold transition-all duration-300 text-sm"
        />
      </motion.div>

      {/* Blog grid — same structure as Projects grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {filteredBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg font-body">No articles found.</p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="mt-4 text-sm font-medium text-muted-gold hover:text-gold-accent transition-colors border-none bg-transparent cursor-pointer"
                >
                  Clear Search
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
            >
              {filteredBlogs.map((blog, index) => {
                const plainText = blog.description
                  .replace(/<[^>]*>/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim()
                  .substring(0, 130);
                const excerpt = plainText.length === 130 ? plainText + '...' : plainText;

                return (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <Link href={`/blog/${blog.slug}`}>
                      {/* Thumbnail — same aspect ratio and hover as Projects */}
                      <div className="relative overflow-hidden bg-charcoal rounded-sm aspect-[4/3] mb-4">
                        <Image
                          src={blog.image}
                          alt={blog.imageAlt || blog.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Overlay on hover */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        >
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <span className="text-sm text-muted-gold mb-2 block flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(blog.date).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                              })}
                            </span>
                            <h3 className="font-display font-semibold text-lg leading-snug line-clamp-2">
                              {blog.name}
                            </h3>
                          </div>
                        </motion.div>
                      </div>

                      {/* Card text */}
                      <div>
                        <span className="text-sm text-muted-gold mb-1 flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(blog.date).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>
                        <h3 className="font-display font-semibold text-xl text-charcoal mb-2 group-hover:text-muted-gold transition-colors duration-300 line-clamp-2">
                          {blog.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-body leading-relaxed line-clamp-3 mb-3">
                          {excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal group-hover:text-muted-gold transition-colors duration-300">
                          Read Article
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
