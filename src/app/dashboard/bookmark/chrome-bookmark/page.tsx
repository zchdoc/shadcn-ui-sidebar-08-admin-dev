'use client'

import { useState } from 'react'
import { BookmarkSidebar } from '@/components/bookmark/bookmark-sidebar'
import { BookmarkContent } from '@/components/bookmark/bookmark-content'
// import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'

interface BookmarkData {
  [key: string]: {
    title: string
    links: { title: string; url: string }[]
  }
}

interface ChromeBookmark {
  children?: ChromeBookmark[]
  name?: string
  type?: string
  url?: string
}

export default function ChromeBookmarkPage() {
  const [bookmarkData, setBookmarkData] = useState<BookmarkData>({})
  const [selectedGroup, setSelectedGroup] = useState<string>('')

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

      // You would typically send this to your server
      // For now, we'll just parse and display the bookmarks
      const parsedBookmarks: BookmarkData = {}

      const processBookmarks = (
        bookmarks: ChromeBookmark,
        category: string = ''
      ) => {
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
              processBookmarks(child, child.name)
            }
          })
        }
      }

      if (chromeBookmarks.roots?.bookmark_bar) {
        processBookmarks(chromeBookmarks.roots.bookmark_bar)
      }

      setBookmarkData(parsedBookmarks)
    } catch (error) {
      console.error('Error processing bookmark file:', error)
    }
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          {/* <h2 className="text-2xl font-bold tracking-tight">Chrome Bookmarks</h2> */}
          <p className="text-muted-foreground">
            Upload your Chrome bookmarks JSON file to view and manage them
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="max-w-[300px]"
        />
      </div>
      <div className="flex-1 space-y-4 pt-4">
        <div className="flex items-start justify-between gap-4">
          <BookmarkSidebar
            bookmarkData={bookmarkData}
            selectedGroup={selectedGroup}
            onGroupChange={setSelectedGroup}
          />
          <BookmarkContent
            bookmarks={bookmarkData[selectedGroup]?.links || []}
            groupTitle={bookmarkData[selectedGroup]?.title || 'Select a group'}
            cardsPerRow={3}
          />
        </div>
      </div>
    </div>
  )
}
