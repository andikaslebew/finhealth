// Mock AI Food Database - Simulasi estimasi kalori berbasis nama makanan
// Database ini berisi estimasi kalori untuk makanan umum Indonesia dan internasional

export interface FoodCalorieData {
  name: string
  calories: number
  category: string
  portion: string
}

// Database makanan dengan estimasi kalori realistis
const FOOD_DATABASE: FoodCalorieData[] = [
  // Nasi & Karbohidrat
  { name: 'nasi putih', calories: 175, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi goreng', calories: 350, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi uduk', calories: 280, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi kuning', calories: 260, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi padang', calories: 550, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'bubur ayam', calories: 280, category: 'karbohidrat', portion: '1 mangkok' },
  { name: 'lontong', calories: 150, category: 'karbohidrat', portion: '2 potong' },
  { name: 'ketupat', calories: 145, category: 'karbohidrat', portion: '1 buah' },
  { name: 'mie goreng', calories: 380, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'mie ayam', calories: 420, category: 'karbohidrat', portion: '1 mangkok' },
  { name: 'mie instan', calories: 350, category: 'karbohidrat', portion: '1 bungkus' },
  { name: 'kwetiau goreng', calories: 400, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'bihun goreng', calories: 320, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'roti tawar', calories: 80, category: 'karbohidrat', portion: '1 lembar' },
  { name: 'roti bakar', calories: 180, category: 'karbohidrat', portion: '1 porsi' },
  
  // Lauk Pauk
  { name: 'ayam goreng', calories: 260, category: 'protein', portion: '1 potong' },
  { name: 'ayam bakar', calories: 220, category: 'protein', portion: '1 potong' },
  { name: 'ayam geprek', calories: 350, category: 'protein', portion: '1 porsi' },
  { name: 'rendang', calories: 380, category: 'protein', portion: '100 gram' },
  { name: 'sate ayam', calories: 250, category: 'protein', portion: '10 tusuk' },
  { name: 'sate kambing', calories: 300, category: 'protein', portion: '10 tusuk' },
  { name: 'ikan goreng', calories: 200, category: 'protein', portion: '1 ekor sedang' },
  { name: 'ikan bakar', calories: 180, category: 'protein', portion: '1 ekor sedang' },
  { name: 'telur goreng', calories: 120, category: 'protein', portion: '1 butir' },
  { name: 'telur rebus', calories: 77, category: 'protein', portion: '1 butir' },
  { name: 'telur dadar', calories: 150, category: 'protein', portion: '1 porsi' },
  { name: 'tempe goreng', calories: 160, category: 'protein', portion: '3 potong' },
  { name: 'tahu goreng', calories: 130, category: 'protein', portion: '3 potong' },
  { name: 'bakso', calories: 300, category: 'protein', portion: '1 mangkok' },
  { name: 'soto ayam', calories: 350, category: 'protein', portion: '1 mangkok' },
  { name: 'rawon', calories: 400, category: 'protein', portion: '1 mangkok' },
  { name: 'gulai', calories: 350, category: 'protein', portion: '1 porsi' },
  { name: 'opor ayam', calories: 320, category: 'protein', portion: '1 potong' },
  
  // Sayuran
  { name: 'sayur asem', calories: 80, category: 'sayuran', portion: '1 mangkok' },
  { name: 'sayur lodeh', calories: 120, category: 'sayuran', portion: '1 mangkok' },
  { name: 'sayur sop', calories: 70, category: 'sayuran', portion: '1 mangkok' },
  { name: 'gado gado', calories: 280, category: 'sayuran', portion: '1 porsi' },
  { name: 'pecel', calories: 250, category: 'sayuran', portion: '1 porsi' },
  { name: 'urap', calories: 150, category: 'sayuran', portion: '1 porsi' },
  { name: 'capcay', calories: 180, category: 'sayuran', portion: '1 porsi' },
  { name: 'tumis kangkung', calories: 90, category: 'sayuran', portion: '1 porsi' },
  { name: 'salad', calories: 120, category: 'sayuran', portion: '1 porsi' },
  
  // Gorengan & Snack
  { name: 'gorengan', calories: 150, category: 'snack', portion: '1 buah' },
  { name: 'bakwan', calories: 120, category: 'snack', portion: '1 buah' },
  { name: 'pisang goreng', calories: 130, category: 'snack', portion: '1 buah' },
  { name: 'risoles', calories: 180, category: 'snack', portion: '1 buah' },
  { name: 'lemper', calories: 150, category: 'snack', portion: '1 buah' },
  { name: 'martabak manis', calories: 450, category: 'snack', portion: '1 potong' },
  { name: 'martabak telur', calories: 380, category: 'snack', portion: '1 potong' },
  { name: 'donat', calories: 250, category: 'snack', portion: '1 buah' },
  { name: 'kue', calories: 200, category: 'snack', portion: '1 potong' },
  { name: 'keripik', calories: 150, category: 'snack', portion: '1 bungkus kecil' },
  
  // Minuman
  { name: 'teh manis', calories: 90, category: 'minuman', portion: '1 gelas' },
  { name: 'es teh', calories: 80, category: 'minuman', portion: '1 gelas' },
  { name: 'kopi susu', calories: 120, category: 'minuman', portion: '1 gelas' },
  { name: 'es kopi', calories: 150, category: 'minuman', portion: '1 gelas' },
  { name: 'jus jeruk', calories: 110, category: 'minuman', portion: '1 gelas' },
  { name: 'jus alpukat', calories: 280, category: 'minuman', portion: '1 gelas' },
  { name: 'es campur', calories: 250, category: 'minuman', portion: '1 porsi' },
  { name: 'es cendol', calories: 200, category: 'minuman', portion: '1 gelas' },
  { name: 'boba', calories: 350, category: 'minuman', portion: '1 gelas' },
  { name: 'susu', calories: 150, category: 'minuman', portion: '1 gelas' },
  { name: 'air putih', calories: 0, category: 'minuman', portion: '1 gelas' },
  
  // Fast Food
  { name: 'burger', calories: 450, category: 'fast food', portion: '1 buah' },
  { name: 'pizza', calories: 280, category: 'fast food', portion: '1 slice' },
  { name: 'kentang goreng', calories: 320, category: 'fast food', portion: '1 porsi medium' },
  { name: 'fried chicken', calories: 280, category: 'fast food', portion: '1 potong' },
  { name: 'hot dog', calories: 290, category: 'fast food', portion: '1 buah' },
  { name: 'sandwich', calories: 350, category: 'fast food', portion: '1 buah' },
  
  // Buah
  { name: 'pisang', calories: 90, category: 'buah', portion: '1 buah' },
  { name: 'apel', calories: 80, category: 'buah', portion: '1 buah' },
  { name: 'jeruk', calories: 60, category: 'buah', portion: '1 buah' },
  { name: 'mangga', calories: 100, category: 'buah', portion: '1 buah' },
  { name: 'semangka', calories: 45, category: 'buah', portion: '1 potong' },
  { name: 'melon', calories: 50, category: 'buah', portion: '1 potong' },
  { name: 'pepaya', calories: 60, category: 'buah', portion: '1 potong' },
  { name: 'anggur', calories: 70, category: 'buah', portion: '10 buah' },
  { name: 'durian', calories: 350, category: 'buah', portion: '2 biji' },
]

