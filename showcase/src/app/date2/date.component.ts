import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseView } from '../base/base-view';

@Component({
    selector: 'showcase-date',
    templateUrl: './date.component.html'
})
export class Date2Component extends BaseView {

    modelForm = this._fb.group({
        date3: [null, [Validators.required]],
        date4: [{
            from: new Date('2020-12-02T11:43:40.336716'),
            to: new Date('2020-12-28T11:43:40.336716')
        }, [Validators.required]]
    });

    setDate() {
        console.log((new Date()).toISOString());
        this.modelForm.get('date1').setValue( (new Date()).toISOString() );
        this.modelForm.get('date2').setValue( (new Date()).toISOString() );

        this.modelForm.get('date3').setValue({
            from: '2020-12-02T11:43:40.336716',
            to: '2020-12-28T11:43:40.336716'
        });

        this.modelForm.get('date4').setValue({
            from: '2020-12-02T11:43:40.336716',
            to: '2020-12-28T11:43:40.336716'
        });
    }


}
