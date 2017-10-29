import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services";

@Injectable()
export class AccountReadyGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const account_id = localStorage.getItem("account_id");
    if (this.authService.hasLoggedIn() && (!!account_id)) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/accounts']);
    return false;
  }
}
