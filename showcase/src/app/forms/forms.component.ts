import { CustomValidators } from './../../../../src/form/validations/custom-validators';
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
        text1: ['', [Validators.required, CustomValidators.verifyNIT]],
        text2: ['', Validators.required],
        address: ['', Validators.required]
    });

    reset() {
        this.modelForm.reset();
    }

}
