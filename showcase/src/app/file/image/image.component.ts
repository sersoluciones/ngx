import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import { CustomValidators } from '../../../../../src/form/validations/custom-validators';
import * as examples from './examples';

@Component({
  selector: 'showcase-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        image1: [null, [Validators.required, CustomValidators.maxFileSize('2MB')]]
    });

}
