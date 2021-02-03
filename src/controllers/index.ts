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
   * show
   */
  public show(req: Request, res: Response, next: NextFunction) {
    try {
      throw new HttpException(501, "Not implemented method");
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
