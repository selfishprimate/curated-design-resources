# Yeni Kaynak Notifikasyon Sistemi

## Genel Bakış

Mossaique platformunda kullanıcılara yeni eklenen kaynakları göstermek için tasarlanmış reaktif bir notifikasyon sistemi. Sistem, localStorage tabanlı takip mekanizması ve event-driven mimari kullanarak kullanıcı deneyimini artırır.

## Temel Özellikler

- ✅ Yeni kaynaklar mavi nokta (blue dot) ile işaretlenir
- ✅ Kategori ziyaret edildiğinde notifikasyon otomatik kaybolur
- ✅ localStorage ile kalıcı takip
- ✅ Event-driven reaktif güncelleme
- ✅ Desktop menü ve navigasyon entegrasyonu
- ✅ Sıfır backend bağımlılığı (tamamen frontend)

---

## Mimari Yapı

### 1. Veri Katmanı (Data Layer)

**Dosya:** `src/data/*.json`

Her kaynak nesnesinde opsiyonel `new` alanı:

```json
{
  "title": "Iconsax",
  "link": "https://iconsax.io/",
  "description": "Hello welcome to iconsax...",
  "globalIndex": 175,
  "pricing": "free",
  "new": true  // ← Yeni kaynak işaretleyici
}
```

**Konum:** `src/data/icons.json:62`

---

### 2. Utility Katmanı (Utility Layer)

#### 2.1 Visited Categories Tracker

**Dosya:** `src/utils/visitedCategories.js`

localStorage tabanlı kategori ziyaret takip sistemi.

##### Fonksiyonlar:

**`getVisitedCategories()`**
```javascript
// localStorage'dan ziyaret edilen kategori ID'lerini alır
// Returns: Array<string>
```

**`markCategoryAsVisited(categoryId)`**
```javascript
// Kategoriyi ziyaret edilmiş olarak işaretler
// localStorage'a kaydeder
// Custom event dispatch eder: 'categoryVisited'
```
**Konum:** `src/utils/visitedCategories.js:25-38`

**Önemli Not:** Bu fonksiyon custom event fırlatır:
```javascript
window.dispatchEvent(new CustomEvent('categoryVisited', {
  detail: { categoryId }
}))
```

**`isCategoryVisited(categoryId)`**
```javascript
// Kategorinin ziyaret edilip edilmediğini kontrol eder
// Returns: boolean
```

**`clearVisitedCategories()`**
```javascript
// Tüm ziyaret kayıtlarını temizler (test/reset için)
```

##### localStorage Anahtarı:
```javascript
const STORAGE_KEY = 'mossaique_visited_categories'
```

##### Veri Formatı:
```javascript
// localStorage'da tutulan veri yapısı
["icons", "ai", "design-tools", ...]  // Ziyaret edilen kategori ID'leri
```

---

#### 2.2 New Resources Checker

**Dosya:** `src/utils/newResources.js`

Yeni kaynak kontrolü ve sayımı için utility fonksiyonları.

##### Fonksiyonlar:

**`categoryHasNewResources(category, checkVisited = true)`**
```javascript
// Bir kategoride yeni kaynak olup olmadığını kontrol eder
// checkVisited true ise, ziyaret edilen kategorileri filtreler
// Returns: boolean
```
**Konum:** `src/utils/newResources.js:13-26`

**Mantık:**
1. Kategori resources array'inde `new: true` olanları ara
2. `checkVisited = true` ise → `isCategoryVisited()` ile kontrol et
3. Kategori ziyaret edilmişse → false döndür
4. Kategori ziyaret edilmemişse ve yeni kaynaklar varsa → true döndür

**`hasAnyNewResources(categories, checkVisited = true)`**
```javascript
// Herhangi bir kategoride yeni kaynak olup olmadığını kontrol eder
// Returns: boolean
```
**Konum:** `src/utils/newResources.js:34-37`

**`getNewResourcesCount(category)`**
```javascript
// Bir kategorideki yeni kaynak sayısını döndürür
// Returns: number
```

---

### 3. UI Katmanı (UI Layer)

#### 3.1 Desktop Menü

