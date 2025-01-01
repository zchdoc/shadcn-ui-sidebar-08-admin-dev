'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import * as UAParser from 'ua-parser-js'

interface BrowserInfo {
  location?: {
    city?: string
    country?: string
    region?: string
    timezone?: string
    lat?: number
    lon?: number
  }
  browserInfo?: {
    browser: {
      name?: string
      version?: string
    }
    os: {
      name?: string
      version?: string
    }
    device: {
      vendor?: string
      model?: string
      type?: string
    }
  }
  deviceInfo?: {
    battery?: {
      charging?: boolean
      level?: number
    }
    network?: string
    language?: string
    timezone?: string
    screen?: {
      width?: number
      height?: number
    }
  }
}

export default function BrowserInfoPageV2() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBrowserInfo = async () => {
      try {
        // 解析UA信息
        const parser = new UAParser.UAParser()
        const uaResult = parser.getResult()

        // 获取电池信息
        const batteryInfo = {
          charging: false,
          level: 0,
        }
        if ('getBattery' in navigator) {
          const battery = await (
            navigator as Navigator & {
              getBattery(): Promise<{ charging: boolean; level: number }>
            }
          ).getBattery()
          batteryInfo.charging = battery.charging
          batteryInfo.level = battery.level * 100
        }

        // 获取网络信息
        let networkType = 'unknown'
        if ('connection' in navigator) {
          const connection = (
            navigator as Navigator & { connection: { effectiveType: string } }
          ).connection
          networkType = connection.effectiveType
        }

        const info: BrowserInfo = {
          location: {},
          browserInfo: {
            browser: uaResult.browser,
            os: uaResult.os,
            device: uaResult.device,
          },
          deviceInfo: {
            battery: batteryInfo,
            network: networkType,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screen: {
              width: window.screen.width,
              height: window.screen.height,
            },
          },
        }

        setBrowserInfo(info)
      } catch (error) {
        console.error('Error fetching browser info:', error)
      } finally {
        setLoading(false)
      }
    }

    getBrowserInfo()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">浏览器信息</h1>
      <Card className="p-4">
        {loading ? <div>加载中...</div> : <div></div>}
      </Card>
    </div>
  )
}
