# Invoice and Billing Management System

A full-stack invoice and billing management web application built for Criti Designs, similar to Zoho Invoice but simplified for internal company use.

## Features

### Core Features
- **User Authentication**: Role-based access (Admin, Staff)
- **Dashboard**: Statistics, revenue tracking, pending payments, recent invoices
- **Client Management**: Full CRUD operations with GST details
- **Item Management**: Create and manage items with unit types (sqft, unit, hour, etc.)
- **Invoice Creation**: 
  - Select client and add multiple items
  - Auto-calculate totals, tax, discounts
  - Auto-generate invoice numbers
  - Custom fields (project name, location, dates, payment status)
- **Template System**: 
  - Upload HTML templates
  - Variable replacement ({{client.name}}, {{invoice.number}}, etc.)
  - Template stored in database
- **PDF Generation**: Server-side PDF generation using Puppeteer
- **Payment Tracking**: Record payments, track status (paid, partial, pending)
- **Export Functionality**: Export clients and invoices as Excel or CSV
- **Settings**: Company details, bank details, invoice numbering
- **Activity Logging**: Track all invoice operations

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **PDF Generation**: Puppeteer
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom components with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/criti_designs?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
   ```

3. **Set up the database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed initial data (creates admin and staff users)
   npm run db:seed
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Open [http://localhost:3000](http://localhost:3000)
   - Sign in with:
     - Admin: `admin@critidesigns.com` / `admin123`
     - Staff: `staff@critidesigns.com` / `staff123`

## Project Structure

```
├── app/
│   ├── api/
│   │   └── invoices/          # API routes for invoice management
│   ├── auth/
│   │   └── signin/           # Authentication pages
│   └── invoices/             # Invoice management pages
│       ├── dashboard/        # Dashboard with statistics
│       ├── clients/          # Client management
│       ├── items/            # Item management
│       ├── templates/        # Template management (Admin only)
│       ├── settings/         # Settings (Admin only)
│       ├── [id]/            # Invoice view/edit
│       └── new/              # Create new invoice
├── components/
│   ├── ui/                   # Reusable UI components
│   └── layout/               # Layout components
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   ├── prisma.ts             # Prisma client
│   ├── utils.ts              # Utility functions
│   ├── template-engine.ts    # Template rendering engine
│   ├── pdf-generator.ts      # PDF generation
│   ├── activity-log.ts       # Activity logging
│   └── export.ts             # Export utilities
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed script
└── templates/
    └── example-invoice-template.html  # Example template
