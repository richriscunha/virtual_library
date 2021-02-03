import { Request, Response, NextFunction } from "express";
import HttpStatusCode from "http-status-codes";

export default class HttpException extends Error {
  constructor(public statusCode: number, public message: string) {
    super();
  }
}

export const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: error.message || "Unknown server error.",
  });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const statusCode = HttpStatusCode.NOT_FOUND;

  res.status(statusCode).json({
    status: "not found",
    statusCode: statusCode,
    message: "Resource not found",
  });
};
