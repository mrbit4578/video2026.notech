import { NextResponse } from 'next/server'
import { AnalyticsOverview } from '../../../../lib/types'

export const dynamic = 'force-dynamic'

export async function GET() {
  const overview: AnalyticsOverview = {
    totalConnections: 3,
    totalPublished: 84,
    totalFailed: 0,
    lastUpdated: new Date().toISOString(),
  }
  return NextResponse.json(overview)
}
