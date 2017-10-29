import {Component, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService, UserService} from '../../../services';
import {Router} from '@angular/router';
import {MatMenuTrigger} from '@angular/material';
import {User} from "../../../models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showMenu = false;
  loggedInUser: User;
  @ViewChild('menu') menu: MatMenuTrigger;
  @Output() toggleMenu = new EventEmitter();

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    this.listenForUpdates();
  }

  listenForUpdates() {

    this.authService.authState.subscribe(state => {
      this.showMenu = state;
    });

    this.userService.getCurrentUser().subscribe(data => {
      this.loggedInUser = data;
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
    this.userService.purgeUser();
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {

  }
}
