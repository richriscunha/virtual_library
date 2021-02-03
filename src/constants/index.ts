type HttpErrorMessages = {
  exists: string;
  titleMissing: string;
  oldTitleMissing: string;
  newTitleMissing: string;
  notFound: string;
};

export const httpErrorMessages: HttpErrorMessages = {
  exists: "This book already exists.",
  titleMissing: "Missing book title.",
  oldTitleMissing: "Original book title is missing.",
  newTitleMissing: "New book title is missing.",
  notFound: "Book not found.",
};
