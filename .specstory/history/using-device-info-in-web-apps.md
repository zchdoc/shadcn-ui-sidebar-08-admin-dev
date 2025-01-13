## SpecStory

## Using Device Info in Web Apps (2025/1/10 20:08:55)

_**User**_

@https://github.com/react-native-device-info/react-native-device-info 我当前的项目能使用这个开源项目吗，使用它来获取访问我的网站的设备信息

---

_**Assistant**_

让我分析一下您的情况：

1. 根据您的工作空间路径和最近查看的文件，我可以看出您正在使用 Next.js 开发一个 Web 应用程序，而不是 React Native 应用。

2. `react-native-device-info` 是专门为 React Native 移动应用开发设计的库，它主要用于获取移动设备（iOS/Android）的信息。这个库不适用于网页应用程序。

对于网页应用，我建议您使用以下替代方案来获取访问者的设备信息：

1. 使用浏览器内置的 `navigator` API：

```javascript
// 获取基本设备信息
const userAgent = navigator.userAgent
const platform = navigator.platform
const language = navigator.language
const vendor = navigator.vendor
```

2. 使用第三方库，比如 `ua-parser-js`：

```bash
npm install ua-parser-js
```

使用示例：

```javascript
import UAParser from 'ua-parser-js'

const parser = new UAParser()
const result = parser.getResult()

// 获取设备信息
console.log(result.browser) // 浏览器信息
console.log(result.device) // 设备信息
console.log(result.os) // 操作系统信息
console.log(result.cpu) // CPU 架构
```

3. 如果您需要更多的客户端信息，还可以使用 `client-hints` API：

```javascript
// 在页面头部添加
<meta http-equiv="Accept-CH" content="UA, Platform, Mobile">

// 在代码中使用
const userAgentData = navigator.userAgentData;
if (userAgentData) {
  const deviceInfo = await userAgentData.getHighEntropyValues([
    "platform",
    "platformVersion",
    "architecture",
    "model",
    "mobile"
  ]);
  console.log(deviceInfo);
}
```

总结：由于您的项目是基于 Next.js 的 Web 应用，建议使用上述 Web 平台特定的解决方案，而不是 React Native 的设备信息库。这些方案可以帮助您获取访问网站的用户设备信息，包括浏览器类型、操作系统、设备类型等信息。

---

_**User**_

src/app/dashboard/browser/info/page.tsx 组件中有一些获取设备信息的方法，帮我吧这些方法提取到一个工具类里面，方便其他组件使用，也方便后期维护，比如后期添加和删除一些获取信息的时候

---

_**Assistant**_

好的，我来帮您创建一个专门用于获取浏览器和设备信息的工具类。

首先让我查看一下当前的代码：

---

_**Assistant**_

---

_**Assistant**_

我将创建一个新的工具类文件来封装这些设备信息获取方法。让我们创建这个文件：

---

_**Assistant**_

```
import * as UAParser from 'ua-parser-js'

export interface BrowserInfo {
  ip?: {
    forwarded?: string | null
    realIp?: string | null
  }
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

export class BrowserInfoService {
  // 获取UA信息
  static getUAInfo() {
    const parser = new UAParser.UAParser()
    return parser.getResult()
  }

  // 获取电池信息
  static async getBatteryInfo() {
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

    return batteryInfo
  }

  // 获取网络信息
  static getNetworkInfo() {
    let networkType = 'unknown'
    if ('connection' in navigator) {
      const connection = (
        navigator as Navigator & { connection: { effectiveType: string } }
      ).connection
      networkType = connection.effectiveType
    }
    return networkType
  }

  // 获取屏幕信息
  static getScreenInfo() {
    return {
      width: window.screen.width,
      height: window.screen.height,
    }
  }

  // 获取语言和时区信息
  static getLocaleInfo() {
    return {
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  }

  // 获取IP地址信息
  static async getIpInfo() {
    try {
      const response = await fetch('/api/ip')
      return await response.json()
    } catch (error) {
      console.error('Error fetching IP info:', error)
      return { ip: { forwarded: null, realIp: null } }
    }
  }

  // 获取所有浏览器信息
  static async getAllBrowserInfo(): Promise<BrowserInfo> {
    try {
      const uaResult = this.getUAInfo()
      const batteryInfo = await this.getBatteryInfo()
      const networkType = this.getNetworkInfo()
      const ipData = await this.getIpInfo()
      const screenInfo = this.getScreenInfo()
      const localeInfo = this.getLocaleInfo()

      return {
        ip: ipData.ip,
        location: {},
        browserInfo: {
          browser: uaResult.browser,
          os: uaResult.os,
          device: uaResult.device,
        },
        deviceInfo: {
          battery: batteryInfo,
          network: networkType,
          language: localeInfo.language,
          timezone: localeInfo.timezone,
          screen: screenInfo,
        },
      }
    } catch (error) {
      console.error('Error getting browser info:', error)
      throw error
    }
  }
}
```

---

_**Assistant**_

现在让我们修改原来的组件文件，使用新的工具类：

---

_**Assistant**_

```
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
```

---

_**Assistant**_

我已经完成了代码重构，主要做了以下改进：

1. 创建了新的工具类文件 `src/lib/browser-info.ts`，包含：

   - `BrowserInfo` 接口定义
   - `BrowserInfoService` 类，包含多个静态方法：
     - `getUAInfo()`: 获取 UA 信息
     - `getBatteryInfo()`: 获取电池信息
     - `getNetworkInfo()`: 获取网络信息
     - `getScreenInfo()`: 获取屏幕信息
     - `getLocaleInfo()`: 获取语言和时区信息
     - `getIpInfo()`: 获取 IP 地址信息
     - `getAllBrowserInfo()`: 获取所有浏览器信息的综合方法

2. 修改了原组件文件 `src/app/dashboard/browser/info/page.tsx`：
   - 移除了重复的接口定义和信息获取逻辑
   - 引入新的 `BrowserInfoService`
   - 简化了代码结构，使用 `BrowserInfoService.getAllBrowserInfo()` 获取所有信息

现在，如果其他组件需要获取设备信息，可以直接使用 `BrowserInfoService` 中的方法，例如：

```typescript
// 获取所有信息
const allInfo = await BrowserInfoService.getAllBrowserInfo()

// 或者只获取特定信息
const batteryInfo = await BrowserInfoService.getBatteryInfo()
const networkInfo = BrowserInfoService.getNetworkInfo()
const screenInfo = BrowserInfoService.getScreenInfo()
```

这样的重构带来以下好处：

1. 代码更加模块化，便于维护
2. 减少代码重复
3. 方便其他组件复用这些功能
4. 如果需要添加新的设备信息获取方法，只需要在 `BrowserInfoService` 中添加新的方法即可

---

---
