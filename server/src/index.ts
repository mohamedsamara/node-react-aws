import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { AppDataSource } from "./database/data-source";
import routes from "./routes";
import config from "./config";

const app = express();
const port = config.app.port;

app.use(cors({}));
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Connect to the database
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    app.use(routes);

    // Start the server
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit if DB connection fails
  });
