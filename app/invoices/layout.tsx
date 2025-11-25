'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Providers } from '../providers'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { Toaster } from 'react-hot-toast'

export default function InvoicesLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page - invoice section is disabled
    router.push('/')
  }, [router])

  return (
    <Providers>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Invoice Section Disabled</h1>
                <p className="text-gray-600">This section has been temporarily disabled.</p>
                <p className="text-sm text-gray-500 mt-2">Redirecting to home page...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
    </Providers>
  )
}

