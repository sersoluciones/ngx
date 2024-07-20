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
import { NG_VALUE_ACCESSOR, ControlValueAccessor, UntypedFormBuilder } from '@angular/forms';
import { FilterSettings } from './ser-filter.interface';
import { Subscription, fromEvent, Observable, merge, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { hasValue } from '../../utils/check';
import { SDBadgeDirective, SDBadgeItemDirective, SDItemDirective } from '../select/ser-select-menu-item.directive';
import { inArray } from '../../utils/array';
import { DataService } from '../select/ser-select.service';
import { fromIntersectionObserver } from '../../utils/rx-utils';

const noop = () => {
};

@Component({
    selector: 'ser-filter',
    templateUrl: './ser-filter.component.html',
    host: { '[class]': 'defaultSettings.classes' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SerFilterComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class SerFilterComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {

    @HostBinding('class.disabled') isDisabled = false;
    @HostBinding('class.active') isActive = false;

    //#region Properties
    private _data = [];

    public get data() {
        return this._data;
    }

    @Input()
    public set data(value) {
        this._data = value;
        this.filterList();
    }

    @Input() settings: FilterSettings;
    @Input() loading: boolean;
    @Input() label: string;

    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDeSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output() onDeSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output() onOpen: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
    @Output() onScrollToEnd: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFilterSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output() onFilterDeSelectAll: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output() onAddFilterNewItem: EventEmitter<any> = new EventEmitter<any>();
    @Output() onGroupSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onGroupDeSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();

    @ContentChild(SDItemDirective, { static: true }) itemTempl: SDItemDirective;
    @ContentChild(SDBadgeDirective, { static: true }) badgeTempl: SDBadgeDirective;
    @ContentChild(SDBadgeItemDirective, { static: true }) badgeItemTempl: SDBadgeItemDirective;

    @ViewChild('searchInputCont') searchInputCont: ElementRef;
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild('selectedList') selectedListElem: ElementRef;
    @ViewChild('dropdownList') dropdownListElem: ElementRef;

    private parents: Element[] = [];
    notifierDestroySubs: ReplaySubject<any> = new ReplaySubject();
    search = this._fb.control('');

    selectedItems: any[] = [];
    isSelectAll = false;
    isFilterSelectAll = false;
    groupedData: any[];
    chunkArray: any[];
    scrollTop: any;
    chunkIndex: any[] = [];
    groupCachedItems: any[] = [];
    totalRows: any;
    itemHeight: any = 41.6;
    screenItemsLen: any;
    totalHeight: any;
    scroller: any;
    selectedListHeight: any;
    filterLength: any = 0;
    viewPortItems: any;
    labelActive = false;
    item: any;

    private dropdownSubs$: Subscription[] = [];
    private subscription: Subscription;
    defaultSettings: FilterSettings = {
        searchBy: ['name'],
        maxHeight: 300,
        classes: '',
        searchPlaceholderText: 'Filtrar',
        noDataLabel: 'Sin datos disponibles',
        labelKey: 'name',
        primaryKey: 'id',
        disabledKey: 'disabled',
        clearAll: true
    };

    randomSize = true;
    public parseError: boolean;
    public filteredList: any = [];
    public isDisabledItemPresent = false;
    //#endregion

    hasValue = hasValue;

    constructor(public _elementRef: ElementRef, private cdr: ChangeDetectorRef, private _fb: UntypedFormBuilder, private _ds: DataService, private _renderer: Renderer2, @Optional() @Attribute('primaryKey') primaryKey: any,
                @Optional() @Attribute('labelKey') labelKey: any) {

        if (primaryKey !== null) {
            this.defaultSettings.primaryKey = primaryKey;
        }

        if (labelKey !== null) {
            this.defaultSettings.labelKey = labelKey;
        }
    }

    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);

        this.search.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged((prev, curr) => {
                    return JSON.stringify(prev) === JSON.stringify(curr);
                }),
                takeUntil(this.notifierDestroySubs)
            )
            .subscribe(() => {
                this.filterList();
            });
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.data && !changes.data.firstChange) {

            this.filterList();
        }

        if (changes.settings && !changes.settings.firstChange) {
            this.settings = Object.assign(this.defaultSettings, this.settings);
        }

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

    onItemClick(item: any) {

        if (this.isDisabled || item[this.settings.disabledKey]) {
            return false;
        }

        let found = this.isSelected(item);

        if (!found) {
            this.addSelected(item);
            this.onSelect.emit(item);

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
    }

    filterList() {
        this.filteredList =  this._ds.filterData(this.data, this.search.value, this.settings?.searchBy);
    }

    writeValue(value: any) {

        if (hasValue(value)) {
            if (!Array.isArray(value)) {
                throw Error('Single value detected as input, please set "singleSelection" setting in true or remove "multiple" attribute in the select if you added');
            }

            const selectedObjects = this.data?.filter(item => {
                return inArray(item[this.settings.primaryKey], value);
            });

            if (hasValue(selectedObjects)) {
                this.selectedItems = selectedObjects;
            } else {
                this.selectedItems = [];
                throw Error('No primaryKey finded in options, please set "primaryKey" setting with the correct value');
            }

            if (this.selectedItems.length === this.data.length && this.data.length > 0) {
                this.isSelectAll = true;
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

    trackByFn(item: any) {

        if (typeof item === 'object') {
            return item[this.settings.primaryKey];
        }

        return item;
    }

    getLabelText(item: any) {

        if (typeof item === 'object') {
            return item[this.settings.labelKey];
        }

        return item;
    }

    isSelected(clickedItem: any) {

        if (typeof clickedItem !== 'object') {
            return inArray(clickedItem, this.selectedItems);
        }

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
        this.selectedItems.push(item);
        this.search.setValue(null);

        const items = this.selectedItems.map(element => {

            if (typeof item === 'object') {
                return element[this.settings.primaryKey];
            }

            return element;
        });

        this.onChangeCallback(items);
        this.onTouchedCallback(items);
    }

    removeSelected(clickedItem: any) {

        if (hasValue(this.selectedItems)) {
            this.selectedItems.forEach((item, index) => {
                if (typeof item === 'object') {
                    if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                        this.selectedItems.splice(index, 1);
                    }
                } else if (clickedItem === item) {
                    this.selectedItems.splice(index, 1);
                }
            });
        }

        const items = this.selectedItems.map(element => {

            if (typeof clickedItem === 'object') {
                return element[this.settings.primaryKey];
            }

            return element;
        });

        this.onChangeCallback(items);
        this.onTouchedCallback(items);
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
        this.labelActive = true;
        this.focus.emit();

        this.setPositionDropdown();

        const parents$: Observable<any>[] = [
            fromEvent(document, 'scroll'),
            fromEvent(window, 'resize').pipe(debounceTime(200))
        ];

        this.parents.forEach((parent) => {
            parents$.push(fromEvent(parent, 'scroll'));
        });

        this.dropdownSubs$.push(

            merge(
                fromEvent(window, 'click')
                    .pipe(filter((e: MouseEvent) => !this._elementRef.nativeElement.contains(e.target) )),

                fromEvent(window, 'keyup')
                    .pipe(filter((e: KeyboardEvent) => e.key.toLowerCase() === 'escape' )),

                fromIntersectionObserver(this.selectedListElem.nativeElement)
                    .pipe(filter((ev) => !ev[0].isIntersecting))
            )
            .subscribe(() => this.closeDropdown()),

            merge(...parents$).subscribe(() => this.setPositionDropdown())
        );

        this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);

        setTimeout(() => {
            this.searchInput?.nativeElement.focus();
        }, 0);

        this.onOpen.emit(true);
    }

    public closeDropdown() {

        /* console.log(this.searchInput);

        if (this.searchInput) {
            console.log('this.searchInput');
            this.searchInput.nativeElement.value = '';
        } */

        this.clearSearch();
        this.isActive = false;
        this.labelActive = false;
        this.blur.emit();

        this.dropdownSubs$.forEach(s => s.unsubscribe() );
        this.dropdownSubs$ = [];

        this.onClose.emit(false);
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    }

    setPositionDropdown() {

        setTimeout(() => {

            const dropdown = (this.dropdownListElem.nativeElement as HTMLDivElement);
            const el = (this.searchInputCont.nativeElement as HTMLElement);
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
            this.selectedItems = this.data.filter((individualData) => !individualData[this.settings.disabledKey]);
            const selectedItems = this.selectedItems.map(element => {
                if (typeof element === 'object') {
                    return element[this.settings.primaryKey];
                }

                return element;
            });

            this.isSelectAll = true;
            this.onChangeCallback(selectedItems);
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

        this.search.setValue('');
        this.isFilterSelectAll = false;

        setTimeout(() => {
            this.searchInput?.nativeElement.blur();
        }, 0);

    }

    clearSelection(e: MouseEvent) {

        this.clearSearch();
        this.selectedItems = [];
        this.isSelectAll = false;

        this.onChangeCallback(this.selectedItems);
        this.onTouchedCallback(this.selectedItems);

        this.onDeSelectAll.emit(this.selectedItems);

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
