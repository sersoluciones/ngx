import { __decorate, __param, __read } from "tslib";
import { Directive, Input, Inject, HostBinding, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';
import { SerErrorsDirective } from './ser-errors.directive';
import { toArray } from '../../utils/array';
var SerErrorDirective = /** @class */ (function () {
    function SerErrorDirective(_serErrors) {
        this._serErrors = _serErrors;
        this.hidden = true;
        this.rules = [];
        this.errorNames = [];
    }
    Object.defineProperty(SerErrorDirective.prototype, "serError", {
        set: function (value) {
            this.errorNames = toArray(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerErrorDirective.prototype, "when", {
        set: function (value) {
            this.rules = toArray(value);
        },
        enumerable: true,
        configurable: true
    });
    SerErrorDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._states = new Subject();
        this.states = this._states.asObservable().distinctUntilChanged();
        var errors = this._serErrors.subject
            .filter(Boolean)
            // tslint:disable-next-line: no-bitwise
            .filter(function (obj) { return !!~_this.errorNames.indexOf(obj.errorName); });
        var states = this.states
            // tslint:disable-next-line: no-bitwise
            .map(function (states) { return _this.rules.every(function (rule) { return !!~states.indexOf(rule); }); });
        this.subscription = Observable.combineLatest([states, errors])
            .subscribe(function (_a) {
            var _b = __read(_a, 2), states = _b[0], errors = _b[1];
            _this.hidden = !(states && errors.control.hasError(errors.errorName));
        });
    };
    SerErrorDirective.prototype.ngDoCheck = function () {
        var _this = this;
        this._states.next(this.rules.filter(function (rule) { return _this._serErrors.control[rule]; }));
    };
    SerErrorDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SerErrorDirective.ctorParameters = function () { return [
        { type: SerErrorsDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return SerErrorsDirective; }),] }] }
    ]; };
    __decorate([
        Input()
    ], SerErrorDirective.prototype, "serError", null);
    __decorate([
        Input()
    ], SerErrorDirective.prototype, "when", null);
    __decorate([
        HostBinding('hidden')
    ], SerErrorDirective.prototype, "hidden", void 0);
    SerErrorDirective = __decorate([
        Directive({
            // tslint:disable-next-line: directive-selector
            selector: '[serError]'
        }),
        __param(0, Inject(forwardRef(function () { return SerErrorsDirective; })))
    ], SerErrorDirective);
    return SerErrorDirective;
}());
export { SerErrorDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLWVycm9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZXJzb2wvbmd4LyIsInNvdXJjZXMiOlsiZm9ybS9zZXItZXJyb3JzL3Nlci1lcnJvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE4QixNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyx3Q0FBd0MsQ0FBQztBQUNoRCxPQUFPLG1DQUFtQyxDQUFDO0FBRTNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU01QztJQW1CSSwyQkFDMEQsVUFBOEI7UUFBOUIsZUFBVSxHQUFWLFVBQVUsQ0FBb0I7UUFUeEYsV0FBTSxHQUFHLElBQUksQ0FBQztRQUVkLFVBQUssR0FBYSxFQUFFLENBQUM7UUFDckIsZUFBVSxHQUFhLEVBQUUsQ0FBQztJQU90QixDQUFDO0lBbkJJLHNCQUFJLHVDQUFRO2FBQVosVUFBYSxLQUFtQjtZQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVRLHNCQUFJLG1DQUFJO2FBQVIsVUFBUyxLQUFtQjtZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQWVELG9DQUFRLEdBQVI7UUFBQSxpQkFtQkM7UUFqQkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBWSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRWpFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTzthQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2hCLHVDQUF1QzthQUN0QyxNQUFNLENBQUMsVUFBQyxHQUFRLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQXpDLENBQXlDLENBQUMsQ0FBQztRQUVyRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTtZQUN0Qix1Q0FBdUM7YUFDdEMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUF2QixDQUF1QixDQUFDLEVBQWpELENBQWlELENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDekQsU0FBUyxDQUFDLFVBQUMsRUFBZ0I7Z0JBQWhCLGtCQUFnQixFQUFmLGNBQU0sRUFBRSxjQUFNO1lBQ3ZCLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztJQUVYLENBQUM7SUFFRCxxQ0FBUyxHQUFUO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDYixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBZSxDQUFDLElBQUksQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQ3RFLENBQUM7SUFDTixDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Z0JBaENxRSxrQkFBa0IsdUJBQW5GLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOztJQWxCdkM7UUFBUixLQUFLLEVBQUU7cURBRVA7SUFFUTtRQUFSLEtBQUssRUFBRTtpREFFUDtJQUdEO1FBREMsV0FBVyxDQUFDLFFBQVEsQ0FBQztxREFDUjtJQVhMLGlCQUFpQjtRQUo3QixTQUFTLENBQUM7WUFDUCwrQ0FBK0M7WUFDL0MsUUFBUSxFQUFFLFlBQVk7U0FDekIsQ0FBQztRQXFCTyxXQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQTtPQXBCeEMsaUJBQWlCLENBc0Q3QjtJQUFELHdCQUFDO0NBQUEsQUF0REQsSUFzREM7U0F0RFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIERvQ2hlY2ssIEluamVjdCwgSG9zdEJpbmRpbmcsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2Rpc3RpbmN0VW50aWxDaGFuZ2VkJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3QnO1xyXG5pbXBvcnQgeyBFcnJvck9wdGlvbnMgfSBmcm9tICcuL3Nlci1lcnJvcnMnO1xyXG5pbXBvcnQgeyBTZXJFcnJvcnNEaXJlY3RpdmUgfSBmcm9tICcuL3Nlci1lcnJvcnMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgdG9BcnJheSB9IGZyb20gJy4uLy4uL3V0aWxzL2FycmF5JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcclxuICAgIHNlbGVjdG9yOiAnW3NlckVycm9yXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlckVycm9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIERvQ2hlY2sge1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCBzZXJFcnJvcih2YWx1ZTogRXJyb3JPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvck5hbWVzID0gdG9BcnJheSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IHdoZW4odmFsdWU6IEVycm9yT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMucnVsZXMgPSB0b0FycmF5KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2hpZGRlbicpXHJcbiAgICBoaWRkZW4gPSB0cnVlO1xyXG5cclxuICAgIHJ1bGVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgZXJyb3JOYW1lczogc3RyaW5nW10gPSBbXTtcclxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgX3N0YXRlczogU3ViamVjdDxzdHJpbmdbXT47XHJcbiAgICBzdGF0ZXM6IE9ic2VydmFibGU8c3RyaW5nW10+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBTZXJFcnJvcnNEaXJlY3RpdmUpKSBwcml2YXRlIF9zZXJFcnJvcnM6IFNlckVycm9yc0RpcmVjdGl2ZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gbmV3IFN1YmplY3Q8c3RyaW5nW10+KCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB0aGlzLl9zdGF0ZXMuYXNPYnNlcnZhYmxlKCkuZGlzdGluY3RVbnRpbENoYW5nZWQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5fc2VyRXJyb3JzLnN1YmplY3RcclxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWJpdHdpc2VcclxuICAgICAgICAgICAgLmZpbHRlcigob2JqOiBhbnkpID0+ICEhfnRoaXMuZXJyb3JOYW1lcy5pbmRleE9mKG9iai5lcnJvck5hbWUpKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdGVzID0gdGhpcy5zdGF0ZXNcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1iaXR3aXNlXHJcbiAgICAgICAgICAgIC5tYXAoc3RhdGVzID0+IHRoaXMucnVsZXMuZXZlcnkocnVsZSA9PiAhIX5zdGF0ZXMuaW5kZXhPZihydWxlKSkpO1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IE9ic2VydmFibGUuY29tYmluZUxhdGVzdChbc3RhdGVzLCBlcnJvcnNdKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbc3RhdGVzLCBlcnJvcnNdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbiA9ICEoc3RhdGVzICYmIGVycm9ycy5jb250cm9sLmhhc0Vycm9yKGVycm9ycy5lcnJvck5hbWUpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nRG9DaGVjaygpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMubmV4dChcclxuICAgICAgICAgICAgdGhpcy5ydWxlcy5maWx0ZXIoKHJ1bGUpID0+ICh0aGlzLl9zZXJFcnJvcnMuY29udHJvbCBhcyBhbnkpW3J1bGVdKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19