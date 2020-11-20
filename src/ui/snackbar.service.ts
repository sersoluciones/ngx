import { Injectable } from '@angular/core';
import { mergeObjs } from '../utils/object';
import { timer } from 'rxjs';

export interface SnackbarOpts {
    msj: string;
    iconClass?: string;
    iconName?: string;
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {


    constructor() {
    }

    open(opts: SnackbarOpts) {

        const _html = document.createElement('div');
        _html.className = 'snackbar';

        const defaultOpts: SnackbarOpts = mergeObjs({
            iconClass: 'green',
            iconName: 'done',
            duration: 4000
        }, opts);

        _html.innerHTML = `
        <div class="icon ${defaultOpts.iconClass}">
            <span class="material-icons">${defaultOpts.iconName}</span>
        </div>
        <span class="msj">${opts.msj}</span>`;

        document.body.append(_html);

        setTimeout(() => {
            _html.className = 'snackbar show-text';

            setTimeout(() => {
                setTimeout(() => {
                    _html.className = 'snackbar hide';
                }, 1500);
            }, defaultOpts.duration);
        }, 1000);

    }
}
