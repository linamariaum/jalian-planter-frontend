import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Stomp 
import {StompConfig, StompService} from "@stomp/ng2-stompjs";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ListPotsComponent } from './pages/list-pots/list-pots.component';
import { PotComponent } from './pages/pot/pot.component';
import { ReportPotComponent } from './pages/report-pot/report-pot.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { ChartComponent } from './components/chart/chart.component';

const stompConfig: StompConfig = {
  url: 'ws://127.0.0.1:15674/ws',
  headers: {
    login: 'guest',
    passcode: 'guest'
  },
  heartbeat_in: 0,
  heartbeat_out: 2000,
  reconnect_delay: 60000,
  debug: true
}
import { NavComponent } from './components/nav/nav.component';
import { ListTipsComponent } from './pages/list-tips/list-tips.component';
import { ListDevicesComponent } from './pages/list-devices/list-devices.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    ProfileComponent,
    SignUpComponent,
    ListPotsComponent,
    PotComponent,
    ReportPotComponent,
    FormInputComponent,
    FormSelectComponent,
    ChartComponent,
    NavComponent,
    ListTipsComponent,
    ListDevicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [StompService, 
    {
    provide: StompConfig,
    useValue: stompConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
