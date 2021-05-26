import { SerFormModule } from './../../../src/form/ser-form.module';
import { SerUiModule } from './../../../src/ui/ser-ui.module';
import { FacebookComponent } from './facebook/facebook.component';
import { GoogleComponent } from './google/google.component';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { GoogleSDKModule } from '../../../src/google/google-sdk.module';
import { NG_GAPI_CONFIG } from '../../../src/google/google-sdk.service';
import { FacebookSDKModule } from '../../../src/facebook/facebook-sdk.module';
import { NG_FSDK_CONFIG } from '../../../src/facebook/facebook-sdk.service';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-CO';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SerMaskModule } from '../../../src/form/mask/ser-mask.module';

registerLocaleData(localeEs, 'es-CO');

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        GoogleComponent,
        FacebookComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SerUiModule,
        SerFormModule,
        SerMaskModule.forRoot(),
        HttpClientModule,
        HighlightModule,
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
        }),
        SharedModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-CO' },
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
              coreLibraryLoader: () => import('highlight.js/lib/core'),
              lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
              languages: {
                typescript: () => import('highlight.js/lib/languages/typescript'),
                css: () => import('highlight.js/lib/languages/css'),
                xml: () => import('highlight.js/lib/languages/xml')
              }
            }
          }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
