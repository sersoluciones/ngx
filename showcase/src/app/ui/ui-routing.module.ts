import { BadgesComponent } from './badges/badges.component';
import { ButtonsGroupComponent } from './buttons-group/buttons-group.component';
import { ButtonsComponent } from './buttons/buttons.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'buttons',
        component: ButtonsComponent
    },
    {
        path: 'buttons-group',
        component: ButtonsGroupComponent
    },
    {
        path: 'badges',
        component: BadgesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiRoutingModule { }
