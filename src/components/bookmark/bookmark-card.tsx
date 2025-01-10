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
import { HoverText } from './hover-text'

interface BookmarkCardProps {
  title: string
  url: string
  settings: {
    showCardHeader: boolean
    showCardTitle: boolean
    showCardDescription: boolean
    showHoverCard: boolean
    showCardContent: boolean
  }
}

export function BookmarkCard({ title, url, settings }: BookmarkCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all border-none bg-muted/50">
      {settings.showCardHeader && (
        <CardHeader className="p-4">
          {settings.showCardTitle && (
            <CardTitle className="text-base">
              <div className="flex items-center justify-between">
                <HoverText
                  text={title}
                  showHover={settings.showHoverCard}
                  className="text-base font-semibold"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  asChild
                >
                  <Link href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardTitle>
          )}
          {settings.showCardDescription && (
            <CardDescription className="text-sm text-muted-foreground">
              <HoverText
                text={url}
                showHover={settings.showHoverCard}
                className="text-sm text-muted-foreground"
              />
            </CardDescription>
          )}
        </CardHeader>
      )}
      {settings.showCardContent && (
        <CardContent className="p-4 pt-0">
          <HoverText
            text={url}
            showHover={settings.showHoverCard}
            className="text-sm text-muted-foreground"
          />
        </CardContent>
      )}
    </Card>
  )
}
