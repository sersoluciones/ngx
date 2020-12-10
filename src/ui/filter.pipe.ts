import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterList',
    pure: false
})
export class FilterList implements PipeTransform {

    transform(items: any[], filter: string, key: string): any {

        if (!items || !filter) {
            return items;
        }

        return items.filter(item => item[key].toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }

}
