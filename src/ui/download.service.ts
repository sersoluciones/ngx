import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    downloadElement: any;

    constructor() {
        this.downloadElement = document.createElement('a');
        this.downloadElement.setAttribute('target', '_blank');
    }

    /**
     * @description Descarga tradicional mediante un a[href] emulando un clic de usuario
     * @param url Url absoluta
     */
    get(url: string, filename?: string) {
        document.body.appendChild(this.downloadElement);
        this.downloadElement.setAttribute('href', url);
        this.downloadElement.setAttribute('download', filename ? filename : url.split('/').pop());
        this.downloadElement.click();
        document.body.removeChild(this.downloadElement);
    }
}
