import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
  templateUrl: './extras.component.html'
})
export class ExtrasComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        number1: [null, [Validators.required]],
        number2: [null, [Validators.required]],
        select1: [null, [Validators.required]]
    });

}
