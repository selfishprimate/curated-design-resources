# HMR (Hot Module Replacement)

## Nedir?

**HMR** = **Hot Module Replacement** (Modül Anında Değiştirme)

Vite, Webpack gibi modern geliştirme araçlarının sunduğu bir özelliktir. Geliştirme sırasında kodda yaptığınız değişikliklerin tarayıcıda anında yansımasını sağlar.

## Nasıl Çalışır?

### HMR ile:
- ✅ Tarayıcı sayfayı yenilemeden güncellenir
- ✅ Uygulama durumu korunur (state, form değerleri kaybolmaz)
- ✅ Sadece değişen component/dosya güncellenir
- ✅ Çok hızlı (milisaniyeler içinde)
- ✅ Geliştirme deneyimi çok daha akıcı

### HMR olmadan (Geleneksel Yöntem):
- ❌ Her değişiklikte sayfa tamamen yenilenir (full page reload)
- ❌ Tüm state sıfırlanır
- ❌ Form değerleri kaybolur
- ❌ Daha yavaş
- ❌ Geliştirme sırasında context kaybolur

## Örnek Senaryo

Bir form dolduruyorsunuz ve CSS'te bir renk değiştirmek istiyorsunuz:

**HMR olmadan:**
1. CSS'i değiştirirsiniz
2. Sayfa tamamen yenilenir
3. Form boşalır
4. Formu tekrar doldurmanız gerekir

**HMR ile:**
1. CSS'i değiştirirsiniz
2. Sadece stil anında güncellenir
3. Form değerleri aynen kalır
4. Çalışmaya devam edersiniz

## Vite Dev Server'da HMR

Kod değişikliği yaptığınızda terminal çıktısında şöyle mesajlar görürsünüz:

```
[vite] (client) hmr update /src/components/Header.jsx
[vite] (client) hmr update /src/index.css
```

Bu mesajlar, değişikliklerin sayfa yenilenmeden anında uygulandığını gösterir.

## React'te HMR

React component'lerinde HMR şu şekilde çalışır:

1. **Component güncellenir** - Değişiklik yaptığınız component yeniden render edilir
2. **State korunur** - Component'in mevcut state'i kaybolmaz
3. **Props korunur** - Parent'tan gelen props'lar değişmez
4. **Event handler'lar güncellenir** - Yeni kod anında aktif olur

### Dikkat Edilmesi Gerekenler

HMR bazı durumlarda tam çalışmayabilir:

- ❌ Component dışında modül-seviyesinde değişkenler güncellenmeyebilir
- ❌ Class component'lerde state bazen kaybolabilir (function component'ler daha iyi)
- ❌ Context Provider değişikliklerinde manuel refresh gerekebilir

Bu durumlarda tarayıcıyı manuel olarak yenilemeniz gerekebilir.

## Vite'te HMR API

Vite, HMR için özel bir API sunar:

```javascript
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // Custom HMR handler
  })
}
```

Ancak React projelerinde `@vitejs/plugin-react` bu işi otomatik olarak halleder.

## Performans

- **Geliştirme Hızı:** Değişiklikler 50-200ms içinde yansır
- **Dosya Boyutu:** Sadece değişen modül transfer edilir
- **Network:** Minimum veri trafiği

## Faydalı Linkler

- [Vite HMR API](https://vitejs.dev/guide/api-hmr.html)
- [Webpack HMR Concepts](https://webpack.js.org/concepts/hot-module-replacement/)
- [React Fast Refresh](https://github.com/facebook/react/tree/main/packages/react-refresh)
