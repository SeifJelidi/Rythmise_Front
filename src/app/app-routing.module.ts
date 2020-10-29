import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlaylistComponent} from './playlist/playlist.component';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './services/auth.guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'playlist/:id', component: PlaylistComponent},
  { path: 'sign-in', component: SignInComponent, canActivate: [AuthGuardService]},
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
