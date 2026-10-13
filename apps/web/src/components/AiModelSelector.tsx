'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronDown, KeyRound } from 'lucide-react'
import type { AiProviderMeta } from '../lib/types'

/**
 * Dropdown chọn provider + model — cùng cấu trúc với AI Chat Pro.
 * Dùng chung cho: toolbar quét ngách Knowledge Graph, panel chi tiết node,
 * và trang AI Copilot (đồng bộ cùng state ở mỗi nơi dùng).
 */
export function AiModelSelector({
  providerId,
  onProviderChange,
  model,
  onModelChange,
  activeMeta,
  currentMeta,
  fullWidth = false,
}: {
  providerId: string
  onProviderChange: (v: string) => void
  model: string
  onModelChange: (v: string) => void
  activeMeta: AiProviderMeta[]
  currentMeta: AiProviderMeta | undefined
  fullWidth?: boolean
}) {
  const wrap = fullWidth ? 'w-full' : ''
  const selectW = fullWidth ? 'w-full' : ''

  if (activeMeta.length === 0) {
    return (
      <Link
        href="/settings/ai"
        className="px-3.5 py-2.5 rounded-lg bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 text-xs font-bold hover:bg-brand-emerald/25 flex items-center gap-1.5 transition-all shadow-sm"
      >
        <KeyRound className="w-3.5 h-3.5" />
        <span>Kết nối Key AI Pro</span>
      </Link>
    )
  }

  return (
    <>
      <div className={`relative ${wrap}`}>
        <select
          value={providerId}
          onChange={(e) => onProviderChange(e.target.value)}
          className={`appearance-none pl-3 pr-8 py-2.5 rounded-lg bg-dark-950/70 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-brand-emerald/60 ${selectW}`}
          title="AI provider dùng cho tác vụ AI"
        >
          {activeMeta.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
      </div>
      {currentMeta && (
        <div className={`relative ${wrap}`}>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className={`appearance-none pl-3 pr-8 py-2.5 rounded-lg bg-dark-950/70 border border-white/10 text-slate-300 text-xs font-mono focus:outline-none focus:border-brand-emerald/60 ${selectW}`}
            title="Model dùng cho tác vụ AI"
          >
            {currentMeta.models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
      )}
    </>
  )
}
