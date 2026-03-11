import dotenv from 'dotenv';

dotenv.config({
  path: ['.env', '.env.local', '.env.production', '.env.example'],
});

export default () => ({
  app: {
    port: parseInt(process.env.PORT as string, 10),
    nodeEnv: process.env.NODE_ENV,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  },
  crypto: {
    secretKey: process.env.SECRET_KEY,
    secretKeyIv: process.env.SECRET_KEY_IV,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string, 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },
});
