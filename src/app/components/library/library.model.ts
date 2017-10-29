export class Library {
  _id?: string;
  name: string;
  description: string;

  constructor(formData) {
    Object.keys(formData).forEach((key) => {
      this[key] = formData[key];
    });
  }
}
