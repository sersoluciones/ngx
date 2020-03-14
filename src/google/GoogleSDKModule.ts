import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { GoogleSDKService } from './GoogleSDKService';

@NgModule()
export class GoogleSDKModule {
  static forRoot(gapiConfigProvider: Provider): ModuleWithProviders {
    return {
      ngModule: GoogleSDKModule,
      providers: [
        gapiConfigProvider,
        GoogleSDKService
      ]
    };
  }
}
