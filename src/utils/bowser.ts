import { Renderer2 } from '@angular/core';
import { Parser } from 'bowser';

/**
 * @description Agrega 4 clases css a un elemento HTML
 * @example <body class="bos-macOS bosv-10.15.4 bn-Chrome bv-81.0.4044.129">
 * @param {Parser.Parser} bowserInstance Objeto Bowser parseado
 * @param {Renderer2} renderer Elemento a modificar
 */
export function setBowserClasses(bowserInstance: Parser.Parser, renderer: Renderer2) {
    renderer.addClass(document.body, 'bos-' + bowserInstance.getOSName().replace(/ +/g, '-'));
    renderer.addClass(document.body, 'bosv-' + bowserInstance.getOSVersion().replace(/ +/g, '-'));
    renderer.addClass(document.body, 'bn-' + bowserInstance.getBrowserName().replace(/ +/g, '-'));
    renderer.addClass(document.body, 'bv-' + bowserInstance.getBrowserVersion().replace(/ +/g, '-'));
}
