import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { AwsService } from './aws.service';

/**
 * @description
 * Módulo para inicializar el servicio AwsService
 * @example
 * import { AWS_CONFIG, AwsModule } from '@sersol/ngx';
 *
 * @NgModule({
    imports: [
      ...,
      AwsModule.forRoot({
          provide: AWS_CONFIG,
          useValue: {
              s3: {
                bucket: 'ser-app'
              },
              cloudfront: {
                bucket: 'id'
              }
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
export class AwsModule {
  static forRoot(ConfigProvider: Provider): ModuleWithProviders<AwsModule> {
    return {
      ngModule: AwsModule,
      providers: [
        ConfigProvider,
        AwsService
      ]
    };
  }
}
