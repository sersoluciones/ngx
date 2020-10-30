var GoogleSDKModule_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { GoogleSDKService } from './google-sdk.service';
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
let GoogleSDKModule = GoogleSDKModule_1 = class GoogleSDKModule {
    static forRoot(gapiConfigProvider) {
        return {
            ngModule: GoogleSDKModule_1,
            providers: [
                gapiConfigProvider,
                GoogleSDKService
            ]
        };
    }
};
GoogleSDKModule = GoogleSDKModule_1 = __decorate([
    NgModule()
], GoogleSDKModule);
export { GoogleSDKModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXNkay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImdvb2dsZS9nb29nbGUtc2RrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILElBQWEsZUFBZSx1QkFBNUIsTUFBYSxlQUFlO0lBQzFCLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQTRCO1FBQ3pDLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNULGtCQUFrQjtnQkFDbEIsZ0JBQWdCO2FBQ2pCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBVlksZUFBZTtJQUQzQixRQUFRLEVBQUU7R0FDRSxlQUFlLENBVTNCO1NBVlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHb29nbGVTREtTZXJ2aWNlIH0gZnJvbSAnLi9nb29nbGUtc2RrLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBNw7NkdWxvIHBhcmEgcGFyYW1ldHJpemFyIGxhIGF1dGVudGljYWNpw7NuIGNvbiBHb29nbGVcclxuICogQGV4YW1wbGVcclxuICogaW1wb3J0IHsgTkdfR0FQSV9DT05GSUcsIEdvb2dsZVNES01vZHVsZSB9IGZyb20gJ0BzZXJzb2wvbmd4JztcclxuICogQE5nTW9kdWxlKHtcclxuICogIGltcG9ydHM6IFtcclxuICogICAgLi4uLFxyXG4gKiAgICBHb29nbGVTREtNb2R1bGUuZm9yUm9vdCh7XHJcbiAqICAgICAgICBwcm92aWRlOiBOR19HQVBJX0NPTkZJRyxcclxuICogICAgICAgIHVzZVZhbHVlOiB7XHJcbiAqICAgICAgICAgICAgY2xpZW50X2lkOiBHT09HTEVfQ0xJRU5UX0lELFxyXG4gKiAgICAgICAgICAgIHNjb3BlOiAncHJvZmlsZSBlbWFpbCdcclxuICogICAgICAgIH1cclxuICogICAgfSksXHJcbiAqICAgIC4uLlxyXG4gKiAgXSxcclxuICogIGRlY2xhcmF0aW9uczogWy4uLl0sXHJcbiAqICBzY2hlbWFzOiBbLi4uXSxcclxuICogIHByb3ZpZGVyczogWy4uLl0sXHJcbiAqICBib290c3RyYXA6IFsuLi5dXHJcbiAqIH0pXHJcbiAqIGV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiAqL1xyXG5ATmdNb2R1bGUoKVxyXG5leHBvcnQgY2xhc3MgR29vZ2xlU0RLTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdChnYXBpQ29uZmlnUHJvdmlkZXI6IFByb3ZpZGVyKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogR29vZ2xlU0RLTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBnYXBpQ29uZmlnUHJvdmlkZXIsXHJcbiAgICAgICAgR29vZ2xlU0RLU2VydmljZVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=