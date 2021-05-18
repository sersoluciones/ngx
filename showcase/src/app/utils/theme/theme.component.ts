import { Component, Injector } from '@angular/core';
import { BaseView } from 'src/app/base/base-view';
import { PrefersColorSchemeService } from '../../../../../src/prefers-color-scheme/prefers-color-scheme.service';
import * as examples from './examples';

@Component({
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent extends BaseView {

    examples = examples;

    constructor(protected injectorObj: Injector, public colorscheme: PrefersColorSchemeService) {
        super(injectorObj);
    }

}
