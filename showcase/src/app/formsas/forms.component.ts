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
        file: [null, Validators.required],
        file_id: [''],
        regexInput: ['\\d+', Validators.required],
        nit: ['', [Validators.required, CustomValidators.verifyNIT]],
        address: ['', Validators.required],
        num: [2],
        num1: [],
        num2: []
    }, {
        validators: [CustomValidators.betweenRange('num', 'num1', 'num2')]
    });

    text3Regex = '\\d+';
    testL = true;

    init() {

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
