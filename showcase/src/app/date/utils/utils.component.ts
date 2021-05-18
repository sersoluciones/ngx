import { Component, OnInit } from '@angular/core';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent extends BaseView {

    examples = examples;

}
