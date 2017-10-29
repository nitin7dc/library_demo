import {Component, OnDestroy, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService, UserService} from '../../../services';
import {Router} from '@angular/router';
import {MatSidenavModule, MatMenuTrigger} from '@angular/material';
import {Observable, Subscription} from 'rxjs/Rx';
import {User} from "../../../models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showMenu = false;
  userSubscription: Subscription;
  loggedInUser: User;
  @ViewChild('menu') menu: MatMenuTrigger;
  @Output() toggleMenu = new EventEmitter();

  constructor(private authService: AuthService,
              private router: Router) {
    this.listenToAuthState();
  }

  listenToAuthState() {
    this.authService.authState.subscribe(state => {
      console.log('auth sstat : ' + state);
      this.showMenu = state;
    });
  }

  /**
   * Go to other pages of application.
   * @param target
   */
  goTo(target: string) {
    this.router.navigateByUrl(target);
  }

  /**
   * Sign Out.
   */
  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {

  }
}
