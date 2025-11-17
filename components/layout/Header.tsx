'use client'

import { useSession } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-900">Invoice Management</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{session?.user?.name}</span>
          <span className="ml-2 text-gray-400">({session?.user?.role})</span>
        </div>
      </div>
    </header>
  )
}

