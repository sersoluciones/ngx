import { __awaiter, __decorate, __generator } from "tslib";
// tslint:disable: component-selector
import { Component, forwardRef, HostBinding, Input, ViewChildren } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { hasValue } from '../../utils/check';
var PinInputComponent = /** @class */ (function () {
    function PinInputComponent() {
        this.show = false;
        this.inputs = [];
        this.codeLength = 4;
        this.onlyNumber = true;
        this.isCodeHidden = false;
        this.value = [];
        this.isDisabled = false;
    }
    PinInputComponent_1 = PinInputComponent;
    PinInputComponent.prototype.writeValue = function (obj) {
        if (hasValue(obj)) {
            this.value = obj.toString().split('');
        }
    };
    PinInputComponent.prototype.ngOnInit = function () {
        this.type = (this.isCodeHidden) ? 'password' : 'text';
        this.codeInputs = Array(this.codeLength);
    };
    PinInputComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.inputsList.forEach(function (item, i) {
            if (hasValue(_this.value[i])) {
                item.nativeElement.value = _this.value[i];
            }
            _this.inputs.push(item.nativeElement);
        });
    };
    PinInputComponent.prototype.canInputValue = function (value) {
        if (!hasValue(value)) {
            return true;
        }
        if (this.onlyNumber) {
            return /^[0-9]+$/.test(value.toString());
        }
        else {
            return /^[0-9a-zA-Z]+$/.test(value.toString());
        }
    };
    PinInputComponent.prototype.generateValue = function () {
        var values = [];
        this.inputs.forEach(function (input) {
            if (hasValue(input.value)) {
                values.push(input.value.trim());
            }
        });
        if (values.length === this.codeLength) {
            return values.join('');
        }
        else {
            return null;
        }
    };
    PinInputComponent.prototype.onInput = function (e, i) {
        var next = i + 1;
        var target = e.target;
        var value = e.data || target.value;
        this.onTouch();
        if (!this.canInputValue(value)) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (next < this.codeLength && hasValue(value)) {
            this.inputs[next].focus();
        }
        this.onChange(this.generateValue());
    };
    PinInputComponent.prototype.onKeydown = function (e, i) {
        return __awaiter(this, void 0, void 0, function () {
            var prev, next, value, backspace;
            var _this = this;
            return __generator(this, function (_a) {
                prev = i - 1;
                next = i + 1;
                value = e.target.value;
                backspace = e.key.toLowerCase() === 'backspace';
                if (backspace) {
                    if (prev >= 0) {
                        setTimeout(function () {
                            _this.inputs[prev].focus();
                        });
                    }
                    return [2 /*return*/];
                }
                if (!this.canInputValue(e.key.toLowerCase())) {
                    e.preventDefault();
                    e.stopPropagation();
                    return [2 /*return*/];
                }
                if (hasValue(value)) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (next < this.codeLength) {
                        this.inputs[next].focus();
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    PinInputComponent.prototype.onClick = function (e) {
        var index = this.codeLength - 1;
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        for (var i = 0; i < this.inputs.length; i++) {
            if (!hasValue(this.inputs[i].value)) {
                index = i;
                break;
            }
        }
        if (hasValue(index)) {
            this.inputs[index].focus();
        }
    };
    PinInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    PinInputComponent.prototype.onChange = function (_) { };
    PinInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouch = fn;
    };
    PinInputComponent.prototype.onTouch = function () { };
    PinInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    var PinInputComponent_1;
    __decorate([
        ViewChildren('input')
    ], PinInputComponent.prototype, "inputsList", void 0);
    __decorate([
        HostBinding('class.show')
    ], PinInputComponent.prototype, "show", void 0);
    __decorate([
        Input()
    ], PinInputComponent.prototype, "codeLength", void 0);
    __decorate([
        Input()
    ], PinInputComponent.prototype, "onlyNumber", void 0);
    __decorate([
        Input()
    ], PinInputComponent.prototype, "isCodeHidden", void 0);
    PinInputComponent = PinInputComponent_1 = __decorate([
        Component({
            selector: 'pin-input',
            template: "<span *ngFor=\"let holder of codeInputs; index as i\">\r\n\r\n    <input class=\"not-styled\" #input\r\n    [type]=\"type\"\r\n    [disabled]=\"isDisabled\"\r\n    (input)=\"onInput($event, i)\"\r\n    (keydown)=\"onKeydown($event, i)\"\r\n    (click)=\"onClick($event)\"\r\n    autocomplete=\"chrome-off\"\r\n    maxlength=\"1\"\r\n     />\r\n\r\n    <!-- <input (paste)=\"onPaste($event, i)\" /> -->\r\n\r\n</span>\r\n",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return PinInputComponent_1; }),
                    multi: true
                }
            ]
        })
    ], PinInputComponent);
    return PinInputComponent;
}());
export { PinInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZXJzb2wvbmd4LyIsInNvdXJjZXMiOlsiZm9ybS9waW4vcGluLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUNBQXFDO0FBQ3JDLE9BQU8sRUFBaUIsU0FBUyxFQUFjLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEksT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQWE3QztJQUFBO1FBRytCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFFaEMsV0FBTSxHQUF1QixFQUFFLENBQUM7UUFFL0IsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFHOUIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVYLGVBQVUsR0FBRyxLQUFLLENBQUM7SUE4SXZCLENBQUM7MEJBNUpZLGlCQUFpQjtJQWdCMUIsc0NBQVUsR0FBVixVQUFXLEdBQVE7UUFDZixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDdEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCwyQ0FBZSxH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QUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRCw0Q0FBZ0IsR0FBaEIsVUFBaUIsRUFBTztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0Qsb0NBQVEsR0FBUixVQUFTLENBQU0sSUFBSSxDQUFDO0lBRXBCLDZDQUFpQixHQUFqQixVQUFrQixFQUFPO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxtQ0FBTyxHQUFQLGNBQVksQ0FBQztJQUViLDRDQUFnQixHQUFoQixVQUFrQixVQUFtQjtRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDOztJQXpKc0I7UUFBdEIsWUFBWSxDQUFDLE9BQU8sQ0FBQzt5REFBbUM7SUFDOUI7UUFBMUIsV0FBVyxDQUFDLFlBQVksQ0FBQzttREFBYztJQUkvQjtRQUFSLEtBQUssRUFBRTt5REFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTt5REFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7MkRBQXNCO0lBVHJCLGlCQUFpQjtRQVg3QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixnYkFBeUM7WUFDekMsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG1CQUFpQixFQUFqQixDQUFpQixDQUFDO29CQUNoRCxLQUFLLEVBQUUsSUFBSTtpQkFDZDthQUNKO1NBQ0osQ0FBQztPQUNXLGlCQUFpQixDQTRKN0I7SUFBRCx3QkFBQztDQUFBLEFBNUpELElBNEpDO1NBNUpZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBjb21wb25lbnQtc2VsZWN0b3JcclxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NoZWNrJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwaW4taW5wdXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Bpbi1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQaW5JbnB1dENvbXBvbmVudCksXHJcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGluSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgICBAVmlld0NoaWxkcmVuKCdpbnB1dCcpIGlucHV0c0xpc3Q6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuICAgIEBIb3N0QmluZGluZygnY2xhc3Muc2hvdycpIHNob3cgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIGlucHV0czogSFRNTElucHV0RWxlbWVudFtdID0gW107XHJcblxyXG4gICAgQElucHV0KCkgY29kZUxlbmd0aCA9IDQ7XHJcbiAgICBASW5wdXQoKSBvbmx5TnVtYmVyID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIGlzQ29kZUhpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvZGVJbnB1dHM6IG51bWJlcltdIHwgc3RyaW5nW107XHJcbiAgICB2YWx1ZSA9IFtdO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAoaGFzVmFsdWUob2JqKSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gb2JqLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSAodGhpcy5pc0NvZGVIaWRkZW4pID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0JztcclxuICAgICAgICB0aGlzLmNvZGVJbnB1dHMgPSBBcnJheSh0aGlzLmNvZGVMZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmlucHV0c0xpc3QuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGhhc1ZhbHVlKHRoaXMudmFsdWVbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICAoaXRlbS5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gdGhpcy52YWx1ZVtpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnB1dHMucHVzaChpdGVtLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FuSW5wdXRWYWx1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCFoYXNWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5vbmx5TnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAvXlswLTldKyQvLnRlc3QodmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIC9eWzAtOWEtekEtWl0rJC8udGVzdCh2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVWYWx1ZSgpOiBzdHJpbmcgfCBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYXNWYWx1ZShpbnB1dC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGlucHV0LnZhbHVlLnRyaW0oKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSB0aGlzLmNvZGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcy5qb2luKCcnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uSW5wdXQoZTogYW55LCBpOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gaSArIDE7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBlLmRhdGEgfHwgdGFyZ2V0LnZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLm9uVG91Y2goKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNhbklucHV0VmFsdWUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5leHQgPCB0aGlzLmNvZGVMZW5ndGggJiYgaGFzVmFsdWUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRzW25leHRdLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuZ2VuZXJhdGVWYWx1ZSgpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25LZXlkb3duKGU6IEtleWJvYXJkRXZlbnQsIGk6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHByZXYgPSBpIC0gMTtcclxuICAgICAgICBjb25zdCBuZXh0ID0gaSArIDE7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcbiAgICAgICAgY29uc3QgYmFja3NwYWNlID0gZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2JhY2tzcGFjZSc7XHJcblxyXG4gICAgICAgIGlmIChiYWNrc3BhY2UpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChwcmV2ID49IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0c1twcmV2XS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2FuSW5wdXRWYWx1ZShlLmtleS50b0xvd2VyQ2FzZSgpKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXNWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5leHQgPCB0aGlzLmNvZGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRzW25leHRdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlOiBhbnkpIHtcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jb2RlTGVuZ3RoIC0gMTtcclxuICAgICAgICBlLnRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShlLnRhcmdldC52YWx1ZS5sZW5ndGgsIGUudGFyZ2V0LnZhbHVlLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaGFzVmFsdWUodGhpcy5pbnB1dHNbaV0udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhhc1ZhbHVlKGluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0c1tpbmRleF0uZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG4gICAgb25DaGFuZ2UoXzogYW55KSB7IH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoID0gZm47XHJcbiAgICB9XHJcbiAgICBvblRvdWNoKCkgeyB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcbn1cclxuIl19