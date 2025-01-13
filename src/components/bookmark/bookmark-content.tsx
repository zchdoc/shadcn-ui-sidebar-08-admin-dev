import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { useEffect, useState, useCallback } from 'react'
import { BookmarkCard } from './bookmark-card'
import { BookmarkSettings } from './bookmark-settings'

interface BookmarkContentProps {
  bookmarks: Array<{ title: string; url: string }>
  groupTitle: string
  cardsPerRow?: GridColsKey
}

type GridColsKey = 1 | 2 | 3 | 4 | 6 | 8 | 10

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  8: 'grid-cols-8',
  10: 'grid-cols-10',
} as const

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
  cardsPerRow = 2,
}: BookmarkContentProps) {
  // 从 localStorage 获取保存的设置
  const loadSettings = useCallback((): BookmarkSettings => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedSettings = window.localStorage.getItem('bookmarkSettings')
      if (savedSettings) {
        return JSON.parse(savedSettings)
      }
    }
    return {
      cardsPerRow: cardsPerRow || 2,
      gap: 4,
      showCardHeader: true,
      showCardTitle: true,
      showCardDescription: true,
      showHoverCard: true,
      showCardContent: true,
    }
  }, [cardsPerRow])

  // 状态管理
  const [settings, setSettings] = useState<BookmarkSettings>(loadSettings)

  // 保存设置到 localStorage
  const saveSettings = () => {
    localStorage.setItem('bookmarkSettings', JSON.stringify(settings))
  }

  // 处理设置变更
  const handleSettingChange = <K extends keyof BookmarkSettings>(
    key: K,
    value: BookmarkSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  // 组件加载时从 localStorage 读取设置
  useEffect(() => {
    const savedSettings = loadSettings()
    setSettings(savedSettings)
  }, [loadSettings])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{groupTitle}</CardTitle>
        <CardDescription>
          <BookmarkSettings
            settings={settings}
            onSettingChange={handleSettingChange}
            onSave={saveSettings}
            bookmarkCount={bookmarks.length}
            gridOptions={Object.keys(gridCols)}
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div
          className={`grid ${gridCols[settings.cardsPerRow]} gap-${settings.gap}`}
        >
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.title}
              title={bookmark.title}
              url={bookmark.url}
              settings={settings}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
