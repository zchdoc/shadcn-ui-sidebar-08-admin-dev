'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { BookmarkSidebarChrome } from '@/components/bookmark/bookmark-sidebar-chrome'
import { BookmarkContent } from '@/components/bookmark/bookmark-content'
import { Input } from '@/components/ui/input'
import {
  ToastProvider,
  Toast,
  ToastViewport,
  ToastTitle,
  ToastDescription,
} from '@/components/ui/toast'
import { LocalDebugButtons } from '@/components/bookmark/local-debug-buttons'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

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
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['书签栏'])
  const [toast, setToast] = useState<{
    open: boolean
    variant: 'success' | 'error'
    title: string
    description: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 添加检查默认二级书签的函数
  const checkAndSetDefaultSubgroup = useCallback(
    (data: Record<string, BookmarkGroup>) => {
      const defaultGroup = '书签栏'
      const defaultSubgroup = 'zai'

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
    },
    []
  )

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
        } catch (error) {
          console.error('Error reading bookmarks file:', error)
          setToast({
            open: true,
            variant: 'error',
            title: '加载失败',
            description: '无法读取书签文件，请确保Chrome浏览器已关闭',
          })
        }
      } else if (isWindows) {
        try {
          const response = await fetch('/api/system/get-home-dir')
          const { homeDir } = await response.json()
          if (!homeDir) {
            // throw new Error('Could not determine home directory')
            setToast({
              open: true,
              variant: 'error',
              title: 'Fail',
              description: 'Could not determine home directory',
            })
            return
          }
          const bookmarksPath = `${homeDir}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Bookmarks`
          const response2 = await fetch('/api/system/read-bookmarks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: bookmarksPath }),
          })

          if (!response2.ok) {
            // throw new Error('Failed to read bookmarks file')
            setToast({
              open: true,
              variant: 'error',
              title: 'Fail',
              description: 'Failed to read bookmarks file on Windows',
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
      } else {
        setToast({
          open: true,
          variant: 'error',
          title: '不支持的操作系统',
          description: '目前只支持 macOS 和 Windows 系统',
        })
        return
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
      // 使用 userAgent 替代已弃用的 platform API
      const userAgent = window.navigator.userAgent.toLowerCase()
      const isMac = userAgent.includes('mac')
      const isWindows = userAgent.includes('win')

      if (isMac) {
        const homeDir = process.env.NEXT_PUBLIC_HOME_DIR_MAC || ''
        console.info(`Home directory: ${homeDir}`)
        const command = `open "${homeDir}/Library/Application Support/Google/Chrome/Default"`
        await fetch('/api/system/open-folder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ command }),
        })
      } else if (isWindows) {
        const homeDir = process.env.NEXT_PUBLIC_HOME_DIR_WIN || ''
        console.info(`Home directory: ${homeDir}`)
        const command = `explorer "${homeDir}\\AppData\\Local\\Google\\Chrome\\User Data\\Default"`
        await fetch('/api/system/open-folder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ command }),
        })
      } else {
        setToast({
          open: true,
          variant: 'error',
          title: '不支持的操作系统',
          description: '目前只支持 macOS 和 Windows 系统',
        })
        return
      }
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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const content = await file.text()
      const chromeBookmarks = JSON.parse(content)

      // Clear sync_metadata field
      if (chromeBookmarks.sync_metadata) {
        chromeBookmarks.sync_metadata = ''
      }

      // Convert modified bookmarks back to string
      const modifiedContent = JSON.stringify(chromeBookmarks)

      // First, try to back up existing bookmarks
      try {
        const timestamp = format(new Date(), 'yy-MM-dd-HH-mm-ss')
        const backupResponse = await fetch('/api/bookmarks/backup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ timestamp }),
        })

        if (!backupResponse.ok) {
          console.warn('Failed to backup existing bookmarks')
        }
      } catch (backupError) {
        console.error('Error during backup:', backupError)
      }

      // Save the new file with timestamp
      const saveTimestamp = format(new Date(), 'yyMMdd')
      const fileName = `Bookmarks-${saveTimestamp}.json`
      const blob = new Blob([modifiedContent], { type: 'application/json' }) // 使用修改后的内容
      const formData = new FormData()
      formData.append('file', blob, fileName)

      // Send file to server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        // throw new Error('Upload failed')
        setToast({
          open: true,
          variant: 'error',
          title: 'Fail',
          description: 'Upload failed',
        })
        return
      }

      // Process bookmark data
      if (chromeBookmarks.roots?.bookmark_bar) {
        const parsedBookmarks = processBookmarks(
          chromeBookmarks.roots.bookmark_bar
        )
        setBookmarkData(parsedBookmarks)
        setToast({
          open: true,
          variant: 'success',
          title: '书签保存成功',
          description: '已成功保存新书签并备份旧书签',
        })
      }
    } catch (error) {
      console.error('Error processing bookmark file:', error)
      setToast({
        open: true,
        variant: 'error',
        title: '保存失败',
        description: '处理书签文件时发生错误',
      })
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col  from-background to-muted/50"
    >
      <LocalDebugButtons
        onLoadLocalBookmarks={handleLoadBookmarks}
        onOpenLocalFolder={openDefaultBookmarksFolder}
        onUploadBookmarks={handleUploadClick}
      />
      <div className="flex-1 px-8 py-4 min-h-0">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 h-full"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-64 flex-none"
          >
            <div className="rounded-lg  shadow-lg border border-border/50">
              <BookmarkSidebarChrome
                bookmarkData={bookmarkData}
                selectedGroups={selectedGroups}
                onGroupChange={setSelectedGroups}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 min-w-0"
          >
            <div className="h-full rounded-lg  shadow-lg border border-border/50">
              <BookmarkContent
                bookmarks={
                  selectedGroups.length > 1
                    ? bookmarkData[selectedGroups[0]]?.children?.[
                        selectedGroups[1]
                      ]?.links || []
                    : bookmarkData[selectedGroups[0]]?.links || []
                }
                groupTitle={selectedGroups.join(' > ')}
                cardsPerRow={6}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <ToastProvider>
        {toast && (
          <Toast open={toast.open} onOpenChange={() => setToast(null)}>
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.description}</ToastDescription>
          </Toast>
        )}
        <ToastViewport />
      </ToastProvider>
      <Input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
        ref={fileInputRef}
      />
    </motion.div>
  )
}
