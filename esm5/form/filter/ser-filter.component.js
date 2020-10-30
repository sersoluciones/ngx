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
import { Subject, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { hasValue } from '../../utils/check';
import { SDBadgeDirective, SDItemDirective } from '../select/ser-select-menu-item.directive';
import { inArray } from '../../utils/array';
var noop = function () {
};
var ɵ0 = noop;
var SerFilterComponent = /** @class */ (function () {
    function SerFilterComponent(_elementRef, cdr, _renderer, primaryKey, labelKey) {
        this._elementRef = _elementRef;
        this.cdr = cdr;
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
        this.searchTerm$ = new Subject();
        this.selectedItems = [];
        this.isSelectAll = false;
        this.isFilterSelectAll = false;
        this.chunkIndex = [];
        this.cachedItems = [];
        this.groupCachedItems = [];
        this.itemHeight = 41.6;
        this.filterLength = 0;
        this.labelActive = false;
        this.dropdownSubs = [];
        this.defaultSettings = {
            enableCheckAll: true,
            selectAllText: 'Seleccionar todo',
            unSelectAllText: 'Deseleccionar todo',
            filterSelectAllText: 'Seleccionar todos los resultados filtrados',
            filterUnSelectAllText: 'Deseleccionar todos los resultados filtrados',
            searchBy: ['name'],
            maxHeight: 300,
            classes: '',
            searchPlaceholderText: 'Filtrar',
            noDataLabel: 'Sin datos disponibles',
            labelKey: 'name',
            primaryKey: 'id',
            disabledKey: 'disabled',
            enableFilterSelectAll: true,
            clearAll: true
        };
        this.randomSize = true;
        this.filteredList = [];
        this.isDisabledItemPresent = false;
        this.hasValue = hasValue;
        // tslint:disable-next-line: member-ordering
        this.onChangeCallback = noop;
        // tslint:disable-next-line: member-ordering
        this.onTouchedCallback = noop;
        if (primaryKey !== null) {
            this.defaultSettings.primaryKey = primaryKey;
        }
        if (labelKey !== null) {
            this.defaultSettings.labelKey = labelKey;
        }
    }
    SerFilterComponent_1 = SerFilterComponent;
    SerFilterComponent.prototype.ngOnInit = function () {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.cachedItems = this.cloneArray(this.data);
    };
    SerFilterComponent.prototype.ngOnChanges = function (changes) {
        if (changes.data && !changes.data.firstChange) {
            this.cachedItems = this.cloneArray(this.data);
        }
        if (changes.settings && !changes.settings.firstChange) {
            this.settings = Object.assign(this.defaultSettings, this.settings);
        }
        if (changes.loading) {
        }
    };
    SerFilterComponent.prototype.ngAfterViewInit = function () {
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    };
    SerFilterComponent.prototype.onItemClick = function (item, k, e) {
        if (this.isDisabled || item[this.settings.disabledKey]) {
            return false;
        }
        var found = this.isSelected(item);
        if (!found) {
            this.addSelected(item);
            this.onSelect.emit(item);
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
    };
    SerFilterComponent.prototype.validate = function (c) {
        return null;
    };
    SerFilterComponent.prototype.writeValue = function (value) {
        var _this = this;
        var _a;
        if (hasValue(value)) {
            if (!Array.isArray(value)) {
                throw Error('Single value detected as input, please set "singleSelection" setting in true or remove "multiple" attribute in the select if you added');
            }
            var selectedObjects = (_a = this.data) === null || _a === void 0 ? void 0 : _a.filter(function (item) {
                return inArray(item[_this.settings.primaryKey], value);
            });
            if (hasValue(selectedObjects)) {
                this.selectedItems = selectedObjects;
            }
            else {
                this.selectedItems = [];
                throw Error('No primaryKey finded in options, please set "primaryKey" setting with the correct value');
            }
            if (this.selectedItems.length === this.data.length && this.data.length > 0) {
                this.isSelectAll = true;
            }
        }
        else {
            this.selectedItems = [];
        }
    };
    SerFilterComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    SerFilterComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    SerFilterComponent.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    SerFilterComponent.prototype.trackByFn = function (item) {
        return item[this.settings.primaryKey];
    };
    SerFilterComponent.prototype.isSelected = function (clickedItem) {
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
    SerFilterComponent.prototype.addSelected = function (item) {
        var _this = this;
        this.selectedItems.push(item);
        var items = this.selectedItems.map(function (element) { return element[_this.settings.primaryKey]; });
        this.onChangeCallback(items);
        this.onTouchedCallback(items);
    };
    SerFilterComponent.prototype.removeSelected = function (clickedItem) {
        var _this = this;
        if (hasValue(this.selectedItems)) {
            this.selectedItems.forEach(function (item, index) {
                if (clickedItem[_this.settings.primaryKey] === item[_this.settings.primaryKey]) {
                    _this.selectedItems.splice(index, 1);
                }
            });
        }
        this.onChangeCallback(this.selectedItems);
        this.onTouchedCallback(this.selectedItems);
    };
    //#region dropdown status
    SerFilterComponent.prototype.toggleDropdown = function (evt) {
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
        evt.preventDefault();
    };
    SerFilterComponent.prototype.openDropdown = function () {
        var _this = this;
        if (this.isDisabled) {
            return false;
        }
        this.isActive = true;
        this.labelActive = true;
        this.dropdownSubs.push(fromEvent(window, 'click')
            .pipe(filter(function (e) { return !_this._elementRef.nativeElement.contains(e.target); }))
            .subscribe(function () { return _this.closeDropdown(); }));
        this.dropdownSubs.push(fromEvent(window, 'keyup')
            .pipe(filter(function (e) { return e.key.toLowerCase() === 'escape'; }))
            .subscribe(function () { return _this.closeDropdown(); }));
        this.dropdownSubs.push(fromEvent(this._elementRef.nativeElement, 'scroll').subscribe(function () { return console.log('scroll'); }));
        this.dropdownSubs.push(fromEvent(window, 'resize').subscribe(function () { return _this.setPositionDropdown(); }));
        this.setPositionDropdown();
        this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
        setTimeout(function () {
            var _a;
            (_a = _this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
        }, 0);
        this.onOpen.emit(true);
    };
    SerFilterComponent.prototype.closeDropdown = function () {
        if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
        this.clearSearch();
        this.isActive = false;
        this.labelActive = false;
        this.dropdownSubs.forEach(function (s) { return s.unsubscribe(); });
        this.dropdownSubs = [];
        this.onClose.emit(false);
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    };
    SerFilterComponent.prototype.setPositionDropdown = function () {
        var _this = this;
        setTimeout(function () {
            var dropdown = _this.dropdownListElem.nativeElement;
            // const el = (this._elementRef.nativeElement as HTMLElement);
            var el = _this.searchInput.nativeElement;
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
    SerFilterComponent.prototype.toggleSelectAll = function () {
        var _this = this;
        if (!this.isSelectAll) {
            this.selectedItems = [];
            // this.selectedItems = this.data.slice();
            this.selectedItems = this.data.filter(function (individualData) { return !individualData[_this.settings.disabledKey]; });
            var selectedItems = this.selectedItems.map(function (element) { return element[_this.settings.primaryKey]; });
            this.isSelectAll = true;
            this.onChangeCallback(selectedItems);
            this.onTouchedCallback(selectedItems);
            this.onSelectAll.emit(this.selectedItems);
        }
        else {
            this.selectedItems = [];
            this.isSelectAll = false;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
            this.onDeSelectAll.emit(this.selectedItems);
        }
        this.closeDropdown();
    };
    SerFilterComponent.prototype.toggleFilterSelectAll = function () {
        if (!this.isFilterSelectAll) {
            var added = [];
            this.isFilterSelectAll = true;
            this.onFilterSelectAll.emit(added);
        }
        else {
            var removed = [];
            this.isFilterSelectAll = false;
            this.onFilterDeSelectAll.emit(removed);
        }
        this.closeDropdown();
    };
    SerFilterComponent.prototype.clearSearch = function () {
        var _this = this;
        this.filter = '';
        this.isFilterSelectAll = false;
        setTimeout(function () {
            var _a;
            (_a = _this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
        }, 0);
    };
    SerFilterComponent.prototype.onFilterChange = function (data) {
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
    SerFilterComponent.prototype.cloneArray = function (arr) {
        if (Array.isArray(arr)) {
            return JSON.parse(JSON.stringify(arr));
        }
        else if (typeof arr === 'object') {
            throw Error('Cannot clone array containing an object!');
        }
        else {
            return arr;
        }
    };
    SerFilterComponent.prototype.onScrollEnd = function (e) {
        if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {
        }
        this.onScrollToEnd.emit(e);
    };
    SerFilterComponent.prototype.clearSelection = function (e) {
        this.clearSearch();
        this.selectedItems = [];
        this.isSelectAll = false;
        this.onChangeCallback(this.selectedItems);
        this.onTouchedCallback(this.selectedItems);
        this.onDeSelectAll.emit(this.selectedItems);
        e.stopPropagation();
    };
    SerFilterComponent.prototype.getItemContext = function (item) {
        return item;
    };
    SerFilterComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.dropdownSubs.forEach(function (s) {
            s.unsubscribe();
        });
    };
    var SerFilterComponent_1;
    SerFilterComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['primaryKey',] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['labelKey',] }] }
    ]; };
    __decorate([
        Input()
    ], SerFilterComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], SerFilterComponent.prototype, "settings", void 0);
    __decorate([
        Input()
    ], SerFilterComponent.prototype, "loading", void 0);
    __decorate([
        Input()
    ], SerFilterComponent.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], SerFilterComponent.prototype, "label", void 0);
    __decorate([
        Output('onSelect')
    ], SerFilterComponent.prototype, "onSelect", void 0);
    __decorate([
        Output('onDeSelect')
    ], SerFilterComponent.prototype, "onDeSelect", void 0);
    __decorate([
        Output('onSelectAll')
    ], SerFilterComponent.prototype, "onSelectAll", void 0);
    __decorate([
        Output('onDeSelectAll')
    ], SerFilterComponent.prototype, "onDeSelectAll", void 0);
    __decorate([
        Output('onOpen')
    ], SerFilterComponent.prototype, "onOpen", void 0);
    __decorate([
        Output('onClose')
    ], SerFilterComponent.prototype, "onClose", void 0);
    __decorate([
        Output('onScrollToEnd')
    ], SerFilterComponent.prototype, "onScrollToEnd", void 0);
    __decorate([
        Output('onFilterSelectAll')
    ], SerFilterComponent.prototype, "onFilterSelectAll", void 0);
    __decorate([
        Output('onFilterDeSelectAll')
    ], SerFilterComponent.prototype, "onFilterDeSelectAll", void 0);
    __decorate([
        Output('onAddFilterNewItem')
    ], SerFilterComponent.prototype, "onAddFilterNewItem", void 0);
    __decorate([
        Output('onGroupSelect')
    ], SerFilterComponent.prototype, "onGroupSelect", void 0);
    __decorate([
        Output('onGroupDeSelect')
    ], SerFilterComponent.prototype, "onGroupDeSelect", void 0);
    __decorate([
        ContentChild(SDItemDirective, { static: true })
    ], SerFilterComponent.prototype, "itemTempl", void 0);
    __decorate([
        ContentChild(SDBadgeDirective, { static: true })
    ], SerFilterComponent.prototype, "badgeTempl", void 0);
    __decorate([
        ViewChild('searchInput')
    ], SerFilterComponent.prototype, "searchInput", void 0);
    __decorate([
        ViewChild('selectedList')
    ], SerFilterComponent.prototype, "selectedListElem", void 0);
    __decorate([
        ViewChild('dropdownList')
    ], SerFilterComponent.prototype, "dropdownListElem", void 0);
    __decorate([
        HostBinding('class.disabled')
    ], SerFilterComponent.prototype, "isDisabled", void 0);
    __decorate([
        HostBinding('class.active')
    ], SerFilterComponent.prototype, "isActive", void 0);
    SerFilterComponent = SerFilterComponent_1 = __decorate([
        Component({
            selector: 'ser-filter',
            template: "<div class=\"list-filter\" #searchInput (click)=\"toggleDropdown($event)\">\r\n\r\n    <span class=\"material-icons icon-search\">search</span>\r\n\r\n    <div class=\"label\" [ngClass]=\"{active: labelActive}\">{{ label }}</div>\r\n\r\n    <input class=\"c-input not-styled\" type=\"text\" [(ngModel)]=\"filter\">\r\n\r\n    <span [hidden]=\"!hasValue(filter)\" (click)=\"clearSearch()\" class=\"material-icons icon-clear\">cancel</span>\r\n\r\n    <div class=\"controls\">\r\n\r\n        <!-- <button type=\"button\" *ngIf=\"settings.clearAll && !isDisabled && selectedItems?.length > 0\" class=\"clear-all\" (click)=\"clearSelection($event);\">\r\n            <span class=\"material-icons\">close</span>\r\n        </button> -->\r\n\r\n        <span class=\"material-icons chevron\" [ngClass]=\"{'rotate': isActive}\">keyboard_arrow_down</span>\r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"selected-list\" #selectedList [attr.tabindex]=\"0\">\r\n\r\n    <div class=\"values\">\r\n\r\n        <ng-container *ngIf=\"hasValue(selectedItems)\">\r\n\r\n            <div class=\"token-list\">\r\n                <div class=\"token\" *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\">\r\n                    <ng-container>\r\n\r\n                        <span *ngIf=\"!hasValue(badgeTempl)\" class=\"label\">{{ item[settings.labelKey] }}</span>\r\n                        <span *ngIf=\"hasValue(badgeTempl)\" class=\"label\">\r\n                            <ng-container *ngTemplateOutlet=\"badgeTempl.template; context:{item: item}\"></ng-container>\r\n                        </span>\r\n\r\n                        <span class=\"remove\" (click)=\"onItemClick(item, k, $event);$event.stopPropagation()\">\r\n                            <span class=\"material-icons\">close</span>\r\n                        </span>\r\n                    </ng-container>\r\n                </div>\r\n            </div>\r\n\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n\r\n<div #dropdownList class=\"dropdown-list\">\r\n\r\n    <div class=\"pure-checkbox select-all\" *ngIf=\"settings.enableCheckAll && data?.length > 0 && !isDisabledItemPresent\" (click)=\"toggleSelectAll()\">\r\n        <input type=\"checkbox\" [checked]=\"isSelectAll\" />\r\n        <label>\r\n            <span [hidden]=\"isSelectAll\">{{ settings.selectAllText }}</span>\r\n            <span [hidden]=\"!isSelectAll\">{{ settings.unSelectAllText }}</span>\r\n        </label>\r\n    </div>\r\n\r\n    <div class=\"filter-select-all\" *ngIf=\"settings.enableFilterSelectAll && !isDisabledItemPresent\">\r\n\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"filter?.length > 0 && filterLength > 0\" (click)=\"toggleFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isFilterSelectAll\" />\r\n            <label>\r\n                <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\r\n                <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\r\n            </label>\r\n        </div>\r\n\r\n        <!-- <div class=\"nodata-label\" *ngIf=\"filterLength == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">{{ settings.noDataLabel }}</div> -->\r\n\r\n    </div>\r\n\r\n    <div *ngIf=\"!hasValue(itemTempl)\" class=\"list lazyContainer\" [style.maxHeight]=\"settings.maxHeight+'px'\">\r\n        <ng-container *ngFor=\"let item of data | serFilterListFilter:filter : settings.searchBy; let i = index;\">\r\n            <div class=\"item pure-checkbox\"  *ngIf=\"!isSelected(item)\" (click)=\"onItemClick(item, i, $event)\">\r\n                {{ item[settings.labelKey] }}\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n\r\n    <div *ngIf=\"hasValue(itemTempl)\" class=\"list lazyContainer\" [style.maxHeight]=\"settings.maxHeight+'px'\">\r\n        <ng-container *ngFor=\"let item of data | serFilterListFilter:filter : settings.searchBy; let i = index;\">\r\n            <div class=\"item pure-checkbox\" *ngIf=\"!isSelected(item)\" (click)=\"onItemClick(item, i, $event)\">\r\n                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n\r\n    <h5 class=\"list-message\" *ngIf=\"!hasValue(data)\">{{ settings.noDataLabel }}</h5>\r\n\r\n</div>\r\n",
            host: { '[class]': 'defaultSettings.classes' },
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return SerFilterComponent_1; }),
                    multi: true
                },
                {
                    provide: NG_VALIDATORS,
                    useExisting: forwardRef(function () { return SerFilterComponent_1; }),
                    multi: true,
                }
            ],
            encapsulation: ViewEncapsulation.None
        }),
        __param(3, Optional()), __param(3, Attribute('primaryKey')),
        __param(4, Optional()), __param(4, Attribute('labelKey'))
    ], SerFilterComponent);
    return SerFilterComponent;
}());
export { SerFilterComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vZmlsdGVyL3Nlci1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdDQUF3QztBQUN4Qyw0Q0FBNEM7QUFDNUMsa0NBQWtDO0FBQ2xDLG1DQUFtQztBQUNuQyxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLDJDQUEyQztBQUMzQyx5Q0FBeUM7QUFDekMscUNBQXFDOztBQUVyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMU4sT0FBTyxFQUFFLGlCQUFpQixFQUF3QixhQUFhLEVBQTBCLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEgsT0FBTyxFQUFnQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU1QyxJQUFNLElBQUksR0FBRztBQUNiLENBQUMsQ0FBQzs7QUFvQkY7SUE4R0ksNEJBQW1CLFdBQXVCLEVBQVUsR0FBc0IsRUFBVSxTQUFv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LGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBuby11c2UtYmVmb3JlLWRlY2xhcmVcclxuLy8gdHNsaW50OmRpc2FibGU6IG5vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuLy8gdHNsaW50OmRpc2FibGU6IG1heC1saW5lLWxlbmd0aFxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbm8tb3V0cHV0LXJlbmFtZVxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbm8tb3V0cHV0LW9uLXByZWZpeFxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogcHJlZmVyLWNvbnN0XHJcbi8vIHRzbGludDpkaXNhYmxlOiBuby1jb25mbGljdGluZy1saWZlY3ljbGVcclxuLy8gdHNsaW50OmRpc2FibGU6IGNvbXBvbmVudC1jbGFzcy1zdWZmaXhcclxuLy8gdHNsaW50OmRpc2FibGU6IGNvbXBvbmVudC1zZWxlY3RvclxyXG5cclxuaW1wb3J0IHsgQXR0cmlidXRlLCBIb3N0QmluZGluZywgT3B0aW9uYWwsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMsIENoYW5nZURldGVjdG9yUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiwgQ29udGVudENoaWxkLCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRvciwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZpbHRlclNldHRpbmdzIH0gZnJvbSAnLi9zZXItZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3ViamVjdCwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU2VyRmlsdGVyTGlzdEZpbHRlclBpcGUgfSBmcm9tICcuL3Nlci1maWx0ZXItbGlzdC1maWx0ZXIucGlwZSc7XHJcbmltcG9ydCB7IGhhc1ZhbHVlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY2hlY2snO1xyXG5pbXBvcnQgeyBTREJhZGdlRGlyZWN0aXZlLCBTREl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuLi9zZWxlY3Qvc2VyLXNlbGVjdC1tZW51LWl0ZW0uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgaW5BcnJheSB9IGZyb20gJy4uLy4uL3V0aWxzL2FycmF5JztcclxuXHJcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc2VyLWZpbHRlcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VyLWZpbHRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBob3N0OiB7ICdbY2xhc3NdJzogJ2RlZmF1bHRTZXR0aW5ncy5jbGFzc2VzJyB9LFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VyRmlsdGVyQ29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VyRmlsdGVyQ29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlckZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgVmFsaWRhdG9yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIGRhdGEgPSBbXTtcclxuXHJcbiAgICBASW5wdXQoKSBzZXR0aW5nczogRmlsdGVyU2V0dGluZ3M7XHJcblxyXG4gICAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uU2VsZWN0JylcclxuICAgIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uRGVTZWxlY3QnKVxyXG4gICAgb25EZVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvblNlbGVjdEFsbCcpXHJcbiAgICBvblNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uRGVTZWxlY3RBbGwnKVxyXG4gICAgb25EZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uT3BlbicpXHJcbiAgICBvbk9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25DbG9zZScpXHJcbiAgICBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uU2Nyb2xsVG9FbmQnKVxyXG4gICAgb25TY3JvbGxUb0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvbkZpbHRlclNlbGVjdEFsbCcpXHJcbiAgICBvbkZpbHRlclNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uRmlsdGVyRGVTZWxlY3RBbGwnKVxyXG4gICAgb25GaWx0ZXJEZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uQWRkRmlsdGVyTmV3SXRlbScpXHJcbiAgICBvbkFkZEZpbHRlck5ld0l0ZW06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25Hcm91cFNlbGVjdCcpXHJcbiAgICBvbkdyb3VwU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uR3JvdXBEZVNlbGVjdCcpXHJcbiAgICBvbkdyb3VwRGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChTREl0ZW1EaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGl0ZW1UZW1wbDogU0RJdGVtRGlyZWN0aXZlO1xyXG4gICAgQENvbnRlbnRDaGlsZChTREJhZGdlRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBiYWRnZVRlbXBsOiBTREJhZGdlRGlyZWN0aXZlO1xyXG5cclxuXHJcbiAgICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0OiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0ZWRMaXN0Jykgc2VsZWN0ZWRMaXN0RWxlbTogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duTGlzdCcpIGRyb3Bkb3duTGlzdEVsZW06IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpIGlzRGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJykgaXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBzZWFyY2hUZXJtJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgICBmaWx0ZXJQaXBlOiBTZXJGaWx0ZXJMaXN0RmlsdGVyUGlwZTtcclxuICAgIHNlbGVjdGVkSXRlbXM6IGFueVtdID0gW107XHJcbiAgICBpc1NlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgaXNGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgIGdyb3VwZWREYXRhOiBhbnlbXTtcclxuICAgIGZpbHRlcjogYW55O1xyXG4gICAgY2h1bmtBcnJheTogYW55W107XHJcbiAgICBzY3JvbGxUb3A6IGFueTtcclxuICAgIGNodW5rSW5kZXg6IGFueVtdID0gW107XHJcbiAgICBjYWNoZWRJdGVtczogYW55W10gPSBbXTtcclxuICAgIGdyb3VwQ2FjaGVkSXRlbXM6IGFueVtdID0gW107XHJcbiAgICB0b3RhbFJvd3M6IGFueTtcclxuICAgIGl0ZW1IZWlnaHQ6IGFueSA9IDQxLjY7XHJcbiAgICBzY3JlZW5JdGVtc0xlbjogYW55O1xyXG4gICAgdG90YWxIZWlnaHQ6IGFueTtcclxuICAgIHNjcm9sbGVyOiBhbnk7XHJcbiAgICBzZWxlY3RlZExpc3RIZWlnaHQ6IGFueTtcclxuICAgIGZpbHRlckxlbmd0aDogYW55ID0gMDtcclxuICAgIHZpZXdQb3J0SXRlbXM6IGFueTtcclxuICAgIGxhYmVsQWN0aXZlID0gZmFsc2U7XHJcbiAgICBpdGVtOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBkcm9wZG93blN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgZGVmYXVsdFNldHRpbmdzOiBGaWx0ZXJTZXR0aW5ncyA9IHtcclxuICAgICAgICBlbmFibGVDaGVja0FsbDogdHJ1ZSxcclxuICAgICAgICBzZWxlY3RBbGxUZXh0OiAnU2VsZWNjaW9uYXIgdG9kbycsXHJcbiAgICAgICAgdW5TZWxlY3RBbGxUZXh0OiAnRGVzZWxlY2Npb25hciB0b2RvJyxcclxuICAgICAgICBmaWx0ZXJTZWxlY3RBbGxUZXh0OiAnU2VsZWNjaW9uYXIgdG9kb3MgbG9zIHJlc3VsdGFkb3MgZmlsdHJhZG9zJyxcclxuICAgICAgICBmaWx0ZXJVblNlbGVjdEFsbFRleHQ6ICdEZXNlbGVjY2lvbmFyIHRvZG9zIGxvcyByZXN1bHRhZG9zIGZpbHRyYWRvcycsXHJcbiAgICAgICAgc2VhcmNoQnk6IFsnbmFtZSddLFxyXG4gICAgICAgIG1heEhlaWdodDogMzAwLFxyXG4gICAgICAgIGNsYXNzZXM6ICcnLFxyXG4gICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyVGV4dDogJ0ZpbHRyYXInLFxyXG4gICAgICAgIG5vRGF0YUxhYmVsOiAnU2luIGRhdG9zIGRpc3BvbmlibGVzJyxcclxuICAgICAgICBsYWJlbEtleTogJ25hbWUnLFxyXG4gICAgICAgIHByaW1hcnlLZXk6ICdpZCcsXHJcbiAgICAgICAgZGlzYWJsZWRLZXk6ICdkaXNhYmxlZCcsXHJcbiAgICAgICAgZW5hYmxlRmlsdGVyU2VsZWN0QWxsOiB0cnVlLFxyXG4gICAgICAgIGNsZWFyQWxsOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIHJhbmRvbVNpemUgPSB0cnVlO1xyXG4gICAgcHVibGljIHBhcnNlRXJyb3I6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgZmlsdGVyZWRMaXN0OiBhbnkgPSBbXTtcclxuICAgIHB1YmxpYyBpc0Rpc2FibGVkSXRlbVByZXNlbnQgPSBmYWxzZTtcclxuXHJcbiAgICBoYXNWYWx1ZSA9IGhhc1ZhbHVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBAT3B0aW9uYWwoKSBAQXR0cmlidXRlKCdwcmltYXJ5S2V5JykgcHJpbWFyeUtleTogYW55LFxyXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEF0dHJpYnV0ZSgnbGFiZWxLZXknKSBsYWJlbEtleTogYW55KSB7XHJcblxyXG4gICAgICAgIGlmIChwcmltYXJ5S2V5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzLnByaW1hcnlLZXkgPSBwcmltYXJ5S2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxhYmVsS2V5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzLmxhYmVsS2V5ID0gbGFiZWxLZXk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFNldHRpbmdzLCB0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLmNhY2hlZEl0ZW1zID0gdGhpcy5jbG9uZUFycmF5KHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG5cclxuICAgICAgICBpZiAoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuZmlyc3RDaGFuZ2UpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVkSXRlbXMgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5kYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VzLnNldHRpbmdzICYmICFjaGFuZ2VzLnNldHRpbmdzLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFNldHRpbmdzLCB0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VzLmxvYWRpbmcpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZHJvcGRvd25MaXN0RWxlbS5uYXRpdmVFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkl0ZW1DbGljayhpdGVtOiBhbnksIGs6IG51bWJlciwgZTogYW55KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQgfHwgaXRlbVt0aGlzLnNldHRpbmdzLmRpc2FibGVkS2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm91bmQgPSB0aGlzLmlzU2VsZWN0ZWQoaXRlbSk7XHJcblxyXG4gICAgICAgIGlmICghZm91bmQpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KGl0ZW0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLm9uRGVTZWxlY3QuZW1pdChpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzU2VsZWN0QWxsIHx8IHRoaXMuZGF0YS5sZW5ndGggPiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoYzogRm9ybUNvbnRyb2wpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG5cclxuICAgICAgICBpZiAoaGFzVmFsdWUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdTaW5nbGUgdmFsdWUgZGV0ZWN0ZWQgYXMgaW5wdXQsIHBsZWFzZSBzZXQgXCJzaW5nbGVTZWxlY3Rpb25cIiBzZXR0aW5nIGluIHRydWUgb3IgcmVtb3ZlIFwibXVsdGlwbGVcIiBhdHRyaWJ1dGUgaW4gdGhlIHNlbGVjdCBpZiB5b3UgYWRkZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPYmplY3RzID0gdGhpcy5kYXRhPy5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5BcnJheShpdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0sIHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFzVmFsdWUoc2VsZWN0ZWRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRPYmplY3RzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignTm8gcHJpbWFyeUtleSBmaW5kZWQgaW4gb3B0aW9ucywgcGxlYXNlIHNldCBcInByaW1hcnlLZXlcIiBzZXR0aW5nIHdpdGggdGhlIGNvcnJlY3QgdmFsdWUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPT09IHRoaXMuZGF0YS5sZW5ndGggJiYgdGhpcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1lbWJlci1vcmRlcmluZ1xyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhY2tCeUZuKGl0ZW06IGFueSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV07XHJcbiAgICB9XHJcblxyXG4gICAgaXNTZWxlY3RlZChjbGlja2VkSXRlbTogYW55KSB7XHJcblxyXG4gICAgICAgIGlmIChjbGlja2VkSXRlbVt0aGlzLnNldHRpbmdzLmRpc2FibGVkS2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKGhhc1ZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuc2VsZWN0ZWRJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRJdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0gPT09IGl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFNlbGVjdGVkKGl0ZW06IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zZWxlY3RlZEl0ZW1zLm1hcChlbGVtZW50ID0+IGVsZW1lbnRbdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGl0ZW1zKTtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKGl0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxlY3RlZChjbGlja2VkSXRlbTogYW55KSB7XHJcblxyXG4gICAgICAgIGlmIChoYXNWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRJdGVtW3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0gPT09IGl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyNyZWdpb24gZHJvcGRvd24gc3RhdHVzXHJcblxyXG4gICAgdG9nZ2xlRHJvcGRvd24oZXZ0OiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gIXRoaXMuaXNBY3RpdmU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbkRyb3Bkb3duKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGFiZWxBY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5wdXNoKFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQod2luZG93LCAnY2xpY2snKVxyXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoKGU6IE1vdXNlRXZlbnQpID0+ICF0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZS50YXJnZXQpICkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZURyb3Bkb3duKCkpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93blN1YnMucHVzaChcclxuICAgICAgICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ2tleXVwJylcclxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChlOiBLZXlib2FyZEV2ZW50KSA9PiBlLmtleS50b0xvd2VyQ2FzZSgpID09PSAnZXNjYXBlJyApKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VEcm9wZG93bigpIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5wdXNoKFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsJykuc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKCdzY3JvbGwnKSApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93blN1YnMucHVzaChcclxuICAgICAgICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldFBvc2l0aW9uRHJvcGRvd24oKSApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkRyb3Bkb3duKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5kcm9wZG93bkxpc3RFbGVtLm5hdGl2ZUVsZW1lbnQpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZURyb3Bkb3duKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJTZWFyY2goKTtcclxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sYWJlbEFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpICk7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93blN1YnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5kcm9wZG93bkxpc3RFbGVtLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBvc2l0aW9uRHJvcGRvd24oKSB7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSAodGhpcy5kcm9wZG93bkxpc3RFbGVtLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTERpdkVsZW1lbnQpO1xyXG4gICAgICAgICAgICAvLyBjb25zdCBlbCA9ICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBlbCA9ICh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCByZW1haW5pbmdIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gKGRyb3Bkb3duLm9mZnNldEhlaWdodCArIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGVsLm9mZnNldEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ3dpZHRoJywgKGVsLm9mZnNldFdpZHRoKSArICdweCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ2xlZnQnLCAoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCkgKyAncHgnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmdIZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhlbCwgJ29udG9wJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhkcm9wZG93biwgJ29udG9wJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2JvdHRvbScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZHJvcGRvd24sICd0b3AnLCBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gKyAncHgnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGVsLCAnb250b3AnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGRyb3Bkb3duLCAnb250b3AnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndG9wJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ2JvdHRvbScsIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSArICdweCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIHRvZ2dsZVNlbGVjdEFsbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RBbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHRoaXMuZGF0YS5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSB0aGlzLmRhdGEuZmlsdGVyKChpbmRpdmlkdWFsRGF0YSkgPT4gIWluZGl2aWR1YWxEYXRhW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldKTtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5tYXAoZWxlbWVudCA9PiBlbGVtZW50W3RoaXMuc2V0dGluZ3MucHJpbWFyeUtleV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhzZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayhzZWxlY3RlZEl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RBbGwuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uRGVTZWxlY3RBbGwuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlRmlsdGVyU2VsZWN0QWxsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCkge1xyXG4gICAgICAgICAgICBsZXQgYWRkZWQgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub25GaWx0ZXJTZWxlY3RBbGwuZW1pdChhZGRlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJlbW92ZWQgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm9uRmlsdGVyRGVTZWxlY3RBbGwuZW1pdChyZW1vdmVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyU2VhcmNoKCkge1xyXG5cclxuICAgICAgICB0aGlzLmZpbHRlciA9ICcnO1xyXG4gICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9LCAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25GaWx0ZXJDaGFuZ2UoZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyID09PSAnJyB8fCBkYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzRmlsdGVyU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjbnQgPSAwO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2dycFRpdGxlJykgJiYgdGhpcy5pc1NlbGVjdGVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICBjbnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY250ID4gMCAmJiB0aGlzLmZpbHRlckxlbmd0aCA9PT0gY250KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY250ID4gMCAmJiB0aGlzLmZpbHRlckxlbmd0aCAhPT0gY250KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb25lQXJyYXkoYXJyOiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcnIpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcnIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgY2xvbmUgYXJyYXkgY29udGFpbmluZyBhbiBvYmplY3QhJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TY3JvbGxFbmQoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKGUuZW5kSW5kZXggPT09IHRoaXMuZGF0YS5sZW5ndGggLSAxIHx8IGUuc3RhcnRJbmRleCA9PT0gMCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25TY3JvbGxUb0VuZC5lbWl0KGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyU2VsZWN0aW9uKGU6IE1vdXNlRXZlbnQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhclNlYXJjaCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG5cclxuICAgICAgICB0aGlzLm9uRGVTZWxlY3RBbGwuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG5cclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1Db250ZXh0KGl0ZW06IGFueSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93blN1YnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=