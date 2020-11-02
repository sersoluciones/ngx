import { Observable } from 'rxjs';
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
import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges, ChangeDetectorRef, ViewEncapsulation, ContentChild, ViewChild, forwardRef, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { DropdownSettings } from './ser-select.interface';
import { SerSelectListFilterPipe } from './ser-select-list-filter.pipe';
import { SDItemDirective, SDBadgeDirective, SDSearchDirective } from './ser-select-menu-item.directive';
import { DataService } from './ser-select.service';
import { Subscription, Subject, fromEvent, interval, forkJoin, merge } from 'rxjs';
import { VirtualScrollerComponent } from './virtual-scroll/virtual-scroll';
import { debounceTime, distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { hasValue } from '../../utils/check';
import { inArray } from '../../utils/array';
import { fromIntersectionObserver } from '../../utils/rx-utils';

const noop = () => {
};

@Component({
    selector: 'ser-select',
    templateUrl: './ser-select.component.html',
    host: { '[class]': 'defaultSettings.classes' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SerSelectComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => SerSelectComponent),
            multi: true,
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class SerSelectComponent implements OnInit, ControlValueAccessor, OnChanges, Validator, AfterViewInit, OnDestroy {

    //#region Properties
    @Input() data = [];

    @Input() settings: DropdownSettings;

    @Input() loading: boolean;

    @Input() multiple: boolean | string;

    @Output('onSelect')
    onSelect: EventEmitter<any> = new EventEmitter<any>();

    @Output('onDeSelect')
    onDeSelect: EventEmitter<any> = new EventEmitter<any>();

    @Output('onSelectAll')
    onSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

    @Output('onDeSelectAll')
    onDeSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

    @Output('onOpen')
    onOpen: EventEmitter<any> = new EventEmitter<any>();

    @Output('onClose')
    onClose: EventEmitter<any> = new EventEmitter<any>();

    @Output('onScrollToEnd')
    onScrollToEnd: EventEmitter<any> = new EventEmitter<any>();

    @Output('onFilterSelectAll')
    onFilterSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

    @Output('onFilterDeSelectAll')
    onFilterDeSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

    @Output('onAddFilterNewItem')
    onAddFilterNewItem: EventEmitter<any> = new EventEmitter<any>();

    @Output('onGroupSelect')
    onGroupSelect: EventEmitter<any> = new EventEmitter<any>();

    @Output('onGroupDeSelect')
    onGroupDeSelect: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(SDItemDirective, { static: true }) itemTempl: SDItemDirective;
    @ContentChild(SDBadgeDirective, { static: true }) badgeTempl: SDBadgeDirective;
    @ContentChild(SDSearchDirective, { static: true }) searchTempl: SDSearchDirective;


    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild('selectedList') selectedListElem: ElementRef;
    @ViewChild('dropdownList') dropdownListElem: ElementRef;

    @HostBinding('class.disabled') isDisabled = false;
    @HostBinding('class.active') isActive = false;
    @HostBinding('class.multiple') multipleClass = false;

    virtualdata: any = [];
    searchTerm$ = new Subject<string>();

    filterPipe: SerSelectListFilterPipe;
    selectedItems: any[] = [];
    isSelectAll = false;
    isFilterSelectAll = false;
    isInfiniteFilterSelectAll = false;
    groupedData: any[];
    filter: any;
    chunkArray: any[];
    scrollTop: any;
    chunkIndex: any[] = [];
    cachedItems: any[] = [];
    groupCachedItems: any[] = [];
    totalRows: any;
    itemHeight: any = 41.6;
    screenItemsLen: any;
    cachedItemsLen: any;
    totalHeight: any;
    scroller: any;
    maxBuffer: any;
    lastScrolled: any;
    lastRepaintY: any;
    selectedListHeight: any;
    filterLength: any = 0;
    infiniteFilterLength: any = 0;
    viewPortItems: any;
    item: any;

    private parents: Element[] = [];
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
        enableFilterSelectAll: true,
        selectGroup: false,
        addNewItemOnFilter: false,
        addNewButtonText: 'Agregar',
        escapeToClose: true,
        clearAll: true
    };

    randomSize = true;
    public parseError: boolean;
    public filteredList: any = [];
    virtualScroollInit = false;
    @ViewChild(VirtualScrollerComponent, { static: false })
    private virtualScroller: VirtualScrollerComponent;
    public isDisabledItemPresent = false;
    //#endregion

    hasValue = hasValue;

    constructor(public _elementRef: ElementRef, private cdr: ChangeDetectorRef, private ds: DataService, private _renderer: Renderer2, @Optional() @Attribute('multiple') multipleAttr: any,
                @Optional() @Attribute('simple') simple: any, @Optional() @Attribute('primaryKey') primaryKey: any, @Optional() @Attribute('labelKey') labelKey: any) {

        this.multiple = multipleAttr !== null;

        if (this.multiple) {
            this.defaultSettings.singleSelection = false;
        }

        if (simple !== null) {
            this.defaultSettings.enableSearchFilter = false;
            this.defaultSettings.clearAll = false;
        }

        if (primaryKey !== null) {
            this.defaultSettings.primaryKey = primaryKey;
        }

        if (labelKey !== null) {
            this.defaultSettings.labelKey = labelKey;
        }

        this.searchTerm$.asObservable().pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            tap(term => term)
        ).subscribe(val => {
            this.filterInfiniteList(val);
        });
    }

    ngOnInit() {

        this.settings = Object.assign(this.defaultSettings, this.settings);

        this.multipleClass = !this.settings.singleSelection;

        this.cachedItems = this.cloneArray(this.data);

        this.subscription = this.ds.getData().subscribe(data => {
            if (data) {
                let len = 0;
                data.forEach((obj: any) => {
                    if (obj[this.settings.disabledKey]) {
                        this.isDisabledItemPresent = true;
                    }
                    if (!obj.hasOwnProperty('grpTitle')) {
                        len++;
                    }
                });
                this.filterLength = len;
                this.onFilterChange(data);
            }

        });

        this.virtualScroollInit = false;
    }

    ngAfterViewInit() {

        let parent = this._elementRef.nativeElement.parentElement;

        while (hasValue(parent)) {

            if (inArray(getComputedStyle(parent).overflowY, ['auto', 'scroll', 'overlay']) || inArray(getComputedStyle(parent).overflowX, ['auto', 'scroll', 'overlay'])) {
                this.parents.push(parent);
            }

            parent = parent.parentElement;
        }

        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.data && !changes.data.firstChange) {

            if (this.settings.groupBy) {
                this.groupedData = this.transformData(this.data, this.settings.groupBy);

                if (this.data.length === 0) {
                    this.selectedItems = [];
                }

                this.groupCachedItems = this.cloneArray(this.groupedData);
            }

            this.cachedItems = this.cloneArray(this.data);
        }

        if (changes.settings && !changes.settings.firstChange) {
            this.settings = Object.assign(this.defaultSettings, this.settings);
        }

        if (changes.loading) {
        }

        if (this.settings?.lazyLoading && this.virtualScroollInit && changes.data) {
            this.virtualdata = changes.data.currentValue;
        }

    }

    onItemClick(item: any, k: number, e: any) {

        if (this.isDisabled || item[this.settings.disabledKey]) {
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

        } else {
            this.removeSelected(item);
            this.onDeSelect.emit(item);
        }
        if (this.isSelectAll || this.data.length > this.selectedItems.length) {
            this.isSelectAll = false;
        }

        if (this.data.length === this.selectedItems.length) {
            this.isSelectAll = true;
        }
        if (this.settings.groupBy) {
            this.updateGroupInfo(item);
        }
    }

    public validate(c: FormControl): any {
        return null;
    }

    //#region ControlValueAccessor
    writeValue(value: any) {

        if (hasValue(value)) {
            if (this.settings.singleSelection) {

                if (Array.isArray(value)) {
                    throw Error('Array detected as input, please add "multiple" attribute in the select or set "singleSelection" setting in false');
                }

                const selectedObject = this.data?.find(item => {
                    return item[this.settings.primaryKey] === value;
                });

                if (hasValue(selectedObject)) {
                    this.selectedItems = [selectedObject];
                } else {
                    this.selectedItems = [];
                    throw Error('No primaryKey finded in options, please set "primaryKey" setting with the correct value');
                }

                if (this.settings.groupBy) {
                    this.groupedData = this.transformData(this.data, this.settings.groupBy);
                    this.groupCachedItems = this.cloneArray(this.groupedData);
                }

            } else {

                if (!Array.isArray(value)) {
                    throw Error('Single value detected as input, please set "singleSelection" setting in true or remove "multiple" attribute in the select if you added');
                }

                const selectedObjects = this.data?.filter(item => {
                    return inArray(item[this.settings.primaryKey], value);
                });

                if (hasValue(selectedObjects)) {
                    if (this.settings.limitSelection) {
                        this.selectedItems = selectedObjects.slice(0, this.settings.limitSelection);
                    } else {
                        this.selectedItems = selectedObjects;
                    }
                } else {
                    this.selectedItems = [];
                    throw Error('No primaryKey finded in options, please set "primaryKey" setting with the correct value');
                }

                if (this.selectedItems.length === this.data.length && this.data.length > 0) {
                    this.isSelectAll = true;
                }

                if (this.settings.groupBy) {
                    this.groupedData = this.transformData(this.data, this.settings.groupBy);
                    this.groupCachedItems = this.cloneArray(this.groupedData);
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

    trackByFn(item: any) {
        return item[this.settings.primaryKey];
    }

    isSelected(clickedItem: any) {

        if (clickedItem[this.settings.disabledKey]) {
            return false;
        }

        let found = false;

        if (hasValue(this.selectedItems)) {
            for (const item of this.selectedItems) {
                if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
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
            this.onChangeCallback(item[this.settings.primaryKey]);
            this.onTouchedCallback(item[this.settings.primaryKey]);
            this.closeDropdown();
        } else {
            this.selectedItems.push(item);
            const items = this.selectedItems.map(element => element[this.settings.primaryKey]);
            this.onChangeCallback(items);
            this.onTouchedCallback(items);
        }
    }

    removeSelected(clickedItem: any) {

        if (hasValue(this.selectedItems)) {
            this.selectedItems.forEach((item, index) => {
                if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                    this.selectedItems.splice(index, 1);
                }
            });
        }

        if (this.settings.singleSelection) {
            this.onChangeCallback(null);
            this.onTouchedCallback(null);
        } else {
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
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

        if (this.settings.lazyLoading) {
            this.virtualdata = this.data;
            this.virtualScroollInit = true;
        }

        evt.preventDefault();
    }

    public openDropdown() {

        if (this.isDisabled) {
            return false;
        }

        this.isActive = true;

        this.setPositionDropdown();

        const parents$: Observable<any>[] = [
            fromEvent(document, 'scroll'),
            fromEvent(document, 'resize')
        ];

        this.parents.forEach((parent) => {
            parents$.push(fromEvent(parent, 'scroll'));
        });

        this.dropdownSubs$.push(

            merge(
                fromEvent(window, 'click')
                    .pipe(filter((e: MouseEvent) => !this._elementRef.nativeElement.contains(e.target) )),

                fromEvent(window, 'keyup')
                    .pipe(filter((e: KeyboardEvent) => e.key.toLowerCase() === 'escape' && this.settings.escapeToClose )),

                fromIntersectionObserver(this.selectedListElem.nativeElement)
                    .pipe(filter((ev) => !ev[0].isIntersecting))
            )
            .subscribe(() => this.closeDropdown()),

            merge(...parents$).subscribe(() => this.setPositionDropdown())
        );

        this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);

        if (this.settings.enableSearchFilter && !this.searchTempl) {
            setTimeout(() => {
                this.searchInput?.nativeElement.focus();
            }, 0);
        }

        this.onOpen.emit(true);
    }

    public closeDropdown() {

        if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }

        this.clearSearch();
        this.isActive = false;

        this.dropdownSubs$.forEach(s => s.unsubscribe() );
        this.dropdownSubs$ = [];

        this.onClose.emit(false);
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    }

    setPositionDropdown() {

        setTimeout(() => {

            const dropdown = (this.dropdownListElem.nativeElement as HTMLDivElement);
            const el = (this._elementRef.nativeElement as HTMLElement);
            const remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);

            this._renderer.setStyle(dropdown, 'width', (el.offsetWidth) + 'px');
            this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left) + 'px');

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

    //#endregion

    toggleSelectAll() {
        if (!this.isSelectAll) {

            this.selectedItems = [];
            this.selectedItems = this.data.filter((individualData) => !individualData[this.settings.disabledKey]);
            const selectedItems = this.selectedItems.map(element => element[this.settings.primaryKey]);

            this.isSelectAll = true;
            this.onChangeCallback(selectedItems);
            this.onTouchedCallback(selectedItems);

            this.onSelectAll.emit(this.selectedItems);

            /* this.selectedItems = [];
            if (this.settings.groupBy) {
                this.groupedData.forEach((obj) => {
                    obj.selected = !obj[this.settings.disabledKey];
                });
                this.groupCachedItems.forEach((obj) => {
                    obj.selected = !obj[this.settings.disabledKey];
                });
            }
            // this.selectedItems = this.data.slice();
            this.selectedItems = this.data.filter((individualData) => !individualData[this.settings.disabledKey]);
            this.isSelectAll = true;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);

            this.onSelectAll.emit(this.selectedItems); */
        } else {

            this.selectedItems = [];
            this.isSelectAll = false;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);

            this.onDeSelectAll.emit(this.selectedItems);

            /* if (this.settings.groupBy) {
                this.groupedData.forEach((obj) => {
                    obj.selected = false;
                });
                this.groupCachedItems.forEach((obj) => {
                    obj.selected = false;
                });
            }
            this.selectedItems = [];
            this.isSelectAll = false;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);

            this.onDeSelectAll.emit(this.selectedItems); */
        }

        this.closeDropdown();
    }

    filterFn(ev: Event) {

        if (this.settings.groupBy && !this.settings.lazyLoading) {
            this.filterGroupedList();
        } else if (this.settings.lazyLoading) {
            this.searchTerm$.next((ev.target as HTMLInputElement).value);
        }

    }

    filterGroupedList() {
        if (this.filter === '' || this.filter == null) {
            this.clearSearch();
            return;
        }

        this.groupedData = this.cloneArray(this.groupCachedItems);
        this.groupedData = this.groupedData.filter(obj => {
            let arr = [];
            if (obj[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
                arr = obj.list;
            } else {
                arr = obj.list.filter(t => {
                    return t[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
                });
            }

            obj.list = arr;
            if (obj[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
                return arr;
            } else {
                return arr.some(cat => {
                    return cat[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
                }
                );
            }

        });
    }

    toggleFilterSelectAll() {
        if (!this.isFilterSelectAll) {
            let added = [];
            if (this.settings.groupBy) {
                /*                 this.groupedData.forEach((item: any) => {
                                    if (item.list) {
                                        item.list.forEach((el: any) => {
                                            if (!this.isSelected(el)) {
                                                this.addSelected(el);
                                                added.push(el);
                                            }
                                        });
                                    }
                                    this.updateGroupInfo(item);

                                }); */

                this.ds.getFilteredData().forEach((el: any) => {
                    if (!this.isSelected(el) && !el.hasOwnProperty('grpTitle')) {
                        this.addSelected(el);
                        added.push(el);
                    }
                });

            } else {
                this.ds.getFilteredData().forEach((item: any) => {
                    if (!this.isSelected(item)) {
                        this.addSelected(item);
                        added.push(item);
                    }

                });
            }

            this.isFilterSelectAll = true;
            this.onFilterSelectAll.emit(added);
        } else {
            let removed = [];
            if (this.settings.groupBy) {
                /*                 this.groupedData.forEach((item: any) => {
                                    if (item.list) {
                                        item.list.forEach((el: any) => {
                                            if (this.isSelected(el)) {
                                                this.removeSelected(el);
                                                removed.push(el);
                                            }
                                        });
                                    }
                                }); */
                this.ds.getFilteredData().forEach((el: any) => {
                    if (this.isSelected(el)) {
                        this.removeSelected(el);
                        removed.push(el);
                    }
                });
            } else {
                this.ds.getFilteredData().forEach((item: any) => {
                    if (this.isSelected(item)) {
                        this.removeSelected(item);
                        removed.push(item);
                    }

                });
            }
            this.isFilterSelectAll = false;
            this.onFilterDeSelectAll.emit(removed);
        }
    }

    toggleInfiniteFilterSelectAll() {
        if (!this.isInfiniteFilterSelectAll) {
            this.virtualdata.forEach((item: any) => {
                if (!this.isSelected(item)) {
                    this.addSelected(item);
                }
            });
            this.isInfiniteFilterSelectAll = true;
        } else {
            this.virtualdata.forEach((item: any) => {
                if (this.isSelected(item)) {
                    this.removeSelected(item);
                }

            });
            this.isInfiniteFilterSelectAll = false;
        }
    }

    clearSearch() {

        this.filter = '';

        if (this.settings.lazyLoading) {

            this.isInfiniteFilterSelectAll = false;
            this.virtualdata = [];
            this.virtualdata = this.cachedItems;
            this.groupedData = this.groupCachedItems;
            this.infiniteFilterLength = 0;

        } else {
            if (this.settings.groupBy) {
                this.groupedData = [];
                this.groupedData = this.cloneArray(this.groupCachedItems);
            }

            this.isFilterSelectAll = false;
        }

        setTimeout(() => {
            this.searchInput?.nativeElement.focus();
        }, 0);

    }

    onFilterChange(data: any) {
        if (this.filter && this.filter === '' || data.length === 0) {
            this.isFilterSelectAll = false;
        }
        let cnt = 0;
        data.forEach((item: any) => {

            if (!item.hasOwnProperty('grpTitle') && this.isSelected(item)) {
                cnt++;
            }
        });

        if (cnt > 0 && this.filterLength === cnt) {
            this.isFilterSelectAll = true;
        } else if (cnt > 0 && this.filterLength !== cnt) {
            this.isFilterSelectAll = false;
        }
        this.cdr.detectChanges();
    }

    cloneArray(arr: any) {

        if (Array.isArray(arr)) {
            return JSON.parse(JSON.stringify(arr));
        } else if (typeof arr === 'object') {
            throw 'Cannot clone array containing an object!';
        } else {
            return arr;
        }
    }

    updateGroupInfo(item: any) {
        if (item[this.settings.disabledKey]) {
            return false;
        }
        let key = this.settings.groupBy;
        this.groupedData.forEach((obj: any) => {
            let cnt = 0;
            if (obj.grpTitle && (item[key] === obj[key])) {
                if (obj.list) {
                    obj.list.forEach((el: any) => {
                        if (this.isSelected(el)) {
                            cnt++;
                        }
                    });
                }
            }
            if (obj.list && (cnt === obj.list.length) && (item[key] === obj[key])) {
                obj.selected = true;
            } else if (obj.list && (cnt !== obj.list.length) && (item[key] === obj[key])) {
                obj.selected = false;
            }
        });
        this.groupCachedItems.forEach((obj: any) => {
            let cnt = 0;
            if (obj.grpTitle && (item[key] === obj[key])) {
                if (obj.list) {
                    obj.list.forEach((el: any) => {
                        if (this.isSelected(el)) {
                            cnt++;
                        }
                    });
                }
            }
            if (obj.list && (cnt === obj.list.length) && (item[key] === obj[key])) {
                obj.selected = true;
            } else if (obj.list && (cnt !== obj.list.length) && (item[key] === obj[key])) {
                obj.selected = false;
            }
        });
    }

    transformData(arr: Array<any>, field: any): Array<any> {
        const groupedObj: any = arr.reduce((prev: any, cur: any) => {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            } else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        const tempArr: any = [];
        Object.keys(groupedObj).map((x: any) => {
            let obj: any = {};
            let disabledChildrens = [];
            obj.grpTitle = true;
            obj[this.settings.labelKey] = x;
            obj[this.settings.groupBy] = x;
            obj.selected = false;
            obj.list = [];
            let cnt = 0;
            groupedObj[x].forEach((item: any) => {
                item.list = [];
                if (item[this.settings.disabledKey]) {
                    this.isDisabledItemPresent = true;
                    disabledChildrens.push(item);
                }
                obj.list.push(item);
                if (this.isSelected(item)) {
                    cnt++;
                }
            });
            if (cnt === obj.list.length) {
                obj.selected = true;
            } else {
                obj.selected = false;
            }

            // Check if current group item's all childrens are disabled or not
            obj[this.settings.disabledKey] = disabledChildrens.length === groupedObj[x].length;
            tempArr.push(obj);
            // obj.list.forEach((item: any) => {
            //     tempArr.push(item);
            // });
        });
        return tempArr;
    }

    public filterInfiniteList(evt: any) {
        let filteredElems: Array<any> = [];
        if (this.settings.groupBy) {
            this.groupedData = this.groupCachedItems.slice();
        } else {
            this.data = this.cachedItems.slice();
            this.virtualdata = this.cachedItems.slice();
        }

        if ((evt != null || evt !== '') && !this.settings.groupBy) {
            if (this.settings.searchBy.length > 0) {
                for (let t = 0; t < this.settings.searchBy.length; t++) {

                    this.virtualdata.filter((el: any) => {
                        if (el[this.settings.searchBy[t].toString()].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                            filteredElems.push(el);
                        }
                    });
                }

            } else {
                this.virtualdata.filter((el: any) => {
                    for (let prop in el) {
                        if (el[prop].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                            filteredElems.push(el);
                            break;
                        }
                    }
                });
            }
            this.virtualdata = [];
            this.virtualdata = filteredElems;
            this.infiniteFilterLength = this.virtualdata.length;
        }
        if (evt.toString() !== '' && this.settings.groupBy) {
            this.groupedData.filter((el: any) => {
                if (el.hasOwnProperty('grpTitle')) {
                    filteredElems.push(el);
                } else {
                    for (let prop in el) {
                        if (el[prop].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                            filteredElems.push(el);
                            break;
                        }
                    }
                }
            });
            this.groupedData = [];
            this.groupedData = filteredElems;
            this.infiniteFilterLength = this.groupedData.length;
        } else if (evt.toString() === '' && this.cachedItems.length > 0) {
            this.virtualdata = [];
            this.virtualdata = this.cachedItems;
            this.infiniteFilterLength = 0;
        }
        this.virtualScroller.refresh();
    }

    onScrollEnd(e: any) {
        if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {

        }

        this.onScrollToEnd.emit(e);
    }

    selectGroup(item: any) {
        if (item[this.settings.disabledKey]) {
            return false;
        }
        if (item.selected) {
            item.selected = false;
            item.list.forEach((obj: any) => {
                this.removeSelected(obj);
            });

            this.onGroupDeSelect.emit(item);
            this.updateGroupInfo(item);

        } else {
            item.selected = true;
            item.list.forEach((obj: any) => {
                if (!this.isSelected(obj)) {
                    this.addSelected(obj);
                }

            });
            this.onGroupSelect.emit(item);
            this.updateGroupInfo(item);

        }


    }

    addFilterNewItem() {
        this.onAddFilterNewItem.emit(this.filter);
        this.filterPipe = new SerSelectListFilterPipe(this.ds);
        this.filterPipe.transform(this.data, this.filter, this.settings.searchBy);
    }

    clearSelection(e: MouseEvent) {

        if (this.settings.groupBy) {
            this.groupCachedItems.forEach((obj) => {
                obj.selected = false;
            });
        }

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

        this.onDeSelectAll.emit(this.selectedItems);

        e.stopPropagation();
    }

    getItemContext(item: any) {
        return item;
    }

    observePosition(ev: any) {
        console.log(ev);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.dropdownSubs$.forEach(s => {
            s.unsubscribe();
        });

    }
}
