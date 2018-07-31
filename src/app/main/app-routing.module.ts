import {Injectable, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {CanActivateViaAuthGuard} from '../shared/guard.service';
import {MainComponent} from '../share/pages/main/main.component';
import {AffiliateComponent} from '../share/pages/affiliate/affiliate.component';
import {MessagesComponent} from '../share/pages/messages/messages.component';
import {TransactionsComponent} from '../share/pages/transactions/transactions.component';
import {BuytokenComponent} from '../share/pages/buytoken/buytoken.component';
import {UpdatewalletComponent} from '../share/pages/updatewallet/updatewallet.component';
import {UserComponent} from '../share/pages/user/user.component';
import {ProfileComponent} from '../share/pages/user/profile/profile.component';
import {ChangeComponent} from '../share/pages/user/change/change.component';
import {SettingsComponent} from '../share/pages/user/settings/settings.component';
import {AuthenticationGuard} from '../shared/guard-auth.service';
import {EmailconfirmComponent} from '../share/bridge/emailconfirm/emailconfirm.component';
import {BridgeGuard} from '../shared/bridge.guard';
import {EmailconfirmapplyComponent} from '../share/bridge/emailconfirmapply/emailconfirmapply.component';
import {RefferalComponent} from '../share/bridge/refferal/refferal.component';
import {KycconfirmComponent} from '../share/bridge/kycconfirm/kycconfirm.component';
import {TwofapageComponent} from '../share/pages/user/twofapage/twofapage.component';
import {DeactiveGuard} from '../shared/deactive.guard';
import {AuthorisationComponent} from './authorisation/authorisation.component';
import {LoginComponent} from './authorisation/login/login.component';
import {RegisterComponent} from './authorisation/register/register.component';
import {LostpassComponent} from '../share/authorisation/lostpass/lostpass.component';
import {ResetpassComponent} from '../share/authorisation/resetpass/resetpass.component';
import {KycpageComponent} from '../share/pages/user/kycpage/kycpage.component';
import {InfosetupComponent} from '../share/bridge/infosetup/infosetup.component';
import {UserRegisterStatus} from '../shared/user_register_status.guard';
import {OfferComponent} from '../share/pages/offer/offer.component';
import {AffiliatetwoComponent} from '../share/pages/affiliatetwo/affiliatetwo.component';


const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [CanActivateViaAuthGuard],
    children: [
      {path: '', component: MainComponent},
      {path: 'main', component: MainComponent},
      {path: 'affiliate', component: AffiliateComponent},
      {path: 'ambassador', component: AffiliatetwoComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'transactions', component: TransactionsComponent, canActivate: [DeactiveGuard]},
      {path: 'buy-token', component: BuytokenComponent},
      {path: 'offer', component: OfferComponent},
      {path: 'updatewallet', component: UpdatewalletComponent},
      {
        path: 'user', component: UserComponent,
        children: [
          {path: '', component: ProfileComponent},
          {path: 'profile', component: ProfileComponent},
          {path: 'change', component: ChangeComponent},
          {path: 'settings', component: SettingsComponent},
          {path: '2fa', component: TwofapageComponent},
          {path: 'kyc', component: KycpageComponent}
        ]
      },
    ]
  },
  {
    path: 'auth', component: AuthorisationComponent, canActivate: [AuthenticationGuard],
    children: [
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'lostpass', component: LostpassComponent},
      {path: 'signup', component: RegisterComponent},
      {path: 'reset', component: ResetpassComponent},
      {path: 'confirm', component: ResetpassComponent}
    ]
  },
  {path: 'confirmation', component: EmailconfirmComponent, canActivate: [BridgeGuard]},
  {
    path: 'confirm', component: EmailconfirmapplyComponent,
    children: [
      {path: ':token', component: EmailconfirmapplyComponent}
    ]
  },
  {path: 'amb', component: RefferalComponent},
  {path: 'kyc-verify', component: KycconfirmComponent},
  {path: 'finish', component: InfosetupComponent, canActivate: [UserRegisterStatus]},
  {path: '***', redirectTo: ''},
  {path: '**', redirectTo: ''}
];

@Injectable()
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
