'use client'

import React, { useEffect, useState, useCallback } from 'react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

const toastStyles: Record<ToastType, { border: string; bg: string; icon: string; iconColor: string }> = {
  success: {
    border: 'border-neon/40',
    bg: 'bg-pixel-card',
    icon: '[+]',
    iconColor: 'text-neon',
  },
  error: {
    border: 'border-error/40',
    bg: 'bg-pixel-card',
    icon: '[!]',
    iconColor: 'text-error',
  },
  warning: {
    border: 'border-warning/40',
    bg: 'bg-pixel-card',
    icon: '[-]',
    iconColor: 'text-warning',
  },
  info: {
    border: 'border-primary/40',
    bg: 'bg-pixel-card',
    icon: '[i]',
    iconColor: 'text-primary',
  },
}

export function ToastContainer({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isExiting, setIsExiting] = useState(false)
  const style = toastStyles[toast.type]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onRemove(toast.id), 300)
    }, 4000)
    return () => clearTimeout(timer)
  }, [toast.id, onRemove])

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 border rounded-[4px] ${style.bg} ${style.border} ${
        isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'
      }`}
    >
      <span className={`font-mono text-sm ${style.iconColor} shrink-0`}>{style.icon}</span>
      <p className="text-sm text-pixel-text font-body flex-1">{toast.message}</p>
      <button
        onClick={() => {
          setIsExiting(true)
          setTimeout(() => onRemove(toast.id), 300)
        }}
        className="text-pixel-muted hover:text-pixel-text transition-colors text-xs font-mono shrink-0"
      >
        [X]
      </button>
    </div>
  )
}

let toastIdCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = `toast-${++toastIdCounter}`
    setToasts((prev) => [...prev, { id, type, message }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}
