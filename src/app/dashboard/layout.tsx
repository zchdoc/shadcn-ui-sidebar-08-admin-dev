'use client'

import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { usePathname, useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  // 获取当前页面的标题
  const getPageTitle = () => {
    const path = pathname.split('/').filter(Boolean)
    if (path.length === 1) return 'Dashboard'
    return (
      path[path.length - 1].charAt(0).toUpperCase() +
      path[path.length - 1].slice(1)
    )
  }

  // 获取当前路径的子导航
  const getSubNavItems = () => {
    const path = pathname.split('/').filter(Boolean)
    if (path.length >= 2) {
      const parentPath = `/${path[0]}/${path[1]}`
      switch (parentPath) {
        case '/dashboard/bookmark':
          return [
            {
              title: 'Usual Bookmark',
              path: '/dashboard/bookmark/usual-bookmark',
            },
            {
              title: 'Chrome Bookmark',
              path: '/dashboard/bookmark/chrome-bookmark',
            },
            {
              title: 'Chrome Bookmark Dev',
              path: '/dashboard/bookmark/chrome-bookmark-dev',
            },
          ]
        // 可以添加更多的路径判断
        default:
          return []
      }
    }
    return []
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <header className="flex h-16 shrink-0 items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {pathname !== '/dashboard' && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1">
                          {getPageTitle()}
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getSubNavItems().map((item) => (
                            <DropdownMenuItem
                              key={item.path}
                              onClick={() => router.push(item.path)}
                            >
                              {item.title}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