// Fungsi untuk mencari kalori berdasarkan nama makanan (simulasi AI)
export function estimateCalories(foodName: string): FoodCalorieData | null {
  const normalizedInput = foodName.toLowerCase().trim()
  
  // Cari kecocokan persis atau parsial
  let bestMatch: FoodCalorieData | null = null
  let bestScore = 0
  
  for (const food of FOOD_DATABASE) {
    const normalizedFoodName = food.name.toLowerCase()
    
    // Kecocokan persis
    if (normalizedInput === normalizedFoodName) {
      return food
    }
    
    // Kecocokan parsial (input mengandung nama makanan atau sebaliknya)
    if (normalizedInput.includes(normalizedFoodName) || normalizedFoodName.includes(normalizedInput)) {
      const score = normalizedFoodName.length
      if (score > bestScore) {
        bestScore = score
        bestMatch = food
      }
    }
    
    // Kecocokan kata kunci
    const inputWords = normalizedInput.split(' ')
    const foodWords = normalizedFoodName.split(' ')
    let matchCount = 0
    for (const inputWord of inputWords) {
      for (const foodWord of foodWords) {
        if (inputWord.includes(foodWord) || foodWord.includes(inputWord)) {
          matchCount++
        }
      }
    }
    if (matchCount > 0 && matchCount > bestScore) {
      bestScore = matchCount
      bestMatch = food
    }
  }
  
  return bestMatch
}

