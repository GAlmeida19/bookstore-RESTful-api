import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Book } from "../entities/book-entity";

/**
 *
 * @param req
 * @param res
 */
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await AppDataSource.getRepository(Book).find({
      relations: ["author"],
    });

    res.status(200).json(books);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message
      res.status(500).json({ error: error.message });
    } else {
      console.error("An unknown error occurred");
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// src/controllers/book-controller.ts
import { Author } from "../entities/author-entity";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const createBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, authorId, price, publishedDate } = req.body;

    if (!authorId) {
      return res.status(400).json({ error: "Author ID is required" });
    }

    const author = await AppDataSource.getRepository(Author).findOne({
      where: { id: authorId },
    });

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const book = new Book();
    book.title = title;
    book.price = price;
    book.publishedDate = new Date(publishedDate);
    book.author = author;

    const result = await AppDataSource.getRepository(Book).save(book);

    res.status(201).json({
      id: result.id,
      title: result.title,
      price: result.price,
      publishedDate: result.publishedDate,
      author: {
        id: result.author.id,
        name: result.author.name,
        age: result.author.age,
        description: result.author.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const book = await AppDataSource.getRepository(Book).findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!book) {
      res.status(404).json({ error: `Book with id ${id} not found` });
      return;
    }

    res.status(200).json(book);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error("An unknown error occurred");
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find the book by ID
    const book = await AppDataSource.getRepository(Book).findOne({
      where: { id: parseInt(id, 10) }, // Convert ID to integer
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    // Delete the book from the database
    await AppDataSource.getRepository(Book).remove(book);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, authorId, price, publishedDate } = req.body;

    const book = await AppDataSource.getRepository(Book).findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    book.title = title || book.title;
    book.price = price || book.price;
    book.publishedDate = publishedDate || book.publishedDate;
    book.author = authorId || book.author;

    const updatedBook = await AppDataSource.getRepository(Book).save(book);
    res.status(200).json(updatedBook);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
