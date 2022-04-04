import { Pipe } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'safe' })
export class SafeHtmlPipe {

    constructor(private sanitizer: DomSanitizer) { }

    transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
