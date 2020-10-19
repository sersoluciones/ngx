export declare module String {
    interface String {
        toCapitalize(...args: string[]): string;
    }
}

/**
 * Función para convertir un string en letra capital
 * @param value String a convertir
 */
/* String.prototype.toCapitalize = function (...args: string[]) {

    const value = this;
    const values = value.split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1));

    return values.join(' ');

}; */


/* declare module '@angular/forms/src/model' {
    interface FormGroup {
        setValueAndErrors(this: FormGroup, state: any, memberErrors: any): void;
    }
}

FormGroup.prototype.setValueAndErrors = function (this: FormGroup, state: any, memberErrors: any): void {
    this.setValue(state);
} */
