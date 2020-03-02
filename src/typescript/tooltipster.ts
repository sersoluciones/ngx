import * as $ from 'jquery';

/**
 * @description
 * Clase para entrar y salir del modo pantalla completa en el navegador web
 * @example
 * Fullscreen.enable(); // Habilita el modo pantalla completa
 * Fullscreen.disable(); // Deshabilita el modo pantalla completa
 */
export class Fullscreen {
  isEnabled: boolean;

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

interface FsDocument extends HTMLDocument {
  msFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  webkitFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
}

interface FsDocumentElement extends HTMLElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}
