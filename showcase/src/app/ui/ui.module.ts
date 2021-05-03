import { NgModule } from '@angular/core';

import { UiRoutingModule } from './ui-routing.module';
import { ButtonsGroupComponent } from './buttons-group/buttons-group.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { BadgesComponent } from './badges/badges.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        ButtonsComponent,
        ButtonsGroupComponent,
        BadgesComponent
    ],
    imports: [
        SharedModule,
        UiRoutingModule
    ]
})
export class UiModule { }
