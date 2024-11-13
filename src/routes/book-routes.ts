import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/book-controller";

const router = Router();

router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.post("/books", createBook);
router.delete("/books/:id", deleteBook); // Delete book by ID
router.put("/books/:id", updateBook);

export default router;
