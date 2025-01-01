'use client'

import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LifeBuoy,
  LucideBookmark,
  LucideLayoutDashboard,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Sun,
  MoonStar,
} from 'lucide-react'

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
// import { SidebarSkeleton } from "./sidebar-skeleton";
// import { SidebarSkeletonStyle2 } from "./sidebar-skeleton-style-2";
import { SidebarSkeletonStyle1 } from './sidebar-skeleton-style-1'

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
  // Sider bar items
  const data = {
    user: {
      name: 'Zch',
      email: 'zghnzch@163.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      // Acme Inc
      {
        name: 'Acme Inc',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup',
      },
      {
        name: 'Evil Corp.',
        logo: Command,
        plan: 'Free',
      },
    ],
    navMain: [
      // Dashboard
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LucideLayoutDashboard,
        isActive: true,
      },
      // Bookmark
      {
        title: 'Bookmark',
        url: '#',
        icon: LucideBookmark,
        isActive: true,
        items: [
          // zch UsualBookmark
          {
            title: 'Z.UsualBookmark',
            url: '/dashboard/bookmark/zch-bookmark',
          },
          // Chrome Bookmark
          {
            title: 'Z.ChromeBookmark',
            url: '/dashboard/bookmark/chrome-bookmark',
          },
          // Chrome Bookmark Dev
          {
            title: 'Z.ChromeBookmarkDev',
            url: '/dashboard/bookmark/chrome-bookmark-dev',
          },
        ],
      },
      // Playground
      {
        title: 'Playground',
        url: '#',
        icon: SquareTerminal,
        isActive: false,
        items: [
          {
            title: 'Browser',
            url: '/dashboard/browser/info',
          },
          {
            title: 'BrowserV2',
            url: '/dashboard/browser/info-v2',
          },
          {
            title: 'History',
            url: '/dashboard/history',
          },
          {
            title: 'Starred',
            url: '/dashboard/starred',
          },
          {
            title: 'Settings',
            url: '/dashboard/settings',
          },
        ],
      },
      // Models
      {
        title: 'Models',
        // /dashboard/models
        url: '#',
        icon: Bot,
        items: [
          {
            title: 'Genesis',
            url: '/dashboard/models/genesis',
          },
          {
            title: 'Explorer',
            url: '/dashboard/models/explorer',
          },
          {
            title: 'Quantum',
            url: '/dashboard/models/quantum',
          },
        ],
      },
      // Documentation
      {
        title: 'Documentation',
        // url: "/dashboard/docs",
        url: '#',
        icon: BookOpen,
        items: [
          {
            title: 'Introduction',
            url: '/dashboard/docs/intro',
          },
          {
            title: 'Get Started',
            url: '/dashboard/docs/get-started',
          },
          {
            title: 'Tutorials',
            url: '/dashboard/docs/tutorials',
          },
          {
            title: 'Changelog',
            url: '/dashboard/docs/changelog',
          },
        ],
      },
      // Settings
      {
        title: 'Settings',
        // url: "/dashboard/settings",
        url: '#',
        icon: Settings2,
        items: [
          {
            title: 'General',
            url: '/dashboard/settings/general',
          },
          {
            title: 'Team',
            url: '/dashboard/settings/team',
          },
          {
            title: 'Billing',
            url: '/dashboard/settings/billing',
          },
          {
            title: 'Limits',
            url: '/dashboard/settings/limits',
          },
        ],
      },
    ],
    navSecondary: [
      // Theme
      {
        // title: '',
        title: theme === 'dark' ? 'Theme' : 'Theme',
        onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        icon: theme === 'dark' ? MoonStar : Sun,
      },
      // Support
      {
        title: 'Support',
        url: '/dashboard/support',
        icon: LifeBuoy,
      },
      // Feedback
      {
        title: 'Feedback',
        url: '/dashboard/feedback',
        icon: Send,
      },
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '/dashboard/projects/design-engineering',
        icon: Frame,
      },
      {
        name: 'Sales & Marketing',
        url: '/dashboard/projects/sales-marketing',
        icon: PieChart,
      },
      {
        name: 'Travel',
        url: '/dashboard/projects/travel',
        icon: Map,
      },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props} variant="floating" side="left">
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <TeamSwitcherSingle teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
