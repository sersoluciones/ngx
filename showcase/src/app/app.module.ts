import { FacebookComponent } from './facebook/facebook.component';
import { GoogleComponent } from './google/google.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

import { AppComponent } from './app.component';
import { GoogleSDKModule } from '../../../src/google/GoogleSDKModule';
import { NG_GAPI_CONFIG } from '../../../src/google/GoogleSDKService';
import { FacebookSDKModule } from '../../../src/facebook/FacebookSDKModule';
import { NG_FSDK_CONFIG } from '../../../src/facebook/FacebookSDKService';

@NgModule({
  declarations: [
    AppComponent,
    GoogleComponent,
    FacebookComponent
  ],
  imports: [
    BrowserModule,
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
