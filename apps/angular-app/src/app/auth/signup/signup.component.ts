// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './signup.component.html',
//   styleUrl: './signup.component.css',
// })
// export class SignupComponent {}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  // Getter for email form control
  get email() {
    return this.signupForm.get('email');
  }

  // Getter for username form control
  get username() {
    return this.signupForm.get('username');
  }

  // Getter for password form control
  get password() {
    return this.signupForm.get('password');
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, password, email } = this.signupForm.value;
      console.log('username, password, email: ', username, password, email);
      this.authService.signup(username, password, email).subscribe(
        (response) => {
          console.log('User signed up successfully', response);
          this.router.navigate(['/signin']); // Navigate to sign-in page after successful sign-up
        },
        (error) => {
          console.error('Error signing up', error);
        }
      );
      // Make API call to register the user, then navigate to login
      // console.log(this.signupForm.value);
      // this.router.navigate(['/signin']);
    } else {
      console.error('Form is invalid');
    }
  }
}
