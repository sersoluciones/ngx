import { Observable } from 'rxjs';
/**
 * Read the content of a File or Blob using the FileReader interface.
 * This is an async interface so it makes sense to handle it with Rx.
 * @param File | Blob
 */
export declare function readAsArrayBuffer(blob: Blob): Observable<any>;
/**
 * Read the content of a File or Blob using the FileReader interface.
 * This is an async interface so it makes sense to handle it with Rx.
 * @param File | Blob
 */
export declare function readAsDataURL(blob: Blob): Observable<any>;
/**
 * @description Get file type based on header info
 * @param arrayBuffer Result of FileReader.readAsArrayBuffer()
 */
export declare function getFileType(arrayBuffer: ArrayBuffer): "unknown" | "pdf" | "png" | "gif" | "jpeg" | "ia" | "xlsx";
