import supertest from "supertest";
import httpStatusCode from "http-status-codes";

import server from "../server";
import { ERROR_STATUS, httpErrorMessages } from "../constants/index";

it("should throw an error if the 'original_book' parameter is missing", async (done) => {
  const request = supertest(server);

  const res = await request.patch("/api/books").send({
    new_book: "New Book Title",
  });

  expect(res.status).toEqual(httpStatusCode.UNPROCESSABLE_ENTITY);
  expect(res.body.status).toEqual(ERROR_STATUS);
  expect(res.body.statusCode).toEqual(httpStatusCode.UNPROCESSABLE_ENTITY);
  expect(res.body.message).toEqual(httpErrorMessages.oldTitleMissing);

  done();
});

it("should throw an error if the 'new_book' parameter is missing", async (done) => {
  const request = supertest(server);

  const res = await request.patch("/api/books").send({
    original_book: "Original Book Title",
  });

  expect(res.status).toEqual(httpStatusCode.UNPROCESSABLE_ENTITY);
  expect(res.body.status).toEqual(ERROR_STATUS);
  expect(res.body.statusCode).toEqual(httpStatusCode.UNPROCESSABLE_ENTITY);
  expect(res.body.message).toEqual(httpErrorMessages.newTitleMissing);

  done();
});

it("should throw an error if you attempt to update a non-existent book", async (done) => {
  const request = supertest(server);

  const res = await request.patch("/api/books").send({
    original_book: "Original Book Title",
    new_book: "New Book Title",
  });

  expect(res.status).toEqual(httpStatusCode.NOT_FOUND);
  expect(res.body.status).toEqual(ERROR_STATUS);
  expect(res.body.statusCode).toEqual(httpStatusCode.NOT_FOUND);
  expect(res.body.message).toEqual(httpErrorMessages.notFound);

  done();
});

it("should throw an error if you attempt to update a book with a title already in the library", async (done) => {
  const request = supertest(server);

  await request.post("/api/books").send({ book: "First Book" });
  await request.post("/api/books").send({ book: "Second Book" });

  const res = await request.patch("/api/books").send({
    original_book: "First Book",
    new_book: "Second Book",
  });

  expect(res.status).toEqual(httpStatusCode.CONFLICT);
  expect(res.body.status).toEqual(ERROR_STATUS);
  expect(res.body.statusCode).toEqual(httpStatusCode.CONFLICT);
  expect(res.body.message).toEqual(httpErrorMessages.exists);

  done();
});

it("should allow you to update a book in the library", async (done) => {
  const request = supertest(server);

  const firstBook = "First Book";
  const secondBook = "Second Book";
  const thirdBook = "Third Book";

  await request.post("/api/books").send({ book: firstBook });
  await request.post("/api/books").send({ book: secondBook });

  const res = await request.patch("/api/books").send({
    original_book: firstBook,
    new_book: thirdBook,
  });

  expect(res.status).toEqual(httpStatusCode.OK);
  expect(res.body.original_book).toEqual(firstBook);
  expect(res.body.new_book).toEqual(thirdBook);

  done();
});
