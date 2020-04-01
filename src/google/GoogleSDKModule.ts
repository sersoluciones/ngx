import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { GoogleSDKService } from './GoogleSDKService';

/**
 * @description
 * Módulo para parametrizar la autenticación con Google
 * @example
 * import { NG_GAPI_CONFIG, GoogleSDKModule } from '@sersol/ngx';
 * @NgModule({
 *  imports: [
 *    ...,
 *    GoogleSDKModule.forRoot({
 *        provide: NG_GAPI_CONFIG,
 *        useValue: {
 *            client_id: GOOGLE_CLIENT_ID,
 *            scope: 'profile email'
 *        }
 *    }),
 *    ...
 *  ],
 *  declarations: [...],
 *  schemas: [...],
 *  providers: [...],
 *  bootstrap: [...]
 * })
 * export class AppModule { }
 */
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
