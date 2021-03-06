// tslint:disable: directive-class-suffix
// tslint:disable: component-class-suffix
// tslint:disable: directive-selector
import { TemplateRef, Directive, Output, OnDestroy, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sd-item]'
})
export class SDItemDirective {
    constructor(public template: TemplateRef<any>) { }
}

@Directive({
  selector: '[sd-badge]'
})
export class SDBadgeDirective {
    constructor(public template: TemplateRef<any>) { }
}

@Directive({
  selector: '[sd-badge-item]'
})
export class SDBadgeItemDirective {
    constructor(public template: TemplateRef<any>) { }
}
