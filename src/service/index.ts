import { isEmpty } from "../utils";
import BookRepository from "../repository";

class BookService {
  public addNewBook(title: string): void {
    try {
      BookRepository.create(title);
    } catch (error) {
      throw error;
    }
  }

  private generatePersistanceResponse(startTime: number, results: [string, number][]): {} {
    let response = {};

    results.forEach((result) => {
      const [title, time] = result;
      response = { ...response, [title]: time - startTime };
    });

    return response;
  }

  public async getAllBooks() {
    let list = "";
    const books = BookRepository.all();

    return new Promise((resolve) => {
      if (isEmpty(books)) {
        resolve(list);
      }

      if (books.length === 1) {
        list = books[0];
        resolve(list);
      }

      const getBookList = (titles: string[], delimiter = ",") => {
        if (titles.length === 1) {
          list = list + titles[0];
          resolve(list);
        } else {
          list = list + titles[0] + delimiter;
          getBookList(titles.slice(1));
        }
      };

      getBookList(books);
    });
  }

  public async persistAllBooks(): Promise<{}> {
    const now = Date.now();

    const books = BookRepository.all();

    if (isEmpty(books)) {
      return {};
    }

    const booksToSave = books.map((book) => this.persistBook(book));

    const results = await Promise.all(booksToSave);

    const response = this.generatePersistanceResponse(now, results);

    return response;
  }

  public persistBook(title: string): Promise<[string, number]> {
    const delay = Math.random() * title.length;

    return new Promise((resolve) => {
      setInterval(() => {
        // Persistance code goes here...
        resolve([title, Date.now()]);
      }, delay);
    });
  }

  public removeBook(title: string): void {
    try {
      BookRepository.delete(title);
    } catch (error) {
      throw error;
    }
  }

  public updateBook(oldTitle: string, newTitle: string) {
    try {
      BookRepository.update(oldTitle, newTitle);
    } catch (error) {
      throw error;
    }
  }
}

export default new BookService();
