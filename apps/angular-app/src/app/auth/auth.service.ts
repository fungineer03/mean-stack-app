// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = `http://localhost:3000/auth`;

//   constructor(private http: HttpClient) {}

//   login(username: string, password: string): Observable<{ token: string }> {
//     return this.http.post<{ token: string }>(`${this.apiUrl}/signin`, {
//       username,
//       password,
//     });
//   }

//   signup(username: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/signup`, {
//       username,
//       password,
//     });
//   }
// }

// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;
  private userToken = new BehaviorSubject<string | null>(null);
  private apiUrl = `http://localhost:3000/api/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/signin`, {
      username,
      password,
    });
  }

  signup(username: string, password: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, {
      username,
      password,
      email,
    });
  }

  signin(credentials: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/signin`, credentials)
      .pipe(
        tap((response) => {
          this.storeToken(response.token);
          this.autoLogout(8 * 60 * 60 * 1000); // Set auto-logout for 8 hours
        })
      );
  }

  private storeToken(token: string) {
    localStorage.setItem('authToken', token);
    this.userToken.next(token);
  }

  private clearToken() {
    localStorage.removeItem('authToken');
    this.userToken.next(null);
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  logout() {
    this.clearToken();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogin() {
    console.log('hello auto login');
    // const token = this.getToken();
    // if (!token) return;

    // // Optionally, validate token expiration here (if token includes expiration data).
    // this.userToken.next(token);
    // this.autoLogout(8 * 60 * 60 * 1000); // Auto-logout after 8 hours from last login
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.logout(),
      expirationDuration
    );
  }
}
