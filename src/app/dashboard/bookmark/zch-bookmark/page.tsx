'use client'

import { useState } from 'react'
import { BookmarkSidebar } from '@/components/bookmark/bookmark-sidebar'
import { BookmarkContent } from '@/components/bookmark/bookmark-content'

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
        { title: 'J1c', url: '1.singbon.com:81' },
        { title: 'A2c', url: 'a2.4000063966.com:81' },
        { title: 'A3c', url: 'a3c.4000063966.com:8081' },
        { title: 'A4c', url: 'a4c.4000063966.com:8081' },
        { title: 'Cdzc', url: 'cdz.4000063966.com:8081' },
        { title: 'Gxcdzc', url: 'chongdian.4000063966.com:81' },
      ],
    },
    xbLogin: {
      title: 'XB Login',
      links: [
        { title: 'J1cb', url: '1.singbon.com:81/xb/login.do' },
        { title: 'A2cb', url: 'a2.4000063966.com:81/xb/login.do' },
        { title: 'A3cb', url: 'a3c.4000063966.com:8081/xb/login.do' },
        { title: 'A4cb', url: 'a4c.4000063966.com:8081/xb/login.do' },
        { title: 'Cdzcb', url: 'cdz.4000063966.com:8084/login' },
        {
          title: 'Gxcdzcb',
          url: 'chongdian.4000063966.com:81/singbon/backgroud/system/admin/login.do',
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

  const [selectedGroup, setSelectedGroup] = useState<string>(
    Object.keys(bookmarkData)[0]
  )

  return (
    <div className="flex h-full gap-6 p-6">
      <BookmarkSidebar
        bookmarkData={bookmarkData}
        selectedGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
      />
      <BookmarkContent
        bookmarks={bookmarkData[selectedGroup].links}
        groupTitle={bookmarkData[selectedGroup].title}
      />
    </div>
  )
}
