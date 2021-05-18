import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        pin1: ['', [Validators.required]],
        pinForm: this._fb.group({
            codeLength: [4, Validators.required],
            onlyNumber: [true, Validators.required],
            isCodeHidden: [false, Validators.required]
        })
    });

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
