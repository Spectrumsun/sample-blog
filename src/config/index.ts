import dotenv from 'dotenv';
dotenv.config();

const config = {
  DATABASE: process.env.DATABASE_URL,
  PORT: process.env.PORT || 6000,
  SECRET_KEY: process.env.SECRET_KEY
}

export default config;