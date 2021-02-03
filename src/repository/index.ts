class BookRepository {
  public books: string[];

  constructor() {
    this.books = [];
  }

  public all(): string[] {
    return this.books;
  }

  public create(title: string): void {
    this.books = [...this.books, title];
  }

  public delete(title: string): void {
    this.books = [...this.books.filter((book) => book !== title)];
  }

  public exists(title: string): boolean {
    return !!this.books.includes(title);
  }

  public update(oldTitle: string, newTitle: string): void {
    this.books = this.books.map((title) => {
      if (title === oldTitle) {
        return newTitle;
      }

      return oldTitle;
    });
  }
}

export default new BookRepository();
