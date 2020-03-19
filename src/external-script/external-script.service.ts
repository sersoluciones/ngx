import { Injectable } from '@angular/core';

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
@Injectable({
  providedIn: 'root'
})
export class ExternalScriptService {

  constructor() { }

  insert(id: string, src: string) {
    const fjs = document.getElementsByTagName('script')[0];
    if (document.getElementById(id)) { return; }
    const js = document.createElement('script') as HTMLScriptElement;
    js.id = id;
    js.src = src;
    fjs.parentNode.insertBefore(js, fjs);
  }
}
