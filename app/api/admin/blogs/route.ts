import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { createBlog, deleteBlog, updateBlog, getBlogById, getBlogs } from '@/lib/db';
import fs from 'fs';
import path from 'path';

/**
 * Safely delete an image file from the public directory if it is stored in /uploads/
 * and is not referenced by any other blog in the database.
 */
async function cleanupUnusedBlogImage(imagePath: string, currentBlogId?: number) {
  if (!imagePath || !imagePath.startsWith('/uploads/')) {
    return; // Do not delete default/static images in /images/ or external URLs
  }

  try {
    const allBlogs = await getBlogs();
    const isUsedElsewhere = allBlogs.some(
      (b) => b.image === imagePath && (currentBlogId === undefined || b.id !== currentBlogId)
    );

    if (isUsedElsewhere) {
      console.log(`Image ${imagePath} is still referenced by another blog post. Keeping file on disk.`);
      return;
    }

    const absolutePath = path.join(process.cwd(), 'public', imagePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(`Successfully deleted unused blog image file: ${imagePath}`);
    }
  } catch (err) {
    console.error(`Error cleaning up blog image ${imagePath}:`, err);
  }
}

/**
 * Generates a clean filename preserving the original uploaded file name.
 * Sanitizes special characters/spaces while preventing unintended file collisions.
 */
function getSafeOriginalFileName(originalName: string, uploadDir: string): string {
  const ext = path.extname(originalName) || '.jpg';
  const nameWithoutExt = path.basename(originalName, ext);

  // Sanitize filename for web safety (replace spaces/special characters with hyphens)
  const sanitizedBase = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'image';

  let fileName = `${sanitizedBase}${ext}`;
  let filePath = path.join(uploadDir, fileName);

  // Append a numeric suffix if a file with the same name already exists
  let counter = 1;
  while (fs.existsSync(filePath)) {
    fileName = `${sanitizedBase}-${counter}${ext}`;
    filePath = path.join(uploadDir, fileName);
    counter++;
  }

  return fileName;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Form Data
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const slugInput = formData.get('slug') as string;
    const imageAlt = formData.get('imageAlt') as string;
    const description = formData.get('description') as string;
    const seoTitle = formData.get('seoTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const metaKeywords = formData.get('metaKeywords') as string;
    const date = formData.get('date') as string;
    const imageFile = formData.get('imageFile') as File | null;

    if (!name || !description || !date) {
      return NextResponse.json({ error: 'Name, Description, and Date are required.' }, { status: 400 });
    }

    let imagePath = '';

    // 3. Handle File Upload
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory inside public if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blogs');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Preserve original uploaded file name (sanitized for web safety)
      const fileName = getSafeOriginalFileName(imageFile.name, uploadDir);
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      imagePath = `/uploads/blogs/${fileName}`;
    } else {
      // Fallback or use manual image url if provided
      const imageUrl = formData.get('imageUrl') as string;
      imagePath = imageUrl || '/images/default-blog.jpg';
    }

    // 4. Generate Slug if not provided
    const slug = slugInput || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // 5. Create in Database
    const newBlog = await createBlog({
      slug,
      name,
      image: imagePath,
      imageAlt: imageAlt || name,
      description,
      seoTitle: seoTitle || name,
      metaDescription: metaDescription || '',
      metaKeywords: metaKeywords || '',
      date
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/admin/blogs');

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error('Error in creating blog:', error);
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const idStr = searchParams.get('id');
    if (!idStr) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const id = parseInt(idStr, 10);

    // 1. Fetch existing blog to get its image path before database deletion
    const existingBlog = await getBlogById(id);

    // 2. Perform DB deletion
    const success = await deleteBlog(id);
    if (!success) {
      return NextResponse.json({ error: 'Blog not found or already deleted' }, { status: 404 });
    }

    // 3. Clean up associated image file from disk if unused by other blogs
    if (existingBlog && existingBlog.image) {
      await cleanupUnusedBlogImage(existingBlog.image, id);
    }

    revalidatePath('/blog');
    revalidatePath('/admin/blogs');

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete blog' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // 1. Authenticate
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const idStr = searchParams.get('id');
    if (!idStr) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }
    const id = parseInt(idStr, 10);

    // Fetch existing blog before update to check old image path
    const existingBlog = await getBlogById(id);
    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // 2. Parse Form Data
    const formData = await req.formData();
    
    // Check if we are doing a quick status toggle vs a full edit
    const isStatusToggle = formData.get('isStatusToggle') === 'true';
    
    if (isStatusToggle) {
      const isActive = formData.get('isActive') === 'true';
      const updatedBlog = await updateBlog(id, { isActive });
      if (!updatedBlog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      revalidatePath('/blog');
      revalidatePath(`/blog/${updatedBlog.slug}`);
      revalidatePath('/admin/blogs');
      return NextResponse.json(updatedBlog);
    }
    
    // Otherwise, full edit
    const name = formData.get('name') as string;
    const slugInput = formData.get('slug') as string;
    const imageAlt = formData.get('imageAlt') as string;
    const description = formData.get('description') as string;
    const seoTitle = formData.get('seoTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const metaKeywords = formData.get('metaKeywords') as string;
    const date = formData.get('date') as string;
    const imageFile = formData.get('imageFile') as File | null;
    const isActive = formData.get('isActive') === 'true';

    if (!name || !description || !date) {
      return NextResponse.json({ error: 'Name, Description, and Date are required.' }, { status: 400 });
    }

    let imagePath = formData.get('imageUrl') as string || '';

    // Handle File Upload if there's a new image file
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blogs');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Preserve original uploaded file name (sanitized for web safety)
      const fileName = getSafeOriginalFileName(imageFile.name, uploadDir);
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      imagePath = `/uploads/blogs/${fileName}`;
    }

    const slug = slugInput || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const updateData: any = {
      slug,
      name,
      imageAlt: imageAlt || name,
      description,
      seoTitle: seoTitle || name,
      metaDescription: metaDescription || '',
      metaKeywords: metaKeywords || '',
      date,
      isActive
    };

    if (imagePath) {
      updateData.image = imagePath;
    }

    const updatedBlog = await updateBlog(id, updateData);
    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // If the image was changed/replaced, clean up the old image file if no other blog uses it
    if (existingBlog.image && imagePath && existingBlog.image !== imagePath) {
      await cleanupUnusedBlogImage(existingBlog.image, id);
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/admin/blogs');

    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    console.error('Error in updating blog:', error);
    return NextResponse.json({ error: error.message || 'Failed to update blog' }, { status: 500 });
  }
}
