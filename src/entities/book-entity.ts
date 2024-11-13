import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Author } from "./author-entity";

@Unique(["title"])
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("float")
  price!: number;

  @Column()
  publishedDate!: Date;

  @ManyToOne(() => Author, (author) => author.books)
  author!: Author;
}
