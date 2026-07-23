import 'server-only';
import fs from 'fs';
import path from 'path';
import type { Blog } from './types';
export type { Blog } from './types';

// Database folder and files setup
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.join(DATA_DIR, 'blog.db');
const JSON_DB_FILE = path.join(DATA_DIR, 'blog_db.json');

let sqliteDb: any = null;
let useJsonFallback = false;

// Try to initialize better-sqlite3
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require('better-sqlite3');
  sqliteDb = new Database(DB_FILE);
  // Create tables if they do not exist
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      imageAlt TEXT NOT NULL,
      description TEXT NOT NULL,
      seoTitle TEXT,
      metaDescription TEXT,
      metaKeywords TEXT,
      date TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      isActive INTEGER DEFAULT 1
    );
  `);
  try {
    sqliteDb.exec('ALTER TABLE blogs ADD COLUMN isActive INTEGER DEFAULT 1');
  } catch (err) {
    // Column already exists or table does not exist yet (ignore)
  }
  console.log('SQLite database initialized successfully.');
} catch (error) {
  console.warn('Could not initialize better-sqlite3, falling back to JSON file database.', error);
  useJsonFallback = true;
  if (!fs.existsSync(JSON_DB_FILE)) {
    fs.writeFileSync(JSON_DB_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Helper: read blogs from JSON fallback
function readJsonDb(): Blog[] {
  try {
    const data = fs.readFileSync(JSON_DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON DB file:', error);
    return [];
  }
}

// Helper: write blogs to JSON fallback
function writeJsonDb(data: Blog[]): void {
  try {
    fs.writeFileSync(JSON_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing JSON DB file:', error);
  }
}

// CRUD operations
export async function getBlogs(): Promise<Blog[]> {
  if (!useJsonFallback && sqliteDb) {
    try {
      const stmt = sqliteDb.prepare('SELECT * FROM blogs ORDER BY date DESC, id DESC');
      const rows = stmt.all() as any[];
      return rows.map((row) => ({
        ...row,
        isActive: row.isActive === undefined || row.isActive === null ? true : Boolean(row.isActive)
      })) as Blog[];
    } catch (e) {
      console.error('SQLite getBlogs failed, trying JSON fallback:', e);
    }
  }

  // Fallback
  return readJsonDb().map((row) => ({
    ...row,
    isActive: row.isActive === undefined || row.isActive === null ? true : Boolean(row.isActive)
  })).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime() || b.id - a.id;
  });
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!useJsonFallback && sqliteDb) {
    try {
      const stmt = sqliteDb.prepare('SELECT * FROM blogs WHERE slug = ?');
      const row = stmt.get(slug) as any;
      return row ? ({
        ...row,
        isActive: row.isActive === undefined || row.isActive === null ? true : Boolean(row.isActive)
      } as Blog) : null;
    } catch (e) {
      console.error('SQLite getBlogBySlug failed, trying JSON fallback:', e);
    }
  }

  // Fallback
  const blogs = readJsonDb();
  const row = blogs.find((b) => b.slug === slug) || null;
  return row ? ({
    ...row,
    isActive: row.isActive === undefined || row.isActive === null ? true : Boolean(row.isActive)
  } as Blog) : null;
}

export async function getBlogById(id: number): Promise<Blog | null> {
  if (!useJsonFallback && sqliteDb) {
    try {
      const stmt = sqliteDb.prepare('SELECT * FROM blogs WHERE id = ?');
      const row = stmt.get(id) as any;
      return row ? ({
        ...row,
        isActive: row.isActive === undefined || row.isActive === null ? true : Boolean(row.isActive)
      } as Blog) : null;
    } catch (e) {
      console.error('SQLite getBlogById failed, trying JSON fallback:', e);
    }
  }

  // Fallback
  const blogs = readJsonDb();
  const row = blogs.find((b) => b.id === id) || null;
  return row ? ({
    ...row,
    isActive: row.isActive === undefined || row.isActive === null ? true : Boolean(row.isActive)
  } as Blog) : null;
}

export async function createBlog(blog: Omit<Blog, 'id' | 'createdAt'>): Promise<Blog> {
  const generatedSlug = blog.slug || blog.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const isActiveVal = blog.isActive === false ? 0 : 1;
  
  if (!useJsonFallback && sqliteDb) {
    try {
      const stmt = sqliteDb.prepare(`
        INSERT INTO blogs (slug, name, image, imageAlt, description, seoTitle, metaDescription, metaKeywords, date, isActive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(
        generatedSlug,
        blog.name,
        blog.image,
        blog.imageAlt,
        blog.description,
        blog.seoTitle,
        blog.metaDescription,
        blog.metaKeywords,
        blog.date,
        isActiveVal
      );
      
      const selectStmt = sqliteDb.prepare('SELECT * FROM blogs WHERE id = ?');
      const row = selectStmt.get(info.lastInsertRowid) as any;
      return {
        ...row,
        isActive: row.isActive === undefined || row.isActive === null ? true : Boolean(row.isActive)
      };
    } catch (e) {
      console.error('SQLite createBlog failed, trying JSON fallback:', e);
    }
  }

  // Fallback
  const blogs = readJsonDb();
  const nextId = blogs.reduce((max, b) => (b.id > max ? b.id : max), 0) + 1;
  const newBlog: Blog = {
    id: nextId,
    ...blog,
    slug: generatedSlug,
    isActive: blog.isActive === undefined ? true : Boolean(blog.isActive),
    createdAt: new Date().toISOString()
  };
  blogs.push(newBlog);
  writeJsonDb(blogs);
  return newBlog;
}

