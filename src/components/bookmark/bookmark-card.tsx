import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Badge } from '@/components/ui/badge'

interface BookmarkCardProps {
  title: string
  url: string
  settings: {
    showCardHeader: boolean
    showCardTitle: boolean
    showCardDescription: boolean
    showHoverCard: boolean
    showCardContent: boolean
    showBadge: boolean
  }
  group?: string
}

export function BookmarkCard({
  title,
  url,
  settings,
  group,
}: BookmarkCardProps) {
  const handleClick = () => {
    window.open(url, '_blank')
  }

  const card = (
    <Card
      className="cursor-pointer hover:bg-accent transition-colors"
      onClick={handleClick}
    >
      {settings.showCardHeader && (
        <CardHeader className="p-4">
          {settings.showCardTitle && (
            <CardTitle className="text-base truncate">
              {title}
              {group && settings.showBadge && (
                <Badge variant="secondary" className="ml-2">
                  {group}
                </Badge>
              )}
            </CardTitle>
          )}
          {settings.showCardDescription && (
            <CardDescription className="truncate">{url}</CardDescription>
          )}
        </CardHeader>
      )}
      {settings.showCardContent && (
        <CardContent className="p-4 pt-0">
          <div className="text-sm text-muted-foreground truncate">{url}</div>
        </CardContent>
      )}
    </Card>
  )

  if (settings.showHoverCard) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>{card}</HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">
              {title}
              {group && settings.showBadge && (
                <Badge variant="secondary" className="ml-2">
                  {group}
                </Badge>
              )}
            </h4>
            <p className="text-sm text-muted-foreground break-all">{url}</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  }

  return card
}
