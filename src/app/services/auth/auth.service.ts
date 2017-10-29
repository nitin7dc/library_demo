import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable, BehaviorSubject} from 'rxjs/Rx';


@Injectable()
export class AuthService {

  authState = new BehaviorSubject<boolean>(false);

  constructor(public http: Http) {
    const localToken = localStorage.getItem('token');
    this.authState.next(!!localToken);
  }

  setup(token: any) {
    localStorage.setItem('token', token);
    this.authState.next(true);
  }

  /**
   * Clear everything and sign out.
   */
  signOut(): void {
    localStorage.clear();
    this.authState.next(false);
  }


  /**
   * Simple check if user's is already authenticated.
   */
  hasLoggedIn(): any {
    return !!(localStorage.getItem("token"));
  }


}
