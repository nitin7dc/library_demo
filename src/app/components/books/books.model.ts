import {Library} from "../library/library.model";

export class Book {
  _id?: string;
  name: string;
  description: string;
  library: Library;
  is_available: boolean;

  constructor(formData) {
    Object.keys(formData).forEach((key) => {
      this[key] = formData[key];
    });
  }
}
