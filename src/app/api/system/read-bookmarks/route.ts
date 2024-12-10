import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { readFile } from 'fs/promises'

const execAsync = promisify(exec)

export async function POST(request: Request) {
  try {
    console.info('Reading bookmarks file:', execAsync)
    const { path } = await request.json()

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    // 直接读取文件而不是使用命令行
    const content = await readFile(path, 'utf-8')

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error reading bookmarks file:', error)
    return NextResponse.json(
      { error: 'Failed to read bookmarks file' },
      { status: 500 }
    )
  }
}
