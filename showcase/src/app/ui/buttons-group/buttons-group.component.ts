import { Component } from '@angular/core';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
  selector: 'showcase-buttons-group',
  templateUrl: './buttons-group.component.html',
  styleUrls: ['./buttons-group.component.scss']
})
export class ButtonsGroupComponent extends BaseView {

    examples = examples;

}
