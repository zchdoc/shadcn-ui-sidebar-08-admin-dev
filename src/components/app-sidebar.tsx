'use client'

import * as React from 'react'
import { Sun, MoonStar } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavProjects } from '@/components/nav-projects'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { TeamSwitcherSingle } from './team-switcher-single'
import { SidebarSkeletonStyle1 } from './sidebar-skeleton-style-1'
import { navMainConfig, navSecondaryConfig } from '@/config/navigation'
import { teamsConfig } from '@/config/teams'
import { projectsConfig } from '@/config/projects'
import { usersConfig } from '@/config/users'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    // 预加载 dashboard 相关页面
    router.prefetch('/dashboard')
    router.prefetch('/dashboard/history')
    router.prefetch('/dashboard/starred')
    router.prefetch('/dashboard/settings')
    router.prefetch('/dashboard/models')
    router.prefetch('/dashboard/models/genesis')
    router.prefetch('/dashboard/models/explorer')
    router.prefetch('/dashboard/models/quantum')
    router.prefetch('/dashboard/docs')
    router.prefetch('/dashboard/docs/intro')
    router.prefetch('/dashboard/docs/get-started')
    router.prefetch('/dashboard/docs/tutorials')
    router.prefetch('/dashboard/docs/changelog')
    router.prefetch('/dashboard/settings/general')
    router.prefetch('/dashboard/settings/team')
    router.prefetch('/dashboard/settings/billing')
    router.prefetch('/dashboard/settings/limits')
    router.prefetch('/dashboard/support')
    router.prefetch('/dashboard/feedback')
    router.prefetch('/dashboard/projects/design-engineering')
    router.prefetch('/dashboard/projects/sales-marketing')
    router.prefetch('/dashboard/projects/travel')

    setMounted(true)
  }, [router])

  // Prevent theme flash on load
  if (!mounted) {
    // return <SidebarSkeleton />
    // return <SidebarSkeletonStyle1 /> // 使用样式1
    return <SidebarSkeletonStyle1 /> // 使用样式2
  }

  // 构建次要导航项，添加主题切换按钮
  const navSecondaryWithTheme = [
    {
      title: theme === 'dark' ? 'Theme' : 'Theme',
      onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      icon: theme === 'dark' ? MoonStar : Sun,
    },
    ...navSecondaryConfig,
  ]

  return (
    <Sidebar collapsible="offcanvas" {...props} variant="floating" side="left">
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <TeamSwitcherSingle teams={teamsConfig} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainConfig} />
        <NavProjects projects={projectsConfig} />
        <NavSecondary items={navSecondaryWithTheme} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={usersConfig[0]} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
