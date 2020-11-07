import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    downloadElement: any;

    constructor() {
        this.downloadElement = document.createElement('a');
        this.downloadElement.setAttribute('target', '_blank');
        document.body.appendChild(this.downloadElement);
    }

    /**
     * @description Descarga tradicional mediante un a[href] emulando un clic de usuario
     * @param url Url absoluta
     */
    get(url: string) {
        this.downloadElement.setAttribute('href', url);
        this.downloadElement.setAttribute('download', url.split('/').pop());
        this.downloadElement.click();
        document.body.removeChild(this.downloadElement);
    }
}
