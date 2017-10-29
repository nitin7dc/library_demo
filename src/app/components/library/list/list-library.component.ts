import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LibraryService} from "../library.service";
import {Library} from "../library.model";

@Component({
  selector: 'app-list-library',
  templateUrl: './list-library.component.html',
  styleUrls: ['./list-library.component.scss']
})
export class ListLibraryComponent implements OnInit {

  @Input() libraryId = null;
  loaders = {
    library: false,
  };

  libraries = {
    data: []
  };

  constructor(private router: Router,
              private libraryService: LibraryService) {
  }

  ngOnInit() {
    this.libraryService.load(this.loaders, this.libraries, this.libraryId);
  }

  selectLibrary(library: Library) {
    localStorage.setItem(library._id, JSON.stringify(library));
    this.router.navigateByUrl("library/" + library._id);
  }

}
