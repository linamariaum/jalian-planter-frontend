import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ReportPotComponent } from './pages/report-pot/report-pot.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PotComponent } from './pages/pot/pot.component';
import { ListPotsComponent } from './pages/list-pots/list-pots.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {path: '', redirectTo: 'pots', pathMatch: 'full'},
  { path: 'login', component: AuthComponent },
  { path: 'report/:id', component: ReportPotComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'pots', component: ListPotsComponent },
  { path: 'pot/:id', component: PotComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
