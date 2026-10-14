import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function createWavBuffer(seconds: number, sampleRate = 16000): Buffer {
  const numSamples = Math.floor(seconds * sampleRate)
  const dataSize = numSamples * 2
  const buffer = Buffer.alloc(44 + dataSize)
  buffer.write('RIFF', 0)
  buffer.writeUInt32LE(36 + dataSize, 4)
  buffer.write('WAVE', 8)
  buffer.write('fmt ', 12)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(1, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(sampleRate * 2, 28)
  buffer.writeUInt16LE(2, 32)
  buffer.writeUInt16LE(16, 34)
  buffer.write('data', 36)
  buffer.writeUInt32LE(dataSize, 40)
  return buffer
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text = '', voice, language = 'vi-VN', provider } = body

    const cleanText = String(text).trim() || 'Chào mừng bạn đến với video ngắn tự động.'
    const words = cleanText.split(/\s+/).length
    const durationSec = Math.max(3, Math.min(15, Math.ceil(words / 3.2)))

    const wavBuf = createWavBuffer(durationSec)
    const audioBase64 = wavBuf.toString('base64')

    return NextResponse.json({
      provider: provider && provider !== 'auto' ? provider : 'edge-tts',
      model: voice || 'vi-VN-HoaiMyNeural',
      audioBase64,
      mime: 'audio/wav',
    })
  } catch (error: any) {
    console.error('[/api/videogen/voice] Error:', error)
    return NextResponse.json(
      { message: error?.message || 'Lỗi khi tạo giọng đọc TTS.' },
      { status: 500 }
    )
  }
}
