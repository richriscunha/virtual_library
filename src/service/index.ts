import HttpStatusCode from "http-status-codes";

import { httpErrorMessages } from "../constants";
import { HttpException } from "../middleware";
import BookRepository from "../repository";

class BookService {
  public addNewBook(title: string): void {
    if (BookRepository.exists(title)) {
      throw new HttpException(HttpStatusCode.CONFLICT, httpErrorMessages.exists);
    }

    BookRepository.create(title);
  }

  public getAllBooks(): string[] {
    return BookRepository.all();
  }

  public removeBook(title: string): void {
    if (!BookRepository.exists(title)) {
      throw new HttpException(HttpStatusCode.NOT_FOUND, httpErrorMessages.notFound);
    }

    BookRepository.delete(title);
  }

  public updateBook(oldTitle: string, newTitle: string) {
    // This method updates the name of an existing book. Errors should be thrown for attempts to update non-existent books,
    // or if the updated name would match the name of another book already in the library, to avoid confusion (or an existential book crisis.)
    // The index of the book should stay the same after its name has been updated. The request body should contain two parameters, “original_book”,
    // the initial name of the book to be updated, and “new_book”, the new name of said book.

    if (!BookRepository.exists(oldTitle)) {
      throw new HttpException(HttpStatusCode.NOT_FOUND, httpErrorMessages.notFound);
    }

    if (BookRepository.exists(newTitle)) {
      throw new HttpException(HttpStatusCode.CONFLICT, httpErrorMessages.exists);
    }

    BookRepository.update(oldTitle, newTitle);
  }
}

export default new BookService();
