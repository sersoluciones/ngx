import { Injectable } from '@angular/core';
import { mergeObjs } from '../utils/object';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

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

    open(opts: SnackbarOpts) {

        let _html = document.createElement('div');
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

        timer(1000)
        .pipe(take(1)).subscribe(() => {
            _html.className = 'snackbar show-text';

            setTimeout(() => {
                setTimeout(() => {
                    _html.className = 'snackbar hide';

                    setTimeout(() => {
                        document.body.removeChild(_html);
                        _html = null;
                    }, 1000);
                }, 1500);
            }, defaultOpts.duration);
        });

    }
}
