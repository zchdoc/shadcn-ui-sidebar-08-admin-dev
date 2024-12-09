'use client'

import { useState, useEffect } from 'react'
import { BookmarkSidebar } from '@/components/bookmark/bookmark-sidebar'
import { BookmarkContent } from '@/components/bookmark/bookmark-content'
// import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'

interface BookmarkGroup {
  title: string
  links: Array<{ title: string; url: string }>
}

interface ChromeBookmark {
  children?: ChromeBookmark[]
  name?: string
  type?: string
  url?: string
}

export default function ChromeBookmarkPage() {
  const [bookmarkData, setBookmarkData] = useState<
    Record<string, BookmarkGroup>
  >({})
  const [selectedGroup, setSelectedGroup] = useState<string>('')

  // 添加处理书签数据的通用函数
  const processBookmarks = (
    bookmarks: ChromeBookmark,
    category: string = ''
  ) => {
    const parsedBookmarks: Record<string, BookmarkGroup> = {}

    if (bookmarks.children) {
      const categoryName = bookmarks.name || category
      if (bookmarks.children.some((child) => child.type === 'url')) {
        parsedBookmarks[categoryName] = {
          title: categoryName,
          links: bookmarks.children
            .filter((child) => child.type === 'url')
            .map((child) => ({
              title: child.name || '',
              url: child.url || '',
            })),
        }
      }
      bookmarks.children.forEach((child) => {
        if (child.children) {
          Object.assign(parsedBookmarks, processBookmarks(child, child.name))
        }
      })
    }
    return parsedBookmarks
  }

  // 添加初始化加载函数
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

  // 组件加载时获取书签数据
  useEffect(() => {
    loadInitialBookmarks()
  }, [loadInitialBookmarks]) // 将 loadInitialBookmarks 添加到依赖数组

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
            <BookmarkSidebar
              bookmarkData={bookmarkData}
              selectedGroup={selectedGroup}
              onGroupChange={setSelectedGroup}
            />
          </div>

          {/* Content - fills remaining space */}
          <div className="flex-1 min-w-0">
            {' '}
            {/* min-w-0 prevents flex child from overflowing */}
            <BookmarkContent
              bookmarks={bookmarkData[selectedGroup]?.links || []}
              groupTitle={
                bookmarkData[selectedGroup]?.title || 'Select a group'
              }
              cardsPerRow={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
