import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[if-item]'
})
export class IFItemDirective {
    constructor(public template: TemplateRef<any>) { }
}
