import { NextResponse } from 'next/server'
// import os from 'os'

export async function GET() {
  try {
    // const homeDir = os.homedir()
    const homeDir =
      'E:\\code_zch\\code_frontend\\nextjs\\shadcn-ui-sidebar-08-admin-dev'
    return NextResponse.json({ homeDir })
  } catch (error) {
    console.error('Error getting home directory:', error)
    return NextResponse.json(
      { error: 'Failed to get home directory' },
      { status: 500 }
    )
  }
}
