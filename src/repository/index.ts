class BookRepository {
  public books: string[];

  constructor() {
    this.books = [];
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
}

export default new BookRepository();
