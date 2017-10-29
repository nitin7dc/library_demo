import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/************************************************************************************
 * External libraries
*************************************************************************************/

import { AppMaterialModule } from "./shared/app.material.module";

/************************************************************************************
 * Application Routing & Environment.
*************************************************************************************/
import { routing } from './app.routing';
import { environment } from '../environments/environment';

/************************************************************************************
 * Application Components
*************************************************************************************/
import { AppComponent } from './app.component';
import {
  LoginComponent,
  SignUpComponent,
  HomeComponent,
  ErrorPageComponent,
  HeaderComponent,
  LoadingComponent,
  CreateLibraryComponent,
  ListLibraryComponent,
  EditLibraryComponent,
  AddBookComponent,
  ListBooksComponent
} from './components';

/************************************************************************************
 * Application Services.
*************************************************************************************/
import {
  AuthService,
  ApiService,
  AlertService,
  UserService
} from './services';

import {AuthGuard} from "./guards";
import {LibraryService} from "./components/library/library.service";
import {BooksService} from "./components/books/books.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ErrorPageComponent,
    HeaderComponent,
    LoadingComponent,
    CreateLibraryComponent,
    ListLibraryComponent,
    EditLibraryComponent,
    AddBookComponent,
    ListBooksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    routing,
    AppMaterialModule
  ],
  providers: [
    AuthService,
    ApiService,
    UserService,
    AlertService,
    LibraryService,
    AuthGuard,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
