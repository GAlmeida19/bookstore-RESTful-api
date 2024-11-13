// src/controllers/author-controller.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Author } from "../entities/author-entity";

export const getAuthors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch authors with their associated books
    const authors = await AppDataSource.getRepository(Author).find({
      relations: ["books"], // This will fetch the associated books for each author
    });

    // Format the response to include authors and their books
    const response = authors.map((author) => ({
      id: author.id,
      name: author.name,
      age: author.age,
      description: author.description,
      books: author.books.map((book) => ({
        id: book.id,
        title: book.title,
        price: book.price,
        publishedDate: book.publishedDate,
      })),
    }));

    // Send the response
    res.status(200).json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getAuthorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const author = await AppDataSource.getRepository(Author).findOne({
      where: { id: parseInt(id, 10) },
      relations: ["books"], // Fetch related books as well
    });
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, age, description } = req.body;
    const author = new Author();
    author.name = name;
    author.age = age;
    author.description = description;

    const result = await AppDataSource.getRepository(Author).save(author);
    res.status(201).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// DELETE: Delete an Author by ID
export const deleteAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find the author by ID
    const author = await AppDataSource.getRepository(Author).findOne({
      where: { id: parseInt(id, 10) }, // Convert ID to integer
    });

    if (!author) {
      res.status(404).json({ error: "Author not found" });
      return;
    }

    // Delete the author from the database
    await AppDataSource.getRepository(Author).remove(author);
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// PUT: Update an Author by ID
export const updateAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, age, description } = req.body;

    // Find the author by ID
    const author = await AppDataSource.getRepository(Author).findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!author) {
      res.status(404).json({ error: "Author not found" });
      return;
    }

    // Update the author's properties
    author.name = name || author.name; // Only update if value provided
    author.age = age || author.age;
    author.description = description || author.description;

    // Save the updated author
    const updatedAuthor = await AppDataSource.getRepository(Author).save(
      author
    );
    res.status(200).json(updatedAuthor);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
