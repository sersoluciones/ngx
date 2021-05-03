import { Component } from '@angular/core';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
    selector: 'showcase-buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent extends BaseView {

    examples = examples;

}
