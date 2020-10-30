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
var AwsModule = /** @class */ (function () {
    function AwsModule() {
    }
    AwsModule_1 = AwsModule;
    AwsModule.forRoot = function (ConfigProvider) {
        return {
            ngModule: AwsModule_1,
            providers: [
                ConfigProvider,
                AwsService
            ]
        };
    };
    var AwsModule_1;
    AwsModule = AwsModule_1 = __decorate([
        NgModule()
    ], AwsModule);
    return AwsModule;
}());
export { AwsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZXJzb2wvbmd4LyIsInNvdXJjZXMiOlsiYXdzL2F3cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSDtJQUFBO0lBVUEsQ0FBQztrQkFWWSxTQUFTO0lBQ2IsaUJBQU8sR0FBZCxVQUFlLGNBQXdCO1FBQ3JDLE9BQU87WUFDTCxRQUFRLEVBQUUsV0FBUztZQUNuQixTQUFTLEVBQUU7Z0JBQ1QsY0FBYztnQkFDZCxVQUFVO2FBQ1g7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFUVSxTQUFTO1FBRHJCLFFBQVEsRUFBRTtPQUNFLFNBQVMsQ0FVckI7SUFBRCxnQkFBQztDQUFBLEFBVkQsSUFVQztTQVZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQXdzU2VydmljZSB9IGZyb20gJy4vYXdzLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBNw7NkdWxvIHBhcmEgaW5pY2lhbGl6YXIgZWwgc2VydmljaW8gQXdzU2VydmljZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBpbXBvcnQgeyBBV1NfQ09ORklHLCBBd3NNb2R1bGUgfSBmcm9tICdAc2Vyc29sL25neCc7XHJcbiAqXHJcbiAqIEBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgIC4uLixcclxuICAgICAgQXdzTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICAgICAgcHJvdmlkZTogQVdTX0NPTkZJRyxcclxuICAgICAgICAgIHVzZVZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgczM6IHtcclxuICAgICAgICAgICAgICAgIGJ1Y2tldDogJ3Nlci1hcHAnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgICAgLi4uXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbLi4uXSxcclxuICAgIHNjaGVtYXM6IFsuLi5dLFxyXG4gICAgcHJvdmlkZXJzOiBbLi4uXSxcclxuICAgIGJvb3RzdHJhcDogWy4uLl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuICovXHJcbkBOZ01vZHVsZSgpXHJcbmV4cG9ydCBjbGFzcyBBd3NNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KENvbmZpZ1Byb3ZpZGVyOiBQcm92aWRlcik6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IEF3c01vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ29uZmlnUHJvdmlkZXIsXHJcbiAgICAgICAgQXdzU2VydmljZVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=