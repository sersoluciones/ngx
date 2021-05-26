import { Component, OnInit } from '@angular/core';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';

@Component({
  selector: 'showcase-click',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.scss']
})
export class ClickComponent extends BaseView {

    examples = examples;
    messageTypeClick = 'Clic aquí para probar';

    singleClick() {
        this.messageTypeClick = 'Clic corto';
        this.clearMessageTypeClick();
    }

    longClick() {
        this.messageTypeClick = 'Clic prolongado';
        this.clearMessageTypeClick();
    }

    clearMessageTypeClick() {
        setTimeout(() => {
            this.messageTypeClick = 'Clic aquí para probar';
        }, 2000);
    }

}
