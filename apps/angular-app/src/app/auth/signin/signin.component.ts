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
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for email form control
  get email() {
    return this.signinForm.get('email');
  }

  // Getter for password form control
  get password() {
    return this.signinForm.get('password');
  }

  onSubmit(): void {
    // if (this.signinForm.valid) {
    //   // Make API call to authenticate the user
    //   console.log(this.signinForm.value);
    //   this.router.navigate(['/']); // Redirect to home or protected page
    // }
    if (this.signinForm.valid) {
      // Call AuthService to handle user sign-in
      this.authService
        .login(
          this.signinForm.value['email'],
          this.signinForm.value['password']
        )
        .subscribe(
          (response) => {
            console.log('User signed in successfully', response);
            this.router.navigate(['/']); // Navigate to the home or protected route
          },
          (error) => {
            console.error('Error signing in', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
}
