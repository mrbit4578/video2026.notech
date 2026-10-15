import { NextRequest, NextResponse } from 'next/server'
import { parseJsonGuarded, MAX_BATCH_PAYLOAD_BYTES } from '../../../../lib/server-guard'

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

function formatSrtTime(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600)
  const mins = Math.floor((totalSeconds % 3600) / 60)
  const secs = Math.floor(totalSeconds % 60)
  const ms = Math.floor((totalSeconds % 1) * 1000)
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`
}

export async function POST(req: NextRequest) {
  try {
    const guarded = await parseJsonGuarded<any>(req, MAX_BATCH_PAYLOAD_BYTES)
    if (!guarded.ok) {
      return guarded.response
    }
    const body = guarded.data
    const { segments = [], voice, language = 'vi-VN', provider } = body

    const results = segments.map((seg: { id: string; text: string }, idx: number) => {
      const cleanText = String(seg.text || '').trim() || `Cảnh ${idx + 1}`
      const words = cleanText.split(/\s+/).length
      const durationSec = Math.max(3, Math.min(15, Math.ceil(words / 3.2)))

      const wavBuf = createWavBuffer(durationSec)
      const audioBase64 = wavBuf.toString('base64')

      const startTime = formatSrtTime(0)
      const endTime = formatSrtTime(durationSec)
      const srt = `1\n${startTime} --> ${endTime}\n${cleanText}\n`

      return {
        id: String(seg.id ?? idx),
        audioBase64,
        mime: 'audio/wav',
        durationSec,
        srt,
      }
    })

    return NextResponse.json({
      provider: provider && provider !== 'auto' ? provider : 'edge-tts-batch',
      segments: results,
    })
  } catch (error: any) {
    console.error('[/api/videogen/voice-batch] Error:', error)
    return NextResponse.json(
      { message: error?.message || 'Lỗi khi tạo giọng đọc hàng loạt.' },
      { status: 500 }
    )
  }
}
