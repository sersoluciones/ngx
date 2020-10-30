var AwsModule_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
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
let AwsModule = AwsModule_1 = class AwsModule {
    static forRoot(ConfigProvider) {
        return {
            ngModule: AwsModule_1,
            providers: [
                ConfigProvider,
                AwsService
            ]
        };
    }
};
AwsModule = AwsModule_1 = __decorate([
    NgModule()
], AwsModule);
export { AwsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZXJzb2wvbmd4LyIsInNvdXJjZXMiOlsiYXdzL2F3cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsSUFBYSxTQUFTLGlCQUF0QixNQUFhLFNBQVM7SUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUF3QjtRQUNyQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFdBQVM7WUFDbkIsU0FBUyxFQUFFO2dCQUNULGNBQWM7Z0JBQ2QsVUFBVTthQUNYO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBVlksU0FBUztJQURyQixRQUFRLEVBQUU7R0FDRSxTQUFTLENBVXJCO1NBVlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBd3NTZXJ2aWNlIH0gZnJvbSAnLi9hd3Muc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIE3Ds2R1bG8gcGFyYSBpbmljaWFsaXphciBlbCBzZXJ2aWNpbyBBd3NTZXJ2aWNlXHJcbiAqIEBleGFtcGxlXHJcbiAqIGltcG9ydCB7IEFXU19DT05GSUcsIEF3c01vZHVsZSB9IGZyb20gJ0BzZXJzb2wvbmd4JztcclxuICpcclxuICogQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgLi4uLFxyXG4gICAgICBBd3NNb2R1bGUuZm9yUm9vdCh7XHJcbiAgICAgICAgICBwcm92aWRlOiBBV1NfQ09ORklHLFxyXG4gICAgICAgICAgdXNlVmFsdWU6IHtcclxuICAgICAgICAgICAgICBzMzoge1xyXG4gICAgICAgICAgICAgICAgYnVja2V0OiAnc2VyLWFwcCdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICAuLi5cclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFsuLi5dLFxyXG4gICAgc2NoZW1hczogWy4uLl0sXHJcbiAgICBwcm92aWRlcnM6IFsuLi5dLFxyXG4gICAgYm9vdHN0cmFwOiBbLi4uXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4gKi9cclxuQE5nTW9kdWxlKClcclxuZXhwb3J0IGNsYXNzIEF3c01vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoQ29uZmlnUHJvdmlkZXI6IFByb3ZpZGVyKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogQXdzTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBDb25maWdQcm92aWRlcixcclxuICAgICAgICBBd3NTZXJ2aWNlXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==