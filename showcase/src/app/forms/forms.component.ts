import { CustomValidators } from './../../../../src/form/validations/custom-validators';
import { Component, SecurityContext } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from '../base/base-view';
import { InputFileSettings } from '../../../../src/form/input-file/input-file.interface';

@Component({
    selector: 'showcase-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent extends BaseView {

    modelForm = this._fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        text10: ['', [Validators.required]],
        text11: ['', [Validators.required]],
        text2: ['', Validators.required],
        text3: ['', Validators.required],
        file: [null, Validators.required],
        file_id: [''],
        regexInput: ['[0-9]', Validators.required],
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
    testL = true;

    init() {
        this.modelForm.get('pinForm').valueChanges.subscribe(() => {
            this.pinShow = false;
            setTimeout(() => {
                this.pinShow = true;
            }, 500);
        });

        this.modelForm.patchValue({
            file: 'https://kimed.s3.amazonaws.com/upload/attachments/ips/file_4db4df75-f984-419e-abf2-a6806dbe0b9c.jpg'
        });
    }

    clearFile(field: string) {
        console.log(field);
        this.modelForm.get(field).setValue(null, { onlySelf: true });
    }

    test() {
        this.testL = false;
        setTimeout(() => {
            this.testL = true;
        }, 2000);
    }

}
