## SpecStory

## Setting Default Bookmark Sidebar Selection (2025/1/10 14:05:30)

_**User**_

BookmarkSidebarChrome 如何 默认选择 “书签兰”

---

_**Assistant**_

我来帮你在 `ChromeBookmarkPage` 组件中设置默认选择"书签栏"。我们需要修改 `selectedGroups` 的初始状态。

让我先看一下当前的代码：

---

_**Assistant**_

---

_**Assistant**_

我明白了。我们需要修改 `ChromeBookmarkPage` 组件中的初始状态，让它默认选择"书签栏"。让我来修改这个文件：

---

_**Assistant**_

````
```typescript
// ... existing code ...
export default function ChromeBookmarkPage() {
  const [bookmarkData, setBookmarkData] = useState<
    Record<string, BookmarkGroup>
  >({})
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['书签栏'])
// ... existing code ...
````

```

---

_**Assistant**_



这样修改后，当组件加载时，会默认选择"书签栏"。这个修改会：

1. 将 `selectedGroups` 的初始值从空数组 `[]` 改为 `['书签栏']`
2. 当 Chrome 书签数据加载完成后，会自动显示"书签栏"下的内容
3. 侧边栏的第一个下拉菜单会默认选中"书签栏"

这样用户打开页面时就会直接看到"书签栏"的内容，而不需要手动选择了。

需要注意的是，这个修改假设 Chrome 书签数据中"书签栏"的名称就是"书签栏"。如果实际的名称不同（比如是"Bookmarks Bar"或其他），你需要相应地调整这个默认值。

你可以测试一下这个修改是否符合你的需求。如果书签栏的实际名称不是"书签栏"，请告诉我，我们可以调整这个默认值。

---

_**User**_

还可以默认选择 书签兰的下一级吗，比如  acollect ，如果 有 acollect 这个节点就执行选中的逻辑 如果没有就提示 默认节点 acollect 不存在

---

_**Assistant**_

我来帮你实现这个功能。我们需要修改代码来检查是否存在 "acollect" 节点，并在存在时默认选中它。

---

_**Assistant**_

```

```typescript
// ... existing code ...
export default function ChromeBookmarkPage() {
  const [bookmarkData, setBookmarkData] = useState<
    Record<string, BookmarkGroup>
  >({})
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['书签栏'])
  const [toast, setToast] = useState<{
    open: boolean
    variant: 'success' | 'error'
    title: string
    description: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 添加检查默认二级书签的函数
  const checkAndSetDefaultSubgroup = useCallback((data: Record<string, BookmarkGroup>) => {
    const defaultGroup = '书签栏'
    const defaultSubgroup = 'acollect'

    if (data[defaultGroup]?.children?.[defaultSubgroup]) {
      setSelectedGroups([defaultGroup, defaultSubgroup])
    } else {
      setSelectedGroups([defaultGroup])
      setToast({
        open: true,
        variant: 'error',
        title: '提示',
        description: '默认节点 acollect 不存在',
      })
    }
  }, [])

  // 使用 useCallback 包裹 processBookmarks 函数
// ... existing code ...

  useEffect(() => {
    const loadInitialBookmarks = async () => {
      try {
        const response = await fetch('/api/bookmarks')
        if (response.ok) {
          const { content } = await response.json()
          const chromeBookmarks = JSON.parse(content)
          if (chromeBookmarks.roots?.bookmark_bar) {
            const parsedBookmarks = processBookmarks(
              chromeBookmarks.roots.bookmark_bar
            )
            setBookmarkData(parsedBookmarks)
            // 在设置书签数据后检查并设置默认的二级书签
            checkAndSetDefaultSubgroup(parsedBookmarks)
          }
        }
      } catch (error) {
        console.error('Error loading initial bookmarks:', error)
      }
    }

    loadInitialBookmarks().then((r) =>
      console.info('loadInitialBookmarks-r:', r)
    )
  }, [processBookmarks, checkAndSetDefaultSubgroup])

  const handleLoadBookmarks = async () => {
    try {
      // 使用 userAgent 替代已弃用的 platform API
      const userAgent = window.navigator.userAgent.toLowerCase()
      const isMac = userAgent.includes('mac')
      const isWindows = userAgent.includes('win')

      if (isMac) {
        try {
          const response = await fetch('/api/system/get-home-dir')
          const { homeDir } = await response.json()
          if (!homeDir) {
            setToast({
              open: true,
              variant: 'error',
              title: '加载失败',
              description: 'Could not determine home directory',
            })
            return
          }
          const bookmarksPath = `${homeDir}/Library/Application Support/Google/Chrome/Default/Bookmarks`
          const response2 = await fetch('/api/system/read-bookmarks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: bookmarksPath }),
          })

          if (!response2.ok) {
            setToast({
              open: true,
              variant: 'error',
              title: 'Fail',
              description: 'Failed to read bookmarks file',
            })
            return
          }

          const { content } = await response2.json()
          const chromeBookmarks = JSON.parse(content)
          if (chromeBookmarks.roots?.bookmark_bar) {
            const parsedBookmarks = processBookmarks(
              chromeBookmarks.roots.bookmark_bar
            )
            setBookmarkData(parsedBookmarks)
            // 在这里也添加检查默认二级书签的逻辑
            checkAndSetDefaultSubgroup(parsedBookmarks)
            setToast({
              open: true,
              variant: 'success',
              title: '书签加载成功',
              description: '已成功从Chrome浏览器导入书签',
            })
          }
// ... existing code ...
```

```

---

_**Assistant**_



我已经添加了以下功能：

1. 新增了 `checkAndSetDefaultSubgroup` 函数，用于检查和设置默认的二级书签
2. 该函数会检查 "书签栏" 下是否存在 "acollect" 节点：
   - 如果存在，会自动选中 `['书签栏', 'acollect']`
   - 如果不存在，会只选中 `['书签栏']` 并显示提示消息
3. 在两个地方调用了这个函数：
   - 初始加载书签时
   - 手动加载书签时

现在，当书签数据加载完成后：
- 如果存在 "acollect" 节点，会自动选中 "书签栏 > acollect"
- 如果不存在，会选中 "书签栏" 并显示提示消息 "默认节点 acollect 不存在"

这样就实现了你想要的功能。如果你想修改默认的二级节点名称，只需要修改 `checkAndSetDefaultSubgroup` 函数中的 `defaultSubgroup` 常量值即可。

---



---

```
