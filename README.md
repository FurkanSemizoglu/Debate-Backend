<div align="center"><div align="center">



# 🎯 Debate Backend API# 🎯 Debate Backend API



**A modern REST API for debate management system****A modern REST API for debate management system**



Built with **NestJS** • **PostgreSQL** • **Prisma ORM**Built with **NestJS** • **PostgreSQL** • **Prisma ORM**



[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

[![NestJS](https://img.shields.io/badge/NestJS-10.0+-red.svg)](https://nestjs.com/)[![NestJS](https://img.shields.io/badge/NestJS-10.0+-red.svg)](https://nestjs.com/)

[![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748.svg)](https://www.prisma.io/)[![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748.svg)](https://www.prisma.io/)



</div></div>



------



## 🚀 Features## 🚀 Features



<div align="center"><div align="center">



### 🔐 Authentication & Authorization### 🔐 Authentication & Authorization

JWT-based authentication • User registration & login • Secure password hashing • Protected routesJWT-based authentication • User registration & login • Secure password hashing • Protected routes



### 💬 Debate Management  ### 💬 Debate Management  

Create & manage debates • Multiple categories • Join/leave functionality • Status trackingCreate & manage debates • Multiple categories • Join/leave functionality • Status tracking



### 🏛️ Debate Room System### 🏛️ Debate Room System

Room creation • Multi-role participation • Real-time status • Participant managementRoom creation • Multi-role participation • Real-time status • Participant management



### 🏗️ Robust Architecture### 🏗️ Robust Architecture

Global exception handling • Consistent API responses • Type-safe operations • Modular designGlobal exception handling • Consistent API responses • Type-safe operations • Modular design



</div></div>



---  - Create debate rooms for specific debates  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)



## 🛠️ Tech Stack  - Join rooms with different roles (Proposer, Opponent, Audience)  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



<table align="center">  - Room status management (Waiting, Live, Finished)

<tr>

<td align="center" width="96">  - Participant tracking and management## Description

<img src="https://nestjs.com/img/logo-small.svg" width="48" height="48" alt="NestJS" />

<br><strong>NestJS</strong>

</td>

<td align="center" width="96">- **Robust Architecture**[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" width="48" height="48" alt="PostgreSQL" />

<br><strong>PostgreSQL</strong>  - Global exception handling with custom filters

</td>

<td align="center" width="96">  - Consistent API response format with interceptors## Project setup

<img src="https://www.prisma.io/images/favicon-32x32.png" width="48" height="48" alt="Prisma" />

<br><strong>Prisma</strong>  - Type-safe database operations with Prisma

</td>

<td align="center" width="96">  - Modular NestJS architecture```bash

<img src="https://jwt.io/img/pic_logo.svg" width="48" height="48" alt="JWT" />

<br><strong>JWT</strong>  - Environment-based configuration$ npm install

</td>

</tr>```

</table>

### 🔧 Technical Stack

---

- **Framework**: NestJS (Node.js)## Compile and run the project

## 📋 Prerequisites

- **Database**: PostgreSQL with Prisma ORM

- **Node.js** v18 or higher

- **PostgreSQL** database- **Authentication**: JWT tokens```bash

- **npm** or **yarn** package manager

- **Validation**: class-validator decorators# development

---

- **Architecture**: Clean architecture with separation of concerns$ npm run start

## 🚀 Quick Start



### 1️⃣ Clone & Install

```bash## 📋 Prerequisites# watch mode

git clone https://github.com/FurkanSemizoglu/Debate-Backend.git

cd debate-backend$ npm run start:dev

npm install

```- Node.js (v18 or higher)



### 2️⃣ Environment Setup- PostgreSQL database# production mode

```bash

# Copy environment file- npm or yarn package manager$ npm run start:prod

cp .env.example .env

``````



**Required environment variables:**## 🛠️ Installation

```env

DATABASE_URL="postgresql://user:password@localhost:5432/debate_db"## Run tests

JWT_SECRET="your-super-secure-jwt-secret-key"

PORT=30011. **Clone the repository**

CORS_ORIGINS="http://localhost:3000"

``````bash```bash



### 3️⃣ Database Setupgit clone <repository-url># unit tests

```bash

# Generate Prisma clientcd debate-backend$ npm run test

npx prisma generate

```

# Run migrations

npx prisma migrate dev# e2e tests

```

2. **Install dependencies**$ npm run test:e2e

### 4️⃣ Start Development Server

```bash```bash

# Development mode with hot reload

npm run start:devnpm install# test coverage



# Production mode```$ npm run test:cov

npm run start:prod

``````



🎉 **API will be available at:** `http://localhost:3001`3. **Environment setup**



---```bash## Deployment



## 📚 API Documentation# Copy and configure environment variables



### 🔐 Authentication Endpointscp .env.example .envWhen you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.



| Method | Endpoint | Description | Auth Required |```

|--------|----------|-------------|---------------|

| `POST` | `/auth/register` | User registration | ❌ |If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

| `POST` | `/auth/login` | User login | ❌ |

| `POST` | `/auth/refresh` | Refresh access token | ❌ |Required environment variables:

| `POST` | `/auth/logout` | User logout | ✅ |

| `GET` | `/auth/profile` | Get user profile | ✅ |```env```bash



### 💬 Debate EndpointsDATABASE_URL="postgresql://user:password@localhost:5432/debate_db?schema=public"$ npm install -g @nestjs/mau



| Method | Endpoint | Description | Auth Required |JWT_SECRET="your-super-secure-jwt-secret-key"$ mau deploy

|--------|----------|-------------|---------------|

| `GET` | `/debates/getAllDebates` | List all debates (paginated) | ❌ |PORT=3001```

| `GET` | `/debates/getUsersDebates` | Get user's debates | ✅ |

| `GET` | `/debates/getDebate/:id` | Get specific debate | ❌ |CORS_ORIGINS="http://localhost:3000"

| `POST` | `/debates/createDebate` | Create new debate | ✅ |

| `PATCH` | `/debates/updateDebate/:id` | Update debate | ✅ |```With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

| `DELETE` | `/debates/deleteDebate/:id` | Delete debate | ✅ |



### 🏛️ Debate Room Endpoints

4. **Database setup**## Resources

| Method | Endpoint | Description | Auth Required |

|--------|----------|-------------|---------------|```bash

| `GET` | `/debateRooms` | List all rooms | ❌ |

| `GET` | `/debateRooms/debate/:debateId` | Get rooms for debate | ❌ |# Generate Prisma clientCheck out a few resources that may come in handy when working with NestJS:

| `GET` | `/debateRooms/:roomId` | Get room details | ❌ |

| `POST` | `/debateRooms/create` | Create new room | ✅ |npx prisma generate

| `POST` | `/debateRooms/join` | Join a room | ✅ |

| `POST` | `/debateRooms/:roomId/leave` | Leave a room | ✅ |- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

| `PATCH` | `/debateRooms/:roomId/status` | Update room status | ✅ |

# Run database migrations- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

---

npx prisma migrate dev- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).

## 📊 Database Schema

```- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

<div align="center">

- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

```mermaid

erDiagram## 🏃‍♂️ Running the Application- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

    User ||--o{ Debate : creates

    User ||--o{ RefreshToken : has- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

    User ||--o{ DebateParticipant : participates

    Debate ||--o{ DebateRoom : contains```bash- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

    DebateRoom ||--o{ DebateParticipant : has

    # Development mode

    User {

        int id PKnpm run start:dev## Support

        string email UK

        string password

        string fullName

        datetime createdAt# Production modeNest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

        datetime updatedAt

    }npm run start:prod

    

    Debate {## Stay in touch

        int id PK

        string title# Debug mode

        string description

        enum categorynpm run start:debug- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

        enum status

        int creatorId FK```- Website - [https://nestjs.com](https://nestjs.com/)

        datetime createdAt

        datetime updatedAt- Twitter - [@nestframework](https://twitter.com/nestframework)

    }

    The API will be available at `http://localhost:3001`

    DebateRoom {

        int id PK## License

        string name

        enum status## 📚 API Endpoints

        int debateId FK

        int creatorId FKNest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

        datetime createdAt

        datetime updatedAt### Authentication

    }- `POST /auth/register` - User registration

    - `POST /auth/login` - User login

    DebateParticipant {- `POST /auth/refresh` - Refresh access token

        int id PK- `POST /auth/logout` - User logout

        int userId FK- `GET /auth/profile` - Get user profile

        int roomId FK

        enum role### Debates

        datetime joinedAt- `GET /debates/getAllDebates` - List all debates (with pagination)

    }- `GET /debates/getUsersDebates` - Get user's debates

```- `GET /debates/getDebate/:id` - Get specific debate

- `POST /debates/createDebate` - Create new debate (protected)

</div>- `PATCH /debates/updateDebate/:id` - Update debate (protected)

- `DELETE /debates/deleteDebate/:id` - Delete debate (protected)

---

### Debate Rooms

## 🔒 API Response Format- `GET /debateRooms` - List all rooms

- `GET /debateRooms/debate/:debateId` - Get rooms for specific debate

### ✅ Success Response- `GET /debateRooms/:roomId` - Get room details

```json- `POST /debateRooms/create` - Create new room (protected)

{- `POST /debateRooms/join` - Join a room (protected)

  "success": true,- `POST /debateRooms/:roomId/leave` - Leave a room (protected)

  "statusCode": 200,- `PATCH /debateRooms/:roomId/status` - Update room status (protected)

  "timestamp": "2025-09-21T09:16:43.608Z",

  "path": "/debates/getAllDebates",## 📊 Database Schema

  "method": "GET",

  "data": {### Core Models

    "debates": [...],- **User**: User accounts with authentication

    "pagination": {- **Debate**: Main debate entities with categories

      "page": 1,- **DebateRoom**: Individual debate sessions

      "limit": 10,- **DebateParticipant**: Room participation tracking

      "total": 25- **RefreshToken**: JWT refresh token management

    }

  },### Enums

  "message": "Data retrieved successfully"- **DebateCategory**: General, Politics, Technology, Science, etc.

}- **DebateStatus**: Pending, Live, Finished

```- **RoomStatus**: Waiting, Live, Finished

- **ParticipantRole**: Proposer, Opponent, Audience

### ❌ Error Response

```json## 🔒 Security Features

{

  "statusCode": 400,- JWT-based authentication with refresh tokens

  "timestamp": "2025-09-21T09:16:43.608Z",- Password hashing with bcrypt

  "path": "/auth/login",- CORS configuration

  "method": "POST",- Input validation and sanitization

  "message": "Invalid credentials",- Error handling without sensitive data exposure

  "error": "Bad Request"

}## 🧪 Testing

```

```bash

---# Unit tests

npm run test

## 🧪 Testing

# E2E tests

```bashnpm run test:e2e

# Run unit tests

npm run test# Test coverage

npm run test:cov

# Run e2e tests```

npm run test:e2e

## 📝 Development Notes

# Run test coverage

npm run test:cov- Uses TypeScript for type safety

- Follows NestJS best practices and conventions

# Run specific test file- Implements clean architecture principles

npm run test auth.service.spec.ts- Database migrations handled by Prisma

```- Comprehensive error handling and logging



---## 🔄 API Response Format



## 📁 Project StructureAll API responses follow a consistent format:



``````json

src/{

├── common/               # Shared utilities  "success": true,

│   ├── guards/          # JWT Auth guards  "statusCode": 200,

│   ├── filters/         # Exception filters  "timestamp": "2025-09-21T09:16:43.608Z",

│   └── interceptors/    # Response interceptors  "path": "/debates/getAllDebates",

├── config/              # Configuration files  "method": "GET",

├── modules/             # Feature modules  "data": {...},

│   ├── auth/           # Authentication module  "message": "Data retrieved successfully"

│   ├── debate/         # Debate management}

│   ├── debate-room/    # Room management```

│   └── user/           # User management

└── prisma/             # Database serviceError responses:

``````json

{

---  "statusCode": 400,

  "timestamp": "2025-09-21T09:16:43.608Z",

## 🚧 Development Status  "path": "/auth/login",

  "method": "POST",

<div align="center">  "message": "Invalid credentials",

  "error": "Bad Request"

**Current Phase:** Core API Development ✅}

```

| Feature | Status |

|---------|--------|## 🚧 Development Status

| Authentication System | ✅ Complete |

| Debate Management | ✅ Complete |This is an active development project. Current implementation focuses on core debate management functionality with room-based architecture.

| Room System | ✅ Complete |

| Global Error Handling | ✅ Complete |## 📄 License

| API Documentation | ✅ Complete |

| Unit Testing | 🟡 In Progress |This project is [MIT licensed](LICENSE).
| Real-time Features | ⏳ Planned |

</div>

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is **MIT** licensed. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Furkan Semizoglu](https://github.com/FurkanSemizoglu)**

[![GitHub](https://img.shields.io/badge/GitHub-FurkanSemizoglu-black?style=flat&logo=github)](https://github.com/FurkanSemizoglu)

</div>