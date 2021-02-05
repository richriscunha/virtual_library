import supertest from "supertest";
import httpStatusCode from "http-status-codes";

import server from "../server";

it("should return an empty book list if the library doesn't have any books", async (done) => {
  const request = supertest(server);

  const res = await request.get("/api/books");

  expect(res.status).toEqual(httpStatusCode.OK);
  expect(res.body.books).toEqual("");

  done();
});

it("should return a single book title with no delimiter if the library only has one book", async (done) => {
  const request = supertest(server);

  const book = "My First Book";

  await request.post("/api/books").send({ book });

  const res = await request.get("/api/books");

  expect(res.status).toEqual(httpStatusCode.OK);
  expect(res.body.books).toEqual(book);

  done();
});

it("should return a delimited list if the library has multiple books", async (done) => {
  const request = supertest(server);

  const books = ["My First Book", "My Second Book", "My Third Book", "My Fourth Book"];

  books.forEach(async (book) => {
    await request.post("/api/books").send({ book });
  });

  const res = await request.get("/api/books");

  expect(res.status).toEqual(httpStatusCode.OK);
  expect(res.body.books).toEqual(books.join(","));

  done();
});