```

## Usage Guide

### Creating an Invoice

1. Navigate to **Invoices** → **Create Invoice**
2. Select a client (or create one first)
3. Add items:
   - Select item from dropdown
   - Set quantity and rate (auto-filled from item defaults)
   - Add description if needed
4. Set tax rate and discount rate
5. Review auto-calculated totals
6. Add project name, location, dates as needed
7. Click **Create Invoice**

### Managing Templates

1. Navigate to **Templates** (Admin only)
2. Click **Add Template**
3. Enter template name and HTML content
4. Use placeholders:
   - `{{invoice.number}}` - Invoice number
   - `{{client.name}}` - Client name
   - `{{items}}` - Items table (auto-generated)
   - `{{totals.totalAmount}}` - Total amount
   - See template engine for full list
5. Set as default if needed
6. Save template

### Exporting Data

1. Navigate to **Clients** or **Invoices**
2. Use export buttons (to be added to UI) or call API directly:
   - `/api/invoices/export/clients?format=csv`
   - `/api/invoices/export/clients?format=excel`
   - `/api/invoices/export/invoices?format=csv`
   - `/api/invoices/export/invoices?format=excel`

### Payment Tracking

1. Open an invoice
2. Click **Add Payment**
3. Enter payment details:
   - Amount
   - Payment date
   - Payment mode (Cash, Bank Transfer, etc.)
   - Reference number
   - Notes
4. Payment status updates automatically

## Template Variables

Available template variables:

### Invoice Variables
- `{{invoice.number}}` - Invoice number
- `{{invoice.date}}` - Invoice date
- `{{invoice.dueDate}}` - Due date
- `{{invoice.projectName}}` - Project name
- `{{invoice.location}}` - Location
- `{{invoice.notes}}` - Notes

### Client Variables
- `{{client.name}}` - Client name
- `{{client.email}}` - Client email
- `{{client.phone}}` - Client phone
- `{{client.address}}` - Client address
- `{{client.gstNumber}}` - GST number

### Company Variables
- `{{company.name}}` - Company name
- `{{company.email}}` - Company email
- `{{company.phone}}` - Company phone
- `{{company.address}}` - Company address
- `{{company.gst}}` - Company GST
- `{{company.website}}` - Company website
- `{{company.logoUrl}}` - Logo URL

### Bank Variables
- `{{bank.name}}` - Bank name
- `{{bank.accountNumber}}` - Account number
- `{{bank.ifsc}}` - IFSC code
- `{{bank.branch}}` - Branch

### Totals Variables
- `{{totals.subtotal}}` - Subtotal
- `{{totals.discountAmount}}` - Discount amount
- `{{totals.taxAmount}}` - Tax amount
- `{{totals.totalAmount}}` - Total amount
- `{{totals.taxRate}}` - Tax rate
- `{{totals.discountRate}}` - Discount rate

### Special Variables
- `{{items}}` - Auto-generated items table
- `{{payments}}` - Auto-generated payments table (if payments exist)

## API Endpoints

### Clients
- `GET /api/invoices/clients` - List all clients
- `POST /api/invoices/clients` - Create client
- `GET /api/invoices/clients/[id]` - Get client
- `PUT /api/invoices/clients/[id]` - Update client
- `DELETE /api/invoices/clients/[id]` - Delete client

### Items
- `GET /api/invoices/items` - List all items
- `POST /api/invoices/items` - Create item
- `GET /api/invoices/items/[id]` - Get item
- `PUT /api/invoices/items/[id]` - Update item
- `DELETE /api/invoices/items/[id]` - Delete item

### Invoices
- `GET /api/invoices/invoices` - List invoices (paginated)
- `POST /api/invoices/invoices` - Create invoice
- `GET /api/invoices/invoices/[id]` - Get invoice
- `PUT /api/invoices/invoices/[id]` - Update invoice
- `DELETE /api/invoices/invoices/[id]` - Delete invoice
- `GET /api/invoices/invoices/[id]/pdf` - Download PDF

### Payments
- `POST /api/invoices/payments` - Add payment

### Templates (Admin only)
- `GET /api/invoices/templates` - List templates
- `POST /api/invoices/templates` - Create template
- `PUT /api/invoices/templates/[id]` - Update template
- `DELETE /api/invoices/templates/[id]` - Delete template

### Settings (Admin only)
- `GET /api/invoices/settings` - Get settings
- `PUT /api/invoices/settings` - Update settings

### Export
- `GET /api/invoices/export/clients?format=csv|excel` - Export clients
- `GET /api/invoices/export/invoices?format=csv|excel` - Export invoices

### Dashboard
- `GET /api/invoices/dashboard/stats` - Get dashboard statistics

## Database Schema

The system uses the following main models:
- **User**: Authentication and authorization
- **Client**: Client information
- **Item**: Reusable items for invoices
- **Invoice**: Invoice header and totals
- **InvoiceItem**: Line items in invoices
- **Payment**: Payment records
- **Template**: Invoice templates
- **Settings**: System settings
- **ActivityLog**: Activity tracking

## Security Features

- Role-based access control (Admin/Staff)
- Template sanitization (removes scripts and unsafe HTML)
- Password hashing with bcrypt
- Session-based authentication
- Protected API routes

## Mobile Support

The UI is fully responsive and mobile-friendly, allowing staff to create invoices on-site using mobile devices.

## Production Deployment

1. Set up PostgreSQL database
2. Update environment variables
3. Run migrations: `npm run db:migrate`
4. Seed initial data: `npm run db:seed`
5. Build: `npm run build`
6. Start: `npm start`

## Troubleshooting

### PDF Generation Issues
- Ensure Puppeteer dependencies are installed
- Check that Chrome/Chromium is available in the environment
- For production, you may need to install additional system dependencies

### Database Connection Issues
- Verify DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check network connectivity

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies if needed

## License

Internal use only - Criti Designs

