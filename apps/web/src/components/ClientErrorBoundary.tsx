'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallbackTitle?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ClientErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ClientErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-panel rounded-2xl p-6 border border-amber-500/30 bg-amber-950/20 text-center space-y-3 my-4">
          <div className="inline-flex p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">
            {this.props.fallbackTitle || 'Không thể tải thành phần này'}
          </h4>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Đã xảy ra lỗi tạm thời khi hiển thị dữ liệu ({this.state.error?.message || 'Lỗi không xác định'}). Bạn có thể thử tải lại.
          </p>
          <div>
            <button
              onClick={this.handleRetry}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-cyan text-dark-950 font-bold text-xs inline-flex items-center gap-2 hover:opacity-90 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Thử lại
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
