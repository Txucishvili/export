import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AdminModule} from '../../app/admin/admin.module';
import {environment} from '../../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';

if (environment.admin) {
  enableProdMode();
}
console.log('%c - application', 'background-color:rgba(190, 190, 190, 0.4);');

platformBrowserDynamic().bootstrapModule(AdminModule)
  .catch(err => console.log(err));
