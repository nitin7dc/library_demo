import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { AuthService } from "../auth/auth.service";
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiService {

  server = environment.server;

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    headersConfig['x-access-token'] = localStorage.getItem('token');
    headersConfig['x-access-id'] = localStorage.getItem('user_uid');
    headersConfig['client-time'] = new Date();
    return new Headers(headersConfig);
  }

  public formatErrors(error: any) {
    // console.log('api call error');
    // console.log(error);
    if(error && error.status === 401){
      // this.events.publish('api:401');
      this.authService.signOut();
    }
    try{
      error = error.json();
      return Observable.throw(error);
    } catch(err){
      return Observable.throw(error);
    }
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${this.server.url}${path}`, { headers: this.setHeaders(), search: params })
      .catch((err) => this.formatErrors(err))
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.server.url}${path}`, body, { headers: this.setHeaders() })
      .catch((err) => this.formatErrors(err))
      .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.server.url}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
      .catch((err) => this.formatErrors(err))
      .map((res: Response) => res.json());
  }

  delete(path:string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.delete(`${this.server.url}${path}`, { headers: this.setHeaders(), search: params })
      .catch((err) => this.formatErrors(err))
      .map((res: Response) => res.json());
  }

}
