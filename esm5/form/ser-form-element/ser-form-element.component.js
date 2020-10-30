import { __decorate } from "tslib";
import { Component, ContentChild, ViewEncapsulation, HostBinding } from '@angular/core';
import { SerControlDirective } from './ser-control.directive';
var SerFormElementComponent = /** @class */ (function () {
    function SerFormElementComponent() {
    }
    Object.defineProperty(SerFormElementComponent.prototype, "disabled", {
        get: function () {
            var _a;
            return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerFormElementComponent.prototype, "focus", {
        get: function () {
            var _a;
            return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.focus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerFormElementComponent.prototype, "active", {
        get: function () {
            var _a;
            return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.hasValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerFormElementComponent.prototype, "dirty", {
        get: function () {
            var _a;
            return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.dirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerFormElementComponent.prototype, "valid", {
        get: function () {
            var _a;
            return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerFormElementComponent.prototype, "invalid", {
        get: function () {
            var _a;
            return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.invalid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerFormElementComponent.prototype, "pending", {
        get: function () {
            var _a;
            return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.pending;
        },
        enumerable: true,
        configurable: true
    });
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
    return SerFormElementComponent;
}());
export { SerFormElementComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLWZvcm0tZWxlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vc2VyLWZvcm0tZWxlbWVudC9zZXItZm9ybS1lbGVtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTzlEO0lBQUE7SUF3Q0EsQ0FBQztJQWxDRyxzQkFBSSw2Q0FBUTthQUFaOztZQUNJLGFBQU8sSUFBSSxDQUFDLFdBQVcsMENBQUUsUUFBUSxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksMENBQUs7YUFBVDs7WUFDSSxhQUFPLElBQUksQ0FBQyxXQUFXLDBDQUFFLEtBQUssQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLDJDQUFNO2FBQVY7O1lBQ0ksYUFBTyxJQUFJLENBQUMsV0FBVywwQ0FBRSxRQUFRLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSwwQ0FBSzthQUFUOztZQUNJLGFBQU8sSUFBSSxDQUFDLFdBQVcsMENBQUUsS0FBSyxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksMENBQUs7YUFBVDs7WUFDSSxhQUFPLElBQUksQ0FBQyxXQUFXLDBDQUFFLEtBQUssQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLDRDQUFPO2FBQVg7O1lBQ0ksYUFBTyxJQUFJLENBQUMsV0FBVywwQ0FBRSxPQUFPLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSw0Q0FBTzthQUFYOztZQUNJLGFBQU8sSUFBSSxDQUFDLFdBQVcsMENBQUUsT0FBTyxDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBcENrQztRQUFsQyxZQUFZLENBQUMsbUJBQW1CLENBQUM7Z0VBQWtDO0lBSXBFO1FBREMsV0FBVyxDQUFDLGdCQUFnQixDQUFDOzJEQUc3QjtJQUdEO1FBREMsV0FBVyxDQUFDLGFBQWEsQ0FBQzt3REFHMUI7SUFHRDtRQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7eURBRzNCO0lBR0Q7UUFEQyxXQUFXLENBQUMsYUFBYSxDQUFDO3dEQUcxQjtJQUdEO1FBREMsV0FBVyxDQUFDLGFBQWEsQ0FBQzt3REFHMUI7SUFHRDtRQURDLFdBQVcsQ0FBQyxlQUFlLENBQUM7MERBRzVCO0lBR0Q7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDOzBEQUc1QjtJQXRDUSx1QkFBdUI7UUFMbkMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7T0FDVyx1QkFBdUIsQ0F3Q25DO0lBQUQsOEJBQUM7Q0FBQSxBQXhDRCxJQXdDQztTQXhDWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogY29tcG9uZW50LXNlbGVjdG9yXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24sIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlckNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL3Nlci1jb250cm9sLmRpcmVjdGl2ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc2VyLWZvcm0tZWxlbWVudCcsXHJcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VyRm9ybUVsZW1lbnRDb21wb25lbnQge1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoU2VyQ29udHJvbERpcmVjdGl2ZSkgZm9ybUVsZW1lbnQ6IFNlckNvbnRyb2xEaXJlY3RpdmU7XHJcbiAgICBvYnNlcnZlcjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxyXG4gICAgZ2V0IGRpc2FibGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1FbGVtZW50Py5kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZvY3VzJylcclxuICAgIGdldCBmb2N1cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtRWxlbWVudD8uZm9jdXM7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxyXG4gICAgZ2V0IGFjdGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtRWxlbWVudD8uaGFzVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXJ0eScpXHJcbiAgICBnZXQgZGlydHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUVsZW1lbnQ/LmRpcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MudmFsaWQnKVxyXG4gICAgZ2V0IHZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1FbGVtZW50Py52YWxpZDtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmludmFsaWQnKVxyXG4gICAgZ2V0IGludmFsaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUVsZW1lbnQ/LmludmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wZW5kaW5nJylcclxuICAgIGdldCBwZW5kaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1FbGVtZW50Py5wZW5kaW5nO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=