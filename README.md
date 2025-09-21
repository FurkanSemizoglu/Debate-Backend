# Debate Backend

Bu proje, tartışma/münazara uygulaması için geliştirilmiş bir NestJS backend API'sidir. Kullanıcılar tartışma konuları oluşturabilir, tartışma odalarına katılabilir ve bu odalarda münazara yapabilirler.

## 🚀 Teknolojiler

- **Framework**: NestJS
- **Veritabanı**: PostgreSQL
- **ORM**: Prisma
- **Kimlik Doğrulama**: JWT
- **Şifreleme**: Bcrypt
- **Validation**: Class Validator

## 📋 Proje Yapısı

```
src/
├── common/                  # Ortak bileşenler
│   ├── filters/            # Exception filtreleri
│   ├── guards/             # JWT kimlik doğrulama guard'ları
│   ├── interceptors/       # Response interceptor'ları
│   └── services/           # JWT token servisi
├── config/                 # Konfigürasyon dosyaları
├── modules/
│   ├── auth/              # Kimlik doğrulama modülü
│   ├── debate/            # Tartışma yönetimi modülü
│   ├── debate-room/       # Tartışma odası modülü
│   └── user/              # Kullanıcı modülü
└── prisma/                # Prisma servisi
```

## 🗄️ Veritabanı Modelleri

- **User**: Kullanıcı bilgileri
- **Debate**: Tartışma konuları
- **DebateRoom**: Tartışma odaları
- **DebateParticipant**: Tartışma katılımcıları
- **RefreshToken**: JWT refresh token'ları

## 🔧 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Veritabanı URL'sini `.env` dosyasında ayarlayın:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/debate_db"
```

3. Prisma migration'larını çalıştırın:
```bash
npx prisma migrate dev
```

4. Uygulamayı başlatın:
```bash
# Development modu
npm run start:dev

# Production modu
npm run start:prod
```

## 📡 API Endpointleri

### 🔐 Authentication (`/auth`)

| Method | Endpoint | Açıklama | Auth |
|--------|----------|----------|------|
| POST | `/auth/register` | Yeni kullanıcı kaydı | ❌ |
| POST | `/auth/login` | Kullanıcı girişi | ❌ |
| POST | `/auth/refresh` | Token yenileme | ❌ |
| POST | `/auth/logout` | Kullanıcı çıkışı | ✅ |
| GET | `/auth/profile` | Kullanıcı profili | ✅ |

### 💬 Debates (`/debates`)

| Method | Endpoint | Açıklama | Auth |
|--------|----------|----------|------|
| POST | `/debates/createDebate` | Yeni tartışma oluştur | ✅ |
| GET | `/debates/getAllDebates` | Tüm tartışmaları listele | ❌ |
| GET | `/debates/getUsersDebates` | Kullanıcının tartışmaları | ✅ |
| GET | `/debates/getDebate/:id` | Belirli bir tartışmayı getir | ❌ |
| PATCH | `/debates/updateDebate/:id` | Tartışmayı güncelle | ✅ |
| DELETE | `/debates/deleteDebate/:id` | Tartışmayı sil | ✅ |

### 🏠 Debate Rooms (`/debateRooms`)

| Method | Endpoint | Açıklama | Auth |
|--------|----------|----------|------|
| POST | `/debateRooms/create` | Yeni tartışma odası oluştur | ✅ |
| POST | `/debateRooms/join` | Tartışma odasına katıl | ✅ |
| POST | `/debateRooms/:roomId/leave` | Tartışma odasından ayrıl | ✅ |
| GET | `/debateRooms/debate/:debateId` | Tartışmaya ait odaları listele | ❌ |
| GET | `/debateRooms/:roomId` | Belirli bir odanın detayları | ❌ |
| GET | `/debateRooms` | Tüm odaları listele | ❌ |
| PATCH | `/debateRooms/:roomId/status` | Oda durumunu güncelle | ✅ |

## 🔄 Tartışma Kategorileri

- GENERAL (Genel)
- POLITICS (Siyaset)  
- TECHNOLOGY (Teknoloji)
- SCIENCE (Bilim)
- SPORTS (Spor)
- ENTERTAINMENT (Eğlence)
- EDUCATION (Eğitim)
- HEALTH (Sağlık)
- ENVIRONMENT (Çevre)
- BUSINESS (İş)
- PHILOSOPHY (Felsefe)
- SOCIAL_ISSUES (Sosyal Konular)

## 📊 Durumlar

### Tartışma Durumları
- **PENDING**: Beklemede
- **LIVE**: Canlı
- **FINISHED**: Tamamlandı

### Oda Durumları
- **WAITING**: Bekliyor
- **LIVE**: Canlı
- **FINISHED**: Tamamlandı

### Katılımcı Rolleri
- **PROPOSER**: Fikri savunan
- **OPPONENT**: Fikri reddeden
- **AUDIENCE**: İzleyici

## 🛠️ Development Komutları

```bash
# Geliştirme modunda çalıştır
npm run start:dev

# Test çalıştır
npm run test

# Linting
npm run lint

# Format kodları
npm run format

# Production build
npm run build
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.