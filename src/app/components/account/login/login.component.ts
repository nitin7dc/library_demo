import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, AlertService, ApiService, UserService} from '../../../services';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;
  message: string;
  user: FormGroup;
  showResetPassword = false;
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private authService: AuthService,
              private router: Router,
              private apiService: ApiService,
              private userService: UserService,
              private alertService: AlertService) {

    if (this.authService.hasLoggedIn()) {
      this.router.navigateByUrl('dashboard');
    }

    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]),
      password: new FormControl('', [Validators.required])
    });
  }

  /**
   * Email/Password login.
   */
  signInWithEmail() {

    this.loading = true;
    this.message = "logging in...";

    this.apiService.post('/users/login', this.user.value)
      .subscribe(data => {
        this.userService.set(data.user);
        this.authService.setup(data.token);
        this.router.navigateByUrl('home');
      }, error => {
        this.loading = false;
        this.message = "";
        this.user.reset();
        if (error && error.message) {
          this.alertService.error(error.message);
        } else {
          this.alertService.error();
        }
      });
  }


  /**
   *  Send password reset email.
   */
  resetPassword() {
    this.loading = true;
    this.message = "sending email...";
    this.showResetPassword = false;
    // this.authService.resetPassword(this.user.value.email)
    //   .then(data => {
    //     this.loading = false;
    //     this.message = "";
    //     this.alertService.success("Check your mailbox for password reset email.");
    //   })
    //   .catch(error => {
    //     this.loading = false;
    //     this.message = "";
    //     if (error && error.message) {
    //       this.alertService.error(error.message);
    //     } else {
    //       this.alertService.error();
    //     }
    //   });
  }


  /**
   * Login/Reset Password view toggle.
   */
  toggleResetPassword() {
    this.user.reset();
    this.showResetPassword = !this.showResetPassword;
  }


  /**
   * Send to sign up page.
   */
  signUp() {
    this.router.navigateByUrl("signup");
  }
}
