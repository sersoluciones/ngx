import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseView } from 'src/app/base/base-view';
import { DropdownSettings } from '../../../../../src/form/select/ser-select.interface';
import { hasValue } from '../../../../../src/utils/check';
import * as examples from './examples';

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
        remote: true,
        paginationState: {
            listPath: ['data', 'city_list'],
            rowCountPath: ['extensions', 'city_list', 'row_count'],
            hasNextPagePath: ['extensions', 'city_list', 'has_next_page'],
            getList: (settings: DropdownSettings) => this.getCityListData(settings)
        }
    };

    getCityListData(settings: DropdownSettings): Observable<any> {

        let all = '';

        if (hasValue(settings.paginationState.searchTerm)) {
            all = ', all: "' + settings.paginationState.searchTerm + '"';
        }

        return this._http.post('https://app.tiendana.com/api/graphql/v1/',
        {
            query: `{
                city_list(orderBy: "name",
                    first: ${settings.paginationState.pageSize},
                    page: ${settings.paginationState.currentPage}
                    ${all}
                ) {
                    id, name, code, state_name
                }
            }`
        });
    }

}
