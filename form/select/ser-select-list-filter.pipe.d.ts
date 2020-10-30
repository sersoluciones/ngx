import { PipeTransform } from '@angular/core';
import { DataService } from './ser-select.service';
export declare class SerSelectListFilterPipe implements PipeTransform {
    private ds;
    constructor(ds: DataService);
    transform(items: any[], filter: any, searchBy: any): any[];
    applyFilter(item: any, filter: any, searchBy: any): boolean;
}
