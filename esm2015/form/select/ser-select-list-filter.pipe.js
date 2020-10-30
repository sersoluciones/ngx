import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { hasValue } from '../../utils/check';
import { DataService } from './ser-select.service';
let SerSelectListFilterPipe = class SerSelectListFilterPipe {
    constructor(ds) {
        this.ds = ds;
    }
    transform(items, filter, searchBy) {
        if (!hasValue(items) || !hasValue(filter)) {
            // this.ds.setData(items);
            return items;
        }
        const filteredList = items.filter((item) => this.applyFilter(item, filter, searchBy));
        // this.ds.setData(filteredList);
        if (hasValue(filteredList)) {
            return filteredList;
        }
        else {
            return [];
        }
    }
    applyFilter(item, filter, searchBy) {
        let found = false;
        if (searchBy.length > 0) {
            if (item.grpTitle) {
                found = true;
            }
            else {
                for (let t = 0; t < searchBy.length; t++) {
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
                for (const prop in item) {
                    if (filter && item[prop]) {
                        if (item[prop].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                            found = true;
                        }
                    }
                }
            }
        }
        return found;
    }
};
SerSelectListFilterPipe.ctorParameters = () => [
    { type: DataService }
];
SerSelectListFilterPipe = __decorate([
    Pipe({
        name: 'serSelectListFilter',
        pure: true
    })
], SerSelectListFilterPipe);
export { SerSelectListFilterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLXNlbGVjdC1saXN0LWZpbHRlci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJmb3JtL3NlbGVjdC9zZXItc2VsZWN0LWxpc3QtZmlsdGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFPbkQsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFFaEMsWUFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7SUFBSSxDQUFDO0lBRXhDLFNBQVMsQ0FBQyxLQUFZLEVBQUUsTUFBVyxFQUFFLFFBQWE7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2QywwQkFBMEI7WUFDMUIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMzRixpQ0FBaUM7UUFFakMsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDeEIsT0FBTyxZQUFZLENBQUM7U0FDdkI7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQVMsRUFBRSxNQUFXLEVBQUUsUUFBYTtRQUM3QyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNoQjtpQkFBTTtnQkFDSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdEMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ3pELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQy9FLEtBQUssR0FBRyxJQUFJLENBQUM7eUJBQ2hCO3FCQUNKO2lCQUNKO2FBQ0o7U0FFSjthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0gsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDeEUsS0FBSyxHQUFHLElBQUksQ0FBQzt5QkFDaEI7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKLENBQUE7O1lBakQyQixXQUFXOztBQUYxQix1QkFBdUI7SUFKbkMsSUFBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixJQUFJLEVBQUUsSUFBSTtLQUNiLENBQUM7R0FDVyx1QkFBdUIsQ0FtRG5DO1NBbkRZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tICcuLi8uLi91dGlscy9jaGVjayc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9zZXItc2VsZWN0LnNlcnZpY2UnO1xyXG5cclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdzZXJTZWxlY3RMaXN0RmlsdGVyJyxcclxuICAgIHB1cmU6IHRydWVcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlclNlbGVjdExpc3RGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkczogRGF0YVNlcnZpY2UpIHsgfVxyXG5cclxuICAgIHRyYW5zZm9ybShpdGVtczogYW55W10sIGZpbHRlcjogYW55LCBzZWFyY2hCeTogYW55KTogYW55W10ge1xyXG4gICAgICAgIGlmICghaGFzVmFsdWUoaXRlbXMpIHx8ICFoYXNWYWx1ZShmaWx0ZXIpKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuZHMuc2V0RGF0YShpdGVtcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkTGlzdCA9IGl0ZW1zLmZpbHRlcigoaXRlbTogYW55KSA9PiB0aGlzLmFwcGx5RmlsdGVyKGl0ZW0sIGZpbHRlciwgc2VhcmNoQnkpKTtcclxuICAgICAgICAvLyB0aGlzLmRzLnNldERhdGEoZmlsdGVyZWRMaXN0KTtcclxuXHJcbiAgICAgICAgaWYgKGhhc1ZhbHVlKGZpbHRlcmVkTGlzdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkTGlzdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5RmlsdGVyKGl0ZW06IGFueSwgZmlsdGVyOiBhbnksIHNlYXJjaEJ5OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoc2VhcmNoQnkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5ncnBUaXRsZSkge1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBzZWFyY2hCeS5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIgJiYgaXRlbVtzZWFyY2hCeVt0XV0gJiYgaXRlbVtzZWFyY2hCeVt0XV0gIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtW3NlYXJjaEJ5W3RdXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudG9Mb3dlckNhc2UoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmdycFRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIgJiYgaXRlbVtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVtwcm9wXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudG9Mb3dlckNhc2UoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbn1cclxuIl19