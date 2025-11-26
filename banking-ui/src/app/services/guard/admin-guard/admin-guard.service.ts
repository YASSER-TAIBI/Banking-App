import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

private router = inject(Router);

 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (token) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token as string);
    if(decodedToken.authorities[0].authority !== 'ROLE_ADMIN'){
      this.router.navigate(['access-denied']);
      return false;
    }
    return true;
    }
    return false;
  }
}
