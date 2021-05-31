import { AwsData } from './Iaws';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { hasValue } from '../utils/check';

export let AWS_CONFIG: InjectionToken<AwsData> = new InjectionToken<AwsData>('aws.config');

/**
 * @description
 * Servicio para verificar si es usuario tiene o no permisos para realizar ciertas acciones
 * @example
 * constructor(private claimsService: ClaimsService) { }
 */
@Injectable({
    providedIn: 'root'
})
export class AwsService {

    private _awsData: AwsData;
    public get awsData(): AwsData {
        return this._awsData;
    }
    public set awsData(value: AwsData) {
        this._awsData = value;
    }

    constructor(@Inject(AWS_CONFIG) config: AwsData) {
        this.awsData = config;
    }

    /**
     * @description
     * Método obtener url de assets en S3
     * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
     * @example
     * this.awsService.getS3Url('assets/file.png');
     * @returns {string}
     */
    public getS3Url(key: string): string {
        if (hasValue(key)) {
            return `https://${this.awsData.s3.bucket}.s3.amazonaws.com/${key}`;
        } else {
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
    public getCloudfrontUrl(key: string): string {
        if (hasValue(key)) {
            return `https://${this.awsData.cloudfront?.id}.cloudfront.net/${key}`;
        } else {
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
    public getS3BgUrl(key: string): string {
        if (hasValue(key)) {
            return `url(https://${this.awsData.s3.bucket}.s3.amazonaws.com/${key})`;
        } else {
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
    public getCloudfrontBgUrl(key: string): string {
        if (hasValue(key)) {
            return `url(https://${this.awsData.cloudfront?.id}.cloudfront.net/${key})`;
        } else {
            return '';
        }
    }
}
