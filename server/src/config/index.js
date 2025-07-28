import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

let DATABASE_URL;
if (NODE_ENV === "local") {
  DATABASE_URL = process.env.MONGODB_URL_LOCAL;
} else if (NODE_ENV === "development") {
  DATABASE_URL = process.env.MONGODB_URL_DEV;
} else if (NODE_ENV === "production") {
  DATABASE_URL = process.env.MONGODB_URL_PROD;
} else {
  throw new Error(
    `Unknown NODE_ENV ${NODE_ENV}. Expected "local", "development", or "production"`
  );
}

["PORT_URL", "JWT_SECRET_CODE", "JWT_REFRESH_SECRET_CODE"].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});
const config = {
  NODE_ENV,
  DATABASE_URL,
  PORT: process.env.PORT_URL,
  JWT_SECRET: process.env.JWT_SECRET_CODE,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET_CODE,
};

export default config;
