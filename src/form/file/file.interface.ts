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

export interface InputImageSettings {
    uploadIconHTML?: string | SafeHtml;
    clearIconHTML?: string | SafeHtml;
    removeText?: string;
    uploadText?: string;
    procesingText?: string;
    classes?: string;
    /**
     * @description
     * If enable, the image will be optimized and resized before upload.
     * Based on {@link https://github.com/fengyuanchen/compressorjs#options | CompressorJS options}
     */
    optimize?: {
        /**
         * @description
         * If true, the image will be optimized before upload.
         * @default true
         */
        enable: boolean;
        /**
         * @description
         * The maximum width of the image.
         * @default 1920
         */
        maxWidth?: number | null;
        /**
         * @description
         * The maximum height of the image.
         * @default 1080
         */
        maxHeight?: number | null;
        /**
         * @description
         * The quality of the image.
         * @default 0.8
         */
        quality?: number;
        strict?: boolean;
        checkOrientation?: boolean;
        minWidth?: number;
        minHeight?: number;
        width?: number;
        height?: number;
        resize?: 'contain' | 'cover' | 'none';
        mimeType?: string;
        convertTypes?: string | string[];
        convertSize?: number;
    };
    /**
     * @description
     * Array of accepted file extensions.
     * Example: ['.png', '.jpg', '.jpeg']
     */
    accept?: string[];
}
