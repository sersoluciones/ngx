import { Directive, OnChanges, Input, ElementRef, Renderer2 } from '@angular/core';
import { readAsDataURL } from '../file/read';
import { take } from 'rxjs/operators';
import { AwsService } from '../aws/aws.service';
import { hasValue } from '../utils/check';

interface BgImage {
    url?: string;
    file?: File;
    cloudfront?: boolean;
}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[bgImage]'
})
export class BgImageDirective implements OnChanges {

    @Input('bgImage') image: BgImage;
    imageRegex = /(image\/(jpe?g|png|gif|bmp))/i;

    constructor(private el: ElementRef, private rendered: Renderer2, private aws: AwsService) { }

    ngOnChanges() {
        if (hasValue(this.image.file) && this.image.file instanceof File && this.imageRegex.test(this.image.file?.type)) {

            readAsDataURL(this.image.file).pipe(take(1)).subscribe((result) => {
                this.rendered.setStyle(this.el.nativeElement, 'background-image', `url(${result})`);
            });

        } else if (hasValue(this.image.url)) {
            this.rendered.setStyle(this.el.nativeElement, 'background-image', this.image.cloudfront ? this.aws.getCloudfrontBgUrl(this.image.url) : this.aws.getS3BgUrl(this.image.url));
        } else {
            this.rendered.removeStyle(this.el.nativeElement, 'background-image');
        }
    }

}
