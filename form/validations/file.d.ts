import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
export declare function maxFileSize(size: string): ValidatorFn;
export declare function minFileSize(size: string): ValidatorFn;
export declare function requiredFileType(ext: string | string[]): AsyncValidatorFn;
