import supertest from "supertest";
import httpStatusCode from "http-status-codes";

import server from "../server";

it("should return an empty object if the library doesn't have any books", async (done) => {
  const request = supertest(server);

  const res = await request.put("/api/books");

  expect(res.status).toEqual(httpStatusCode.OK);
  expect(res.body).toEqual({});

  done();
});

it("should return an object with all books and time of saving (ms) operation", async (done) => {
  const request = supertest(server);

  const books = ["My First Book", "My Second Book", "My Third Book", "My Fourth Book"];

  books.forEach(async (book) => {
    await request.post("/api/books").send({ book });
  });

  const res = await request.put("/api/books");

  expect(res.status).toEqual(httpStatusCode.OK);

  books.forEach((book) => expect(res.body).toHaveProperty(book));

  done();
});
