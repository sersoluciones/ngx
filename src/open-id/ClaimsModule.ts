import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ClaimsService } from './ClaimsService';

@NgModule()
export class ClaimsModule {
  static forRoot(ConfigProvider: Provider): ModuleWithProviders {
    return {
      ngModule: ClaimsModule,
      providers: [
        ConfigProvider,
        ClaimsService
      ]
    };
  }
}
