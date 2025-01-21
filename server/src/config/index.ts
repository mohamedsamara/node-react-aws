import databaseConfig from "./database";

interface AppConfig {
  port: number;
  isProduction: boolean;
}

const config = {
  app: {
    port: Number(process.env.PORT) || 3000,
    isProduction: process.env.NODE_ENV === "production",
  } as AppConfig,
  database: databaseConfig,
};

export default config;
