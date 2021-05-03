import { Component } from '@angular/core';
import { BaseView } from '../base/base-view';
import * as examples from './examples';

@Component({
  selector: 'showcase-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseView {
    examples = examples;
}
