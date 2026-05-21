"use client"

import { useState } from 'react'
import { Heart, Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react'

interface WelcomeScreenProps {
  onLogin: (user: { name: string; email: string }) => void
}

export function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  const [mode, setMode] = useState<'welcome' | 'login' | 'register'>('welcome')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')
    
    // Simulasi login Google
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    onLogin({
      name: 'Pengguna Google',
      email: 'user@gmail.com'
    })
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email.trim() || !password.trim()) {
      setError('Mohon isi email dan password')
      return
    }
    
    if (!email.includes('@')) {
      setError('Format email tidak valid')
      return
    }
    
    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }
    
    setIsLoading(true)
    
    // Simulasi proses login
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onLogin({
      name: name.trim() || email.split('@')[0],
      email: email.trim()
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!name.trim()) {
      setError('Mohon isi nama Anda')
      return
    }
    
    if (!email.trim() || !password.trim()) {
      setError('Mohon isi email dan password')
      return
    }
    
    if (!email.includes('@')) {
      setError('Format email tidak valid')
      return
    }
    
    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }
    
    setIsLoading(true)
    
    // Simulasi proses registrasi
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onLogin({
      name: name.trim(),
      email: email.trim()
    })
  }

  // Welcome Screen
  if (mode === 'welcome') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Logo */}
          <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-6 shadow-lg">
            <Heart className="w-12 h-12 text-primary-foreground" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground text-center mb-2">
            FinHealth
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-xs">
            Kelola keuangan dan kesehatan Anda dalam satu aplikasi
          </p>
          
          {/* Feature highlights */}
          <div className="w-full max-w-sm space-y-3 mb-10">
            {[
              { icon: '💰', text: 'Catat pemasukan & pengeluaran' },
              { icon: '🍎', text: 'Pantau asupan kalori harian' },
              { icon: '🏃', text: 'Rekomendasi olahraga pintar' },
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-sm text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Actions */}
        <div className="px-6 pb-8 space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-card border border-border rounded-2xl font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span>Masuk dengan Google</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">atau</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <button
            onClick={() => setMode('login')}
            className="w-full py-4 px-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity"
          >
            Masuk dengan Email
          </button>
          
          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{' '}
            <button 
              onClick={() => setMode('register')}
              className="text-primary font-semibold"
            >
              Daftar Sekarang
            </button>
          </p>
        </div>
      </div>
    )
  }

  // Login or Register Form
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <button
          onClick={() => {
            setMode('welcome')
            setError('')
            setEmail('')
            setPassword('')
            setName('')
          }}
          className="text-primary font-medium mb-6"
        >
          ← Kembali
        </button>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Heart className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {mode === 'login' ? 'Masuk' : 'Daftar'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? 'Selamat datang kembali!' : 'Buat akun baru'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="flex-1 px-6">
        <form onSubmit={mode === 'login' ? handleEmailLogin : handleRegister} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-input border border-border rounded-xl pl-12 pr-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full bg-input border border-border rounded-xl pl-12 pr-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full bg-input border border-border rounded-xl pl-12 pr-12 py-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>{mode === 'login' ? 'Masuk' : 'Daftar Sekarang'}</span>
              </>
            )}
          </button>
        </form>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === 'login' ? (
            <>
              Belum punya akun?{' '}
              <button 
                onClick={() => {
                  setMode('register')
                  setError('')
                }}
                className="text-primary font-semibold"
              >
                Daftar Sekarang
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{' '}
              <button 
                onClick={() => {
                  setMode('login')
                  setError('')
                }}
                className="text-primary font-semibold"
              >
                Masuk
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
