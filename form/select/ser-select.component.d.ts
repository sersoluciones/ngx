import { Renderer2 } from '@angular/core';
import { OnInit, OnDestroy, SimpleChanges, OnChanges, ChangeDetectorRef, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, Validator, FormControl } from '@angular/forms';
import { DropdownSettings } from './ser-select.interface';
import { SerSelectListFilterPipe } from './ser-select-list-filter.pipe';
import { SDItemDirective, SDBadgeDirective, SDSearchDirective } from './ser-select-menu-item.directive';
import { DataService } from './ser-select.service';
import { Subject } from 'rxjs';
import { hasValue } from '../../utils/check';
export declare class SerSelectComponent implements OnInit, ControlValueAccessor, OnChanges, Validator, AfterViewInit, OnDestroy {
    _elementRef: ElementRef;
    private cdr;
    private ds;
    private _renderer;
    data: any[];
    settings: DropdownSettings;
    loading: boolean;
    multiple: boolean;
    onSelect: EventEmitter<any>;
    onDeSelect: EventEmitter<any>;
    onSelectAll: EventEmitter<Array<any>>;
    onDeSelectAll: EventEmitter<Array<any>>;
    onOpen: EventEmitter<any>;
    onClose: EventEmitter<any>;
    onScrollToEnd: EventEmitter<any>;
    onFilterSelectAll: EventEmitter<Array<any>>;
    onFilterDeSelectAll: EventEmitter<Array<any>>;
    onAddFilterNewItem: EventEmitter<any>;
    onGroupSelect: EventEmitter<any>;
    onGroupDeSelect: EventEmitter<any>;
    itemTempl: SDItemDirective;
    badgeTempl: SDBadgeDirective;
    searchTempl: SDSearchDirective;
    searchInput: ElementRef;
    selectedListElem: ElementRef;
    dropdownListElem: ElementRef;
    isDisabled: boolean;
    isActive: boolean;
    multipleClass: boolean;
    virtualdata: any;
    searchTerm$: Subject<string>;
    filterPipe: SerSelectListFilterPipe;
    selectedItems: any[];
    isSelectAll: boolean;
    isFilterSelectAll: boolean;
    isInfiniteFilterSelectAll: boolean;
    groupedData: any[];
    filter: any;
    chunkArray: any[];
    scrollTop: any;
    chunkIndex: any[];
    cachedItems: any[];
    groupCachedItems: any[];
    totalRows: any;
    itemHeight: any;
    screenItemsLen: any;
    cachedItemsLen: any;
    totalHeight: any;
    scroller: any;
    maxBuffer: any;
    lastScrolled: any;
    lastRepaintY: any;
    selectedListHeight: any;
    filterLength: any;
    infiniteFilterLength: any;
    viewPortItems: any;
    item: any;
    private dropdownSubs;
    private subscription;
    defaultSettings: DropdownSettings;
    randomSize: boolean;
    parseError: boolean;
    filteredList: any;
    virtualScroollInit: boolean;
    private virtualScroller;
    isDisabledItemPresent: boolean;
    hasValue: typeof hasValue;
    constructor(_elementRef: ElementRef, cdr: ChangeDetectorRef, ds: DataService, _renderer: Renderer2, multipleAttr: any, simple: any, primaryKey: any, labelKey: any);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    onItemClick(item: any, k: number, e: any): boolean;
    validate(c: FormControl): any;
    writeValue(value: any): void;
    private onChangeCallback;
    registerOnChange(fn: any): void;
    private onTouchedCallback;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    trackByFn(item: any): any;
    isSelected(clickedItem: any): boolean;
    addSelected(item: any): void;
    removeSelected(clickedItem: any): void;
    toggleDropdown(evt: any): boolean;
    openDropdown(): boolean;
    closeDropdown(): void;
    setPositionDropdown(): void;
    toggleSelectAll(): void;
    filterFn(value: any): void;
    filterGroupedList(): void;
    toggleFilterSelectAll(): void;
    toggleInfiniteFilterSelectAll(): void;
    clearSearch(): void;
    onFilterChange(data: any): void;
    cloneArray(arr: any): any;
    updateGroupInfo(item: any): boolean;
    transformData(arr: Array<any>, field: any): Array<any>;
    filterInfiniteList(evt: any): void;
    onScrollEnd(e: any): void;
    selectGroup(item: any): boolean;
    addFilterNewItem(): void;
    clearSelection(e: MouseEvent): void;
    getItemContext(item: any): any;
    ngOnDestroy(): void;
}
