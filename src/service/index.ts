import BookRepository from "../repository";

class BookService {
  public addNewBook(title: string): void {
    try {
      BookRepository.create(title);
    } catch (error) {
      console.error(error);
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
    const books = BookRepository.all();
  }

  public async persistAllBooks(): Promise<{}> {
    const now = Date.now();

    const books = BookRepository.all();

    if (books.length === 0) {
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
      console.error(error);
      throw error;
    }
  }

  public updateBook(oldTitle: string, newTitle: string) {
    try {
      BookRepository.update(oldTitle, newTitle);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new BookService();
