import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import { CustomValidatorsLegacy } from '../../../../../src/form/validations/custom-validators';
import * as examples from './examples';

@Component({
  selector: 'showcase-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        image1: [null, [Validators.required, CustomValidatorsLegacy.maxFileSize('2MB'), CustomValidatorsLegacy.fileType(['png', 'jpg', 'jpeg', 'gif'])]]
    });

    afterInit() {
        this.modelForm.get('image1').setValue('https://tiendana.s3.amazonaws.com/upload/148/attachments/brand/file_efa5ed22-665e-4f91-aa37-c7ccafc2991f.png');
    }



}
