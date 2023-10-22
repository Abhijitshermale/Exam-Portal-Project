import { ProfileComponent } from './pages/profile/profile.component';
import { loginGuard } from './services/login.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';
const routes: Routes = [
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
    canActivate:[loginGuard]
    
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
    canActivate:[loginGuard]
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
    ],
    canActivate:[adminGuard]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:'full',
    canActivate:[normalGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
