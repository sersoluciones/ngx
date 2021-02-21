import { Component, Injector } from '@angular/core';
import { FullscreenService } from '../../../../src/fullscreen/fullscreen.service';
import { PrefersColorSchemeService } from '../../../../src/prefers-color-scheme/prefers-color-scheme.service';
import { SnackbarService } from '../../../../src/ui/snackbar.service';
import { generatePassword } from '../../../../src/utils/random';
import { BaseView } from '../base/base-view';
import { MaterialIcons } from './material-icons-type';

@Component({
    selector: 'showcase-utils',
    templateUrl: './utils.component.html',
    styleUrls: ['./utils.component.scss']
})
export class UtilsComponent extends BaseView {

    messageTypeClick = 'Clic aquí para probar';

    snackbarForm = this._fb.group({
        msj: ['Actualizado exitosamente'],
        class: ['green'],
        icon: ['done']
    });

    newPassword = '';
    passwordForm = this._fb.group({
        length: [8],
        numbers: [true],
        lettersLowerCase: [true],
        lettersUpperCase: [true],
        specialChars: [false]
    });

    snackbarDataClass = ['green', 'red'];
    snackbarDataIcon = MaterialIcons;

    constructor(public colorscheme: PrefersColorSchemeService, public fullscreen: FullscreenService, protected injectorObj: Injector, private _snackbar: SnackbarService) {
        super(injectorObj);
    }

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

    openSnackbar() {
        this._snackbar.open({
            msj: this.snackbarForm.value.msj,
            iconClass: this.snackbarForm.value.class,
            iconName: this.snackbarForm.value.icon
        });
    }

    getPassword() {
        this.newPassword = generatePassword({
            length: this.passwordForm.value.length,
            numbers: this.passwordForm.value.numbers,
            lettersLowerCase: this.passwordForm.value.lettersLowerCase,
            lettersUpperCase: this.passwordForm.value.lettersUpperCase,
            specialChars: this.passwordForm.value.specialChars
        });
    }

}
