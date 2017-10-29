import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from "../../../services";
import {User} from "../../../models";
import {LibraryService} from "../../library/library.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  loader = {
    loading: false,
    library: true,
    error: false,
    message: ""
  };
  account: FormGroup;
  libraries = {
    data: []
  };
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private userService: UserService,
              private libraryService: LibraryService,
              private router: Router) {

    this.account = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]),
      password: new FormControl('', [Validators.required]),
      library: new FormControl('', [Validators.required])
    });

    this.loadLibraries();
  }


  /***
   * Sign up new user.
   */
  createUser() {
    const user = new User(this.account.value);
    this.userService.create(this.loader, user);
  }

  /**
   * Redirect to login page.
   */
  login() {
    this.router.navigateByUrl("login");
  }

  loadLibraries() {
    this.loader.message = "loading libraries...";
    this.loader.library = true;
    this.libraryService.load(this.loader, this.libraries);
  }
}
