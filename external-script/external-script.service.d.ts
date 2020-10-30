/**
 * @description
 * Función para insertar scritps externos (ejem: gapi, facebook sdk)
 * @example
 * constructor(private externalScriptService: ExternalScriptService) { }
 *
 * this.externalScriptService.insert('google-jssdk', 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded');
 * @param {string} id - Id para la etiqueta script
 * @param {string} src - url para la etiqueta script
 */
export declare class ExternalScriptService {
    constructor();
    insert(id: string, src: string): void;
}
