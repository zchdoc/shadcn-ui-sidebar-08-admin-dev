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

interface BookmarkContentProps {
  bookmarks: Array<{ title: string; url: string }>
  groupTitle: string
}

export function BookmarkContent({
  bookmarks,
  groupTitle,
}: BookmarkContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{groupTitle}</CardTitle>
        <CardDescription>{bookmarks.length} bookmarks</CardDescription>
      </CardHeader>
      {bookmarks.map((bookmark) => (
        <Card
          key={bookmark.title}
          className="group hover:shadow-lg transition-all border-none bg-muted/50"
        >
          <CardHeader>
            <CardTitle className="text-lg">
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
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground truncate">
              {bookmark.url}
            </p>
          </CardContent>
        </Card>
      ))}
    </Card>
  )
}
