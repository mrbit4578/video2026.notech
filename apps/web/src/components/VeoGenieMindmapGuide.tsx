'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Workflow,
  Sparkles,
  Video,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  ArrowRight,
  Play,
  Cpu,
  Layers,
  Settings,
  ShieldCheck,
  Download,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Sliders,
  HelpCircle,
  Eye,
  RefreshCw,
} from 'lucide-react'

export function VeoGenieMindmapGuide() {
  const [activeTab, setActiveTab] = useState<'mindmap' | 'steps'>('mindmap')
  const [copiedKey, setCopiedKey] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null)

  const copyLicenseKey = () => {
    navigator.clipboard.writeText('WFOL1.VIP2026.PERMANENT.AGENT.UNLIMITED')
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2500)
  }

  const stepsData = [
    {
      id: 1,
      step: '01',
      title: 'Khởi Động & Kích Hoạt Bản Quyền VIP',
      sub: 'Mở Studio & Hệ Thống Tự Kích Hoạt Bản Quyền',
      color: 'from-amber-500 to-yellow-400',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-400',
      icon: ShieldCheck,
      details: [
        'Mở trang Studio tại link https://video2026-notech.vercel.app/workflow.',
        'Hệ thống tự động nạp bản quyền VIP Agent Unlimited vĩnh viễn đến năm 2099.',
        'Nếu chạy offline desktop: Click đúp "start-desktop-backend.cmd" để mở cổng 8788.',
      ],
      tip: 'Mã Master Key: WFOL1.VIP2026.PERMANENT.AGENT.UNLIMITED (Đã mở khóa toàn quyền).',
    },
    {
      id: 2,
      step: '02',
      title: 'Chuẩn Bị Nguyên Liệu Đầu Vào',
      sub: 'Soạn Prompt Ý Tưởng & Ảnh Phong Cách Tham Chiếu',
      color: 'from-brand-cyan to-blue-400',
      borderColor: 'border-brand-cyan/40',
      bgColor: 'bg-brand-cyan/10',
      textColor: 'text-brand-cyan',
      icon: FileText,
      details: [
        'Node Prompt Văn Bản: Nhập mô tả kịch bản, nhân vật, bối cảnh, ánh sáng điện ảnh.',
        'Node Ảnh Tham Chiếu: Dán URL hoặc upload ảnh mẫu khuôn mặt/trang phục để AI giữ nguyên nhận dạng (Preserve Identity).',
        'Kéo dây nối từ cổng tròn màu cam của Prompt sang các node Tạo Ảnh và Tạo Video.',
      ],
      tip: 'Nên thêm từ khóa: "cinematic lighting, 8k photorealistic, 35mm lens, highly detailed" để video đẹp nhất.',
    },
    {
      id: 3,
      step: '03',
      title: 'Cấu Hình Thông Số Video & AI Model',
      sub: 'Chọn Tỉ Lệ Khung Hình, Model & Độ Nét Chuẩn',
      color: 'from-brand-violet to-purple-400',
      borderColor: 'border-brand-violet/40',
      bgColor: 'bg-brand-violet/10',
      textColor: 'text-brand-violet',
      icon: Sliders,
      details: [
        'Chọn Tỉ lệ: 16:9 (Ngang chuẩn YouTube/PC), 9:16 (Dọc TikTok/Shorts/Reels), hoặc 1:1 (Vuông Instagram).',
        'Độ phân giải: 1K (Test nhanh), 2K / 4K Upscale siêu nét qua Real-ESRGAN.',
        'Chọn AI Model: Google Veo 3.1, ByteDance Dola SeaDance 2.5, hoặc Flux Ultra.',
      ],
      tip: 'Thời lượng mặc định 6s/cảnh, có thể ghép nhiều cảnh liên tiếp để tạo video dài 1-3 phút.',
    },
    {
      id: 4,
      step: '04',
      title: 'Kích Hoạt Chạy Tự Động & Render',
      sub: 'AI Sinh Kịch Bản, Tạo Ảnh Keyframe & Xuất Video',
      color: 'from-brand-emerald to-teal-400',
      borderColor: 'border-brand-emerald/40',
      bgColor: 'bg-brand-emerald/10',
      textColor: 'text-brand-emerald',
      icon: Play,
      details: [
        'Bấm "Chạy" tại node Trợ Lý AI: AI tự động phân cảnh chi tiết (0-2s, 2-4s, 4-6s).',
        'Bấm "Chạy" tại node Tạo Ảnh: Sinh ảnh mẫu độ phân giải cao tức thì qua Cloud AI.',
        'Bấm "Chạy" tại node Tạo Video: Hệ thống render video chuyển động điện ảnh mượt mà.',
      ],
      tip: 'Nếu backend 8788 chưa bật, hệ thống tự động kích hoạt Cloud API Fallback đảm bảo không bao giờ lỗi.',
    },
    {
      id: 5,
      step: '05',
      title: 'Xem Trước, Ghép Nhạc & Xuất Bản Phẩm',
      sub: 'Kiểm Tra Thành Phẩm, Tải MP4 & Xuất Đa Kênh',
      color: 'from-pink-500 to-rose-400',
      borderColor: 'border-pink-500/40',
      bgColor: 'bg-pink-500/10',
      textColor: 'text-pink-400',
      icon: Download,
      details: [
        'Xem trước trực tiếp trên khung Player ở node kết quả, tua và kiểm tra khung hình.',
        'Bấm "Tải về" (Download MP4) để lưu video độ phân giải cao về máy.',
        'Đưa vào chiến dịch kiếm tiền tự động trên TikTok, YouTube Shorts và Facebook Reels.',
      ],
      tip: 'Video sản xuất ra không dính watermark, sẵn sàng gắn link tiếp thị affiliate kiếm hoa hồng.',
    },
  ]

  return (
    <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 md:p-10 border border-white/15 shadow-2xl space-y-8">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 -mt-20 w-80 h-80 bg-brand-emerald/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-emerald to-brand-cyan flex items-center justify-center text-dark-950 shadow-glow-emerald">
              <Workflow className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Sơ Đồ Tư Duy Vận Hành VeoGenie Studio
                </h2>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30 uppercase tracking-wider">
                  Từ A - Z
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Quy trình chuẩn hóa 5 bước: Khởi động &rarr; Nhập liệu &rarr; Cấu hình &rarr; Render AI &rarr; Xuất bản phẩm.
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('mindmap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'mindmap'
                  ? 'bg-gradient-to-r from-brand-emerald to-brand-cyan text-dark-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sơ Đồ Tư Duy (Mindmap)</span>
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'steps'
                  ? 'bg-gradient-to-r from-brand-emerald to-brand-cyan text-dark-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>5 Bước Chi Tiết (Step-by-Step)</span>
            </button>
          </div>

          <Link
            href="/workflow"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition-all hover:scale-105"
          >
            <span>Mở Studio Làm Việc</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick License & Status Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Bản quyền VIP Agent Unlimited:</strong> Hệ thống đã được mở khóa tự động vĩnh viễn đến năm 2099.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <code className="text-[11px] font-mono bg-dark-950/80 px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-300">
            WFOL1.VIP2026.PERMANENT.AGENT.UNLIMITED
          </code>
          <button
            onClick={copyLicenseKey}
            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition-all border border-amber-500/40"
            title="Sao chép mã"
          >
            {copiedKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedKey ? 'Đã chép' : 'Sao chép'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: VISUAL MINDMAP INTERFACE */}
      {activeTab === 'mindmap' && (
        <div className="space-y-6">
          {/* Mindmap Canvas Diagram */}
          <div className="relative rounded-2xl p-6 sm:p-8 bg-dark-950/80 border border-white/10 overflow-x-auto min-h-[440px] flex flex-col justify-center">
            {/* SVG Connecting lines in background */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none opacity-40">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="50%" y1="50%" x2="16%" y2="24%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="16%" y2="76%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="84%" y2="24%" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="84%" y2="76%" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Central Node */}
            <div className="flex justify-center my-4 relative z-10">
              <div className="relative group p-5 rounded-3xl bg-gradient-to-tr from-dark-900 via-dark-850 to-dark-900 border-2 border-brand-emerald/60 shadow-glow-emerald text-center max-w-xs transition-transform transform hover:scale-105">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-emerald to-brand-cyan mx-auto flex items-center justify-center text-dark-950 mb-2.5 shadow-lg">
                  <Workflow className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="text-xs uppercase font-extrabold tracking-wider text-brand-emerald">
                  Trung Tâm Điều Khiển
                </div>
                <h3 className="text-base font-black text-white">VeoGenie Visual Studio</h3>
                <p className="text-[11px] text-slate-300 mt-1">
                  Node-Based AI Video Compositor & Pipeline Automation
                </p>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-brand-cyan font-bold bg-white/5 py-1 px-2 rounded-full border border-white/10">
                  <Zap className="w-3 h-3 text-brand-cyan" />
                  <span>Cloud Fallback + Offline Engine</span>
                </div>
              </div>
            </div>

            {/* 5 Mindmap Branches Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10 pt-4">
              {stepsData.map((b) => {
                const Icon = b.icon
                const isSelected = selectedBranch === b.id
                return (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBranch(isSelected ? null : b.id)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                      isSelected
                        ? `bg-dark-900 border-2 ${b.borderColor} scale-102 shadow-xl`
                        : `bg-dark-900/90 border-white/10 hover:border-white/20 hover:bg-dark-850`
                    } space-y-2.5 flex flex-col justify-between`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${b.bgColor} ${b.textColor} border ${b.borderColor}`}>
                          BƯỚC {b.step}
                        </span>
                        <div className={`p-1.5 rounded-lg ${b.bgColor} ${b.textColor}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                        {b.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {b.sub}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-semibold text-brand-emerald">Chi tiết &rarr;</span>
                      <span className="text-slate-500">Bước {b.id}/5</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Interactive Branch Inspector Modal/Drawer */}
          {selectedBranch && (
            <div className="rounded-2xl p-5 bg-dark-900 border border-brand-emerald/40 space-y-3 animate-fadeIn">
              {(() => {
                const item = stepsData.find((s) => s.id === selectedBranch)!
                const Icon = item.icon
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-xl ${item.bgColor} ${item.textColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className={`text-[10px] font-black uppercase ${item.textColor}`}>
                            HƯỚNG DẪN BƯỚC {item.step}
                          </span>
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedBranch(null)}
                        className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-white/5"
                      >
                        Đóng ×
                      </button>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {item.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-amber-300 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span><strong>Mẹo Pro:</strong> {item.tip}</span>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DETAILED STEP-BY-STEP WORKFLOW */}
      {activeTab === 'steps' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stepsData.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className="rounded-2xl p-5 bg-dark-950/70 border border-white/10 hover:border-white/20 transition-all space-y-3.5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${step.bgColor} ${step.textColor} border ${step.borderColor}`}>
                          BƯỚC {step.step}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">Quy trình chuẩn</span>
                      </div>
                      <div className={`p-2 rounded-xl ${step.bgColor} ${step.textColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-white leading-snug">{step.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{step.sub}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-amber-300/90 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{step.tip}</span>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Quick Start Card */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-brand-emerald/15 via-dark-900 to-brand-cyan/15 border-2 border-brand-emerald/40 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-emerald text-dark-950 flex items-center justify-center font-black">
                  <Play className="w-5 h-5 fill-dark-950" />
                </div>
                <h4 className="text-base font-extrabold text-white">Sẵn Sàng Sản Xuất Video?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Trải nghiệm ngay không gian sáng tạo tự động hóa AI Video đa cảnh, biến ý tưởng thành video triệu view trong vài phút.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/workflow"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-cyan text-dark-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-glow-emerald transition-all"
                >
                  <Workflow className="w-4 h-4" />
                  <span>Mở VeoGenie Studio Ngay</span>
                </Link>
                <a
                  href="/workflow-canvas/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở Trực Tiếp Full Canvas</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Quick Links & Help */}
      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-brand-cyan" />
          <span>Hỗ trợ kỹ thuật & Vận hành: Tích hợp đầy đủ trên web và máy cá nhân.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/huong-dan" className="text-brand-emerald hover:underline font-semibold flex items-center gap-1">
            <span>Tài liệu chi tiết</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link href="/video-faceless" className="text-brand-cyan hover:underline font-semibold flex items-center gap-1">
            <span>Video Faceless Studio</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
