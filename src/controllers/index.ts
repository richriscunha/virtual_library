import { Request, Response, NextFunction } from "express";
import httpStatusCode from "http-status-codes";

import { httpErrorMessages } from "../constants";
import { HttpException } from "../middleware";
import BookService from "../service";

class BookController {
  /**
   * name
   */
  public index(req: Request, res: Response, next: NextFunction) {
    try {
      const books = BookService.getAllBooks();
      res.status(httpStatusCode.OK).json({ books });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/books
   * Body = Title
   * This method is used to add a book to the library. Books should be kept in memory as an array of strings containing the book titles.
   * No duplicate titles are allowed. New books are added to the end of the array. The title of the book to be added is passed to this method
   * in the body of the POST request with a parameter called “book”.
   */
  public store(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;

      if (!title) {
        throw new HttpException(httpStatusCode.UNPROCESSABLE_ENTITY, httpErrorMessages.titleMissing);
      }

      BookService.addNewBook(title);

      res.status(httpStatusCode.CREATED).json({ title });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/books
   * This method should simulate asynchronous persistence of the current book list to a database (no actual saving of the book list to a database is required.)
   * A function called “saveItemOnDatabase (name, callback)” should be defined such that the first parameter is the name of the book to be saved and the second is a callback function.
   * This function should be called for every book in the list separately. To simulate a database delay for every write operation, you can use the native JavaScript “setInterval”
   * function in combination with “Math.random()” and the book name string’s “length” property. If you like, you can write individual files for each book using the
   * NodeJS File System module, but only asynchronous methods are accepted as part of the solution. The request main thread should wait for the callback responses of every
   * call to “saveItemOnDatabase”, and it should be responsible for the synchronization of these asynchronous events. After all the books are “saved to the database”, a response should
   * be sent to the PUT request. The response should contain a JSON object where each key is a book name, and each value is an associated integer value that is the number of milliseconds
   * elapsed from the beginning of the main request until the moment the callback related to that particular key/book was called. As an example, please see the following sample response:
   * {
   *    “1984”: 233,
   *    “A Christmas Carol”: 506,
   *    “Moby Dick”: 708,
   *    “The Hitchhiker’s Guide to the Galaxy”: 1476, “The Lord of the Rings”: 1091
   * }
   */
  public async persist(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await BookService.persistAllBooks();
      res.status(httpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/books
   * Body = OriginalBook, NewBook
   * This method updates the name of an existing book. Errors should be thrown for attempts to update non-existent books,
   * or if the updated name would match the name of another book already in the library, to avoid confusion (or an existential book crisis.)
   * The index of the book should stay the same after its name has been updated. The request body should contain two
   * parameters, “original_book”, the initial name of the book to be updated, and “new_book”, the new name of said book.
   */
  public update(req: Request, res: Response, next: NextFunction) {
    try {
      const { original_book, new_book } = req.body;

      if (!original_book) {
        throw new HttpException(httpStatusCode.UNPROCESSABLE_ENTITY, httpErrorMessages.oldTitleMissing);
      }

      if (!new_book) {
        throw new HttpException(httpStatusCode.UNPROCESSABLE_ENTITY, httpErrorMessages.newTitleMissing);
      }

      BookService.updateBook(original_book, new_book);

      res.status(httpStatusCode.OK).json({
        original_book,
        new_book,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/books/:title
   * This method is used to remove a book from the library. Errors should be thrown for attempted removal of non-existent books.
   * If a book is removed, all subsequent books are shifted up by 1 index. The body of this DELETE request should contain a “book”
   * parameter with the name of the book to be removed from existence.
   */
  public destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.params;

      if (!title) {
        throw new HttpException(httpStatusCode.UNPROCESSABLE_ENTITY, httpErrorMessages.titleMissing);
      }

      BookService.removeBook(title);

      res.sendStatus(httpStatusCode.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
