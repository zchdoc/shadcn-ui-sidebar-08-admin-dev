import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const headers = request.headers

  const ipInfo = {
    // 获取 X-Forwarded-For
    forwardedFor: headers.get('x-forwarded-for') || '未知',
    // 获取 X-Real-IP
    realIP: headers.get('x-real-ip') || '未知',
    // 获取远程地址
    remoteAddr: request.ip || '未知',
  }

  return NextResponse.json(ipInfo)
}
