var PinInputComponent_1;
import { __awaiter, __decorate } from "tslib";
// tslint:disable: component-selector
import { Component, forwardRef, HostBinding, Input, ViewChildren } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { hasValue } from '../../utils/check';
let PinInputComponent = PinInputComponent_1 = class PinInputComponent {
    constructor() {
        this.show = false;
        this.inputs = [];
        this.codeLength = 4;
        this.onlyNumber = true;
        this.isCodeHidden = false;
        this.value = [];
        this.isDisabled = false;
    }
    writeValue(obj) {
        if (hasValue(obj)) {
            this.value = obj.toString().split('');
        }
    }
    ngOnInit() {
        this.type = (this.isCodeHidden) ? 'password' : 'text';
        this.codeInputs = Array(this.codeLength);
    }
    ngAfterViewInit() {
        this.inputsList.forEach((item, i) => {
            if (hasValue(this.value[i])) {
                item.nativeElement.value = this.value[i];
            }
            this.inputs.push(item.nativeElement);
        });
    }
    canInputValue(value) {
        if (!hasValue(value)) {
            return true;
        }
        if (this.onlyNumber) {
            return /^[0-9]+$/.test(value.toString());
        }
        else {
            return /^[0-9a-zA-Z]+$/.test(value.toString());
        }
    }
    generateValue() {
        const values = [];
        this.inputs.forEach((input) => {
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
    }
    onInput(e, i) {
        const next = i + 1;
        const target = e.target;
        const value = e.data || target.value;
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
    }
    onKeydown(e, i) {
        return __awaiter(this, void 0, void 0, function* () {
            const prev = i - 1;
            const next = i + 1;
            const value = e.target.value;
            const backspace = e.key.toLowerCase() === 'backspace';
            if (backspace) {
                if (prev >= 0) {
                    setTimeout(() => {
                        this.inputs[prev].focus();
                    });
                }
                return;
            }
            if (!this.canInputValue(e.key.toLowerCase())) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if (hasValue(value)) {
                e.preventDefault();
                e.stopPropagation();
                if (next < this.codeLength) {
                    this.inputs[next].focus();
                }
            }
        });
    }
    onClick(e) {
        let index = this.codeLength - 1;
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        for (let i = 0; i < this.inputs.length; i++) {
            if (!hasValue(this.inputs[i].value)) {
                index = i;
                break;
            }
        }
        if (hasValue(index)) {
            this.inputs[index].focus();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    onChange(_) { }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    onTouch() { }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
};
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
                useExisting: forwardRef(() => PinInputComponent_1),
                multi: true
            }
        ]
    })
], PinInputComponent);
export { PinInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZXJzb2wvbmd4LyIsInNvdXJjZXMiOlsiZm9ybS9waW4vcGluLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQUNyQyxPQUFPLEVBQWlCLFNBQVMsRUFBYyxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RJLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFhN0MsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWlCO0lBQTlCO1FBRytCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFFaEMsV0FBTSxHQUF1QixFQUFFLENBQUM7UUFFL0IsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFHOUIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVYLGVBQVUsR0FBRyxLQUFLLENBQUM7SUE4SXZCLENBQUM7SUE1SUcsVUFBVSxDQUFDLEdBQVE7UUFDZixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDdEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxl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QUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxRQUFRLENBQUMsQ0FBTSxJQUFJLENBQUM7SUFFcEIsaUJBQWlCLENBQUMsRUFBTztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7SUFFYixnQkFBZ0IsQ0FBRSxVQUFtQjtRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0NBQ0osQ0FBQTtBQTFKMEI7SUFBdEIsWUFBWSxDQUFDLE9BQU8sQ0FBQztxREFBbUM7QUFDOUI7SUFBMUIsV0FBVyxDQUFDLFlBQVksQ0FBQzsrQ0FBYztBQUkvQjtJQUFSLEtBQUssRUFBRTtxREFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTtxREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7dURBQXNCO0FBVHJCLGlCQUFpQjtJQVg3QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQixnYkFBeUM7UUFDekMsU0FBUyxFQUFFO1lBQ1A7Z0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBaUIsQ0FBQztnQkFDaEQsS0FBSyxFQUFFLElBQUk7YUFDZDtTQUNKO0tBQ0osQ0FBQztHQUNXLGlCQUFpQixDQTRKN0I7U0E1SlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6IGNvbXBvbmVudC1zZWxlY3RvclxyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IGhhc1ZhbHVlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY2hlY2snO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Bpbi1pbnB1dCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGluLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBpbklucHV0Q29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaW5JbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICAgIEBWaWV3Q2hpbGRyZW4oJ2lucHV0JykgaW5wdXRzTGlzdDogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaG93Jykgc2hvdyA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgaW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgICBASW5wdXQoKSBjb2RlTGVuZ3RoID0gNDtcclxuICAgIEBJbnB1dCgpIG9ubHlOdW1iZXIgPSB0cnVlO1xyXG4gICAgQElucHV0KCkgaXNDb2RlSGlkZGVuID0gZmFsc2U7XHJcblxyXG4gICAgY29kZUlucHV0czogbnVtYmVyW10gfCBzdHJpbmdbXTtcclxuICAgIHZhbHVlID0gW107XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBpc0Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSkge1xyXG4gICAgICAgIGlmIChoYXNWYWx1ZShvYmopKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBvYmoudG9TdHJpbmcoKS5zcGxpdCgnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9ICh0aGlzLmlzQ29kZUhpZGRlbikgPyAncGFzc3dvcmQnIDogJ3RleHQnO1xyXG4gICAgICAgIHRoaXMuY29kZUlucHV0cyA9IEFycmF5KHRoaXMuY29kZUxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRzTGlzdC5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFzVmFsdWUodGhpcy52YWx1ZVtpXSkpIHtcclxuICAgICAgICAgICAgICAgIChpdGVtLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB0aGlzLnZhbHVlW2ldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0cy5wdXNoKGl0ZW0ubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYW5JbnB1dFZhbHVlKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIWhhc1ZhbHVlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9ubHlOdW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC9eWzAtOV0rJC8udGVzdCh2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gL15bMC05YS16QS1aXSskLy50ZXN0KHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZVZhbHVlKCk6IHN0cmluZyB8IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGhhc1ZhbHVlKGlucHV0LnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goaW5wdXQudmFsdWUudHJpbSgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IHRoaXMuY29kZUxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzLmpvaW4oJycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dChlOiBhbnksIGk6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBpICsgMTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGUuZGF0YSB8fCB0YXJnZXQudmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMub25Ub3VjaCgpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2FuSW5wdXRWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmV4dCA8IHRoaXMuY29kZUxlbmd0aCAmJiBoYXNWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dHNbbmV4dF0uZm9jdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5nZW5lcmF0ZVZhbHVlKCkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbktleWRvd24oZTogS2V5Ym9hcmRFdmVudCwgaTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcHJldiA9IGkgLSAxO1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBpICsgMTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuICAgICAgICBjb25zdCBiYWNrc3BhY2UgPSBlLmtleS50b0xvd2VyQ2FzZSgpID09PSAnYmFja3NwYWNlJztcclxuXHJcbiAgICAgICAgaWYgKGJhY2tzcGFjZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHByZXYgPj0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRzW3ByZXZdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jYW5JbnB1dFZhbHVlKGUua2V5LnRvTG93ZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhhc1ZhbHVlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV4dCA8IHRoaXMuY29kZUxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dHNbbmV4dF0uZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGU6IGFueSkge1xyXG5cclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmNvZGVMZW5ndGggLSAxO1xyXG4gICAgICAgIGUudGFyZ2V0LnNldFNlbGVjdGlvblJhbmdlKGUudGFyZ2V0LnZhbHVlLmxlbmd0aCwgZS50YXJnZXQudmFsdWUubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmlucHV0cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFoYXNWYWx1ZSh0aGlzLmlucHV0c1tpXS52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzVmFsdWUoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRzW2luZGV4XS5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcbiAgICBvbkNoYW5nZShfOiBhbnkpIHsgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2ggPSBmbjtcclxuICAgIH1cclxuICAgIG9uVG91Y2goKSB7IH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxufVxyXG4iXX0=