import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const videoPath = path.join(process.cwd(), 'public', 'samples', 'ai-video-portrait.mp4')

  try {
    if (fs.existsSync(videoPath)) {
      const buffer = fs.readFileSync(videoPath)
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Length': String(buffer.length),
          'Content-Disposition': `attachment; filename="clip-${id}.mp4"`,
        },
      })
    }
  } catch (err) {
    console.warn('Error reading clip video file:', err)
  }

  // Redirect to public sample as fallback
  return NextResponse.redirect(new URL('/samples/ai-video-portrait.mp4', req.url))
}
