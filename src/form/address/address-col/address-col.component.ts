
import { Subscription } from 'rxjs';
import { Component, forwardRef, OnInit, ViewEncapsulation, OnDestroy, HostBinding } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { hasValue } from '../../../utils/check';
import { DropdownSettings } from '../../select/ser-select.interface';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'address-col-input',
  templateUrl: './address-col.component.html',
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AddressColComponent),
          multi: true
      }
  ],
  encapsulation: ViewEncapsulation.None
})
export class AddressColComponent implements OnInit, OnDestroy, ControlValueAccessor {

    @HostBinding('class.address-input') class = true;
    modelSub: Subscription;
    modelForm = this._fb.group({
        address1: ['Calle', [Validators.required]],
        address2: ['', [Validators.required, Validators.maxLength(50)]],
        address3: ['', [Validators.required, Validators.maxLength(50)]],
        address4: ['', [Validators.required, Validators.maxLength(50)]]
    });

    address1Settings: DropdownSettings = {
        enableSearchFilter: false,
        clearAll: false
    };

    optionsAddress = [
        {
            id: 'Calle',
            name: 'Calle'
        },
        {
            id: 'Carrera',
            name: 'Carrera'
        },
        {
            id: 'Autopista',
            name: 'Autopista'
        },
        {
            id: 'Avenida',
            name: 'Avenida'
        },
        {
            id: 'Avenida Carrera',
            name: 'Avenida Carrera'
        },
        {
            id: 'Avenida Calle',
            name: 'Avenida Calle'
        },
        {
            id: 'Circular',
            name: 'Circular'
        },
        {
            id: 'Circunvalar',
            name: 'Circunvalar'
        },
        {
            id: 'Diagonal',
            name: 'Diagonal'
        },
        {
            id: 'Manzana',
            name: 'Manzana'
        },
        {
            id: 'Transversal',
            name: 'Transversal'
        },
        {
            id: 'Via',
            name: 'Via'
        }
    ];

    constructor(private _fb: FormBuilder) { }

    writeValue(obj: any) {
        if (hasValue(obj)) {
            const addressArray = obj.split(' ');
            this.modelForm.get('address1').setValue(addressArray[0]);
            this.modelForm.get('address2').setValue(addressArray[1]);
            this.modelForm.get('address3').setValue(addressArray[3]);
            this.modelForm.get('address4').setValue(addressArray[5]);
        }
    }

    generateValue() {
        const address = this.modelForm.get('address1').value + ' ' + this.modelForm.get('address2').value + ' # ' + this.modelForm.get('address3').value + ' - ' + this.modelForm.get('address4').value;
        return address;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    onChange(_: any) { }

    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
    onTouch() { }

    ngOnInit() {

        this.modelSub = this.modelForm.valueChanges.subscribe((new_val) => {
            if (this.modelForm.valid) {
                this.onChange(this.generateValue());
            } else {
                this.onChange(null);
            }
        });
    }

    ngOnDestroy() {
        this.modelSub.unsubscribe();
    }

}
