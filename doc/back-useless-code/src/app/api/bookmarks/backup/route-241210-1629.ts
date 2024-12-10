import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { promises as fsPromises } from 'fs'

export async function POST(req: NextRequest) {
  try {
    const { timestamp } = await req.json()

    // Create backup directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads')
    const backupDir = path.join(uploadsDir, 'backup')

    if (!fs.existsSync(backupDir)) {
      await fsPromises.mkdir(backupDir, { recursive: true })
    }

    // Find the most recent bookmark file in uploads directory
    const files = await fsPromises.readdir(uploadsDir)
    const bookmarkFiles = files.filter(
      (file) => file.startsWith('Bookmarks-') && file.endsWith('.json')
    )

    if (bookmarkFiles.length === 0) {
      return NextResponse.json(
        { message: 'No existing bookmarks to backup' },
        { status: 404 }
      )
    }

    // Sort files by modification time to get the most recent one
    const mostRecentFile = bookmarkFiles.sort(async (a, b) => {
      const statA = await fsPromises.stat(path.join(uploadsDir, a))
      const statB = await fsPromises.stat(path.join(uploadsDir, b))
      return statB.mtime.getTime() - statA.mtime.getTime()
    })[0]

    // Create backup file name with timestamp
    const backupFileName = `Bookmarks-backup-${timestamp}.json`
    const sourcePath = path.join(uploadsDir, mostRecentFile)
    const destPath = path.join(backupDir, backupFileName)

    // Copy the file to backup directory
    await fsPromises.copyFile(sourcePath, destPath)

    return NextResponse.json({
      message: 'Backup created successfully',
      backupFile: backupFileName,
    })
  } catch (error) {
    console.error('Error during backup:', error)
    return NextResponse.json(
      { error: 'Failed to create backup' },
      { status: 500 }
    )
  }
}
