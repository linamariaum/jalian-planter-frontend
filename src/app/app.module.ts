import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormComponent } from './components/form/form.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ListPotsComponent } from './components/list-pots/list-pots.component';
import { PotComponent } from './components/pot/pot.component';
import { ReportPotComponent } from './components/report-pot/report-pot.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    ProfileComponent,
    FormComponent,
    SignUpComponent,
    ListPotsComponent,
    PotComponent,
    ReportPotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
