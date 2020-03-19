import { inArray } from './../../../src/public-api';
import { FullscreenService } from './../../../src/fullscreen/fullscreen.service';
import { PrefersColorSchemeService } from './../../../src/prefers-color-scheme/prefers-color-scheme.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as examples from 'src/app/app.examples';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  examples = examples;

  constructor(public colorscheme: PrefersColorSchemeService, public fullscreen: FullscreenService) { }

  ngOnInit() {
    this.colorscheme.init();
    this.colorscheme.watch();
  }
}
