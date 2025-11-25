'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'

// Invoice section disabled
const navigation: Array<{ name: string; href: string; icon: any }> = [
  // { name: 'Dashboard', href: '/invoices/dashboard', icon: LayoutDashboard },
  // { name: 'Invoices', href: '/invoices', icon: FileText },
  // { name: 'Clients', href: '/invoices/clients', icon: Users },
  // { name: 'Items', href: '/invoices/items', icon: Package },
  // { name: 'Templates', href: '/invoices/templates', icon: Receipt },
  // { name: 'Settings', href: '/invoices/settings', icon: Settings }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white min-h-screen">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Criti Designs</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

