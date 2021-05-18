import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
    templateUrl: './basic.component.html'
})
export class BasicComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        selectDefault: [null, Validators.required],
        selectMultiple: [null, Validators.required]
    });

}
