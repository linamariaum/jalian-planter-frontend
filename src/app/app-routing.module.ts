import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ReportPotComponent } from './pages/report-pot/report-pot.component'


const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'report/:id', component: ReportPotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
