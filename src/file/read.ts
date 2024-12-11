import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * Read the content of a File or Blob using the FileReader interface.
 * This is an async interface so it makes sense to handle it with Rx.
 * @param File | Blob
 */
export function readAsArrayBuffer(blob: Blob): Observable<any> {

    return new Observable((obs: any): void => {
        if (!(blob instanceof Blob)) {
            obs.error(new Error('`blob` must be an instance of File or Blob.'));
            return;
        }

        const reader = new FileReader();

        reader.onerror = err => obs.error(err);
        reader.onabort = err => obs.error(err);
        reader.onload = () => obs.next(reader.result);
        reader.onloadend = () => obs.complete();

        reader.readAsArrayBuffer(blob);
    });
}

/**
 * Read the content of a File or Blob using the FileReader interface.
 * This is an async interface so it makes sense to handle it with Rx.
 * @param File | Blob
 */
export function readAsDataURL(blob: Blob): Observable<any> {

    return new Observable((obs: any): void => {
        if (!(blob instanceof Blob)) {
            obs.error(new Error('`blob` must be an instance of File or Blob.'));
            return;
        }

        const reader = new FileReader();

        reader.onerror = err => obs.error(err);
        reader.onabort = err => obs.error(err);
        reader.onload = () => obs.next(reader.result);
        reader.onloadend = () => obs.complete();

        reader.readAsDataURL(blob);
    });
}

/**
 * @description Get file type based on header info
 * @param arrayBuffer Result of FileReader.readAsArrayBuffer()
 */
export function getFileType(arrayBuffer: ArrayBuffer, file?: File) {

    const arr = (new Uint8Array(arrayBuffer)).subarray(0, 4);
    const extOriginal = file?.name.substring(file?.name.lastIndexOf('.') + 1);
    let header = '';
    let ext = '';

    for (const i of arr) {
        header += i.toString(16);
    }

    switch (header) {
        case '89504e47':
            ext = 'png';
            break;

        case '47494638':
            ext = 'gif';
            break;

        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
            ext = 'jpeg';
            break;

        case '504b34':
            ext = 'xlsx';
            break;

        case '25504446':
            ext = 'pdf';
            break;

        case '503c7376674b34':
            ext = 'svg';
            break;

        case '504b34':
            ext = 'zip';
            break;

        default:
            ext = 'unknown';
    }

    console.log('Header file: ', header);
    console.log('Original ext: ', extOriginal);
    console.log('Real ext: ', ext);

    return ext;
}

/**
     * @description De una url se convierte en un Base64
     * @param imageUrl - Url para de la imagen
     */
export function urlToDataUrl(imageUrl: string): Observable<string | ArrayBuffer> {

    return from(fetch(imageUrl))
    .pipe(
        switchMap(res => {
            return from(res.blob())
            .pipe(
                switchMap(blob => {
                    return new Observable<string | ArrayBuffer>((obs: any) => {

                        const reader = new FileReader();

                        reader.onerror = err => obs.error(err);
                        reader.onabort = err => obs.error(err);
                        reader.onload = () => obs.next(reader.result);
                        reader.onloadend = () => obs.complete();

                        reader.readAsDataURL(blob);
                    });
                })
            );
        })
    );

}

/**
     * @description De una url se convierte en un Base64
     * @param imageUrl - Url para de la imagen
     */
export function urlImageToFile(imageUrl: string) {

    return from(fetch(imageUrl))
    .pipe(
        switchMap(res => {
            return from(res.blob())
            .pipe(
                map(blob => {

                    const url = new URL(imageUrl);

                    return new File([blob], url.pathname.substring(url.pathname.lastIndexOf('/') + 1), {
                        type: blob.type
                    });
                })
            );
        })
    );

}

export function sanitizeFileName(fileName: string) {
    let sanitized = fileName.replace(/[^a-zA-Z0-9 _-]/g, '');
    sanitized = sanitized.replace(/\s+/g, ' ').trim();
    return sanitized;
}
