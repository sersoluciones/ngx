import { Injectable } from '@angular/core';
import { FsDocument, FsDocumentElement } from './fullscreen-interface';

/**
 * @description
 * Clase para entrar y salir del modo pantalla completa en el navegador web
 * @example
 * constructor(public fullscreenService: FullscreenService) { }
 *
 * this.fullscreenService.enable(); // Habilita el modo pantalla completa
 * this.fullscreenService.disable(); // Deshabilita el modo pantalla completa
 * this.fullscreenService.isEnabled // Obtiene el estado del servicio
 */
@Injectable({
  providedIn: 'root'
})
export class FullscreenService {

  private _isEnabled: boolean;
  public get isEnabled(): boolean {
    return this._isEnabled;
  }
  public set isEnabled(value: boolean) {
    this._isEnabled = value;
  }

  /**
   * Crea una instancia de Fullscreen
   */
  constructor () {

    const setEnabled = (e: Event) => {

      const fsDoc = <FsDocument> document;

      if (fsDoc.fullscreenElement !== undefined) {
        this.isEnabled = !(fsDoc.fullscreenElement === null);

      } else if (fsDoc.webkitFullscreenElement !== undefined) { /* Old Chrome, Safari and Opera */
        this.isEnabled = !(fsDoc.webkitFullscreenElement === null);

      } else if (fsDoc.msFullscreenElement !== undefined) { /* IE / Edge */
        this.isEnabled = !(fsDoc.msFullscreenElement === null);

      } else if (fsDoc.mozFullScreenElement !== undefined) { /* Firefox */
        this.isEnabled = !(fsDoc.mozFullScreenElement === null);

      }
    };

    document.addEventListener('fullscreenchange', e => setEnabled(e));

    /* Chrome, Safari and Opera */
    document.addEventListener('webkitfullscreenchange', e => setEnabled(e));

    /* IE / Edge */
    document.addEventListener('msfullscreenchange', e => setEnabled(e));

    /* Firefox */
    document.addEventListener('mozfullscreenchange', e => setEnabled(e));
  }

  /**
   * @description
   * Habilita el modo pantalla completa
   */
  enable(): void {

    const elem = <FsDocumentElement> document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Old Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    } else if ('mozRequestFullScreen' in elem) { /* Firefox */
      elem.mozRequestFullScreen();
    }
  }

  /**
   * @description
   * Deshabilita el modo pantalla completa
   */
  disable(): void {

    const fsDoc = <FsDocument> document;

    if (this.isEnabled && fsDoc.exitFullscreen) {
      fsDoc.exitFullscreen();
    } else if (this.isEnabled && fsDoc.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      fsDoc.webkitExitFullscreen();
    } else if (this.isEnabled && fsDoc.msExitFullscreen) { /* IE/Edge */
      fsDoc.msExitFullscreen();
    } else if (this.isEnabled && fsDoc.mozCancelFullScreen) { /* Firefox */
      fsDoc.mozCancelFullScreen();
    }

  }

  /**
   * @description
   * Habilita/Deshablita el modo pantalla completa
   */
  toggle(): void {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }
}
