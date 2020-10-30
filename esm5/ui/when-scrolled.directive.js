import { __decorate } from "tslib";
import { Directive, ElementRef, OnDestroy, Output, EventEmitter, Renderer2 } from '@angular/core';
var WhenScrolledDirective = /** @class */ (function () {
    function WhenScrolledDirective(_elementRef, rendered) {
        var _this = this;
        this._elementRef = _elementRef;
        this.callback = new EventEmitter();
        this.listener = rendered.listen(this._elementRef.nativeElement, 'scroll', function (ev) {
            if (ev.target.scrollTop + ev.target.offsetHeight >= ev.target.scrollHeight) {
                _this.callback.emit();
            }
        });
    }
    WhenScrolledDirective.prototype.ngOnDestroy = function () {
        this.listener();
    };
    WhenScrolledDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Output()
    ], WhenScrolledDirective.prototype, "callback", void 0);
    WhenScrolledDirective = __decorate([
        Directive({
            // tslint:disable-next-line: directive-selector
            selector: '[whenScrolled]'
        })
    ], WhenScrolledDirective);
    return WhenScrolledDirective;
}());
export { WhenScrolledDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi1zY3JvbGxlZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbInVpL3doZW4tc2Nyb2xsZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNbEc7SUFLSSwrQkFBb0IsV0FBdUIsRUFBRSxRQUFtQjtRQUFoRSxpQkFNQztRQU5tQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUhqQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxVQUFDLEVBQU87WUFDOUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDeEUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Z0JBVmdDLFVBQVU7Z0JBQVksU0FBUzs7SUFIdEQ7UUFBVCxNQUFNLEVBQUU7MkRBQWtEO0lBRmxELHFCQUFxQjtRQUpqQyxTQUFTLENBQUM7WUFDUCwrQ0FBK0M7WUFDL0MsUUFBUSxFQUFFLGdCQUFnQjtTQUM3QixDQUFDO09BQ1cscUJBQXFCLENBaUJqQztJQUFELDRCQUFDO0NBQUEsQUFqQkQsSUFpQkM7U0FqQlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcclxuICAgIHNlbGVjdG9yOiAnW3doZW5TY3JvbGxlZF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXaGVuU2Nyb2xsZWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBPdXRwdXQoKSBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBsaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVkOiBSZW5kZXJlcjIpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyID0gcmVuZGVyZWQubGlzdGVuKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcsIChldjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldi50YXJnZXQuc2Nyb2xsVG9wICsgZXYudGFyZ2V0Lm9mZnNldEhlaWdodCA+PSBldi50YXJnZXQuc2Nyb2xsSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmVtaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19