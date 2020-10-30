import { __decorate } from "tslib";
import { Directive, ElementRef, OnDestroy, Output, EventEmitter, Renderer2 } from '@angular/core';
let WhenScrolledDirective = class WhenScrolledDirective {
    constructor(_elementRef, rendered) {
        this._elementRef = _elementRef;
        this.callback = new EventEmitter();
        this.listener = rendered.listen(this._elementRef.nativeElement, 'scroll', (ev) => {
            if (ev.target.scrollTop + ev.target.offsetHeight >= ev.target.scrollHeight) {
                this.callback.emit();
            }
        });
    }
    ngOnDestroy() {
        this.listener();
    }
};
WhenScrolledDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Output()
], WhenScrolledDirective.prototype, "callback", void 0);
WhenScrolledDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[whenScrolled]'
    })
], WhenScrolledDirective);
export { WhenScrolledDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi1zY3JvbGxlZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbInVpL3doZW4tc2Nyb2xsZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNbEcsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFLOUIsWUFBb0IsV0FBdUIsRUFBRSxRQUFtQjtRQUE1QyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUhqQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQU8sRUFBRSxFQUFFO1lBQ2xGLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQ3hFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FFSixDQUFBOztZQVpvQyxVQUFVO1lBQVksU0FBUzs7QUFIdEQ7SUFBVCxNQUFNLEVBQUU7dURBQWtEO0FBRmxELHFCQUFxQjtJQUpqQyxTQUFTLENBQUM7UUFDUCwrQ0FBK0M7UUFDL0MsUUFBUSxFQUFFLGdCQUFnQjtLQUM3QixDQUFDO0dBQ1cscUJBQXFCLENBaUJqQztTQWpCWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gICAgc2VsZWN0b3I6ICdbd2hlblNjcm9sbGVkXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdoZW5TY3JvbGxlZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQE91dHB1dCgpIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGxpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVuZGVyZWQ6IFJlbmRlcmVyMikge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSByZW5kZXJlZC5saXN0ZW4odGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsJywgKGV2OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2LnRhcmdldC5zY3JvbGxUb3AgKyBldi50YXJnZXQub2Zmc2V0SGVpZ2h0ID49IGV2LnRhcmdldC5zY3JvbGxIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suZW1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=