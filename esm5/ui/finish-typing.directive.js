import { __decorate } from "tslib";
import { Directive, Output, EventEmitter, ElementRef, Renderer2, OnDestroy } from '@angular/core';
var FinishTypingDirective = /** @class */ (function () {
    function FinishTypingDirective(_elementRef, rendered) {
        var _this = this;
        this._elementRef = _elementRef;
        this.callback = new EventEmitter();
        this.listener = rendered.listen(this._elementRef.nativeElement, 'keyup', function () {
            if (_this.inputChangedPromise) {
                clearTimeout(_this.inputChangedPromise);
            }
            _this.inputChangedPromise = setTimeout(function () {
                _this.callback.emit();
            }, 500);
        });
    }
    FinishTypingDirective.prototype.ngOnDestroy = function () {
        this.listener();
    };
    FinishTypingDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Output()
    ], FinishTypingDirective.prototype, "callback", void 0);
    FinishTypingDirective = __decorate([
        Directive({
            // tslint:disable-next-line: directive-selector
            selector: '[finishTyping]'
        })
    ], FinishTypingDirective);
    return FinishTypingDirective;
}());
export { FinishTypingDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluaXNoLXR5cGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbInVpL2ZpbmlzaC10eXBpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNbEc7SUFNSSwrQkFBb0IsV0FBdUIsRUFBRSxRQUFtQjtRQUFoRSxpQkFXQztRQVhtQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUpqQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRTtZQUVyRSxJQUFJLEtBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDMUIsWUFBWSxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQzFDO1lBRUQsS0FBSSxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztnQkFDbEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7O2dCQWZnQyxVQUFVO2dCQUFZLFNBQVM7O0lBSnREO1FBQVQsTUFBTSxFQUFFOzJEQUFrRDtJQUZsRCxxQkFBcUI7UUFKakMsU0FBUyxDQUFDO1lBQ1AsK0NBQStDO1lBQy9DLFFBQVEsRUFBRSxnQkFBZ0I7U0FDN0IsQ0FBQztPQUNXLHFCQUFxQixDQXVCakM7SUFBRCw0QkFBQztDQUFBLEFBdkJELElBdUJDO1NBdkJZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXHJcbiAgICBzZWxlY3RvcjogJ1tmaW5pc2hUeXBpbmddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRmluaXNoVHlwaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuXHJcbiAgICBAT3V0cHV0KCkgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgbGlzdGVuZXI6IGFueTtcclxuICAgIGlucHV0Q2hhbmdlZFByb21pc2U6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVkOiBSZW5kZXJlcjIpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyID0gcmVuZGVyZWQubGlzdGVuKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2tleXVwJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRDaGFuZ2VkUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaW5wdXRDaGFuZ2VkUHJvbWlzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VkUHJvbWlzZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5lbWl0KCk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=