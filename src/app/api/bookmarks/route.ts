import { NextResponse } from 'next/server'
import { readdir, readFile } from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), 'uploads')

    // 获取目录中的所有文件
    const files = await readdir(uploadDir)

    // 过滤出 JSON 文件并按修改时间排序
    const jsonFiles = files.filter((file) => file.endsWith('.json'))

    if (jsonFiles.length === 0) {
      return NextResponse.json(
        { error: 'No bookmarks file found' },
        { status: 404 }
      )
    }

    // 读取最新的文件
    const latestFile = jsonFiles[0]
    const content = await readFile(path.join(uploadDir, latestFile), 'utf-8')

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error reading bookmarks:', error)
    return NextResponse.json(
      { error: 'Failed to read bookmarks' },
      { status: 500 }
    )
  }
}
