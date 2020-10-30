import { __decorate } from "tslib";
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
var CopyToClipboardDirective = /** @class */ (function () {
    function CopyToClipboardDirective() {
        this.valToCopy = '';
        this.copied = new EventEmitter();
    }
    CopyToClipboardDirective.prototype.onClick = function (val) {
        var selBox = document.createElement('textarea');
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
    return CopyToClipboardDirective;
}());
export { CopyToClipboardDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS10by1jbGlwYm9hcmQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJ1aS9jb3B5LXRvLWNsaXBib2FyZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTXJGO0lBQUE7UUFFOEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUMvQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQW1CbEQsQ0FBQztJQWpCc0MsMENBQU8sR0FBUCxVQUFRLEdBQVE7UUFDL0MsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQWxCeUI7UUFBekIsS0FBSyxDQUFDLGlCQUFpQixDQUFDOytEQUFnQjtJQUMvQjtRQUFULE1BQU0sRUFBRTs0REFBcUM7SUFFWDtRQUFsQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7MkRBZWpDO0lBcEJRLHdCQUF3QjtRQUpwQyxTQUFTLENBQUM7WUFDUCwrQ0FBK0M7WUFDL0MsUUFBUSxFQUFFLG1CQUFtQjtTQUNoQyxDQUFDO09BQ1csd0JBQXdCLENBc0JwQztJQUFELCtCQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0F0Qlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gICAgc2VsZWN0b3I6ICdbY29weVRvQ2xpcGJvYXJkXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvcHlUb0NsaXBib2FyZERpcmVjdGl2ZSB7XHJcblxyXG4gICAgQElucHV0KCdjb3B5VG9DbGlwYm9hcmQnKSB2YWxUb0NvcHkgPSAnJztcclxuICAgIEBPdXRwdXQoKSBjb3BpZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2sodmFsOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBzZWxCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgICAgIHNlbEJveC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcbiAgICAgICAgc2VsQm94LnN0eWxlLnpJbmRleCA9ICctMTAwMCc7XHJcbiAgICAgICAgc2VsQm94LnN0eWxlLmxlZnQgPSAnMCc7XHJcbiAgICAgICAgc2VsQm94LnN0eWxlLnRvcCA9ICcwJztcclxuICAgICAgICBzZWxCb3guc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICBzZWxCb3gudmFsdWUgPSB0aGlzLnZhbFRvQ29weTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlbEJveCk7XHJcbiAgICAgICAgc2VsQm94LmZvY3VzKCk7XHJcbiAgICAgICAgc2VsQm94LnNlbGVjdCgpO1xyXG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzZWxCb3gpO1xyXG5cclxuICAgICAgICB0aGlzLmNvcGllZC5lbWl0KHRoaXMudmFsVG9Db3B5KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19