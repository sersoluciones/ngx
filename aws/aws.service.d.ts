import { AwsData } from './Iaws';
import { InjectionToken } from '@angular/core';
export declare let AWS_CONFIG: InjectionToken<AwsData>;
/**
 * @description
 * Servicio para verificar si es usuario tiene o no permisos para realizar ciertas acciones
 * @example
 * constructor(private claimsService: ClaimsService) { }
 */
export declare class AwsService {
    private _awsData;
    get awsData(): AwsData;
    set awsData(value: AwsData);
    constructor(config: AwsData);
    /**
     * @description
     * Método obtener url de assets en S3
     * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
     * @example
     * this.awsService.getS3Url('assets/file.png');
     * @returns {string}
     */
    getS3Url(key: string): string;
    /**
     * @description
     * Método obtener url de assets en S3
     * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
     * @example
     * this.awsService.getS3Url('assets/file.png');
     * @returns {string}
     */
    getS3BgUrl(key: string): string;
}
