import { Observable } from 'rxjs';

export interface DropdownSettings {
    singleSelection?: boolean;
    enableCheckAll?: boolean;
    selectAllText?: string;
    unSelectAllText?: string;
    filterSelectAllText?: string;
    filterUnSelectAllText?: string;
    enableSearchFilter?: boolean;
    searchBy?: string[];
    maxHeight?: number;
    badgeShowLimit?: number;
    classes?: string;
    limitSelection?: number;
    searchPlaceholderText?: string;
    showCheckbox?: boolean;
    noDataLabel?: string;
    searchAutofocus?: boolean;
    lazyLoading?: boolean;
    labelKey?: string;
    primaryKey?: string;
    disabledKey?: string;
    remote?: boolean;
    paginationState?: DropdownPaginationState;
    groupBy?: string;
    addNewButtonText?: string;
    escapeToClose?: boolean;
    clearAll?: boolean;
    scrollEndGap?: number;
    dropdownMobileFixed?: boolean;
    canItemSelected?: (settings: DropdownSettings, selectedItem?: any, additionalData?: any) => boolean;
    // canItemSelected?: (settings: DropdownSettings, selectedItem?: any) => (settings: DropdownSettings, selectedItem?: any)
}

export interface DropdownPaginationState {
    loading?: boolean;
    searchTerm?: string;
    pageSize?: number;
    currentPage?: number;
    rowCount?: number;
    rowCountPath?: string[];
    hasNextPage?: boolean;
    hasNextPagePath?: string[];
    listPath?: string[];
    getList?: (settings: DropdownSettings, selectedItems?: any[]) => Observable<any>;
}
