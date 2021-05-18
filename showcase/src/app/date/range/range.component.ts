import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
  templateUrl: './range.component.html'
})
export class RangeComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        date1: [null, [Validators.required]],
        date2: [null, [Validators.required]]
    });

}
