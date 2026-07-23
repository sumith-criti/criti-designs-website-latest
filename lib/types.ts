// Shared types — safe to import in both server and client components
export interface Blog {
  id: number;
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  seoTitle: string;
  metaDescription: string;
  metaKeywords: string;
  date: string;
  createdAt: string;
  isActive?: boolean;
}
