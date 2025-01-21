import { DataSource } from "typeorm";

import config from "../config";
import { Organization } from "../entities/organization";
import { Staff } from "../entities/staff";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: true,
  logging: false,
  entities: [Organization, Staff],
  subscribers: [],
  migrations: ["src/migrations/**/*.ts"],

  ...(config.app.isProduction
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
  extra: {
    connectionTimeoutMillis: 10000,
    idle_in_transaction_session_timeout: 30000,
  },
});
