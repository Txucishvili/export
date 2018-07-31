import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule, SafeHtml} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import 'rxjs/add/observable/of';
import {CountDown} from 'ng2-date-countdown';
import {DropDownDirective} from '../shared/context.directive';
import {OutsideclickDirective} from '../shared/outsideclick.directive';
import {LostpassComponent} from './authorisation/lostpass/lostpass.component';
import {PagesComponent} from './pages/pages.component';
import {AffiliateComponent} from './pages/affiliate/affiliate.component';
import {MessagesComponent} from './pages/messages/messages.component';
import {MainComponent} from './pages/main/main.component';
import {UserComponent} from './pages/user/user.component';
import {SettingsComponent} from './pages/user/settings/settings.component';
import {ChangeComponent} from './pages/user/change/change.component';
import {ProfileComponent} from './pages/user/profile/profile.component';
import {ResetpassComponent} from './authorisation/resetpass/resetpass.component';
import {BridgeComponent} from './bridge/bridge.component';
import {PlaceorderComponent} from './pages/placeorder/placeorder.component';
import {UnplaceorderComponent} from './pages/unplaceorder/unplaceorder.component';
import {RefferalComponent} from './bridge/refferal/refferal.component';
import {BuytokenComponent} from './pages/buytoken/buytoken.component';
import {TransactionsComponent} from './pages/transactions/transactions.component';
import {UpdatewalletComponent} from './pages/updatewallet/updatewallet.component';
import {TwofapageComponent} from './pages/user/twofapage/twofapage.component';
import {DefaultAppRouting} from './default-routing.module';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {AuthenticationService} from '../_services/authentication.service';
import {AuthenticationGuard} from '../shared/guard-auth.service';
import {BridgeGuard} from '../shared/bridge.guard';
import {DeactiveGuard} from '../shared/deactive.guard';
import {UserService} from '../_services/user.service';
import {BridgeService} from '../_services/bridge.service';
import {DashboardService} from '../_services/dashboard.service';
import {UserdataService} from '../_services/userdata.service';
import {TokenInterceptor} from '../_services/token.interceptor';
import {LoaderDirective} from '../directives/loader.directive';
import { AlertsComponent } from './components/alerts/alerts.component';
import {AlertsService} from './alerts.service';
import { NotificationsComponent } from './components/notifications/notifications.component';
import {NotificationService} from '../_services/notification.service';
import { KycpageComponent } from './pages/user/kycpage/kycpage.component';
import { InfosetupComponent } from './bridge/infosetup/infosetup.component';
import {UserRegisterStatus} from '../shared/user_register_status.guard';
import {CountriesService} from './countries.service';
import {SafeHtmlPipe} from './safehtml.pipe';
import { OfferComponent } from './pages/offer/offer.component';
import {ParticlesModule} from 'angular-particle';
import { OfferverifyComponent } from '../admin/pages/offerverify/offerverify.component';
import { AffiliatetwoComponent } from './pages/affiliatetwo/affiliatetwo.component';
import {NationalityService} from './nationality.service';
import {DlDateTimePickerDateModule} from 'angular-bootstrap-datetimepicker';
import {BsDatepickerModule, DatepickerModule} from 'ngx-bootstrap';
import {CookieService} from 'ngx-cookie-service';




@NgModule({
  declarations: [
    CountDown,
    DropDownDirective,
    OutsideclickDirective,
    LostpassComponent,
    PagesComponent,
    AffiliateComponent,
    MessagesComponent,
    MainComponent,
    UserComponent,
    SettingsComponent,
    ChangeComponent,
    ProfileComponent,
    ResetpassComponent,
    BridgeComponent,
    PlaceorderComponent,
    UnplaceorderComponent,
    RefferalComponent,
    BuytokenComponent,
    TransactionsComponent,
    UpdatewalletComponent,
    TwofapageComponent,
    LoaderDirective,
    AlertsComponent,
    NotificationsComponent,
    KycpageComponent,
    InfosetupComponent,
    SafeHtmlPipe,
    OfferComponent,
    AffiliatetwoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DefaultAppRouting,
    FilterPipeModule,
    ParticlesModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  exports: [
    CountDown,
    DropDownDirective,
    OutsideclickDirective,
    LostpassComponent,
    PagesComponent,
    AffiliateComponent,
    MessagesComponent,
    MainComponent,
    UserComponent,
    SettingsComponent,
    ChangeComponent,
    ProfileComponent,
    ResetpassComponent,
    BridgeComponent,
    PlaceorderComponent,
    UnplaceorderComponent,
    RefferalComponent,
    BuytokenComponent,
    TransactionsComponent,
    UpdatewalletComponent,
    TwofapageComponent,
    LoaderDirective,
    AlertsComponent,
    NotificationsComponent,
    KycpageComponent,
    SafeHtmlPipe,
    OfferComponent,
    AffiliatetwoComponent
  ],
  providers: [
    CookieService,
    AuthenticationService,
    AuthenticationGuard,
    BridgeGuard,
    DeactiveGuard,
    UserService,
    BridgeService,
    DashboardService,
    UserdataService,
    AlertsService,
    NotificationService,
    UserRegisterStatus,
    CountriesService,
    NationalityService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class ShareModule { }
