import { ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { betweenRange, dateGreaterThan, dateLowerThan, greaterOrEqualThan, greaterThan, lowerOrEqualThan, lowerThan } from './comparison';
import { match, verifyNIT } from './match';
import { fileType, maxFileSize, minFileSize, requiredFileType } from './file';
import { alreadyExist, BaseValidationModel } from './remote';

// @dynamic
/**
 * Validaciones adicionales para Form Control's
 */
export class CustomValidatorsLegacy {

    /**
     * Verifica si los campos proveídos son iguales
     * @param originalPathField Path del campo original
     * @param duplicatePathField Path del campo que debería ser igual al original
     */
    static match(originalPathField: string, duplicatePathField: string): ValidatorFn {
        return match(originalPathField, duplicatePathField);
    }

    /**
     * Verifica si los campos proveídos son iguales
     * @param originalPathField Path del campo original
     * @param duplicatePathField Path del campo que debería ser igual al original
     */
    static verifyNIT(control: AbstractControl): { [key: string]: any } | null {
        return verifyNIT(control);
    }

    /**
     * Verifica si un campo es menor a otro
     * @param TargetPathField Path del campo que debería ser menor
     * @param GreaterPathField Path del campo que debe ser mayor
     */
    static lowerThan(TargetPathField: string, GreaterPathField: string): ValidatorFn {
        return lowerThan(TargetPathField, GreaterPathField);
    }

    /**
     * Verifica si un campo es menor o igual a otro
     * @param TargetPathField Path del campo que debería ser menor o igual
     * @param GreaterPathField Path del campo que debe ser mayor o igual
     */
    static lowerOrEqualThan(TargetPathField: string, GreaterPathField: string): ValidatorFn {
        return lowerOrEqualThan(TargetPathField, GreaterPathField);
    }

    /**
     * Verifica si un campo es mayor a otro
     * @param TargetPathField Path del campo que debería ser mayor
     * @param LowerPathField Path del campo que debe ser menor
     */
    static greaterThan(TargetPathField: string, LowerPathField: string): ValidatorFn {
        return greaterThan(TargetPathField, LowerPathField);
    }

    /**
     * Verifica si un campo es mayor o igual a otro
     * @param TargetPathField Path del campo que debería ser mayor
     * @param LowerPathField Path del campo que debe ser menor
     */
    static greaterOrEqualThan(TargetPathField: string, LowerPathField: string): ValidatorFn {
        return greaterOrEqualThan(TargetPathField, LowerPathField);
    }

    /**
     * Verifica si un campo esta entre un rango dado
     * @param TargetPathField Path del campo que debe estar en la mitad del rango
     * @param LowerPathField Path del campo que debería ser el rango menor
     * @param GreaterPathField Path del campo que debería ser el rango mayor
     */
    static betweenRange(TargetPathField: string, LowerPathField: string, GreaterPathField: string): ValidatorFn {
        return betweenRange(TargetPathField, LowerPathField, GreaterPathField);
    }

    /**
     * Verifica si una fecha es mayor a otra
     * @param TargetPathField Path del campo que debería ser mayor
     * @param LowerPathField Path del campo que debe ser menor
     */
    static dateLowerThan(TargetPathField: string, LowerPathField: string): ValidatorFn {
        return dateLowerThan(TargetPathField, LowerPathField);
    }

    /**
     * Verifica si una fecha es menor a otra
     * @param TargetPathField Path del campo que debería ser menor
     * @param GreaterPathField Path del campo que debe ser mayor
     */
    static dateGreaterThan(TargetPathField: string, GreaterPathField: string): ValidatorFn {
        return dateGreaterThan(TargetPathField, GreaterPathField);
    }

    /**
     * Verifica si el tamaño no excede el tamaño máximo indicado
     * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
     */
    static maxFileSize(size: string): ValidatorFn {
        return maxFileSize(size);
    }

    /**
     * Verifica si el tamaño es mayor el tamaño mínimo indicado
     * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
     */
    static minFileSize(size: string): ValidatorFn {
        return minFileSize(size);
    }

    /**
     * Verifica si el archivo tiene una extensión admitida por medio de su cabecera
     * @param ext Extensiones admitidas
     */
    static requiredFileType(ext: string | string[]): AsyncValidatorFn {
        return requiredFileType(ext);
    }

    /**
     * Verifica si el archivo tiene una extensión admitida por medio de su extensión
     * @param ext Extensiones admitidas
     */
    static fileType(types: string | string[]): ValidatorFn {
        return fileType(types);
    }

    /**
     * Verifica si existe dicho valor en la DB si coincide con el modelo y el nombre de campo
     * @param http
     * @param url
     * @param requestBody propiedad Id opcional para excluir de la búsqueda un registro
     */
    static alreadyExist(http: HttpClient, url: string, requestBody: BaseValidationModel): AsyncValidatorFn {
        return alreadyExist(http, url, requestBody);
    }

}