**Dosya:** `src/components/MenuDesktop.jsx`

Sol sidebar menüsünde kategori listesi ve mavi nokta gösterimi.

##### Özellikler:

**State Yönetimi:**
```javascript
const [refreshKey, setRefreshKey] = useState(0)
```
**Konum:** `src/components/MenuDesktop.jsx:37`

**Event Listener:**
```javascript
useEffect(() => {
  const handleCategoryVisited = () => {
    setRefreshKey(prev => prev + 1)  // Force re-render
  }

  window.addEventListener('categoryVisited', handleCategoryVisited)
  return () => window.removeEventListener('categoryVisited', handleCategoryVisited)
}, [])
```
**Konum:** `src/components/MenuDesktop.jsx:40-47`

**Render Mantığı:**
```javascript
{categories.map((category) => {
  const hasNew = categoryHasNewResources(category)  // Her kategori için kontrol
  return (
    <li key={category.id}>
      <Link to={`/${category.id}`}>
        {/* Kategori adı ve ikonu */}
        {hasNew && (
          <span className="h-2 w-2 rounded-full bg-blue-600"></span>
        )}
      </Link>
    </li>
  )
})}
```
**Konum:** `src/components/MenuDesktop.jsx:58-81`

---

#### 3.2 Navigation (Desktop)

**Dosya:** `src/components/Navigation.jsx`

Üst navigasyon barında hamburger menü butonu üzerinde mavi nokta gösterimi.

##### Özellikler:

**State Yönetimi:**
```javascript
const [refreshKey, setRefreshKey] = useState(0)
```
**Konum:** `src/components/Navigation.jsx:10`

**Event Listener:**
```javascript
useEffect(() => {
  const handleCategoryVisited = () => {
    setRefreshKey(prev => prev + 1)  // Force re-render
  }

  window.addEventListener('categoryVisited', handleCategoryVisited)
  return () => window.removeEventListener('categoryVisited', handleCategoryVisited)
}, [])
```
**Konum:** `src/components/Navigation.jsx:13-20`

**Agregat Kontrol:**
```javascript
const hasNewResources = hasAnyNewResources(categories)  // Tüm kategorileri kontrol et
```
**Konum:** `src/components/Navigation.jsx:22`

**Render Mantığı:**
```javascript
<button onClick={onToggleSidebarCollapse} className="sidebarToggle relative...">
  <Menu className="h-5 w-5" />
  {hasNewResources && (
    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-600"></span>
  )}
</button>
```
**Konum:** `src/components/Navigation.jsx:30-40`

---

#### 3.3 Category Page

**Dosya:** `src/pages/Category.jsx`

Kategori sayfası açıldığında otomatik olarak "ziyaret edildi" olarak işaretleme.

##### Özellikler:

**Otomatik İşaretleme:**
```javascript
useEffect(() => {
  setFilterBy('all')  // Filter'ı resetle

  if (id) {
    markCategoryAsVisited(id)  // Kategoriyi ziyaret edildi olarak işaretle
  }
}, [id])  // Her kategori değiştiğinde çalışır
```
**Konum:** `src/pages/Category.jsx:20-27`

---

## Execution Flow (Çalışma Akışı)

### Senaryo 1: İlk Yükleme

```
1. Kullanıcı siteyi açar
   └─> MenuDesktop.jsx render edilir
       └─> categoryHasNewResources(category) çağrılır (her kategori için)
           └─> isCategoryVisited(categoryId) kontrol edilir
               └─> localStorage'dan 'mossaique_visited_categories' okunur
                   └─> Kategori ziyaret edilmemişse ve category.resources içinde
                       new: true olan kaynak varsa → mavi nokta göster

2. Navigation.jsx render edilir
   └─> hasAnyNewResources(categories) çağrılır
       └─> Herhangi bir kategoride yeni kaynak varsa
           → hamburger menü butonunda mavi nokta göster
```

---

### Senaryo 2: Kategori Ziyareti

