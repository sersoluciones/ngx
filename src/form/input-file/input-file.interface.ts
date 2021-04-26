import { SafeHtml } from '@angular/platform-browser';

export interface InputFileSettings {
    uploadIconHTML?: string | SafeHtml;
    removeText?: string;
    uploadText?: string;
    uploadMultipleText?: string;
    fileInstanceTitle?: string;
    classes?: string;
    processFilenameUrl?: boolean;
}
