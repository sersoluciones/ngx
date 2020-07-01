import { Observable } from 'rxjs';

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
export function getFileType(arrayBuffer: ArrayBuffer) {

    const arr = (new Uint8Array(arrayBuffer)).subarray(0, 4);

    let header = '';
    for (const i of arr) {
        header += i.toString(16);
    }

    console.log('Header file: ', header);

    switch (header) {
        case '89504e47':
            return 'png';

        case '47494638':
            return 'gif';

        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
            return 'jpeg';

        case '25504446':
            return 'ia';

        case '504b34':
            return 'xlsx';

        case '25504446':
            return 'pdf';

        default:
            return 'unknown';
    }
}
