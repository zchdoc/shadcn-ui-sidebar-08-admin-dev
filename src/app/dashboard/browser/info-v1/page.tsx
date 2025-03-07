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
  ipInfo?: {
    forwardedFor: string
    realIP: string
    remoteAddr: string
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

export default function BrowserInfoPage() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBrowserInfo = async () => {
      try {
        // 获取IP信息
        const ipResponse = await fetch('/api/ip')
        const ipInfo = await ipResponse.json()

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
          ipInfo: ipInfo,
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
        {loading ? (
          <div>加载中...</div>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">浏览器信息</h2>
              <p>
                浏览器: {browserInfo.browserInfo?.browser.name}{' '}
                {browserInfo.browserInfo?.browser.version}
              </p>
              <p>
                操作系统: {browserInfo.browserInfo?.os.name}{' '}
                {browserInfo.browserInfo?.os.version}
              </p>
              <p>
                设备: {browserInfo.browserInfo?.device.vendor}{' '}
                {browserInfo.browserInfo?.device.model}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">IP信息</h2>
              <p>X-Forwarded-For: {browserInfo.ipInfo?.forwardedFor}</p>
              <p>X-Real-IP: {browserInfo.ipInfo?.realIP}</p>
              <p>Remote Address: {browserInfo.ipInfo?.remoteAddr}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">设备信息</h2>
              <p>网络类型: {browserInfo.deviceInfo?.network}</p>
              <p>
                电池状态:{' '}
                {browserInfo.deviceInfo?.battery?.charging
                  ? '充电中'
                  : '使用电池'}
                ({browserInfo.deviceInfo?.battery?.level?.toFixed(0)}%)
              </p>
              <p>语言设置: {browserInfo.deviceInfo?.language}</p>
              <p>时区: {browserInfo.deviceInfo?.timezone}</p>
              <p>
                屏幕分辨率: {browserInfo.deviceInfo?.screen?.width} x{' '}
                {browserInfo.deviceInfo?.screen?.height}
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
