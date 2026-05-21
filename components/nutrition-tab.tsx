"use client"

import { useState } from 'react'
import { Plus, Trash2, Flame } from 'lucide-react'

export interface FoodEntry {
  id: string
  name: string
  calories: number
  date: string
}

interface NutritionTabProps {
  foodEntries: FoodEntry[]
  onAddFood: (food: Omit<FoodEntry, 'id' | 'date'>) => void
  onDeleteFood: (id: string) => void
  dailyTarget: number
}

export function NutritionTab({ foodEntries, onAddFood, onDeleteFood, dailyTarget }: NutritionTabProps) {
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')

  // Filter today's entries
  const today = new Date().toDateString()
  const todayEntries = foodEntries.filter(entry => 
    new Date(entry.date).toDateString() === today
  )

  const totalCalories = todayEntries.reduce((acc, entry) => acc + entry.calories, 0)
  const remainingCalories = Math.max(0, dailyTarget - totalCalories)
  const progressPercent = Math.min(100, (totalCalories / dailyTarget) * 100)
  const isOverLimit = totalCalories > dailyTarget

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numCalories = parseInt(calories)
    if (isNaN(numCalories) || numCalories <= 0 || !foodName.trim()) return

    onAddFood({
      name: foodName.trim(),
      calories: numCalories
    })
    setFoodName('')
    setCalories('')
  }

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Calculate stroke dasharray for circular progress
  const circumference = 2 * Math.PI * 70 // radius = 70
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference

  return (
    <div className="space-y-4">
      {/* Calorie Progress Card */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">Kalori Hari Ini</h2>
            <p className="text-sm text-muted-foreground">Target: {dailyTarget.toLocaleString('id-ID')} kkal</p>
          </div>
          <Flame className={`w-6 h-6 ${isOverLimit ? 'text-destructive' : 'text-primary'}`} />
        </div>

        {/* Circular Progress */}
        <div className="flex justify-center my-6">
          <div className="relative w-44 h-44">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted"
              />
              {/* Progress circle */}
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
                  strokeDashoffset: strokeDashoffset
                }}
                className={`transition-all duration-500 ${isOverLimit ? 'text-destructive' : 'text-primary'}`}
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${isOverLimit ? 'text-destructive' : 'text-foreground'}`}>
                {totalCalories.toLocaleString('id-ID')}
              </span>
              <span className="text-sm text-muted-foreground">kkal</span>
            </div>
          </div>
        </div>

        {/* Remaining calories */}
        <div className={`text-center p-3 rounded-xl ${isOverLimit ? 'bg-destructive/10' : 'bg-primary/10'}`}>
          <p className={`font-semibold ${isOverLimit ? 'text-destructive' : 'text-primary'}`}>
            {isOverLimit ? (
              <>Melebihi {(totalCalories - dailyTarget).toLocaleString('id-ID')} kkal</>
            ) : (
              <>Sisa {remainingCalories.toLocaleString('id-ID')} kkal</>
            )}
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h2 className="font-semibold text-lg mb-4">Catat Makanan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="foodName" className="block text-sm font-medium mb-2 text-muted-foreground">
              Nama Makanan
            </label>
            <input
              type="text"
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Contoh: Nasi Goreng"
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="calories" className="block text-sm font-medium mb-2 text-muted-foreground">
              Jumlah Kalori (kkal)
            </label>
            <input
              type="number"
              id="calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="0"
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-ring"
              min="0"
              inputMode="numeric"
            />
          </div>

          <button
            type="submit"
            disabled={!foodName.trim() || !calories}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Simpan Makanan
          </button>
        </form>
      </div>

      {/* Today's Food List */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h2 className="font-semibold text-lg mb-4">Makanan Hari Ini</h2>
        {todayEntries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Belum ada makanan tercatat hari ini.<br />Mulai catat asupan kalori Anda!
          </p>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {[...todayEntries].reverse().map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{entry.name}</p>
                  <p className="text-xs text-muted-foreground">{formatTime(entry.date)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-primary">{entry.calories} kkal</p>
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
    </div>
  )
}
