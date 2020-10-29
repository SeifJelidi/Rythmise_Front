import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    /* this.authService.isSessionID
      .pipe(map(c => {
        return c;
      })); */
    return localStorage.getItem('token') == null;
  }
}
