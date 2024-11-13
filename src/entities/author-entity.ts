// src/entities/author-entity.ts
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Book } from "./book-entity"; // Import the Book entity for the relation

@Unique(["name"])
@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("int")
  age!: number;

  @Column("text")
  description!: string;

  // One Author can have many Books
  @OneToMany(() => Book, (book) => book.author)
  books!: Book[];
}
