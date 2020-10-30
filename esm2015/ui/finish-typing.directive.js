import { __decorate } from "tslib";
import { Directive, Output, EventEmitter, ElementRef, Renderer2, OnDestroy } from '@angular/core';
let FinishTypingDirective = class FinishTypingDirective {
    constructor(_elementRef, rendered) {
        this._elementRef = _elementRef;
        this.callback = new EventEmitter();
        this.listener = rendered.listen(this._elementRef.nativeElement, 'keyup', () => {
            if (this.inputChangedPromise) {
                clearTimeout(this.inputChangedPromise);
            }
            this.inputChangedPromise = setTimeout(() => {
                this.callback.emit();
            }, 500);
        });
    }
    ngOnDestroy() {
        this.listener();
    }
};
FinishTypingDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Output()
], FinishTypingDirective.prototype, "callback", void 0);
FinishTypingDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[finishTyping]'
    })
], FinishTypingDirective);
export { FinishTypingDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluaXNoLXR5cGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbInVpL2ZpbmlzaC10eXBpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNbEcsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFNOUIsWUFBb0IsV0FBdUIsRUFBRSxRQUFtQjtRQUE1QyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUpqQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFFMUUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzFCLFlBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUMxQztZQUVELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUVKLENBQUE7O1lBakJvQyxVQUFVO1lBQVksU0FBUzs7QUFKdEQ7SUFBVCxNQUFNLEVBQUU7dURBQWtEO0FBRmxELHFCQUFxQjtJQUpqQyxTQUFTLENBQUM7UUFDUCwrQ0FBK0M7UUFDL0MsUUFBUSxFQUFFLGdCQUFnQjtLQUM3QixDQUFDO0dBQ1cscUJBQXFCLENBdUJqQztTQXZCWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gICAgc2VsZWN0b3I6ICdbZmluaXNoVHlwaW5nXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbmlzaFR5cGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQE91dHB1dCgpIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGxpc3RlbmVyOiBhbnk7XHJcbiAgICBpbnB1dENoYW5nZWRQcm9taXNlOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCByZW5kZXJlZDogUmVuZGVyZXIyKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IHJlbmRlcmVkLmxpc3Rlbih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdrZXl1cCcsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Q2hhbmdlZFByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmlucHV0Q2hhbmdlZFByb21pc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0Q2hhbmdlZFByb21pc2UgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suZW1pdCgpO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19