import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { hasValue } from '../../utils/check';
import { DataService } from './ser-select.service';
var SerSelectListFilterPipe = /** @class */ (function () {
    function SerSelectListFilterPipe(ds) {
        this.ds = ds;
    }
    SerSelectListFilterPipe.prototype.transform = function (items, filter, searchBy) {
        var _this = this;
        if (!hasValue(items) || !hasValue(filter)) {
            // this.ds.setData(items);
            return items;
        }
        var filteredList = items.filter(function (item) { return _this.applyFilter(item, filter, searchBy); });
        // this.ds.setData(filteredList);
        if (hasValue(filteredList)) {
            return filteredList;
        }
        else {
            return [];
        }
    };
    SerSelectListFilterPipe.prototype.applyFilter = function (item, filter, searchBy) {
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
    SerSelectListFilterPipe.ctorParameters = function () { return [
        { type: DataService }
    ]; };
    SerSelectListFilterPipe = __decorate([
        Pipe({
            name: 'serSelectListFilter',
            pure: true
        })
    ], SerSelectListFilterPipe);
    return SerSelectListFilterPipe;
}());
export { SerSelectListFilterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLXNlbGVjdC1saXN0LWZpbHRlci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJmb3JtL3NlbGVjdC9zZXItc2VsZWN0LWxpc3QtZmlsdGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFPbkQ7SUFFSSxpQ0FBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7SUFBSSxDQUFDO0lBRXhDLDJDQUFTLEdBQVQsVUFBVSxLQUFZLEVBQUUsTUFBVyxFQUFFLFFBQWE7UUFBbEQsaUJBY0M7UUFiRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZDLDBCQUEwQjtZQUMxQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFTLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQXhDLENBQXdDLENBQUMsQ0FBQztRQUMzRixpQ0FBaUM7UUFFakMsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDeEIsT0FBTyxZQUFZLENBQUM7U0FDdkI7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQsNkNBQVcsR0FBWCxVQUFZLElBQVMsRUFBRSxNQUFXLEVBQUUsUUFBYTtRQUM3QyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNoQjtpQkFBTTtnQkFDSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdEMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ3pELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQy9FLEtBQUssR0FBRyxJQUFJLENBQUM7eUJBQ2hCO3FCQUNKO2lCQUNKO2FBQ0o7U0FFSjthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0gsS0FBSyxJQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDeEUsS0FBSyxHQUFHLElBQUksQ0FBQzt5QkFDaEI7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Z0JBaER1QixXQUFXOztJQUYxQix1QkFBdUI7UUFKbkMsSUFBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7T0FDVyx1QkFBdUIsQ0FtRG5DO0lBQUQsOEJBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQW5EWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGhhc1ZhbHVlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY2hlY2snO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vc2VyLXNlbGVjdC5zZXJ2aWNlJztcclxuXHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnc2VyU2VsZWN0TGlzdEZpbHRlcicsXHJcbiAgICBwdXJlOiB0cnVlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJTZWxlY3RMaXN0RmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZHM6IERhdGFTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICB0cmFuc2Zvcm0oaXRlbXM6IGFueVtdLCBmaWx0ZXI6IGFueSwgc2VhcmNoQnk6IGFueSk6IGFueVtdIHtcclxuICAgICAgICBpZiAoIWhhc1ZhbHVlKGl0ZW1zKSB8fCAhaGFzVmFsdWUoZmlsdGVyKSkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmRzLnNldERhdGEoaXRlbXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmaWx0ZXJlZExpc3QgPSBpdGVtcy5maWx0ZXIoKGl0ZW06IGFueSkgPT4gdGhpcy5hcHBseUZpbHRlcihpdGVtLCBmaWx0ZXIsIHNlYXJjaEJ5KSk7XHJcbiAgICAgICAgLy8gdGhpcy5kcy5zZXREYXRhKGZpbHRlcmVkTGlzdCk7XHJcblxyXG4gICAgICAgIGlmIChoYXNWYWx1ZShmaWx0ZXJlZExpc3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZExpc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBseUZpbHRlcihpdGVtOiBhbnksIGZpbHRlcjogYW55LCBzZWFyY2hCeTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHNlYXJjaEJ5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uZ3JwVGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgc2VhcmNoQnkubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyICYmIGl0ZW1bc2VhcmNoQnlbdF1dICYmIGl0ZW1bc2VhcmNoQnlbdF1dICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVtzZWFyY2hCeVt0XV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyLnRvTG93ZXJDYXNlKCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5ncnBUaXRsZSkge1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyICYmIGl0ZW1bcHJvcF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1bcHJvcF0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyLnRvTG93ZXJDYXNlKCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==