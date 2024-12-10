'use client'
import { useState, useEffect, useCallback } from 'react'
import { BookmarkSidebarChrome } from '@/components/bookmark/bookmark-sidebar-chrome'
import { BookmarkContent } from '@/components/bookmark/bookmark-content'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'

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

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header */}
      <div className="flex-none p-8 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">
              Upload your Chrome bookmarks JSON file to view and manage them
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="max-w-[300px]"
          />
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
  )
}
