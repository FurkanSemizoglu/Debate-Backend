# Debate Backend

This project is a NestJS backend API developed for a debate/discussion application. Users can create debate topics, join debate rooms, and participate in discussions within these rooms.

## 🚀 Technologies

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Encryption**: Bcrypt
- **Validation**: Class Validator

## 📋 Project Structure

```
src/
├── common/                  # Common components
│   ├── filters/            # Exception filters
│   ├── guards/             # JWT authentication guards
│   ├── interceptors/       # Response interceptors
│   └── services/           # JWT token service
├── config/                 # Configuration files
├── modules/
│   ├── auth/              # Authentication module
│   ├── debate/            # Debate management module
│   ├── debate-room/       # Debate room module
│   └── user/              # User module
└── prisma/                # Prisma service
```

## 🗄️ Database Models

- **User**: User information
- **Debate**: Debate topics
- **DebateRoom**: Debate rooms
- **DebateParticipant**: Debate participants
- **RefreshToken**: JWT refresh tokens

## 🔧 Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database URL in the `.env` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/debate_db"
```

3. Run Prisma migrations:
```bash
npx prisma migrate dev
```

4. Start the application:
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## 📡 API Endpoints

### 🔐 Authentication (`/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | New user registration | ❌ |
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/refresh` | Token refresh | ❌ |
| POST | `/auth/logout` | User logout | ✅ |
| GET | `/auth/profile` | User profile | ✅ |

### 💬 Debates (`/debates`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/debates/createDebate` | Create new debate | ✅ |
| GET | `/debates/getAllDebates` | List all debates | ❌ |
| GET | `/debates/getUsersDebates` | User's debates | ✅ |
| GET | `/debates/getDebate/:id` | Get specific debate | ❌ |
| PATCH | `/debates/updateDebate/:id` | Update debate | ✅ |
| DELETE | `/debates/deleteDebate/:id` | Delete debate | ✅ |

### 🏠 Debate Rooms (`/debateRooms`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/debateRooms/create` | Create new debate room | ✅ |
| POST | `/debateRooms/join` | Join debate room | ✅ |
| POST | `/debateRooms/:roomId/leave` | Leave debate room | ✅ |
| GET | `/debateRooms/debate/:debateId` | List rooms for debate | ❌ |
| GET | `/debateRooms/:roomId` | Get specific room details | ❌ |
| GET | `/debateRooms` | List all rooms | ❌ |
| PATCH | `/debateRooms/:roomId/status` | Update room status | ✅ |

## 🔄 Debate Categories

- GENERAL
- POLITICS  
- TECHNOLOGY
- SCIENCE
- SPORTS
- ENTERTAINMENT
- EDUCATION
- HEALTH
- ENVIRONMENT
- BUSINESS
- PHILOSOPHY
- SOCIAL_ISSUES

## 📊 Status Types

### Debate Status
- **PENDING**: Pending
- **LIVE**: Live
- **FINISHED**: Finished

### Room Status
- **WAITING**: Waiting
- **LIVE**: Live
- **FINISHED**: Finished

### Participant Roles
- **PROPOSER**: Defender of the idea
- **OPPONENT**: Opponent of the idea
- **AUDIENCE**: Audience

## 🛠️ Development Commands

```bash
# Run in development mode
npm run start:dev

# Run tests
npm run test

# Linting
npm run lint

# Format code
npm run format

# Production build
npm run build
```

## 📝 License

This project is licensed under the MIT License.