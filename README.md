# 🎯 Debate Backend API<p align="center">

  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

A modern backend API for debate management system built with NestJS, PostgreSQL, and Prisma.</p>



## 🚀 Features[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

### ✅ Implemented

- **User Authentication & Authorization**  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

  - JWT-based authentication with access/refresh tokens    <p align="center">

  - User registration and login<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

  - Secure password hashing with bcrypt<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

  - Protected routes with JWT guards<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

- **Debate Management**<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>

  - Create and manage debates with categories<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>

  - Join/leave debates<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>

  - Update debate status and details  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>

  - Paginated debate listings    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>

  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>

- **Debate Room System**</p>

  - Create debate rooms for specific debates  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)

  - Join rooms with different roles (Proposer, Opponent, Audience)  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

  - Room status management (Waiting, Live, Finished)

  - Participant tracking and management## Description



- **Robust Architecture**[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

  - Global exception handling with custom filters

  - Consistent API response format with interceptors## Project setup

  - Type-safe database operations with Prisma

  - Modular NestJS architecture```bash

  - Environment-based configuration$ npm install

```

### 🔧 Technical Stack

- **Framework**: NestJS (Node.js)## Compile and run the project

- **Database**: PostgreSQL with Prisma ORM

- **Authentication**: JWT tokens```bash

- **Validation**: class-validator decorators# development

- **Architecture**: Clean architecture with separation of concerns$ npm run start



## 📋 Prerequisites# watch mode

$ npm run start:dev

- Node.js (v18 or higher)

- PostgreSQL database# production mode

- npm or yarn package manager$ npm run start:prod

```

## 🛠️ Installation

## Run tests

1. **Clone the repository**

```bash```bash

git clone <repository-url># unit tests

cd debate-backend$ npm run test

```

# e2e tests

2. **Install dependencies**$ npm run test:e2e

```bash

npm install# test coverage

```$ npm run test:cov

```

3. **Environment setup**

```bash## Deployment

# Copy and configure environment variables

cp .env.example .envWhen you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

```

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

Required environment variables:

```env```bash

DATABASE_URL="postgresql://user:password@localhost:5432/debate_db?schema=public"$ npm install -g @nestjs/mau

JWT_SECRET="your-super-secure-jwt-secret-key"$ mau deploy

PORT=3001```

CORS_ORIGINS="http://localhost:3000"

```With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.



4. **Database setup**## Resources

```bash

# Generate Prisma clientCheck out a few resources that may come in handy when working with NestJS:

npx prisma generate

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

# Run database migrations- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

npx prisma migrate dev- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).

```- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

## 🏃‍♂️ Running the Application- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

```bash- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

# Development mode

npm run start:dev## Support



# Production modeNest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

npm run start:prod

## Stay in touch

# Debug mode

npm run start:debug- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

```- Website - [https://nestjs.com](https://nestjs.com/)

- Twitter - [@nestframework](https://twitter.com/nestframework)

The API will be available at `http://localhost:3001`

## License

## 📚 API Endpoints

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile

### Debates
- `GET /debates/getAllDebates` - List all debates (with pagination)
- `GET /debates/getUsersDebates` - Get user's debates
- `GET /debates/getDebate/:id` - Get specific debate
- `POST /debates/createDebate` - Create new debate (protected)
- `PATCH /debates/updateDebate/:id` - Update debate (protected)
- `DELETE /debates/deleteDebate/:id` - Delete debate (protected)

### Debate Rooms
- `GET /debateRooms` - List all rooms
- `GET /debateRooms/debate/:debateId` - Get rooms for specific debate
- `GET /debateRooms/:roomId` - Get room details
- `POST /debateRooms/create` - Create new room (protected)
- `POST /debateRooms/join` - Join a room (protected)
- `POST /debateRooms/:roomId/leave` - Leave a room (protected)
- `PATCH /debateRooms/:roomId/status` - Update room status (protected)

## 📊 Database Schema

### Core Models
- **User**: User accounts with authentication
- **Debate**: Main debate entities with categories
- **DebateRoom**: Individual debate sessions
- **DebateParticipant**: Room participation tracking
- **RefreshToken**: JWT refresh token management

### Enums
- **DebateCategory**: General, Politics, Technology, Science, etc.
- **DebateStatus**: Pending, Live, Finished
- **RoomStatus**: Waiting, Live, Finished
- **ParticipantRole**: Proposer, Opponent, Audience

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- CORS configuration
- Input validation and sanitization
- Error handling without sensitive data exposure

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Development Notes

- Uses TypeScript for type safety
- Follows NestJS best practices and conventions
- Implements clean architecture principles
- Database migrations handled by Prisma
- Comprehensive error handling and logging

## 🔄 API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "statusCode": 200,
  "timestamp": "2025-09-21T09:16:43.608Z",
  "path": "/debates/getAllDebates",
  "method": "GET",
  "data": {...},
  "message": "Data retrieved successfully"
}
```

Error responses:
```json
{
  "statusCode": 400,
  "timestamp": "2025-09-21T09:16:43.608Z",
  "path": "/auth/login",
  "method": "POST",
  "message": "Invalid credentials",
  "error": "Bad Request"
}
```

## 🚧 Development Status

This is an active development project. Current implementation focuses on core debate management functionality with room-based architecture.

## 📄 License

This project is [MIT licensed](LICENSE).