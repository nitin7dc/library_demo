import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Book} from "../books.model";
import {BooksService} from "../books.service";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-list-books',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBooksComponent implements OnInit {

  @Input() library_id: string;
  @Input() userMode = false;
  @Input() booksReady = [];
  user: User;

  loaders = {
    books: false
  };

  books = {
    data: []
  };


  constructor(private router: Router,
              private userService: UserService,
              private booksService: BooksService) {
  }

  ngOnInit() {

    if (this.userMode) {
      this.booksService.myBooks(this.loaders, this.books);
    } else {
      this.booksService.load(this.loaders, this.books, this.library_id);
    }

    this.getUser();
  }

  /**
   * Get logged in user.
   */
  getUser() {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
      });
  }


  /**
   * Issue book to logged in user.
   * @param book
   */
  issueBook(book, index) {
    this.booksService.issue(this.loaders, book, this.books, index);
  }


  /**
   * return book.
   * @param book
   */
  returnBook(book, index) {
    this.booksService.returnBook(this.loaders, book, this.books, index);
  }

}
