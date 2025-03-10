// tslint:disable: no-use-before-declare
// tslint:disable: no-host-metadata-property
// tslint:disable: max-line-length
// tslint:disable: no-output-rename
// tslint:disable: no-output-on-prefix
// tslint:disable: prefer-const
// tslint:disable: no-conflicting-lifecycle
// tslint:disable: component-class-suffix
// tslint:disable: component-selector

import { Attribute, HostBinding, Optional, Renderer2 } from '@angular/core';
import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges, ViewEncapsulation, ContentChild, ViewChild, forwardRef, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, UntypedFormBuilder } from '@angular/forms';
import { DropdownSettings } from './ser-select.interface';
import { SDItemDirective, SDBadgeDirective, SDBadgeItemDirective } from './ser-select-menu-item.directive';
import { DataService } from './ser-select.service';
import { Subscription, fromEvent, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { hasValue } from '../../utils/check';
import { inArray } from '../../utils/array';
import { fromIntersectionObserver } from '../../utils/rx-utils';
import { getPath, mergeObjs } from '../../utils/object';

const noop = () => {
};

@Component({
    selector: 'ser-select',
    templateUrl: './ser-select.component.html',
    encapsulation: ViewEncapsulation.None,
    host: { '[class]': 'settings.classes', '[class.no-responsive]': '!settings.dropdownMobileFixed' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SerSelectComponent),
            multi: true
        }
    ]
})
export class SerSelectComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {

    //#region Properties

    @HostBinding('class.disabled') isDisabled = false;
    @HostBinding('class.active') isActive = false;
    @HostBinding('class.multiple') multipleClass = false;

    private _data = [];

    public get data() {
        return this._data;
    }

    @Input()
    public set data(value) {
        this._data = value;

        if (hasValue(this.value) && !this.settings.remote) {
            this.writeValue(this.value);
        }

        if (!this.settings?.remote) {
            this.filterList();
        }
    }

    @Input() settings: DropdownSettings;
    @Input() multiple: boolean | string;

    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDeSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output() onDeSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output() onOpen: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
    @Output() onScrollToEnd: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
    @Output() onAddFilterNewItem: EventEmitter<any> = new EventEmitter<any>();

    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();

    @ContentChild(SDItemDirective, { static: true }) itemTempl: SDItemDirective;
    @ContentChild(SDBadgeDirective, { static: true }) badgeTempl: SDBadgeDirective;
    @ContentChild(SDBadgeItemDirective, { static: true }) badgeItemTempl: SDBadgeItemDirective;

    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild('selectedList') selectedListElem: ElementRef;
    @ViewChild('dropdown') dropdownElem: ElementRef;
    @ViewChild('list') listElem: ElementRef;

    protected listDataSub: Subject<any> = new Subject();
    notifierDestroySubs: ReplaySubject<any> = new ReplaySubject();
    cancelGetList: ReplaySubject<any> = new ReplaySubject();

    value: any = null;
    selectedItems: any[] = [];
    isSelectAll = false;
    filter: any;
    item: any;

    public filteredList: any = [];
    search = this._fb.control('');

    private parents: HTMLElement[] = [];
    private dropdownSubs$: Subscription[] = [];
    private subscription: Subscription;
    defaultSettings: DropdownSettings = {
        singleSelection: true,
        enableCheckAll: true,
        selectAllText: 'Seleccionar todo',
        unSelectAllText: 'Deseleccionar todo',
        filterSelectAllText: 'Seleccionar todos los resultados filtrados',
        filterUnSelectAllText: 'Deseleccionar todos los resultados filtrados',
        enableSearchFilter: true,
        searchBy: ['name'],
        maxHeight: 300,
        badgeShowLimit: 999999999999,
        classes: '',
        searchPlaceholderText: 'Buscar',
        showCheckbox: true,
        noDataLabel: 'Sin datos disponibles',
        lazyLoading: false,
        labelKey: 'name',
        primaryKey: 'id',
        disabledKey: 'disabled',
        remote: false,
        paginationState:  {
            loading: false,
            pageSize: 30,
            currentPage: 0,
            rowCount: 0,
            hasNextPage: true
        },
        addNewButtonText: 'Agregar',
        escapeToClose: true,
        clearAll: true,
        scrollEndGap: 200,
        dropdownMobileFixed: true
    };
    //#endregion

