import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'ui',
        loadChildren: () => import('./ui/ui.module').then(m => m.UiModule)
    },
    {
        path: 'forms',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule)
    },
    {
        path: 'select',
        loadChildren: () => import('./select/select.module').then(m => m.SelectModule)
    },
    {
        path: 'utils',
        loadChildren: () => import('./utils/utils.module').then(m => m.UtilsModule)
    },
    {
        path: 'date',
        loadChildren: () => import('./date/date.module').then(m => m.DateModule)
    },
    {
        path: 'social',
        loadChildren: () => import('./social/social.module').then(m => m.SocialModule)
    },
    {
        path: 'file',
        loadChildren: () => import('./file/file.module').then(m => m.FileModule)
    },
    {
        path: 'splide',
        loadChildren: () => import('./splide/splide.module').then(m => m.SplideModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload',
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
