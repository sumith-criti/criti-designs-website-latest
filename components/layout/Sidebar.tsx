'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LogOut,
  LayoutDashboard,
  BookOpen,
  FileText,
  PlusCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut, useSession } from 'next-auth/react'

const navigation: Array<{ name: string; href: string; icon: any }> = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Manage Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'Add New Blog', href: '/admin/new', icon: PlusCircle }
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white min-h-screen">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Criti Developers</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname === item.href || pathname?.startsWith(item.href + '/')
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
      <div className="p-4 border-t border-gray-800 space-y-2">
        {session?.user && (
          <div className="px-3 py-2 bg-gray-800/60 rounded-lg">
            <p className="text-[11px] uppercase tracking-wider text-gray-400">Signed in as</p>
            <p className="text-sm font-medium text-gray-200 truncate">{session.user.name || session.user.email}</p>
          </div>
        )}
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

