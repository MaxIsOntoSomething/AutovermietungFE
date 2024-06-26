import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate { // Überprüft, ob der Admin eingeloggt ist
  constructor(private router: Router,
    private notification: NzNotificationService,) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (UserStorageService.isCustomerLoggedIn()) { 
      this.router.navigateByUrl('/customer/dashboard');
      this.notification
        .error(
          'ERROR',
          `You don't have access of this page`,
          { nzDuration: 5000 }
        );
      return false;
    }
    else if (!UserStorageService.hasToken()) { 
      UserStorageService.signOut();
      this.router.navigateByUrl('/login');
      this.notification
        .error(
          'ERROR',
          `You Are Not LoggedIn. Please Login First`,
          { nzDuration: 5000 }
        );
      return false;
    }
    return true;
  }

}