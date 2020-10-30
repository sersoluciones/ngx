import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { hasValue } from '../../utils/check';
var SerFilterListFilterPipe = /** @class */ (function () {
    function SerFilterListFilterPipe() {
    }
    SerFilterListFilterPipe.prototype.transform = function (items, filter, searchBy) {
        var _this = this;
        if (!hasValue(items) || !hasValue(filter)) {
            return items;
        }
        var filteredList = items.filter(function (item) { return _this.applyFilter(item, filter, searchBy); });
        if (hasValue(filteredList)) {
            return filteredList;
        }
        else {
            return [];
        }
    };
    SerFilterListFilterPipe.prototype.applyFilter = function (item, filter, searchBy) {
        var found = false;
        if (searchBy.length > 0) {
            if (item.grpTitle) {
                found = true;
            }
            else {
                for (var t = 0; t < searchBy.length; t++) {
                    if (filter && item[searchBy[t]] && item[searchBy[t]] !== '') {
                        if (item[searchBy[t]].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                            found = true;
                        }
                    }
                }
            }
        }
        else {
            if (item.grpTitle) {
                found = true;
            }
            else {
                for (var prop in item) {
                    if (filter && item[prop]) {
                        if (item[prop].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                            found = true;
                        }
                    }
                }
            }
        }
        return found;
    };
    SerFilterListFilterPipe = __decorate([
        Pipe({
            name: 'serFilterListFilter',
            pure: true
        })
    ], SerFilterListFilterPipe);
    return SerFilterListFilterPipe;
}());
export { SerFilterListFilterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLWZpbHRlci1saXN0LWZpbHRlci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJmb3JtL2ZpbHRlci9zZXItZmlsdGVyLWxpc3QtZmlsdGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU83QztJQUFBO0lBK0NBLENBQUM7SUE3Q0csMkNBQVMsR0FBVCxVQUFVLEtBQVksRUFBRSxNQUFXLEVBQUUsUUFBYTtRQUFsRCxpQkFZQztRQVhHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBUyxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLENBQUM7UUFFM0YsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDeEIsT0FBTyxZQUFZLENBQUM7U0FDdkI7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQsNkNBQVcsR0FBWCxVQUFZLElBQVMsRUFBRSxNQUFXLEVBQUUsUUFBYTtRQUM3QyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNoQjtpQkFBTTtnQkFDSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdEMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ3pELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQy9FLEtBQUssR0FBRyxJQUFJLENBQUM7eUJBQ2hCO3FCQUNKO2lCQUNKO2FBQ0o7U0FFSjthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0gsS0FBSyxJQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDeEUsS0FBSyxHQUFHLElBQUksQ0FBQzt5QkFDaEI7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQTlDUSx1QkFBdUI7UUFKbkMsSUFBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7T0FDVyx1QkFBdUIsQ0ErQ25DO0lBQUQsOEJBQUM7Q0FBQSxBQS9DRCxJQStDQztTQS9DWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGhhc1ZhbHVlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY2hlY2snO1xyXG5cclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdzZXJGaWx0ZXJMaXN0RmlsdGVyJyxcclxuICAgIHB1cmU6IHRydWVcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlckZpbHRlckxpc3RGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgdHJhbnNmb3JtKGl0ZW1zOiBhbnlbXSwgZmlsdGVyOiBhbnksIHNlYXJjaEJ5OiBhbnkpOiBhbnlbXSB7XHJcbiAgICAgICAgaWYgKCFoYXNWYWx1ZShpdGVtcykgfHwgIWhhc1ZhbHVlKGZpbHRlcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmlsdGVyZWRMaXN0ID0gaXRlbXMuZmlsdGVyKChpdGVtOiBhbnkpID0+IHRoaXMuYXBwbHlGaWx0ZXIoaXRlbSwgZmlsdGVyLCBzZWFyY2hCeSkpO1xyXG5cclxuICAgICAgICBpZiAoaGFzVmFsdWUoZmlsdGVyZWRMaXN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRMaXN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlGaWx0ZXIoaXRlbTogYW55LCBmaWx0ZXI6IGFueSwgc2VhcmNoQnk6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChzZWFyY2hCeS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmdycFRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IHNlYXJjaEJ5Lmxlbmd0aDsgdCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlciAmJiBpdGVtW3NlYXJjaEJ5W3RdXSAmJiBpdGVtW3NlYXJjaEJ5W3RdXSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1bc2VhcmNoQnlbdF1dLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlci50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uZ3JwVGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlciAmJiBpdGVtW3Byb3BdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtW3Byb3BdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlci50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxufVxyXG4iXX0=