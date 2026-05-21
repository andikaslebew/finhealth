"use client"

import { useState, useRef, useMemo } from 'react'
import { Camera, ImagePlus, Trash2, Flame, Sparkles, CalendarDays, TrendingUp, ChevronDown } from 'lucide-react'
import { getAICalorieEstimate } from '@/lib/food-database'

export interface FoodEntry {
  id: string
  name: string
  calories: number
  date: string
  imageUrl?: string
  confidence: 'high' | 'medium' | 'low'
  category: string
}

interface NutritionTabProps {
  foodEntries: FoodEntry[]
  onAddFood: (food: Omit<FoodEntry, 'id' | 'date'>) => void
  onDeleteFood: (id: string) => void
  dailyTarget: number
}

type ViewMode = 'daily' | 'weekly' | 'monthly'

export function NutritionTab({ foodEntries, onAddFood, onDeleteFood, dailyTarget }: NutritionTabProps) {
  const [foodName, setFoodName] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('daily')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filter entries based on view mode
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const getStartOfWeek = (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day
    d.setDate(diff)
    d.setHours(0, 0, 0, 0)
    return d
  }

  const getStartOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  const filteredEntries = useMemo(() => {
    return foodEntries.filter(entry => {
      const entryDate = new Date(entry.date)
      entryDate.setHours(0, 0, 0, 0)
      
      if (viewMode === 'daily') {
        return entryDate.getTime() === today.getTime()
      } else if (viewMode === 'weekly') {
        const weekStart = getStartOfWeek(today)
        return entryDate >= weekStart
      } else {
        const monthStart = getStartOfMonth(today)
        return entryDate >= monthStart
      }
    })
  }, [foodEntries, viewMode, today])

  const totalCalories = filteredEntries.reduce((acc, entry) => acc + entry.calories, 0)
  
  // Calculate target based on view mode
  const targetCalories = viewMode === 'daily' ? dailyTarget : 
                         viewMode === 'weekly' ? dailyTarget * 7 : 
                         dailyTarget * 30

  const remainingCalories = Math.max(0, targetCalories - totalCalories)
  const progressPercent = Math.min(100, (totalCalories / targetCalories) * 100)
  const isOverLimit = totalCalories > targetCalories
  const surplusCalories = totalCalories - dailyTarget

  // Calculate daily stats for chart
  const dailyStats = useMemo(() => {
    const stats: { label: string; calories: number }[] = []
    
    if (viewMode === 'weekly') {
      const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
      const weekStart = getStartOfWeek(today)
      
      for (let i = 0; i < 7; i++) {
        const dayDate = new Date(weekStart)
        dayDate.setDate(weekStart.getDate() + i)
        dayDate.setHours(0, 0, 0, 0)
        
        const dayCalories = foodEntries.filter(entry => {
          const entryDate = new Date(entry.date)
          entryDate.setHours(0, 0, 0, 0)
          return entryDate.getTime() === dayDate.getTime()
        }).reduce((acc, entry) => acc + entry.calories, 0)
        
        stats.push({ label: days[i], calories: dayCalories })
      }
    } else if (viewMode === 'monthly') {
      // Show last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const weekEnd = new Date(today)
        weekEnd.setDate(today.getDate() - (i * 7))
        const weekStart = new Date(weekEnd)
        weekStart.setDate(weekEnd.getDate() - 6)
        
        const weekCalories = foodEntries.filter(entry => {
          const entryDate = new Date(entry.date)
          return entryDate >= weekStart && entryDate <= weekEnd
        }).reduce((acc, entry) => acc + entry.calories, 0)
        
        stats.push({ label: `M${4-i}`, calories: weekCalories })
      }
    }
    
    return stats
  }, [foodEntries, viewMode, today])

  const maxStat = Math.max(...dailyStats.map(s => s.calories), 1)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!foodName.trim()) return

    setIsAnalyzing(true)
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const aiResult = getAICalorieEstimate(foodName)
    
    onAddFood({
      name: foodName.trim(),
      calories: aiResult.calories,
      imageUrl: imagePreview || undefined,
      confidence: aiResult.confidence,
      category: aiResult.category
    })
    
    setFoodName('')
    setImagePreview(null)
    setIsAnalyzing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short'
    })
  }

  // Calculate stroke dasharray for circular progress
  const circumference = 2 * Math.PI * 70

  return (
    <div className="space-y-4">
      {/* View Mode Selector */}
      <div className="bg-card rounded-2xl p-1.5 border border-border flex gap-1">
        {[
          { mode: 'daily' as ViewMode, label: 'Harian', icon: Flame },
          { mode: 'weekly' as ViewMode, label: 'Mingguan', icon: CalendarDays },
          { mode: 'monthly' as ViewMode, label: 'Bulanan', icon: TrendingUp }
        ].map(({ mode, label, icon: Icon }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex-1 py-2.5 px-3 rounded-xl font-medium text-sm flex items-center justify-center gap-1.5 transition-colors ${
              viewMode === mode
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Calorie Progress Card */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">
              Kalori {viewMode === 'daily' ? 'Hari Ini' : viewMode === 'weekly' ? 'Minggu Ini' : 'Bulan Ini'}
            </h2>
            <p className="text-sm text-muted-foreground">
              Target: {targetCalories.toLocaleString('id-ID')} kkal
            </p>
          </div>
          <Flame className={`w-6 h-6 ${isOverLimit ? 'text-destructive' : 'text-primary'}`} />
        </div>

        {/* Circular Progress */}
        <div className="flex justify-center my-6">
          <div className="relative w-44 h-44">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: circumference - (progressPercent / 100) * circumference
                }}
                className={`transition-all duration-500 ${isOverLimit ? 'text-destructive' : 'text-primary'}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${isOverLimit ? 'text-destructive' : 'text-foreground'}`}>
                {totalCalories.toLocaleString('id-ID')}
              </span>
              <span className="text-sm text-muted-foreground">kkal</span>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className={`text-center p-3 rounded-xl ${isOverLimit ? 'bg-destructive/10' : 'bg-primary/10'}`}>
          <p className={`font-semibold ${isOverLimit ? 'text-destructive' : 'text-primary'}`}>
            {isOverLimit ? (
              <>Melebihi {(totalCalories - targetCalories).toLocaleString('id-ID')} kkal</>
            ) : (
              <>Sisa {remainingCalories.toLocaleString('id-ID')} kkal</>
            )}
          </p>
        </div>
      </div>

      {/* Chart for Weekly/Monthly */}
      {viewMode !== 'daily' && dailyStats.length > 0 && (
        <div className="bg-card rounded-2xl p-5 border border-border">
          <h3 className="font-semibold mb-4">
            Grafik {viewMode === 'weekly' ? 'Mingguan' : 'Bulanan'}
          </h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {dailyStats.map((stat, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-muted rounded-t-lg relative" style={{ height: '100px' }}>
                  <div 
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-300 ${
                      stat.calories > dailyTarget ? 'bg-destructive' : 'bg-primary'
                    }`}
                    style={{ height: `${Math.min(100, (stat.calories / maxStat) * 100)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <span className="text-xs font-medium">{stat.calories > 0 ? `${Math.round(stat.calories / 100) / 10}k` : '-'}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
            <span className="text-muted-foreground">Rata-rata</span>
            <span className="font-semibold">
              {dailyStats.length > 0 
                ? Math.round(dailyStats.reduce((a, b) => a + b.calories, 0) / dailyStats.filter(s => s.calories > 0).length || 0).toLocaleString('id-ID')
                : 0} kkal/hari
            </span>
          </div>
        </div>
      )}

      {/* AI Food Input Form */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Catat Makanan dengan AI</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative rounded-xl overflow-hidden bg-muted">
              <img 
                src={imagePreview} 
                alt="Preview makanan" 
                className="w-full h-40 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Camera/Upload Button */}
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              ref={fileInputRef}
              className="hidden"
              id="food-camera"
            />
            <label
              htmlFor="food-camera"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-muted rounded-xl cursor-pointer hover:bg-muted/80 transition-colors"
            >
              <Camera className="w-5 h-5 text-primary" />
              <span className="font-medium">Kamera</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="food-gallery"
            />
            <label
              htmlFor="food-gallery"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-muted rounded-xl cursor-pointer hover:bg-muted/80 transition-colors"
            >
              <ImagePlus className="w-5 h-5 text-primary" />
              <span className="font-medium">Galeri</span>
            </label>
          </div>

          {/* Food Name Input */}
          <div>
            <label htmlFor="foodName" className="block text-sm font-medium mb-2 text-muted-foreground">
              Nama Makanan
            </label>
            <input
              type="text"
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Contoh: Nasi Goreng, Mie Ayam, dll"
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              AI akan otomatis mengestimasi kalori berdasarkan nama makanan
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!foodName.trim() || isAnalyzing}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                AI Menganalisis...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analisis & Simpan
              </>
            )}
          </button>
        </form>
      </div>

      {/* Today's Food List */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Makanan Tercatat</h2>
          <span className="text-sm text-muted-foreground">{filteredEntries.length} item</span>
        </div>
        
        {filteredEntries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Belum ada makanan tercatat.<br />Ambil foto makanan Anda!
          </p>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {[...filteredEntries].reverse().map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
              >
                {entry.imageUrl ? (
                  <img 
                    src={entry.imageUrl} 
                    alt={entry.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Flame className="w-6 h-6 text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{entry.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(entry.date)}</span>
                    <span>-</span>
                    <span>{formatTime(entry.date)}</span>
                    {entry.confidence === 'low' && (
                      <span className="text-amber-500">(estimasi)</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-primary">{entry.calories} kkal</p>
                  <p className="text-xs text-muted-foreground capitalize">{entry.category}</p>
                </div>
                <button
                  onClick={() => onDeleteFood(entry.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Hapus makanan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export today's calorie data for exercise recommendations */}
      <input type="hidden" id="daily-surplus" value={surplusCalories} />
    </div>
  )
}
