import { OnChanges, ElementRef, Renderer2 } from '@angular/core';
import { AwsService } from '../aws/aws.service';
interface BgImage {
    url?: string;
    file?: File;
}
export declare class BgImageDirective implements OnChanges {
    private el;
    private rendered;
    private aws;
    image: BgImage;
    imageRegex: RegExp;
    constructor(el: ElementRef, rendered: Renderer2, aws: AwsService);
    ngOnChanges(): void;
}
export {};
