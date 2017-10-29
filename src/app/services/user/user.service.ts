import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {URLSearchParams} from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from '../../models';
import {ApiService} from "../api/api.service";
import {AlertService} from "../alerts/alerts.service";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User({}));
  private accountReady = false;

  constructor(private apiService: ApiService,
              private router: Router,
              private alertService: AlertService) {
    const local = localStorage.getItem('user');
    if (!!local) {
      const user: User = JSON.parse(local);
      this.currentUserSubject.next(user);
    }
  }


  /**
   * Store latest instance of user in memory
   * and push to all subscribers.
   * @param user
   */
  set(user: User) {
    localStorage.setItem("user_id", user._id);
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSubject.next(user);
  }


  /**
   * Return current instance of user.
   */
  get() {
    return this.currentUserSubject.getValue();
  }


  /**
   * Set current user to an empty object
   */
  purgeUser() {
    this.currentUserSubject.next(new User({}));
  }


  /**
   * Get JSON value of current user.
   */
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject;
  }


  /**
   * Create new user
   * @param loader
   * @param payload
   */
  create(loader: any, payload): void {
    loader.loading = true;
    loader.message = "creating new user...";

    this.apiService.post('/users', payload)
      .subscribe(data => {

        loader.loading = false;
        loader.message = "";
        this.alertService.success("User Created.");
        this.router.navigateByUrl('/login');

      }, error => {

        loader.loading = false;
        loader.message = "";
        if (error && error.message) {
          if (error.message.indexOf('E11000 duplicate') > -1) {
            error.message = "This email is already in use.";
          }
          this.alertService.error(error.message);
        } else {
          this.alertService.error();
        }

      });
  }


  /**
   * Check if current user is admin.
   * @returns {boolean}
   */
  isAdmin() {
    const user = this.get();
    if (user && user.email === 'sameepsi@gmail.com') {
      return true;
    }
    return false;
  }
}
