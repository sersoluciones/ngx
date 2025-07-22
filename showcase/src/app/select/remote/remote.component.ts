import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseView } from 'src/app/base/base-view';
import { DropdownSettings } from '../../../../../src/form/select/ser-select.interface';
import { hasValueLegacy } from '../../../../../src/utils/check';
import * as examples from './examples';
import { take } from 'rxjs/operators';

@Component({
  selector: 'showcase-remote',
  templateUrl: './remote.component.html'
})
export class RemoteComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        selectRemote: []
    });

    settings: DropdownSettings = {
        badgeShowLimit: 3,
        remote: true,
        groupBy: 'state_name',
        paginationState: {
            listPath: ['results'],
            rowCountPath: ['row_count'],
            hasNextPagePath: ['has_next_page'],
            getList: (settings: DropdownSettings) => this.getCityListData(settings)
        }
    };

    getCityListData(settings: DropdownSettings): Observable<any> {

        let params: any = {
            take: settings.paginationState?.pageSize,
            page: settings.paginationState?.currentPage
        }

        if (hasValueLegacy(settings.paginationState?.searchTerm)) {
            params.searchTerm = settings.paginationState?.searchTerm;
        }

        return this._http.get<any[]>(`http://192.168.1.170:5000/admin/country/143/city`, {
            params
        }).pipe(take(1));
    }

}
