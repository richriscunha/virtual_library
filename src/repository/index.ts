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

  public create(title: string): void {
    if (this.exists(title)) {
      throw new HttpException(HttpStatusCode.CONFLICT, httpErrorMessages.exists);
    }

    this.books = [...this.books, title];
  }

  public delete(title: string): void {
    if (!this.exists(title)) {
      throw new HttpException(HttpStatusCode.NOT_FOUND, httpErrorMessages.notFound);
    }

    this.books = [...this.books.filter((book) => book !== title)];
  }

  public exists(title: string): boolean {
    return !!this.books.includes(title);
  }

  public update(oldTitle: string, newTitle: string): void {
    if (!this.exists(oldTitle)) {
      throw new HttpException(HttpStatusCode.NOT_FOUND, httpErrorMessages.notFound);
    }

    if (this.exists(newTitle)) {
      throw new HttpException(HttpStatusCode.CONFLICT, httpErrorMessages.exists);
    }

    this.books = this.books.map((title) => {
      if (title === oldTitle) {
        return newTitle;
      }

      return oldTitle;
    });
  }
}

export default new BookRepository();
