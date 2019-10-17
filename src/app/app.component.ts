import { Cookies } from 'src/typescript/cookie';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrefersColorScheme } from 'src/typescript/prefers-color-scheme';
import * as examples from 'src/app/app.examples';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  colorscheme: PrefersColorScheme;
  examples = examples;

  constructor() { }

  ngOnInit() {
    this.colorscheme = new PrefersColorScheme();
    this.colorscheme.init();
    this.colorscheme.watch();
    Cookies.deleteAll();

    const queryString = new URLSearchParams(window.location.search);
    console.log(queryString);
  }
}
