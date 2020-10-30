import { __decorate } from "tslib";
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { hasValue } from '../../utils/check';
let SerControlDirective = class SerControlDirective {
    constructor(_ngControl) {
        this._ngControl = _ngControl;
        this.disabled = false;
        this.focus = false;
        this.dirty = false;
        this.valid = false;
        this.invalid = false;
        this.pending = false;
        this.hasValue = false;
    }
    onFocus() {
        this.focus = true;
    }
    onBlur() {
        this.focus = false;
    }
    onChangeValue(value) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.hasValue = hasValue(value);
        this.valid = (_b = (_a = this._ngControl) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.valid;
        this.invalid = (_d = (_c = this._ngControl) === null || _c === void 0 ? void 0 : _c.control) === null || _d === void 0 ? void 0 : _d.invalid;
        this.dirty = (_f = (_e = this._ngControl) === null || _e === void 0 ? void 0 : _e.control) === null || _f === void 0 ? void 0 : _f.dirty;
        this.disabled = (_h = (_g = this._ngControl) === null || _g === void 0 ? void 0 : _g.control) === null || _h === void 0 ? void 0 : _h.disabled;
        this.pending = (_k = (_j = this._ngControl) === null || _j === void 0 ? void 0 : _j.control) === null || _k === void 0 ? void 0 : _k.pending;
    }
    ngOnInit() {
        var _a, _b, _c, _d;
        this.onChangeValue((_b = (_a = this._ngControl) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.value);
        this.observer = (_d = (_c = this._ngControl) === null || _c === void 0 ? void 0 : _c.control) === null || _d === void 0 ? void 0 : _d.valueChanges.subscribe((value) => {
            this.onChangeValue(value);
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
};
SerControlDirective.ctorParameters = () => [
    { type: NgControl }
];
__decorate([
    HostListener('focus')
], SerControlDirective.prototype, "onFocus", null);
__decorate([
    HostListener('blur')
], SerControlDirective.prototype, "onBlur", null);
SerControlDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[serControl]'
    })
], SerControlDirective);
export { SerControlDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLWNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJmb3JtL3Nlci1mb3JtLWVsZW1lbnQvc2VyLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU03QyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQVU1QixZQUFvQixVQUFxQjtRQUFyQixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBVHpDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFHNEIsQ0FBQztJQUc5QyxPQUFPO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUdELE1BQU07UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQVU7O1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLGVBQUcsSUFBSSxDQUFDLFVBQVUsMENBQUUsT0FBTywwQ0FBRSxLQUFLLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sZUFBRyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxPQUFPLDBDQUFFLE9BQU8sQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxlQUFHLElBQUksQ0FBQyxVQUFVLDBDQUFFLE9BQU8sMENBQUUsS0FBSyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLGVBQUcsSUFBSSxDQUFDLFVBQVUsMENBQUUsT0FBTywwQ0FBRSxRQUFRLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sZUFBRyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxPQUFPLDBDQUFFLE9BQU8sQ0FBQztJQUNyRCxDQUFDO0lBRUQsUUFBUTs7UUFDSixJQUFJLENBQUMsYUFBYSxhQUFDLElBQUksQ0FBQyxVQUFVLDBDQUFFLE9BQU8sMENBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLFFBQVEsZUFBRyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxPQUFPLDBDQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUM1RSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7O1FBQ1AsTUFBQSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxXQUFXLEdBQUc7SUFDakMsQ0FBQztDQUVKLENBQUE7O1lBakNtQyxTQUFTOztBQUd6QztJQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7a0RBR3JCO0FBR0Q7SUFEQyxZQUFZLENBQUMsTUFBTSxDQUFDO2lEQUdwQjtBQXBCUSxtQkFBbUI7SUFKL0IsU0FBUyxDQUFDO1FBQ1AsK0NBQStDO1FBQy9DLFFBQVEsRUFBRSxjQUFjO0tBQzNCLENBQUM7R0FDVyxtQkFBbUIsQ0EyQy9CO1NBM0NZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NoZWNrJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcclxuICAgIHNlbGVjdG9yOiAnW3NlckNvbnRyb2xdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VyQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICBmb2N1cyA9IGZhbHNlO1xyXG4gICAgZGlydHkgPSBmYWxzZTtcclxuICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICBpbnZhbGlkID0gZmFsc2U7XHJcbiAgICBwZW5kaW5nID0gZmFsc2U7XHJcbiAgICBoYXNWYWx1ZSA9IGZhbHNlO1xyXG4gICAgb2JzZXJ2ZXI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ0NvbnRyb2w6IE5nQ29udHJvbCkgeyB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxyXG4gICAgb25Gb2N1cygpIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdibHVyJylcclxuICAgIG9uQmx1cigpIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25DaGFuZ2VWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5oYXNWYWx1ZSA9IGhhc1ZhbHVlKHZhbHVlKTtcclxuICAgICAgICB0aGlzLnZhbGlkID0gdGhpcy5fbmdDb250cm9sPy5jb250cm9sPy52YWxpZDtcclxuICAgICAgICB0aGlzLmludmFsaWQgPSB0aGlzLl9uZ0NvbnRyb2w/LmNvbnRyb2w/LmludmFsaWQ7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRoaXMuX25nQ29udHJvbD8uY29udHJvbD8uZGlydHk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMuX25nQ29udHJvbD8uY29udHJvbD8uZGlzYWJsZWQ7XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdGhpcy5fbmdDb250cm9sPy5jb250cm9sPy5wZW5kaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2VWYWx1ZSh0aGlzLl9uZ0NvbnRyb2w/LmNvbnRyb2w/LnZhbHVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IHRoaXMuX25nQ29udHJvbD8uY29udHJvbD8udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlVmFsdWUodmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXI/LnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==