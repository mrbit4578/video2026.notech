'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Workflow,
  Sparkles,
  Maximize2,
  RefreshCw,
  ExternalLink,
  Sliders,
  Layers,
  Zap,
  Info,
  CheckCircle2,
  Cpu,
  Video,
} from 'lucide-react'

export default function WorkflowCanvasPage() {
  const [iframeKey, setIframeKey] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const reloadCanvas = () => {
    setIframeKey((prev) => prev + 1)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4' : ''}`}>
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-emerald to-brand-cyan flex items-center justify-center text-dark-950 shadow-glow-emerald">
              <Workflow className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
              VeoGenie Visual Workflow Studio
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30">
              Node Canvas
            </span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-brand-emerald" />
              OpenMedia Engine · Unlimited
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Kéo thả node quy trình, kết nối Prompt &rarr; Reference Images &rarr; Dola SeaDance 2.5 / Google Veo &rarr; Render Video ngay trên web.</span>
            <span className="hidden lg:inline-block text-[11px] text-brand-emerald/90 bg-brand-emerald/10 px-2.5 py-0.5 rounded border border-brand-emerald/20 font-medium">
              Kiến Trúc Mở: Local-First · Account-Free · Không Giới Hạn
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={reloadCanvas}
            className="px-3 py-1.5 rounded-xl border border-white/10 text-slate-300 text-xs font-semibold hover:border-brand-emerald/50 hover:text-white transition-all flex items-center gap-1.5"
            title="Tải lại canvas"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Tải lại</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="px-3 py-1.5 rounded-xl border border-white/10 text-slate-300 text-xs font-semibold hover:border-brand-emerald/50 hover:text-white transition-all flex items-center gap-1.5"
            title="Toàn màn hình"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
          </button>
          <a
            href="/workflow-canvas/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-cyan text-dark-950 font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-all shadow-glow-emerald"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mở Tab Riêng</span>
          </a>
        </div>
      </div>

      {/* Feature highlights banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald shrink-0">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Dola SeaDance 2.5 & Google Veo</div>
            <div className="text-[11px] text-slate-400">Chuẩn tạo video 15s Multi-Scenes, góc quay camera tự động.</div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Node Pipeline Trực Quan</div>
            <div className="text-[11px] text-slate-400">Nối khối văn bản, ảnh minh họa và node tạo video kéo thả linh hoạt.</div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">In-Browser Render & MCP</div>
            <div className="text-[11px] text-slate-400">Hỗ trợ ghép video client-side và 38 công cụ AI Agent tự động hóa.</div>
          </div>
        </div>
      </div>

      {/* Interactive Canvas Frame */}
      <div className={`relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl ${isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[750px]'}`}>
        <iframe
          key={iframeKey}
          src="/workflow-canvas/index.html"
          className="w-full h-full border-0"
          title="VeoGenie Visual Workflow Studio"
          allow="clipboard-read; clipboard-write; fullscreen"
        />
      </div>
    </div>
  )
}
