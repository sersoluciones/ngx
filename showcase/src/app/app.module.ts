import { GoogleApiModule } from './../../../src/google/GoogleApiModule';
import { GoogleComponent } from './google/google.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

import { AppComponent } from './app.component';
import { NG_GAPI_CONFIG } from '../../../src/google/GoogleApiService';

@NgModule({
  declarations: [
    AppComponent,
    GoogleComponent
  ],
  imports: [
    BrowserModule,
    HighlightModule.forRoot({
      languages() {
        return [
          {name: 'typescript', func: typescript},
          {name: 'scss', func: scss},
          {name: 'xml', func: xml}
        ];
      }
    }),
    GoogleApiModule.forRoot({
        provide: NG_GAPI_CONFIG,
        useValue: {
            client_id: '977736754031-svmvg6org8d6abcpsf2ddn7bvdh3om6j.apps.googleusercontent.com',
            scope: 'profile email'
        }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
