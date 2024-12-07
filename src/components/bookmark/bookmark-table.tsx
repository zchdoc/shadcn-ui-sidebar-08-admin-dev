'use client'

import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface BookmarkLink {
  title: string
  url: string
}

interface BookmarkTableProps {
  title?: string
  links: BookmarkLink[]
  className?: string
}

export function BookmarkTable({ title, links, className }: BookmarkTableProps) {
  const { theme } = useTheme()
  console.info('theme:', theme)
  return (
    <div className={cn('my-4', className)}>
      {title && (
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'px-4 py-2 rounded-full text-center truncate',
              'transition-all duration-200 ease-in-out',
              'hover:bg-accent hover:text-accent-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              'cursor-pointer'
            )}
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  )
}
