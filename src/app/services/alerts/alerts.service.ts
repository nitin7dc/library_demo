import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AlertService {

    private keepAfterNavigationChange = false;

    constructor(
        private router: Router,
        public snackBar: MatSnackBar
    ) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                }
            }
        });
    }

    success(message?: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        message = message ? "Success : " + message : message = "Success : Changes saved.";
        this.snackBar.open(message, 'OK', {
            duration: 3000
        });
    }

    error(message?: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        message = message ? "Error : " + message : message = "Error : Please try again.";
        this.snackBar.open(message, 'OK', {
            duration: 3000
        });
    }

}
