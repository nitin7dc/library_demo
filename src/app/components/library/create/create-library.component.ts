import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {LibraryService} from "../library.service";
import {Library} from "../library.model";

@Component({
  selector: 'app-create-library',
  templateUrl: './create-library.component.html',
  styleUrls: ['./create-library.component.scss']
})
export class CreateLibraryComponent {

  loader = {
    loading: false,
    error: false,
    message: ""
  };
  libraryForm: FormGroup;
  @Output() passEvents = new EventEmitter();

  constructor(private libraryService: LibraryService,
              private router: Router) {

    this.libraryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });

  }

  createLibrary() {
    const library = new Library(this.libraryForm.value);
    this.libraryService.create(this.loader, library, this.passEventToParent, this);
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
