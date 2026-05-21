"use client"

import { useState } from 'react'
import { Plus, Check, Trash2, Calendar, Dumbbell } from 'lucide-react'

export interface Exercise {
  id: string
  name: string
  completed: boolean
  dayOfWeek: number // 0 = Sunday, 1 = Monday, etc.
}

interface ExerciseTabProps {
  exercises: Exercise[]
  onAddExercise: (exercise: Omit<Exercise, 'id'>) => void
  onToggleExercise: (id: string) => void
  onDeleteExercise: (id: string) => void
}

const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const SHORT_DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export function ExerciseTab({ exercises, onAddExercise, onToggleExercise, onDeleteExercise }: ExerciseTabProps) {
  const [exerciseName, setExerciseName] = useState('')
  const [selectedDay, setSelectedDay] = useState(new Date().getDay())
  const [showAddForm, setShowAddForm] = useState(false)

  const today = new Date().getDay()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!exerciseName.trim()) return

    onAddExercise({
      name: exerciseName.trim(),
      completed: false,
      dayOfWeek: selectedDay
    })
    setExerciseName('')
    setShowAddForm(false)
  }

  // Group exercises by day
  const exercisesByDay = DAYS.map((_, dayIndex) => 
    exercises.filter(ex => ex.dayOfWeek === dayIndex)
  )

  // Calculate weekly progress
  const totalExercises = exercises.length
  const completedExercises = exercises.filter(ex => ex.completed).length
  const weeklyProgress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0

  return (
    <div className="space-y-4">
      {/* Weekly Progress Card */}
      <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">Progres Mingguan</h2>
            <p className="text-sm opacity-90">{completedExercises} dari {totalExercises} olahraga selesai</p>
          </div>
          <Calendar className="w-6 h-6" />
        </div>
        
        {/* Progress Bar */}
        <div className="bg-primary-foreground/20 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-primary-foreground rounded-full transition-all duration-500"
            style={{ width: `${weeklyProgress}%` }}
          />
        </div>
        <p className="text-right text-sm mt-2 opacity-90">{Math.round(weeklyProgress)}% tercapai</p>
      </div>

      {/* Day Selector */}
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
              placeholder="Nama olahraga (cth: Lari 30 menit)"
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
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

      {/* Weekly Overview */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h2 className="font-semibold text-lg mb-4">Ringkasan Minggu Ini</h2>
        <div className="space-y-3">
          {DAYS.map((day, index) => {
            const dayExercises = exercisesByDay[index]
            const completed = dayExercises.filter(ex => ex.completed).length
            const total = dayExercises.length
            const isToday = index === today

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
