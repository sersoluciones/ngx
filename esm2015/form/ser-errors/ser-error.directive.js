import { __decorate, __param } from "tslib";
import { Directive, Input, Inject, HostBinding, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';
import { SerErrorsDirective } from './ser-errors.directive';
import { toArray } from '../../utils/array';
let SerErrorDirective = class SerErrorDirective {
    constructor(_serErrors) {
        this._serErrors = _serErrors;
        this.hidden = true;
        this.rules = [];
        this.errorNames = [];
    }
    set serError(value) {
        this.errorNames = toArray(value);
    }
    set when(value) {
        this.rules = toArray(value);
    }
    ngOnInit() {
        this._states = new Subject();
        this.states = this._states.asObservable().distinctUntilChanged();
        const errors = this._serErrors.subject
            .filter(Boolean)
            // tslint:disable-next-line: no-bitwise
            .filter((obj) => !!~this.errorNames.indexOf(obj.errorName));
        const states = this.states
            // tslint:disable-next-line: no-bitwise
            .map(states => this.rules.every(rule => !!~states.indexOf(rule)));
        this.subscription = Observable.combineLatest([states, errors])
            .subscribe(([states, errors]) => {
            this.hidden = !(states && errors.control.hasError(errors.errorName));
        });
    }
    ngDoCheck() {
        this._states.next(this.rules.filter((rule) => this._serErrors.control[rule]));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
SerErrorDirective.ctorParameters = () => [
    { type: SerErrorsDirective, decorators: [{ type: Inject, args: [forwardRef(() => SerErrorsDirective),] }] }
];
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
    __param(0, Inject(forwardRef(() => SerErrorsDirective)))
], SerErrorDirective);
export { SerErrorDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLWVycm9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZXJzb2wvbmd4LyIsInNvdXJjZXMiOlsiZm9ybS9zZXItZXJyb3JzL3Nlci1lcnJvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE4QixNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyx3Q0FBd0MsQ0FBQztBQUNoRCxPQUFPLG1DQUFtQyxDQUFDO0FBRTNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU01QyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQW1CMUIsWUFDMEQsVUFBOEI7UUFBOUIsZUFBVSxHQUFWLFVBQVUsQ0FBb0I7UUFUeEYsV0FBTSxHQUFHLElBQUksQ0FBQztRQUVkLFVBQUssR0FBYSxFQUFFLENBQUM7UUFDckIsZUFBVSxHQUFhLEVBQUUsQ0FBQztJQU90QixDQUFDO0lBbkJJLElBQUksUUFBUSxDQUFDLEtBQW1CO1FBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFUSxJQUFJLElBQUksQ0FBQyxLQUFtQjtRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBZUQsUUFBUTtRQUVKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUVqRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU87YUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNoQix1Q0FBdUM7YUFDdEMsTUFBTSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUVyRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTtZQUN0Qix1Q0FBdUM7YUFDdEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDekQsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7SUFFWCxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUN0RSxDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Q0FFSixDQUFBOztZQWxDeUUsa0JBQWtCLHVCQUFuRixNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDOztBQWxCdkM7SUFBUixLQUFLLEVBQUU7aURBRVA7QUFFUTtJQUFSLEtBQUssRUFBRTs2Q0FFUDtBQUdEO0lBREMsV0FBVyxDQUFDLFFBQVEsQ0FBQztpREFDUjtBQVhMLGlCQUFpQjtJQUo3QixTQUFTLENBQUM7UUFDUCwrQ0FBK0M7UUFDL0MsUUFBUSxFQUFFLFlBQVk7S0FDekIsQ0FBQztJQXFCTyxXQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO0dBcEJ4QyxpQkFBaUIsQ0FzRDdCO1NBdERZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBEb0NoZWNrLCBJbmplY3QsIEhvc3RCaW5kaW5nLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2ZpbHRlcic7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kaXN0aW5jdFVudGlsQ2hhbmdlZCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0JztcclxuaW1wb3J0IHsgRXJyb3JPcHRpb25zIH0gZnJvbSAnLi9zZXItZXJyb3JzJztcclxuaW1wb3J0IHsgU2VyRXJyb3JzRGlyZWN0aXZlIH0gZnJvbSAnLi9zZXItZXJyb3JzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IHRvQXJyYXkgfSBmcm9tICcuLi8uLi91dGlscy9hcnJheSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXHJcbiAgICBzZWxlY3RvcjogJ1tzZXJFcnJvcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJFcnJvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBEb0NoZWNrIHtcclxuXHJcbiAgICBASW5wdXQoKSBzZXQgc2VyRXJyb3IodmFsdWU6IEVycm9yT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuZXJyb3JOYW1lcyA9IHRvQXJyYXkodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCB3aGVuKHZhbHVlOiBFcnJvck9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzID0gdG9BcnJheSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdoaWRkZW4nKVxyXG4gICAgaGlkZGVuID0gdHJ1ZTtcclxuXHJcbiAgICBydWxlczogc3RyaW5nW10gPSBbXTtcclxuICAgIGVycm9yTmFtZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIF9zdGF0ZXM6IFN1YmplY3Q8c3RyaW5nW10+O1xyXG4gICAgc3RhdGVzOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gU2VyRXJyb3JzRGlyZWN0aXZlKSkgcHJpdmF0ZSBfc2VyRXJyb3JzOiBTZXJFcnJvcnNEaXJlY3RpdmVcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTdWJqZWN0PHN0cmluZ1tdPigpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0gdGhpcy5fc3RhdGVzLmFzT2JzZXJ2YWJsZSgpLmRpc3RpbmN0VW50aWxDaGFuZ2VkKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMuX3NlckVycm9ycy5zdWJqZWN0XHJcbiAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1iaXR3aXNlXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKG9iajogYW55KSA9PiAhIX50aGlzLmVycm9yTmFtZXMuaW5kZXhPZihvYmouZXJyb3JOYW1lKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXRlcyA9IHRoaXMuc3RhdGVzXHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYml0d2lzZVxyXG4gICAgICAgICAgICAubWFwKHN0YXRlcyA9PiB0aGlzLnJ1bGVzLmV2ZXJ5KHJ1bGUgPT4gISF+c3RhdGVzLmluZGV4T2YocnVsZSkpKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLmNvbWJpbmVMYXRlc3QoW3N0YXRlcywgZXJyb3JzXSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW3N0YXRlcywgZXJyb3JzXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW4gPSAhKHN0YXRlcyAmJiBlcnJvcnMuY29udHJvbC5oYXNFcnJvcihlcnJvcnMuZXJyb3JOYW1lKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ0RvQ2hlY2soKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLm5leHQoXHJcbiAgICAgICAgICAgIHRoaXMucnVsZXMuZmlsdGVyKChydWxlKSA9PiAodGhpcy5fc2VyRXJyb3JzLmNvbnRyb2wgYXMgYW55KVtydWxlXSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==