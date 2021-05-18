import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilsRoutingModule } from './utils-routing.module';
import { ThemeComponent } from './theme/theme.component';
import { CookiesComponent } from './cookies/cookies.component';
import { ClickComponent } from './click/click.component';
import { FullscreenComponent } from './fullscreen/fullscreen.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { PasswordComponent } from './password/password.component';


@NgModule({
  declarations: [ThemeComponent, CookiesComponent, ClickComponent, FullscreenComponent, SnackbarComponent, PasswordComponent],
  imports: [
    SharedModule,
    UtilsRoutingModule
  ]
})
export class UtilsModule { }
