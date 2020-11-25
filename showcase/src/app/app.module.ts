import { ReactiveFormsModule } from '@angular/forms';
import { SerFormModule } from './../../../src/form/ser-form.module';
import { SerUiModule } from './../../../src/ui/ser-ui.module';
import { FacebookComponent } from './facebook/facebook.component';
import { SelectComponent } from './select/select.component'
import { GoogleComponent } from './google/google.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

import { AppComponent } from './app.component';
import { GoogleSDKModule } from '../../../src/google/google-sdk.module';
import { NG_GAPI_CONFIG } from '../../../src/google/google-sdk.service';
import { FacebookSDKModule } from '../../../src/facebook/facebook-sdk.module';
import { NG_FSDK_CONFIG } from '../../../src/facebook/facebook-sdk.service';
import { RouterModule, Routes } from '@angular/router';
import { UtilsComponent } from './utils/utils.component';
import { FormsComponent } from './forms/forms.component';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from './filter/filter.component';

const appRoutes: Routes = [
    { path: 'utils', component: UtilsComponent },
    { path: 'select', component: SelectComponent },
    { path: 'filters', component: FilterComponent },
    { path: 'forms', component: FormsComponent },
    { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GoogleComponent,
    FacebookComponent,
    SelectComponent,
    UtilsComponent,
    FormsComponent,
    HomeComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SerUiModule,
    SerFormModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false } // <-- debugging purposes only
    ),
    HighlightModule.forRoot({
      languages() {
        return [
          { name: 'typescript', func: typescript },
          { name: 'scss', func: scss },
          { name: 'xml', func: xml }
        ];
      }
    }),
    GoogleSDKModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: {
        client_id: '977736754031-s7h70n08u6q41i9b66hsriqv88rf0dm1.apps.googleusercontent.com',
        scope: 'profile email'
      }
    }),
    FacebookSDKModule.forRoot({
      provide: NG_FSDK_CONFIG,
      useValue: {
        appId: '828631504305155',
        cookie: true,
        xfbml: true,
        version: 'v6.0'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }