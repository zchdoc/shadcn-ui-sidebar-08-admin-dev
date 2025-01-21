## SpecStory

## Bookmark Settings Component Modification (2025/1/21 20:25:41)

_**User**_

src/components/bookmark/bookmark-settings.tsx 组件里有一个保存设置的按钮，
可以设置一些组件显示参数，如卡片间距，是否显示标题等，帮我在这个按钮右边添加一个清除设置按钮并实现清除功能，
还有一个问题就是这些设置是共享的，因为有很多其他组件也使用了这个 bookmark-settings.tsx 组件，
例如访问 http://localhost:3000/dashboard/bookmark/zch-bookmark 和 http://localhost:3000/dashboard/bookmark/chrome-bookmark 的时候
这两个连接显示的是不同类型的书签卡片，我希望设置是分开的，zch-bookmark页面的书签展示的card设置不能应用到 chrome-bookmark页面
你读一下相关的代码，帮我实现这个功能，修改当前的 src/components/bookmark/bookmark-settings.tsx 组件，
不要添加其他组件，不要重复添加，不要使现在的页面显示混乱

---

_**Assistant**_

我来帮你修改代码，主要需要做两个改动：

1. 添加一个清除设置的按钮
2. 为不同页面的书签设置添加命名空间，使它们的设置相互独立

以下是对 bookmark-content.tsx 的修改建议：

```typescript:src/components/bookmark/bookmark-content.tsx
// ... existing code ...

export function BookmarkContent({
  bookmarks,
  groupTitle,
  cardsPerRow = 2,
  showGroup = false,
}: BookmarkContentProps) {
  const [isClient, setIsClient] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<BookmarkSettings>({
    ...defaultSettings,
    cardsPerRow: cardsPerRow,
  })

  // 使用 groupTitle 作为存储键的一部分，使不同页面的设置相互独立
  const storageKey = `bookmarkSettings-${groupTitle}`

  // 在客户端加载时从 localStorage 读取设置
  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedSettings = window.localStorage.getItem(storageKey)
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    }
  }, [storageKey])

  // 保存设置到 localStorage
  const saveSettings = () => {
    localStorage.setItem(storageKey, JSON.stringify(settings))
  }

  // 清除设置
  const clearSettings = () => {
    localStorage.removeItem(storageKey)
    setSettings({
      ...defaultSettings,
      cardsPerRow: cardsPerRow,
    })
  }

  // ... existing code ...

  return (
    <Card className="h-full flex flex-col">
      {/* ... existing code ... */}
      {showSettings && (
        <CardDescription>
          <BookmarkSettings
            settings={settings}
            onSettingChange={handleSettingChange}
            onSave={saveSettings}
            onClear={clearSettings}
            bookmarkCount={bookmarks.length}
            gridOptions={Object.keys(gridCols)}
          />
        </CardDescription>
      )}
      {/* ... existing code ... */}
    </Card>
  )
}
```

然后需要修改 bookmark-settings.tsx 组件，添加清除按钮：

```typescript:src/components/bookmark/bookmark-settings.tsx
// ... existing code ...

interface BookmarkSettingsProps {
  settings: BookmarkSettings
  onSettingChange: <K extends keyof BookmarkSettings>(
    key: K,
    value: BookmarkSettings[K]
  ) => void
  onSave: () => void
  onClear: () => void  // 新增清除设置的回调函数
  bookmarkCount: number
  gridOptions: string[]
}

export function BookmarkSettings({
  settings,
  onSettingChange,
  onSave,
  onClear,  // 新增清除设置的回调函数
  bookmarkCount,
  gridOptions,
}: BookmarkSettingsProps) {
  return (
    <div className="space-y-4">
      {/* ... existing code ... */}

      {/* 修改按钮组的布局 */}
      <div className="flex items-center space-x-2">
        <Button onClick={onSave} size="sm">
          保存设置
        </Button>
        <Button
          onClick={onClear}
          size="sm"
          variant="outline"
        >
          重置设置
        </Button>
      </div>
    </div>
  )
}
```

这些修改主要实现了以下功能：

1. 在 BookmarkContent 组件中，使用 `groupTitle` 作为存储键的一部分，这样不同页面的设置就会存储在不同的键下
2. 添加了 `clearSettings` 函数来清除特定页面的设置
3. 在 BookmarkSettings 组件中添加了清除按钮，并通过 `onClear` 属性传递清除功能
4. 修改了按钮的布局，使保存和清除按钮并排显示

这样修改后：

- 不同页面的书签设置将会独立存储和管理
- 用户可以通过清除按钮重置当前页面的设置到默认值
- 原有的功能保持不变，只是增加了新的功能

---

_**User**_

src/components/bookmark/bookmark-settings.tsx 保存设置 添加一个图标吧

---

_**Assistant**_

好的，我来帮你在保存设置按钮上添加一个图标。我们可以继续使用已经导入的 `Save` 图标，只需要调整一下按钮的样式。

```typescript:src/components/bookmark/bookmark-settings.tsx
// ... existing code ...

        <div className="flex items-center space-x-2">
          <Button
            onClick={onSave}
            size="sm"
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            保存设置
          </Button>
          <Button
            onClick={onClear}
            size="sm"
            variant="outline"
          >
            重置设置
          </Button>
        </div>

// ... existing code ...
```

这样修改后：

- 保存按钮会显示一个保存图标
- 添加了 `gap-2` 类来调整图标和文字之间的间距
- 使用 `flex items-center` 确保图标和文字垂直居中对齐
- 保持了原有的其他功能和样式不变

---

---
