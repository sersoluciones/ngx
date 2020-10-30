/**
 * @description
 * Clase para obtener, observar y cambiar el esquema de color claro/oscuro
 * @example
 * constructor(prefersColorSchemeService: PrefersColorSchemeService) { }
 *
 * this.prefersColorSchemeService.init(); // Setea el esquema inicial
 * this.prefersColorSchemeService.watch(); // Observa cambio de esquema en OS
 */
export declare class PrefersColorSchemeService {
    private _Scheme;
    get Scheme(): MediaQueryList;
    set Scheme(value: MediaQueryList);
    private _SchemeLightClassName;
    get SchemeLightClassName(): string;
    set SchemeLightClassName(value: string);
    private _SchemeDarkClassName;
    get SchemeDarkClassName(): string;
    set SchemeDarkClassName(value: string);
    constructor();
    /**
     * @description
     * Inicializar el esquema de color
     * @usageNotes
     * Usarse unicamente si se desea aplicar el esquema de color acorde al esquema de color del sistema operativo
     */
    init(): void;
    /**
     * @description
     * Obtener el esquema de color actual del SO
     * @returns {string} Esquema de color
     */
    get(): string;
    /**
     * @description
     * Agrega SchemeDarkClassName y remueve SchemeLightClassName a la etiqueta body
     */
    enableDark(): void;
    /**
     * @description
     * Agrega SchemeLightClassName y remueve SchemeDarkClassName a la etiqueta body
     */
    enableLight(): void;
    /**
     * @description
     * Habilita el cambio automatico de esquema de color según el cambio de esquema de color del SO
     */
    watch(): void;
}
