import { Injectable } from '@angular/core';

import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { JhiTrackerService } from 'app/core/tracker/tracker.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(
        private accountService: AccountService,
        private trackerService: JhiTrackerService,
        private authServerProvider: AuthServerProvider
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.accountService.identity(true).then(account => {
                        this.trackerService.sendActivity();
                        resolve(data);
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    logout() {
        if (this.accountService.isAuthenticated()) {
            this.authServerProvider.logout().subscribe(() => this.accountService.authenticate(null));
        } else {
            this.accountService.authenticate(null);
        }
    }
}
