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
    <div className="h-full flex flex-col">
      {/* Fixed Header */}
      <div className="flex-none px-4 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground"></p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 pt-4 pb-6 min-h-0">
        <div className="flex gap-4 h-full">
          {/* Content - fills remaining space */}
          <div className="flex-1 min-w-0 flex flex-col gap-2 p-2">
            {/* Top controls row */}
            <div className="flex gap-4 items-center">
              <div className="w-64">
                <BookmarkSidebar
                  bookmarkData={bookmarkData}
                  selectedGroup={selectedGroup}
                  onGroupChange={setSelectedGroup}
                />
              </div>
              <Input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="flex-1"
              />
            </div>
            <BookmarkContent
              bookmarks={bookmarkData[selectedGroup]?.links || []}
              groupTitle={
                bookmarkData[selectedGroup]?.title || 'Select a group'
              }
              cardsPerRow={3}
              settingsKey={'chrome-bookmark-dev'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
