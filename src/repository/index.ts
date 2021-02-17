import HttpStatusCode from "http-status-codes";

import { httpErrorMessages } from "../constants";
import { HttpException } from "../middleware";

class BookRepository {
  private books: string[];

  constructor() {
    this.books = [];
  }

  public all(): string[] {
    return this.books;
  }

  public create(book: string): void {
    if (this.exists(book)) {
      throw new HttpException(HttpStatusCode.CONFLICT, httpErrorMessages.exists);
    }

    this.books = [...this.books, book];
  }

  public delete(book: string): void {
    if (!this.exists(book)) {
      throw new HttpException(HttpStatusCode.NOT_FOUND, httpErrorMessages.notFound);
    }

    this.books = [...this.books.filter((title) => title !== book)];
  }

  public exists(book: string): boolean {
    return !!this.books.includes(book);
  }

  public update(originalBook: string, newBook: string): void {
    if (!this.exists(originalBook)) {
      throw new HttpException(HttpStatusCode.NOT_FOUND, httpErrorMessages.notFound);
    }

    if (this.exists(newBook)) {
      throw new HttpException(HttpStatusCode.CONFLICT, httpErrorMessages.exists);
    }

    this.books = this.books.map((title) => {
      if (title === originalBook) {
        return newBook;
      }

      return title;
    });
  }
}

export default new BookRepository();
