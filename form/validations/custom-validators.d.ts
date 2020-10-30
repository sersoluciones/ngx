import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BaseValidationModel } from './remote';
/**
 * Validaciones adicionales para Form Control's
 */
export declare class CustomValidators {
    /**
     * Verifica si los campos proveidos son iguales
     * @param originalPathField Path del campo original
     * @param duplicatePathField Path del campo que deberia ser igual al original
     */
    static match(originalPathField: string, duplicatePathField: string): ValidatorFn;
    /**
     * Verifica si un campo es menor a otro
     * @param BasePathField Path del campo que debe ser menor
     * @param TargetPathField Path del campo que deberia ser mayor
     */
    static lowerThan(BasePathField: string, TargetPathField: string): ValidatorFn;
    /**
     * Verifica si un campo es menor o igual a otro
     * @param BasePathField Path del campo que debe ser menor o igual
     * @param TargetPathField Path del campo que deberia ser mayor o igual
     */
    static lowerOrEqualThan(BasePathField: string, TargetPathField: string): ValidatorFn;
    /**
     * Verifica si un campo es mayor a otro
     * @param BasePathField Path del campo que debe ser mayor
     * @param TargetPathField Path del campo que deberia ser menor
     */
    static greaterThan(BasePathField: string, TargetPathField: string): ValidatorFn;
    /**
     * Verifica si un campo es mayor o igual a otro
     * @param BasePathField Path del campo que debe ser mayor o igual
     * @param TargetPathField Path del campo que deberia ser menor o igual
     */
    static greaterOrEqualThan(BasePathField: string, TargetPathField: string): ValidatorFn;
    /**
     * Verifica si el tamaño no excede el tamaño maximo indicado
     * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
     */
    static maxFileSize(size: string): ValidatorFn;
    /**
     * Verifica si el tamaño es mayor el tamaño mínimo indicado
     * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
     */
    static minFileSize(size: string): ValidatorFn;
    /**
     * Verifica si el archivo tiene una extensión adminitida por medio de su cabecera
     * @param ext Extensiones admitidas
     */
    static requiredFileType(ext: string | string[]): AsyncValidatorFn;
    /**
     * Verifica si existe dicho valor en la DB si coincide con el modelo y el nombre de campo
     * @param http
     * @param url
     * @param requestBody propiedad Id opcional para excluir de la busqueda un registro
     */
    static alreadyExist(http: HttpClient, url: string, requestBody: BaseValidationModel): AsyncValidatorFn;
}
