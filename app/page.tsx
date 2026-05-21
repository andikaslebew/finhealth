"use client"

import { useState, useCallback, useMemo, useEffect } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { ToastContainer } from '@/components/toast-container'
import { FinanceTab, Transaction } from '@/components/finance-tab'
import { NutritionTab, FoodEntry } from '@/components/nutrition-tab'
import { ExerciseTab, Exercise } from '@/components/exercise-tab'
import { ProfileTab } from '@/components/profile-tab'
import { WelcomeScreen } from '@/components/welcome-screen'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useToast } from '@/hooks/use-custom-toast'
import { Heart, Leaf } from 'lucide-react'

type TabType = 'keuangan' | 'nutrisi' | 'olahraga' | 'profil'

interface UserProfile {
  name: string
  email: string
  isLoggedIn: boolean
}

const DAILY_CALORIE_TARGET = 2000

export default function FinHealthApp() {
  const [activeTab, setActiveTab] = useState<TabType>('keuangan')
  const { toasts, showToast, removeToast } = useToast()
  const [isHydrated, setIsHydrated] = useState(false)

  // User authentication state
  const [user, setUser, userLoaded] = useLocalStorage<UserProfile>('finhealth-user', {
    name: '',
    email: '',
    isLoggedIn: false
  })

  // LocalStorage state for app data
  const [transactions, setTransactions, transactionsLoaded] = useLocalStorage<Transaction[]>('finhealth-transactions', [])
  const [foodEntries, setFoodEntries, foodLoaded] = useLocalStorage<FoodEntry[]>('finhealth-food-v2', [])
  const [exercises, setExercises, exercisesLoaded] = useLocalStorage<Exercise[]>('finhealth-exercises-v2', [])

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Calculate today's calorie surplus for exercise recommendations
  const dailyCaloriesSurplus = useMemo(() => {
    const today = new Date().toDateString()
    const todayEntries = foodEntries.filter(entry => 
      new Date(entry.date).toDateString() === today
    )
    const totalCalories = todayEntries.reduce((acc, entry) => acc + entry.calories, 0)
    return totalCalories - DAILY_CALORIE_TARGET
  }, [foodEntries])

  // Login handler
  const handleLogin = useCallback((userData: { name: string; email: string }) => {
    setUser({
      ...userData,
      isLoggedIn: true
    })
    showToast(`Selamat datang, ${userData.name}!`, 'success')
  }, [setUser, showToast])

  // Logout handler
  const handleLogout = useCallback(() => {
    setUser({
      name: '',
      email: '',
      isLoggedIn: false
    })
    setActiveTab('keuangan')
    showToast('Berhasil keluar dari akun', 'info')
  }, [setUser, showToast])

  // Reset all data handler
  const handleResetAllData = useCallback(() => {
    // Clear all localStorage data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('finhealth-user')
      localStorage.removeItem('finhealth-transactions')
      localStorage.removeItem('finhealth-food-v2')
      localStorage.removeItem('finhealth-exercises-v2')
    }
    
    // Reset all states
    setUser({ name: '', email: '', isLoggedIn: false })
    setTransactions([])
    setFoodEntries([])
    setExercises([])
    setActiveTab('keuangan')
    
    showToast('Semua data berhasil dihapus', 'success')
  }, [setUser, setTransactions, setFoodEntries, setExercises, showToast])

  // Finance handlers
  const handleAddTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString()
    }
    setTransactions(prev => [...prev, newTransaction])
    showToast(
      transaction.type === 'income' 
        ? 'Uang masuk berhasil dicatat!' 
        : 'Pengeluaran berhasil dicatat!',
      'success'
    )
  }, [setTransactions, showToast])

  const handleDeleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
    showToast('Transaksi berhasil dihapus', 'info')
  }, [setTransactions, showToast])

  // Nutrition handlers
  const handleAddFood = useCallback((food: Omit<FoodEntry, 'id' | 'date'>) => {
    const newFood: FoodEntry = {
      ...food,
      id: Date.now().toString(),
      date: new Date().toISOString()
    }
    setFoodEntries(prev => [...prev, newFood])
    
    const confidenceText = food.confidence === 'high' ? '' : ' (estimasi)'
    showToast(`${food.name} - ${food.calories} kkal${confidenceText} tercatat!`, 'success')
    
    // Check if over daily limit
    const today = new Date().toDateString()
    const todayTotal = foodEntries
      .filter(entry => new Date(entry.date).toDateString() === today)
      .reduce((acc, entry) => acc + entry.calories, 0) + food.calories
    
    if (todayTotal > DAILY_CALORIE_TARGET) {
      setTimeout(() => {
        showToast(`Peringatan: Kalori hari ini melebihi target!`, 'warning')
      }, 1500)
    }
  }, [setFoodEntries, showToast, foodEntries])

  const handleDeleteFood = useCallback((id: string) => {
    setFoodEntries(prev => prev.filter(f => f.id !== id))
    showToast('Makanan berhasil dihapus', 'info')
  }, [setFoodEntries, showToast])

  // Exercise handlers
  const handleAddExercise = useCallback((exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString()
    }
    setExercises(prev => [...prev, newExercise])
    showToast('Jadwal olahraga berhasil ditambahkan!', 'success')
  }, [setExercises, showToast])

  const handleToggleExercise = useCallback((id: string) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === id) {
        const newCompleted = !ex.completed
        if (newCompleted) {
          const exercise = prev.find(e => e.id === id)
          if (exercise?.caloriesBurned) {
            showToast(`Hebat! ${exercise.caloriesBurned} kkal terbakar!`, 'success')
          } else {
            showToast('Hebat! Olahraga selesai!', 'success')
          }
        }
        return { ...ex, completed: newCompleted }
      }
      return ex
    }))
  }, [setExercises, showToast])

  const handleDeleteExercise = useCallback((id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id))
    showToast('Jadwal olahraga dihapus', 'info')
  }, [setExercises, showToast])

  // Check if data is loaded
  const isLoaded = userLoaded && transactionsLoaded && foodLoaded && exercisesLoaded && isHydrated

  // Show loading screen
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    )
  }

  // Show welcome/login screen if not logged in
  if (!user.isLoggedIn) {
    return (
      <>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
        <WelcomeScreen onLogin={handleLogin} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">FinHealth</h1>
              <p className="text-[10px] text-muted-foreground">Halo, {user.name.split(' ')[0]}!</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Leaf className="w-4 h-4" />
            <span className="text-xs font-medium">v2.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4">
        {activeTab === 'keuangan' && (
          <FinanceTab
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}
        {activeTab === 'nutrisi' && (
          <NutritionTab
            foodEntries={foodEntries}
            onAddFood={handleAddFood}
            onDeleteFood={handleDeleteFood}
            dailyTarget={DAILY_CALORIE_TARGET}
          />
        )}
        {activeTab === 'olahraga' && (
          <ExerciseTab
            exercises={exercises}
            onAddExercise={handleAddExercise}
            onToggleExercise={handleToggleExercise}
            onDeleteExercise={handleDeleteExercise}
            dailyCaloriesSurplus={Math.max(0, dailyCaloriesSurplus)}
            dailyTarget={DAILY_CALORIE_TARGET}
          />
        )}
        {activeTab === 'profil' && (
          <ProfileTab
            user={user}
            onLogout={handleLogout}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