    hasValue = hasValue;

    constructor(public _elementRef: ElementRef, private _fb: UntypedFormBuilder, private _ds: DataService, private _renderer: Renderer2, @Optional() @Attribute('multiple') multipleAttr: any,
                @Optional() @Attribute('simple') simple: any, @Optional() @Attribute('primaryKey') primaryKey: any, @Optional() @Attribute('labelKey') labelKey: any,
                @Optional() @Attribute('lazyLoading') lazyLoading: any, @Optional() @Attribute('noResponsive') noResponsive: any, @Optional() @Attribute('groupBy') groupBy: any) {

        this.multiple = multipleAttr !== null;

        if (this.multiple) {
            this.defaultSettings.singleSelection = false;
        }

        if (simple !== null) {
            this.defaultSettings.enableSearchFilter = false;
            this.defaultSettings.clearAll = false;
        }

        if (noResponsive !== null) {
            this.defaultSettings.dropdownMobileFixed = false;
        }

        if (primaryKey !== null) {
            this.defaultSettings.primaryKey = primaryKey;
        }

        if (labelKey !== null) {
            this.defaultSettings.labelKey = labelKey;
        }

        if (lazyLoading !== null) {
            this.defaultSettings.lazyLoading = true;
        }

        if (groupBy !== null) {
            this.defaultSettings.groupBy = groupBy;
        }
    }

