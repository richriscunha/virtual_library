import { Request, Response, NextFunction } from "express";
import HttpStatusCode from "http-status-codes";

import {
  ERROR_STATUS,
  NOT_FOUND_ERROR_MESSAGE,
  NOT_FOUND_STATUS,
  UNKNOWN_SERVER_ERROR_MESSAGE,
} from "../constants";
export class HttpException extends Error {
  constructor(public statusCode: number, public message: string) {
    super();
  }
}

export const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    status: ERROR_STATUS,
    statusCode: statusCode,
    message: error.message || UNKNOWN_SERVER_ERROR_MESSAGE,
  });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const statusCode = HttpStatusCode.NOT_FOUND;

  res.status(statusCode).json({
    status: NOT_FOUND_STATUS,
    statusCode: statusCode,
    message: NOT_FOUND_ERROR_MESSAGE,
  });
};
