import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import { DateInputSettings } from '../../../../../src/form/date/ser-date.interface';
import * as examples from './examples';

@Component({
  templateUrl: './basic.component.html'
})
export class BasicComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        date1: [null, [Validators.required]],
        date2: [null, [Validators.required]]
    });

    date2Settings: DateInputSettings = {
        calendarOptions: {
            dropdowns: {
                maxYear: 2030
            }
        }
    };

}
