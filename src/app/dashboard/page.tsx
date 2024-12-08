'use client'

import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  console.info('loading:', loading)
  const redirectToIndex = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
    router.push('/')
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <Card className="p-4">
          {/* 返回首页 '/' */}
          <h1>Dashboard</h1>
          <a href="#" onClick={redirectToIndex}>
            return to index
          </a>
          .<p>Welcome to your dashboard.</p>
          <p>
            You can customize this page by editing the <code>page.tsx</code>{' '}
            file.
          </p>
          <p>
            You can also add new pages by creating new files in the{' '}
            <code>pages</code> directory.
          </p>
          <p>
            To learn more about Next.js, take a look at the{' '}
            <a href="https://nextjs.org/docs">Next.js documentation</a>.
          </p>
          <p>
            To learn more about Shadcn UI, visit the{' '}
            <a href="https://shadcn.github.io/shadcn-ui/">documentation</a>.
          </p>
        </Card>
      </div>
    </div>
  )
}
