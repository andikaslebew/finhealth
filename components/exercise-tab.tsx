"use client"

import { useState, useMemo } from 'react'
import { Plus, Check, Trash2, Calendar, Dumbbell, AlertTriangle, Zap, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react'
import { getExerciseRecommendations, ExerciseRecommendation } from '@/lib/food-database'

export interface Exercise {
  id: string
  name: string
  completed: boolean
  dayOfWeek: number
  duration?: number
  caloriesBurned?: number
}

interface ExerciseTabProps {
  exercises: Exercise[]
  onAddExercise: (exercise: Omit<Exercise, 'id'>) => void
  onToggleExercise: (id: string) => void
  onDeleteExercise: (id: string) => void
  dailyCaloriesSurplus: number
  dailyTarget: number
}

const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const SHORT_DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

type InputMode = 'manual' | 'auto'

export function ExerciseTab({ 
  exercises, 
  onAddExercise, 
  onToggleExercise, 
  onDeleteExercise,
  dailyCaloriesSurplus,
  dailyTarget
}: ExerciseTabProps) {
  const [exerciseName, setExerciseName] = useState('')
  const [exerciseDuration, setExerciseDuration] = useState('')
  const [selectedDay, setSelectedDay] = useState(new Date().getDay())
  const [showAddForm, setShowAddForm] = useState(false)
  const [inputMode, setInputMode] = useState<InputMode>('manual')
  const [showRecommendations, setShowRecommendations] = useState(true)

  const today = new Date().getDay()
  const isCalorieSurplus = dailyCaloriesSurplus > 0
  const surplusLevel = dailyCaloriesSurplus > 500 ? 'high' : dailyCaloriesSurplus > 200 ? 'medium' : 'low'

  // Get AI recommendations based on calorie surplus
  const recommendations = useMemo(() => {
    if (dailyCaloriesSurplus > 0) {
      return getExerciseRecommendations(dailyCaloriesSurplus)
    }
    return []
  }, [dailyCaloriesSurplus])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!exerciseName.trim()) return

    onAddExercise({
      name: exerciseName.trim(),
      completed: false,
      dayOfWeek: selectedDay,
      duration: exerciseDuration ? parseInt(exerciseDuration) : undefined
    })
    setExerciseName('')
    setExerciseDuration('')
    setShowAddForm(false)
  }

  const handleAddRecommendation = (rec: ExerciseRecommendation) => {
    onAddExercise({
      name: `${rec.name} (${rec.duration} menit)`,
      completed: false,
      dayOfWeek: today,
      duration: rec.duration,
      caloriesBurned: rec.caloriesBurned
    })
  }

  // Group exercises by day
  const exercisesByDay = DAYS.map((_, dayIndex) => 
    exercises.filter(ex => ex.dayOfWeek === dayIndex)
  )

  // Calculate weekly progress
  const totalExercises = exercises.length
  const completedExercises = exercises.filter(ex => ex.completed).length
  const weeklyProgress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0

  // Calculate calories burned today
  const todayBurned = exercises
    .filter(ex => ex.dayOfWeek === today && ex.completed && ex.caloriesBurned)
    .reduce((acc, ex) => acc + (ex.caloriesBurned || 0), 0)

  return (
    <div className="space-y-4">
      {/* Calorie Warning Banner */}
      {isCalorieSurplus && (
        <div className={`rounded-2xl p-4 ${
          surplusLevel === 'high' ? 'bg-destructive/10 border border-destructive/30' :
          surplusLevel === 'medium' ? 'bg-amber-500/10 border border-amber-500/30' :
          'bg-amber-400/10 border border-amber-400/30'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              surplusLevel === 'high' ? 'bg-destructive/20' : 'bg-amber-500/20'
            }`}>
              <AlertTriangle className={`w-5 h-5 ${
                surplusLevel === 'high' ? 'text-destructive' : 'text-amber-500'
              }`} />
            </div>
            <div>
              <p className={`font-semibold ${
                surplusLevel === 'high' ? 'text-destructive' : 'text-amber-600'
              }`}>
                Kalori Surplus: +{dailyCaloriesSurplus.toLocaleString('id-ID')} kkal
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {surplusLevel === 'high' 
                  ? 'Surplus tinggi! Sangat direkomendasikan untuk berolahraga intensif hari ini.'
                  : surplusLevel === 'medium'
                  ? 'Surplus sedang. Olahraga ringan hingga sedang dapat membantu.'
                  : 'Surplus ringan. Jalan santai atau stretching sudah cukup.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Progress Card */}
      <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">Progres Mingguan</h2>
            <p className="text-sm opacity-90">{completedExercises} dari {totalExercises} selesai</p>
          </div>
          <Calendar className="w-6 h-6" />
        </div>
        
        <div className="bg-primary-foreground/20 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-primary-foreground rounded-full transition-all duration-500"
            style={{ width: `${weeklyProgress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm opacity-90">{Math.round(weeklyProgress)}% tercapai</p>
          {todayBurned > 0 && (
            <p className="text-sm opacity-90 flex items-center gap-1">
              <Zap className="w-4 h-4" />
              {todayBurned} kkal terbakar hari ini
            </p>
          )}
        </div>
      </div>

      {/* Input Mode Selector */}
      <div className="bg-card rounded-2xl p-1.5 border border-border flex gap-1">
        <button
          onClick={() => setInputMode('manual')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-medium text-sm flex items-center justify-center gap-1.5 transition-colors ${
            inputMode === 'manual'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          Input Manual
        </button>
        <button
          onClick={() => setInputMode('auto')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-medium text-sm flex items-center justify-center gap-1.5 transition-colors ${
            inputMode === 'auto'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          Rekomendasi AI
        </button>
      </div>

      {/* AI Recommendations Panel */}
      {inputMode === 'auto' && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="w-full p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span className="font-semibold">Rekomendasi Olahraga</span>
            </div>
            {showRecommendations ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {showRecommendations && (
            <div className="border-t border-border p-4">
              {!isCalorieSurplus ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Check className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="font-semibold text-secondary">Kalori Seimbang!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Asupan kalori Anda hari ini masih dalam batas target.
                    <br />Tetap jaga pola makan sehat!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    Berdasarkan surplus {dailyCaloriesSurplus.toLocaleString('id-ID')} kkal hari ini:
                  </p>
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        rec.intensity === 'berat' ? 'border-destructive/30 bg-destructive/5' :
                        rec.intensity === 'sedang' ? 'border-amber-500/30 bg-amber-500/5' :
                        'border-secondary/30 bg-secondary/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Dumbbell className={`w-5 h-5 ${
                            rec.intensity === 'berat' ? 'text-destructive' :
                            rec.intensity === 'sedang' ? 'text-amber-500' :
                            'text-secondary'
                          }`} />
                          <span className="font-semibold">{rec.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rec.intensity === 'berat' ? 'bg-destructive/20 text-destructive' :
                          rec.intensity === 'sedang' ? 'bg-amber-500/20 text-amber-600' :
                          'bg-secondary/20 text-secondary'
                        }`}>
                          {rec.intensity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{rec.duration} menit</span>
                        <span className="text-muted-foreground">~{rec.caloriesBurned} kkal</span>
                      </div>
                      <button
                        onClick={() => handleAddRecommendation(rec)}
                        className="w-full mt-3 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                      >
                        + Tambah ke Jadwal Hari Ini
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Manual Input - Day Selector */}
      {inputMode === 'manual' && (
        <>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex justify-between gap-1">
              {SHORT_DAYS.map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(index)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDay === index
                      ? 'bg-primary text-primary-foreground'
                      : index === today
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Exercise List for Selected Day */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Jadwal {DAYS[selectedDay]}</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
                aria-label="Tambah olahraga"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <form onSubmit={handleSubmit} className="mb-4 p-4 bg-muted/50 rounded-xl space-y-3">
                <input
                  type="text"
                  value={exerciseName}
                  onChange={(e) => setExerciseName(e.target.value)}
                  placeholder="Nama olahraga (cth: Lari pagi)"
                  className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />
                <input
                  type="number"
                  value={exerciseDuration}
                  onChange={(e) => setExerciseDuration(e.target.value)}
                  placeholder="Durasi dalam menit (opsional)"
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  min="1"
                  inputMode="numeric"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={!exerciseName.trim()}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false)
                      setExerciseName('')
                      setExerciseDuration('')
                    }}
                    className="px-4 py-3 bg-muted text-muted-foreground rounded-xl font-medium hover:bg-border transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* Exercise Checklist */}
            {exercisesByDay[selectedDay].length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Belum ada jadwal olahraga untuk {DAYS[selectedDay]}.<br />
                Tekan tombol + untuk menambahkan!
              </p>
            ) : (
              <div className="space-y-3">
                {exercisesByDay[selectedDay].map((exercise) => (
                  <div
                    key={exercise.id}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                      exercise.completed ? 'bg-secondary/10' : 'bg-muted/50'
                    }`}
                  >
                    <button
                      onClick={() => onToggleExercise(exercise.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        exercise.completed
                          ? 'bg-secondary border-secondary text-secondary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                      aria-label={exercise.completed ? 'Tandai belum selesai' : 'Tandai selesai'}
                    >
                      {exercise.completed && <Check className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${exercise.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {exercise.name}
                      </p>
                      {exercise.caloriesBurned && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          ~{exercise.caloriesBurned} kkal
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onDeleteExercise(exercise.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Hapus olahraga"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Weekly Overview */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h2 className="font-semibold text-lg mb-4">Ringkasan Minggu Ini</h2>
        <div className="space-y-3">
          {DAYS.map((day, index) => {
            const dayExercises = exercisesByDay[index]
            const completed = dayExercises.filter(ex => ex.completed).length
            const total = dayExercises.length
            const isToday = index === today
            const dayCaloriesBurned = dayExercises
              .filter(ex => ex.completed && ex.caloriesBurned)
              .reduce((acc, ex) => acc + (ex.caloriesBurned || 0), 0)

            return (
              <div
                key={day}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  isToday ? 'bg-accent' : 'bg-muted/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  total > 0 && completed === total
                    ? 'bg-secondary text-secondary-foreground'
                    : isToday
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {total > 0 && completed === total ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Dumbbell className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${isToday ? 'text-accent-foreground' : ''}`}>
                    {day} {isToday && <span className="text-xs text-primary">(Hari ini)</span>}
                  </p>
                  {dayCaloriesBurned > 0 && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {dayCaloriesBurned} kkal terbakar
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    total === 0 
                      ? 'text-muted-foreground' 
                      : completed === total 
                      ? 'text-secondary' 
                      : 'text-foreground'
                  }`}>
                    {total === 0 ? 'Kosong' : `${completed}/${total}`}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
