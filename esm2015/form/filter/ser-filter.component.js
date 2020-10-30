// tslint:disable: no-use-before-declare
// tslint:disable: no-host-metadata-property
// tslint:disable: max-line-length
// tslint:disable: no-output-rename
// tslint:disable: no-output-on-prefix
// tslint:disable: prefer-const
// tslint:disable: no-conflicting-lifecycle
// tslint:disable: component-class-suffix
// tslint:disable: component-selector
var SerFilterComponent_1;
import { __decorate, __param } from "tslib";
import { Attribute, HostBinding, Optional, Renderer2 } from '@angular/core';
import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges, ChangeDetectorRef, ViewEncapsulation, ContentChild, ViewChild, forwardRef, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { hasValue } from '../../utils/check';
import { SDBadgeDirective, SDItemDirective } from '../select/ser-select-menu-item.directive';
import { inArray } from '../../utils/array';
const noop = () => {
};
const ɵ0 = noop;
let SerFilterComponent = SerFilterComponent_1 = class SerFilterComponent {
    constructor(_elementRef, cdr, _renderer, primaryKey, labelKey) {
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
    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.cachedItems = this.cloneArray(this.data);
    }
    ngOnChanges(changes) {
        if (changes.data && !changes.data.firstChange) {
            this.cachedItems = this.cloneArray(this.data);
        }
        if (changes.settings && !changes.settings.firstChange) {
            this.settings = Object.assign(this.defaultSettings, this.settings);
        }
        if (changes.loading) {
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
    }
    validate(c) {
        return null;
    }
    writeValue(value) {
        var _a;
        if (hasValue(value)) {
            if (!Array.isArray(value)) {
                throw Error('Single value detected as input, please set "singleSelection" setting in true or remove "multiple" attribute in the select if you added');
            }
            const selectedObjects = (_a = this.data) === null || _a === void 0 ? void 0 : _a.filter(item => {
                return inArray(item[this.settings.primaryKey], value);
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
        this.selectedItems.push(item);
        const items = this.selectedItems.map(element => element[this.settings.primaryKey]);
        this.onChangeCallback(items);
        this.onTouchedCallback(items);
    }
    removeSelected(clickedItem) {
        if (hasValue(this.selectedItems)) {
            this.selectedItems.forEach((item, index) => {
                if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                    this.selectedItems.splice(index, 1);
                }
            });
        }
        this.onChangeCallback(this.selectedItems);
        this.onTouchedCallback(this.selectedItems);
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
        evt.preventDefault();
    }
    openDropdown() {
        if (this.isDisabled) {
            return false;
        }
        this.isActive = true;
        this.labelActive = true;
        this.dropdownSubs.push(fromEvent(window, 'click')
            .pipe(filter((e) => !this._elementRef.nativeElement.contains(e.target)))
            .subscribe(() => this.closeDropdown()));
        this.dropdownSubs.push(fromEvent(window, 'keyup')
            .pipe(filter((e) => e.key.toLowerCase() === 'escape'))
            .subscribe(() => this.closeDropdown()));
        this.dropdownSubs.push(fromEvent(this._elementRef.nativeElement, 'scroll').subscribe(() => console.log('scroll')));
        this.dropdownSubs.push(fromEvent(window, 'resize').subscribe(() => this.setPositionDropdown()));
        this.setPositionDropdown();
        this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
        setTimeout(() => {
            var _a;
            (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
        }, 0);
        this.onOpen.emit(true);
    }
    closeDropdown() {
        if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
        this.clearSearch();
        this.isActive = false;
        this.labelActive = false;
        this.dropdownSubs.forEach(s => s.unsubscribe());
        this.dropdownSubs = [];
        this.onClose.emit(false);
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    }
    setPositionDropdown() {
        setTimeout(() => {
            const dropdown = this.dropdownListElem.nativeElement;
            // const el = (this._elementRef.nativeElement as HTMLElement);
            const el = this.searchInput.nativeElement;
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
            // this.selectedItems = this.data.slice();
            this.selectedItems = this.data.filter((individualData) => !individualData[this.settings.disabledKey]);
            const selectedItems = this.selectedItems.map(element => element[this.settings.primaryKey]);
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
    }
    toggleFilterSelectAll() {
        if (!this.isFilterSelectAll) {
            let added = [];
            this.isFilterSelectAll = true;
            this.onFilterSelectAll.emit(added);
        }
        else {
            let removed = [];
            this.isFilterSelectAll = false;
            this.onFilterDeSelectAll.emit(removed);
        }
        this.closeDropdown();
    }
    clearSearch() {
        this.filter = '';
        this.isFilterSelectAll = false;
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
            throw Error('Cannot clone array containing an object!');
        }
        else {
            return arr;
        }
    }
    onScrollEnd(e) {
        if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {
        }
        this.onScrollToEnd.emit(e);
    }
    clearSelection(e) {
        this.clearSearch();
        this.selectedItems = [];
        this.isSelectAll = false;
        this.onChangeCallback(this.selectedItems);
        this.onTouchedCallback(this.selectedItems);
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
SerFilterComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['primaryKey',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['labelKey',] }] }
];
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
                useExisting: forwardRef(() => SerFilterComponent_1),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => SerFilterComponent_1),
                multi: true,
            }
        ],
        encapsulation: ViewEncapsulation.None
    }),
    __param(3, Optional()), __param(3, Attribute('primaryKey')),
    __param(4, Optional()), __param(4, Attribute('labelKey'))
], SerFilterComponent);
export { SerFilterComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyLWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vZmlsdGVyL3Nlci1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdDQUF3QztBQUN4Qyw0Q0FBNEM7QUFDNUMsa0NBQWtDO0FBQ2xDLG1DQUFtQztBQUNuQyxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLDJDQUEyQztBQUMzQyx5Q0FBeUM7QUFDekMscUNBQXFDOzs7QUFFckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFOLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsYUFBYSxFQUEwQixNQUFNLGdCQUFnQixDQUFDO0FBRWhILE9BQU8sRUFBZ0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO0FBQ2xCLENBQUMsQ0FBQzs7QUFvQkYsSUFBYSxrQkFBa0IsMEJBQS9CLE1BQWEsa0JB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LENBQUMsY0FBYyxDQUFDO29EQUFrQjtBQXpEckMsa0JBQWtCO0lBbEI5QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0Qiw0eUlBQTBDO1FBQzFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRTtRQUM5QyxTQUFTLEVBQUU7WUFDUDtnQkFDSSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG9CQUFrQixDQUFDO2dCQUNqRCxLQUFLLEVBQUUsSUFBSTthQUNkO1lBQ0Q7Z0JBQ0ksT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQWtCLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxJQUFJO2FBQ2Q7U0FDSjtRQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO0tBQ3hDLENBQUM7SUErRzZHLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNqSSxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7R0EvR3JDLGtCQUFrQixDQXNlOUI7U0F0ZVksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXHJcbi8vIHRzbGludDpkaXNhYmxlOiBuby1vdXRwdXQtcmVuYW1lXHJcbi8vIHRzbGludDpkaXNhYmxlOiBuby1vdXRwdXQtb24tcHJlZml4XHJcbi8vIHRzbGludDpkaXNhYmxlOiBwcmVmZXItY29uc3RcclxuLy8gdHNsaW50OmRpc2FibGU6IG5vLWNvbmZsaWN0aW5nLWxpZmVjeWNsZVxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogY29tcG9uZW50LXNlbGVjdG9yXHJcblxyXG5pbXBvcnQgeyBBdHRyaWJ1dGUsIEhvc3RCaW5kaW5nLCBPcHRpb25hbCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdFbmNhcHN1bGF0aW9uLCBDb250ZW50Q2hpbGQsIFZpZXdDaGlsZCwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgVmFsaWRhdG9yLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRmlsdGVyU2V0dGluZ3MgfSBmcm9tICcuL3Nlci1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJqZWN0LCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTZXJGaWx0ZXJMaXN0RmlsdGVyUGlwZSB9IGZyb20gJy4vc2VyLWZpbHRlci1saXN0LWZpbHRlci5waXBlJztcclxuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tICcuLi8uLi91dGlscy9jaGVjayc7XHJcbmltcG9ydCB7IFNEQmFkZ2VEaXJlY3RpdmUsIFNESXRlbURpcmVjdGl2ZSB9IGZyb20gJy4uL3NlbGVjdC9zZXItc2VsZWN0LW1lbnUtaXRlbS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBpbkFycmF5IH0gZnJvbSAnLi4vLi4vdXRpbHMvYXJyYXknO1xyXG5cclxuY29uc3Qgbm9vcCA9ICgpID0+IHtcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzZXItZmlsdGVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZXItZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcclxuICAgIGhvc3Q6IHsgJ1tjbGFzc10nOiAnZGVmYXVsdFNldHRpbmdzLmNsYXNzZXMnIH0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZXJGaWx0ZXJDb21wb25lbnQpLFxyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZXJGaWx0ZXJDb21wb25lbnQpLFxyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICBdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VyRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBWYWxpZGF0b3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgZGF0YSA9IFtdO1xyXG5cclxuICAgIEBJbnB1dCgpIHNldHRpbmdzOiBGaWx0ZXJTZXR0aW5ncztcclxuXHJcbiAgICBASW5wdXQoKSBsb2FkaW5nOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQE91dHB1dCgnb25TZWxlY3QnKVxyXG4gICAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25EZVNlbGVjdCcpXHJcbiAgICBvbkRlU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uU2VsZWN0QWxsJylcclxuICAgIG9uU2VsZWN0QWxsOiBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25EZVNlbGVjdEFsbCcpXHJcbiAgICBvbkRlU2VsZWN0QWxsOiBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25PcGVuJylcclxuICAgIG9uT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvbkNsb3NlJylcclxuICAgIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25TY3JvbGxUb0VuZCcpXHJcbiAgICBvblNjcm9sbFRvRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoJ29uRmlsdGVyU2VsZWN0QWxsJylcclxuICAgIG9uRmlsdGVyU2VsZWN0QWxsOiBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25GaWx0ZXJEZVNlbGVjdEFsbCcpXHJcbiAgICBvbkZpbHRlckRlU2VsZWN0QWxsOiBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25BZGRGaWx0ZXJOZXdJdGVtJylcclxuICAgIG9uQWRkRmlsdGVyTmV3SXRlbTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KCdvbkdyb3VwU2VsZWN0JylcclxuICAgIG9uR3JvdXBTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgQE91dHB1dCgnb25Hcm91cERlU2VsZWN0JylcclxuICAgIG9uR3JvdXBEZVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKFNESXRlbURpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgaXRlbVRlbXBsOiBTREl0ZW1EaXJlY3RpdmU7XHJcbiAgICBAQ29udGVudENoaWxkKFNEQmFkZ2VEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGJhZGdlVGVtcGw6IFNEQmFkZ2VEaXJlY3RpdmU7XHJcblxyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0Jykgc2VhcmNoSW5wdXQ6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdzZWxlY3RlZExpc3QnKSBzZWxlY3RlZExpc3RFbGVtOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnZHJvcGRvd25MaXN0JykgZHJvcGRvd25MaXN0RWxlbTogRWxlbWVudFJlZjtcclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJykgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKSBpc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIHNlYXJjaFRlcm0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuICAgIGZpbHRlclBpcGU6IFNlckZpbHRlckxpc3RGaWx0ZXJQaXBlO1xyXG4gICAgc2VsZWN0ZWRJdGVtczogYW55W10gPSBbXTtcclxuICAgIGlzU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICBpc0ZpbHRlclNlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgZ3JvdXBlZERhdGE6IGFueVtdO1xyXG4gICAgZmlsdGVyOiBhbnk7XHJcbiAgICBjaHVua0FycmF5OiBhbnlbXTtcclxuICAgIHNjcm9sbFRvcDogYW55O1xyXG4gICAgY2h1bmtJbmRleDogYW55W10gPSBbXTtcclxuICAgIGNhY2hlZEl0ZW1zOiBhbnlbXSA9IFtdO1xyXG4gICAgZ3JvdXBDYWNoZWRJdGVtczogYW55W10gPSBbXTtcclxuICAgIHRvdGFsUm93czogYW55O1xyXG4gICAgaXRlbUhlaWdodDogYW55ID0gNDEuNjtcclxuICAgIHNjcmVlbkl0ZW1zTGVuOiBhbnk7XHJcbiAgICB0b3RhbEhlaWdodDogYW55O1xyXG4gICAgc2Nyb2xsZXI6IGFueTtcclxuICAgIHNlbGVjdGVkTGlzdEhlaWdodDogYW55O1xyXG4gICAgZmlsdGVyTGVuZ3RoOiBhbnkgPSAwO1xyXG4gICAgdmlld1BvcnRJdGVtczogYW55O1xyXG4gICAgbGFiZWxBY3RpdmUgPSBmYWxzZTtcclxuICAgIGl0ZW06IGFueTtcclxuXHJcbiAgICBwcml2YXRlIGRyb3Bkb3duU3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBkZWZhdWx0U2V0dGluZ3M6IEZpbHRlclNldHRpbmdzID0ge1xyXG4gICAgICAgIGVuYWJsZUNoZWNrQWxsOiB0cnVlLFxyXG4gICAgICAgIHNlbGVjdEFsbFRleHQ6ICdTZWxlY2Npb25hciB0b2RvJyxcclxuICAgICAgICB1blNlbGVjdEFsbFRleHQ6ICdEZXNlbGVjY2lvbmFyIHRvZG8nLFxyXG4gICAgICAgIGZpbHRlclNlbGVjdEFsbFRleHQ6ICdTZWxlY2Npb25hciB0b2RvcyBsb3MgcmVzdWx0YWRvcyBmaWx0cmFkb3MnLFxyXG4gICAgICAgIGZpbHRlclVuU2VsZWN0QWxsVGV4dDogJ0Rlc2VsZWNjaW9uYXIgdG9kb3MgbG9zIHJlc3VsdGFkb3MgZmlsdHJhZG9zJyxcclxuICAgICAgICBzZWFyY2hCeTogWyduYW1lJ10sXHJcbiAgICAgICAgbWF4SGVpZ2h0OiAzMDAsXHJcbiAgICAgICAgY2xhc3NlczogJycsXHJcbiAgICAgICAgc2VhcmNoUGxhY2Vob2xkZXJUZXh0OiAnRmlsdHJhcicsXHJcbiAgICAgICAgbm9EYXRhTGFiZWw6ICdTaW4gZGF0b3MgZGlzcG9uaWJsZXMnLFxyXG4gICAgICAgIGxhYmVsS2V5OiAnbmFtZScsXHJcbiAgICAgICAgcHJpbWFyeUtleTogJ2lkJyxcclxuICAgICAgICBkaXNhYmxlZEtleTogJ2Rpc2FibGVkJyxcclxuICAgICAgICBlbmFibGVGaWx0ZXJTZWxlY3RBbGw6IHRydWUsXHJcbiAgICAgICAgY2xlYXJBbGw6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgcmFuZG9tU2l6ZSA9IHRydWU7XHJcbiAgICBwdWJsaWMgcGFyc2VFcnJvcjogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBmaWx0ZXJlZExpc3Q6IGFueSA9IFtdO1xyXG4gICAgcHVibGljIGlzRGlzYWJsZWRJdGVtUHJlc2VudCA9IGZhbHNlO1xyXG5cclxuICAgIGhhc1ZhbHVlID0gaGFzVmFsdWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIEBPcHRpb25hbCgpIEBBdHRyaWJ1dGUoJ3ByaW1hcnlLZXknKSBwcmltYXJ5S2V5OiBhbnksXHJcbiAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAQXR0cmlidXRlKCdsYWJlbEtleScpIGxhYmVsS2V5OiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKHByaW1hcnlLZXkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3MucHJpbWFyeUtleSA9IHByaW1hcnlLZXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFiZWxLZXkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3MubGFiZWxLZXkgPSBsYWJlbEtleTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMuY2FjaGVkSXRlbXMgPSB0aGlzLmNsb25lQXJyYXkodGhpcy5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWNoZWRJdGVtcyA9IHRoaXMuY2xvbmVBcnJheSh0aGlzLmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNoYW5nZXMuc2V0dGluZ3MgJiYgIWNoYW5nZXMuc2V0dGluZ3MuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNoYW5nZXMubG9hZGluZykge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5kcm9wZG93bkxpc3RFbGVtLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbUNsaWNrKGl0ZW06IGFueSwgazogbnVtYmVyLCBlOiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCB8fCBpdGVtW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmb3VuZCA9IHRoaXMuaXNTZWxlY3RlZChpdGVtKTtcclxuXHJcbiAgICAgICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoaXRlbSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWQoaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMub25EZVNlbGVjdC5lbWl0KGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RBbGwgfHwgdGhpcy5kYXRhLmxlbmd0aCA+IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZShjOiBGb3JtQ29udHJvbCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcblxyXG4gICAgICAgIGlmIChoYXNWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1NpbmdsZSB2YWx1ZSBkZXRlY3RlZCBhcyBpbnB1dCwgcGxlYXNlIHNldCBcInNpbmdsZVNlbGVjdGlvblwiIHNldHRpbmcgaW4gdHJ1ZSBvciByZW1vdmUgXCJtdWx0aXBsZVwiIGF0dHJpYnV0ZSBpbiB0aGUgc2VsZWN0IGlmIHlvdSBhZGRlZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE9iamVjdHMgPSB0aGlzLmRhdGE/LmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbkFycmF5KGl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYXNWYWx1ZShzZWxlY3RlZE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBzZWxlY3RlZE9iamVjdHM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdObyBwcmltYXJ5S2V5IGZpbmRlZCBpbiBvcHRpb25zLCBwbGVhc2Ugc2V0IFwicHJpbWFyeUtleVwiIHNldHRpbmcgd2l0aCB0aGUgY29ycmVjdCB2YWx1ZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA9PT0gdGhpcy5kYXRhLmxlbmd0aCAmJiB0aGlzLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWVtYmVyLW9yZGVyaW5nXHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtZW1iZXItb3JkZXJpbmdcclxuICAgIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICB0cmFja0J5Rm4oaXRlbTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBpc1NlbGVjdGVkKGNsaWNrZWRJdGVtOiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKGNsaWNrZWRJdGVtW3RoaXMuc2V0dGluZ3MuZGlzYWJsZWRLZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoaGFzVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5zZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZEl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSA9PT0gaXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2VsZWN0ZWQoaXRlbTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLnNlbGVjdGVkSXRlbXMubWFwKGVsZW1lbnQgPT4gZWxlbWVudFt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soaXRlbXMpO1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVNlbGVjdGVkKGNsaWNrZWRJdGVtOiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKGhhc1ZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZEl0ZW1bdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSA9PT0gaXRlbVt0aGlzLnNldHRpbmdzLnByaW1hcnlLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayh0aGlzLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vI3JlZ2lvbiBkcm9wZG93biBzdGF0dXNcclxuXHJcbiAgICB0b2dnbGVEcm9wZG93bihldnQ6IGFueSkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSAhdGhpcy5pc0FjdGl2ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuRHJvcGRvd24oKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYWJlbEFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcGRvd25TdWJzLnB1c2goXHJcbiAgICAgICAgICAgIGZyb21FdmVudCh3aW5kb3csICdjbGljaycpXHJcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcigoZTogTW91c2VFdmVudCkgPT4gIXRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnRhcmdldCkgKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlRHJvcGRvd24oKSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5wdXNoKFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQod2luZG93LCAna2V5dXAnKVxyXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoKGU6IEtleWJvYXJkRXZlbnQpID0+IGUua2V5LnRvTG93ZXJDYXNlKCkgPT09ICdlc2NhcGUnICkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZURyb3Bkb3duKCkgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcGRvd25TdWJzLnB1c2goXHJcbiAgICAgICAgICAgIGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnKS5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coJ3Njcm9sbCcpIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5wdXNoKFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJykuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0UG9zaXRpb25Ecm9wZG93bigpIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uRHJvcGRvd24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRyb3Bkb3duTGlzdEVsZW0ubmF0aXZlRWxlbWVudCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0Py5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfSwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMub25PcGVuLmVtaXQodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlRHJvcGRvd24oKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaElucHV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGVhclNlYXJjaCgpO1xyXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxhYmVsQWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcGRvd25TdWJzLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkgKTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3VicyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRyb3Bkb3duTGlzdEVsZW0ubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UG9zaXRpb25Ecm9wZG93bigpIHtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93biA9ICh0aGlzLmRyb3Bkb3duTGlzdEVsZW0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IGVsID0gKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsID0gKHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbWFpbmluZ0hlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQgLSAoZHJvcGRvd24ub2Zmc2V0SGVpZ2h0ICsgZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZWwub2Zmc2V0SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duLCAnd2lkdGgnLCAoZWwub2Zmc2V0V2lkdGgpICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duLCAnbGVmdCcsIChlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSArICdweCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlbWFpbmluZ0hlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGVsLCAnb250b3AnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGRyb3Bkb3duLCAnb250b3AnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ3RvcCcsIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSArICdweCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoZWwsICdvbnRvcCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoZHJvcGRvd24sICdvbnRvcCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0b3AnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duLCAnYm90dG9tJywgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQgLSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgdG9nZ2xlU2VsZWN0QWxsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1NlbGVjdEFsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3RlZEl0ZW1zID0gdGhpcy5kYXRhLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHRoaXMuZGF0YS5maWx0ZXIoKGluZGl2aWR1YWxEYXRhKSA9PiAhaW5kaXZpZHVhbERhdGFbdGhpcy5zZXR0aW5ncy5kaXNhYmxlZEtleV0pO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gdGhpcy5zZWxlY3RlZEl0ZW1zLm1hcChlbGVtZW50ID0+IGVsZW1lbnRbdGhpcy5zZXR0aW5ncy5wcmltYXJ5S2V5XSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHNlbGVjdGVkSXRlbXMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdEFsbC5lbWl0KHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25EZVNlbGVjdEFsbC5lbWl0KHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVGaWx0ZXJTZWxlY3RBbGwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRmlsdGVyU2VsZWN0QWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBhZGRlZCA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmlzRmlsdGVyU2VsZWN0QWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbkZpbHRlclNlbGVjdEFsbC5lbWl0KGFkZGVkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmVtb3ZlZCA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmlzRmlsdGVyU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub25GaWx0ZXJEZVNlbGVjdEFsbC5lbWl0KHJlbW92ZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJTZWFyY2goKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZmlsdGVyID0gJyc7XHJcbiAgICAgICAgdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0sIDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkZpbHRlckNoYW5nZShkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIgPT09ICcnIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWx0ZXJTZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNudCA9IDA7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXRlbS5oYXNPd25Qcm9wZXJ0eSgnZ3JwVGl0bGUnKSAmJiB0aGlzLmlzU2VsZWN0ZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIGNudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjbnQgPiAwICYmIHRoaXMuZmlsdGVyTGVuZ3RoID09PSBjbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjbnQgPiAwICYmIHRoaXMuZmlsdGVyTGVuZ3RoICE9PSBjbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0ZpbHRlclNlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvbmVBcnJheShhcnI6IGFueSkge1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFycikpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyciA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBjbG9uZSBhcnJheSBjb250YWluaW5nIGFuIG9iamVjdCEnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNjcm9sbEVuZChlOiBhbnkpIHtcclxuICAgICAgICBpZiAoZS5lbmRJbmRleCA9PT0gdGhpcy5kYXRhLmxlbmd0aCAtIDEgfHwgZS5zdGFydEluZGV4ID09PSAwKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vblNjcm9sbFRvRW5kLmVtaXQoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJTZWxlY3Rpb24oZTogTW91c2VFdmVudCkge1xyXG5cclxuICAgICAgICB0aGlzLmNsZWFyU2VhcmNoKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcblxyXG4gICAgICAgIHRoaXMub25EZVNlbGVjdEFsbC5lbWl0KHRoaXMuc2VsZWN0ZWRJdGVtcyk7XHJcblxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbUNvbnRleHQoaXRlbTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duU3Vicy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==