```
1. Kullanıcı "Icons" kategorisine tıklar
   └─> React Router kategori sayfasına yönlendirir

2. Category.jsx mount olur
   └─> useEffect tetiklenir (id dependency)
       └─> markCategoryAsVisited('icons') çağrılır
           ├─> localStorage'a 'icons' eklenir
           │   ['icons']
           └─> Custom event dispatch edilir:
               window.dispatchEvent('categoryVisited', { detail: { categoryId: 'icons' }})

3. MenuDesktop.jsx event'i yakalar
   └─> handleCategoryVisited() çağrılır
       └─> setRefreshKey(prev => prev + 1)
           └─> Component re-render olur
               └─> categoryHasNewResources('icons') yeniden çalışır
                   └─> isCategoryVisited('icons') → true döner
                       └─> Mavi nokta kaybolur ✓

4. Navigation.jsx event'i yakalar
   └─> handleCategoryVisited() çağrılır
       └─> setRefreshKey(prev => prev + 1)
           └─> Component re-render olur
               └─> hasAnyNewResources(categories) yeniden çalışır
                   └─> Eğer başka kategoride yeni kaynak yoksa
                       → Hamburger menüdeki mavi nokta kaybolur ✓
```

---

### Senaryo 3: Event-Driven Update

```
markCategoryAsVisited('icons')
    │
    ├─> localStorage.setItem(...)
    │
    └─> window.dispatchEvent(new CustomEvent('categoryVisited'))
            │
            ├─> MenuDesktop event listener
            │   └─> setRefreshKey(n+1) → re-render
            │
            └─> Navigation event listener
                └─> setRefreshKey(n+1) → re-render
```

**Avantajlar:**
- Tüm UI bileşenleri otomatik senkronize olur
- Prop drilling gerektirmez
- Herhangi bir bileşenden `markCategoryAsVisited()` çağrılabilir
- Gevşek bağlı (loosely coupled) mimari

---

## Teknik Detaylar

### localStorage Yönetimi

**Anahtar:** `mossaique_visited_categories`

**Veri Yapısı:**
```javascript
// Örnek localStorage değeri
["icons", "ai", "design-tools", "inspiration", "mockups"]
```

**Error Handling:**
```javascript
try {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
} catch (error) {
  console.error('Error reading visited categories:', error)
  return []  // Graceful fallback
}
```
**Konum:** `src/utils/visitedCategories.js:11-19`

---

### Event-Driven Reaktivite

**Custom Event Yapısı:**
```javascript
new CustomEvent('categoryVisited', {
  detail: { categoryId: 'icons' }
})
```

**Event Listener Pattern:**
```javascript
// Component mount olduğunda listener ekle
useEffect(() => {
  const handler = () => { /* ... */ }
  window.addEventListener('categoryVisited', handler)

  // Component unmount olduğunda temizle
  return () => window.removeEventListener('categoryVisited', handler)
}, [])
```

**Neden Custom Event?**
- ✅ Component hiyerarşisinden bağımsız iletişim
- ✅ State management library gerektirmez (Redux, Zustand, vb.)
- ✅ Birden fazla listener destekler
- ✅ Browser native API, hafif ve performanslı

---

### Force Re-render Stratejisi

```javascript
const [refreshKey, setRefreshKey] = useState(0)

// Event geldiğinde
setRefreshKey(prev => prev + 1)
```

**Neden Gerekli?**
- `categoryHasNewResources()` fonksiyonu localStorage'dan okur
- localStorage değiştiğinde React otomatik re-render yapmaz
- `refreshKey` değiştiğinde component re-render olur
- Yeni localStorage değeriyle fonksiyonlar yeniden çalışır

**Alternatif Yaklaşımlar:**
1. ❌ Global state (Redux, Context) → Gereksiz karmaşıklık
2. ❌ setInterval polling → Performans sorunu
3. ✅ Custom event + refreshKey → Minimal ve etkili

---

## Veri Akış Diyagramı

