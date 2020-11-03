import { DropdownSettings } from './../../../src/form/select/ser-select.interface';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { FullscreenService } from './../../../src/fullscreen/fullscreen.service';
import { PrefersColorSchemeService } from './../../../src/prefers-color-scheme/prefers-color-scheme.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as examples from 'src/app/app.examples';
import { GoogleSDKModule } from '../../../src/google/google-sdk.module';

@Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    examples = examples;

    modelForm = this._fb.group({
        text1: ['', Validators.required],
        address: ['', Validators.required],
        selectDefault: [null, Validators.required],
        selectSimple: [null, Validators.required],
        selectMultiple: [null, Validators.required],
        selectValidation: [null, Validators.required]
    });

    options = {
        dropdown: [
            {
                id: 1,
                name: 'Item 1'
            },
            {
                id: 2,
                name: 'Item 2'
            },
            {
                id: 3,
                name: 'Item 3'
            }
        ]
    };

    dropdownSettings = {

    };

    constructor(public colorscheme: PrefersColorSchemeService, public fullscreen: FullscreenService, googleService: GoogleSDKModule, private _fb: FormBuilder) { }

    alert(text: string) {
        alert(text);
    }

    toogleFormControlDisabled(name: string) {
        if (this.modelForm.get(name).enabled) {
            this.modelForm.get(name).disable();
        } else {
            this.modelForm.get(name).enable();
        }
    }

    ngOnInit() {
        // this.colorscheme.init();
        // this.colorscheme.watch();
    }
}
