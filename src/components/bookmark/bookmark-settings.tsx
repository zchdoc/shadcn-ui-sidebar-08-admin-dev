import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Save } from 'lucide-react'

type GridColsKey = 1 | 2 | 3 | 4 | 6 | 8 | 10

interface BookmarkSettings {
  cardsPerRow: GridColsKey
  gap: number
  showCardHeader: boolean
  showCardTitle: boolean
  showCardDescription: boolean
  showHoverCard: boolean
  showCardContent: boolean
}

interface BookmarkSettingsProps {
  settings: BookmarkSettings
  onSettingChange: <K extends keyof BookmarkSettings>(
    key: K,
    value: BookmarkSettings[K]
  ) => void
  onSave: () => void
  bookmarkCount: number
  gridOptions: string[]
}

export function BookmarkSettings({
  settings,
  onSettingChange,
  onSave,
  bookmarkCount,
  gridOptions,
}: BookmarkSettingsProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <span>{bookmarkCount} bookmarks</span>
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
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
              onSettingChange('cardsPerRow', Number(value) as GridColsKey)
            }
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {gridOptions.map((cols) => (
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
            onValueChange={(value) => onSettingChange('gap', Number(value))}
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
              onSettingChange('showCardHeader', checked)
            }
          />
          <Label>显示卡片头部</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={settings.showCardTitle}
            onCheckedChange={(checked) =>
              onSettingChange('showCardTitle', checked)
            }
          />
          <Label>显示标题</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={settings.showCardDescription}
            onCheckedChange={(checked) =>
              onSettingChange('showCardDescription', checked)
            }
          />
          <Label>显示描述</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={settings.showHoverCard}
            onCheckedChange={(checked) =>
              onSettingChange('showHoverCard', checked)
            }
          />
          <Label>显示悬浮卡片</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={settings.showCardContent}
            onCheckedChange={(checked) =>
              onSettingChange('showCardContent', checked)
            }
          />
          <Label>显示内容</Label>
        </div>
      </div>
    </div>
  )
}