export async function updateBlog(id: number, blog: Partial<Omit<Blog, 'id' | 'createdAt'>>): Promise<Blog | null> {
  if (!useJsonFallback && sqliteDb) {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      
      if (blog.slug !== undefined) { fields.push('slug = ?'); values.push(blog.slug); }
      if (blog.name !== undefined) { fields.push('name = ?'); values.push(blog.name); }
      if (blog.image !== undefined) { fields.push('image = ?'); values.push(blog.image); }
      if (blog.imageAlt !== undefined) { fields.push('imageAlt = ?'); values.push(blog.imageAlt); }
      if (blog.description !== undefined) { fields.push('description = ?'); values.push(blog.description); }
      if (blog.seoTitle !== undefined) { fields.push('seoTitle = ?'); values.push(blog.seoTitle); }
      if (blog.metaDescription !== undefined) { fields.push('metaDescription = ?'); values.push(blog.metaDescription); }
      if (blog.metaKeywords !== undefined) { fields.push('metaKeywords = ?'); values.push(blog.metaKeywords); }
      if (blog.date !== undefined) { fields.push('date = ?'); values.push(blog.date); }
      if (blog.isActive !== undefined) { fields.push('isActive = ?'); values.push(blog.isActive ? 1 : 0); }
      
      if (fields.length === 0) {
        const selectStmt = sqliteDb.prepare('SELECT * FROM blogs WHERE id = ?');
        const row = selectStmt.get(id) as any;
        return row ? { ...row, isActive: row.isActive === undefined || row.isActive === null ? true : Boolean(row.isActive) } : null;
      }
      
      values.push(id);
      const stmt = sqliteDb.prepare(`
        UPDATE blogs SET ${fields.join(', ')} WHERE id = ?
      `);
      const info = stmt.run(...values);
      if (info.changes === 0) return null;
      
      const selectStmt = sqliteDb.prepare('SELECT * FROM blogs WHERE id = ?');
      const row = selectStmt.get(id) as any;
      return row ? { ...row, isActive: row.isActive === undefined || row.isActive === null ? true : Boolean(row.isActive) } : null;
    } catch (e) {
      console.error('SQLite updateBlog failed, trying JSON fallback:', e);
    }
  }

  // Fallback
  const blogs = readJsonDb();
  const index = blogs.findIndex((b) => b.id === id);
  if (index === -1) return null;
  
  const updatedBlog: Blog = {
    ...blogs[index],
    ...blog,
    isActive: blog.isActive !== undefined ? Boolean(blog.isActive) : (blogs[index].isActive === undefined ? true : Boolean(blogs[index].isActive))
  };
  
  blogs[index] = updatedBlog;
  writeJsonDb(blogs);
  return updatedBlog;
}

export async function deleteBlog(id: number): Promise<boolean> {
  if (!useJsonFallback && sqliteDb) {
    try {
      const stmt = sqliteDb.prepare('DELETE FROM blogs WHERE id = ?');
      const info = stmt.run(id);
      return info.changes > 0;
    } catch (e) {
      console.error('SQLite deleteBlog failed, trying JSON fallback:', e);
    }
  }

  // Fallback
  const blogs = readJsonDb();
  const filtered = blogs.filter((b) => b.id !== id);
  if (filtered.length === blogs.length) {
    return false;
  }
  writeJsonDb(filtered);
  return true;
}