```
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  src/data/icons.json                                        │
│  { title: "Iconsax", new: true, ... }                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   UTILITY LAYER                              │
│                                                              │
│  ┌───────────────────────┐    ┌──────────────────────────┐ │
│  │ visitedCategories.js  │    │   newResources.js        │ │
│  │                       │    │                          │ │
│  │ • getVisitedCategories│    │ • categoryHasNewResources│ │
│  │ • markCategoryVisited │◄───┤ • hasAnyNewResources     │ │
│  │ • isCategoryVisited   │    │ • getNewResourcesCount   │ │
│  └───────┬───────────────┘    └──────────────────────────┘ │
│          │                                                  │
│          │ localStorage                                     │
│          ▼                                                  │
│  ['icons', 'ai', ...]                                       │
└──────────┬──────────────────────────────────────────────────┘
           │
           │ Custom Event: 'categoryVisited'
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│                      UI LAYER                                │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────┐ │
│  │ MenuDesktop.jsx  │  │ Navigation.jsx   │  │Category.jsx│ │
│  │                  │  │                  │  │           │ │
│  │ [Listen Event]   │  │ [Listen Event]   │  │ [Trigger] │ │
│  │ • Blue dot per   │  │ • Blue dot on    │  │ • Mark    │ │
│  │   category       │  │   hamburger      │  │   visited │ │
│  └──────────────────┘  └──────────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## UI Görsel Örnekler

### Desktop Menü (MenuDesktop)

```
┌─────────────────────────┐
│ Categories              │
│                         │
│ 👁  Inspiration        │
│ 📝 Articles            │
│ ✨ Icons              🔵│ ← Mavi nokta (yeni kaynak var)
│ 🎨 Design Tools        │
│ ⚡ Mockups             │
└─────────────────────────┘
```

### Navigation Bar

```
┌──────────────────────────────────────────────────────────┐
│  [≡🔵] LOGO    [Search]    Submit  Support  ☀️  GitHub   │
│   └─ Hamburger + Blue Dot (genel notifikasyon)          │
└──────────────────────────────────────────────────────────┘
```

---

## Performans Optimizasyonları

### 1. Conditional Rendering

```javascript
{hasNew && (
  <span className="h-2 w-2 rounded-full bg-blue-600"></span>
)}
```
Mavi nokta sadece gerektiğinde DOM'a eklenir.

### 2. Event Listener Cleanup

```javascript
return () => window.removeEventListener('categoryVisited', handler)
```
Memory leak önlenir, component unmount olduğunda listener kaldırılır.

### 3. Minimal Re-render

```javascript
const [refreshKey, setRefreshKey] = useState(0)
```
Sadece `refreshKey` state'i değişir, diğer state'ler korunur.

### 4. localStorage Caching

```javascript
const visited = getVisitedCategories()  // İlk okuma
if (!visited.includes(categoryId)) {    // Array'de ara
  // ...
}
```
Her kontrolde localStorage'dan okumak yerine, array'de arama yapılır.

---

## Avantajlar ve Dezavantajlar

### ✅ Avantajlar

1. **Sıfır Backend Bağımlılığı**
   - Tamamen client-side çalışır
   - API çağrısı gerektirmez
   - Sunucu maliyeti yok

2. **Kalıcı Takip**
   - localStorage kullanıldığı için kullanıcı tekrar geldiğinde hatırlar
   - Browser kapatılıp açılsa bile veri korunur

3. **Reaktif UI**
   - Event-driven mimari sayesinde tüm bileşenler senkronize
   - Kullanıcı deneyimi akıcı

4. **Minimal Dependencies**
   - Ek kütüphane gerektirmez
   - React built-in hooks ile çalışır

5. **Modüler Yapı**
   - Utility fonksiyonlar yeniden kullanılabilir
   - Test edilebilir kod yapısı

### ❌ Dezavantajlar

1. **Browser Storage Limiti**
   - localStorage 5-10 MB ile sınırlı
   - Çok fazla kategori için ölçeklenmez (mevcut kullanım için yeterli)

2. **Cihaz Bazlı Takip**
   - Kullanıcı farklı cihazdan girerse sıfırlanır
   - Cross-device sync yok

3. **Manuel Veri Yönetimi**
   - JSON dosyalarına manuel `new: true` eklemek gerekir
   - Otomatik tarih bazlı "yenilik" yok

4. **Privacy Mode İssues**
   - İncognito/private mode'da localStorage çalışmayabilir
   - Graceful fallback mevcut ama özellik devre dışı kalır

---

## Gelecek İyileştirme Önerileri

### 1. Otomatik "New" Badge Yönetimi

```javascript
// Örnek: 30 gün sonra "new" badge'i kaldır
const isResourceNew = (resource) => {
  const addedDate = new Date(resource.dateAdded)
  const now = new Date()
  const daysSinceAdded = (now - addedDate) / (1000 * 60 * 60 * 24)
  return daysSinceAdded <= 30
}
```

**Gereksinimler:**
- JSON dosyalarına `dateAdded` alanı eklenmeli
- Build script ile otomatik güncelleme

### 2. User Preferences

```javascript
// localStorage'da kullanıcı tercihlerini sakla
{
  "hideNewBadges": false,
  "visitedCategories": ["icons", "ai"],
  "preferences": {
    "autoMarkAsVisited": true,
    "showCountBadge": true  // Örn: (3) yerine sadece nokta
  }
}
```

### 3. Analytics Integration

```javascript
// Hangi "yeni kaynaklar" tıklanıyor?
const trackNewResourceClick = (resourceTitle, categoryId) => {
  analytics.track('New Resource Clicked', {
    resource: resourceTitle,
    category: categoryId,
    timestamp: Date.now()
  })
}
```

### 4. A/B Testing

- Mavi nokta vs sayı badge'i ("3 new")
- Farklı renk alternatifleri (mavi, yeşil, kırmızı)
- Animasyonlu vs statik gösterim

### 5. Accessibility İyileştirmeleri

```javascript
// Screen reader desteği
<span
  className="h-2 w-2 rounded-full bg-blue-600"
  role="status"
  aria-label={`${newCount} new resources in ${category.title}`}