// Fungsi untuk mendapatkan estimasi kalori dengan variasi acak (simulasi AI yang lebih realistis)
export function getAICalorieEstimate(foodName: string): { calories: number; confidence: 'high' | 'medium' | 'low'; portion: string; category: string } {
  const match = estimateCalories(foodName)
  
  if (match) {
    // Tambahkan sedikit variasi untuk simulasi AI yang lebih realistis
    const variation = Math.floor(Math.random() * 20) - 10 // -10 to +10
    return {
      calories: Math.max(0, match.calories + variation),
      confidence: 'high',
      portion: match.portion,
      category: match.category
    }
  }
  
  // Jika tidak ditemukan, berikan estimasi default berdasarkan panjang nama
  const baseCalories = 200 + Math.floor(Math.random() * 150)
  return {
    calories: baseCalories,
    confidence: 'low',
    portion: '1 porsi',
    category: 'lainnya'
  }
}

// Database rekomendasi olahraga berdasarkan surplus kalori
export interface ExerciseRecommendation {
  name: string
  duration: number // dalam menit
  caloriesBurned: number
  intensity: 'ringan' | 'sedang' | 'berat'
}

export function getExerciseRecommendations(surplusCalories: number): ExerciseRecommendation[] {
  const recommendations: ExerciseRecommendation[] = []
  
  if (surplusCalories <= 100) {
    recommendations.push(
      { name: 'Jalan santai', duration: 20, caloriesBurned: 80, intensity: 'ringan' },
      { name: 'Stretching', duration: 15, caloriesBurned: 50, intensity: 'ringan' }
    )
  } else if (surplusCalories <= 300) {
    recommendations.push(
      { name: 'Jalan cepat', duration: 30, caloriesBurned: 150, intensity: 'ringan' },
      { name: 'Bersepeda santai', duration: 30, caloriesBurned: 180, intensity: 'ringan' },
      { name: 'Yoga', duration: 30, caloriesBurned: 120, intensity: 'ringan' }
    )
  } else if (surplusCalories <= 500) {
    recommendations.push(
      { name: 'Jogging', duration: 30, caloriesBurned: 280, intensity: 'sedang' },
      { name: 'Berenang', duration: 30, caloriesBurned: 300, intensity: 'sedang' },
      { name: 'Aerobik', duration: 40, caloriesBurned: 320, intensity: 'sedang' }
    )
  } else {
    recommendations.push(
      { name: 'Lari cepat', duration: 45, caloriesBurned: 450, intensity: 'berat' },
      { name: 'HIIT Workout', duration: 30, caloriesBurned: 400, intensity: 'berat' },
      { name: 'Bersepeda intensif', duration: 45, caloriesBurned: 500, intensity: 'berat' },
      { name: 'Skipping', duration: 30, caloriesBurned: 350, intensity: 'berat' }
    )
  }
  
  return recommendations
}
