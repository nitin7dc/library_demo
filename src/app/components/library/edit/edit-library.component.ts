import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {Library} from "../library.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-edit-library',
  templateUrl: './edit-library.component.html',
  styleUrls: ['./edit-library.component.scss']
})
export class EditLibraryComponent implements OnInit, OnDestroy {

  libraryId: string;
  library: any;
  show = {
    addBook: false,
    list: true
  };
  isAdmin = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
    this.libraryId = this.route.snapshot.params['id'];
    const lib = localStorage.getItem(this.libraryId);
    if (lib) {
      this.library = JSON.parse(lib);
    }
  }

  ngOnInit() {
    this.isAdmin = this.userService.isAdmin();
  }

  ngOnDestroy() {
    localStorage.removeItem(this.libraryId);
  }

  back() {
    this.router.navigateByUrl("home");
  }

  /**
   * Show add new book component.
   */
  addBook() {
    this.show.addBook = !this.show.addBook;
    this.show.list = !this.show.list;
  }


  /**
   * List of book components, toggle show/list modes.
   * @param data
   */
  listenToChild(data) {
    if (data.message === 'cancel' || data.message === 'success') {
      this.show.addBook = false;
      this.show.list = true;
    }
  }
}
