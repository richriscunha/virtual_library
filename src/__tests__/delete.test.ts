import supertest from "supertest";
import httpStatusCode from "http-status-codes";

import server from "../server";

import {
  ERROR_STATUS,
  httpErrorMessages,
  NOT_FOUND_ERROR_MESSAGE,
  NOT_FOUND_STATUS,
} from "../constants/index";

it("should throw an error if you don't supply a book to delete", async (done) => {
  const request = supertest(server);

  const res = await request.delete("/api/books");

  expect(res.status).toEqual(httpStatusCode.NOT_FOUND);
  expect(res.body.status).toEqual(NOT_FOUND_STATUS);
  expect(res.body.statusCode).toEqual(httpStatusCode.NOT_FOUND);
  expect(res.body.message).toEqual(NOT_FOUND_ERROR_MESSAGE);

  done();
});

it("should return a not found error when you delete a book that doesn't exist", async (done) => {
  const request = supertest(server);

  const book = "Making a RESTful API with NodeJS";

  const res = await request.delete(`/api/books/${book}`);

  expect(res.status).toEqual(httpStatusCode.NOT_FOUND);
  expect(res.body.status).toEqual(ERROR_STATUS);
  expect(res.body.statusCode).toEqual(httpStatusCode.NOT_FOUND);
  expect(res.body.message).toEqual(httpErrorMessages.notFound);

  done();
});

it("should allow you to delete a book that exists", async (done) => {
  const request = supertest(server);

  const book = "Making a RESTful API with NodeJS";

  await request.post("/api/books").send({ book });

  const res = await request.delete(`/api/books/${book}`);

  expect(res.status).toEqual(httpStatusCode.NO_CONTENT);

  done();
});
