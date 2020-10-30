import { ModuleWithProviders, Provider } from '@angular/core';
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
export declare class GoogleSDKModule {
    static forRoot(gapiConfigProvider: Provider): ModuleWithProviders;
}
