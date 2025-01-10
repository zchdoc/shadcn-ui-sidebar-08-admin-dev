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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

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
  // 状态管理
  const [currentCardsPerRow, setCurrentCardsPerRow] =
    useState<number>(cardsPerRow)
  const [gap, setGap] = useState<number>(4)
  const [showCardHeader, setShowCardHeader] = useState(true)
  const [showCardTitle, setShowCardTitle] = useState(true)
  const [showCardDescription, setShowCardDescription] = useState(true)
  const [showHoverCard, setShowHoverCard] = useState(true)
  const [showCardContent, setShowCardContent] = useState(true)

  // Calculate grid columns based on cardsPerRow
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
  }[currentCardsPerRow]

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{groupTitle}</CardTitle>
        <CardDescription>
          <div className="flex flex-col space-y-4">
            <div>{bookmarks.length} bookmarks</div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label>每行卡片数:</Label>
                <Select
                  value={currentCardsPerRow.toString()}
                  onValueChange={(value) =>
                    setCurrentCardsPerRow(Number(value))
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label>卡片间距:</Label>
                <Select
                  value={gap.toString()}
                  onValueChange={(value) => setGap(Number(value))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">小</SelectItem>
                    <SelectItem value="4">中</SelectItem>
                    <SelectItem value="6">大</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={showCardHeader}
                  onCheckedChange={setShowCardHeader}
                />
                <Label>显示卡片头部</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={showCardTitle}
                  onCheckedChange={setShowCardTitle}
                />
                <Label>显示标题</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={showCardDescription}
                  onCheckedChange={setShowCardDescription}
                />
                <Label>显示描述</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={showHoverCard}
                  onCheckedChange={setShowHoverCard}
                />
                <Label>显示悬浮卡片</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={showCardContent}
                  onCheckedChange={setShowCardContent}
                />
                <Label>显示内容</Label>
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className={`grid ${gridCols} gap-${gap}`}>
          {bookmarks.map((bookmark) => (
            <Card
              key={bookmark.title}
              className="group hover:shadow-lg transition-all border-none bg-muted/50"
            >
              {showCardHeader && (
                <CardHeader className="p-4">
                  {showCardTitle && (
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
                  )}
                  {showCardDescription && (
                    <CardDescription className="text-sm text-muted-foreground">
                      {showHoverCard ? (
                        <HoverCard>
                          <HoverCardTrigger>
                            <p className="text-sm text-muted-foreground truncate">
                              {bookmark.url}
                            </p>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            The React Framework – created and maintained by
                            @vercel.
                          </HoverCardContent>
                        </HoverCard>
                      ) : (
                        <p className="text-sm text-muted-foreground truncate">
                          {bookmark.url}
                        </p>
                      )}
                    </CardDescription>
                  )}
                </CardHeader>
              )}
              {showCardContent && (
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground truncate">
                    {bookmark.url}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
