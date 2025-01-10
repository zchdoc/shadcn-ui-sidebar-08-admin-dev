'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { BrowserInfo, BrowserInfoService } from '@/lib/browser-info'

export default function BrowserInfoPageV2() {
  const [loading, setLoading] = useState(true)
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>()

  useEffect(() => {
    const getBrowserInfo = async () => {
      try {
        const info = await BrowserInfoService.getAllBrowserInfo()
        console.log('browserInfo:', info)
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
              <h2 className="font-semibold">浏览器信息</h2>
              <p>
                浏览器: {browserInfo?.browserInfo?.browser.name}{' '}
                {browserInfo?.browserInfo?.browser.version}
              </p>
              <p>
                操作系统: {browserInfo?.browserInfo?.os.name}{' '}
                {browserInfo?.browserInfo?.os.version}
              </p>
              <p>
                设备: {browserInfo?.browserInfo?.device.vendor}{' '}
                {browserInfo?.browserInfo?.device.model}
              </p>
            </div>

            <div>
              <h2 className="font-semibold">网络信息</h2>
              <p>网络类型: {browserInfo?.deviceInfo?.network}</p>
            </div>

            <div>
              <h2 className="font-semibold">设备信息</h2>
              <p>设备类型: {browserInfo?.browserInfo?.device.type}</p>
              <p>
                电池状态: {browserInfo?.deviceInfo?.battery?.level}%{' '}
                {browserInfo?.deviceInfo?.battery?.charging
                  ? '充电中'
                  : '未充电'}
              </p>
            </div>

            <div>
              <h2 className="font-semibold">语言与时区</h2>
              <p>语言: {browserInfo?.deviceInfo?.language}</p>
              <p>时区: {browserInfo?.deviceInfo?.timezone}</p>
            </div>

            <div>
              <h2 className="font-semibold">屏幕信息</h2>
              <p>
                分辨率: {browserInfo?.deviceInfo?.screen?.width}x
                {browserInfo?.deviceInfo?.screen?.height}
              </p>
            </div>

            <div>
              <h2 className="font-semibold">IP地址信息</h2>
              <p>X-Forwarded-For: {browserInfo?.ip?.forwarded || '未知'}</p>
              <p>X-Real-IP: {browserInfo?.ip?.realIp || '未知'}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
