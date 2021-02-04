import { Request, Response, NextFunction } from "express";
import httpStatusCode from "http-status-codes";

import { httpErrorMessages } from "../constants";
import { HttpException } from "../middleware";
import BookService from "../service";

class BookController {
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await BookService.getAllBooks();
      res.status(httpStatusCode.OK).json({ books });
    } catch (error) {
      next(error);
    }
  }

  public store(req: Request, res: Response, next: NextFunction) {
    try {
      const { book } = req.body;

      if (!book) {
        throw new HttpException(httpStatusCode.UNPROCESSABLE_ENTITY, httpErrorMessages.titleMissing);
      }

      BookService.addNewBook(book);

      res.status(httpStatusCode.CREATED).json({ book });
    } catch (error) {
      next(error);
    }
  }

  public async persist(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await BookService.persistAllBooks();
      res.status(httpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

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

  public destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { book } = req.params;

      BookService.removeBook(book);

      res.sendStatus(httpStatusCode.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
