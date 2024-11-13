import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import authorRoutes from "./routes/author-routes"; // Import Author routes
import bookRoutes from "./routes/book-routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", bookRoutes);
app.use("/api", authorRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
