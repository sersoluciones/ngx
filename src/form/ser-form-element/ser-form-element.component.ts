// tslint:disable: component-selector
import { Subscription } from 'rxjs';
import { Component, ContentChild, ViewEncapsulation, HostBinding } from '@angular/core';
import { SerControlDirective } from './ser-control.directive';

@Component({
    selector: 'ser-form-element',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class SerFormElementComponent {

    @ContentChild(SerControlDirective) formElement: SerControlDirective;
    observer: Subscription;

    @HostBinding('class.disabled')
    get disabled() {
        return this.formElement?.disabled ?? false;
    }

    @HostBinding('class.focus')
    get focus() {
        return this.formElement?.focus ?? false;
    }

    @HostBinding('class.active')
    get active() {
        return this.formElement?.hasValue ?? false;
    }

    @HostBinding('class.dirty')
    get dirty() {
        return this.formElement?.dirty ?? false;
    }

    @HostBinding('class.valid')
    get valid() {
        return this.formElement?.valid ?? false;
    }

    @HostBinding('class.invalid')
    get invalid() {
        return this.formElement?.invalid ?? false;
    }

    @HostBinding('class.pending')
    get pending() {
        return this.formElement?.pending ?? false;
    }

}
