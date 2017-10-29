import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {ApiService, AlertService} from '../../services';

@Injectable()
export class LibraryService {

  constructor(private apiService: ApiService,
              private alertService: AlertService) {
  }


  create(loader: any, payload, callback, scope): void {
    loader.loading = true;
    loader.message = "creating new library...";

    this.apiService.post('/library', payload)
      .subscribe(data => {

        loader.loading = false;
        loader.message = "";
        this.alertService.success("Library Created.");
        callback.apply(scope, ['success']);

      }, error => {

        loader.loading = false;
        loader.message = "";
        if (error && error.message) {
          this.alertService.error(error.message);
        } else {
          this.alertService.error();
        }

      });
  }

  load(loader: any, targetField, libraryId?): void {
    loader.library = true;
    const params: URLSearchParams = new URLSearchParams();
    params.set('library_id', libraryId);

    this.apiService.get('/library', params)
      .subscribe(data => {

        loader.library = false;
        targetField.data = data;

      }, error => {

        loader.library = false;
        if (error && error.message) {
          this.alertService.error(error.message);
        } else {
          this.alertService.error();
        }

      });
  }

}
