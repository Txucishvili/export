import {Injectable, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminDashboardComponent} from './dashboard/admin-dashboard.component';
import {MainComponent} from '../share/pages/main/main.component';
import {AffiliateComponent} from '../share/pages/affiliate/affiliate.component';
import {MessagesComponent} from '../share/pages/messages/messages.component';
import {PlaceorderComponent} from '../share/pages/placeorder/placeorder.component';
import {UserComponent} from '../share/pages/user/user.component';
import {ProfileComponent} from '../share/pages/user/profile/profile.component';
import {ChangeComponent} from '../share/pages/user/change/change.component';
import {SettingsComponent} from '../share/pages/user/settings/settings.component';
import {LostpassComponent} from '../share/authorisation/lostpass/lostpass.component';
import {ResetpassComponent} from '../share/authorisation/resetpass/resetpass.component';
import {UnplaceorderComponent} from '../share/pages/unplaceorder/unplaceorder.component';
import {TransactionsComponent} from '../share/pages/transactions/transactions.component';
import {BuytokenComponent} from '../share/pages/buytoken/buytoken.component';
import {VerificationsComponent} from './pages/verifications/verifications.component';
import {UpdatewalletComponent} from '../share/pages/updatewallet/updatewallet.component';
import {AdminAuthorisationComponent} from './adminauth/authorisation.component';
import {AdminLoginComponent} from './adminauth/login/login.component';
import {AdminCanActivateViaAuthGuard} from '../shared/adminguard.service';
import {AuthenticationGuard} from '../shared/guard-auth.service';
import {ParametrsComponent} from './pages/parametrs/parametrs.component';
import {UpdatesComponent} from './pages/updates/updates.component';
import {SearchPageComponent} from './pages/search/search.component';
import {TwofapageComponent} from '../share/pages/user/twofapage/twofapage.component';
import {OfferverifyComponent} from './pages/offerverify/offerverify.component';
import {OfferComponent} from '../share/pages/offer/offer.component';
import {AffiliatetwoComponent} from '../share/pages/affiliatetwo/affiliatetwo.component';
import {AmbasadorConfirmComponent} from './pages/ambasador-confirm/ambasador-confirm.component';


const appRoutes: Routes = [
  {path: '', component: AdminDashboardComponent, canActivate: [AdminCanActivateViaAuthGuard],
    children: [
      {path: '', component: MainComponent},
      {path: 'main', component: MainComponent},
      {path: 'affiliate', component: AffiliateComponent},
      {path: 'ambassador', component: AffiliatetwoComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'placeorder', component: PlaceorderComponent},
      {path: 'unplaceorder', component: UnplaceorderComponent},
      {path: 'transactions', component: TransactionsComponent},
      {path: 'buy-token', component: BuytokenComponent},
      {path: 'updatewallet', component: UpdatewalletComponent},
      {path: 'verifications', component: VerificationsComponent},
      {path: 'parametrs', component: ParametrsComponent},
      {path: 'search', component: SearchPageComponent},
      {path: 'updates', component: UpdatesComponent},
      {path: 'offer', component: OfferComponent},
      {path: 'offervirify', component: OfferverifyComponent},
      {path: 'ambasador-confirm', component: AmbasadorConfirmComponent},
      {
        path: 'user', component: UserComponent,
        children: [
          {path: '', component: ProfileComponent},
          {path: 'profile', component: ProfileComponent},
          {path: 'change', component: ChangeComponent},
          {path: 'settings', component: SettingsComponent},
          {path: '2fa', component: TwofapageComponent}
        ]
      },
    ]
  },
  {
    path: 'auth', component: AdminAuthorisationComponent, canActivate: [AuthenticationGuard],
    children: [
      {path: '', component: AdminLoginComponent},
      {path: 'login', component: AdminLoginComponent},
      {path: 'lostpass', component: LostpassComponent},
      {path: 'reset', component: ResetpassComponent}
    ]
  },
  {path: '***', redirectTo: ''},
  {path: '**', redirectTo: ''}
];

@Injectable()
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AdminAppRoutingModule {

}