></span>
```

---

## Test Senaryoları

### Manual Test Checklist

- [ ] İlk açılışta yeni kaynağı olan kategorilerde mavi nokta görünüyor mu?
- [ ] Kategoriye tıklandığında mavi nokta kayboluyor mu?
- [ ] Sayfa yenilendiğinde (F5) durum korunuyor mu?
- [ ] İncognito modda graceful degrade oluyor mu?
- [ ] localStorage manuel temizlendiğinde tüm noktalar geri geliyor mu?
- [ ] Birden fazla kategoride yeni kaynak varken hamburger menüde nokta görünüyor mu?
- [ ] Tüm kategoriler ziyaret edildiğinde hamburger menüdeki nokta kayboluyor mu?

### Developer Test

```javascript
// Browser console'da test et
import { clearVisitedCategories } from './utils/visitedCategories'

// 1. Tüm ziyaret kayıtlarını temizle
clearVisitedCategories()

// 2. localStorage'ı kontrol et
localStorage.getItem('mossaique_visited_categories')  // null olmalı

// 3. Sayfayı yenile → Tüm mavi noktalar geri gelmeli
```

---

## Sonuç

Mossaique'in yeni kaynak notifikasyon sistemi, **minimal dependencies**, **event-driven architecture** ve **localStorage persistence** kullanarak kullanıcı deneyimini artıran etkili bir çözüm sunar.

### Temel Başarılar:

- ✅ %0 backend bağımlılığı
- ✅ Reaktif ve senkronize UI
- ✅ Kalıcı kullanıcı tercihleri
- ✅ Modüler ve test edilebilir kod
- ✅ Minimal performans overhead

### Dosya Haritası:

```
src/
├── data/
│   ├── icons.json          # "new": true alanı
│   └── ai.json             # Diğer kategoriler
├── utils/
│   ├── newResources.js     # Kontrol fonksiyonları
│   └── visitedCategories.js # localStorage yönetimi
├── components/
│   ├── MenuDesktop.jsx     # Sol sidebar (kategori bazlı)
│   └── Navigation.jsx      # Üst bar (genel notifikasyon)
└── pages/
    └── Category.jsx        # Ziyaret işaretleme
```

**Rapor Tarihi:** 2025-11-16
**Versiyon:** 1.0
**Yazar:** Claude Code
