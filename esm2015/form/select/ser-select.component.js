// tslint:disable: no-use-before-declare
// tslint:disable: no-host-metadata-property
// tslint:disable: max-line-length
// tslint:disable: no-output-rename
// tslint:disable: no-output-on-prefix
// tslint:disable: prefer-const
// tslint:disable: no-conflicting-lifecycle
// tslint:disable: component-class-suffix
// tslint:disable: component-selector
var SerSelectComponent_1;
import { __decorate, __param } from "tslib";
import { Attribute, HostBinding, Optional, Renderer2 } from '@angular/core';
import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges, ChangeDetectorRef, ViewEncapsulation, ContentChild, ViewChild, forwardRef, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { SerSelectListFilterPipe } from './ser-select-list-filter.pipe';
import { SDItemDirective, SDBadgeDirective, SDSearchDirective } from './ser-select-menu-item.directive';
import { DataService } from './ser-select.service';
import { Subject, fromEvent } from 'rxjs';
import { VirtualScrollerComponent } from './virtual-scroll/virtual-scroll';
import { debounceTime, distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { hasValue } from '../../utils/check';
import { inArray } from '../../utils/array';
const noop = () => {
};
const ɵ0 = noop;
let SerSelectComponent = SerSelectComponent_1 = class SerSelectComponent {
    constructor(_elementRef, cdr, ds, _renderer, multipleAttr, simple, primaryKey, labelKey) {
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this.ds = ds;
        this._renderer = _renderer;
        this.data = [];
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onScrollToEnd = new EventEmitter();
        this.onFilterSelectAll = new EventEmitter();
        this.onFilterDeSelectAll = new EventEmitter();
        this.onAddFilterNewItem = new EventEmitter();
        this.onGroupSelect = new EventEmitter();
        this.onGroupDeSelect = new EventEmitter();
        this.isDisabled = false;
        this.isActive = false;
        this.multipleClass = false;
        this.virtualdata = [];
        this.searchTerm$ = new Subject();
        this.selectedItems = [];
        this.isSelectAll = false;
        this.isFilterSelectAll = false;
        this.isInfiniteFilterSelectAll = false;
        this.chunkIndex = [];
        this.cachedItems = [];
        this.groupCachedItems = [];
        this.itemHeight = 41.6;
        this.filterLength = 0;
        this.infiniteFilterLength = 0;
        this.dropdownSubs = [];
        this.defaultSettings = {
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
        this.randomSize = true;
        this.filteredList = [];
        this.virtualScroollInit = false;
        this.isDisabledItemPresent = false;
        this.hasValue = hasValue;
        // tslint:disable-next-line: member-ordering
        this.onChangeCallback = noop;
        // tslint:disable-next-line: member-ordering
        this.onTouchedCallback = noop;
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
        this.searchTerm$.asObservable().pipe(debounceTime(1000), distinctUntilChanged(), tap(term => term)).subscribe(val => {
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
                data.forEach((obj) => {
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
    ngOnChanges(changes) {
        var _a;
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
        if (((_a = this.settings) === null || _a === void 0 ? void 0 : _a.lazyLoading) && this.virtualScroollInit && changes.data) {
            this.virtualdata = changes.data.currentValue;
        }
    }
    ngAfterViewInit() {
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    }
    onItemClick(item, k, e) {
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
            }
            else {
                this.addSelected(item);
                this.onSelect.emit(item);
            }
        }
        else {
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
    validate(c) {
        return null;
    }
    writeValue(value) {
        var _a, _b;
        if (hasValue(value)) {
            if (this.settings.singleSelection) {
                if (Array.isArray(value)) {
                    throw Error('Array detected as input, please add "multiple" attribute in the select or set "singleSelection" setting in false');
                }
                const selectedObject = (_a = this.data) === null || _a === void 0 ? void 0 : _a.find(item => {
                    return item[this.settings.primaryKey] === value;
                });
                if (hasValue(selectedObject)) {
                    this.selectedItems = [selectedObject];
                }
                else {
                    this.selectedItems = [];
                    throw Error('No primaryKey finded in options, please set "primaryKey" setting with the correct value');
                }
                if (this.settings.groupBy) {
                    this.groupedData = this.transformData(this.data, this.settings.groupBy);
                    this.groupCachedItems = this.cloneArray(this.groupedData);
                }
            }
            else {
                if (!Array.isArray(value)) {
                    throw Error('Single value detected as input, please set "singleSelection" setting in true or remove "multiple" attribute in the select if you added');
                }
                const selectedObjects = (_b = this.data) === null || _b === void 0 ? void 0 : _b.filter(item => {
                    return inArray(item[this.settings.primaryKey], value);
                });
                if (hasValue(selectedObjects)) {
                    if (this.settings.limitSelection) {
                        this.selectedItems = selectedObjects.slice(0, this.settings.limitSelection);
                    }
                    else {
                        this.selectedItems = selectedObjects;
                    }
                }
                else {
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
        }
        else {
            this.selectedItems = [];
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    trackByFn(item) {
        return item[this.settings.primaryKey];
    }
    isSelected(clickedItem) {
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
    addSelected(item) {
        if (this.settings.singleSelection) {
            this.selectedItems = [item];
            this.onChangeCallback(item[this.settings.primaryKey]);
            this.onTouchedCallback(item[this.settings.primaryKey]);
            this.closeDropdown();
        }
        else {
            this.selectedItems.push(item);
            const items = this.selectedItems.map(element => element[this.settings.primaryKey]);
            this.onChangeCallback(items);
            this.onTouchedCallback(items);
        }
    }
    removeSelected(clickedItem) {
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
        }
        else {
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
        }
    }
    //#region dropdown status
    toggleDropdown(evt) {
        if (this.isDisabled) {
            return false;
        }
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.openDropdown();
        }
        else {
            this.closeDropdown();
        }
        if (this.settings.lazyLoading) {
            this.virtualdata = this.data;
            this.virtualScroollInit = true;
        }
        evt.preventDefault();
    }
    openDropdown() {
        if (this.isDisabled) {
            return false;
        }
        this.isActive = true;
        this.dropdownSubs.push(fromEvent(window, 'click')
            .pipe(filter((e) => !this._elementRef.nativeElement.contains(e.target)))
            .subscribe(() => this.closeDropdown()));
        this.dropdownSubs.push(fromEvent(window, 'keyup')
            .pipe(filter((e) => e.key.toLowerCase() === 'escape' && this.settings.escapeToClose))
            .subscribe(() => this.closeDropdown()));
        this.dropdownSubs.push(fromEvent(this._elementRef.nativeElement, 'scroll').subscribe(() => console.log('scroll')));
        this.dropdownSubs.push(fromEvent(window, 'resize').subscribe(() => this.setPositionDropdown()));
        this.setPositionDropdown();
        this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
        if (this.settings.enableSearchFilter && !this.searchTempl) {
            setTimeout(() => {
                var _a;
                (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
            }, 0);
        }
        this.onOpen.emit(true);
    }
    closeDropdown() {
        if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
        this.clearSearch();
        this.isActive = false;
        this.dropdownSubs.forEach(s => s.unsubscribe());
        this.dropdownSubs = [];
        this.onClose.emit(false);
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    }
    setPositionDropdown() {
        setTimeout(() => {
            const dropdown = this.dropdownListElem.nativeElement;
            const el = this._elementRef.nativeElement;
            const remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);
            this._renderer.setStyle(dropdown, 'width', (el.offsetWidth) + 'px');
            this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left) + 'px');
            if (remainingHeight > 0) {
                this._renderer.removeClass(el, 'ontop');
                this._renderer.removeClass(dropdown, 'ontop');
                this._elementRef.nativeElement.style.removeProperty('bottom');
                this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
            }
            else {
                this._renderer.addClass(el, 'ontop');
                this._renderer.addClass(dropdown, 'ontop');
                this._elementRef.nativeElement.style.removeProperty('top');
                this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
            }
        });
    }
    //#endregion
    toggleSelectAll() {
        if (!this.isSelectAll) {
            this.selectedItems = [];
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
            this.onSelectAll.emit(this.selectedItems);
        }
        else {
            if (this.settings.groupBy) {
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
            this.onDeSelectAll.emit(this.selectedItems);
        }
    }
    filterFn(value) {
        if (this.settings.groupBy && !this.settings.lazyLoading) {
            this.filterGroupedList();
        }
        else if (this.settings.lazyLoading) {
            this.searchTerm$.next(value);
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
            }
            else {
                arr = obj.list.filter(t => {
                    return t[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
                });
            }
            obj.list = arr;
            if (obj[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
                return arr;
            }
            else {
                return arr.some(cat => {
                    return cat[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
                });
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
                this.ds.getFilteredData().forEach((el) => {
                    if (!this.isSelected(el) && !el.hasOwnProperty('grpTitle')) {
                        this.addSelected(el);
                        added.push(el);
                    }
                });
            }
            else {
                this.ds.getFilteredData().forEach((item) => {
                    if (!this.isSelected(item)) {
                        this.addSelected(item);
                        added.push(item);
                    }
                });
            }
            this.isFilterSelectAll = true;
            this.onFilterSelectAll.emit(added);
        }
        else {
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
                this.ds.getFilteredData().forEach((el) => {
                    if (this.isSelected(el)) {
                        this.removeSelected(el);
                        removed.push(el);
                    }
                });
            }
            else {
                this.ds.getFilteredData().forEach((item) => {
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
            this.virtualdata.forEach((item) => {
                if (!this.isSelected(item)) {
                    this.addSelected(item);
                }
            });
            this.isInfiniteFilterSelectAll = true;
        }
        else {
            this.virtualdata.forEach((item) => {
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
        }
        else {
            if (this.settings.groupBy) {
                this.groupedData = [];
                this.groupedData = this.cloneArray(this.groupCachedItems);
            }
            this.isFilterSelectAll = false;
        }
        setTimeout(() => {
            var _a;
            (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
        }, 0);
    }
    onFilterChange(data) {
        if (this.filter && this.filter === '' || data.length === 0) {
            this.isFilterSelectAll = false;
        }
        let cnt = 0;
        data.forEach((item) => {
            if (!item.hasOwnProperty('grpTitle') && this.isSelected(item)) {
                cnt++;
            }
        });
        if (cnt > 0 && this.filterLength === cnt) {
            this.isFilterSelectAll = true;
        }
        else if (cnt > 0 && this.filterLength !== cnt) {
            this.isFilterSelectAll = false;
        }
        this.cdr.detectChanges();
    }
    cloneArray(arr) {
        if (Array.isArray(arr)) {
            return JSON.parse(JSON.stringify(arr));
        }
        else if (typeof arr === 'object') {
            throw 'Cannot clone array containing an object!';
        }
        else {
            return arr;
        }
    }
    updateGroupInfo(item) {
        if (item[this.settings.disabledKey]) {
            return false;
        }
        let key = this.settings.groupBy;
        this.groupedData.forEach((obj) => {
            let cnt = 0;
            if (obj.grpTitle && (item[key] === obj[key])) {
                if (obj.list) {
                    obj.list.forEach((el) => {
                        if (this.isSelected(el)) {
                            cnt++;
                        }
                    });
                }
            }
            if (obj.list && (cnt === obj.list.length) && (item[key] === obj[key])) {
                obj.selected = true;
            }
            else if (obj.list && (cnt !== obj.list.length) && (item[key] === obj[key])) {
                obj.selected = false;
            }
        });
        this.groupCachedItems.forEach((obj) => {
            let cnt = 0;
            if (obj.grpTitle && (item[key] === obj[key])) {
                if (obj.list) {
                    obj.list.forEach((el) => {
                        if (this.isSelected(el)) {
                            cnt++;
                        }
                    });
                }
            }
            if (obj.list && (cnt === obj.list.length) && (item[key] === obj[key])) {
                obj.selected = true;
            }
            else if (obj.list && (cnt !== obj.list.length) && (item[key] === obj[key])) {
                obj.selected = false;
            }
        });
    }
    transformData(arr, field) {
        const groupedObj = arr.reduce((prev, cur) => {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            }
            else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        const tempArr = [];
        Object.keys(groupedObj).map((x) => {
            let obj = {};
            let disabledChildrens = [];
            obj.grpTitle = true;
            obj[this.settings.labelKey] = x;
            obj[this.settings.groupBy] = x;
            obj.selected = false;
            obj.list = [];
            let cnt = 0;
            groupedObj[x].forEach((item) => {
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
            }
            else {
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
    filterInfiniteList(evt) {
        let filteredElems = [];
        if (this.settings.groupBy) {
            this.groupedData = this.groupCachedItems.slice();
        }
        else {
            this.data = this.cachedItems.slice();
            this.virtualdata = this.cachedItems.slice();
        }
        if ((evt != null || evt !== '') && !this.settings.groupBy) {
            if (this.settings.searchBy.length > 0) {
                for (let t = 0; t < this.settings.searchBy.length; t++) {
                    this.virtualdata.filter((el) => {
                        if (el[this.settings.searchBy[t].toString()].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                            filteredElems.push(el);
                        }
                    });
                }
            }
            else {
                this.virtualdata.filter((el) => {
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
            this.groupedData.filter((el) => {
                if (el.hasOwnProperty('grpTitle')) {
                    filteredElems.push(el);
                }
                else {
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
        }
        else if (evt.toString() === '' && this.cachedItems.length > 0) {
            this.virtualdata = [];
            this.virtualdata = this.cachedItems;
            this.infiniteFilterLength = 0;
        }
        this.virtualScroller.refresh();
    }
    onScrollEnd(e) {
        if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {
        }
        this.onScrollToEnd.emit(e);
    }
    selectGroup(item) {
        if (item[this.settings.disabledKey]) {
            return false;
        }
        if (item.selected) {
            item.selected = false;
            item.list.forEach((obj) => {
                this.removeSelected(obj);
            });
            this.onGroupDeSelect.emit(item);
            this.updateGroupInfo(item);
        }
        else {
            item.selected = true;
            item.list.forEach((obj) => {
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
    clearSelection(e) {
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
        }
        else {
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
        }
        this.onDeSelectAll.emit(this.selectedItems);
        e.stopPropagation();
    }
    getItemContext(item) {
        return item;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.dropdownSubs.forEach(s => {
            s.unsubscribe();
        });
    }
};
SerSelectComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['multiple',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['simple',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['primaryKey',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['labelKey',] }] }
];
__decorate([
    Input()
], SerSelectComponent.prototype, "data", void 0);
__decorate([
    Input()
], SerSelectComponent.prototype, "settings", void 0);
__decorate([
    Input()
], SerSelectComponent.prototype, "loading", void 0);
__decorate([
    Input()
], SerSelectComponent.prototype, "multiple", void 0);
__decorate([
    Output('onSelect')
], SerSelectComponent.prototype, "onSelect", void 0);
__decorate([
    Output('onDeSelect')
], SerSelectComponent.prototype, "onDeSelect", void 0);
__decorate([
    Output('onSelectAll')
], SerSelectComponent.prototype, "onSelectAll", void 0);
__decorate([
    Output('onDeSelectAll')
], SerSelectComponent.prototype, "onDeSelectAll", void 0);
__decorate([
    Output('onOpen')
], SerSelectComponent.prototype, "onOpen", void 0);
__decorate([
    Output('onClose')
], SerSelectComponent.prototype, "onClose", void 0);
__decorate([
    Output('onScrollToEnd')
], SerSelectComponent.prototype, "onScrollToEnd", void 0);
__decorate([
    Output('onFilterSelectAll')
], SerSelectComponent.prototype, "onFilterSelectAll", void 0);
__decorate([
    Output('onFilterDeSelectAll')
], SerSelectComponent.prototype, "onFilterDeSelectAll", void 0);
__decorate([
    Output('onAddFilterNewItem')
], SerSelectComponent.prototype, "onAddFilterNewItem", void 0);
__decorate([
    Output('onGroupSelect')
], SerSelectComponent.prototype, "onGroupSelect", void 0);
__decorate([
    Output('onGroupDeSelect')
], SerSelectComponent.prototype, "onGroupDeSelect", void 0);
__decorate([
    ContentChild(SDItemDirective, { static: true })
], SerSelectComponent.prototype, "itemTempl", void 0);
__decorate([
    ContentChild(SDBadgeDirective, { static: true })
], SerSelectComponent.prototype, "badgeTempl", void 0);
__decorate([
    ContentChild(SDSearchDirective, { static: true })
], SerSelectComponent.prototype, "searchTempl", void 0);
__decorate([
    ViewChild('searchInput')
], SerSelectComponent.prototype, "searchInput", void 0);
__decorate([
    ViewChild('selectedList')
], SerSelectComponent.prototype, "selectedListElem", void 0);
__decorate([
    ViewChild('dropdownList')
], SerSelectComponent.prototype, "dropdownListElem", void 0);
__decorate([
    HostBinding('class.disabled')
], SerSelectComponent.prototype, "isDisabled", void 0);
__decorate([
    HostBinding('class.active')
], SerSelectComponent.prototype, "isActive", void 0);
__decorate([
    HostBinding('class.multiple')
], SerSelectComponent.prototype, "multipleClass", void 0);
__decorate([
    ViewChild(VirtualScrollerComponent, { static: false })
], SerSelectComponent.prototype, "virtualScroller", void 0);
SerSelectComponent = SerSelectComponent_1 = __decorate([
    Component({
        selector: 'ser-select',
        template: "<div class=\"selected-list\" #selectedList (click)=\"toggleDropdown($event)\" [attr.tabindex]=\"0\">\r\n\r\n    <div class=\"values\">\r\n\r\n        <ng-container *ngIf=\"settings.singleSelection && hasValue(selectedItems)\">\r\n\r\n            <ng-container *ngIf=\"!hasValue(badgeTempl)\">\r\n                {{ selectedItems[0][settings.labelKey] }}\r\n            </ng-container>\r\n\r\n            <ng-container *ngIf=\"hasValue(badgeTempl)\">\r\n                <ng-container *ngTemplateOutlet=\"badgeTempl.template; context:{item: selectedItems[0]}\"></ng-container>\r\n            </ng-container>\r\n\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"!settings.singleSelection && hasValue(selectedItems)\">\r\n\r\n            <div class=\"token-list\">\r\n                <ng-container *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\">\r\n\r\n                    <div *ngIf=\"k < (settings.badgeShowLimit - 1)\" class=\"token\">\r\n                        <span *ngIf=\"!hasValue(badgeTempl)\" class=\"label\">{{ item[settings.labelKey] }}</span>\r\n                        <span *ngIf=\"hasValue(badgeTempl)\" class=\"label\">\r\n                            <ng-container *ngTemplateOutlet=\"badgeTempl.template; context:{item: item}\"></ng-container>\r\n                        </span>\r\n\r\n                        <span class=\"remove\" (click)=\"onItemClick(item, k, $event);$event.stopPropagation()\">\r\n                            <span class=\"material-icons\">close</span>\r\n                        </span>\r\n                    </div>\r\n\r\n                </ng-container>\r\n            </div>\r\n\r\n        </ng-container>\r\n    </div>\r\n\r\n    <div class=\"controls\">\r\n        <span class=\"countplaceholder\" *ngIf=\"selectedItems?.length > settings.badgeShowLimit\">+{{ selectedItems?.length - settings.badgeShowLimit }}</span>\r\n\r\n        <button type=\"button\" *ngIf=\"settings.clearAll && !isDisabled && selectedItems?.length > 0\" class=\"clear-all\" (click)=\"clearSelection($event);\">\r\n            <span class=\"material-icons\">close</span>\r\n        </button>\r\n\r\n        <span class=\"material-icons chevron\" [ngClass]=\"{'rotate': isActive}\">keyboard_arrow_down</span>\r\n    </div>\r\n</div>\r\n\r\n<div #dropdownList class=\"dropdown-list\" [ngClass]=\"{'single-select-mode': settings.singleSelection }\">\r\n    <div class=\"pure-checkbox select-all\" *ngIf=\"settings.enableCheckAll && !settings.singleSelection && !settings.limitSelection && data?.length > 0 && !isDisabledItemPresent\" (click)=\"toggleSelectAll()\">\r\n\r\n        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" id=\"selectAll\"/>\r\n\r\n        <label for=\"selectAll\">\r\n            <span [hidden]=\"isSelectAll\">{{ settings.selectAllText }}</span>\r\n            <span [hidden]=\"!isSelectAll\">{{ settings.unSelectAllText }}</span>\r\n        </label>\r\n    </div>\r\n\r\n    <img class=\"loading-icon\" *ngIf=\"loading\" src=\"assets/img/loading.gif\" />\r\n\r\n    <div class=\"list-filter\" *ngIf=\"settings.enableSearchFilter && hasValue(data)\">\r\n\r\n        <span class=\"material-icons icon-search\">search</span>\r\n\r\n        <ng-content *ngIf=\"searchTempl then searchTemplate;else searchDefault\"></ng-content>\r\n\r\n        <ng-template #searchTemplate>\r\n            <ng-container *ngTemplateOutlet=\"searchTempl.template; context:{item: item}\"></ng-container>\r\n        </ng-template>\r\n\r\n        <ng-template #searchDefault>\r\n            <input #searchInput class=\"c-input not-styled\" type=\"text\" [placeholder]=\"settings.searchPlaceholderText\" [(ngModel)]=\"filter\" (keyup)=\"filterFn($event.target.value)\">\r\n        </ng-template>\r\n\r\n\r\n        <span [hidden]=\"!hasValue(filter)\" (click)=\"clearSearch()\" class=\"material-icons icon-clear\">cancel</span>\r\n\r\n    </div>\r\n\r\n    <div class=\"filter-select-all\" *ngIf=\"!settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent\">\r\n\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"!settings.groupBy && filter?.length > 0 && filterLength > 0\" (click)=\"toggleFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isFilterSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" aria-labelledby=\"optionName\" />\r\n            <label>\r\n                <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\r\n                <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\r\n            </label>\r\n        </div>\r\n\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"settings.groupBy && filter?.length > 0 && groupedData?.length > 0\" (click)=\"toggleFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isFilterSelectAll && filter?.length > 0\" [disabled]=\"settings.limitSelection == selectedItems?.length\" />\r\n            <label>\r\n                <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\r\n                <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\r\n            </label>\r\n        </div>\r\n\r\n        <!-- <label class=\"nodata-label\" *ngIf=\"!settings.groupBy && filterLength == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">{{settings.noDataLabel}}</label>\r\n        <label class=\"nodata-label\" *ngIf=\"settings.groupBy && groupedData?.length == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">{{settings.noDataLabel}}</label> -->\r\n\r\n        <div class=\"btn-container\" *ngIf=\"settings.addNewItemOnFilter && filterLength == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">\r\n            <button class=\"d-btn btn-iceblue\" (click)=\"addFilterNewItem()\">{{settings.addNewButtonText}}</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"filter-select-all\" *ngIf=\"settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent\">\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"filter?.length > 0 && infiniteFilterLength > 0\" (click)=\"toggleInfiniteFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isInfiniteFilterSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" />\r\n            <label>\r\n                <span [hidden]=\"isInfiniteFilterSelectAll\">{{ settings.filterSelectAllText }}</span>\r\n                <span [hidden]=\"!isInfiniteFilterSelectAll\">{{ settings.filterUnSelectAllText }}</span>\r\n            </label>\r\n        </div>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && !settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <li *ngFor=\"let item of data | serSelectListFilter:filter : settings.searchBy; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                <label>{{ item[settings.labelKey] }}</label>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul virtualScroller #scroll [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\r\n            <li *ngFor=\"let item of scroll.viewPortItems; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                <label>{{item[settings.labelKey]}}</label>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && !settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <li *ngFor=\"let item of data | serSelectListFilter:filter : settings.searchBy; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                <label></label>\r\n                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul virtualScroller #scroll2 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\r\n            (vsEnd)=\"onScrollEnd($event)\" class=\"lazyContainer\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\">\r\n            <li *ngFor=\"let item of scroll2.viewPortItems; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\"  />\r\n                <label></label>\r\n                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul virtualScroller #scroll3 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\r\n            <span *ngFor=\"let item of scroll3.viewPortItems; let i = index;\">\r\n                <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\r\n                    class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label></label>\r\n                    <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n                </li>\r\n                <li *ngIf=\"item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\r\n                    class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label></label>\r\n                    <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n                </li>\r\n            </span>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && !settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\"  style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <span *ngFor=\"let item of groupedData; let i = index;\">\r\n                <li (click)=\"selectGroup(item)\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\" class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label>{{item[settings.labelKey]}}</label>\r\n                    <ul class=\"lazyContainer\">\r\n                        <span *ngFor=\"let val of item.list ; let j = index;\">\r\n                            <li (click)=\"onItemClick(val,j,$event); $event.stopPropagation()\" [ngClass]=\"{'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}\"\r\n                                class=\"pure-checkbox\">\r\n                                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(val)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val[settings.disabledKey]\"\r\n                                />\r\n                                <label></label>\r\n                                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: val}\"></ng-container>\r\n                            </li>\r\n                        </span>\r\n                    </ul>\r\n\r\n                </li>\r\n            </span>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <virtual-scroller [items]=\"groupedData\" (vsUpdate)=\"viewPortItems = $event\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\">\r\n            <ul virtualScroller #scroll4 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\r\n                (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\r\n                <span *ngFor=\"let item of scroll4.viewPortItems; let i = index;\">\r\n                    <li *ngIf=\"item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) }\"\r\n                        class=\"pure-checkbox\">\r\n                        <input *ngIf=\"settings.showCheckbox && !item.grpTitle && !settings.singleSelection\" type=\"checkbox\" [checked]=\"isSelected(item)\"\r\n                            [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                        <label>{{item[settings.labelKey]}}</label>\r\n                    </li>\r\n                    <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) }\"\r\n                        class=\"pure-checkbox\">\r\n                        <input *ngIf=\"settings.showCheckbox && !item.grpTitle\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\"\r\n                        />\r\n                        <label>{{item[settings.labelKey]}}</label>\r\n                    </li>\r\n                </span>\r\n            </ul>\r\n        </virtual-scroller>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && !settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <span *ngFor=\"let item of groupedData ; let i = index;\">\r\n                <li (click)=\"selectGroup(item)\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\" class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label>{{ item[settings.labelKey] }}</label>\r\n                    <ul class=\"lazyContainer\">\r\n                        <span *ngFor=\"let val of item.list ; let j = index;\">\r\n                            <li (click)=\"onItemClick(val,j,$event); $event.stopPropagation()\" [ngClass]=\"{'selected-item': isSelected(val) == true,'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}\" class=\"pure-checkbox\">\r\n                                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(val)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val[settings.disabledKey]\" />\r\n                                <label>{{val[settings.labelKey]}}</label>\r\n                            </li>\r\n                        </span>\r\n                    </ul>\r\n                </li>\r\n            </span>\r\n            <!-- <span *ngFor=\"let item of groupedData ; let i = index;\">\r\n            <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\r\n            <input *ngIf=\"settings.showCheckbox && !item.grpTitle\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\r\n            />\r\n            <label>{{item[settings.labelKey]}}</label>\r\n        </li>\r\n        <li *ngIf=\"item.grpTitle && !settings.selectGroup\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\r\n            <input *ngIf=\"settings.showCheckbox && settings.selectGroup\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\r\n            />\r\n            <label>{{item[settings.labelKey]}}</label>\r\n        </li>\r\n         <li  (click)=\"selectGroup(item)\" *ngIf=\"item.grpTitle && settings.selectGroup\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\r\n            <input *ngIf=\"settings.showCheckbox && settings.selectGroup\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\r\n            />\r\n            <label>{{item[settings.labelKey]}}</label>\r\n        </li>\r\n        </span> -->\r\n        </ul>\r\n    </div>\r\n\r\n    <h5 class=\"list-message\" *ngIf=\"!hasValue(data)\">{{ settings.noDataLabel }}</h5>\r\n\r\n</div>\r\n",
        host: { '[class]': 'defaultSettings.classes' },
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SerSelectComponent_1),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => SerSelectComponent_1),
                multi: true,
            }
        ],
        encapsulation: ViewEncapsulation.None
    }),
    __param(4, Optional()), __param(4, Attribute('multiple')),
    __param(5, Optional()), __param(5, Attribute('simple')), __param(6, Optional()), __param(6, Attribute('primaryKey')), __param(7, Optional()), __param(7, Attribute('labelKey'))
], SerSelectComponent);
export { SerSelectComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vc2VsZWN0L3Nlci1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdDQUF3QztBQUN4Qyw0Q0FBNEM7QUFDNUMsa0NBQWtDO0FBQ2xDLG1DQUFtQztBQUNuQyxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLDJDQUEyQztBQUMzQyx5Q0FBeUM7QUFDekMscUNBQXFDOzs7QUFFckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFOLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsYUFBYSxFQUEwQixNQUFNLGdCQUFnQixDQUFDO0FBRWhILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFnQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdC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QUFFLGFBQWE7Z0JBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQWtCLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxJQUFJO2FBQ2Q7U0FDSjtRQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO0tBQ3hDLENBQUM7SUFpSXNJLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN4SixXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUEsRUFBZSxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUEsRUFBbUIsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0dBakl6SSxrQkFBa0IsQ0E0N0I5QjtTQTU3Qlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXHJcbi8vIHRzbGludDpkaXNhYmxlOiBuby1vdXRwdXQtcmVuYW1lXHJcbi8vIHRzbGludDpkaXNhYmxlOiBuby1vdXRwdXQtb24tcHJlZml4XHJcbi8vIHRzbGludDpkaXNhYmxlOiBwcmVmZXItY29uc3RcclxuLy8gdHNsaW50OmRpc2FibGU6IG5vLWNvbmZsaWN0aW5nLWxpZmVjeWNsZVxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogY29tcG9uZW50LXNlbGVjdG9yXHJcblxyXG5pbXBvcnQgeyBBdHRyaWJ1dGUsIEhvc3RCaW5kaW5nLCBPcHRpb25hbCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdFbmNhcHN1bGF0aW9uLCBDb250ZW50Q2hpbGQsIFZpZXdDaGlsZCwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgVmFsaWRhdG9yLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRHJvcGRvd25TZXR0aW5ncyB9IGZyb20gJy4vc2VyLXNlbGVjdC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBTZXJTZWxlY3RMaXN0RmlsdGVyUGlwZSB9IGZyb20gJy4vc2VyLXNlbGVjdC1saXN0LWZpbHRlci5waXBlJztcclxuaW1wb3J0IHsgU0RJdGVtRGlyZWN0aXZlLCBTREJhZGdlRGlyZWN0aXZlLCBTRFNlYXJjaERpcmVjdGl2ZSB9IGZyb20gJy4vc2VyLXNlbGVjdC1tZW51LWl0ZW0uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuL3Nlci1zZWxlY3Quc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3ViamVjdCwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFZpcnR1YWxTY3JvbGxlckNvbXBvbmVudCB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tICcuLi8uLi91dGlscy9jaGVjayc7XHJcbmltcG9ydCB7IGluQXJyYXkgfSBmcm9tICcuLi8uLi91dGlscy9hcnJheSc7XHJcblxyXG5jb25zdCBub29wID0gKCkgPT4ge1xyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Nlci1zZWxlY3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Nlci1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgaG9zdDogeyAnW2NsYXNzXSc6ICdkZWZhdWx0U2V0dGluZ3MuY2xhc3NlcycgfSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlclNlbGVjdENvbXBvbmVudCksXHJcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlclNlbGVjdENvbXBvbmVudCksXHJcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMsIFZhbGlkYXRvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBkYXRhID0gW107XHJcblxyXG4gICAgQElucHV0KCkgc2V0dGluZ3M6IERyb3Bkb3duU2V0dGluZ3M7XHJcblxyXG4gICAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcclxuXHJcbiAgICBAT3V0cHV0KCdvblNlbGVjdCcpXHJcbiAgICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvbkRlU2VsZWN0JylcclxuICAgIG9uRGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25TZWxlY3RBbGwnKVxyXG4gICAgb25TZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvbkRlU2VsZWN0QWxsJylcclxuICAgIG9uRGVTZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvbk9wZW4nKVxyXG4gICAgb25PcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uQ2xvc2UnKVxyXG4gICAgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvblNjcm9sbFRvRW5kJylcclxuICAgIG9uU2Nyb2xsVG9FbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25GaWx0ZXJTZWxlY3RBbGwnKVxyXG4gICAgb25GaWx0ZXJTZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvbkZpbHRlckRlU2VsZWN0QWxsJylcclxuICAgIG9uRmlsdGVyRGVTZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvbkFkZEZpbHRlck5ld0l0ZW0nKVxyXG4gICAgb25BZGRGaWx0ZXJOZXdJdGVtOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uR3JvdXBTZWxlY3QnKVxyXG4gICAgb25Hcm91cFNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvbkdyb3VwRGVTZWxlY3QnKVxyXG4gICAgb25Hcm91cERlU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoU0RJdGVtRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBpdGVtVGVtcGw6IFNESXRlbURpcmVjdGl2ZTtcclxuICAgIEBDb250ZW50Q2hpbGQoU0RCYWRnZURpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgYmFkZ2VUZW1wbDogU0RCYWRnZURpcmVjdGl2ZTtcclxuICAgIEBDb250ZW50Q2hpbGQoU0RTZWFyY2hEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIHNlYXJjaFRlbXBsOiBTRFNlYXJjaERpcmVjdGl2ZTtcclxuXHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnKSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ3NlbGVjdGVkTGlzdCcpIHNlbGVjdGVkTGlzdEVsZW06IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdkcm9wZG93bkxpc3QnKSBkcm9wZG93bkxpc3RFbGVtOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKSBpc0Rpc2FibGVkID0gZmFsc2U7XHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpIGlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm11bHRpcGxlJykgbXVsdGlwbGVDbGFzcyA9IGZhbHNlO1xyXG5cclxuICAgIHZpcnR1YWxkYXRhOiBhbnkgPSBbXTtcclxuICAgIHNlYXJjaFRlcm0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuICAgIGZpbHRlclBpcGU6IFNlclNlbGVjdExpc3RGaWx0ZXJQaXBlO1xyXG4gICAgc2VsZWN0ZWRJdGVtczogYW55W10gPSBbXTtcclxuICAgIGlzU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICBpc0ZpbHRlclNlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgaXNJbmZpbml0ZUZpbHRlclNlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgZ3JvdXBlZERhdGE6IGFueVtdO1xyXG4gICAgZmlsdGVyOiBhbnk7XHJcbiAgICBjaHVua0FycmF5OiBhbnlbXTtcclxuICAgIHNjcm9sbFRvcDogYW55O1xyXG4gICAgY2h1bmtJbmRleDogYW55W10gPSBbXTtcclxuICAgIGNhY2hlZEl0ZW1zOiBhbnlbXSA9IFtdO1xyXG4gICAgZ3JvdXBDYWNoZWRJdGVtczogYW55W10gPSBbXTtcclxuICAgIHRvdGFsUm93czogYW55O1xyXG4gICAgaXRlbUhlaWdodDogYW55ID0gNDEuNjtcclxuICAgIHNjcmVlbkl0ZW1zTGVuOiBhbnk7XHJcbiAgICBjYWNoZWRJdGVtc0xlbjogYW55O1xyXG4gICAgdG90YWxIZWlnaHQ6IGFueTtcclxuICAgIHNjcm9sbGVyOiBhbnk7XHJcbiAgICBtYXhCdWZmZXI6IGFueTtcclxuICAgIGxhc3RTY3JvbGxlZDogYW55O1xyXG4gICAgbGFzdFJlcGFpbnRZOiBhbnk7XHJcbiAgICBzZWxlY3RlZExpc3RIZWlnaHQ6IGFueTtcclxuICAgIGZpbHRlckxlbmd0aDogYW55ID0gMDtcclxuICAgIGluZmluaXRlRmlsdGVyTGVuZ3RoOiBhbnkgPSAwO1xyXG4gICAgdmlld1BvcnRJdGVtczogYW55O1xyXG4gICAgaXRlbTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgZHJvcGRvd25TdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIGRlZmF1bHRTZXR0aW5nczogRHJvcGRvd25TZXR0aW5ncyA9IHtcclxuICAgICAgICBzaW5nbGVTZWxlY3Rpb246IHRydWUsXHJcbiAgICAgICAgZW5hYmxlQ2hlY2tBbGw6IHRydWUsXHJcbiAgICAgICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjY2lvbmFyIHRvZG8nLFxyXG4gICAgICAgIHVuU2VsZWN0QWxsVGV4dDogJ0Rlc2VsZWNjaW9uYXIgdG9kbycsXHJcbiAgICAgICAgZmlsdGVyU2VsZWN0QWxsVGV4dDogJ1NlbGVjY2lvbmFyIHRvZG9zIGxvcyByZXN1bHRhZG9zIGZpbHRyYWRvcycsXHJcbiAgICAgICAgZmlsdGVyVW5TZWxlY3RBbGxUZXh0OiAnRGVzZWxlY2Npb25hciB0b2RvcyBsb3MgcmVzdWx0YWRvcyBmaWx0cmFkb3MnLFxyXG4gICAgICAgIGVuYWJsZVNlYXJjaEZpbHRlcjogdHJ1ZSxcclxuICAgICAgICBzZWFyY2hCeTogWyduYW1lJ10sXHJcbiAgICAgICAgbWF4SGVpZ2h0OiAzMDAsXHJcbiAgICAgICAgYmFkZ2VTaG93TGltaXQ6IDk5OTk5OTk5OTk5OSxcclxuICAgICAgICBjbGFzc2VzOiAnJyxcclxuICAgICAgICBzZWFyY2hQbGFjZWhvbGRlclRleHQ6ICdCdXNjYXInLFxyXG4gICAgICAgIHNob3dDaGVja2JveDogdHJ1ZSxcclxuICAgICAgICBub0RhdGFMYWJlbDogJ1NpbiBkYXRvcyBkaXNwb25pYmxlcycsXHJcbiAgICAgICAgbGF6eUxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGxhYmVsS2V5OiAnbmFtZScsXHJcbiAgICAgICAgcHJpbWFyeUtleTogJ2lkJyxcclxuICAgICAgICBkaXNhYmxlZEtleTogJ2Rpc2FibGVkJyxcclxuICAgICAgICBlbmFibGVGaWx0ZXJTZWxlY3RBbGw6IHRydWUsXHJcbiAgICAgICAgc2VsZWN0R3JvdXA6IGZhbHNlLFxyXG4gICAgICAgIGFkZE5ld0l0ZW1PbkZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgYWRkTmV3QnV0dG9uVGV4dDogJ0FncmVnYXInLFxyXG4gICAgICAgIGVzY2FwZVRvQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgY2xlYXJBbGw6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgcmFuZG9tU2l6ZSA9IHRydWU7XHJcbiAgICBwdWJsaWMgcGFyc2VFcnJvcjogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBmaWx0ZXJlZExpc3Q6IGFueSA9IFtdO1xyXG4gICAgdmlydHVhbFNjcm9vbGxJbml0ID0gZmFsc2U7XHJcbiAgICBAVmlld0NoaWxkKFZpcnR1YWxTY3JvbGxlckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgICBwcml2YXRlIHZpcnR1YWxTY3JvbGxlcjogVmlydHVhbFNjcm9sbGVyQ29tcG9uZW50O1xyXG4gICAgcHVibGljIGlzRGlzYWJsZWRJdGVtUHJlc2VudCA9IGZhbHNlO1xyXG5cclxuICAgIGhhc1ZhbHVlID0gaGFzVmFsdWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZHM6IERhdGFTZXJ2aWNlLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBAT3B0aW9uYWwoKSBAQXR0cmlidXRlKCdtdWx0aXBsZScpIG11bHRpcGxlQXR0cjogYW55LFxyXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEF0dHJpYnV0ZSgnc2ltcGxlJykgc2ltcGxlOiBhbnksIEBPcHRpb25hbCgpIEBBdHRyaWJ1dGUoJ3ByaW1hcnlLZXknKSBwcmltYXJ5S2V5OiBhbnksIEBPcHRpb25hbCgpIEBBdHRyaWJ1dGUoJ2xhYmVsS2V5JykgbGFiZWxLZXk6IGFueSkge1xyXG5cclxuICAgICAgICB0aGlzLm11bHRpcGxlID0gbXVsdGlwbGVBdHRyICE9PSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRTZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaW1wbGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3MuZW5hYmxlU2VhcmNoRmlsdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzLmNsZWFyQWxsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJpbWFyeUtleSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRTZXR0aW5ncy5wcmltYXJ5S2V5ID0gcHJpbWFyeUtleTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsYWJlbEtleSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRTZXR0aW5ncy5sYWJlbEtleSA9IGxhYmVsS2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtJC5hc09ic2VydmFibGUoKS5waXBlKFxyXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMTAwMCksXHJcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgICAgIHRhcCh0ZXJtID0+IHRlcm0pXHJcbiAgICAgICAgKS5zdWJzY3JpYmUodmFsID0+IHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbmZpbml0ZUxpc3QodmFsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHRoaXMuc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICB0aGlzLm11bHRpcGxlQ2xhc3MgPSAhdGhpcy5zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb247XHJcblxyXG4gICAgICAgIHRoaXMuY2FjaGVkSXRlbXMgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5kYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmRzLmdldERhdGEoKS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuID0gMDtcclxuICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgob2JqOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEaXNhYmxlZEl0ZW1QcmVzZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoJ2dycFRpdGxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckxlbmd0aCA9IGxlbjtcclxuICAgICAgICAgICAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlydHVhbFNjcm9vbGxJbml0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG5cclxuICAgICAgICBpZiAoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuZmlyc3RDaGFuZ2UpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBlZERhdGEgPSB0aGlzLnRyYW5zZm9ybURhdGEodGhpcy5kYXRhLCB0aGlzLnNldHRpbmdzLmdyb3VwQnkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cENhY2hlZEl0ZW1zID0gdGhpcy5jbG9uZUFycmF5KHRoaXMuZ3JvdXBlZERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhY2hlZEl0ZW1zID0gdGhpcy5jbG9uZUFycmF5KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2hhbmdlcy5zZXR0aW5ncyAmJiAhY2hhbmdlcy5zZXR0aW5ncy5maXJzdENoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTZXR0aW5ncywgdGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2hhbmdlcy5sb2FkaW5nKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncz8ubGF6eUxvYWRpbmcgJiYgdGhpcy52aXJ0dWFsU2Nyb29sbEluaXQgJiYgY2hhbmdlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEgPSBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5kcm9wZG93bkxpc3RFbGVtLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbUNsaWNrKGl0ZW06IGFueSwgazogbnVtYmVyLCBlOiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCB8fCBpdGVtW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmb3VuZCA9IHRoaXMuaXNTZWxlY3RlZChpdGVtKTtcclxuICAgICAgICBsZXQgbGltaXQgPSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoIDwgdGhpcy5zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5saW1pdFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWQoaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMub25EZVNlbGVjdC5lbWl0KGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdEFsbCB8fCB0aGlzLmRhdGEubGVuZ3RoID4gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA9PT0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdyb3VwSW5mbyhpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlKGM6IEZvcm1Db250cm9sKTogYW55IHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKGhhc1ZhbHVlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignQXJyYXkgZGV0ZWN0ZWQgYXMgaW5wdXQsIHBsZWFzZSBhZGQgXCJtdWx0aXBsZVwiIGF0dHJpYnV0ZSBpbiB0aGUgc2VsZWN0IG9yIHNldCBcInNpbmdsZVNlbGVjdGlvblwiIHNldHRpbmcgaW4gZmFsc2UnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZE9iamVjdCA9IHRoaXMuZGF0YT8uZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldID09PSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChoYXNWYWx1ZShzZWxlY3RlZE9iamVjdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbc2VsZWN0ZWRPYmplY3RdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignTm8gcHJpbWFyeUtleSBmaW5kZWQgaW4gb3B0aW9ucywgcGxlYXNlIHNldCBcInByaW1hcnlLZXlcIiBzZXR0aW5nIHdpdGggdGhlIGNvcnJlY3QgdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YSA9IHRoaXMudHJhbnNmb3JtRGF0YSh0aGlzLmRhdGEsIHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cENhY2hlZEl0ZW1zID0gdGhpcy5jbG9uZUFycmF5KHRoaXMuZ3JvdXBlZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1NpbmdsZSB2YWx1ZSBkZXRlY3RlZCBhcyBpbnB1dCwgcGxlYXNlIHNldCBcInNpbmdsZVNlbGVjdGlvblwiIHNldHRpbmcgaW4gdHJ1ZSBvciByZW1vdmUgXCJtdWx0aXBsZVwiIGF0dHJpYnV0ZSBpbiB0aGUgc2VsZWN0IGlmIHlvdSBhZGRlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkT2JqZWN0cyA9IHRoaXMuZGF0YT8uZmlsdGVyKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbkFycmF5KGl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhhc1ZhbHVlKHNlbGVjdGVkT2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5saW1pdFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBzZWxlY3RlZE9iamVjdHMuc2xpY2UoMCwgdGhpcy5zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRPYmplY3RzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ05vIHByaW1hcnlLZXkgZmluZGVkIGluIG9wdGlvbnMsIHBsZWFzZSBzZXQgXCJwcmltYXJ5S2V5XCIgc2V0dGluZyB3aXRoIHRoZSBjb3JyZWN0IHZhbHVlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPT09IHRoaXMuZGF0YS5sZW5ndGggJiYgdGhpcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YSA9IHRoaXMudHJhbnNmb3JtRGF0YSh0aGlzLmRhdGEsIHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cENhY2hlZEl0ZW1zID0gdGhpcy5jbG9uZUFycmF5KHRoaXMuZ3JvdXBlZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1lbWJlci1vcmRlcmluZ1xyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtZW1iZXItb3JkZXJpbmdcclxuICAgIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICB0cmFja0J5Rm4oaXRlbTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBpc1NlbGVjdGVkKGNsaWNrZWRJdGVtOiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKGNsaWNrZWRJdGVtW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoaGFzVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5zZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZEl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSA9PT0gaXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2VsZWN0ZWQoaXRlbTogYW55KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbaXRlbV07XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhpdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0pO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKGl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5tYXAoZWxlbWVudCA9PiBlbGVtZW50W3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0pO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soaXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKGl0ZW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlU2VsZWN0ZWQoY2xpY2tlZEl0ZW06IGFueSkge1xyXG5cclxuICAgICAgICBpZiAoaGFzVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldID09PSBpdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vI3JlZ2lvbiBkcm9wZG93biBzdGF0dXNcclxuXHJcbiAgICB0b2dnbGVEcm9wZG93bihldnQ6IGFueSkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSAhdGhpcy5pc0FjdGl2ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxhenlMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9vbGxJbml0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuRHJvcGRvd24oKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcGRvd25TdWJzLnB1c2goXHJcbiAgICAgICAgICAgIGZyb21FdmVudCh3aW5kb3csICdjbGljaycpXHJcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcigoZTogTW91c2VFdmVudCkgPT4gIXRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnRhcmdldCkgKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlRHJvcGRvd24oKSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5wdXNoKFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQod2luZG93LCAna2V5dXAnKVxyXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoKGU6IEtleWJvYXJkRXZlbnQpID0+IGUua2V5LnRvTG93ZXJDYXNlKCkgPT09ICdlc2NhcGUnICYmIHRoaXMuc2V0dGluZ3MuZXNjYXBlVG9DbG9zZSApKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VEcm9wZG93bigpIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5wdXNoKFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsJykuc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKCdzY3JvbGwnKSApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93blN1YnMucHVzaChcclxuICAgICAgICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldFBvc2l0aW9uRHJvcGRvd24oKSApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkRyb3Bkb3duKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5kcm9wZG93bkxpc3RFbGVtLm5hdGl2ZUVsZW1lbnQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVTZWFyY2hGaWx0ZXIgJiYgIXRoaXMuc2VhcmNoVGVtcGwpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0Py5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbk9wZW4uZW1pdCh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VEcm9wZG93bigpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNsZWFyU2VhcmNoKCk7XHJcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpICk7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93blN1YnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5kcm9wZG93bkxpc3RFbGVtLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBvc2l0aW9uRHJvcGRvd24oKSB7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSAodGhpcy5kcm9wZG93bkxpc3RFbGVtLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTERpdkVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBlbCA9ICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCByZW1haW5pbmdIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gKGRyb3Bkb3duLm9mZnNldEhlaWdodCArIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGVsLm9mZnNldEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ3dpZHRoJywgKGVsLm9mZnNldFdpZHRoKSArICdweCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ2xlZnQnLCAoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCkgKyAncHgnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmdIZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhlbCwgJ29udG9wJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhkcm9wZG93biwgJ29udG9wJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2JvdHRvbScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZHJvcGRvd24sICd0b3AnLCBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gKyAncHgnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGVsLCAnb250b3AnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGRyb3Bkb3duLCAnb250b3AnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndG9wJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ2JvdHRvbScsIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSArICdweCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIHRvZ2dsZVNlbGVjdEFsbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RBbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBlZERhdGEuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gIW9ialt0aGlzLnNldHRpbmdzLmRpc2FibGVkS2V5XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cENhY2hlZEl0ZW1zLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9ICFvYmpbdGhpcy5zZXR0aW5ncy5kaXNhYmxlZEtleV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0aGlzLnNlbGVjdGVkSXRlbXMgPSB0aGlzLmRhdGEuc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gdGhpcy5kYXRhLmZpbHRlcigoaW5kaXZpZHVhbERhdGEpID0+ICFpbmRpdmlkdWFsRGF0YVt0aGlzLnNldHRpbmdzLmRpc2FibGVkS2V5XSk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdEFsbC5lbWl0KHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YS5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cENhY2hlZEl0ZW1zLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25EZVNlbGVjdEFsbC5lbWl0KHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckZuKHZhbHVlOiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSAmJiAhdGhpcy5zZXR0aW5ncy5sYXp5TG9hZGluZykge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckdyb3VwZWRMaXN0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLmxhenlMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGVybSQubmV4dCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJHcm91cGVkTGlzdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIgPT09ICcnIHx8IHRoaXMuZmlsdGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclNlYXJjaCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gdGhpcy5jbG9uZUFycmF5KHRoaXMuZ3JvdXBDYWNoZWRJdGVtcyk7XHJcbiAgICAgICAgdGhpcy5ncm91cGVkRGF0YSA9IHRoaXMuZ3JvdXBlZERhdGEuZmlsdGVyKG9iaiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICAgICAgaWYgKG9ialt0aGlzLnNldHRpbmdzLmxhYmVsS2V5XS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gb2JqLmxpc3Q7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBvYmoubGlzdC5maWx0ZXIodCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRbdGhpcy5zZXR0aW5ncy5sYWJlbEtleV0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuZmlsdGVyLnRvTG93ZXJDYXNlKCkpID4gLTE7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb2JqLmxpc3QgPSBhcnI7XHJcbiAgICAgICAgICAgIGlmIChvYmpbdGhpcy5zZXR0aW5ncy5sYWJlbEtleV0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuZmlsdGVyLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyLnNvbWUoY2F0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2F0W3RoaXMuc2V0dGluZ3MubGFiZWxLZXldLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLmZpbHRlci50b0xvd2VyQ2FzZSgpKSA+IC0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVGaWx0ZXJTZWxlY3RBbGwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRmlsdGVyU2VsZWN0QWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBhZGRlZCA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XHJcbiAgICAgICAgICAgICAgICAvKiAgICAgICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5saXN0LmZvckVhY2goKGVsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZChlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkLnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR3JvdXBJbmZvKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgKi9cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRzLmdldEZpbHRlcmVkRGF0YSgpLmZvckVhY2goKGVsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZChlbCkgJiYgIWVsLmhhc093blByb3BlcnR5KCdncnBUaXRsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWQoZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRlZC5wdXNoKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRzLmdldEZpbHRlcmVkRGF0YSgpLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzRmlsdGVyU2VsZWN0QWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbkZpbHRlclNlbGVjdEFsbC5lbWl0KGFkZGVkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmVtb3ZlZCA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XHJcbiAgICAgICAgICAgICAgICAvKiAgICAgICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5saXN0LmZvckVhY2goKGVsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcy5nZXRGaWx0ZXJlZERhdGEoKS5mb3JFYWNoKChlbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZChlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQucHVzaChlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRzLmdldEZpbHRlcmVkRGF0YSgpLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzRmlsdGVyU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub25GaWx0ZXJEZVNlbGVjdEFsbC5lbWl0KHJlbW92ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVJbmZpbml0ZUZpbHRlclNlbGVjdEFsbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNJbmZpbml0ZUZpbHRlclNlbGVjdEFsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5pc0luZmluaXRlRmlsdGVyU2VsZWN0QWxsID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5pc0luZmluaXRlRmlsdGVyU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyU2VhcmNoKCkge1xyXG5cclxuICAgICAgICB0aGlzLmZpbHRlciA9ICcnO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5sYXp5TG9hZGluZykge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc0luZmluaXRlRmlsdGVyU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YSA9IHRoaXMuY2FjaGVkSXRlbXM7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBlZERhdGEgPSB0aGlzLmdyb3VwQ2FjaGVkSXRlbXM7XHJcbiAgICAgICAgICAgIHRoaXMuaW5maW5pdGVGaWx0ZXJMZW5ndGggPSAwO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gdGhpcy5jbG9uZUFycmF5KHRoaXMuZ3JvdXBDYWNoZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0Py5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfSwgMCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRmlsdGVyQ2hhbmdlKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlciA9PT0gJycgfHwgZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY250ID0gMDtcclxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpdGVtLmhhc093blByb3BlcnR5KCdncnBUaXRsZScpICYmIHRoaXMuaXNTZWxlY3RlZChpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgY250Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNudCA+IDAgJiYgdGhpcy5maWx0ZXJMZW5ndGggPT09IGNudCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzRmlsdGVyU2VsZWN0QWxsID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNudCA+IDAgJiYgdGhpcy5maWx0ZXJMZW5ndGggIT09IGNudCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzRmlsdGVyU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9uZUFycmF5KGFycjogYW55KSB7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXJyKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aHJvdyAnQ2Fubm90IGNsb25lIGFycmF5IGNvbnRhaW5pbmcgYW4gb2JqZWN0ISc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlR3JvdXBJbmZvKGl0ZW06IGFueSkge1xyXG4gICAgICAgIGlmIChpdGVtW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuc2V0dGluZ3MuZ3JvdXBCeTtcclxuICAgICAgICB0aGlzLmdyb3VwZWREYXRhLmZvckVhY2goKG9iajogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjbnQgPSAwO1xyXG4gICAgICAgICAgICBpZiAob2JqLmdycFRpdGxlICYmIChpdGVtW2tleV0gPT09IG9ialtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5saXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxpc3QuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY250Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqLmxpc3QgJiYgKGNudCA9PT0gb2JqLmxpc3QubGVuZ3RoKSAmJiAoaXRlbVtrZXldID09PSBvYmpba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqLmxpc3QgJiYgKGNudCAhPT0gb2JqLmxpc3QubGVuZ3RoKSAmJiAoaXRlbVtrZXldID09PSBvYmpba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ncm91cENhY2hlZEl0ZW1zLmZvckVhY2goKG9iajogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjbnQgPSAwO1xyXG4gICAgICAgICAgICBpZiAob2JqLmdycFRpdGxlICYmIChpdGVtW2tleV0gPT09IG9ialtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5saXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxpc3QuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY250Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqLmxpc3QgJiYgKGNudCA9PT0gb2JqLmxpc3QubGVuZ3RoKSAmJiAoaXRlbVtrZXldID09PSBvYmpba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqLmxpc3QgJiYgKGNudCAhPT0gb2JqLmxpc3QubGVuZ3RoKSAmJiAoaXRlbVtrZXldID09PSBvYmpba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtRGF0YShhcnI6IEFycmF5PGFueT4sIGZpZWxkOiBhbnkpOiBBcnJheTxhbnk+IHtcclxuICAgICAgICBjb25zdCBncm91cGVkT2JqOiBhbnkgPSBhcnIucmVkdWNlKChwcmV2OiBhbnksIGN1cjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcHJldltjdXJbZmllbGRdXSkge1xyXG4gICAgICAgICAgICAgICAgcHJldltjdXJbZmllbGRdXSA9IFtjdXJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJldltjdXJbZmllbGRdXS5wdXNoKGN1cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgICAgIGNvbnN0IHRlbXBBcnI6IGFueSA9IFtdO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGdyb3VwZWRPYmopLm1hcCgoeDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgZGlzYWJsZWRDaGlsZHJlbnMgPSBbXTtcclxuICAgICAgICAgICAgb2JqLmdycFRpdGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgb2JqW3RoaXMuc2V0dGluZ3MubGFiZWxLZXldID0geDtcclxuICAgICAgICAgICAgb2JqW3RoaXMuc2V0dGluZ3MuZ3JvdXBCeV0gPSB4O1xyXG4gICAgICAgICAgICBvYmouc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgb2JqLmxpc3QgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGNudCA9IDA7XHJcbiAgICAgICAgICAgIGdyb3VwZWRPYmpbeF0uZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0Rpc2FibGVkSXRlbVByZXNlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkQ2hpbGRyZW5zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYmoubGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNudCA9PT0gb2JqLmxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgZ3JvdXAgaXRlbSdzIGFsbCBjaGlsZHJlbnMgYXJlIGRpc2FibGVkIG9yIG5vdFxyXG4gICAgICAgICAgICBvYmpbdGhpcy5zZXR0aW5ncy5kaXNhYmxlZEtleV0gPSBkaXNhYmxlZENoaWxkcmVucy5sZW5ndGggPT09IGdyb3VwZWRPYmpbeF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICB0ZW1wQXJyLnB1c2gob2JqKTtcclxuICAgICAgICAgICAgLy8gb2JqLmxpc3QuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICB0ZW1wQXJyLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0ZW1wQXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXJJbmZpbml0ZUxpc3QoZXZ0OiBhbnkpIHtcclxuICAgICAgICBsZXQgZmlsdGVyZWRFbGVtczogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YSA9IHRoaXMuZ3JvdXBDYWNoZWRJdGVtcy5zbGljZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuY2FjaGVkSXRlbXMuc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YSA9IHRoaXMuY2FjaGVkSXRlbXMuc2xpY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgoZXZ0ICE9IG51bGwgfHwgZXZ0ICE9PSAnJykgJiYgIXRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zZWFyY2hCeS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuc2V0dGluZ3Muc2VhcmNoQnkubGVuZ3RoOyB0KyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YS5maWx0ZXIoKGVsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsW3RoaXMuc2V0dGluZ3Muc2VhcmNoQnlbdF0udG9TdHJpbmcoKV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZXZ0LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRFbGVtcy5wdXNoKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEuZmlsdGVyKChlbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxbcHJvcF0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZXZ0LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRFbGVtcy5wdXNoKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhID0gZmlsdGVyZWRFbGVtcztcclxuICAgICAgICAgICAgdGhpcy5pbmZpbml0ZUZpbHRlckxlbmd0aCA9IHRoaXMudmlydHVhbGRhdGEubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZ0LnRvU3RyaW5nKCkgIT09ICcnICYmIHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhLmZpbHRlcigoZWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsLmhhc093blByb3BlcnR5KCdncnBUaXRsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRFbGVtcy5wdXNoKGVsKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxbcHJvcF0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZXZ0LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRFbGVtcy5wdXNoKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gZmlsdGVyZWRFbGVtcztcclxuICAgICAgICAgICAgdGhpcy5pbmZpbml0ZUZpbHRlckxlbmd0aCA9IHRoaXMuZ3JvdXBlZERhdGEubGVuZ3RoO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZ0LnRvU3RyaW5nKCkgPT09ICcnICYmIHRoaXMuY2FjaGVkSXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEgPSB0aGlzLmNhY2hlZEl0ZW1zO1xyXG4gICAgICAgICAgICB0aGlzLmluZmluaXRlRmlsdGVyTGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsZXIucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2Nyb2xsRW5kKGU6IGFueSkge1xyXG4gICAgICAgIGlmIChlLmVuZEluZGV4ID09PSB0aGlzLmRhdGEubGVuZ3RoIC0gMSB8fCBlLnN0YXJ0SW5kZXggPT09IDApIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uU2Nyb2xsVG9FbmQuZW1pdChlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RHcm91cChpdGVtOiBhbnkpIHtcclxuICAgICAgICBpZiAoaXRlbVt0aGlzLnNldHRpbmdzLmRpc2FibGVkS2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaXRlbS5saXN0LmZvckVhY2goKG9iajogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKG9iaik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vbkdyb3VwRGVTZWxlY3QuZW1pdChpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVHcm91cEluZm8oaXRlbSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpdGVtLmxpc3QuZm9yRWFjaCgob2JqOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKG9iaikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5vbkdyb3VwU2VsZWN0LmVtaXQoaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR3JvdXBJbmZvKGl0ZW0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGRGaWx0ZXJOZXdJdGVtKCkge1xyXG4gICAgICAgIHRoaXMub25BZGRGaWx0ZXJOZXdJdGVtLmVtaXQodGhpcy5maWx0ZXIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyUGlwZSA9IG5ldyBTZXJTZWxlY3RMaXN0RmlsdGVyUGlwZSh0aGlzLmRzKTtcclxuICAgICAgICB0aGlzLmZpbHRlclBpcGUudHJhbnNmb3JtKHRoaXMuZGF0YSwgdGhpcy5maWx0ZXIsIHRoaXMuc2V0dGluZ3Muc2VhcmNoQnkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyU2VsZWN0aW9uKGU6IE1vdXNlRXZlbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwQ2FjaGVkSXRlbXMuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNsZWFyU2VhcmNoKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uRGVTZWxlY3RBbGwuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG5cclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1Db250ZXh0KGl0ZW06IGFueSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93blN1YnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=