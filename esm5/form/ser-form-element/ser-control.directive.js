import { __decorate } from "tslib";
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { hasValue } from '../../utils/check';
var SerControlDirective = /** @class */ (function () {
    function SerControlDirective(_ngControl) {
        this._ngControl = _ngControl;
        this.disabled = false;
        this.focus = false;
        this.dirty = false;
        this.valid = false;
        this.invalid = false;
        this.pending = false;
        this.hasValue = false;
    }
    SerControlDirective.prototype.onFocus = function () {
        this.focus = true;
    };
    SerControlDirective.prototype.onBlur = function () {
        this.focus = false;
    };
    SerControlDirective.prototype.onChangeValue = function (value) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.hasValue = hasValue(value);
        this.valid = (_b = (_a = this._ngControl) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.valid;
        this.invalid = (_d = (_c = this._ngControl) === null || _c === void 0 ? void 0 : _c.control) === null || _d === void 0 ? void 0 : _d.invalid;
        this.dirty = (_f = (_e = this._ngControl) === null || _e === void 0 ? void 0 : _e.control) === null || _f === void 0 ? void 0 : _f.dirty;
        this.disabled = (_h = (_g = this._ngControl) === null || _g === void 0 ? void 0 : _g.control) === null || _h === void 0 ? void 0 : _h.disabled;
        this.pending = (_k = (_j = this._ngControl) === null || _j === void 0 ? void 0 : _j.control) === null || _k === void 0 ? void 0 : _k.pending;
    };
    SerControlDirective.prototype.ngOnInit = function () {
        var _this = this;
        var _a, _b, _c, _d;
        this.onChangeValue((_b = (_a = this._ngControl) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.value);
        this.observer = (_d = (_c = this._ngControl) === null || _c === void 0 ? void 0 : _c.control) === null || _d === void 0 ? void 0 : _d.valueChanges.subscribe(function (value) {
            _this.onChangeValue(value);
        });
    };
    SerControlDirective.prototype.ngOnDestroy = function () {
        var _a;
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    };
    SerControlDirective.ctorParameters = function () { return [
        { type: NgControl }
    ]; };
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
    return SerControlDirective;
}());
export { SerControlDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLWNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJmb3JtL3Nlci1mb3JtLWVsZW1lbnQvc2VyLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU03QztJQVVJLDZCQUFvQixVQUFxQjtRQUFyQixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBVHpDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFHNEIsQ0FBQztJQUc5QyxxQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUdELG9DQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsMkNBQWEsR0FBYixVQUFjLEtBQVU7O1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLGVBQUcsSUFBSSxDQUFDLFVBQVUsMENBQUUsT0FBTywwQ0FBRSxLQUFLLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sZUFBRyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxPQUFPLDBDQUFFLE9BQU8sQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxlQUFHLElBQUksQ0FBQyxVQUFVLDBDQUFFLE9BQU8sMENBQUUsS0FBSyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLGVBQUcsSUFBSSxDQUFDLFVBQVUsMENBQUUsT0FBTywwQ0FBRSxRQUFRLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sZUFBRyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxPQUFPLDBDQUFFLE9BQU8sQ0FBQztJQUNyRCxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQU1DOztRQUxHLElBQUksQ0FBQyxhQUFhLGFBQUMsSUFBSSxDQUFDLFVBQVUsMENBQUUsT0FBTywwQ0FBRSxLQUFLLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsUUFBUSxlQUFHLElBQUksQ0FBQyxVQUFVLDBDQUFFLE9BQU8sMENBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQVU7WUFDeEUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5Q0FBVyxHQUFYOztRQUNJLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsV0FBVyxHQUFHO0lBQ2pDLENBQUM7O2dCQS9CK0IsU0FBUzs7SUFHekM7UUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDO3NEQUdyQjtJQUdEO1FBREMsWUFBWSxDQUFDLE1BQU0sQ0FBQztxREFHcEI7SUFwQlEsbUJBQW1CO1FBSi9CLFNBQVMsQ0FBQztZQUNQLCtDQUErQztZQUMvQyxRQUFRLEVBQUUsY0FBYztTQUMzQixDQUFDO09BQ1csbUJBQW1CLENBMkMvQjtJQUFELDBCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0EzQ1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGhhc1ZhbHVlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY2hlY2snO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gICAgc2VsZWN0b3I6ICdbc2VyQ29udHJvbF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGZvY3VzID0gZmFsc2U7XHJcbiAgICBkaXJ0eSA9IGZhbHNlO1xyXG4gICAgdmFsaWQgPSBmYWxzZTtcclxuICAgIGludmFsaWQgPSBmYWxzZTtcclxuICAgIHBlbmRpbmcgPSBmYWxzZTtcclxuICAgIGhhc1ZhbHVlID0gZmFsc2U7XHJcbiAgICBvYnNlcnZlcjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nQ29udHJvbDogTmdDb250cm9sKSB7IH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycpXHJcbiAgICBvbkZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxyXG4gICAgb25CbHVyKCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhhc1ZhbHVlID0gaGFzVmFsdWUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMudmFsaWQgPSB0aGlzLl9uZ0NvbnRyb2w/LmNvbnRyb2w/LnZhbGlkO1xyXG4gICAgICAgIHRoaXMuaW52YWxpZCA9IHRoaXMuX25nQ29udHJvbD8uY29udHJvbD8uaW52YWxpZDtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gdGhpcy5fbmdDb250cm9sPy5jb250cm9sPy5kaXJ0eTtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdGhpcy5fbmdDb250cm9sPy5jb250cm9sPy5kaXNhYmxlZDtcclxuICAgICAgICB0aGlzLnBlbmRpbmcgPSB0aGlzLl9uZ0NvbnRyb2w/LmNvbnRyb2w/LnBlbmRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZVZhbHVlKHRoaXMuX25nQ29udHJvbD8uY29udHJvbD8udmFsdWUpO1xyXG5cclxuICAgICAgICB0aGlzLm9ic2VydmVyID0gdGhpcy5fbmdDb250cm9sPy5jb250cm9sPy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcj8udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19