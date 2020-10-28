import { Pipe, PipeTransform } from '@angular/core';
import { hasValue } from '../../utils/check';


@Pipe({
    name: 'serFilterListFilter',
    pure: true
})
export class SerFilterListFilterPipe implements PipeTransform {

    transform(items: any[], filter: any, searchBy: any): any[] {
        if (!hasValue(items) || !hasValue(filter)) {
            return items;
        }

        const filteredList = items.filter((item: any) => this.applyFilter(item, filter, searchBy));

        if (hasValue(filteredList)) {
            return filteredList;
        } else {
            return [];
        }
    }

    applyFilter(item: any, filter: any, searchBy: any): boolean {
        let found = false;
        if (searchBy.length > 0) {
            if (item.grpTitle) {
                found = true;
            } else {
                for (let t = 0; t < searchBy.length; t++) {
                    if (filter && item[searchBy[t]] && item[searchBy[t]] !== '') {
                        if (item[searchBy[t]].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                            found = true;
                        }
                    }
                }
            }

        } else {
            if (item.grpTitle) {
                found = true;
            } else {
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
}
