import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

interface BookmarkContentProps {
  bookmarks: Array<{ title: string; url: string }>
  groupTitle: string
  cardsPerRow?: 1 | 2 | 3 | 4 | 6 // Number of cards per row
}

export function BookmarkContent({
  bookmarks,
  groupTitle,
  cardsPerRow = 2, // Default to 2 cards per row
}: BookmarkContentProps) {
  // Calculate grid columns based on cardsPerRow
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
  }[cardsPerRow]

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{groupTitle}</CardTitle>
        <CardDescription>{bookmarks.length} bookmarks</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className={`grid ${gridCols} gap-4`}>
          {bookmarks.map((bookmark) => (
            <Card
              key={bookmark.title}
              className="group hover:shadow-lg transition-all border-none bg-muted/50"
            >
              <CardHeader className="p-4">
                <CardTitle className="text-base">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{bookmark.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      asChild
                    >
                      <Link
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  <HoverCard>
                    <HoverCardTrigger>
                      <p className="text-sm text-muted-foreground truncate">
                        {bookmark.url}
                      </p>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      The React Framework – created and maintained by @vercel.
                    </HoverCardContent>
                  </HoverCard>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground truncate">
                  {bookmark.url}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
