import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ClaimsService } from './claims.service';

/**
 * @description
 * Módulo para inicializar el servicio ClaimsService
 * @example
 * import { OPEN_ID_CONFIG, ClaimsModule } from '@sersol/ngx';
 *
 * @NgModule({
    imports: [
      ...,
      ClaimsModule.forRoot({
          provide: OPEN_ID_CONFIG,
          useValue: {
              claims: (document as any).CLAIMS
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
