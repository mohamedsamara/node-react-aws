interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

const databaseConfig: DatabaseConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  name: process.env.DB_NAME || "node-react-aws",
};

export default databaseConfig;
