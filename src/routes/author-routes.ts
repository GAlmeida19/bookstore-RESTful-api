// src/routes/author-routes.ts
import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from "../controllers/author-controller";

const router = Router();

router.get("/authors", getAuthors);
router.get("/authors/:id", getAuthorById);
router.post("/authors", createAuthor);
router.delete("/authors/:id", deleteAuthor);
router.put("/authors/:id", updateAuthor);

export default router;
