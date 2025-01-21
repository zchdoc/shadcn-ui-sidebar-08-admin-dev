import {
  BookOpen,
  Bot,
  LifeBuoy,
  LucideBookmark,
  LucideLayoutDashboard,
  Send,
  Settings2,
  SquareTerminal,
} from 'lucide-react'

export const navMainConfig = [
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
      {
        title: 'UsualBookmark',
        url: '/dashboard/bookmark/zch-bookmark',
      },
      {
        title: 'ChromeBookmark',
        url: '/dashboard/bookmark/chrome-bookmark',
      },
      {
        title: 'ChromeBookmarkDev',
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
        title: 'Browser-v1',
        url: '/dashboard/browser/info-v1',
      },
      {
        title: 'Browser',
        url: '/dashboard/browser/info',
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
]

export const navSecondaryConfig = [
  {
    title: 'Support',
    url: '/dashboard/support',
    icon: LifeBuoy,
  },
  {
    title: 'Feedback',
    url: '/dashboard/feedback',
    icon: Send,
  },
]
