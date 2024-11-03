// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { SignupComponent } from './auth/signup/signup.component';
// import { SigninComponent } from './auth/signin/signin.component';

// const routes: Routes = [
//   { path: 'signup', component: SignupComponent },
//   { path: 'signin', component: SigninComponent },
//   { path: '', redirectTo: 'signin', pathMatch: 'full' }, // Default route
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   // exports: [RouterModule],
// })
// export class AppRoutingModule {}

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { SignupComponent } from './auth/signup/signup.component';
// import { SigninComponent } from './auth/signin/signin.component';

// const routes: Routes = [
//   { path: 'signup', component: SignupComponent },
//   { path: 'signin', component: SigninComponent }, // Add this line if it doesn't exist
//   { path: '', redirectTo: '/signin', pathMatch: 'full' }, // Default route
//   { path: '**', redirectTo: '/signin' }, // Wildcard route to handle non-existing routes
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent, // Standalone components can be referenced directly
  },
  {
    path: 'signin',
    component: SigninComponent, // Reference to standalone component
  },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: '**', redirectTo: '/signin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
