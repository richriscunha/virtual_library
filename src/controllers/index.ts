import { Request, Response, NextFunction } from "express";

import HttpException from "../middleware";

class BookController {
  /**
   * name
   */
  public index(req: Request, res: Response, next: NextFunction) {
    try {
      throw new HttpException(501, "Not implemented method");
    } catch (error) {
      next(error);
    }
  }

  /**
   * store
   */
  public store(req: Request, res: Response, next: NextFunction) {
    try {
      throw new HttpException(501, "Not implemented method");
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
   * update
   */
  public update(req: Request, res: Response, next: NextFunction) {
    try {
      throw new HttpException(501, "Not implemented method");
    } catch (error) {
      next(error);
    }
  }

  /**
   * destroy
   */
  public destroy(req: Request, res: Response, next: NextFunction) {
    try {
      throw new HttpException(501, "Not implemented method");
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
