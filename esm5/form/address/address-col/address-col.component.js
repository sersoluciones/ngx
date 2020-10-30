import { __decorate } from "tslib";
import { fromEvent } from 'rxjs';
import { Component, forwardRef, OnInit, ViewEncapsulation, OnDestroy, HostBinding, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { hasValue } from '../../../utils/check';
import { inArray } from '../../..//utils/array';
import { filter } from 'rxjs/operators';
var AddressColComponent = /** @class */ (function () {
    function AddressColComponent(_fb, _renderer, _elementRef) {
        this._fb = _fb;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.class = true;
        this.modelForm = this._fb.group({
            via: ['', [Validators.required]],
            address1: ['', [Validators.required, Validators.maxLength(50)]],
            address2: ['', Validators.maxLength(50)],
            address3: ['', Validators.maxLength(50)]
        });
        // tslint:disable-next-line: max-line-length
        this.viaOptionsSubs = [];
        this.viaRegex = /^Autopista|Avenida Calle|Avenida Carrera|Avenida|Calle|Carrera|Circunvalar|Circular|Diagonal|Kilometro|Manzana|Transversal$/i;
        this.viaOptions = [
            'Autopista', 'Avenida', 'Avenida Calle', 'Avenida Carrera', 'Calle', 'Carrera', 'Circunvalar', 'Circular', 'Diagonal', 'Kilometro', 'Manzana', 'Transversal', 'Via'
        ];
        this.viaOptionsOriginal = [
            'Autopista', 'Avenida', 'Avenida Calle', 'Avenida Carrera', 'Calle', 'Carrera', 'Circunvalar', 'Circular', 'Diagonal', 'Kilometro', 'Manzana', 'Transversal', 'Via'
        ];
    }
    AddressColComponent_1 = AddressColComponent;
    AddressColComponent.prototype.writeValue = function (obj) {
        var _this = this;
        if (hasValue(obj)) {
            var address1 = void 0;
            var address2 = void 0;
            var address3 = void 0;
            obj = obj.trim().replace(/\s+/g, ' ');
            if (/(\s?-\s?)+/.test(obj)) {
                address3 = obj.split(/(\s?-\s?)+/);
                this.modelForm.get('address3').setValue(address3[address3.length - 1].trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' '));
                address2 = address3[0].trim();
            }
            else {
                address2 = obj;
            }
            if (/(\s?[#]\s?)+/.test(address2)) {
                address2 = address2.split(/(\s?[#]\s?)+/);
                this.modelForm.get('address2').setValue(address2[address2.length - 1].trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' '));
                address1 = address2[0].trim();
            }
            else {
                address1 = obj;
            }
            if (this.viaRegex.test(address1)) {
                address1 = address1.split(this.viaRegex);
                this.modelForm.get('address1').setValue(address1[address1.length - 1].trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' '));
                setTimeout(function () {
                    _this.setVia(_this.viaRegex.exec(obj)[0].split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' '));
                });
            }
        }
    };
    AddressColComponent.prototype.generateValue = function () {
        var _a, _b, _c;
        var address = this.modelForm.get('via').value + ' ' + ((_a = this.modelForm.get('address1').value) === null || _a === void 0 ? void 0 : _a.trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' ')) +
            ' # ' + ((_b = this.modelForm.get('address2').value) === null || _b === void 0 ? void 0 : _b.trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' ')) +
            ' - ' + ((_c = this.modelForm.get('address3').value) === null || _c === void 0 ? void 0 : _c.trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' '));
        return address;
    };
    AddressColComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    AddressColComponent.prototype.onChange = function (_) { };
    AddressColComponent.prototype.registerOnTouched = function (fn) {
        this.onTouch = fn;
    };
    AddressColComponent.prototype.onTouch = function () { };
    AddressColComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.modelSub = this.modelForm.valueChanges.subscribe(function () {
            if (_this.modelForm.valid) {
                _this.onChange(_this.generateValue());
            }
            else {
                _this.onChange(null);
            }
        });
    };
    AddressColComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
        setTimeout(function () {
            if (!hasValue(_this.viaElHint.nativeElement.value)) {
                _this.viaElHint.nativeElement.value = 'Calle';
            }
        });
    };
    AddressColComponent.prototype.openViaOptions = function () {
        var _this = this;
        this.viaOptionsSubs.push(fromEvent(window, 'click')
            .pipe(filter(function (e) { return !_this.viaElCont.nativeElement.contains(e.target); }))
            .subscribe(function () {
            _this.setVia(_this.viaOptions[0]);
        }));
        this.viaOptionsSubs.push(fromEvent(window, 'keyup')
            .pipe(filter(function (e) { return inArray(e.key.toLowerCase(), ['arrowright', 'escape', 'enter']); }))
            .subscribe(function () {
            _this.setVia(_this.viaOptions[0]);
        }));
        this.filterViaOptions(this.modelForm.get('via').value);
        this.setPositionDropdown();
        this._renderer.appendChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
    };
    AddressColComponent.prototype.closeDropdown = function () {
        this.viaOptionsSubs.forEach(function (s) { return s.unsubscribe(); });
        this.viaOptionsSubs = [];
        this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
        this.address1.nativeElement.focus();
    };
    AddressColComponent.prototype.setPositionDropdown = function () {
        var _this = this;
        setTimeout(function () {
            var dropdown = _this.viaOptionsEl.nativeElement;
            var el = _this.viaEl.nativeElement;
            var remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);
            _this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left - 6) + 'px');
            if (remainingHeight > 0) {
                _this._renderer.removeClass(el, 'ontop');
                _this._renderer.removeClass(dropdown, 'ontop');
                _this._elementRef.nativeElement.style.removeProperty('bottom');
                _this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
            }
            else {
                _this._renderer.addClass(el, 'ontop');
                _this._renderer.addClass(dropdown, 'ontop');
                _this._elementRef.nativeElement.style.removeProperty('top');
                _this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
            }
        });
    };
    AddressColComponent.prototype.filterViaOptions = function (value) {
        var _this = this;
        var _a;
        if (hasValue(value)) {
            this.viaOptions = this.viaOptionsOriginal.filter(function (it) { var _a; return it.slice(0, value.length).toLowerCase() === ((_a = value) === null || _a === void 0 ? void 0 : _a.toLowerCase()); });
            if (hasValue(this.viaOptions)) {
                this.viaElHint.nativeElement.value = this.viaOptions[0];
                this.viaEl.nativeElement.value = (_a = this.viaEl.nativeElement.value) === null || _a === void 0 ? void 0 : _a.split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' ');
            }
            else {
                this.viaElHint.nativeElement.value = '';
            }
            setTimeout(function () {
                _this.setPositionDropdown();
            });
        }
        else {
            this.viaOptions = this.viaOptionsOriginal;
        }
    };
    AddressColComponent.prototype.viaBlur = function () {
        if (!hasValue(this.modelForm.get('via').value)) {
            this.setVia(this.viaOptions[0]);
        }
    };
    AddressColComponent.prototype.setVia = function (value) {
        if (hasValue(value)) {
            this.modelForm.get('via').setValue(value);
            this.viaEl.nativeElement.value = value;
            this.viaElHint.nativeElement.value = value;
        }
        else {
            this.viaEl.nativeElement.value = '';
            this.viaElHint.nativeElement.value = '';
        }
        this.closeDropdown();
    };
    AddressColComponent.prototype.ngOnDestroy = function () {
        var _a;
        this.modelSub.unsubscribe();
        (_a = this.viaOptionsSubs) === null || _a === void 0 ? void 0 : _a.forEach(function (s) { var _a; return (_a = s) === null || _a === void 0 ? void 0 : _a.unsubscribe(); });
    };
    var AddressColComponent_1;
    AddressColComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        HostBinding('class.address-input')
    ], AddressColComponent.prototype, "class", void 0);
    __decorate([
        ViewChild('viaOptionsEl')
    ], AddressColComponent.prototype, "viaOptionsEl", void 0);
    __decorate([
        ViewChild('viaElCont')
    ], AddressColComponent.prototype, "viaElCont", void 0);
    __decorate([
        ViewChild('viaEl')
    ], AddressColComponent.prototype, "viaEl", void 0);
    __decorate([
        ViewChild('viaElHint')
    ], AddressColComponent.prototype, "viaElHint", void 0);
    __decorate([
        ViewChild('address1')
    ], AddressColComponent.prototype, "address1", void 0);
    AddressColComponent = AddressColComponent_1 = __decorate([
        Component({
            selector: 'address-col-input',
            template: "<ng-container [formGroup]=\"modelForm\">\n\n    <div class=\"via\" #viaElCont>\n        <input type=\"text\" class=\"not-styled via-input\" [size]=\"viaElHint?.value ? viaElHint?.value?.length : 1\" #viaEl (focus)=\"openViaOptions()\" (input)=\"filterViaOptions(viaEl.value)\" autocomplete=\"off\" spellcheck=\"false\" >\n        <input type=\"text\" #viaElHint class=\"not-styled hint\" [size]=\"viaElHint?.value ? viaElHint?.value?.length : 1\" />\n\n        <div class=\"via-options\" #viaOptionsEl>\n            <div class=\"via-item\" *ngFor=\"let item of viaOptions\" (click)=\"setVia(item)\">{{ item }}</div>\n        </div>\n    </div>\n\n    <input class=\"not-styled address1\" #address1 placeholder=\"\" formControlName=\"address1\"  [size]=\"address1?.value ? address1?.value?.length : 1\" />\n\n    <span class=\"separator s1\">#</span>\n\n    <input class=\"not-styled address2\" #address2 placeholder=\"\" formControlName=\"address2\"  [size]=\"address2?.value ? address2?.value?.length : 1\" />\n\n    <span class=\"separator s2\">-</span>\n\n    <input class=\"not-styled address3\" #address3 placeholder=\"\" formControlName=\"address3\"  [size]=\"address3?.value ? address3?.value?.length : 1\" />\n\n</ng-container>\n",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return AddressColComponent_1; }),
                    multi: true
                }
            ],
            encapsulation: ViewEncapsulation.None
        })
    ], AddressColComponent);
    return AddressColComponent;
}());
export { AddressColComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJmb3JtL2FkZHJlc3MvYWRkcmVzcy1jb2wvYWRkcmVzcy1jb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUosT0FBTyxFQUFFLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWN4QztJQTRCSSw2QkFBb0IsR0FBZ0IsRUFBVSxTQUFvQixFQUFVLFdBQXVCO1FBQS9FLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUExQi9ELFVBQUssR0FBRyxJQUFJLENBQUM7UUFRakQsY0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvRCxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQyxDQUFDLENBQUM7UUFFSCw0Q0FBNEM7UUFDNUMsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBQ3BDLGFBQVEsR0FBRyw4SEFBOEgsQ0FBQztRQUMxSSxlQUFVLEdBQUc7WUFDVCxXQUFXLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFHLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLEtBQUs7U0FDdkssQ0FBQztRQUVGLHVCQUFrQixHQUFHO1lBQ2pCLFdBQVcsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUcsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsS0FBSztTQUN2SyxDQUFDO0lBRXFHLENBQUM7NEJBNUIvRixtQkFBbUI7SUE4QjVCLHdDQUFVLEdBQVYsVUFBVyxHQUFRO1FBQW5CLGlCQW1DQztRQWpDRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksUUFBUSxTQUFLLENBQUM7WUFDbEIsSUFBSSxRQUFRLFNBQUssQ0FBQztZQUNsQixJQUFJLFFBQVEsU0FBSyxDQUFDO1lBRWxCLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUV0QyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBeEQsQ0FBd0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4SyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNILFFBQVEsR0FBRyxHQUFHLENBQUM7YUFDbEI7WUFFRCxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQy9CLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBeEQsQ0FBd0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4SyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pD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QUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQzNDO1FBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCx5Q0FBVyxHQUFYOztRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsTUFBQSxJQUFJLENBQUMsY0FBYywwQ0FBRSxPQUFPLENBQUMsVUFBQSxDQUFDLHlCQUFJLENBQUMsMENBQUUsV0FBVyxLQUFFLEVBQUc7SUFDekQsQ0FBQzs7O2dCQXBMd0IsV0FBVztnQkFBcUIsU0FBUztnQkFBdUIsVUFBVTs7SUExQi9EO1FBQW5DLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQztzREFBYztJQUN0QjtRQUExQixTQUFTLENBQUMsY0FBYyxDQUFDOzZEQUEwQjtJQUM1QjtRQUF2QixTQUFTLENBQUMsV0FBVyxDQUFDOzBEQUF1QjtJQUMxQjtRQUFuQixTQUFTLENBQUMsT0FBTyxDQUFDO3NEQUFtQjtJQUNkO1FBQXZCLFNBQVMsQ0FBQyxXQUFXLENBQUM7MERBQXVCO0lBQ3ZCO1FBQXRCLFNBQVMsQ0FBQyxVQUFVLENBQUM7eURBQXNCO0lBUG5DLG1CQUFtQjtRQVovQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLGl1Q0FBMkM7WUFDM0MsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHFCQUFtQixFQUFuQixDQUFtQixDQUFDO29CQUNsRCxLQUFLLEVBQUUsSUFBSTtpQkFDZDthQUNKO1lBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7U0FDdEMsQ0FBQztPQUNXLG1CQUFtQixDQWtOL0I7SUFBRCwwQkFBQztDQUFBLEFBbE5ELElBa05DO1NBbE5ZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIGZvcndhcmRSZWYsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIE9uRGVzdHJveSwgSG9zdEJpbmRpbmcsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUJ1aWxkZXIsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jaGVjayc7XG5pbXBvcnQgeyBpbkFycmF5IH0gZnJvbSAnLi4vLi4vLi4vL3V0aWxzL2FycmF5JztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWRkcmVzcy1jb2wtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWRkcmVzcy1jb2wuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBZGRyZXNzQ29sQ29tcG9uZW50KSxcbiAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgfVxuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFkZHJlc3NDb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hZGRyZXNzLWlucHV0JykgY2xhc3MgPSB0cnVlO1xuICAgIEBWaWV3Q2hpbGQoJ3ZpYU9wdGlvbnNFbCcpIHZpYU9wdGlvbnNFbDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd2aWFFbENvbnQnKSB2aWFFbENvbnQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgndmlhRWwnKSB2aWFFbDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd2aWFFbEhpbnQnKSB2aWFFbEhpbnQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnYWRkcmVzczEnKSBhZGRyZXNzMTogRWxlbWVudFJlZjtcblxuICAgIG1vZGVsU3ViOiBTdWJzY3JpcHRpb247XG4gICAgbW9kZWxGb3JtID0gdGhpcy5fZmIuZ3JvdXAoe1xuICAgICAgICB2aWE6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcbiAgICAgICAgYWRkcmVzczE6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDUwKV1dLFxuICAgICAgICBhZGRyZXNzMjogWycnLCBWYWxpZGF0b3JzLm1heExlbmd0aCg1MCldLFxuICAgICAgICBhZGRyZXNzMzogWycnLCBWYWxpZGF0b3JzLm1heExlbmd0aCg1MCldXG4gICAgfSk7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgIHZpYU9wdGlvbnNTdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICAgIHZpYVJlZ2V4ID0gL15BdXRvcGlzdGF8QXZlbmlkYSBDYWxsZXxBdmVuaWRhIENhcnJlcmF8QXZlbmlkYXxDYWxsZXxDYXJyZXJhfENpcmN1bnZhbGFyfENpcmN1bGFyfERpYWdvbmFsfEtpbG9tZXRyb3xNYW56YW5hfFRyYW5zdmVyc2FsJC9pO1xuICAgIHZpYU9wdGlvbnMgPSBbXG4gICAgICAgICdBdXRvcGlzdGEnLCAnQXZlbmlkYScsICdBdmVuaWRhIENhbGxlJywgJ0F2ZW5pZGEgQ2FycmVyYScsICdDYWxsZScsICdDYXJyZXJhJyAsICdDaXJjdW52YWxhcicsICdDaXJjdWxhcicsICdEaWFnb25hbCcsICdLaWxvbWV0cm8nLCAnTWFuemFuYScsICdUcmFuc3ZlcnNhbCcsICdWaWEnXG4gICAgXTtcblxuICAgIHZpYU9wdGlvbnNPcmlnaW5hbCA9IFtcbiAgICAgICAgJ0F1dG9waXN0YScsICdBdmVuaWRhJywgJ0F2ZW5pZGEgQ2FsbGUnLCAnQXZlbmlkYSBDYXJyZXJhJywgJ0NhbGxlJywgJ0NhcnJlcmEnICwgJ0NpcmN1bnZhbGFyJywgJ0NpcmN1bGFyJywgJ0RpYWdvbmFsJywgJ0tpbG9tZXRybycsICdNYW56YW5hJywgJ1RyYW5zdmVyc2FsJywgJ1ZpYSdcbiAgICBdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpIHtcblxuICAgICAgICBpZiAoaGFzVmFsdWUob2JqKSkge1xuICAgICAgICAgICAgbGV0IGFkZHJlc3MxOiBhbnk7XG4gICAgICAgICAgICBsZXQgYWRkcmVzczI6IGFueTtcbiAgICAgICAgICAgIGxldCBhZGRyZXNzMzogYW55O1xuXG4gICAgICAgICAgICBvYmogPSBvYmoudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKTtcblxuICAgICAgICAgICAgaWYgKC8oXFxzPy1cXHM/KSsvLnRlc3Qob2JqKSkge1xuICAgICAgICAgICAgICAgIGFkZHJlc3MzID0gb2JqLnNwbGl0KC8oXFxzPy1cXHM/KSsvKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsRm9ybS5nZXQoJ2FkZHJlc3MzJykuc2V0VmFsdWUoYWRkcmVzczNbYWRkcmVzczMubGVuZ3RoIC0gMV0udHJpbSgpLnNwbGl0KCcgJykubWFwKHZhbCA9PiB2YWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWwuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSkuam9pbignICcpKTtcbiAgICAgICAgICAgICAgICBhZGRyZXNzMiA9IGFkZHJlc3MzWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkcmVzczIgPSBvYmo7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgvKFxccz9bI11cXHM/KSsvLnRlc3QoYWRkcmVzczIpKSB7XG4gICAgICAgICAgICAgICAgYWRkcmVzczIgPSBhZGRyZXNzMi5zcGxpdCgvKFxccz9bI11cXHM/KSsvKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsRm9ybS5nZXQoJ2FkZHJlc3MyJykuc2V0VmFsdWUoYWRkcmVzczJbYWRkcmVzczIubGVuZ3RoIC0gMV0udHJpbSgpLnNwbGl0KCcgJykubWFwKHZhbCA9PiB2YWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWwuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSkuam9pbignICcpKTtcbiAgICAgICAgICAgICAgICBhZGRyZXNzMSA9IGFkZHJlc3MyWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkcmVzczEgPSBvYmo7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpYVJlZ2V4LnRlc3QoYWRkcmVzczEpKSB7XG4gICAgICAgICAgICAgICAgYWRkcmVzczEgPSBhZGRyZXNzMS5zcGxpdCh0aGlzLnZpYVJlZ2V4KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsRm9ybS5nZXQoJ2FkZHJlc3MxJykuc2V0VmFsdWUoYWRkcmVzczFbYWRkcmVzczEubGVuZ3RoIC0gMV0udHJpbSgpLnNwbGl0KCcgJykubWFwKHZhbCA9PiB2YWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWwuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSkuam9pbignICcpKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZpYSh0aGlzLnZpYVJlZ2V4LmV4ZWMob2JqKVswXS5zcGxpdCgnICcpLm1hcCh2YWwgPT4gdmFsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlVmFsdWUoKSB7XG4gICAgICAgIGNvbnN0IGFkZHJlc3MgPSB0aGlzLm1vZGVsRm9ybS5nZXQoJ3ZpYScpLnZhbHVlICsgJyAnICtcbiAgICAgICAgdGhpcy5tb2RlbEZvcm0uZ2V0KCdhZGRyZXNzMScpLnZhbHVlPy50cmltKCkuc3BsaXQoJyAnKS5tYXAodmFsID0+IHZhbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKS5qb2luKCcgJykgK1xuICAgICAgICAnICMgJyArXG4gICAgICAgIHRoaXMubW9kZWxGb3JtLmdldCgnYWRkcmVzczInKS52YWx1ZT8udHJpbSgpLnNwbGl0KCcgJykubWFwKHZhbCA9PiB2YWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWwuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSkuam9pbignICcpICtcbiAgICAgICAgJyAtICcgK1xuICAgICAgICB0aGlzLm1vZGVsRm9ybS5nZXQoJ2FkZHJlc3MzJykudmFsdWU/LnRyaW0oKS5zcGxpdCgnICcpLm1hcCh2YWwgPT4gdmFsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpLmpvaW4oJyAnKTtcblxuICAgICAgICByZXR1cm4gYWRkcmVzcztcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cbiAgICBvbkNoYW5nZShfOiBhbnkpIHsgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgICAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgICB9XG4gICAgb25Ub3VjaCgpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5tb2RlbFN1YiA9IHRoaXMubW9kZWxGb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWxGb3JtLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmdlbmVyYXRlVmFsdWUoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy52aWFFbENvbnQubmF0aXZlRWxlbWVudCwgdGhpcy52aWFPcHRpb25zRWwubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWhhc1ZhbHVlKHRoaXMudmlhRWxIaW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWFFbEhpbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICdDYWxsZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuVmlhT3B0aW9ucygpIHtcblxuICAgICAgICB0aGlzLnZpYU9wdGlvbnNTdWJzLnB1c2goXG4gICAgICAgICAgICBmcm9tRXZlbnQod2luZG93LCAnY2xpY2snKVxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChlOiBNb3VzZUV2ZW50KSA9PiAhdGhpcy52aWFFbENvbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnRhcmdldCkgKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlhKHRoaXMudmlhT3B0aW9uc1swXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMudmlhT3B0aW9uc1N1YnMucHVzaChcbiAgICAgICAgICAgIGZyb21FdmVudCh3aW5kb3csICdrZXl1cCcpXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoKGU6IEtleWJvYXJkRXZlbnQpID0+IGluQXJyYXkoZS5rZXkudG9Mb3dlckNhc2UoKSwgWydhcnJvd3JpZ2h0JywgJ2VzY2FwZScsICdlbnRlciddKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpYSh0aGlzLnZpYU9wdGlvbnNbMF0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmZpbHRlclZpYU9wdGlvbnModGhpcy5tb2RlbEZvcm0uZ2V0KCd2aWEnKS52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb25Ecm9wZG93bigpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMudmlhRWxDb250Lm5hdGl2ZUVsZW1lbnQsIHRoaXMudmlhT3B0aW9uc0VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZURyb3Bkb3duKCkge1xuICAgICAgICB0aGlzLnZpYU9wdGlvbnNTdWJzLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkgKTtcbiAgICAgICAgdGhpcy52aWFPcHRpb25zU3VicyA9IFtdO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLnZpYUVsQ29udC5uYXRpdmVFbGVtZW50LCB0aGlzLnZpYU9wdGlvbnNFbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5hZGRyZXNzMS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb25Ecm9wZG93bigpIHtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSAodGhpcy52aWFPcHRpb25zRWwubmF0aXZlRWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCBlbCA9ICh0aGlzLnZpYUVsLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgcmVtYWluaW5nSGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCAtIChkcm9wZG93bi5vZmZzZXRIZWlnaHQgKyBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBlbC5vZmZzZXRIZWlnaHQpO1xuXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ2xlZnQnLCAoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIDYpICsgJ3B4Jyk7XG5cbiAgICAgICAgICAgIGlmIChyZW1haW5pbmdIZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWwsICdvbnRvcCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGRyb3Bkb3duLCAnb250b3AnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2JvdHRvbScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duLCAndG9wJywgZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tICsgJ3B4Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGVsLCAnb250b3AnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhkcm9wZG93biwgJ29udG9wJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0b3AnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ2JvdHRvbScsIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSArICdweCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlclZpYU9wdGlvbnModmFsdWU6IHN0cmluZykge1xuXG4gICAgICAgIGlmIChoYXNWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmlhT3B0aW9ucyA9IHRoaXMudmlhT3B0aW9uc09yaWdpbmFsLmZpbHRlcihpdCA9PiBpdC5zbGljZSgwLCB2YWx1ZS5sZW5ndGgpLnRvTG93ZXJDYXNlKCkgPT09IHZhbHVlPy50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICAgICAgaWYgKGhhc1ZhbHVlKHRoaXMudmlhT3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpYUVsSGludC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy52aWFPcHRpb25zWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMudmlhRWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMudmlhRWwubmF0aXZlRWxlbWVudC52YWx1ZT8uc3BsaXQoJyAnKS5tYXAodmFsID0+IHZhbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKS5qb2luKCcgJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmlhRWxIaW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkRyb3Bkb3duKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlhT3B0aW9ucyA9IHRoaXMudmlhT3B0aW9uc09yaWdpbmFsO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICB2aWFCbHVyKCkge1xuICAgICAgICBpZiAoIWhhc1ZhbHVlKHRoaXMubW9kZWxGb3JtLmdldCgndmlhJykudmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZpYSh0aGlzLnZpYU9wdGlvbnNbMF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmlhKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGhhc1ZhbHVlKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbEZvcm0uZ2V0KCd2aWEnKS5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnZpYUVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmlhRWxIaW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlhRWwubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy52aWFFbEhpbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubW9kZWxTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy52aWFPcHRpb25zU3Vicz8uZm9yRWFjaChzID0+IHM/LnVuc3Vic2NyaWJlKCkgKTtcbiAgICB9XG5cbn1cbiJdfQ==