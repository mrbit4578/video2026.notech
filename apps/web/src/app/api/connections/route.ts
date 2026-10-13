import { NextResponse } from 'next/server'
import { ApiConnection } from '../../../lib/types'

export const dynamic = 'force-dynamic'

const defaultConnections: ApiConnection[] = [
  {
    id: 'conn_tiktok',
    provider: 'tiktok',
    providerUserId: 'tiktok_partner_vietnam',
    status: 'active',
    scopesJson: ['user.info.basic', 'video.upload', 'video.publish'],
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'conn_instagram',
    provider: 'instagram',
    providerUserId: 'meta_reels_pro',
    status: 'active',
    scopesJson: ['instagram_basic', 'instagram_content_publish'],
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'conn_google',
    provider: 'google',
    providerUserId: 'youtube_shorts_partner',
    status: 'active',
    scopesJson: ['https://www.googleapis.com/auth/youtube.upload'],
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(defaultConnections)
}
