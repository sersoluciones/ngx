import { HttpClient } from '@angular/common/http';
import { AsyncValidatorFn } from '@angular/forms';
export interface BaseValidationModel {
    Model: string;
    Field: string;
    Id?: string | number;
    Value?: any;
}
export declare function alreadyExist(http: HttpClient, url: string, requestBody: BaseValidationModel): AsyncValidatorFn;
