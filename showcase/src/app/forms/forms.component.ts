import { Component, Injector } from '@angular/core';
import * as examples from 'src/app/app.examples';
import { Validators, FormBuilder } from '@angular/forms';
import { BaseView } from '../base/base-view';

@Component({
    selector: 'showcase-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent extends BaseView {
    examples = examples;

    modelForm = this._fb.group({
        text1: ['Prueba', Validators.required],
        address: ['', Validators.required]
    });

    constructor(protected injectorObj: Injector, private _fb: FormBuilder) {
        super(injectorObj);
    }

}
