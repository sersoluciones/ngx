import { DropdownSettings } from './../../../src/form/select/ser-select.interface';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { FullscreenService } from './../../../src/fullscreen/fullscreen.service';
import { PrefersColorSchemeService } from './../../../src/prefers-color-scheme/prefers-color-scheme.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import * as examples from 'src/app/app.examples';
import { GoogleSDKModule } from '../../../src/google/google-sdk.module';
import { WhenScrolledDirective } from '../../../src/ui/when-scrolled.directive';

@Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    examples = examples;

    modelForm = this._fb.group({
        text1: ['', Validators.required],
        address: ['', Validators.required],
        selectDefault: [null, Validators.required],
        selectSimple: [['Batman'], Validators.required],
        selectMultiple: [null, Validators.required],
        selectSingleTemplate: [null, Validators.required],
        selectMultipleTemplate: [null, Validators.required],
        filter1: [null, Validators.required]
    });

    options = {
        simpleDropdown: ['Kratos', 'Batman', 'Leon Kennedy', 'Big Daddy', 'War (Horseman)', 'Aloy', 'Price', 'Dante', 'Agent 47', 'Prince of persia', 'Ryu', 'Master Chief', 'Solid Snake', 'Gordon Freeman', 'Dovahkiin'],
        dropdown: [
            {
                id: 1,
                image: 'assets/avatars/1.jpg',
                name: 'Kratos',
                desc: 'God of War'
            },
            {
                id: 2,
                image: 'assets/avatars/2.jpg',
                name: 'Batman',
                desc: 'Arkham series'
            },
            {
                id: 3,
                name: 'Leon Kennedy',
                image: 'assets/avatars/3.jpg',
                desc: 'Resident evil'
            },
            {
                id: 4,
                name: 'Big Daddy',
                image: 'assets/avatars/4.jpg',
                desc: 'Bioshock'
            },
            {
                id: 5,
                name: 'War (Horseman)',
                image: 'assets/avatars/5.jpeg',
                desc: 'Darksiders'
            },
            {
                id: 6,
                name: 'Aloy',
                image: 'assets/avatars/6.jpg',
                desc: 'Horizon Zero Dawn'
            },
            {
                id: 7,
                name: 'Price',
                image: 'assets/avatars/7.jpg',
                desc: 'Call of duty'
            },
            {
                id: 8,
                name: 'Dante',
                image: 'assets/avatars/8.jpg',
                desc: 'Devil May Cry'
            },
            {
                id: 9,
                name: 'Agent 47',
                image: 'assets/avatars/9.jpg',
                desc: 'Hitman'
            },
            {
                id: 10,
                name: 'Prince of persia',
                image: 'assets/avatars/10.jpg',
                desc: 'Prince of persia'
            },
            {
                id: 11,
                name: 'Ryu',
                image: 'assets/avatars/11.jpg',
                desc: 'Street Fighter'
            },
            {
                id: 12,
                name: 'Master Chief',
                image: 'assets/avatars/12.jpg',
                desc: 'Halo'
            },
            {
                id: 13,
                name: 'Solid Snake',
                image: 'assets/avatars/13.jpg',
                desc: 'Metal Gear'
            },
            {
                id: 14,
                name: 'Gordon Freeman',
                image: 'assets/avatars/14.jpg',
                desc: 'Half-Life'
            },
            {
                id: 15,
                name: 'Dovahkiin',
                image: 'assets/avatars/15.jpg',
                desc: 'The Elder Scrolls V: Skyrim'
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

    ngAfterViewInit(): void {
        
    }
}
