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
        text3: ['', Validators.required],
        address: ['', Validators.required]
    });

    text3Regex = '[0-9\s]';

    reset() {
        this.modelForm.reset();
    }

}
