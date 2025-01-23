## SpecStory

## 修改 LocalDebugButtons 组件为可折叠区域 (2025/1/23 14:27:49)

_**User**_

src/app/dashboard/bookmark/chrome-bookmark/page.tsx 里有一个 LocalDebugButtons 组件帮我把这个显示为一个可折叠的区域，增加页面显示区域以显示更多内容,src/components/bookmark/bookmark-settings.tsx 组件已经实现了折叠 你参考一下

---

_**Assistant**_

我来帮你修改 `LocalDebugButtons` 组件，使其可折叠，类似于 `BookmarkSettings` 组件的实现。让我们先看一下相关文件。

让我查看一下 `LocalDebugButtons` 组件的内容：

---

_**Assistant**_

---

_**Assistant**_

让我们修改 `LocalDebugButtons` 组件，添加折叠功能。我会参考 `BookmarkSettings` 的实现方式：

---

_**Assistant**_

```
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { isLocalEnvironment } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface LocalDebugButtonsProps {
  onLoadLocalBookmarks: () => void
  onOpenLocalFolder: () => void
  onUploadBookmarks: () => void
  onCopyCmdLocalBookmarks: () => void
}

export function LocalDebugButtons({
  onLoadLocalBookmarks,
  onOpenLocalFolder,
  onUploadBookmarks,
  onCopyCmdLocalBookmarks,
}: LocalDebugButtonsProps) {
  const [showContent, setShowContent] = useState(false)

  if (!isLocalEnvironment()) {
    return null
  }

  return (
    <Card className="mb-4">
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">调试工具</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setShowContent(!showContent)}
          >
            {showContent ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {showContent && (
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button variant="outline" onClick={onLoadLocalBookmarks}>
                加载本地 Bookmarks
              </Button>
              <Button variant="outline" onClick={onOpenLocalFolder}>
                打开本地书签文件夹
              </Button>
              <Button variant="outline" onClick={onUploadBookmarks}>
                上传 Bookmarks 文件
              </Button>
            </div>
            <Label className="text-sm text-muted-foreground">
              (三个功能仅在本地调试有效)
            </Label>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
```

---

_**Assistant**_

让我修复一下这些 lint 错误：

---

_**Assistant**_

```
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { isLocalEnvironment } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface LocalDebugButtonsProps {
  onLoadLocalBookmarks: () => void
  onOpenLocalFolder: () => void
  onUploadBookmarks: () => void
}

export function LocalDebugButtons({
  onLoadLocalBookmarks,
  onOpenLocalFolder,
  onUploadBookmarks,
}: LocalDebugButtonsProps) {
// ... existing code ...
```

---

_**Assistant**_

现在我已经完成了修改，主要做了以下改进：

1. 将调试按钮区域改造成了一个可折叠的 Card 组件
2. 添加了折叠/展开功能，默认是折叠状态
3. 使用了与 `BookmarkSettings` 相同的设计风格
4. 移除了非本地环境下的多余代码
5. 修复了所有 lint 错误

现在这个组件会：

- 显示一个标题为"调试工具"的卡片
- 右上角有一个折叠/展开按钮
- 展开时显示所有调试按钮
- 折叠时只显示标题栏，节省空间
- 只在本地环境下显示

你可以在页面中使用这个更新后的组件了，它会帮助你更好地管理页面空间。当你需要使用调试功能时，只需点击展开按钮即可。

---

---
