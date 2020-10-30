import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
import { FormGroupDirective, AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { toArray } from '../../utils/array';
var SerErrorsDirective = /** @class */ (function () {
    function SerErrorsDirective(_form) {
        this._form = _form;
        this.subject = new BehaviorSubject(null);
        this.ready = false;
    }
    Object.defineProperty(SerErrorsDirective.prototype, "errors", {
        get: function () {
            if (!this.ready) {
                return;
            }
            return this.control.errors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerErrorsDirective.prototype, "hasErrors", {
        get: function () {
            return !!this.errors;
        },
        enumerable: true,
        configurable: true
    });
    SerErrorsDirective.prototype.hasError = function (name, conditions) {
        return this.checkPropState('invalid', name, conditions);
    };
    SerErrorsDirective.prototype.isValid = function (name, conditions) {
        return this.checkPropState('valid', name, conditions);
    };
    SerErrorsDirective.prototype.getError = function (name) {
        if (!this.ready) {
            return;
        }
        return this.control.getError(name);
    };
    SerErrorsDirective.prototype.checkPropState = function (prop, name, conditions) {
        var _this = this;
        if (!this.ready) {
            return;
        }
        var controlPropsState = (!conditions || toArray(conditions).every(function (condition) { return _this.control[condition]; }));
        if (name.charAt(0) === '*') {
            return this.control[prop] && controlPropsState;
        }
        return (prop === 'valid' ? !this.control.hasError(name) : this.control.hasError(name) && controlPropsState);
    };
    SerErrorsDirective.prototype.checkStatus = function () {
        var control = this.control;
        var errors = control.errors;
        this.ready = true;
        if (!errors) {
            return;
        }
        for (var errorName in errors) {
            if (this.errors.hasOwnProperty(errorName)) {
                this.subject.next({ control: control, errorName: errorName });
            }
        }
    };
    SerErrorsDirective.prototype.ngOnChanges = function () {
        this.control = this._form.control.get(this.controlName);
    };
    SerErrorsDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.checkStatus();
            _this.control.statusChanges.subscribe(_this.checkStatus.bind(_this));
        });
    };
    SerErrorsDirective.prototype.ngOnDestroy = function () {
        this.subject.unsubscribe();
    };
    SerErrorsDirective.ctorParameters = function () { return [
        { type: FormGroupDirective }
    ]; };
    __decorate([
        Input('serErrors')
    ], SerErrorsDirective.prototype, "controlName", void 0);
    SerErrorsDirective = __decorate([
        Directive({
            // tslint:disable-next-line: directive-selector
            selector: '[serErrors]',
            exportAs: 'serErrors'
        })
    ], SerErrorsDirective);
    return SerErrorsDirective;
}());
export { SerErrorsDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLWVycm9ycy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vc2VyLWVycm9ycy9zZXItZXJyb3JzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9ELE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTzVDO0lBVUksNEJBQW9CLEtBQXlCO1FBQXpCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBSjdDLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBZSxJQUFJLENBQUMsQ0FBQztRQUVsRCxVQUFLLEdBQUcsS0FBSyxDQUFDO0lBRW1DLENBQUM7SUFFbEQsc0JBQUksc0NBQU07YUFBVjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBRUQsc0JBQUkseUNBQVM7YUFBYjtZQUNJLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxxQ0FBUSxHQUFSLFVBQVMsSUFBWSxFQUFFLFVBQXdCO1FBQzNDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxvQ0FBTyxHQUFQLFVBQVEsSUFBWSxFQUFFLFVBQXdCO1FBQzFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxxQ0FBUSxHQUFSLFVBQVMsSUFBWTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUFFLE9BQU87U0FBRTtRQUM1QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTywyQ0FBYyxHQUF0QixVQUF1QixJQUFZLEVBQUUsSUFBWSxFQUFFLFVBQXdCO1FBQTNFLGlCQWNDO1FBWkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDNUIsSUFBTSxpQkFBaUIsR0FBRyxDQUN0QixDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsU0FBaUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FDM0YsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDO1NBQ2xEO1FBRUQsT0FBTyxDQUNILElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUNyRyxDQUFDO0lBQ04sQ0FBQztJQUVPLHdDQUFXLEdBQW5CO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPO1NBQ1Y7UUFFRCxLQUFLLElBQU0sU0FBUyxJQUFJLE1BQU0sRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sU0FBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUMsQ0FBQzthQUM3QztTQUNKO0lBQ0wsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELDRDQUFlLEdBQWY7UUFBQSxpQkFLQztRQUpHLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDOztnQkFyRTBCLGtCQUFrQjs7SUFON0M7UUFEQyxLQUFLLENBQUMsV0FBVyxDQUFDOzJEQUNDO0lBSlgsa0JBQWtCO1FBTDlCLFNBQVMsQ0FBQztZQUNQLCtDQUErQztZQUMvQyxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsV0FBVztTQUN4QixDQUFDO09BQ1csa0JBQWtCLENBaUY5QjtJQUFELHlCQUFDO0NBQUEsQUFqRkQsSUFpRkM7U0FqRlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cERpcmVjdGl2ZSwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcbmltcG9ydCB7IEVycm9yRGV0YWlscywgRXJyb3JPcHRpb25zIH0gZnJvbSAnLi9zZXItZXJyb3JzJztcclxuaW1wb3J0IHsgdG9BcnJheSB9IGZyb20gJy4uLy4uL3V0aWxzL2FycmF5JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcclxuICAgIHNlbGVjdG9yOiAnW3NlckVycm9yc10nLFxyXG4gICAgZXhwb3J0QXM6ICdzZXJFcnJvcnMnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJFcnJvcnNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcclxuICAgIEBJbnB1dCgnc2VyRXJyb3JzJylcclxuICAgIGNvbnRyb2xOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgc3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RXJyb3JEZXRhaWxzPihudWxsKTtcclxuICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcclxuICAgIHJlYWR5ID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZm9ybTogRm9ybUdyb3VwRGlyZWN0aXZlKSB7IH1cclxuXHJcbiAgICBnZXQgZXJyb3JzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5yZWFkeSkgeyByZXR1cm47IH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sLmVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGFzRXJyb3JzKCkge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc0Vycm9yKG5hbWU6IHN0cmluZywgY29uZGl0aW9uczogRXJyb3JPcHRpb25zKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tQcm9wU3RhdGUoJ2ludmFsaWQnLCBuYW1lLCBjb25kaXRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBpc1ZhbGlkKG5hbWU6IHN0cmluZywgY29uZGl0aW9uczogRXJyb3JPcHRpb25zKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tQcm9wU3RhdGUoJ3ZhbGlkJywgbmFtZSwgY29uZGl0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RXJyb3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlYWR5KSB7IHJldHVybjsgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2wuZ2V0RXJyb3IobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1Byb3BTdGF0ZShwcm9wOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY29uZGl0aW9uczogRXJyb3JPcHRpb25zKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5yZWFkeSkgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCBjb250cm9sUHJvcHNTdGF0ZSA9IChcclxuICAgICAgICAgICAgIWNvbmRpdGlvbnMgfHwgdG9BcnJheShjb25kaXRpb25zKS5ldmVyeSgoY29uZGl0aW9uOiBzdHJpbmcpID0+IHRoaXMuY29udHJvbFtjb25kaXRpb25dKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gJyonKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xbcHJvcF0gJiYgY29udHJvbFByb3BzU3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBwcm9wID09PSAndmFsaWQnID8gIXRoaXMuY29udHJvbC5oYXNFcnJvcihuYW1lKSA6IHRoaXMuY29udHJvbC5oYXNFcnJvcihuYW1lKSAmJiBjb250cm9sUHJvcHNTdGF0ZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1N0YXR1cygpIHtcclxuICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sO1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IGNvbnRyb2wuZXJyb3JzO1xyXG4gICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIWVycm9ycykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGVycm9yTmFtZSBpbiBlcnJvcnMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZXJyb3JzLmhhc093blByb3BlcnR5KGVycm9yTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KHsgY29udHJvbCwgZXJyb3JOYW1lIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMuX2Zvcm0uY29udHJvbC5nZXQodGhpcy5jb250cm9sTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrU3RhdHVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZSh0aGlzLmNoZWNrU3RhdHVzLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=