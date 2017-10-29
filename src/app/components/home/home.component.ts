import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  show = {
    create: false,
    list: false
  };
  user: User;
  userSubscrition: Subscription;
  libraryId: string;
  admin: boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.checkUserType();
  }

  toggleCreateView() {
    this.show.create = !this.show.create;
    this.show.list = !this.show.list;
  }

  listenToChild(data) {
    if (data.message === 'cancel' || data.message === 'success') {
      this.show.create = false;
      this.show.list = true;
    }
  }

  checkUserType() {
    this.admin = this.userService.isAdmin();
    this.userSubscrition = this.userService.getCurrentUser()
      .subscribe(data => {
        if (data && data.library) {
          this.libraryId = data.library._id;
        } else {
          this.libraryId = null;
        }
        this.show.list = true;
        this.user = data;
      });
  }
}
