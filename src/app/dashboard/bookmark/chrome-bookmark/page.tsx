'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { BookmarkSidebarChrome } from '@/components/bookmark/bookmark-sidebar-chrome'
import { BookmarkContent } from '@/components/bookmark/bookmark-content'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import {
  ToastProvider,
  Toast,
  ToastViewport,
  ToastTitle,
  ToastDescription,
} from '@/components/ui/toast'

interface BookmarkGroup {
  title: string
  children?: Record<string, BookmarkGroup>
  links: Array<{ title: string; url: string }>
}

interface ChromeBookmark {
  children?: ChromeBookmark[]
  name?: string
  type?: string
  url?: string
  date_added?: string
}

export default function ChromeBookmarkPage() {
  const [bookmarkData, setBookmarkData] = useState<
    Record<string, BookmarkGroup>
  >({})
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [toast, setToast] = useState<{
    open: boolean
    variant: 'success' | 'error'
    title: string
    description: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  // 使用 useCallback 包裹 processBookmarks 函数
  const processBookmarks = useCallback(
    (bookmarks: ChromeBookmark, category: string = '') => {
      const parsedBookmarks: Record<string, BookmarkGroup> = {}

      if (bookmarks.children) {
        const categoryName = bookmarks.name || category

        // 创建当前层级的书签组
        parsedBookmarks[categoryName] = {
          title: categoryName,
          children: {},
          links: [],
        }

        // 处理当前层级的链接
        const currentLinks = bookmarks.children
          .filter((child) => child.type === 'url')
          .map((child) => ({
            title: child.name || '',
            url: child.url || '',
          }))

        if (currentLinks.length > 0) {
          parsedBookmarks[categoryName].links = currentLinks
        }

        // 递归处理子文件夹
        bookmarks.children.forEach((child) => {
          if (child.children) {
            const childBookmarks = processBookmarks(child, child.name)
            parsedBookmarks[categoryName].children = {
              ...parsedBookmarks[categoryName].children,
              ...childBookmarks,
            }
          }
        })
      }
      return parsedBookmarks
    },
    []
  )

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
          }
        }
      } catch (error) {
        console.error('Error loading initial bookmarks:', error)
      }
    }

    loadInitialBookmarks()
  }, [processBookmarks])

  const handleLoadBookmarks = async () => {
    try {
      const platform = window.navigator.platform.toLowerCase()
      let bookmarksPath

      if (platform.includes('mac')) {
        const response = await fetch('/api/system/get-home-dir')
        const { homeDir } = await response.json()
        if (!homeDir) {
          throw new Error('Could not determine home directory')
        }
        bookmarksPath = `${homeDir}/Library/Application Support/Google/Chrome/Default/Bookmarks`
      } else if (platform.includes('win')) {
        const response = await fetch('/api/system/get-home-dir')
        const { homeDir } = await response.json()
        if (!homeDir) {
          throw new Error('Could not determine home directory')
        }
        bookmarksPath = `${homeDir}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Bookmarks`
      } else {
        setToast({
          open: true,
          variant: 'error',
          title: '不支持的操作系统',
          description: '目前只支持 macOS 和 Windows 系统',
        })
        return
      }

      const response = await fetch('/api/system/read-bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: bookmarksPath }),
      })

      if (!response.ok) {
        throw new Error('Failed to read bookmarks file')
      }

      const { content } = await response.json()
      const chromeBookmarks = JSON.parse(content)
      if (chromeBookmarks.roots?.bookmark_bar) {
        const parsedBookmarks = processBookmarks(
          chromeBookmarks.roots.bookmark_bar
        )
        setBookmarkData(parsedBookmarks)
        setToast({
          open: true,
          variant: 'success',
          title: '书签加载成功',
          description: '已成功从Chrome浏览器导入书签',
        })
      }
    } catch (error) {
      console.error('Error reading bookmarks file:', error)
      setToast({
        open: true,
        variant: 'error',
        title: '加载失败',
        description: '无法读取书签文件，请确保Chrome浏览器已关闭',
      })
    }
  }

  const openDefaultBookmarksFolder = async () => {
    try {
      const platform = window.navigator.platform.toLowerCase()
      let command

      if (platform.includes('mac')) {
        const homeDir = process.env.NEXT_PUBLIC_HOME_DIR_MAC || ''
        console.info(`Home directory: ${homeDir}`)
        command = `open "${homeDir}/Library/Application Support/Google/Chrome/Default"`
      } else if (platform.includes('win')) {
        const homeDir = process.env.NEXT_PUBLIC_HOME_DIR_WIN || ''
        command = `explorer "${homeDir}\\AppData\\Local\\Google\\Chrome\\User Data\\Default"`
      } else {
        setToast({
          open: true,
          variant: 'error',
          title: '不支持的操作系统',
          description: '目前只支持 macOS 和 Windows 系统',
        })
        return
      }

      await fetch('/api/system/open-folder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      })
    } catch (error) {
      console.error('Error opening bookmarks folder:', error)
      setToast({
        open: true,
        variant: 'error',
        title: 'error',
        description: 'Failed to open bookmarks folder',
      })
    }
  }

  // 获取当前选中书签组的内容
  const getCurrentBookmarks = useCallback(() => {
    if (selectedGroups.length === 0)
      return { links: [], title: 'Select a group' }

    let currentGroup = bookmarkData[selectedGroups[0]]
    let currentPath = selectedGroups[0]

    // 遍历选中的路径以获取最终选中的书签组
    for (let i = 1; i < selectedGroups.length; i++) {
      if (!currentGroup?.children) break
      currentGroup = currentGroup.children[selectedGroups[i]]
      currentPath += ' > ' + selectedGroups[i]
    }

    return {
      links: currentGroup?.links || [],
      title: currentPath,
    }
  }, [selectedGroups, bookmarkData])
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const content = await file.text()
      const chromeBookmarks = JSON.parse(content)

      // Save the file with timestamp
      const timestamp = format(new Date(), 'yyMMdd')
      const fileName = `Bookmarks-${timestamp}.json`
      const blob = new Blob([content], { type: 'application/json' })
      const formData = new FormData()
      formData.append('file', blob, fileName)

      // 发送文件到服务器
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      // 处理书签数据
      if (chromeBookmarks.roots?.bookmark_bar) {
        const parsedBookmarks = processBookmarks(
          chromeBookmarks.roots.bookmark_bar
        )
        setBookmarkData(parsedBookmarks)
      }
    } catch (error) {
      console.error('Error processing bookmark file:', error)
    }
  }

  const handleUploadClick = async () => {
    try {
      const platform = window.navigator.platform.toLowerCase()
      let command

      if (platform.includes('mac')) {
        const homeDirMac = process.env.NEXT_PUBLIC_HOME_DIR_MAC || ''
        console.info(`Home directory: ${homeDirMac}`)
        // command = `open -R "${homeDir}/Library/Application Support/Google/Chrome/Default/Bookmarks"`
      } else if (platform.includes('win')) {
        const homeDirWin = process.env.NEXT_PUBLIC_HOME_DIR_WIN || ''
        console.info(`Home directory: ${homeDirWin}`)
        // command = `explorer /select,"${homeDir}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Bookmarks"`
      } else {
        // alert('Unsupported operating system')
        // return
        setToast({
          open: true,
          variant: 'error',
          title: 'Unsupported',
          description: 'Unsupported operating system',
        })
      }

      await fetch('/api/system/open-folder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      })

      // 触发文件选择器
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    } catch (error) {
      console.error('Error opening bookmarks file:', error)
      // alert('Failed to open bookmarks file')
    }
  }
  return (
    <ToastProvider>
      <div className="h-full flex flex-col">
        {toast && (
          <Toast
            open={toast.open}
            variant={toast.variant}
            onOpenChange={(open) => {
              if (!open) setToast(null)
            }}
          >
            <div>
              <ToastTitle>{toast.title}</ToastTitle>
              <ToastDescription>{toast.description}</ToastDescription>
            </div>
          </Toast>
        )}
        <ToastViewport />
        {/* Fixed Header */}
        <div className="flex-none p-8 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">
                Upload your Chrome bookmarks JSON file to view and manage them
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={handleLoadBookmarks}
              variant="outline"
              className="whitespace-nowrap"
            >
              加载 Bookmarks
            </Button>
            <Button
              onClick={openDefaultBookmarksFolder}
              variant="outline"
              className="whitespace-nowrap"
            >
              打开书签文件夹
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
              placeholder="上传书签文件"
            />
            <Button
              onClick={handleUploadClick}
              variant="outline"
              className="whitespace-nowrap"
            >
              选择 Bookmarks 文件
            </Button>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 p-8 pt-4 min-h-0">
          {' '}
          {/* min-h-0 is crucial for nested flex scroll */}
          <div className="flex gap-4 h-full">
            {/* Sidebar - fixed width */}
            <div className="w-64 flex-none">
              <BookmarkSidebarChrome
                bookmarkData={bookmarkData}
                selectedGroups={selectedGroups}
                onGroupChange={setSelectedGroups}
              />
            </div>
            {/* Content - fills remaining space */}
            <div className="flex-1 min-w-0">
              {' '}
              {/* min-w-0 prevents flex child from overflowing */}
              <BookmarkContent
                bookmarks={getCurrentBookmarks().links}
                groupTitle={getCurrentBookmarks().title}
                cardsPerRow={3}
              />
            </div>
          </div>
        </div>
      </div>
    </ToastProvider>
  )
}
