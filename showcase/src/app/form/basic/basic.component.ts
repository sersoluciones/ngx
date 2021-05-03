import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
  selector: 'showcase-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        text1: ['', [Validators.required]],
        text2: ['', [Validators.required]],
        number1: [null, [Validators.required]],
        select1: [null, [Validators.required]]
    });

}
