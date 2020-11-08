import { Component, OnInit } from '@angular/core';
import * as examples from 'src/app/app.examples';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'showcase-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    examples = examples;

    modelForm = this._fb.group({
        text1: ['', Validators.required],
        address: ['', Validators.required]
    });

  constructor(private _fb: FormBuilder) { }

  alert(text: string) {
      alert(text);
  }

  toogleFormControlDisabled(name: string) {
      if (this.modelForm.get(name).enabled) {
          this.modelForm.get(name).disable();
      } else {
          this.modelForm.get(name).enable();
      }
  }

  ngOnInit(): void {
  }

}
