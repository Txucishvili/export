import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ShareModule} from '../share/share.module';
import {DashboardComponent} from './dashboard/dashboard.component';

import {AuthenticationService} from '../_services/authentication.service';
import {CanActivateViaAuthGuard} from '../shared/guard.service';
import {AuthenticationGuard} from '../shared/guard-auth.service';
import {BridgeGuard} from '../shared/bridge.guard';
import {UserService} from '../_services/user.service';
import {BridgeService} from '../_services/bridge.service';
import {DashboardService} from '../_services/dashboard.service';
import {UserdataService} from '../_services/userdata.service';
import {TokenInterceptor} from '../_services/token.interceptor';
import {EmailconfirmComponent} from '../share/bridge/emailconfirm/emailconfirm.component';
import {KycconfirmComponent} from '../share/bridge/kycconfirm/kycconfirm.component';
import {EmailconfirmapplyComponent} from '../share/bridge/emailconfirmapply/emailconfirmapply.component';
import {LayoutComponent} from './layout/layout.component';
import {HeadlineComponent} from './layout/headline/headline.component';
import {HeadUserComponent} from './layout/headline/head-user/head-user.component';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {ContentComponent} from './layout/content/content.component';
import {FooterComponent} from './layout/footer/footer.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../../environments/environment';
import {AuthorisationComponent} from './authorisation/authorisation.component';
import {LoginComponent} from './authorisation/login/login.component';
import {RegisterComponent} from './authorisation/register/register.component';


@NgModule({
  declarations: [
    AuthorisationComponent,
    LoginComponent,
    RegisterComponent,
    EmailconfirmComponent,
    KycconfirmComponent,
    EmailconfirmapplyComponent,
    AppComponent,
    DashboardComponent,
    LayoutComponent,
    HeadlineComponent,
    HeadUserComponent,
    NavigationComponent,
    ContentComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ShareModule
  ],
  providers: [
    AuthenticationService,
    CanActivateViaAuthGuard,
    AuthenticationGuard,
    BridgeGuard,
    UserService,
    BridgeService,
    DashboardService,
    UserdataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
