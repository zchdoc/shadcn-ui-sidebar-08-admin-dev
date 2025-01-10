import { Card, CardContent } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

interface HoverTextProps {
  text: string
  className?: string
  showHover?: boolean
}

export function HoverText({
  text,
  className = '',
  showHover = true,
}: HoverTextProps) {
  if (!showHover) {
    return <p className={`truncate ${className}`}>{text}</p>
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <p className={`truncate cursor-pointer ${className}`}>{text}</p>
      </HoverCardTrigger>
      <HoverCardContent>
        <Card>
          <CardContent className="p-2">{text}</CardContent>
        </Card>
      </HoverCardContent>
    </HoverCard>
  )
}
