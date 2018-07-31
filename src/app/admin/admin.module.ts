import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ShareModule} from '../share/share.module';

import {AdminComponent} from './admin.component';
import {AdminDashboardComponent} from './dashboard/admin-dashboard.component';
import {AdminAppRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from '../_services/token.interceptor';
import {UserdataService} from '../_services/userdata.service';
import {DashboardService} from '../_services/dashboard.service';
import {AuthenticationService} from '../_services/authentication.service';
import {BridgeService} from '../_services/bridge.service';
import {UserService} from '../_services/user.service';
import {LayoutComponent} from './layout/layout.component';
import {HeadlineComponent} from './layout/headline/headline.component';
import {HeadUserComponent} from './layout/headline/head-user/head-user.component';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {ContentComponent} from './layout/content/content.component';
import {FooterComponent} from './layout/footer/footer.component';
import {VerificationsComponent} from './pages/verifications/verifications.component';
import {ModalComponent} from '../share/components/modal/modal.component';
import {ModalService} from '../_services/modal.service';
import {AdminAuthorisationComponent} from './adminauth/authorisation.component';
import {AdminLoginComponent} from './adminauth/login/login.component';
import {AdminAuthService} from '../_services/adminauth';
import {AdminCanActivateViaAuthGuard} from '../shared/adminguard.service';
import {AuthenticationGuard} from '../shared/guard-auth.service';
import {BridgeGuard} from '../shared/bridge.guard';
import { ParametrsComponent } from './pages/parametrs/parametrs.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import {SearchPageComponent} from './pages/search/search.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {environment} from '../../environments/environment';
import {LocalsService} from '../_services/locals.service';
import {OfferverifyComponent} from './pages/offerverify/offerverify.component';
import { AmbasadorConfirmComponent } from './pages/ambasador-confirm/ambasador-confirm.component';

@NgModule({
  declarations: [
    AdminAuthorisationComponent,
    AdminLoginComponent,
    AdminComponent,
    AdminDashboardComponent,
    LayoutComponent,
    HeadlineComponent,
    HeadUserComponent,
    NavigationComponent,
    ContentComponent,
    FooterComponent,
    VerificationsComponent,
    ModalComponent,
    ParametrsComponent,
    UpdatesComponent,
    SearchPageComponent,
    OfferverifyComponent,
    AmbasadorConfirmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminAppRoutingModule,
    ShareModule
  ],
  providers: [
    AuthenticationService,
    AdminAuthService,
    AdminCanActivateViaAuthGuard,
    AuthenticationGuard,
    BridgeGuard,
    UserService,
    BridgeService,
    DashboardService,
    UserdataService,
    ModalService,
    LocalsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule {
}
