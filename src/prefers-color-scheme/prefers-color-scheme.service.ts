import { EventEmitter, Injectable, Output } from '@angular/core';

/**
 * @description
 * Clase para obtener, observar y cambiar el esquema de color claro/oscuro
 * @example
 * constructor(prefersColorSchemeService: PrefersColorSchemeService) { }
 *
 * this.prefersColorSchemeService.init(); // Setea el esquema inicial
 * this.prefersColorSchemeService.watch(); // Observa cambio de esquema en OS
 */
@Injectable({
    providedIn: 'root'
})
export class PrefersColorSchemeService {
    private _Scheme: MediaQueryList;
    public get Scheme(): MediaQueryList {
        return this._Scheme;
    }
    public set Scheme(value: MediaQueryList) {
        this._Scheme = value;
    }

    private _SchemeLightClassName = 'scheme-light';
    public get SchemeLightClassName() {
        return this._SchemeLightClassName;
    }
    public set SchemeLightClassName(value) {
        this._SchemeLightClassName = value;
    }

    private _SchemeDarkClassName = 'scheme-dark';
    public get SchemeDarkClassName() {
        return this._SchemeDarkClassName;
    }
    public set SchemeDarkClassName(value) {
        this._SchemeDarkClassName = value;
    }

    dark = false;

    @Output() changes = new EventEmitter<boolean>();

    constructor() {
        this.Scheme = window.matchMedia('(prefers-color-scheme: dark)');
    }

    /**
     * @description
     * Inicializar el esquema de color
     * @usageNotes
     * Usarse unicamente si se desea aplicar el esquema de color acorde al esquema de color del sistema operativo
     */
    init() {
        if (this.Scheme.matches) {
            this.enableDark();
        } else {
            this.enableLight();
        }


    }

    /**
     * @description
     * Obtener el esquema de color actual del SO
     * @returns {string} Esquema de color
     */
    get(): string {
        if (this.Scheme.matches) {
            return 'dark';
        } else {
            return 'light';
        }
    }

    /**
     * @description
     * Agrega SchemeDarkClassName y remueve SchemeLightClassName a la etiqueta body
     */
    enableDark() {
        const body = document.getElementsByTagName('body')[0];

        if (body.classList.contains(this.SchemeLightClassName)) {
            body.classList.remove(this.SchemeLightClassName);
        }

        body.classList.add(this.SchemeDarkClassName);

        this.dark = true;

        this.changes.emit(true);
    }

    /**
     * @description
     * Agrega SchemeLightClassName y remueve SchemeDarkClassName a la etiqueta body
     */
    enableLight() {
        const body = document.getElementsByTagName('body')[0];

        if (body.classList.contains(this.SchemeDarkClassName)) {
            body.classList.remove(this.SchemeDarkClassName);
        }

        body.classList.add(this.SchemeLightClassName);

        this.dark = false;

        this.changes.emit(false);
    }

    /**
     * @description
     * Alternar entre tema oscuro ó claro
     * @usageNotes
     * Usarse unicamente si se desea aplicar el esquema de color acorde al esquema de color del sistema operativo
     */
    toggle() {
        if (this.dark) {
            this.enableLight();
        } else {
            this.enableDark();
        }
    }

    /**
     * @description
     * Habilita el cambio automatico de esquema de color según el cambio de esquema de color del SO
     */
    watch() {

        const setScheme = (ev: MediaQueryListEvent) => {
            if (ev.matches) {
                console.log('Changed to dark mode');
                this.enableDark();
            } else {
                console.log('Changed to light mode');
                this.enableLight();
            }
        };

        if (typeof this.Scheme.onchange === 'function') {

            this.Scheme.onchange = setScheme;

        } else if (typeof this.Scheme.addEventListener === 'function') {

            this.Scheme.addEventListener('change', setScheme);

            // tslint:disable-next-line: deprecation
        } else if (typeof this.Scheme.addListener === 'function') {

            // tslint:disable-next-line: deprecation
            this.Scheme.addListener(setScheme);

        }
    }
}
