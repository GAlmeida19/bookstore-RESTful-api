import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Author } from "../entities/author-entity";
import { Book } from "../entities/book-entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Book, Author],
  synchronize: true,
  logging: true,
  migrations: ["src/migrations/*.ts"],
});
