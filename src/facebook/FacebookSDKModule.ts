import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FacebookSDKService } from './FacebookSDKService';

/**
 * @description
 * Módulo para parametrizar la autenticación con Facebook
 * @example
 * import { NG_FSDK_CONFIG, FacebookSDKModule } from '@sersol/ngx';
 * @NgModule({
    imports: [
      ...,
      FacebookSDKModule.forRoot({
          provide: NG_FSDK_CONFIG,
          useValue: {
              appId: FACEBOOK_CLIENT_ID,
              cookie: true,
              xfbml: true,
              version: 'v6.0'
          }
      }),
      ...
    ],
    declarations: [...],
    schemas: [...],
    providers: [...],
    bootstrap: [...]
})
export class AppModule { }
 */
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
