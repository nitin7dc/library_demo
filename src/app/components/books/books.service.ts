import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {ApiService, AlertService} from '../../services';
import {User} from "../../models/user";
import {Book} from "./books.model";

@Injectable()
export class BooksService {

  constructor(private apiService: ApiService,
              private alertService: AlertService) {
  }


  /**
   * Add new book in library
   * @param loader
   * @param payload
   * @param callback
   * @param scope
   */
  create(loader: any, payload, callback, scope): void {
    loader.loading = true;
    loader.message = "adding new book...";

    this.apiService.post('/books', payload)
      .subscribe(data => {

        loader.loading = false;
        loader.message = "";
        this.alertService.success("Book Added.");
        callback.apply(scope, ['success']);

      }, error => {

        loader.loading = false;
        loader.message = "";
        if (error && error.message) {
          this.alertService.error(error.message);
        } else {
          this.alertService.error();
        }

      });
  }


  /**
   * Load all books in a library
   * @param loader
   * @param targetField
   * @param library_id
   */
  load(loader: any, targetField, library_id): void {
    loader.library = true;
    const params: URLSearchParams = new URLSearchParams();
    params.set('library_id', library_id);

    this.apiService.get('/books', params)
      .subscribe(data => {

        loader.library = false;
        targetField.data = data.docs || [];

      }, error => {

        loader.library = false;
        if (error && error.message) {
          this.alertService.error(error.message);
        } else {
          this.alertService.error();
        }

      });
  }


  /**
   * Issue a book.
   * @param loader
   * @param payload
   * @param callback
   * @param scope
   */
  issue(loader: any, book: Book, user: User): void {
    loader.book = true;

    this.apiService.post('/books/issue', {book_id: book._id})
      .subscribe(data => {

        loader.book = false;
        this.alertService.success("Book Issued.");
        user.books = user.books || [];
        user.books.push(book);
        // todo: check if user is requred to be bupdated.

      }, error => {

        loader.loading = false;
        loader.message = "";
        if (error && error.message) {
          this.alertService.error(error.message);
        } else {
          this.alertService.error();
        }

      });
  }


  /**
   * Load all books issues to logged in user.
   * @param loader
   * @param targetField
   */
  myBooks(loader: any, targetField): void {
    loader.library = true;

    this.apiService.get('/users/books')
      .subscribe(data => {

        loader.library = false;
        targetField.data = data.docs || [];

      }, error => {

        loader.library = false;
        if (error && error.message) {
          this.alertService.error(error.message);
        } else {
          this.alertService.error();
        }

      });
  }

}