    ngOnInit() {

        this.settings = {
            ...this.defaultSettings,
            ...this.settings
        };

        this.multipleClass = !this.settings.singleSelection;

        if (this.settings.remote) {
            this.settings.enableCheckAll = false;
            this._setlistDataSub();
        }

        this.search.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged((prev, curr) => {
                    return JSON.stringify(prev) === JSON.stringify(curr);
                }),
                takeUntil(this.notifierDestroySubs)
            )
            .subscribe((value: string) => {

                if (this.settings.remote) {

                    this.settings.paginationState.searchTerm = value;
                    this.reinitFetchData();
                    this.fetchData();

                } else {
                    this.filterList();
                }

                this.onSearch.emit();

            });

    }

    ngAfterViewInit() {

        let parent = this._elementRef.nativeElement.parentElement;

        while (hasValue(parent)) {

            if (inArray(getComputedStyle(parent).overflowY, ['auto', 'scroll', 'overlay']) || inArray(getComputedStyle(parent).overflowX, ['auto', 'scroll', 'overlay'])) {
                this.parents.push(parent);
            }

            parent = parent.parentElement;
        }

        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownElem.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.data && !changes.data.firstChange && !this.settings.remote) {
            this.filterList();
        }

        if (changes.settings && !changes.settings.firstChange) {
            this.settings = {
                ...this.defaultSettings,
                ...this.settings
            };
        }

    }

    reinitFetchData() {
        this.settings.paginationState.currentPage = 0;
        this.settings.paginationState.hasNextPage = true;
        this.settings.paginationState.loading = false;
        this.filteredList = [];

        this.cancelGetList.next();
        this.cancelGetList.complete();
        this.cancelGetList = new ReplaySubject();

        this.listDataSub = new Subject();
        this._setlistDataSub();

    }

    fetchData() {
        if (!this.settings.paginationState.loading && this.settings.paginationState.hasNextPage) {
            this.settings.paginationState.loading = true;
            this.settings.paginationState.currentPage++;
            this.listDataSub.next();
        }
    }

    protected _setlistDataSub() {

        this.listDataSub.pipe(
            switchMap(() => this.settings.paginationState.getList(this.settings, this.selectedItems).pipe(takeUntil(this.cancelGetList))
                .pipe(
                    catchError((e: any) => {
                        this.settings.paginationState.loading = false;
                        return e;
                    })
                )
            ),
            takeUntil(this.notifierDestroySubs)
        )
        .subscribe((response: any) => {
            this.filteredList = this.filteredList.concat(getPath(response, this.settings.paginationState.listPath));
            this.settings.paginationState.rowCount = getPath(response, this.settings.paginationState.rowCountPath);
            this.settings.paginationState.hasNextPage = getPath(response, this.settings.paginationState.hasNextPagePath);
            this.settings.paginationState.loading = false;

            if (this.settings.dropdownMobileFixed) {
                this.setPositionFixedDropdown();
            } else {
                this.setPositionAbsoluteDropdown();
            }

            if (this.isActive && this.settings.paginationState.hasNextPage) {
                setTimeout(() => {

                    if (this.listElem.nativeElement.offsetHeight === this.listElem.nativeElement.scrollHeight) {
                        this.fetchData();
                    }

                });
            }
        });

    }

    filterList() {
        this.filteredList =  this._ds.filterData(this.data, this.search.value, this.settings?.searchBy);
    }

    //#region ControlValueAccessor
    writeValue(value: any) {

        this.value = value;

        if (hasValue(value)) {

            if (!hasValue(this.data) && !this.settings.remote) {

                console.warn('ser-select: Data is empty at the write value');

            } else if (this.settings.singleSelection) {

                if (Array.isArray(value)) {
                    console.warn('ser-select: Array detected as input, please add "multiple" attribute in the select or set "singleSelection" setting in false');
                }

                const selectedObject = this.data?.find(item => {

                    if (typeof item === 'object') {
                        return item[this.settings.primaryKey] === value;
                    }

                    return item === value;

                });

                if (hasValue(selectedObject)) {

                    this.selectedItems = [selectedObject];

                } else if (this.settings.remote) {

                    this.selectedItems = [value];

                } else {
                    this.selectedItems = [];
                    console.warn('No value finded in data, please set "primaryKey" setting with the correct value or pass a existing value in data');
                }

            } else {

                if (!Array.isArray(value)) {
                    console.warn('Single value detected as input, please set "singleSelection" setting in true or remove "multiple" attribute in the select if you added');
                }

                const selectedObjects = this.data?.filter(item => {

                    if (typeof item === 'object') {
                        return inArray(item[this.settings.primaryKey], value);
                    }

                    return inArray(item, value);

                });

                if (hasValue(selectedObjects)) {
                    if (this.settings.limitSelection) {
                        this.selectedItems = selectedObjects.slice(0, this.settings.limitSelection);
                    } else {
                        this.selectedItems = selectedObjects;
                    }

                } else if (this.settings.remote) {

                    if (this.settings.limitSelection) {
                        this.selectedItems = value.slice(0, this.settings.limitSelection);
                    } else {
                        this.selectedItems = value;
                    }

                    const items = this.selectedItems.map(element => {

                        if (typeof element === 'object') {
                            return element[this.settings.primaryKey];
                        }

                        return element;
                    });

                    this.onChangeCallback(value[this.settings.primaryKey]);

                }  else {
                    this.selectedItems = [];
                    console.warn('No value finded in data, please set "primaryKey" setting with the correct value or pass a existing value in data');
                }

                if (this.selectedItems.length === this.data?.length && this.data?.length > 0) {
                    this.isSelectAll = true;
                }

            }

        } else {
            this.selectedItems = [];
        }

    }

    // tslint:disable-next-line: member-ordering
    private onChangeCallback: (_: any) => void = noop;
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }


    // tslint:disable-next-line: member-ordering
    private onTouchedCallback: (_: any) => void = noop;
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
    //#endregion

    getLabelText(item: any) {

        if (typeof item === 'object') {
            return item[this.settings.labelKey];
        }

        return item;
    }

    showGroupName(index: number) {

        if (!hasValue(this.settings.groupBy)) {
            return false;
        }

        if (index === 0) {
            return true;
        }

        return this.filteredList[index - 1]?.[this.settings.groupBy] !== this.filteredList[index]?.[this.settings.groupBy];
    }

    getGroupName(item: any, i: number) {

        if (typeof item === 'object') {
            return item[this.settings.groupBy];
        }

        return 'Item is not an object';
    }

    canItemSelect(item: any) {

        if (this.settings.canItemSelected !== undefined) {
            return this.settings.canItemSelected(this.settings, item);
        }

        return true;
    }

    onItemClick(item: any) {
        if (this.isDisabled || item[this.settings.disabledKey]) {
            return false;
        }

        if (!this.canItemSelect(item)) {
            return false;
        }

        let found = this.isSelected(item);
        let limit = this.selectedItems.length < this.settings.limitSelection ? true : false;

        if (!found) {
            if (this.settings.limitSelection) {
                if (limit) {
                    this.addSelected(item);
                    this.onSelect.emit(item);
                }
            } else {
                this.addSelected(item);
                this.onSelect.emit(item);
            }

        } else if (this.settings.clearAll) {
            this.removeSelected(item);
            this.onDeSelect.emit(item);
        }

        if (this.isSelectAll || this.data?.length > this.selectedItems.length) {
            this.isSelectAll = false;
        }

        if (this.data?.length === this.selectedItems.length) {
            this.isSelectAll = true;
        }

        if (this.settings.dropdownMobileFixed) {
            this.setPositionFixedDropdown();
        } else {
            this.setPositionAbsoluteDropdown();
        }
    }

    isSelected(item: any) {

        if (typeof item !== 'object') {
            return inArray(item, this.selectedItems);
        }

        if (item[this.settings.disabledKey]) {
            return false;
        }

        let found = false;

        if (hasValue(this.selectedItems)) {
            for (const selectdItem of this.selectedItems) {
                if (selectdItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                    found = true;
                    break;
                }
            }
        }

        return found;
    }

    addSelected(item: any) {

        if (this.settings.singleSelection) {

            this.selectedItems = [item];

            if (typeof item === 'object' && !this.settings.remote) {
                this.onChangeCallback(item[this.settings.primaryKey]);
                this.onTouchedCallback(item[this.settings.primaryKey]);
            } else {
                this.onChangeCallback(item);
                this.onTouchedCallback(item);
            }

            this.closeDropdown();

        } else {
            this.selectedItems.push(item);

            const items = this.selectedItems.map(element => {

                if (typeof item === 'object' && !this.settings.remote) {
                    return element[this.settings.primaryKey];
                }

                return element;
            });

            this.onChangeCallback(items);
            this.onTouchedCallback(items);
        }
    }

    removeSelected(clickedItem: any) {

        if (hasValue(this.selectedItems)) {
            this.selectedItems.forEach((item, index) => {

                if (typeof item === 'object') {
                    if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                        this.selectedItems.splice(index, 1);
                    }
                } else {
                    if (clickedItem === item) {
                        this.selectedItems.splice(index, 1);
                    }
                }

            });
        }

        if (this.settings.singleSelection) {
            this.onChangeCallback(null);
            this.onTouchedCallback(null);
        } else {

            const items = this.selectedItems.map(element => {

                if (typeof clickedItem === 'object' && !this.settings.remote) {
                    return element[this.settings.primaryKey];
                }

                return element;
            });

            this.onChangeCallback(items);
            this.onTouchedCallback(items);
        }
    }

    //#region dropdown status

    toggleDropdown(evt: any) {

        if (this.isDisabled) {
            return false;
        }

        this.isActive = !this.isActive;

        if (this.isActive) {
            this.openDropdown();
        } else {
            this.closeDropdown();
        }

        evt.preventDefault();
    }

    public openDropdown() {

        if (this.isDisabled) {
            return false;
        }

        this.isActive = true;
        this.focus.emit();

        if (this.settings.dropdownMobileFixed) {
            this.setPositionFixedDropdown();
        } else {
            this.setPositionAbsoluteDropdown();
        }

        const parents$: Observable<any>[] = [
            fromEvent(document, 'scroll'),
            fromEvent(window, 'resize').pipe(debounceTime(200))
        ];

        this.parents.forEach((parent) => {
            parents$.push(fromEvent(parent, 'scroll'));
        });

        this.dropdownSubs$.push(

            merge(
                fromEvent<MouseEvent>(window, 'click')
                    .pipe(filter(e => !this._elementRef.nativeElement.contains(e.target) )),

                fromEvent<KeyboardEvent>(window, 'keyup')
                    .pipe(filter(e => e.key.toLowerCase() === 'escape' && this.settings.escapeToClose )),

                fromIntersectionObserver(this.selectedListElem.nativeElement)
                    .pipe(filter(ev => !ev[0].isIntersecting && window.innerWidth > 600))
            )
            .subscribe(() => this.closeDropdown()),

            merge(...parents$).pipe(filter(() => this.settings.dropdownMobileFixed)).subscribe(() => this.setPositionFixedDropdown())
        );

        this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownElem.nativeElement);

        setTimeout(() => {

            if (this.settings.enableSearchFilter) {
                this.searchInput?.nativeElement.focus();
            }

            if (this.settings.remote) {
                this.fetchData();
            }

        });

        this.onOpen.emit(true);
    }

    public closeDropdown() {

        if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }

        this.clearSearch();

        if (this.settings.remote) {
            this.reinitFetchData();
        }

        this.isActive = false;
        this.blur.emit();

        this.dropdownSubs$.forEach(s => s.unsubscribe() );
        this.dropdownSubs$ = [];

        this.onClose.emit(false);
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownElem.nativeElement);
    }

    setPositionFixedDropdown() {

        setTimeout(() => {

            const dropdown = (this.dropdownElem.nativeElement as HTMLDivElement);
            const el = (this._elementRef.nativeElement as HTMLElement);

            this._renderer.setStyle(dropdown, 'width', (el.offsetWidth) + 'px');
            this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left) + 'px');

            const remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);

            if (remainingHeight > 0) {
                this._renderer.removeClass(el, 'ontop');
                this._renderer.removeClass(dropdown, 'ontop');
                this._renderer.removeStyle(dropdown, 'bottom');
                this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
            } else {
                this._renderer.addClass(el, 'ontop');
                this._renderer.addClass(dropdown, 'ontop');
                this._renderer.removeStyle(dropdown, 'top');
                this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
            }

        });
    }

    setPositionAbsoluteDropdown() {

        const dropdown = (this.dropdownElem.nativeElement as HTMLDivElement);
        const el = (this._elementRef.nativeElement as HTMLElement);

        this._renderer.setStyle(dropdown, 'width', (el.offsetWidth) + 'px');

        this._elementRef.nativeElement.scrollIntoView();

        setTimeout(() => {
            this.parents[0].scrollBy(0, -16);
        }, 100);
    }

    //#endregion

    trackByFn(item: any) {
        if (typeof item === 'object') {
            return item[this.settings.primaryKey];
        }

        return item;
    }

    toggleSelectAll() {
        if (!this.isSelectAll) {

            this.selectedItems = [];
            this.selectedItems = this.data.filter((individualData) => !individualData[this.settings.disabledKey]);
            const selectedItems = this.selectedItems.map(element => {
                if (typeof element === 'object') {
                    return element[this.settings.primaryKey];
                }

                return element;
            });

            this.isSelectAll = true;
            // this.onChangeCallback(selectedItems);
            this.onTouchedCallback(selectedItems);

            this.onSelectAll.emit(this.selectedItems);

        } else {

            this.selectedItems = [];
            this.isSelectAll = false;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);

            this.onDeSelectAll.emit(this.selectedItems);
        }

        this.closeDropdown();
    }

    clearSearch() {

        if (hasValue(this.search.value)) {
            this.search.setValue('');
        }

        if (this.settings.dropdownMobileFixed) {
            this.setPositionFixedDropdown();
        }

        setTimeout(() => {
            this.searchInput?.nativeElement.focus();
        }, 0);

    }

    onScrollEnd(e: any) {

        if (this.settings.remote) {
            this.fetchData();
        }

        this.onScrollToEnd.emit(e);
    }

    addFilterNewItem() {
        this.onAddFilterNewItem.emit(this.filter);
    }

    clearSelection(e: MouseEvent) {

        this.onClear.emit(this.selectedItems);

        this.clearSearch();
        this.selectedItems = [];
        this.isSelectAll = false;

        if (this.settings.singleSelection) {
            this.onChangeCallback(null);
            this.onTouchedCallback(null);
        } else {
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
        }

        e.stopPropagation();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.dropdownSubs$.forEach(s => {
            s.unsubscribe();
        });

        this.notifierDestroySubs.next();
        this.notifierDestroySubs.complete();

    }
}
