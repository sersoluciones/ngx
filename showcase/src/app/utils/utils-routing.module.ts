import { PasswordComponent } from './password/password.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { FullscreenComponent } from './fullscreen/fullscreen.component';
import { ClickComponent } from './click/click.component';
import { CookiesComponent } from './cookies/cookies.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
    { path: 'theme', component: ThemeComponent },
    { path: 'cookies', component: CookiesComponent },
    { path: 'click', component: ClickComponent },
    { path: 'fullscreen', component: FullscreenComponent },
    { path: 'snackbar', component: SnackbarComponent },
    { path: 'password', component: PasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilsRoutingModule { }
