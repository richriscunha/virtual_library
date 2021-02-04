type HttpErrorMessages = {
  exists: string;
  titleMissing: string;
  oldTitleMissing: string;
  newTitleMissing: string;
  notFound: string;
};

export const ERROR_STATUS = "error";

export const NOT_FOUND_STATUS = "not found";

export const UNKNOWN_SERVER_ERROR_MESSAGE = "Unknown server error.";

export const NOT_FOUND_ERROR_MESSAGE = "Resource not found";

export const httpErrorMessages: HttpErrorMessages = {
  exists: "This book already exists.",
  titleMissing: "Missing book title.",
  oldTitleMissing: "Original book title is missing.",
  newTitleMissing: "New book title is missing.",
  notFound: "Book not found.",
};
