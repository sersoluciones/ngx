import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
    templateUrl: './options.component.html'
})
export class OptionsComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        simpleSelect: [null],
        simpleMultiSelect: [null],
        plTemplate: [null],
        badgeItemCompTemplate: [null]
    });

}
