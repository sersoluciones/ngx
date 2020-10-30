import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @description
 * Función para insertar scritps externos (ejem: gapi, facebook sdk)
 * @example
 * constructor(private externalScriptService: ExternalScriptService) { }
 *
 * this.externalScriptService.insert('google-jssdk', 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded');
 * @param {string} id - Id para la etiqueta script
 * @param {string} src - url para la etiqueta script
 */
var ExternalScriptService = /** @class */ (function () {
    function ExternalScriptService() {
    }
    ExternalScriptService.prototype.insert = function (id, src) {
        var fjs = document.getElementsByTagName('script')[0];
        if (document.getElementById(id)) {
            return;
        }
        var js = document.createElement('script');
        js.id = id;
        js.src = src;
        fjs.parentNode.insertBefore(js, fjs);
    };
    ExternalScriptService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ExternalScriptService_Factory() { return new ExternalScriptService(); }, token: ExternalScriptService, providedIn: "root" });
    ExternalScriptService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], ExternalScriptService);
    return ExternalScriptService;
}());
export { ExternalScriptService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtc2NyaXB0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImV4dGVybmFsLXNjcmlwdC9leHRlcm5hbC1zY3JpcHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFM0M7Ozs7Ozs7OztHQVNHO0FBSUg7SUFFRTtJQUFnQixDQUFDO0lBRWpCLHNDQUFNLEdBQU4sVUFBTyxFQUFVLEVBQUUsR0FBVztRQUM1QixJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzVDLElBQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFzQixDQUFDO1FBQ2pFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ1gsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDYixHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7SUFYVSxxQkFBcUI7UUFIakMsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLHFCQUFxQixDQVlqQztnQ0EzQkQ7Q0EyQkMsQUFaRCxJQVlDO1NBWlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIGluc2VydGFyIHNjcml0cHMgZXh0ZXJub3MgKGVqZW06IGdhcGksIGZhY2Vib29rIHNkaylcclxuICogQGV4YW1wbGVcclxuICogY29uc3RydWN0b3IocHJpdmF0ZSBleHRlcm5hbFNjcmlwdFNlcnZpY2U6IEV4dGVybmFsU2NyaXB0U2VydmljZSkgeyB9XHJcbiAqXHJcbiAqIHRoaXMuZXh0ZXJuYWxTY3JpcHRTZXJ2aWNlLmluc2VydCgnZ29vZ2xlLWpzc2RrJywgJ2h0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL3BsYXRmb3JtLmpzP29ubG9hZD1nb29nbGVTREtMb2FkZWQnKTtcclxuICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gSWQgcGFyYSBsYSBldGlxdWV0YSBzY3JpcHRcclxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyAtIHVybCBwYXJhIGxhIGV0aXF1ZXRhIHNjcmlwdFxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRXh0ZXJuYWxTY3JpcHRTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgaW5zZXJ0KGlkOiBzdHJpbmcsIHNyYzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBmanMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKSB7IHJldHVybjsgfVxyXG4gICAgY29uc3QganMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKSBhcyBIVE1MU2NyaXB0RWxlbWVudDtcclxuICAgIGpzLmlkID0gaWQ7XHJcbiAgICBqcy5zcmMgPSBzcmM7XHJcbiAgICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==