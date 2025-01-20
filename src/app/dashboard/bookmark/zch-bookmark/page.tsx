'use client'

import { useState, useEffect } from 'react'
import { BookmarkContent } from '@/components/bookmark/bookmark-content'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface BookmarkData {
  [key: string]: {
    title: string
    links: { title: string; url: string }[]
  }
}

export default function BookmarkPage() {
  const bookmarkData: BookmarkData = {
    xbClientLogin: {
      title: 'XB Client Login',
      links: [
        { title: 'J1c', url: 'http://1.singbon.com:81' },
        { title: 'A2c', url: 'http://a2.4000063966.com:81' },
        { title: 'A3c', url: 'http://a3c.4000063966.com:8081' },
        { title: 'A4c', url: 'http://a4c.4000063966.com:8081' },
        { title: 'Cdzc', url: 'http://cdz.4000063966.com:8081' },
        { title: 'Gxcdzc', url: 'http://chongdian.4000063966.com:81' },
      ],
    },
    xbLogin: {
      title: 'XB Login',
      links: [
        { title: 'J1cb', url: 'http://1.singbon.com:81/xb/login.do' },
        { title: 'A2cb', url: 'http://a2.4000063966.com:81/xb/login.do' },
        { title: 'A3cb', url: 'http://a3c.4000063966.com:8081/xb/login.do' },
        { title: 'A4cb', url: 'http://a4c.4000063966.com:8081/xb/login.do' },
        { title: 'Cdzcb', url: 'http://cdz.4000063966.com:8084/login' },
        {
          title: 'Gxcdzcb',
          url: 'http://chongdian.4000063966.com:81/singbon/backgroud/system/admin/login.do',
        },
      ],
    },
    xbInfoQuery: {
      title: 'XB Info Query',
      links: [
        {
          title: 'J1Query',
          url: 'http://1.singbon.com:81/netInterface/singbon/companyIndex.do',
        },
        {
          title: 'A2Query',
          url: 'http://a2.4000063966.com:81/netInterface/singbon/companyIndex.do',
        },
        // a3c.4000063966.com:8081/netInterface/singbon/companyIndex.do
        {
          title: 'A3Query',
          url: 'http://a3c.4000063966.com:8081/netInterface/singbon/companyIndex.do',
        },
        // a4c.4000063966.com:8081/netInterface/singbon/companyIndex.do
        {
          title: 'A4Query',
          url: 'http://a4c.4000063966.com:8081/netInterface/singbon/companyIndex.do',
        },
        // cdz.4000063966.com:8081/netInterface/singbon/companyIndex.do
        {
          title: 'CDZQuery',
          url: 'http://cdz.4000063966.com:8081/netInterface/singbon/companyIndex.do',
        },
        // https://navgit.wwzh.xyz/pages/xb-tools/xb-encrypt-js.html
        {
          title: 'JustQuery',
          url: 'https://navgit.wwzh.xyz/pages/xb-tools/xb-encrypt-js.html',
        },
      ],
    },
    tools: {
      title: 'Tools',
      links: [
        {
          title: 'Pulse-Water-Billing-Calc',
          url: '../pulse-water-billing-calc/pulse-water-billing-calc.html',
        },
        {
          title: 'Localize-Jrh',
          url: '../chrome-bookmarks-simple/index.html?name=嘉荣华',
        },
        {
          title: 'Localize',
          url: '../chrome-bookmarks-simple/index.html?name=bscus',
        },
        { title: 'Ip-Check', url: '../ip-check-query/ip-check-query.html' },
        { title: 'Qr-Generate', url: '../qr-styling/index.html' },
        {
          title: 'Dup-Remove',
          url: '../duplicate-str-remove/duplicate-remove.html',
        },
        { title: 'Random-Num', url: '../random/random-gen.html' },
        { title: 'Hex-Dec-Convert', url: '../num-bin-convert/index.html' },
        {
          title: 'Rmb-Chinese-Convert',
          url: '../rmb_convert/RMB_2_Chinese_Up.html',
        },
      ],
    },
    searchEngines: {
      title: 'Search Engines',
      links: [
        { title: 'NextNav', url: 'https://nextnav.wwzh.xyz/' },
        { title: 'AttSB', url: 'https://att.wwzh.xyz/' },
        {
          title: 'Bookmark-All',
          url: '../chrome-bookmarks-simple/index.html?name=all',
        },
        {
          title: 'Bs-Custom',
          url: '../chrome-bookmarks-simple/index.html?name=bscus',
        },
        {
          title: 'Bookmark-Ai',
          url: '../chrome-bookmarks-simple/index.html?name=Zai',
        },
        {
          title: 'Pin-Tree-Dev',
          url: 'https://zchdoc.github.io/pintree-dev-z',
        },
        { title: 'Google', url: 'https://www.google.com' },
        { title: 'DuckDuckGo', url: 'https://www.duckduckgo.com' },
        { title: 'Bing', url: 'https://www.bing.com' },
        { title: 'Baidu', url: 'https://www.baidu.com' },
        { title: 'Sogou', url: 'https://www.sogou.com' },
        { title: 'So360', url: 'https://www.so.com/' },
      ],
    },
    socialMedia: {
      title: 'Social Media',
      links: [
        { title: 'X', url: 'https://x.com/' },
        { title: 'Bsky', url: 'https://bsky.app' },
        { title: 'Teddit', url: 'https://www.reddit.com' },
        { title: 'Telegram', url: 'https://web.telegram.org/a/' },
        { title: 'Discord', url: 'https://discord.com/channels/@me' },
        { title: 'Ins', url: 'https://www.instagram.com/' },
        { title: 'LinuxDo', url: 'https://linux.do/' },
        { title: 'Zhihu', url: 'https://www.zhihu.com' },
        { title: '52Pj', url: 'https://www.52pojie.cn/' },
      ],
    },
    git: {
      title: 'Git',
      links: [
        { title: 'Github', url: 'https://github.com/zchdoc' },
        { title: 'Gitee', url: 'https://gitee.com/' },
        { title: 'Codeup', url: 'https://codeup.aliyun.com/' },
        { title: 'Gitlab', url: 'https://gitlab.com/' },
        { title: 'Csdn-git', url: 'https://gitcode.com/' },
        { title: 'Github-m', url: 'https://github.com/trending?since=monthly' },
      ],
    },
    aiRanking: {
      title: 'AI Ranking',
      links: [
        { title: 'R-SuperClue', url: 'https://www.superclueai.com' },
        { title: 'R-LMsys', url: 'https://chat.lmsys.org/?leaderboard' },
        { title: 'R-Aider', url: 'https://aider.chat/docs/leaderboards' },
        {
          title: 'R-OpenRouter',
          url: 'https://openrouter.ai/rankings/programming?view=month',
        },
        //
        { title: 'R-SuperClue', url: 'https://www.superclueai.com' },
        { title: 'R-LMsys', url: 'https://chat.lmsys.org/?leaderboard' },
        { title: 'R-Aider', url: 'https://aider.chat/docs/leaderboards' },
        {
          title: 'R-OpenRouter',
          url: 'https://openrouter.ai/rankings/programming?view=month',
        },
        { title: 'R-SuperClue', url: 'https://www.superclueai.com' },
        { title: 'R-LMsys', url: 'https://chat.lmsys.org/?leaderboard' },
        { title: 'R-Aider', url: 'https://aider.chat/docs/leaderboards' },
        {
          title: 'R-OpenRouter',
          url: 'https://openrouter.ai/rankings/programming?view=month',
        },
        { title: 'R-SuperClue', url: 'https://www.superclueai.com' },
        { title: 'R-LMsys', url: 'https://chat.lmsys.org/?leaderboard' },
        { title: 'R-Aider', url: 'https://aider.chat/docs/leaderboards' },
        {
          title: 'R-OpenRouter',
          url: 'https://openrouter.ai/rankings/programming?view=month',
        },
      ],
    },
    aiTools: {
      title: 'AI Tools',
      links: [
        {
          title: 'CoZeEn',
          url: 'https://www.coze.com/space/7322025004764364806/bot',
        },
        { title: 'CiCi', url: 'https://www.ciciai.com/' },
        { title: 'OpenAI', url: 'https://chat.openai.com/' },
        { title: 'Claude', url: 'https://claude.ai/new' },
        { title: 'Groq', url: 'https://groq.com/' },
        { title: 'Mistral', url: 'https://chat.mistral.ai/chat' },
        { title: 'Gemini', url: 'https://gemini.google.com/app' },
        {
          title: 'AiStudio',
          url: 'https://aistudio.google.com/app/prompts/new_chat',
        },
        { title: 'OLlaMa', url: 'https://ollama.ai/' },
        { title: 'OpenRChat', url: 'https://openrouter.ai/chat' },
        { title: 'HuggingFace', url: 'https://huggingface.co/' },
        { title: 'HuggingChat', url: 'https://huggingface.co/chat/' },
        { title: 'XAiGrok', url: 'https://console.x.ai/' },
        { title: 'Perplexity', url: 'https://www.perplexity.ai/' },
        {
          title: 'Fireworks',
          url: 'https://fireworks.ai/models/fireworks/f1-preview/playground',
        },
      ],
    },
    aiCn: {
      title: 'AI CN',
      links: [
        {
          title: 'CoZeCn',
          url: 'https://www.coze.cn/space/7346541960162869283/bot',
        },
        { title: 'DouBao', url: 'https://www.doubao.com/chat/' },
        { title: 'MoonShot', url: 'https://kimi.moonshot.cn/' },
        { title: 'TongYi', url: 'https://tongyi.aliyun.com/' },
        { title: 'ChatGlm', url: 'https://chatglm.cn/detail' },
        { title: 'DeepSeek', url: 'https://chat.deepseek.com' },
      ],
    },
  }

  const [selectedGroups, setSelectedGroups] = useState<string[]>([
    Object.keys(bookmarkData)[0],
  ])
  const [isClient, setIsClient] = useState(false)

  // 在客户端加载时从 localStorage 读取保存的选择
  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('bookmarkSelectedGroups')
    if (saved) {
      setSelectedGroups(JSON.parse(saved))
    }
  }, [])

  // 保存选择到本地存储
  const saveSelection = () => {
    localStorage.setItem(
      'bookmarkSelectedGroups',
      JSON.stringify(selectedGroups)
    )
  }

  // 合并所有选中分组的链接
  const allSelectedBookmarks = selectedGroups.flatMap((groupKey) =>
    bookmarkData[groupKey].links.map((link) => ({
      ...link,
      group: bookmarkData[groupKey].title,
    }))
  )

  return (
    <div className="h-full flex flex-col">
      {/* 顶部区域 */}
      <div className="flex-none px-4 py-4">
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">查看选中分组内容</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>已选择的书签列表</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {selectedGroups.map((groupKey) => (
                  <div key={groupKey} className="space-y-2">
                    <h3 className="font-semibold">
                      {bookmarkData[groupKey].title}
                    </h3>
                    {bookmarkData[groupKey].links.map((link, index) => (
                      <div key={index} className="flex items-center gap-4 ml-4">
                        <div className="font-medium">{link.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {link.url}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-4 flex-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">选择分组</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="grid gap-2 p-2">
                  {Object.entries(bookmarkData).map(([key, group]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={selectedGroups.includes(key)}
                        onCheckedChange={(checked) => {
                          setSelectedGroups((prev) =>
                            checked
                              ? [...prev, key]
                              : prev.filter((g) => g !== key)
                          )
                        }}
                      />
                      <label
                        htmlFor={key}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {group.title}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={saveSelection}
                  >
                    保存选择
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {isClient && (
              <p className="text-sm text-muted-foreground">
                已选择:{' '}
                {selectedGroups
                  .map((key) => bookmarkData[key].title)
                  .join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 px-4 pb-6 min-h-0">
        {isClient ? (
          <BookmarkContent
            bookmarks={allSelectedBookmarks}
            groupTitle=""
            cardsPerRow={6}
            showGroup={true}
          />
        ) : null}
      </div>
    </div>
  )
}
