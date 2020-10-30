// tslint:disable: no-use-before-declare
// tslint:disable: no-host-metadata-property
// tslint:disable: max-line-length
// tslint:disable: no-output-rename
// tslint:disable: no-output-on-prefix
// tslint:disable: prefer-const
// tslint:disable: no-conflicting-lifecycle
// tslint:disable: component-class-suffix
// tslint:disable: component-selector
import { __decorate, __param, __values } from "tslib";
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
var noop = function () {
};
var ɵ0 = noop;
var SerSelectComponent = /** @class */ (function () {
    function SerSelectComponent(_elementRef, cdr, ds, _renderer, multipleAttr, simple, primaryKey, labelKey) {
        var _this = this;
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
        this.searchTerm$.asObservable().pipe(debounceTime(1000), distinctUntilChanged(), tap(function (term) { return term; })).subscribe(function (val) {
            _this.filterInfiniteList(val);
        });
    }
    SerSelectComponent_1 = SerSelectComponent;
    SerSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.multipleClass = !this.settings.singleSelection;
        this.cachedItems = this.cloneArray(this.data);
        this.subscription = this.ds.getData().subscribe(function (data) {
            if (data) {
                var len_1 = 0;
                data.forEach(function (obj) {
                    if (obj[_this.settings.disabledKey]) {
                        _this.isDisabledItemPresent = true;
                    }
                    if (!obj.hasOwnProperty('grpTitle')) {
                        len_1++;
                    }
                });
                _this.filterLength = len_1;
                _this.onFilterChange(data);
            }
        });
        this.virtualScroollInit = false;
    };
    SerSelectComponent.prototype.ngOnChanges = function (changes) {
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
    };
    SerSelectComponent.prototype.ngAfterViewInit = function () {
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    };
    SerSelectComponent.prototype.onItemClick = function (item, k, e) {
        if (this.isDisabled || item[this.settings.disabledKey]) {
            return false;
        }
        var found = this.isSelected(item);
        var limit = this.selectedItems.length < this.settings.limitSelection ? true : false;
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
    };
    SerSelectComponent.prototype.validate = function (c) {
        return null;
    };
    SerSelectComponent.prototype.writeValue = function (value) {
        var _this = this;
        var _a, _b;
        if (hasValue(value)) {
            if (this.settings.singleSelection) {
                if (Array.isArray(value)) {
                    throw Error('Array detected as input, please add "multiple" attribute in the select or set "singleSelection" setting in false');
                }
                var selectedObject = (_a = this.data) === null || _a === void 0 ? void 0 : _a.find(function (item) {
                    return item[_this.settings.primaryKey] === value;
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
                var selectedObjects = (_b = this.data) === null || _b === void 0 ? void 0 : _b.filter(function (item) {
                    return inArray(item[_this.settings.primaryKey], value);
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
    };
    SerSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    SerSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    SerSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    SerSelectComponent.prototype.trackByFn = function (item) {
        return item[this.settings.primaryKey];
    };
    SerSelectComponent.prototype.isSelected = function (clickedItem) {
        var e_1, _a;
        if (clickedItem[this.settings.disabledKey]) {
            return false;
        }
        var found = false;
        if (hasValue(this.selectedItems)) {
            try {
                for (var _b = __values(this.selectedItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                        found = true;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return found;
    };
    SerSelectComponent.prototype.addSelected = function (item) {
        var _this = this;
        if (this.settings.singleSelection) {
            this.selectedItems = [item];
            this.onChangeCallback(item[this.settings.primaryKey]);
            this.onTouchedCallback(item[this.settings.primaryKey]);
            this.closeDropdown();
        }
        else {
            this.selectedItems.push(item);
            var items = this.selectedItems.map(function (element) { return element[_this.settings.primaryKey]; });
            this.onChangeCallback(items);
            this.onTouchedCallback(items);
        }
    };
    SerSelectComponent.prototype.removeSelected = function (clickedItem) {
        var _this = this;
        if (hasValue(this.selectedItems)) {
            this.selectedItems.forEach(function (item, index) {
                if (clickedItem[_this.settings.primaryKey] === item[_this.settings.primaryKey]) {
                    _this.selectedItems.splice(index, 1);
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
    };
    //#region dropdown status
    SerSelectComponent.prototype.toggleDropdown = function (evt) {
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
    };
    SerSelectComponent.prototype.openDropdown = function () {
        var _this = this;
        if (this.isDisabled) {
            return false;
        }
        this.isActive = true;
        this.dropdownSubs.push(fromEvent(window, 'click')
            .pipe(filter(function (e) { return !_this._elementRef.nativeElement.contains(e.target); }))
            .subscribe(function () { return _this.closeDropdown(); }));
        this.dropdownSubs.push(fromEvent(window, 'keyup')
            .pipe(filter(function (e) { return e.key.toLowerCase() === 'escape' && _this.settings.escapeToClose; }))
            .subscribe(function () { return _this.closeDropdown(); }));
        this.dropdownSubs.push(fromEvent(this._elementRef.nativeElement, 'scroll').subscribe(function () { return console.log('scroll'); }));
        this.dropdownSubs.push(fromEvent(window, 'resize').subscribe(function () { return _this.setPositionDropdown(); }));
        this.setPositionDropdown();
        this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
        if (this.settings.enableSearchFilter && !this.searchTempl) {
            setTimeout(function () {
                var _a;
                (_a = _this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
            }, 0);
        }
        this.onOpen.emit(true);
    };
    SerSelectComponent.prototype.closeDropdown = function () {
        if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
        this.clearSearch();
        this.isActive = false;
        this.dropdownSubs.forEach(function (s) { return s.unsubscribe(); });
        this.dropdownSubs = [];
        this.onClose.emit(false);
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    };
    SerSelectComponent.prototype.setPositionDropdown = function () {
        var _this = this;
        setTimeout(function () {
            var dropdown = _this.dropdownListElem.nativeElement;
            var el = _this._elementRef.nativeElement;
            var remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);
            _this._renderer.setStyle(dropdown, 'width', (el.offsetWidth) + 'px');
            _this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left) + 'px');
            if (remainingHeight > 0) {
                _this._renderer.removeClass(el, 'ontop');
                _this._renderer.removeClass(dropdown, 'ontop');
                _this._elementRef.nativeElement.style.removeProperty('bottom');
                _this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
            }
            else {
                _this._renderer.addClass(el, 'ontop');
                _this._renderer.addClass(dropdown, 'ontop');
                _this._elementRef.nativeElement.style.removeProperty('top');
                _this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
            }
        });
    };
    //#endregion
    SerSelectComponent.prototype.toggleSelectAll = function () {
        var _this = this;
        if (!this.isSelectAll) {
            this.selectedItems = [];
            if (this.settings.groupBy) {
                this.groupedData.forEach(function (obj) {
                    obj.selected = !obj[_this.settings.disabledKey];
                });
                this.groupCachedItems.forEach(function (obj) {
                    obj.selected = !obj[_this.settings.disabledKey];
                });
            }
            // this.selectedItems = this.data.slice();
            this.selectedItems = this.data.filter(function (individualData) { return !individualData[_this.settings.disabledKey]; });
            this.isSelectAll = true;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
            this.onSelectAll.emit(this.selectedItems);
        }
        else {
            if (this.settings.groupBy) {
                this.groupedData.forEach(function (obj) {
                    obj.selected = false;
                });
                this.groupCachedItems.forEach(function (obj) {
                    obj.selected = false;
                });
            }
            this.selectedItems = [];
            this.isSelectAll = false;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
            this.onDeSelectAll.emit(this.selectedItems);
        }
    };
    SerSelectComponent.prototype.filterFn = function (value) {
        if (this.settings.groupBy && !this.settings.lazyLoading) {
            this.filterGroupedList();
        }
        else if (this.settings.lazyLoading) {
            this.searchTerm$.next(value);
        }
    };
    SerSelectComponent.prototype.filterGroupedList = function () {
        var _this = this;
        if (this.filter === '' || this.filter == null) {
            this.clearSearch();
            return;
        }
        this.groupedData = this.cloneArray(this.groupCachedItems);
        this.groupedData = this.groupedData.filter(function (obj) {
            var arr = [];
            if (obj[_this.settings.labelKey].toLowerCase().indexOf(_this.filter.toLowerCase()) > -1) {
                arr = obj.list;
            }
            else {
                arr = obj.list.filter(function (t) {
                    return t[_this.settings.labelKey].toLowerCase().indexOf(_this.filter.toLowerCase()) > -1;
                });
            }
            obj.list = arr;
            if (obj[_this.settings.labelKey].toLowerCase().indexOf(_this.filter.toLowerCase()) > -1) {
                return arr;
            }
            else {
                return arr.some(function (cat) {
                    return cat[_this.settings.labelKey].toLowerCase().indexOf(_this.filter.toLowerCase()) > -1;
                });
            }
        });
    };
    SerSelectComponent.prototype.toggleFilterSelectAll = function () {
        var _this = this;
        if (!this.isFilterSelectAll) {
            var added_1 = [];
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
                this.ds.getFilteredData().forEach(function (el) {
                    if (!_this.isSelected(el) && !el.hasOwnProperty('grpTitle')) {
                        _this.addSelected(el);
                        added_1.push(el);
                    }
                });
            }
            else {
                this.ds.getFilteredData().forEach(function (item) {
                    if (!_this.isSelected(item)) {
                        _this.addSelected(item);
                        added_1.push(item);
                    }
                });
            }
            this.isFilterSelectAll = true;
            this.onFilterSelectAll.emit(added_1);
        }
        else {
            var removed_1 = [];
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
                this.ds.getFilteredData().forEach(function (el) {
                    if (_this.isSelected(el)) {
                        _this.removeSelected(el);
                        removed_1.push(el);
                    }
                });
            }
            else {
                this.ds.getFilteredData().forEach(function (item) {
                    if (_this.isSelected(item)) {
                        _this.removeSelected(item);
                        removed_1.push(item);
                    }
                });
            }
            this.isFilterSelectAll = false;
            this.onFilterDeSelectAll.emit(removed_1);
        }
    };
    SerSelectComponent.prototype.toggleInfiniteFilterSelectAll = function () {
        var _this = this;
        if (!this.isInfiniteFilterSelectAll) {
            this.virtualdata.forEach(function (item) {
                if (!_this.isSelected(item)) {
                    _this.addSelected(item);
                }
            });
            this.isInfiniteFilterSelectAll = true;
        }
        else {
            this.virtualdata.forEach(function (item) {
                if (_this.isSelected(item)) {
                    _this.removeSelected(item);
                }
            });
            this.isInfiniteFilterSelectAll = false;
        }
    };
    SerSelectComponent.prototype.clearSearch = function () {
        var _this = this;
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
        setTimeout(function () {
            var _a;
            (_a = _this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
        }, 0);
    };
    SerSelectComponent.prototype.onFilterChange = function (data) {
        var _this = this;
        if (this.filter && this.filter === '' || data.length === 0) {
            this.isFilterSelectAll = false;
        }
        var cnt = 0;
        data.forEach(function (item) {
            if (!item.hasOwnProperty('grpTitle') && _this.isSelected(item)) {
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
    };
    SerSelectComponent.prototype.cloneArray = function (arr) {
        if (Array.isArray(arr)) {
            return JSON.parse(JSON.stringify(arr));
        }
        else if (typeof arr === 'object') {
            throw 'Cannot clone array containing an object!';
        }
        else {
            return arr;
        }
    };
    SerSelectComponent.prototype.updateGroupInfo = function (item) {
        var _this = this;
        if (item[this.settings.disabledKey]) {
            return false;
        }
        var key = this.settings.groupBy;
        this.groupedData.forEach(function (obj) {
            var cnt = 0;
            if (obj.grpTitle && (item[key] === obj[key])) {
                if (obj.list) {
                    obj.list.forEach(function (el) {
                        if (_this.isSelected(el)) {
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
        this.groupCachedItems.forEach(function (obj) {
            var cnt = 0;
            if (obj.grpTitle && (item[key] === obj[key])) {
                if (obj.list) {
                    obj.list.forEach(function (el) {
                        if (_this.isSelected(el)) {
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
    };
    SerSelectComponent.prototype.transformData = function (arr, field) {
        var _this = this;
        var groupedObj = arr.reduce(function (prev, cur) {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            }
            else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        var tempArr = [];
        Object.keys(groupedObj).map(function (x) {
            var obj = {};
            var disabledChildrens = [];
            obj.grpTitle = true;
            obj[_this.settings.labelKey] = x;
            obj[_this.settings.groupBy] = x;
            obj.selected = false;
            obj.list = [];
            var cnt = 0;
            groupedObj[x].forEach(function (item) {
                item.list = [];
                if (item[_this.settings.disabledKey]) {
                    _this.isDisabledItemPresent = true;
                    disabledChildrens.push(item);
                }
                obj.list.push(item);
                if (_this.isSelected(item)) {
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
            obj[_this.settings.disabledKey] = disabledChildrens.length === groupedObj[x].length;
            tempArr.push(obj);
            // obj.list.forEach((item: any) => {
            //     tempArr.push(item);
            // });
        });
        return tempArr;
    };
    SerSelectComponent.prototype.filterInfiniteList = function (evt) {
        var _this = this;
        var filteredElems = [];
        if (this.settings.groupBy) {
            this.groupedData = this.groupCachedItems.slice();
        }
        else {
            this.data = this.cachedItems.slice();
            this.virtualdata = this.cachedItems.slice();
        }
        if ((evt != null || evt !== '') && !this.settings.groupBy) {
            if (this.settings.searchBy.length > 0) {
                var _loop_1 = function (t) {
                    this_1.virtualdata.filter(function (el) {
                        if (el[_this.settings.searchBy[t].toString()].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                            filteredElems.push(el);
                        }
                    });
                };
                var this_1 = this;
                for (var t = 0; t < this.settings.searchBy.length; t++) {
                    _loop_1(t);
                }
            }
            else {
                this.virtualdata.filter(function (el) {
                    for (var prop in el) {
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
            this.groupedData.filter(function (el) {
                if (el.hasOwnProperty('grpTitle')) {
                    filteredElems.push(el);
                }
                else {
                    for (var prop in el) {
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
    };
    SerSelectComponent.prototype.onScrollEnd = function (e) {
        if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {
        }
        this.onScrollToEnd.emit(e);
    };
    SerSelectComponent.prototype.selectGroup = function (item) {
        var _this = this;
        if (item[this.settings.disabledKey]) {
            return false;
        }
        if (item.selected) {
            item.selected = false;
            item.list.forEach(function (obj) {
                _this.removeSelected(obj);
            });
            this.onGroupDeSelect.emit(item);
            this.updateGroupInfo(item);
        }
        else {
            item.selected = true;
            item.list.forEach(function (obj) {
                if (!_this.isSelected(obj)) {
                    _this.addSelected(obj);
                }
            });
            this.onGroupSelect.emit(item);
            this.updateGroupInfo(item);
        }
    };
    SerSelectComponent.prototype.addFilterNewItem = function () {
        this.onAddFilterNewItem.emit(this.filter);
        this.filterPipe = new SerSelectListFilterPipe(this.ds);
        this.filterPipe.transform(this.data, this.filter, this.settings.searchBy);
    };
    SerSelectComponent.prototype.clearSelection = function (e) {
        if (this.settings.groupBy) {
            this.groupCachedItems.forEach(function (obj) {
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
    };
    SerSelectComponent.prototype.getItemContext = function (item) {
        return item;
    };
    SerSelectComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.dropdownSubs.forEach(function (s) {
            s.unsubscribe();
        });
    };
    var SerSelectComponent_1;
    SerSelectComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: DataService },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['multiple',] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['simple',] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['primaryKey',] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['labelKey',] }] }
    ]; };
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
                    useExisting: forwardRef(function () { return SerSelectComponent_1; }),
                    multi: true
                },
                {
                    provide: NG_VALIDATORS,
                    useExisting: forwardRef(function () { return SerSelectComponent_1; }),
                    multi: true,
                }
            ],
            encapsulation: ViewEncapsulation.None
        }),
        __param(4, Optional()), __param(4, Attribute('multiple')),
        __param(5, Optional()), __param(5, Attribute('simple')), __param(6, Optional()), __param(6, Attribute('primaryKey')), __param(7, Optional()), __param(7, Attribute('labelKey'))
    ], SerSelectComponent);
    return SerSelectComponent;
}());
export { SerSelectComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vc2VsZWN0L3Nlci1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdDQUF3QztBQUN4Qyw0Q0FBNEM7QUFDNUMsa0NBQWtDO0FBQ2xDLG1DQUFtQztBQUNuQyxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLDJDQUEyQztBQUMzQyx5Q0FBeUM7QUFDekMscUNBQXFDOztBQUVyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMU4sT0FBTyxFQUFFLGlCQUFpQixFQUF3QixhQUFhLEVBQTBCLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQWdCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JB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LFlBQVk7WUFDdEIsaS9sQkFBMEM7WUFDMUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixFQUFFO1lBQzlDLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQztvQkFDakQsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7Z0JBQ0Q7b0JBQ0ksT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG9CQUFrQixFQUFsQixDQUFrQixDQUFDO29CQUNqRCxLQUFLLEVBQUUsSUFBSTtpQkFDZDthQUNKO1lBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQztRQWlJc0ksV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3hKLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQSxFQUFlLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQSxFQUFtQixXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7T0FqSXpJLGtCQUFrQixDQTQ3QjlCO0lBQUQseUJBQUM7Q0FBQSxBQTU3QkQsSUE0N0JDO1NBNTdCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogbm8tdXNlLWJlZm9yZS1kZWNsYXJlXHJcbi8vIHRzbGludDpkaXNhYmxlOiBuby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XHJcbi8vIHRzbGludDpkaXNhYmxlOiBtYXgtbGluZS1sZW5ndGhcclxuLy8gdHNsaW50OmRpc2FibGU6IG5vLW91dHB1dC1yZW5hbWVcclxuLy8gdHNsaW50OmRpc2FibGU6IG5vLW91dHB1dC1vbi1wcmVmaXhcclxuLy8gdHNsaW50OmRpc2FibGU6IHByZWZlci1jb25zdFxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbm8tY29uZmxpY3RpbmctbGlmZWN5Y2xlXHJcbi8vIHRzbGludDpkaXNhYmxlOiBjb21wb25lbnQtY2xhc3Mtc3VmZml4XHJcbi8vIHRzbGludDpkaXNhYmxlOiBjb21wb25lbnQtc2VsZWN0b3JcclxuXHJcbmltcG9ydCB7IEF0dHJpYnV0ZSwgSG9zdEJpbmRpbmcsIE9wdGlvbmFsLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0VuY2Fwc3VsYXRpb24sIENvbnRlbnRDaGlsZCwgVmlld0NoaWxkLCBmb3J3YXJkUmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxJREFUT1JTLCBWYWxpZGF0b3IsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBEcm9wZG93blNldHRpbmdzIH0gZnJvbSAnLi9zZXItc2VsZWN0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFNlclNlbGVjdExpc3RGaWx0ZXJQaXBlIH0gZnJvbSAnLi9zZXItc2VsZWN0LWxpc3QtZmlsdGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBTREl0ZW1EaXJlY3RpdmUsIFNEQmFkZ2VEaXJlY3RpdmUsIFNEU2VhcmNoRGlyZWN0aXZlIH0gZnJvbSAnLi9zZXItc2VsZWN0LW1lbnUtaXRlbS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vc2VyLXNlbGVjdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJqZWN0LCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVmlydHVhbFNjcm9sbGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbCc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRhcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NoZWNrJztcclxuaW1wb3J0IHsgaW5BcnJheSB9IGZyb20gJy4uLy4uL3V0aWxzL2FycmF5JztcclxuXHJcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc2VyLXNlbGVjdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VyLXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBob3N0OiB7ICdbY2xhc3NdJzogJ2RlZmF1bHRTZXR0aW5ncy5jbGFzc2VzJyB9LFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VyU2VsZWN0Q29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VyU2VsZWN0Q29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlclNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgVmFsaWRhdG9yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIGRhdGEgPSBbXTtcclxuXHJcbiAgICBASW5wdXQoKSBzZXR0aW5nczogRHJvcGRvd25TZXR0aW5ncztcclxuXHJcbiAgICBASW5wdXQoKSBsb2FkaW5nOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uU2VsZWN0JylcclxuICAgIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uRGVTZWxlY3QnKVxyXG4gICAgb25EZVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvblNlbGVjdEFsbCcpXHJcbiAgICBvblNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uRGVTZWxlY3RBbGwnKVxyXG4gICAgb25EZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uT3BlbicpXHJcbiAgICBvbk9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25DbG9zZScpXHJcbiAgICBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uU2Nyb2xsVG9FbmQnKVxyXG4gICAgb25TY3JvbGxUb0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvbkZpbHRlclNlbGVjdEFsbCcpXHJcbiAgICBvbkZpbHRlclNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uRmlsdGVyRGVTZWxlY3RBbGwnKVxyXG4gICAgb25GaWx0ZXJEZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uQWRkRmlsdGVyTmV3SXRlbScpXHJcbiAgICBvbkFkZEZpbHRlck5ld0l0ZW06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25Hcm91cFNlbGVjdCcpXHJcbiAgICBvbkdyb3VwU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uR3JvdXBEZVNlbGVjdCcpXHJcbiAgICBvbkdyb3VwRGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChTREl0ZW1EaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGl0ZW1UZW1wbDogU0RJdGVtRGlyZWN0aXZlO1xyXG4gICAgQENvbnRlbnRDaGlsZChTREJhZGdlRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBiYWRnZVRlbXBsOiBTREJhZGdlRGlyZWN0aXZlO1xyXG4gICAgQENvbnRlbnRDaGlsZChTRFNlYXJjaERpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgc2VhcmNoVGVtcGw6IFNEU2VhcmNoRGlyZWN0aXZlO1xyXG5cclxuXHJcbiAgICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0OiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0ZWRMaXN0Jykgc2VsZWN0ZWRMaXN0RWxlbTogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duTGlzdCcpIGRyb3Bkb3duTGlzdEVsZW06IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpIGlzRGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJykgaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MubXVsdGlwbGUnKSBtdWx0aXBsZUNsYXNzID0gZmFsc2U7XHJcblxyXG4gICAgdmlydHVhbGRhdGE6IGFueSA9IFtdO1xyXG4gICAgc2VhcmNoVGVybSQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gICAgZmlsdGVyUGlwZTogU2VyU2VsZWN0TGlzdEZpbHRlclBpcGU7XHJcbiAgICBzZWxlY3RlZEl0ZW1zOiBhbnlbXSA9IFtdO1xyXG4gICAgaXNTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgIGlzRmlsdGVyU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICBpc0luZmluaXRlRmlsdGVyU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICBncm91cGVkRGF0YTogYW55W107XHJcbiAgICBmaWx0ZXI6IGFueTtcclxuICAgIGNodW5rQXJyYXk6IGFueVtdO1xyXG4gICAgc2Nyb2xsVG9wOiBhbnk7XHJcbiAgICBjaHVua0luZGV4OiBhbnlbXSA9IFtdO1xyXG4gICAgY2FjaGVkSXRlbXM6IGFueVtdID0gW107XHJcbiAgICBncm91cENhY2hlZEl0ZW1zOiBhbnlbXSA9IFtdO1xyXG4gICAgdG90YWxSb3dzOiBhbnk7XHJcbiAgICBpdGVtSGVpZ2h0OiBhbnkgPSA0MS42O1xyXG4gICAgc2NyZWVuSXRlbXNMZW46IGFueTtcclxuICAgIGNhY2hlZEl0ZW1zTGVuOiBhbnk7XHJcbiAgICB0b3RhbEhlaWdodDogYW55O1xyXG4gICAgc2Nyb2xsZXI6IGFueTtcclxuICAgIG1heEJ1ZmZlcjogYW55O1xyXG4gICAgbGFzdFNjcm9sbGVkOiBhbnk7XHJcbiAgICBsYXN0UmVwYWludFk6IGFueTtcclxuICAgIHNlbGVjdGVkTGlzdEhlaWdodDogYW55O1xyXG4gICAgZmlsdGVyTGVuZ3RoOiBhbnkgPSAwO1xyXG4gICAgaW5maW5pdGVGaWx0ZXJMZW5ndGg6IGFueSA9IDA7XHJcbiAgICB2aWV3UG9ydEl0ZW1zOiBhbnk7XHJcbiAgICBpdGVtOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBkcm9wZG93blN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgZGVmYXVsdFNldHRpbmdzOiBEcm9wZG93blNldHRpbmdzID0ge1xyXG4gICAgICAgIHNpbmdsZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBlbmFibGVDaGVja0FsbDogdHJ1ZSxcclxuICAgICAgICBzZWxlY3RBbGxUZXh0OiAnU2VsZWNjaW9uYXIgdG9kbycsXHJcbiAgICAgICAgdW5TZWxlY3RBbGxUZXh0OiAnRGVzZWxlY2Npb25hciB0b2RvJyxcclxuICAgICAgICBmaWx0ZXJTZWxlY3RBbGxUZXh0OiAnU2VsZWNjaW9uYXIgdG9kb3MgbG9zIHJlc3VsdGFkb3MgZmlsdHJhZG9zJyxcclxuICAgICAgICBmaWx0ZXJVblNlbGVjdEFsbFRleHQ6ICdEZXNlbGVjY2lvbmFyIHRvZG9zIGxvcyByZXN1bHRhZG9zIGZpbHRyYWRvcycsXHJcbiAgICAgICAgZW5hYmxlU2VhcmNoRmlsdGVyOiB0cnVlLFxyXG4gICAgICAgIHNlYXJjaEJ5OiBbJ25hbWUnXSxcclxuICAgICAgICBtYXhIZWlnaHQ6IDMwMCxcclxuICAgICAgICBiYWRnZVNob3dMaW1pdDogOTk5OTk5OTk5OTk5LFxyXG4gICAgICAgIGNsYXNzZXM6ICcnLFxyXG4gICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyVGV4dDogJ0J1c2NhcicsXHJcbiAgICAgICAgc2hvd0NoZWNrYm94OiB0cnVlLFxyXG4gICAgICAgIG5vRGF0YUxhYmVsOiAnU2luIGRhdG9zIGRpc3BvbmlibGVzJyxcclxuICAgICAgICBsYXp5TG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgbGFiZWxLZXk6ICduYW1lJyxcclxuICAgICAgICBwcmltYXJ5S2V5OiAnaWQnLFxyXG4gICAgICAgIGRpc2FibGVkS2V5OiAnZGlzYWJsZWQnLFxyXG4gICAgICAgIGVuYWJsZUZpbHRlclNlbGVjdEFsbDogdHJ1ZSxcclxuICAgICAgICBzZWxlY3RHcm91cDogZmFsc2UsXHJcbiAgICAgICAgYWRkTmV3SXRlbU9uRmlsdGVyOiBmYWxzZSxcclxuICAgICAgICBhZGROZXdCdXR0b25UZXh0OiAnQWdyZWdhcicsXHJcbiAgICAgICAgZXNjYXBlVG9DbG9zZTogdHJ1ZSxcclxuICAgICAgICBjbGVhckFsbDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICByYW5kb21TaXplID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBwYXJzZUVycm9yOiBib29sZWFuO1xyXG4gICAgcHVibGljIGZpbHRlcmVkTGlzdDogYW55ID0gW107XHJcbiAgICB2aXJ0dWFsU2Nyb29sbEluaXQgPSBmYWxzZTtcclxuICAgIEBWaWV3Q2hpbGQoVmlydHVhbFNjcm9sbGVyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICAgIHByaXZhdGUgdmlydHVhbFNjcm9sbGVyOiBWaXJ0dWFsU2Nyb2xsZXJDb21wb25lbnQ7XHJcbiAgICBwdWJsaWMgaXNEaXNhYmxlZEl0ZW1QcmVzZW50ID0gZmFsc2U7XHJcblxyXG4gICAgaGFzVmFsdWUgPSBoYXNWYWx1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBkczogRGF0YVNlcnZpY2UsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIEBPcHRpb25hbCgpIEBBdHRyaWJ1dGUoJ211bHRpcGxlJykgbXVsdGlwbGVBdHRyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAQXR0cmlidXRlKCdzaW1wbGUnKSBzaW1wbGU6IGFueSwgQE9wdGlvbmFsKCkgQEF0dHJpYnV0ZSgncHJpbWFyeUtleScpIHByaW1hcnlLZXk6IGFueSwgQE9wdGlvbmFsKCkgQEF0dHJpYnV0ZSgnbGFiZWxLZXknKSBsYWJlbEtleTogYW55KSB7XHJcblxyXG4gICAgICAgIHRoaXMubXVsdGlwbGUgPSBtdWx0aXBsZUF0dHIgIT09IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNpbXBsZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRTZXR0aW5ncy5lbmFibGVTZWFyY2hGaWx0ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3MuY2xlYXJBbGwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcmltYXJ5S2V5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzLnByaW1hcnlLZXkgPSBwcmltYXJ5S2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxhYmVsS2V5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzLmxhYmVsS2V5ID0gbGFiZWxLZXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlYXJjaFRlcm0kLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXHJcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgxMDAwKSxcclxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICAgICAgICAgICAgdGFwKHRlcm0gPT4gdGVybSlcclxuICAgICAgICApLnN1YnNjcmliZSh2YWwgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckluZmluaXRlTGlzdCh2YWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTZXR0aW5ncywgdGhpcy5zZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMubXVsdGlwbGVDbGFzcyA9ICF0aGlzLnNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy5jYWNoZWRJdGVtcyA9IHRoaXMuY2xvbmVBcnJheSh0aGlzLmRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHMuZ2V0RGF0YSgpLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChvYmo6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmpbdGhpcy5zZXR0aW5ncy5kaXNhYmxlZEtleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0Rpc2FibGVkSXRlbVByZXNlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eSgnZ3JwVGl0bGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyTGVuZ3RoID0gbGVuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb29sbEluaXQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YSA9IHRoaXMudHJhbnNmb3JtRGF0YSh0aGlzLmRhdGEsIHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwQ2FjaGVkSXRlbXMgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5ncm91cGVkRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVkSXRlbXMgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5kYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VzLnNldHRpbmdzICYmICFjaGFuZ2VzLnNldHRpbmdzLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFNldHRpbmdzLCB0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VzLmxvYWRpbmcpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzPy5sYXp5TG9hZGluZyAmJiB0aGlzLnZpcnR1YWxTY3Jvb2xsSW5pdCAmJiBjaGFuZ2VzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YSA9IGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRyb3Bkb3duTGlzdEVsZW0ubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25JdGVtQ2xpY2soaXRlbTogYW55LCBrOiBudW1iZXIsIGU6IGFueSkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0Rpc2FibGVkIHx8IGl0ZW1bdGhpcy5zZXR0aW5ncy5kaXNhYmxlZEtleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZvdW5kID0gdGhpcy5pc1NlbGVjdGVkKGl0ZW0pO1xyXG4gICAgICAgIGxldCBsaW1pdCA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPCB0aGlzLnNldHRpbmdzLmxpbWl0U2VsZWN0aW9uID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxpbWl0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGltaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZChpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5vbkRlU2VsZWN0LmVtaXQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzU2VsZWN0QWxsIHx8IHRoaXMuZGF0YS5sZW5ndGggPiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR3JvdXBJbmZvKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoYzogRm9ybUNvbnRyb2wpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG5cclxuICAgICAgICBpZiAoaGFzVmFsdWUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdBcnJheSBkZXRlY3RlZCBhcyBpbnB1dCwgcGxlYXNlIGFkZCBcIm11bHRpcGxlXCIgYXR0cmlidXRlIGluIHRoZSBzZWxlY3Qgb3Igc2V0IFwic2luZ2xlU2VsZWN0aW9uXCIgc2V0dGluZyBpbiBmYWxzZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkT2JqZWN0ID0gdGhpcy5kYXRhPy5maW5kKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0gPT09IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhhc1ZhbHVlKHNlbGVjdGVkT2JqZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtzZWxlY3RlZE9iamVjdF07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdObyBwcmltYXJ5S2V5IGZpbmRlZCBpbiBvcHRpb25zLCBwbGVhc2Ugc2V0IFwicHJpbWFyeUtleVwiIHNldHRpbmcgd2l0aCB0aGUgY29ycmVjdCB2YWx1ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gdGhpcy50cmFuc2Zvcm1EYXRhKHRoaXMuZGF0YSwgdGhpcy5zZXR0aW5ncy5ncm91cEJ5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwQ2FjaGVkSXRlbXMgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5ncm91cGVkRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignU2luZ2xlIHZhbHVlIGRldGVjdGVkIGFzIGlucHV0LCBwbGVhc2Ugc2V0IFwic2luZ2xlU2VsZWN0aW9uXCIgc2V0dGluZyBpbiB0cnVlIG9yIHJlbW92ZSBcIm11bHRpcGxlXCIgYXR0cmlidXRlIGluIHRoZSBzZWxlY3QgaWYgeW91IGFkZGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPYmplY3RzID0gdGhpcy5kYXRhPy5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluQXJyYXkoaXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzVmFsdWUoc2VsZWN0ZWRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxpbWl0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHNlbGVjdGVkT2JqZWN0cy5zbGljZSgwLCB0aGlzLnNldHRpbmdzLmxpbWl0U2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBzZWxlY3RlZE9iamVjdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignTm8gcHJpbWFyeUtleSBmaW5kZWQgaW4gb3B0aW9ucywgcGxlYXNlIHNldCBcInByaW1hcnlLZXlcIiBzZXR0aW5nIHdpdGggdGhlIGNvcnJlY3QgdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA9PT0gdGhpcy5kYXRhLmxlbmd0aCAmJiB0aGlzLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gdGhpcy50cmFuc2Zvcm1EYXRhKHRoaXMuZGF0YSwgdGhpcy5zZXR0aW5ncy5ncm91cEJ5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwQ2FjaGVkSXRlbXMgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5ncm91cGVkRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1lbWJlci1vcmRlcmluZ1xyXG4gICAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYWNrQnlGbihpdGVtOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gaXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU2VsZWN0ZWQoY2xpY2tlZEl0ZW06IGFueSkge1xyXG5cclxuICAgICAgICBpZiAoY2xpY2tlZEl0ZW1bdGhpcy5zZXR0aW5ncy5kaXNhYmxlZEtleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChoYXNWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLnNlbGVjdGVkSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldID09PSBpdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRTZWxlY3RlZChpdGVtOiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtpdGVtXTtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soaXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zZWxlY3RlZEl0ZW1zLm1hcChlbGVtZW50ID0+IGVsZW1lbnRbdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSk7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhpdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soaXRlbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxlY3RlZChjbGlja2VkSXRlbTogYW55KSB7XHJcblxyXG4gICAgICAgIGlmIChoYXNWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRJdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0gPT09IGl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8jcmVnaW9uIGRyb3Bkb3duIHN0YXR1c1xyXG5cclxuICAgIHRvZ2dsZURyb3Bkb3duKGV2dDogYW55KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9ICF0aGlzLmlzQWN0aXZlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubGF6eUxvYWRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb29sbEluaXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5Ecm9wZG93bigpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93blN1YnMucHVzaChcclxuICAgICAgICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ2NsaWNrJylcclxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChlOiBNb3VzZUV2ZW50KSA9PiAhdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSApKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VEcm9wZG93bigpKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcGRvd25TdWJzLnB1c2goXHJcbiAgICAgICAgICAgIGZyb21FdmVudCh3aW5kb3csICdrZXl1cCcpXHJcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcigoZTogS2V5Ym9hcmRFdmVudCkgPT4gZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2VzY2FwZScgJiYgdGhpcy5zZXR0aW5ncy5lc2NhcGVUb0Nsb3NlICkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZURyb3Bkb3duKCkgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcGRvd25TdWJzLnB1c2goXHJcbiAgICAgICAgICAgIGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnKS5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coJ3Njcm9sbCcpIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5wdXNoKFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJykuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0UG9zaXRpb25Ecm9wZG93bigpIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uRHJvcGRvd24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRyb3Bkb3duTGlzdEVsZW0ubmF0aXZlRWxlbWVudCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZVNlYXJjaEZpbHRlciAmJiAhdGhpcy5zZWFyY2hUZW1wbCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZURyb3Bkb3duKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJTZWFyY2goKTtcclxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcGRvd25TdWJzLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkgKTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3VicyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRyb3Bkb3duTGlzdEVsZW0ubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UG9zaXRpb25Ecm9wZG93bigpIHtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93biA9ICh0aGlzLmRyb3Bkb3duTGlzdEVsZW0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsID0gKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbWFpbmluZ0hlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQgLSAoZHJvcGRvd24ub2Zmc2V0SGVpZ2h0ICsgZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZWwub2Zmc2V0SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duLCAnd2lkdGgnLCAoZWwub2Zmc2V0V2lkdGgpICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duLCAnbGVmdCcsIChlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSArICdweCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlbWFpbmluZ0hlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGVsLCAnb250b3AnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGRyb3Bkb3duLCAnb250b3AnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ3RvcCcsIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSArICdweCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoZWwsICdvbnRvcCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoZHJvcGRvd24sICdvbnRvcCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0b3AnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duLCAnYm90dG9tJywgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQgLSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgdG9nZ2xlU2VsZWN0QWxsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1NlbGVjdEFsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YS5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouc2VsZWN0ZWQgPSAhb2JqW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwQ2FjaGVkSXRlbXMuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gIW9ialt0aGlzLnNldHRpbmdzLmRpc2FibGVkS2V5XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHRoaXMuZGF0YS5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSB0aGlzLmRhdGEuZmlsdGVyKChpbmRpdmlkdWFsRGF0YSkgPT4gIWluZGl2aWR1YWxEYXRhW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldKTtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0QWxsLmVtaXQodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwQ2FjaGVkSXRlbXMuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vbkRlU2VsZWN0QWxsLmVtaXQodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyRm4odmFsdWU6IGFueSkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5ICYmICF0aGlzLnNldHRpbmdzLmxhenlMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyR3JvdXBlZExpc3QoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MubGF6eUxvYWRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXJtJC5uZXh0KHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckdyb3VwZWRMaXN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlciA9PT0gJycgfHwgdGhpcy5maWx0ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VhcmNoKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ3JvdXBlZERhdGEgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5ncm91cENhY2hlZEl0ZW1zKTtcclxuICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gdGhpcy5ncm91cGVkRGF0YS5maWx0ZXIob2JqID0+IHtcclxuICAgICAgICAgICAgbGV0IGFyciA9IFtdO1xyXG4gICAgICAgICAgICBpZiAob2JqW3RoaXMuc2V0dGluZ3MubGFiZWxLZXldLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLmZpbHRlci50b0xvd2VyQ2FzZSgpKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBvYmoubGlzdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IG9iai5saXN0LmZpbHRlcih0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdFt0aGlzLnNldHRpbmdzLmxhYmVsS2V5XS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSkgPiAtMTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvYmoubGlzdCA9IGFycjtcclxuICAgICAgICAgICAgaWYgKG9ialt0aGlzLnNldHRpbmdzLmxhYmVsS2V5XS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnIuc29tZShjYXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXRbdGhpcy5zZXR0aW5ncy5sYWJlbEtleV0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuZmlsdGVyLnRvTG93ZXJDYXNlKCkpID4gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUZpbHRlclNlbGVjdEFsbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwpIHtcclxuICAgICAgICAgICAgbGV0IGFkZGVkID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcclxuICAgICAgICAgICAgICAgIC8qICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxpc3QuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKGVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWQucHVzaChlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHcm91cEluZm8oaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAqL1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZHMuZ2V0RmlsdGVyZWREYXRhKCkuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKGVsKSAmJiAhZWwuaGFzT3duUHJvcGVydHkoJ2dycFRpdGxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkLnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHMuZ2V0RmlsdGVyZWREYXRhKCkuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9uRmlsdGVyU2VsZWN0QWxsLmVtaXQoYWRkZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZW1vdmVkID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcclxuICAgICAgICAgICAgICAgIC8qICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5saXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxpc3QuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWQoZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkLnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7ICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRzLmdldEZpbHRlcmVkRGF0YSgpLmZvckVhY2goKGVsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHMuZ2V0RmlsdGVyZWREYXRhKCkuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vbkZpbHRlckRlU2VsZWN0QWxsLmVtaXQocmVtb3ZlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUluZmluaXRlRmlsdGVyU2VsZWN0QWxsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0luZmluaXRlRmlsdGVyU2VsZWN0QWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZChpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5maW5pdGVGaWx0ZXJTZWxlY3RBbGwgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5maW5pdGVGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJTZWFyY2goKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZmlsdGVyID0gJyc7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxhenlMb2FkaW5nKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzSW5maW5pdGVGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhID0gdGhpcy5jYWNoZWRJdGVtcztcclxuICAgICAgICAgICAgdGhpcy5ncm91cGVkRGF0YSA9IHRoaXMuZ3JvdXBDYWNoZWRJdGVtcztcclxuICAgICAgICAgICAgdGhpcy5pbmZpbml0ZUZpbHRlckxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdyb3VwQnkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBlZERhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBlZERhdGEgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5ncm91cENhY2hlZEl0ZW1zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9LCAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25GaWx0ZXJDaGFuZ2UoZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyID09PSAnJyB8fCBkYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzRmlsdGVyU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjbnQgPSAwO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2dycFRpdGxlJykgJiYgdGhpcy5pc1NlbGVjdGVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICBjbnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY250ID4gMCAmJiB0aGlzLmZpbHRlckxlbmd0aCA9PT0gY250KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY250ID4gMCAmJiB0aGlzLmZpbHRlckxlbmd0aCAhPT0gY250KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb25lQXJyYXkoYXJyOiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcnIpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcnIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdDYW5ub3QgY2xvbmUgYXJyYXkgY29udGFpbmluZyBhbiBvYmplY3QhJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVHcm91cEluZm8oaXRlbTogYW55KSB7XHJcbiAgICAgICAgaWYgKGl0ZW1bdGhpcy5zZXR0aW5ncy5kaXNhYmxlZEtleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQga2V5ID0gdGhpcy5zZXR0aW5ncy5ncm91cEJ5O1xyXG4gICAgICAgIHRoaXMuZ3JvdXBlZERhdGEuZm9yRWFjaCgob2JqOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNudCA9IDA7XHJcbiAgICAgICAgICAgIGlmIChvYmouZ3JwVGl0bGUgJiYgKGl0ZW1ba2V5XSA9PT0gb2JqW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGlzdC5mb3JFYWNoKChlbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoubGlzdCAmJiAoY250ID09PSBvYmoubGlzdC5sZW5ndGgpICYmIChpdGVtW2tleV0gPT09IG9ialtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoubGlzdCAmJiAoY250ICE9PSBvYmoubGlzdC5sZW5ndGgpICYmIChpdGVtW2tleV0gPT09IG9ialtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdyb3VwQ2FjaGVkSXRlbXMuZm9yRWFjaCgob2JqOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNudCA9IDA7XHJcbiAgICAgICAgICAgIGlmIChvYmouZ3JwVGl0bGUgJiYgKGl0ZW1ba2V5XSA9PT0gb2JqW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGlzdC5mb3JFYWNoKChlbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoubGlzdCAmJiAoY250ID09PSBvYmoubGlzdC5sZW5ndGgpICYmIChpdGVtW2tleV0gPT09IG9ialtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoubGlzdCAmJiAoY250ICE9PSBvYmoubGlzdC5sZW5ndGgpICYmIChpdGVtW2tleV0gPT09IG9ialtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm1EYXRhKGFycjogQXJyYXk8YW55PiwgZmllbGQ6IGFueSk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwZWRPYmo6IGFueSA9IGFyci5yZWR1Y2UoKHByZXY6IGFueSwgY3VyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFwcmV2W2N1cltmaWVsZF1dKSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2W2N1cltmaWVsZF1dID0gW2N1cl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2W2N1cltmaWVsZF1dLnB1c2goY3VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgY29uc3QgdGVtcEFycjogYW55ID0gW107XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZ3JvdXBlZE9iaikubWFwKCh4OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IG9iajogYW55ID0ge307XHJcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZENoaWxkcmVucyA9IFtdO1xyXG4gICAgICAgICAgICBvYmouZ3JwVGl0bGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBvYmpbdGhpcy5zZXR0aW5ncy5sYWJlbEtleV0gPSB4O1xyXG4gICAgICAgICAgICBvYmpbdGhpcy5zZXR0aW5ncy5ncm91cEJ5XSA9IHg7XHJcbiAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBvYmoubGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgY250ID0gMDtcclxuICAgICAgICAgICAgZ3JvdXBlZE9ialt4XS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1bdGhpcy5zZXR0aW5ncy5kaXNhYmxlZEtleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRGlzYWJsZWRJdGVtUHJlc2VudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRDaGlsZHJlbnMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9iai5saXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY250Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY250ID09PSBvYmoubGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBncm91cCBpdGVtJ3MgYWxsIGNoaWxkcmVucyBhcmUgZGlzYWJsZWQgb3Igbm90XHJcbiAgICAgICAgICAgIG9ialt0aGlzLnNldHRpbmdzLmRpc2FibGVkS2V5XSA9IGRpc2FibGVkQ2hpbGRyZW5zLmxlbmd0aCA9PT0gZ3JvdXBlZE9ialt4XS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRlbXBBcnIucHVzaChvYmopO1xyXG4gICAgICAgICAgICAvLyBvYmoubGlzdC5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIHRlbXBBcnIucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRlbXBBcnI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbHRlckluZmluaXRlTGlzdChldnQ6IGFueSkge1xyXG4gICAgICAgIGxldCBmaWx0ZXJlZEVsZW1zOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ3JvdXBCeSkge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gdGhpcy5ncm91cENhY2hlZEl0ZW1zLnNsaWNlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5jYWNoZWRJdGVtcy5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhID0gdGhpcy5jYWNoZWRJdGVtcy5zbGljZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKChldnQgIT0gbnVsbCB8fCBldnQgIT09ICcnKSAmJiAhdGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNlYXJjaEJ5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5zZXR0aW5ncy5zZWFyY2hCeS5sZW5ndGg7IHQrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhLmZpbHRlcigoZWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxbdGhpcy5zZXR0aW5ncy5zZWFyY2hCeVt0XS50b1N0cmluZygpXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihldnQudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEVsZW1zLnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YS5maWx0ZXIoKGVsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbFtwcm9wXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihldnQudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEVsZW1zLnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxkYXRhID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEgPSBmaWx0ZXJlZEVsZW1zO1xyXG4gICAgICAgICAgICB0aGlzLmluZmluaXRlRmlsdGVyTGVuZ3RoID0gdGhpcy52aXJ0dWFsZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldnQudG9TdHJpbmcoKSAhPT0gJycgJiYgdGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBlZERhdGEuZmlsdGVyKChlbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWwuaGFzT3duUHJvcGVydHkoJ2dycFRpdGxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEVsZW1zLnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbFtwcm9wXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihldnQudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEVsZW1zLnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwZWREYXRhID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBlZERhdGEgPSBmaWx0ZXJlZEVsZW1zO1xyXG4gICAgICAgICAgICB0aGlzLmluZmluaXRlRmlsdGVyTGVuZ3RoID0gdGhpcy5ncm91cGVkRGF0YS5sZW5ndGg7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldnQudG9TdHJpbmcoKSA9PT0gJycgJiYgdGhpcy5jYWNoZWRJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlydHVhbGRhdGEgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsZGF0YSA9IHRoaXMuY2FjaGVkSXRlbXM7XHJcbiAgICAgICAgICAgIHRoaXMuaW5maW5pdGVGaWx0ZXJMZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxlci5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TY3JvbGxFbmQoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKGUuZW5kSW5kZXggPT09IHRoaXMuZGF0YS5sZW5ndGggLSAxIHx8IGUuc3RhcnRJbmRleCA9PT0gMCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25TY3JvbGxUb0VuZC5lbWl0KGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEdyb3VwKGl0ZW06IGFueSkge1xyXG4gICAgICAgIGlmIChpdGVtW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpdGVtLmxpc3QuZm9yRWFjaCgob2JqOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWQob2JqKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uR3JvdXBEZVNlbGVjdC5lbWl0KGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdyb3VwSW5mbyhpdGVtKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGl0ZW0ubGlzdC5mb3JFYWNoKChvYmo6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWQob2JqKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWQob2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm9uR3JvdXBTZWxlY3QuZW1pdChpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVHcm91cEluZm8oaXRlbSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFkZEZpbHRlck5ld0l0ZW0oKSB7XHJcbiAgICAgICAgdGhpcy5vbkFkZEZpbHRlck5ld0l0ZW0uZW1pdCh0aGlzLmZpbHRlcik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJQaXBlID0gbmV3IFNlclNlbGVjdExpc3RGaWx0ZXJQaXBlKHRoaXMuZHMpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyUGlwZS50cmFuc2Zvcm0odGhpcy5kYXRhLCB0aGlzLmZpbHRlciwgdGhpcy5zZXR0aW5ncy5zZWFyY2hCeSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJTZWxlY3Rpb24oZTogTW91c2VFdmVudCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ncm91cEJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBDYWNoZWRJdGVtcy5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICAgICAgICAgIG9iai5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJTZWFyY2goKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25EZVNlbGVjdEFsbC5lbWl0KHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcblxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbUNvbnRleHQoaXRlbTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==