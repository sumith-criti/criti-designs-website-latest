# Invoice System Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/criti_designs?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-a-random-secret-key-here"
   ```

3. **Set up database:**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed initial data (creates admin and staff users)
   npm run db:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Navigate to: http://localhost:3000/auth/signin
   - Login with:
     - **Admin**: `admin@critidesigns.com` / `admin123`
     - **Staff**: `staff@critidesigns.com` / `staff123`

## Default Credentials

After running `npm run db:seed`:

- **Admin User:**
  - Email: `admin@critidesigns.com`
  - Password: `admin123`
  - Role: ADMIN (can access all features including settings and templates)

- **Staff User:**
  - Email: `staff@critidesigns.com`
  - Password: `staff123`
  - Role: STAFF (can create invoices, manage clients and items)

## Important Notes

1. **Change default passwords** in production
2. **Update NEXTAUTH_SECRET** with a secure random string
3. **Configure PostgreSQL** database before running migrations
4. **Puppeteer** may require additional system dependencies on Linux servers

## Next Steps

1. Log in as admin
2. Go to Settings and update company information
3. Create or customize invoice templates
4. Add clients and items
5. Start creating invoices!

For detailed documentation, see `INVOICE_SYSTEM_README.md`

