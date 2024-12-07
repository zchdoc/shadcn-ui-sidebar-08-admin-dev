import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
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
    <div className="flex-1 rounded-xl bg-card text-card-foreground shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            {groupTitle}
          </h2>
          <span className="text-sm text-muted-foreground">
            {bookmarks.length} bookmarks
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      </div>
    </div>
  )
}
