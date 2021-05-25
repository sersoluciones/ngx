import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
    templateUrl: './file.component.html'
})
export class FileComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        file1: [null, [Validators.required]]
    });

}