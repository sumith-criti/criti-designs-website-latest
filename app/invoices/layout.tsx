'use client'

import { Providers } from '../providers'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { Toaster } from 'react-hot-toast'

export default function InvoicesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
      <Toaster position="top-right" />
    </Providers>
  )
}

