import { CustomValidators } from './../../../../src/form/validations/custom-validators';
import { Component } from '@angular/core';
import * as examples from 'src/app/app.examples';
import { Validators } from '@angular/forms';
import { BaseView } from '../base/base-view';
import { hasValue } from '../../../../src/utils/check';

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
        nit: ['', [Validators.required, CustomValidators.verifyNIT]],
        address: ['', Validators.required],
        num: [2],
        num1: [],
        num2: [],
        pin: ['', Validators.required],
        pinForm: this._fb.group({
            codeLength: [4, Validators.required],
            onlyNumber: [true, Validators.required],
            isCodeHidden: [false, Validators.required]
        })
    }, {
        validators: [CustomValidators.betweenRange('num', 'num1', 'num2')]
    });

    text3Regex = '[0-9\s]';
    pinShow = true;

    init() {
        this.modelForm.get('pinForm').valueChanges.subscribe(() => {
            this.pinShow = false;
            setTimeout(() => {
                this.pinShow = true;
            }, 500);
        });
    }

}
