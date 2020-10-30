import { __decorate } from "tslib";
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
let CopyToClipboardDirective = class CopyToClipboardDirective {
    constructor() {
        this.valToCopy = '';
        this.copied = new EventEmitter();
    }
    onClick(val) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.zIndex = '-1000';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.valToCopy;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.copied.emit(this.valToCopy);
    }
};
__decorate([
    Input('copyToClipboard')
], CopyToClipboardDirective.prototype, "valToCopy", void 0);
__decorate([
    Output()
], CopyToClipboardDirective.prototype, "copied", void 0);
__decorate([
    HostListener('click', ['$event'])
], CopyToClipboardDirective.prototype, "onClick", null);
CopyToClipboardDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[copyToClipboard]'
    })
], CopyToClipboardDirective);
export { CopyToClipboardDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS10by1jbGlwYm9hcmQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJ1aS9jb3B5LXRvLWNsaXBib2FyZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTXJGLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBQXJDO1FBRThCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDL0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFtQmxELENBQUM7SUFqQnNDLE9BQU8sQ0FBQyxHQUFRO1FBQy9DLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUMzQixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FFSixDQUFBO0FBcEI2QjtJQUF6QixLQUFLLENBQUMsaUJBQWlCLENBQUM7MkRBQWdCO0FBQy9CO0lBQVQsTUFBTSxFQUFFO3dEQUFxQztBQUVYO0lBQWxDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzt1REFlakM7QUFwQlEsd0JBQXdCO0lBSnBDLFNBQVMsQ0FBQztRQUNQLCtDQUErQztRQUMvQyxRQUFRLEVBQUUsbUJBQW1CO0tBQ2hDLENBQUM7R0FDVyx3QkFBd0IsQ0FzQnBDO1NBdEJZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcclxuICAgIHNlbGVjdG9yOiAnW2NvcHlUb0NsaXBib2FyZF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb3B5VG9DbGlwYm9hcmREaXJlY3RpdmUge1xyXG5cclxuICAgIEBJbnB1dCgnY29weVRvQ2xpcGJvYXJkJykgdmFsVG9Db3B5ID0gJyc7XHJcbiAgICBAT3V0cHV0KCkgY29waWVkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKHZhbDogYW55KSB7XHJcbiAgICAgICAgY29uc3Qgc2VsQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcclxuICAgICAgICBzZWxCb3guc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xyXG4gICAgICAgIHNlbEJveC5zdHlsZS56SW5kZXggPSAnLTEwMDAnO1xyXG4gICAgICAgIHNlbEJveC5zdHlsZS5sZWZ0ID0gJzAnO1xyXG4gICAgICAgIHNlbEJveC5zdHlsZS50b3AgPSAnMCc7XHJcbiAgICAgICAgc2VsQm94LnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgc2VsQm94LnZhbHVlID0gdGhpcy52YWxUb0NvcHk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxCb3gpO1xyXG4gICAgICAgIHNlbEJveC5mb2N1cygpO1xyXG4gICAgICAgIHNlbEJveC5zZWxlY3QoKTtcclxuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2VsQm94KTtcclxuXHJcbiAgICAgICAgdGhpcy5jb3BpZWQuZW1pdCh0aGlzLnZhbFRvQ29weSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==