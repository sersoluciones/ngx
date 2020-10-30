import { __decorate, __param } from "tslib";
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { hasValue } from '../utils/check';
import * as i0 from "@angular/core";
export let AWS_CONFIG = new InjectionToken('aws.config');
/**
 * @description
 * Servicio para verificar si es usuario tiene o no permisos para realizar ciertas acciones
 * @example
 * constructor(private claimsService: ClaimsService) { }
 */
let AwsService = class AwsService {
    constructor(config) {
        this.awsData = config;
    }
    get awsData() {
        return this._awsData;
    }
    set awsData(value) {
        this._awsData = value;
    }
    /**
     * @description
     * Método obtener url de assets en S3
     * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
     * @example
     * this.awsService.getS3Url('assets/file.png');
     * @returns {string}
     */
    getS3Url(key) {
        if (hasValue(key)) {
            return `https://${this.awsData.s3.bucket}.s3.amazonaws.com/${key}`;
        }
        else {
            return '';
        }
    }
    /**
     * @description
     * Método obtener url de assets en S3
     * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
     * @example
     * this.awsService.getS3Url('assets/file.png');
     * @returns {string}
     */
    getS3BgUrl(key) {
        if (hasValue(key)) {
            return `url(https://${this.awsData.s3.bucket}.s3.amazonaws.com/${key})`;
        }
        else {
            return '';
        }
    }
};
AwsService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [AWS_CONFIG,] }] }
];
AwsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AwsService_Factory() { return new AwsService(i0.ɵɵinject(AWS_CONFIG)); }, token: AwsService, providedIn: "root" });
AwsService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(AWS_CONFIG))
], AwsService);
export { AwsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImF3cy9hd3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFMUMsTUFBTSxDQUFDLElBQUksVUFBVSxHQUE0QixJQUFJLGNBQWMsQ0FBVSxZQUFZLENBQUMsQ0FBQztBQUUzRjs7Ozs7R0FLRztBQUlILElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFVbkIsWUFBZ0MsTUFBZTtRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBVEQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFXLE9BQU8sQ0FBQyxLQUFjO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFNRDs7Ozs7OztPQU9HO0lBQ0ksUUFBUSxDQUFDLEdBQVc7UUFDdkIsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDZixPQUFPLFdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7U0FDdEU7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLFVBQVUsQ0FBQyxHQUFXO1FBQ3pCLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsT0FBTyxlQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFDO1NBQzNFO2FBQU07WUFDSCxPQUFPLEVBQUUsQ0FBQztTQUNiO0lBQ0wsQ0FBQztDQUNKLENBQUE7OzRDQW5DZ0IsTUFBTSxTQUFDLFVBQVU7OztBQVZyQixVQUFVO0lBSHRCLFVBQVUsQ0FBQztRQUNSLFVBQVUsRUFBRSxNQUFNO0tBQ3JCLENBQUM7SUFXZSxXQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtHQVZ0QixVQUFVLENBNkN0QjtTQTdDWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXdzRGF0YSB9IGZyb20gJy4vSWF3cyc7XHJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tICcuLi91dGlscy9jaGVjayc7XHJcblxyXG5leHBvcnQgbGV0IEFXU19DT05GSUc6IEluamVjdGlvblRva2VuPEF3c0RhdGE+ID0gbmV3IEluamVjdGlvblRva2VuPEF3c0RhdGE+KCdhd3MuY29uZmlnJyk7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIFNlcnZpY2lvIHBhcmEgdmVyaWZpY2FyIHNpIGVzIHVzdWFyaW8gdGllbmUgbyBubyBwZXJtaXNvcyBwYXJhIHJlYWxpemFyIGNpZXJ0YXMgYWNjaW9uZXNcclxuICogQGV4YW1wbGVcclxuICogY29uc3RydWN0b3IocHJpdmF0ZSBjbGFpbXNTZXJ2aWNlOiBDbGFpbXNTZXJ2aWNlKSB7IH1cclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXdzU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfYXdzRGF0YTogQXdzRGF0YTtcclxuICAgIHB1YmxpYyBnZXQgYXdzRGF0YSgpOiBBd3NEYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXdzRGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgYXdzRGF0YSh2YWx1ZTogQXdzRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2F3c0RhdGEgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEFXU19DT05GSUcpIGNvbmZpZzogQXdzRGF0YSkge1xyXG4gICAgICAgIHRoaXMuYXdzRGF0YSA9IGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogTcOpdG9kbyBvYnRlbmVyIHVybCBkZSBhc3NldHMgZW4gUzNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBSdXRhIGRlbCBvYmpldG8gZW4gZWwgYnVja2V0IChTaW4gJy8nIGFsIHByaW5jaXBpbylcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB0aGlzLmF3c1NlcnZpY2UuZ2V0UzNVcmwoJ2Fzc2V0cy9maWxlLnBuZycpO1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFMzVXJsKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoaGFzVmFsdWUoa2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYGh0dHBzOi8vJHt0aGlzLmF3c0RhdGEuczMuYnVja2V0fS5zMy5hbWF6b25hd3MuY29tLyR7a2V5fWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogTcOpdG9kbyBvYnRlbmVyIHVybCBkZSBhc3NldHMgZW4gUzNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBSdXRhIGRlbCBvYmpldG8gZW4gZWwgYnVja2V0IChTaW4gJy8nIGFsIHByaW5jaXBpbylcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB0aGlzLmF3c1NlcnZpY2UuZ2V0UzNVcmwoJ2Fzc2V0cy9maWxlLnBuZycpO1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFMzQmdVcmwoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChoYXNWYWx1ZShrZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgdXJsKGh0dHBzOi8vJHt0aGlzLmF3c0RhdGEuczMuYnVja2V0fS5zMy5hbWF6b25hd3MuY29tLyR7a2V5fSlgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19