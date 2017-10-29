import {Library} from "../components/library/library.model";
import {Book} from "../components/books/books.model";

export class User {
  _id?: string;
  email: string;
  password: string;
  role: string;
  library: Library;
  books: Array<Book> = [];

  constructor(formData) {
    Object.keys(formData).forEach((key) => {
      this[key] = formData[key];
    });
  }
}
