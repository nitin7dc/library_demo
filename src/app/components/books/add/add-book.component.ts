import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {BooksService} from "../books.service";
import {Book} from "../books.model";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  loader = {
    loading: false,
    error: false,
    message: ""
  };
  bookForm: FormGroup;
  @Output() passEvents = new EventEmitter();
  @Input() library_id;

  constructor(private booksService: BooksService,
              private router: Router) {
  }

  ngOnInit() {
    this.bookForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      library: new FormControl(this.library_id, []),
      is_available: new FormControl(true, [])
    });

  }

  addBook() {
    const book = new Book(this.bookForm.value);
    this.booksService.create(this.loader, book, this.passEventToParent, this);
  }

  cancel() {
    this.passEvents.emit({message: 'cancel'});
  }

  /**
   * Call parent component with some data.
   * @param message
   * @param other
   */
  private passEventToParent(message) {
    this.passEvents.emit({message});
  }
}
