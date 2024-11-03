// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './ngrx/auth.reducer';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<{ auth: AuthState }>,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.getToken()) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }

  //   canActivate(): boolean {
  //     let isAuthenticated: boolean;
  //     this.store
  //       .select('auth')
  //       .subscribe((state) => (isAuthenticated = state.isAuthenticated))
  //       .add(() => {
  //         if (!isAuthenticated) {
  //           this.router.navigate(['/login']);
  //           return false;
  //         }
  //         return true;
  //       });
  //   }
}
