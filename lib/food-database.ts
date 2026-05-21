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
  { name: 'nasi goreng ayam', calories: 400, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi goreng seafood', calories: 420, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi goreng spesial', calories: 450, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi goreng kampung', calories: 380, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi uduk', calories: 280, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi kuning', calories: 260, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi padang', calories: 550, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi campur', calories: 500, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi liwet', calories: 320, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi tim', calories: 200, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'nasi pecel', calories: 380, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'bubur ayam', calories: 280, category: 'karbohidrat', portion: '1 mangkok' },
  { name: 'bubur kacang hijau', calories: 200, category: 'karbohidrat', portion: '1 mangkok' },
  { name: 'bubur sumsum', calories: 180, category: 'karbohidrat', portion: '1 mangkok' },
  { name: 'lontong', calories: 150, category: 'karbohidrat', portion: '2 potong' },
  { name: 'lontong sayur', calories: 280, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'lontong cap gomeh', calories: 350, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'ketupat', calories: 145, category: 'karbohidrat', portion: '1 buah' },
  { name: 'ketupat sayur', calories: 280, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'mie goreng', calories: 380, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'mie ayam', calories: 420, category: 'karbohidrat', portion: '1 mangkok' },
  { name: 'mie ayam bakso', calories: 480, category: 'karbohidrat', portion: '1 mangkok' },
  { name: 'mie instan', calories: 350, category: 'karbohidrat', portion: '1 bungkus' },
  { name: 'mie rebus', calories: 320, category: 'karbohidrat', portion: '1 mangkok' },
  { name: 'mie kuah', calories: 300, category: 'karbohidrat', portion: '1 mangkok' },
  { name: 'kwetiau goreng', calories: 400, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'bihun goreng', calories: 320, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'roti tawar', calories: 80, category: 'karbohidrat', portion: '1 lembar' },
  { name: 'roti bakar', calories: 180, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'roti gandum', calories: 70, category: 'karbohidrat', portion: '1 lembar' },
  { name: 'nasi jagung', calories: 160, category: 'karbohidrat', portion: '1 porsi' },
  { name: 'kentang rebus', calories: 110, category: 'karbohidrat', portion: '1 buah' },
  { name: 'ubi rebus', calories: 130, category: 'karbohidrat', portion: '1 buah' },
  { name: 'singkong rebus', calories: 150, category: 'karbohidrat', portion: '1 potong' },
  { name: 'oatmeal', calories: 150, category: 'karbohidrat', portion: '1 mangkok' },
  
  // Lauk Pauk
  { name: 'ayam goreng', calories: 260, category: 'protein', portion: '1 potong' },
  { name: 'ayam goreng tepung', calories: 300, category: 'protein', portion: '1 potong' },
  { name: 'ayam goreng crispy', calories: 320, category: 'protein', portion: '1 potong' },
  { name: 'ayam bakar', calories: 220, category: 'protein', portion: '1 potong' },
  { name: 'ayam bakar madu', calories: 250, category: 'protein', portion: '1 potong' },
  { name: 'ayam geprek', calories: 350, category: 'protein', portion: '1 porsi' },
  { name: 'ayam penyet', calories: 320, category: 'protein', portion: '1 porsi' },
  { name: 'ayam kecap', calories: 280, category: 'protein', portion: '1 potong' },
  { name: 'ayam rica rica', calories: 260, category: 'protein', portion: '1 potong' },
  { name: 'ayam pop', calories: 240, category: 'protein', portion: '1 potong' },
  { name: 'rendang', calories: 380, category: 'protein', portion: '100 gram' },
  { name: 'rendang daging', calories: 400, category: 'protein', portion: '100 gram' },
  { name: 'rendang ayam', calories: 340, category: 'protein', portion: '100 gram' },
  { name: 'sate ayam', calories: 250, category: 'protein', portion: '10 tusuk' },
  { name: 'sate kambing', calories: 300, category: 'protein', portion: '10 tusuk' },
  { name: 'sate padang', calories: 350, category: 'protein', portion: '10 tusuk' },
  { name: 'sate lilit', calories: 280, category: 'protein', portion: '10 tusuk' },
  { name: 'ikan goreng', calories: 200, category: 'protein', portion: '1 ekor sedang' },
  { name: 'ikan bakar', calories: 180, category: 'protein', portion: '1 ekor sedang' },
  { name: 'ikan gurame goreng', calories: 250, category: 'protein', portion: '1 ekor' },
  { name: 'ikan lele goreng', calories: 200, category: 'protein', portion: '1 ekor' },
  { name: 'ikan nila goreng', calories: 190, category: 'protein', portion: '1 ekor' },
  { name: 'udang goreng', calories: 150, category: 'protein', portion: '5 ekor' },
  { name: 'cumi goreng', calories: 180, category: 'protein', portion: '1 porsi' },
  { name: 'telur goreng', calories: 120, category: 'protein', portion: '1 butir' },
  { name: 'telur rebus', calories: 77, category: 'protein', portion: '1 butir' },
  { name: 'telur dadar', calories: 150, category: 'protein', portion: '1 porsi' },
  { name: 'telur ceplok', calories: 110, category: 'protein', portion: '1 butir' },
  { name: 'telur mata sapi', calories: 110, category: 'protein', portion: '1 butir' },
  { name: 'telur balado', calories: 180, category: 'protein', portion: '2 butir' },
  { name: 'omelette', calories: 180, category: 'protein', portion: '1 porsi' },
  { name: 'tempe goreng', calories: 160, category: 'protein', portion: '3 potong' },
  { name: 'tempe bacem', calories: 180, category: 'protein', portion: '3 potong' },
  { name: 'tempe orek', calories: 150, category: 'protein', portion: '1 porsi' },
  { name: 'tempe mendoan', calories: 200, category: 'protein', portion: '3 potong' },
  { name: 'tahu goreng', calories: 130, category: 'protein', portion: '3 potong' },
  { name: 'tahu isi', calories: 180, category: 'protein', portion: '2 buah' },
  { name: 'tahu telur', calories: 220, category: 'protein', portion: '1 porsi' },
  { name: 'bakso', calories: 300, category: 'protein', portion: '1 mangkok' },
  { name: 'bakso urat', calories: 320, category: 'protein', portion: '1 mangkok' },
  { name: 'bakso goreng', calories: 150, category: 'protein', portion: '5 buah' },
  { name: 'soto ayam', calories: 350, category: 'protein', portion: '1 mangkok' },
  { name: 'soto betawi', calories: 450, category: 'protein', portion: '1 mangkok' },
  { name: 'soto madura', calories: 380, category: 'protein', portion: '1 mangkok' },
  { name: 'sop buntut', calories: 400, category: 'protein', portion: '1 mangkok' },
  { name: 'rawon', calories: 400, category: 'protein', portion: '1 mangkok' },
  { name: 'gulai', calories: 350, category: 'protein', portion: '1 porsi' },
  { name: 'gulai ayam', calories: 380, category: 'protein', portion: '1 porsi' },
  { name: 'gulai kambing', calories: 420, category: 'protein', portion: '1 porsi' },
  { name: 'opor ayam', calories: 320, category: 'protein', portion: '1 potong' },
  { name: 'semur daging', calories: 350, category: 'protein', portion: '1 porsi' },
  { name: 'daging sapi goreng', calories: 250, category: 'protein', portion: '100 gram' },
  { name: 'empal', calories: 280, category: 'protein', portion: '1 potong' },
  { name: 'dendeng', calories: 200, category: 'protein', portion: '50 gram' },
  
  // Sayuran
  { name: 'sayur asem', calories: 80, category: 'sayuran', portion: '1 mangkok' },
  { name: 'sayur lodeh', calories: 120, category: 'sayuran', portion: '1 mangkok' },
  { name: 'sayur sop', calories: 70, category: 'sayuran', portion: '1 mangkok' },
  { name: 'sayur bayam', calories: 60, category: 'sayuran', portion: '1 mangkok' },
  { name: 'sayur bening', calories: 50, category: 'sayuran', portion: '1 mangkok' },
  { name: 'sayur nangka', calories: 90, category: 'sayuran', portion: '1 mangkok' },
  { name: 'sayur labu', calories: 60, category: 'sayuran', portion: '1 mangkok' },
  { name: 'gado gado', calories: 280, category: 'sayuran', portion: '1 porsi' },
  { name: 'pecel', calories: 250, category: 'sayuran', portion: '1 porsi' },
  { name: 'pecel lele', calories: 380, category: 'sayuran', portion: '1 porsi' },
  { name: 'urap', calories: 150, category: 'sayuran', portion: '1 porsi' },
  { name: 'capcay', calories: 180, category: 'sayuran', portion: '1 porsi' },
  { name: 'tumis kangkung', calories: 90, category: 'sayuran', portion: '1 porsi' },
  { name: 'kangkung goreng', calories: 100, category: 'sayuran', portion: '1 porsi' },
  { name: 'tumis bayam', calories: 80, category: 'sayuran', portion: '1 porsi' },
  { name: 'tumis buncis', calories: 70, category: 'sayuran', portion: '1 porsi' },
  { name: 'tumis tauge', calories: 60, category: 'sayuran', portion: '1 porsi' },
  { name: 'salad', calories: 120, category: 'sayuran', portion: '1 porsi' },
  { name: 'lalapan', calories: 30, category: 'sayuran', portion: '1 porsi' },
  { name: 'sawi tumis', calories: 70, category: 'sayuran', portion: '1 porsi' },
  { name: 'brokoli rebus', calories: 50, category: 'sayuran', portion: '1 porsi' },
  { name: 'wortel rebus', calories: 40, category: 'sayuran', portion: '1 porsi' },
  
  // Gorengan & Snack
  { name: 'gorengan', calories: 150, category: 'snack', portion: '1 buah' },
  { name: 'bakwan', calories: 120, category: 'snack', portion: '1 buah' },
  { name: 'pisang goreng', calories: 130, category: 'snack', portion: '1 buah' },
  { name: 'singkong goreng', calories: 150, category: 'snack', portion: '3 potong' },
  { name: 'tahu goreng isi', calories: 100, category: 'snack', portion: '1 buah' },
  { name: 'risoles', calories: 180, category: 'snack', portion: '1 buah' },
  { name: 'pastel', calories: 170, category: 'snack', portion: '1 buah' },
  { name: 'cireng', calories: 120, category: 'snack', portion: '3 buah' },
  { name: 'cilok', calories: 100, category: 'snack', portion: '5 buah' },
  { name: 'batagor', calories: 280, category: 'snack', portion: '1 porsi' },
  { name: 'siomay', calories: 250, category: 'snack', portion: '1 porsi' },
  { name: 'pempek', calories: 300, category: 'snack', portion: '1 porsi' },
  { name: 'lemper', calories: 150, category: 'snack', portion: '1 buah' },
  { name: 'onde onde', calories: 100, category: 'snack', portion: '1 buah' },
  { name: 'klepon', calories: 80, category: 'snack', portion: '2 buah' },
  { name: 'getuk', calories: 120, category: 'snack', portion: '1 porsi' },
  { name: 'martabak manis', calories: 450, category: 'snack', portion: '1 potong' },
  { name: 'martabak telur', calories: 380, category: 'snack', portion: '1 potong' },
  { name: 'terang bulan', calories: 400, category: 'snack', portion: '1 potong' },
  { name: 'donat', calories: 250, category: 'snack', portion: '1 buah' },
  { name: 'kue', calories: 200, category: 'snack', portion: '1 potong' },
  { name: 'kue lapis', calories: 180, category: 'snack', portion: '1 potong' },
  { name: 'brownies', calories: 280, category: 'snack', portion: '1 potong' },
  { name: 'bolu', calories: 200, category: 'snack', portion: '1 potong' },
  { name: 'keripik', calories: 150, category: 'snack', portion: '1 bungkus kecil' },
  { name: 'kerupuk', calories: 50, category: 'snack', portion: '5 lembar' },
  { name: 'pop corn', calories: 120, category: 'snack', portion: '1 porsi' },
  { name: 'biskuit', calories: 80, category: 'snack', portion: '3 keping' },
  { name: 'roti coklat', calories: 250, category: 'snack', portion: '1 buah' },
  { name: 'roti keju', calories: 280, category: 'snack', portion: '1 buah' },
  
  // Minuman
  { name: 'teh manis', calories: 90, category: 'minuman', portion: '1 gelas' },
  { name: 'teh tawar', calories: 0, category: 'minuman', portion: '1 gelas' },
  { name: 'teh panas', calories: 40, category: 'minuman', portion: '1 gelas' },
  { name: 'es teh', calories: 80, category: 'minuman', portion: '1 gelas' },
  { name: 'es teh manis', calories: 100, category: 'minuman', portion: '1 gelas' },
  { name: 'kopi', calories: 5, category: 'minuman', portion: '1 gelas' },
  { name: 'kopi hitam', calories: 5, category: 'minuman', portion: '1 gelas' },
  { name: 'kopi susu', calories: 120, category: 'minuman', portion: '1 gelas' },
  { name: 'es kopi', calories: 150, category: 'minuman', portion: '1 gelas' },
  { name: 'es kopi susu', calories: 180, category: 'minuman', portion: '1 gelas' },
  { name: 'cappuccino', calories: 150, category: 'minuman', portion: '1 gelas' },
  { name: 'latte', calories: 180, category: 'minuman', portion: '1 gelas' },
  { name: 'americano', calories: 15, category: 'minuman', portion: '1 gelas' },
  { name: 'jus jeruk', calories: 110, category: 'minuman', portion: '1 gelas' },
  { name: 'jus alpukat', calories: 280, category: 'minuman', portion: '1 gelas' },
  { name: 'jus mangga', calories: 120, category: 'minuman', portion: '1 gelas' },
  { name: 'jus apel', calories: 100, category: 'minuman', portion: '1 gelas' },
  { name: 'jus semangka', calories: 80, category: 'minuman', portion: '1 gelas' },
  { name: 'jus tomat', calories: 40, category: 'minuman', portion: '1 gelas' },
  { name: 'jus wortel', calories: 70, category: 'minuman', portion: '1 gelas' },
  { name: 'jus melon', calories: 90, category: 'minuman', portion: '1 gelas' },
  { name: 'smoothie', calories: 200, category: 'minuman', portion: '1 gelas' },
  { name: 'es campur', calories: 250, category: 'minuman', portion: '1 porsi' },
  { name: 'es cendol', calories: 200, category: 'minuman', portion: '1 gelas' },
  { name: 'es doger', calories: 220, category: 'minuman', portion: '1 gelas' },
  { name: 'es kelapa muda', calories: 100, category: 'minuman', portion: '1 gelas' },
  { name: 'kelapa muda', calories: 50, category: 'minuman', portion: '1 gelas' },
  { name: 'boba', calories: 350, category: 'minuman', portion: '1 gelas' },
  { name: 'boba milk tea', calories: 400, category: 'minuman', portion: '1 gelas' },
  { name: 'thai tea', calories: 280, category: 'minuman', portion: '1 gelas' },
  { name: 'susu', calories: 150, category: 'minuman', portion: '1 gelas' },
  { name: 'susu coklat', calories: 200, category: 'minuman', portion: '1 gelas' },
  { name: 'susu segar', calories: 130, category: 'minuman', portion: '1 gelas' },
  { name: 'susu kedelai', calories: 80, category: 'minuman', portion: '1 gelas' },
  { name: 'yakult', calories: 50, category: 'minuman', portion: '1 botol' },
  { name: 'yogurt', calories: 100, category: 'minuman', portion: '1 cup' },
  { name: 'minuman bersoda', calories: 140, category: 'minuman', portion: '1 kaleng' },
  { name: 'coca cola', calories: 140, category: 'minuman', portion: '1 kaleng' },
  { name: 'sprite', calories: 130, category: 'minuman', portion: '1 kaleng' },
  { name: 'fanta', calories: 150, category: 'minuman', portion: '1 kaleng' },
  { name: 'air putih', calories: 0, category: 'minuman', portion: '1 gelas' },
  { name: 'air mineral', calories: 0, category: 'minuman', portion: '1 botol' },
  
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
