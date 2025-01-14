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

export class BrowserInfoServiceV1 {
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
