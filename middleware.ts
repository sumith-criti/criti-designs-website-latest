import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname
    const isAuthPage = pathname.startsWith('/auth')
    const isInvoicePage = pathname.startsWith('/invoices')

    // If on auth page and already logged in, redirect to dashboard
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL('/invoices/dashboard', req.url))
    }

    // If on invoice page and not logged in, redirect to sign in
    if (isInvoicePage && !token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    // Admin-only routes
    if (token && token.role !== 'ADMIN') {
      const adminOnlyRoutes = ['/invoices/settings', '/invoices/templates']
      if (adminOnlyRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/invoices/dashboard', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Only require auth for invoice pages, not auth pages
        const pathname = req.nextUrl.pathname
        if (pathname.startsWith('/auth')) {
          return true // Allow access to auth pages
        }
        if (pathname.startsWith('/invoices')) {
          return !!token // Require token for invoice pages
        }
        return true // Allow all other pages
      }
    }
  }
)

export const config = {
  matcher: ['/invoices/:path*', '/auth/:path*']
}

