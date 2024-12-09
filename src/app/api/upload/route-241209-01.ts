// import { NextRequest, NextResponse } from 'next/server'
// import { writeFile } from 'fs/promises'
// import path from 'path'

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData()
//     const file = formData.get('file') as File
//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
//     }

//     // 创建保存文件的目录（如果不存在）
//     const uploadDir = path.join(process.cwd(), 'uploads')
//     try {
//       await writeFile(path.join(uploadDir, file.name), Buffer.from(await file.arrayBuffer()))
//     } catch (error) {
//       // 如果目录不存在，创建目录
//       if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
//         const { mkdir } = require('fs/promises')
//         await mkdir(uploadDir, { recursive: true })
//         await writeFile(path.join(uploadDir, file.name), Buffer.from(await file.arrayBuffer()))
//       } else {
//         throw error
//       }
//     }

//     return NextResponse.json({ success: true, filename: file.name })
//   } catch (error) {
//     console.error('Upload error:', error)
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
//   }
// }
