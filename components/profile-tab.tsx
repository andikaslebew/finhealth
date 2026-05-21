"use client"

import { useState } from 'react'
import { User, LogOut, Trash2, Info, Shield, Heart, ChevronRight, AlertTriangle } from 'lucide-react'

interface UserProfile {
  name: string
  email: string
}

interface ProfileTabProps {
  user: UserProfile
  onLogout: () => void
  onResetAllData: () => void
}

export function ProfileTab({ user, onLogout, onResetAllData }: ProfileTabProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleResetData = async () => {
    setIsResetting(true)
    // Berikan sedikit delay untuk UX yang lebih baik
    await new Promise(resolve => setTimeout(resolve, 500))
    onResetAllData()
  }

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <User className="w-9 h-9" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold truncate">{user.name}</h2>
            <p className="text-sm opacity-90 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {/* Info Aplikasi */}
          <button className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Tentang Aplikasi</p>
              <p className="text-sm text-muted-foreground">FinHealth v2.0</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Privasi */}
          <button className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Privasi & Keamanan</p>
              <p className="text-sm text-muted-foreground">Data tersimpan lokal</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-destructive flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Zona Berbahaya
          </h3>
        </div>
        <div className="divide-y divide-border">
          {/* Logout */}
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Keluar</p>
              <p className="text-sm text-muted-foreground">Keluar dari akun Anda</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Reset All Data */}
          <button 
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center gap-4 p-4 hover:bg-destructive/5 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-destructive">Hapus Semua Data</p>
              <p className="text-sm text-muted-foreground">Reset aplikasi ke awal</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="text-center py-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">FinHealth</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Versi 2.0 - Keuangan & Kesehatan
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Dibuat dengan cinta untuk Indonesia
        </p>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50">
          <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <LogOut className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Konfirmasi Keluar</h3>
                <p className="text-sm text-muted-foreground">Yakin ingin keluar?</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              Anda akan diarahkan ke halaman login. Data Anda tetap tersimpan dan dapat diakses kembali setelah login.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 px-4 bg-muted text-foreground rounded-xl font-medium hover:bg-border transition-colors"
              >
                Batal
              </button>
              <button
                onClick={onLogout}
                className="flex-1 py-3 px-4 bg-amber-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Data Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50">
          <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-destructive">Hapus Semua Data</h3>
                <p className="text-sm text-muted-foreground">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>
            
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-foreground">
                <strong>Peringatan!</strong> Semua data berikut akan dihapus permanen:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                <li>Riwayat transaksi keuangan</li>
                <li>Catatan makanan & kalori</li>
                <li>Jadwal olahraga</li>
                <li>Data akun Anda</li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                disabled={isResetting}
                className="flex-1 py-3 px-4 bg-muted text-foreground rounded-xl font-medium hover:bg-border transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleResetData}
                disabled={isResetting}
                className="flex-1 py-3 px-4 bg-destructive text-destructive-foreground rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isResetting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-destructive-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <span>Hapus Semua</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
