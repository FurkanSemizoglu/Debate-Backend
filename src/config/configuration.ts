export interface AppConfig {
  port: number;
  cors: {
    origins: string[];
    methods: string[];
    allowedHeaders: string[];
    credentials: boolean;
  };
}

export interface JwtConfig {
  secret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface DatabaseConfig {
  url: string;
}

export interface Config {
  app: AppConfig;
  jwt: JwtConfig;
  database: DatabaseConfig;
}

export default (): Config => ({
  app: {
    port: parseInt(process.env.PORT ?? '3001', 10),
    cors: {
      origins: process.env.CORS_ORIGINS?.split(',') || [
        'http://localhost:3000',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      (() => {
        throw new Error('JWT_SECRET is required');
      })(),
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '7d',
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
});
