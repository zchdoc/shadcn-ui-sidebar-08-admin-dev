import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Save } from 'lucide-react'
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
import { useEffect, useState } from 'react'

interface BookmarkContentProps {
  bookmarks: Array<{ title: string; url: string }>
  groupTitle: string
  // Number of cards per row
  cardsPerRow?: 1 | 2 | 3 | 4 | 6 | 8
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  8: 'grid-cols-8',
  10: 'grid-cols-10',
} as const

type GridColsKey = keyof typeof gridCols

// 定义设置类型
interface BookmarkSettings {
  cardsPerRow: GridColsKey
  gap: number
  showCardHeader: boolean
  showCardTitle: boolean
  showCardDescription: boolean
  showHoverCard: boolean
  showCardContent: boolean
}

export function BookmarkContent({
  bookmarks,
  groupTitle,
  cardsPerRow = 2, // Default to 2 cards per row
}: BookmarkContentProps) {
  // 从 localStorage 获取保存的设置
  const loadSettings = (): BookmarkSettings => {
    const savedSettings = localStorage.getItem('bookmarkSettings')
    if (savedSettings) {
      return JSON.parse(savedSettings)
    }
    return {
      cardsPerRow: (cardsPerRow || 2) as GridColsKey,
      gap: 4,
      showCardHeader: true,
      showCardTitle: true,
      showCardDescription: true,
      showHoverCard: true,
      showCardContent: true,
    }
  }

  // 状态管理
  const [settings, setSettings] = useState<BookmarkSettings>(loadSettings)

  // 保存设置到 localStorage
  const saveSettings = () => {
    localStorage.setItem('bookmarkSettings', JSON.stringify(settings))
  }

  // 组件加载时从 localStorage 读取设置
  useEffect(() => {
    const savedSettings = loadSettings()
    setSettings(savedSettings)
  }, [])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{groupTitle}</CardTitle>
        <CardDescription>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span>{bookmarks.length} bookmarks</span>
              <Button
                variant="outline"
                size="sm"
                onClick={saveSettings}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                保存设置
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label>每行卡片数:</Label>
                <Select
                  value={settings.cardsPerRow.toString()}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      cardsPerRow: parseInt(value) as GridColsKey,
                    })
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gridCols).map((cols) => (
                      <SelectItem key={cols} value={cols}>
                        {cols}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label>卡片间距:</Label>
                <Select
                  value={settings.gap.toString()}
                  onValueChange={(value) =>
                    setSettings({ ...settings, gap: Number(value) })
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
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.showCardHeader}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showCardHeader: checked })
                  }
                />
                <Label>显示卡片头部</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.showCardTitle}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showCardTitle: checked })
                  }
                />
                <Label>显示标题</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.showCardDescription}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showCardDescription: checked })
                  }
                />
                <Label>显示描述</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.showHoverCard}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showHoverCard: checked })
                  }
                />
                <Label>显示悬浮卡片</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.showCardContent}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showCardContent: checked })
                  }
                />
                <Label>显示内容</Label>
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div
          className={`grid ${gridCols[settings.cardsPerRow]} gap-${settings.gap}`}
        >
          {bookmarks.map((bookmark) => (
            <Card
              key={bookmark.title}
              className="group hover:shadow-lg transition-all border-none bg-muted/50"
            >
              {settings.showCardHeader && (
                <CardHeader className="p-4">
                  {settings.showCardTitle && (
                    <CardTitle className="text-base">
                      <div className="flex items-center justify-between">
                        <HoverCard>
                          <HoverCardTrigger>
                            <span className="truncate cursor-pointer">
                              {bookmark.title}
                            </span>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <Card>
                              <CardContent className="p-2">
                                {bookmark.title}
                              </CardContent>
                            </Card>
                          </HoverCardContent>
                        </HoverCard>
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
                  {settings.showCardDescription && (
                    <CardDescription className="text-sm text-muted-foreground">
                      {settings.showHoverCard ? (
                        <HoverCard>
                          <HoverCardTrigger>
                            <p className="text-sm text-muted-foreground truncate cursor-pointer">
                              {bookmark.url}
                            </p>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <Card>
                              <CardContent className="p-2">
                                {bookmark.url}
                              </CardContent>
                            </Card>
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
              {settings.showCardContent && (
                <CardContent className="p-4 pt-0">
                  {settings.showHoverCard ? (
                    <HoverCard>
                      <HoverCardTrigger>
                        <p className="text-sm text-muted-foreground truncate cursor-pointer">
                          {bookmark.url}
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <Card>
                          <CardContent className="p-2">
                            {bookmark.url}
                          </CardContent>
                        </Card>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <p className="text-sm text-muted-foreground truncate">
                      {bookmark.url}
                    </p>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
