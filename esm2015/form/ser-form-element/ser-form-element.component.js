import { __decorate } from "tslib";
import { Component, ContentChild, ViewEncapsulation, HostBinding } from '@angular/core';
import { SerControlDirective } from './ser-control.directive';
let SerFormElementComponent = class SerFormElementComponent {
    get disabled() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.disabled;
    }
    get focus() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.focus;
    }
    get active() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.hasValue;
    }
    get dirty() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.dirty;
    }
    get valid() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.valid;
    }
    get invalid() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.invalid;
    }
    get pending() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.pending;
    }
};
__decorate([
    ContentChild(SerControlDirective)
], SerFormElementComponent.prototype, "formElement", void 0);
__decorate([
    HostBinding('class.disabled')
], SerFormElementComponent.prototype, "disabled", null);
__decorate([
    HostBinding('class.focus')
], SerFormElementComponent.prototype, "focus", null);
__decorate([
    HostBinding('class.active')
], SerFormElementComponent.prototype, "active", null);
__decorate([
    HostBinding('class.dirty')
], SerFormElementComponent.prototype, "dirty", null);
__decorate([
    HostBinding('class.valid')
], SerFormElementComponent.prototype, "valid", null);
__decorate([
    HostBinding('class.invalid')
], SerFormElementComponent.prototype, "invalid", null);
__decorate([
    HostBinding('class.pending')
], SerFormElementComponent.prototype, "pending", null);
SerFormElementComponent = __decorate([
    Component({
        selector: 'ser-form-element',
        template: '<ng-content></ng-content>',
        encapsulation: ViewEncapsulation.None
    })
], SerFormElementComponent);
export { SerFormElementComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLWZvcm0tZWxlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vc2VyLWZvcm0tZWxlbWVudC9zZXItZm9ybS1lbGVtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTzlELElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBTWhDLElBQUksUUFBUTs7UUFDUixhQUFPLElBQUksQ0FBQyxXQUFXLDBDQUFFLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBR0QsSUFBSSxLQUFLOztRQUNMLGFBQU8sSUFBSSxDQUFDLFdBQVcsMENBQUUsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFHRCxJQUFJLE1BQU07O1FBQ04sYUFBTyxJQUFJLENBQUMsV0FBVywwQ0FBRSxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUdELElBQUksS0FBSzs7UUFDTCxhQUFPLElBQUksQ0FBQyxXQUFXLDBDQUFFLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBR0QsSUFBSSxLQUFLOztRQUNMLGFBQU8sSUFBSSxDQUFDLFdBQVcsMENBQUUsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFHRCxJQUFJLE9BQU87O1FBQ1AsYUFBTyxJQUFJLENBQUMsV0FBVywwQ0FBRSxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUdELElBQUksT0FBTzs7UUFDUCxhQUFPLElBQUksQ0FBQyxXQUFXLDBDQUFFLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0NBRUosQ0FBQTtBQXRDc0M7SUFBbEMsWUFBWSxDQUFDLG1CQUFtQixDQUFDOzREQUFrQztBQUlwRTtJQURDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzt1REFHN0I7QUFHRDtJQURDLFdBQVcsQ0FBQyxhQUFhLENBQUM7b0RBRzFCO0FBR0Q7SUFEQyxXQUFXLENBQUMsY0FBYyxDQUFDO3FEQUczQjtBQUdEO0lBREMsV0FBVyxDQUFDLGFBQWEsQ0FBQztvREFHMUI7QUFHRDtJQURDLFdBQVcsQ0FBQyxhQUFhLENBQUM7b0RBRzFCO0FBR0Q7SUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDO3NEQUc1QjtBQUdEO0lBREMsV0FBVyxDQUFDLGVBQWUsQ0FBQztzREFHNUI7QUF0Q1EsdUJBQXVCO0lBTG5DLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtLQUN4QyxDQUFDO0dBQ1csdUJBQXVCLENBd0NuQztTQXhDWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogY29tcG9uZW50LXNlbGVjdG9yXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24sIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlckNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL3Nlci1jb250cm9sLmRpcmVjdGl2ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc2VyLWZvcm0tZWxlbWVudCcsXHJcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VyRm9ybUVsZW1lbnRDb21wb25lbnQge1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoU2VyQ29udHJvbERpcmVjdGl2ZSkgZm9ybUVsZW1lbnQ6IFNlckNvbnRyb2xEaXJlY3RpdmU7XHJcbiAgICBvYnNlcnZlcjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxyXG4gICAgZ2V0IGRpc2FibGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1FbGVtZW50Py5kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZvY3VzJylcclxuICAgIGdldCBmb2N1cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtRWxlbWVudD8uZm9jdXM7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxyXG4gICAgZ2V0IGFjdGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtRWxlbWVudD8uaGFzVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXJ0eScpXHJcbiAgICBnZXQgZGlydHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUVsZW1lbnQ/LmRpcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MudmFsaWQnKVxyXG4gICAgZ2V0IHZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1FbGVtZW50Py52YWxpZDtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmludmFsaWQnKVxyXG4gICAgZ2V0IGludmFsaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUVsZW1lbnQ/LmludmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wZW5kaW5nJylcclxuICAgIGdldCBwZW5kaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1FbGVtZW50Py5wZW5kaW5nO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=