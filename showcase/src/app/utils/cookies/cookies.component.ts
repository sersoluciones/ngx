import { CookiesService } from './../../../../../src/cookie/cookies.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
  selector: 'showcase-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent extends BaseView {

    examples = examples;

    constructor(protected injectorObj: Injector, public cookies: CookiesService) {
        super(injectorObj);
    }

}
