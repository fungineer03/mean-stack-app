// import { NxWelcomeComponent } from './nx-welcome.component';
// import { AuthService } from './auth/auth.';

import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';

import { AuthService } from './auth/auth.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SharedModule } from './shared.module';

@Component({
  standalone: true,
  // imports: [RouterModule, SharedModule, SigninComponent],
  imports: [RouterModule, SharedModule, SignupComponent],
  selector: 'app-root',
  template: '<app-signup></app-signup><router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
// export class AppComponent {
//   title = 'angular-app';
// }
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation Started:', event.url);
      } else if (event instanceof NavigationEnd) {
        console.log('Navigation Ended:', event.url);
      } else if (event instanceof NavigationError) {
        console.error('Navigation Error:', event.error);
      }
    });
    this.authService.autoLogin();
  }
}
