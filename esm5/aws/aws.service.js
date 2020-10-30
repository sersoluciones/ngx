import { __decorate, __param } from "tslib";
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { hasValue } from '../utils/check';
import * as i0 from "@angular/core";
export var AWS_CONFIG = new InjectionToken('aws.config');
/**
 * @description
 * Servicio para verificar si es usuario tiene o no permisos para realizar ciertas acciones
 * @example
 * constructor(private claimsService: ClaimsService) { }
 */
var AwsService = /** @class */ (function () {
    function AwsService(config) {
        this.awsData = config;
    }
    Object.defineProperty(AwsService.prototype, "awsData", {
        get: function () {
            return this._awsData;
        },
        set: function (value) {
            this._awsData = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description
     * Método obtener url de assets en S3
     * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
     * @example
     * this.awsService.getS3Url('assets/file.png');
     * @returns {string}
     */
    AwsService.prototype.getS3Url = function (key) {
        if (hasValue(key)) {
            return "https://" + this.awsData.s3.bucket + ".s3.amazonaws.com/" + key;
        }
        else {
            return '';
        }
    };
    /**
     * @description
     * Método obtener url de assets en S3
     * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
     * @example
     * this.awsService.getS3Url('assets/file.png');
     * @returns {string}
     */
    AwsService.prototype.getS3BgUrl = function (key) {
        if (hasValue(key)) {
            return "url(https://" + this.awsData.s3.bucket + ".s3.amazonaws.com/" + key + ")";
        }
        else {
            return '';
        }
    };
    AwsService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [AWS_CONFIG,] }] }
    ]; };
    AwsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AwsService_Factory() { return new AwsService(i0.ɵɵinject(AWS_CONFIG)); }, token: AwsService, providedIn: "root" });
    AwsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(0, Inject(AWS_CONFIG))
    ], AwsService);
    return AwsService;
}());
export { AwsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImF3cy9hd3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFMUMsTUFBTSxDQUFDLElBQUksVUFBVSxHQUE0QixJQUFJLGNBQWMsQ0FBVSxZQUFZLENBQUMsQ0FBQztBQUUzRjs7Ozs7R0FLRztBQUlIO0lBVUksb0JBQWdDLE1BQWU7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQVRELHNCQUFXLCtCQUFPO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFDRCxVQUFtQixLQUFjO1lBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7OztPQUhBO0lBU0Q7Ozs7Ozs7T0FPRztJQUNJLDZCQUFRLEdBQWYsVUFBZ0IsR0FBVztRQUN2QixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNmLE9BQU8sYUFBVyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLDBCQUFxQixHQUFLLENBQUM7U0FDdEU7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLCtCQUFVLEdBQWpCLFVBQWtCLEdBQVc7UUFDekIsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDZixPQUFPLGlCQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sMEJBQXFCLEdBQUcsTUFBRyxDQUFDO1NBQzNFO2FBQU07WUFDSCxPQUFPLEVBQUUsQ0FBQztTQUNiO0lBQ0wsQ0FBQzs7Z0RBbENZLE1BQU0sU0FBQyxVQUFVOzs7SUFWckIsVUFBVTtRQUh0QixVQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNyQixDQUFDO1FBV2UsV0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7T0FWdEIsVUFBVSxDQTZDdEI7cUJBNUREO0NBNERDLEFBN0NELElBNkNDO1NBN0NZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBd3NEYXRhIH0gZnJvbSAnLi9JYXdzJztcclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gJy4uL3V0aWxzL2NoZWNrJztcclxuXHJcbmV4cG9ydCBsZXQgQVdTX0NPTkZJRzogSW5qZWN0aW9uVG9rZW48QXdzRGF0YT4gPSBuZXcgSW5qZWN0aW9uVG9rZW48QXdzRGF0YT4oJ2F3cy5jb25maWcnKTtcclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogU2VydmljaW8gcGFyYSB2ZXJpZmljYXIgc2kgZXMgdXN1YXJpbyB0aWVuZSBvIG5vIHBlcm1pc29zIHBhcmEgcmVhbGl6YXIgY2llcnRhcyBhY2Npb25lc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsYWltc1NlcnZpY2U6IENsYWltc1NlcnZpY2UpIHsgfVxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBd3NTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9hd3NEYXRhOiBBd3NEYXRhO1xyXG4gICAgcHVibGljIGdldCBhd3NEYXRhKCk6IEF3c0RhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hd3NEYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBhd3NEYXRhKHZhbHVlOiBBd3NEYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fYXdzRGF0YSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoQVdTX0NPTkZJRykgY29uZmlnOiBBd3NEYXRhKSB7XHJcbiAgICAgICAgdGhpcy5hd3NEYXRhID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBNw6l0b2RvIG9idGVuZXIgdXJsIGRlIGFzc2V0cyBlbiBTM1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFJ1dGEgZGVsIG9iamV0byBlbiBlbCBidWNrZXQgKFNpbiAnLycgYWwgcHJpbmNpcGlvKVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHRoaXMuYXdzU2VydmljZS5nZXRTM1VybCgnYXNzZXRzL2ZpbGUucG5nJyk7XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UzNVcmwoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChoYXNWYWx1ZShrZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgaHR0cHM6Ly8ke3RoaXMuYXdzRGF0YS5zMy5idWNrZXR9LnMzLmFtYXpvbmF3cy5jb20vJHtrZXl9YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBNw6l0b2RvIG9idGVuZXIgdXJsIGRlIGFzc2V0cyBlbiBTM1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFJ1dGEgZGVsIG9iamV0byBlbiBlbCBidWNrZXQgKFNpbiAnLycgYWwgcHJpbmNpcGlvKVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHRoaXMuYXdzU2VydmljZS5nZXRTM1VybCgnYXNzZXRzL2ZpbGUucG5nJyk7XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UzNCZ1VybChrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGhhc1ZhbHVlKGtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGB1cmwoaHR0cHM6Ly8ke3RoaXMuYXdzRGF0YS5zMy5idWNrZXR9LnMzLmFtYXpvbmF3cy5jb20vJHtrZXl9KWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=