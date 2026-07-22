import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { createBlog, deleteBlog, updateBlog } from '@/lib/db';
import fs from 'fs';
import path from 'path';

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

      // Generate a unique filename
      const fileExt = path.extname(imageFile.name) || '.jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${fileExt}`;
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
    const success = await deleteBlog(id);
    if (!success) {
      return NextResponse.json({ error: 'Blog not found or already deleted' }, { status: 404 });
    }

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

      const fileExt = path.extname(imageFile.name) || '.jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${fileExt}`;
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

    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    console.error('Error in updating blog:', error);
    return NextResponse.json({ error: error.message || 'Failed to update blog' }, { status: 500 });
  }
}
