import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
    templateUrl: './templates.component.html'
})
export class TemplatesComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        badgeTemplate: [null],
        itemTemplate: [null],
        badgeItemTemplate: [null],
        badgeItemCompTemplate: [null]
    });

}
