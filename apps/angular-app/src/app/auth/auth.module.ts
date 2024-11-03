// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// import { AuthService } from './auth.service';
// import { AuthEffects } from './ngrx/auth.effects';
// import { authReducer } from './ngrx/auth.reducer';

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     RouterModule,
//     HttpClientModule,
//     StoreModule.forFeature('auth', authReducer),
//     EffectsModule.forRoot([AuthEffects]),
//   ],
//   providers: [AuthService],
//   bootstrap: [],
// })
// export class AuthModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { AuthEffects } from './ngrx/auth.effects';
import { authReducer } from './ngrx/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule, // Add this for form controls like ReactiveForms
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
