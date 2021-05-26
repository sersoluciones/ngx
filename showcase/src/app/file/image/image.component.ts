import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import { urlImageToFile } from '../../../../../src/file/read';
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

    init() {

        urlImageToFile('https://scontent.fbog2-5.fna.fbcdn.net/v/t31.18172-1/c0.0.240.240a/p240x240/15874978_10154528668804340_3180312430372506197_o.jpg?_nc_cat=102&ccb=1-3&_nc_sid=7206a8&_nc_ohc=WxCTZKzi25cAX8md3s0&_nc_ht=scontent.fbog2-5.fna&tp=27&oh=7f0be287f00f86849dcaea3481164daa&oe=60D49525')
        .subscribe(res => {
            console.log(res);
            this.modelForm.get('image1').setValue(res);
        });

    }

}
