import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FacebookSDKService } from './FacebookSDKService';

@NgModule()
export class FacebookSDKModule {
  static forRoot(fsdkConfigProvider: Provider): ModuleWithProviders {
    return {
      ngModule: FacebookSDKModule,
      providers: [
        fsdkConfigProvider,
        FacebookSDKService
      ]
    };
  }
}
