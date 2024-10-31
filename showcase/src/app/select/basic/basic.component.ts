import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';
import { DropdownSettings } from '../../../../../src/form/select/ser-select.interface';

@Component({
    templateUrl: './basic.component.html'
})
export class BasicComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        selectDefault: [null, Validators.required],
        selectMultiple: [null, Validators.required]
    });

    settingsb: DropdownSettings = {
        canItemSelected: (settings: DropdownSettings, selectedItem?: any) => this.canSelect(settings, selectedItem)
    }

    canSelect(t: any, x: any) {
        console.log(x);
        return false;
    }
}
