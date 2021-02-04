import supertest from "supertest";
import httpStatusCode from "http-status-codes";

import server from "../server";
import { ERROR_STATUS, httpErrorMessages } from "../constants/index";

it("should save a new book", async (done) => {
  const request = supertest(server);

  const book = "Building a RESTful API with NodeJS";

  const res = await request.post("/api/books").send({ book });

  expect(res.status).toEqual(httpStatusCode.CREATED);
  expect(res.body.book).toEqual(book);

  done();
});

it("should not save a book that already exists", async (done) => {
  const request = supertest(server);

  const book = "Building a RESTful API with NodeJS";

  await request.post("/api/books").send({ book });

  const res = await request.post("/api/books").send({ book });

  expect(res.status).toEqual(httpStatusCode.CONFLICT);
  expect(res.body.status).toEqual(ERROR_STATUS);
  expect(res.body.statusCode).toEqual(httpStatusCode.CONFLICT);
  expect(res.body.message).toEqual(httpErrorMessages.exists);

  done();
});
