"use client"

import { CheckCircle, XCircle, Info, X } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = toast.type === 'success' ? CheckCircle : toast.type === 'error' ? XCircle : Info
        const bgColor = toast.type === 'success' 
          ? 'bg-secondary text-secondary-foreground' 
          : toast.type === 'error' 
          ? 'bg-destructive text-destructive-foreground' 
          : 'bg-primary text-primary-foreground'
        
        return (
          <div
            key={toast.id}
            className={`${bgColor} rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 animate-slide-up`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button 
              onClick={() => onRemove(toast.id)}
              className="p-1 hover:opacity-70 transition-opacity"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
