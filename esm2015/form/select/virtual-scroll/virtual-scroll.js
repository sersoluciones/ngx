import { __decorate, __param } from "tslib";
import { Component, ContentChild, ElementRef, EventEmitter, Inject, Optional, Input, NgModule, NgZone, OnChanges, OnDestroy, OnInit, Output, Renderer2, ViewChild, ChangeDetectorRef, InjectionToken } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { CommonModule } from '@angular/common';
import * as tween from '@tweenjs/tween.js';
export function VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY() {
    return {
        scrollThrottlingTime: 0,
        scrollDebounceTime: 0,
        scrollAnimationTime: 750,
        checkResizeInterval: 1000,
        resizeBypassRefreshThreshold: 5,
        modifyOverflowStyleOfParentScroll: true,
        stripedTable: false
    };
}
let VirtualScrollerComponent = class VirtualScrollerComponent {
    constructor(element, renderer, zone, changeDetectorRef, platformId, options) {
        this.element = element;
        this.renderer = renderer;
        this.zone = zone;
        this.changeDetectorRef = changeDetectorRef;
        this.window = window;
        this.executeRefreshOutsideAngularZone = false;
        this._enableUnequalChildrenSizes = false;
        this.useMarginInsteadOfTranslate = false;
        this.ssrViewportWidth = 1920;
        this.ssrViewportHeight = 1080;
        this._bufferAmount = 0;
        this._items = [];
        this.compareItems = (item1, item2) => item1 === item2;
        this.vsUpdate = new EventEmitter();
        this.vsChange = new EventEmitter();
        this.vsStart = new EventEmitter();
        this.vsEnd = new EventEmitter();
        this.calculatedScrollbarWidth = 0;
        this.calculatedScrollbarHeight = 0;
        this.padding = 0;
        this.previousViewPort = {};
        this.cachedPageSize = 0;
        this.previousScrollNumberElements = 0;
        this.isAngularUniversalSSR = isPlatformServer(platformId);
        this.scrollThrottlingTime = options.scrollThrottlingTime;
        this.scrollDebounceTime = options.scrollDebounceTime;
        this.scrollAnimationTime = options.scrollAnimationTime;
        this.scrollbarWidth = options.scrollbarWidth;
        this.scrollbarHeight = options.scrollbarHeight;
        this.checkResizeInterval = options.checkResizeInterval;
        this.resizeBypassRefreshThreshold = options.resizeBypassRefreshThreshold;
        this.modifyOverflowStyleOfParentScroll = options.modifyOverflowStyleOfParentScroll;
        this.stripedTable = options.stripedTable;
        this.horizontal = false;
        this.resetWrapGroupDimensions();
    }
    get viewPortInfo() {
        let pageInfo = this.previousViewPort || {};
        return {
            startIndex: pageInfo.startIndex || 0,
            endIndex: pageInfo.endIndex || 0,
            scrollStartPosition: pageInfo.scrollStartPosition || 0,
            scrollEndPosition: pageInfo.scrollEndPosition || 0,
            maxScrollPosition: pageInfo.maxScrollPosition || 0,
            startIndexWithBuffer: pageInfo.startIndexWithBuffer || 0,
            endIndexWithBuffer: pageInfo.endIndexWithBuffer || 0
        };
    }
    get enableUnequalChildrenSizes() {
        return this._enableUnequalChildrenSizes;
    }
    set enableUnequalChildrenSizes(value) {
        if (this._enableUnequalChildrenSizes === value) {
            return;
        }
        this._enableUnequalChildrenSizes = value;
        this.minMeasuredChildWidth = undefined;
        this.minMeasuredChildHeight = undefined;
    }
    get bufferAmount() {
        if (typeof (this._bufferAmount) === 'number' && this._bufferAmount >= 0) {
            return this._bufferAmount;
        }
        else {
            return this.enableUnequalChildrenSizes ? 5 : 0;
        }
    }
    set bufferAmount(value) {
        this._bufferAmount = value;
    }
    get scrollThrottlingTime() {
        return this._scrollThrottlingTime;
    }
    set scrollThrottlingTime(value) {
        this._scrollThrottlingTime = value;
        this.updateOnScrollFunction();
    }
    get scrollDebounceTime() {
        return this._scrollDebounceTime;
    }
    set scrollDebounceTime(value) {
        this._scrollDebounceTime = value;
        this.updateOnScrollFunction();
    }
    updateOnScrollFunction() {
        if (this.scrollDebounceTime) {
            this.onScroll = this.debounce(() => {
                this.refresh_internal(false);
            }, this.scrollDebounceTime);
        }
        else if (this.scrollThrottlingTime) {
            this.onScroll = this.throttleTrailing(() => {
                this.refresh_internal(false);
            }, this.scrollThrottlingTime);
        }
        else {
            this.onScroll = () => {
                this.refresh_internal(false);
            };
        }
    }
    get checkResizeInterval() {
        return this._checkResizeInterval;
    }
    set checkResizeInterval(value) {
        if (this._checkResizeInterval === value) {
            return;
        }
        this._checkResizeInterval = value;
        this.addScrollEventHandlers();
    }
    get items() {
        return this._items;
    }
    set items(value) {
        if (value === this._items) {
            return;
        }
        this._items = value || [];
        this.refresh_internal(true);
    }
    get horizontal() {
        return this._horizontal;
    }
    set horizontal(value) {
        this._horizontal = value;
        this.updateDirection();
    }
    revertParentOverscroll() {
        const scrollElement = this.getScrollElement();
        if (scrollElement && this.oldParentScrollOverflow) {
            scrollElement.style['overflow-y'] = this.oldParentScrollOverflow.y;
            scrollElement.style['overflow-x'] = this.oldParentScrollOverflow.x;
        }
        this.oldParentScrollOverflow = undefined;
    }
    get parentScroll() {
        return this._parentScroll;
    }
    set parentScroll(value) {
        if (this._parentScroll === value) {
            return;
        }
        this.revertParentOverscroll();
        this._parentScroll = value;
        this.addScrollEventHandlers();
        const scrollElement = this.getScrollElement();
        if (this.modifyOverflowStyleOfParentScroll && scrollElement !== this.element.nativeElement) {
            this.oldParentScrollOverflow = { x: scrollElement.style['overflow-x'], y: scrollElement.style['overflow-y'] };
            scrollElement.style['overflow-y'] = this.horizontal ? 'visible' : 'auto';
            scrollElement.style['overflow-x'] = this.horizontal ? 'auto' : 'visible';
        }
    }
    ngOnInit() {
        this.addScrollEventHandlers();
    }
    ngOnDestroy() {
        this.removeScrollEventHandlers();
        this.revertParentOverscroll();
    }
    ngOnChanges(changes) {
        let indexLengthChanged = this.cachedItemsLength !== this.items.length;
        this.cachedItemsLength = this.items.length;
        const firstRun = !changes.items || !changes.items.previousValue || changes.items.previousValue.length === 0;
        this.refresh_internal(indexLengthChanged || firstRun);
    }
    ngDoCheck() {
        if (this.cachedItemsLength !== this.items.length) {
            this.cachedItemsLength = this.items.length;
            this.refresh_internal(true);
            return;
        }
        if (this.previousViewPort && this.viewPortItems && this.viewPortItems.length > 0) {
            let itemsArrayChanged = false;
            for (let i = 0; i < this.viewPortItems.length; ++i) {
                if (!this.compareItems(this.items[this.previousViewPort.startIndexWithBuffer + i], this.viewPortItems[i])) {
                    itemsArrayChanged = true;
                    break;
                }
            }
            if (itemsArrayChanged) {
                this.refresh_internal(true);
            }
        }
    }
    refresh() {
        this.refresh_internal(true);
    }
    invalidateAllCachedMeasurements() {
        this.wrapGroupDimensions = {
            maxChildSizePerWrapGroup: [],
            numberOfKnownWrapGroupChildSizes: 0,
            sumOfKnownWrapGroupChildWidths: 0,
            sumOfKnownWrapGroupChildHeights: 0
        };
        this.minMeasuredChildWidth = undefined;
        this.minMeasuredChildHeight = undefined;
        this.refresh_internal(false);
    }
    invalidateCachedMeasurementForItem(item) {
        if (this.enableUnequalChildrenSizes) {
            let index = this.items && this.items.indexOf(item);
            if (index >= 0) {
                this.invalidateCachedMeasurementAtIndex(index);
            }
        }
        else {
            this.minMeasuredChildWidth = undefined;
            this.minMeasuredChildHeight = undefined;
        }
        this.refresh_internal(false);
    }
    invalidateCachedMeasurementAtIndex(index) {
        if (this.enableUnequalChildrenSizes) {
            let cachedMeasurement = this.wrapGroupDimensions.maxChildSizePerWrapGroup[index];
            if (cachedMeasurement) {
                this.wrapGroupDimensions.maxChildSizePerWrapGroup[index] = undefined;
                --this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= cachedMeasurement.childWidth || 0;
                this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= cachedMeasurement.childHeight || 0;
            }
        }
        else {
            this.minMeasuredChildWidth = undefined;
            this.minMeasuredChildHeight = undefined;
        }
        this.refresh_internal(false);
    }
    scrollInto(item, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        let index = this.items.indexOf(item);
        if (index === -1) {
            return;
        }
        this.scrollToIndex(index, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback);
    }
    scrollToIndex(index, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        let maxRetries = 5;
        let retryIfNeeded = () => {
            --maxRetries;
            if (maxRetries <= 0) {
                if (animationCompletedCallback) {
                    animationCompletedCallback();
                }
                return;
            }
            let dimensions = this.calculateDimensions();
            let desiredStartIndex = Math.min(Math.max(index, 0), dimensions.itemCount - 1);
            if (this.previousViewPort.startIndex === desiredStartIndex) {
                if (animationCompletedCallback) {
                    animationCompletedCallback();
                }
                return;
            }
            this.scrollToIndex_internal(index, alignToBeginning, additionalOffset, 0, retryIfNeeded);
        };
        this.scrollToIndex_internal(index, alignToBeginning, additionalOffset, animationMilliseconds, retryIfNeeded);
    }
    scrollToIndex_internal(index, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        animationMilliseconds = animationMilliseconds === undefined ? this.scrollAnimationTime : animationMilliseconds;
        let dimensions = this.calculateDimensions();
        let scroll = this.calculatePadding(index, dimensions) + additionalOffset;
        if (!alignToBeginning) {
            scroll -= dimensions.wrapGroupsPerPage * dimensions[this._childScrollDim];
        }
        this.scrollToPosition(scroll, animationMilliseconds, animationCompletedCallback);
    }
    scrollToPosition(scrollPosition, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        scrollPosition += this.getElementsOffset();
        animationMilliseconds = animationMilliseconds === undefined ? this.scrollAnimationTime : animationMilliseconds;
        let scrollElement = this.getScrollElement();
        let animationRequest;
        if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = undefined;
        }
        if (!animationMilliseconds) {
            this.renderer.setProperty(scrollElement, this._scrollType, scrollPosition);
            this.refresh_internal(false, animationCompletedCallback);
            return;
        }
        const tweenConfigObj = { scrollPosition: scrollElement[this._scrollType] };
        let newTween = new tween.Tween(tweenConfigObj)
            .to({ scrollPosition }, animationMilliseconds)
            .easing(tween.Easing.Quadratic.Out)
            .onUpdate((data) => {
            if (isNaN(data.scrollPosition)) {
                return;
            }
            this.renderer.setProperty(scrollElement, this._scrollType, data.scrollPosition);
            this.refresh_internal(false);
        })
            .onStop(() => {
            cancelAnimationFrame(animationRequest);
        })
            .start();
        const animate = (time) => {
            if (!newTween["isPlaying"]()) {
                return;
            }
            newTween.update(time);
            if (tweenConfigObj.scrollPosition === scrollPosition) {
                this.refresh_internal(false, animationCompletedCallback);
                return;
            }
            this.zone.runOutsideAngular(() => {
                animationRequest = requestAnimationFrame(animate);
            });
        };
        animate();
        this.currentTween = newTween;
    }
    getElementSize(element) {
        let result = element.getBoundingClientRect();
        let styles = getComputedStyle(element);
        let marginTop = parseInt(styles['margin-top'], 10) || 0;
        let marginBottom = parseInt(styles['margin-bottom'], 10) || 0;
        let marginLeft = parseInt(styles['margin-left'], 10) || 0;
        let marginRight = parseInt(styles['margin-right'], 10) || 0;
        return {
            top: result.top + marginTop,
            bottom: result.bottom + marginBottom,
            left: result.left + marginLeft,
            right: result.right + marginRight,
            width: result.width + marginLeft + marginRight,
            height: result.height + marginTop + marginBottom
        };
    }
    checkScrollElementResized() {
        let boundingRect = this.getElementSize(this.getScrollElement());
        let sizeChanged;
        if (!this.previousScrollBoundingRect) {
            sizeChanged = true;
        }
        else {
            let widthChange = Math.abs(boundingRect.width - this.previousScrollBoundingRect.width);
            let heightChange = Math.abs(boundingRect.height - this.previousScrollBoundingRect.height);
            sizeChanged = widthChange > this.resizeBypassRefreshThreshold || heightChange > this.resizeBypassRefreshThreshold;
        }
        if (sizeChanged) {
            this.previousScrollBoundingRect = boundingRect;
            if (boundingRect.width > 0 && boundingRect.height > 0) {
                this.refresh_internal(false);
            }
        }
    }
    updateDirection() {
        if (this.horizontal) {
            this._invisiblePaddingProperty = 'width';
            this._offsetType = 'offsetLeft';
            this._pageOffsetType = 'pageXOffset';
            this._childScrollDim = 'childWidth';
            this._marginDir = 'margin-left';
            this._translateDir = 'translateX';
            this._scrollType = 'scrollLeft';
        }
        else {
            this._invisiblePaddingProperty = 'height';
            this._offsetType = 'offsetTop';
            this._pageOffsetType = 'pageYOffset';
            this._childScrollDim = 'childHeight';
            this._marginDir = 'margin-top';
            this._translateDir = 'translateY';
            this._scrollType = 'scrollTop';
        }
    }
    debounce(func, wait) {
        const throttled = this.throttleTrailing(func, wait);
        const result = function () {
            throttled['cancel']();
            throttled.apply(this, arguments);
        };
        result['cancel'] = function () {
            throttled['cancel']();
        };
        return result;
    }
    throttleTrailing(func, wait) {
        let timeout = undefined;
        let _arguments = arguments;
        const result = function () {
            const _this = this;
            _arguments = arguments;
            if (timeout) {
                return;
            }
            if (wait <= 0) {
                func.apply(_this, _arguments);
            }
            else {
                timeout = setTimeout(function () {
                    timeout = undefined;
                    func.apply(_this, _arguments);
                }, wait);
            }
        };
        result['cancel'] = function () {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }
        };
        return result;
    }
    refresh_internal(itemsArrayModified, refreshCompletedCallback = undefined, maxRunTimes = 2) {
        //note: maxRunTimes is to force it to keep recalculating if the previous iteration caused a re-render (different sliced items in viewport or scrollPosition changed).
        //The default of 2x max will probably be accurate enough without causing too large a performance bottleneck
        //The code would typically quit out on the 2nd iteration anyways. The main time it'd think more than 2 runs would be necessary would be for vastly different sized child items or if this is the 1st time the items array was initialized.
        //Without maxRunTimes, If the user is actively scrolling this code would become an infinite loop until they stopped scrolling. This would be okay, except each scroll event would start an additional infinte loop. We want to short-circuit it to prevent this.
        if (itemsArrayModified && this.previousViewPort && this.previousViewPort.scrollStartPosition > 0) {
            //if items were prepended, scroll forward to keep same items visible
            let oldViewPort = this.previousViewPort;
            let oldViewPortItems = this.viewPortItems;
            let oldRefreshCompletedCallback = refreshCompletedCallback;
            refreshCompletedCallback = () => {
                let scrollLengthDelta = this.previousViewPort.scrollLength - oldViewPort.scrollLength;
                if (scrollLengthDelta > 0 && this.viewPortItems) {
                    let oldStartItem = oldViewPortItems[0];
                    let oldStartItemIndex = this.items.findIndex(x => this.compareItems(oldStartItem, x));
                    if (oldStartItemIndex > this.previousViewPort.startIndexWithBuffer) {
                        let itemOrderChanged = false;
                        for (let i = 1; i < this.viewPortItems.length; ++i) {
                            if (!this.compareItems(this.items[oldStartItemIndex + i], oldViewPortItems[i])) {
                                itemOrderChanged = true;
                                break;
                            }
                        }
                        if (!itemOrderChanged) {
                            this.scrollToPosition(this.previousViewPort.scrollStartPosition + scrollLengthDelta, 0, oldRefreshCompletedCallback);
                            return;
                        }
                    }
                }
                if (oldRefreshCompletedCallback) {
                    oldRefreshCompletedCallback();
                }
            };
        }
        this.zone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
                if (itemsArrayModified) {
                    this.resetWrapGroupDimensions();
                }
                let viewport = this.calculateViewport();
                let startChanged = itemsArrayModified || viewport.startIndex !== this.previousViewPort.startIndex;
                let endChanged = itemsArrayModified || viewport.endIndex !== this.previousViewPort.endIndex;
                let scrollLengthChanged = viewport.scrollLength !== this.previousViewPort.scrollLength;
                let paddingChanged = viewport.padding !== this.previousViewPort.padding;
                let scrollPositionChanged = viewport.scrollStartPosition !== this.previousViewPort.scrollStartPosition || viewport.scrollEndPosition !== this.previousViewPort.scrollEndPosition || viewport.maxScrollPosition !== this.previousViewPort.maxScrollPosition;
                this.previousViewPort = viewport;
                if (scrollLengthChanged) {
                    this.renderer.setStyle(this.invisiblePaddingElementRef.nativeElement, this._invisiblePaddingProperty, `${viewport.scrollLength}px`);
                }
                if (paddingChanged) {
                    if (this.useMarginInsteadOfTranslate) {
                        this.renderer.setStyle(this.contentElementRef.nativeElement, this._marginDir, `${viewport.padding}px`);
                    }
                    else {
                        this.renderer.setStyle(this.contentElementRef.nativeElement, 'transform', `${this._translateDir}(${viewport.padding}px)`);
                        this.renderer.setStyle(this.contentElementRef.nativeElement, 'webkitTransform', `${this._translateDir}(${viewport.padding}px)`);
                    }
                }
                if (this.headerElementRef) {
                    let scrollPosition = this.getScrollElement()[this._scrollType];
                    let containerOffset = this.getElementsOffset();
                    let offset = Math.max(scrollPosition - viewport.padding - containerOffset + this.headerElementRef.nativeElement.clientHeight, 0);
                    this.renderer.setStyle(this.headerElementRef.nativeElement, 'transform', `${this._translateDir}(${offset}px)`);
                    this.renderer.setStyle(this.headerElementRef.nativeElement, 'webkitTransform', `${this._translateDir}(${offset}px)`);
                }
                const changeEventArg = (startChanged || endChanged) ? {
                    startIndex: viewport.startIndex,
                    endIndex: viewport.endIndex,
                    scrollStartPosition: viewport.scrollStartPosition,
                    scrollEndPosition: viewport.scrollEndPosition,
                    startIndexWithBuffer: viewport.startIndexWithBuffer,
                    endIndexWithBuffer: viewport.endIndexWithBuffer,
                    maxScrollPosition: viewport.maxScrollPosition
                } : undefined;
                if (startChanged || endChanged || scrollPositionChanged) {
                    const handleChanged = () => {
                        // update the scroll list to trigger re-render of components in viewport
                        this.viewPortItems = viewport.startIndexWithBuffer >= 0 && viewport.endIndexWithBuffer >= 0 ? this.items.slice(viewport.startIndexWithBuffer, viewport.endIndexWithBuffer + 1) : [];
                        this.vsUpdate.emit(this.viewPortItems);
                        if (startChanged) {
                            this.vsStart.emit(changeEventArg);
                        }
                        if (endChanged) {
                            this.vsEnd.emit(changeEventArg);
                        }
                        if (startChanged || endChanged) {
                            this.changeDetectorRef.markForCheck();
                            this.vsChange.emit(changeEventArg);
                        }
                        if (maxRunTimes > 0) {
                            this.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
                            return;
                        }
                        if (refreshCompletedCallback) {
                            refreshCompletedCallback();
                        }
                    };
                    if (this.executeRefreshOutsideAngularZone) {
                        handleChanged();
                    }
                    else {
                        this.zone.run(handleChanged);
                    }
                }
                else {
                    if (maxRunTimes > 0 && (scrollLengthChanged || paddingChanged)) {
                        this.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
                        return;
                    }
                    if (refreshCompletedCallback) {
                        refreshCompletedCallback();
                    }
                }
            });
        });
    }
    getScrollElement() {
        return this.parentScroll instanceof Window ? document.scrollingElement || document.documentElement || document.body : this.parentScroll || this.element.nativeElement;
    }
    addScrollEventHandlers() {
        if (this.isAngularUniversalSSR) {
            return;
        }
        let scrollElement = this.getScrollElement();
        this.removeScrollEventHandlers();
        this.zone.runOutsideAngular(() => {
            if (this.parentScroll instanceof Window) {
                this.disposeScrollHandler = this.renderer.listen('window', 'scroll', this.onScroll);
                this.disposeResizeHandler = this.renderer.listen('window', 'resize', this.onScroll);
            }
            else {
                this.disposeScrollHandler = this.renderer.listen(scrollElement, 'scroll', this.onScroll);
                if (this._checkResizeInterval > 0) {
                    this.checkScrollElementResizedTimer = setInterval(() => { this.checkScrollElementResized(); }, this._checkResizeInterval);
                }
            }
        });
    }
    removeScrollEventHandlers() {
        if (this.checkScrollElementResizedTimer) {
            clearInterval(this.checkScrollElementResizedTimer);
        }
        if (this.disposeScrollHandler) {
            this.disposeScrollHandler();
            this.disposeScrollHandler = undefined;
        }
        if (this.disposeResizeHandler) {
            this.disposeResizeHandler();
            this.disposeResizeHandler = undefined;
        }
    }
    getElementsOffset() {
        if (this.isAngularUniversalSSR) {
            return 0;
        }
        let offset = 0;
        if (this.containerElementRef && this.containerElementRef.nativeElement) {
            offset += this.containerElementRef.nativeElement[this._offsetType];
        }
        if (this.parentScroll) {
            let scrollElement = this.getScrollElement();
            let elementClientRect = this.getElementSize(this.element.nativeElement);
            let scrollClientRect = this.getElementSize(scrollElement);
            if (this.horizontal) {
                offset += elementClientRect.left - scrollClientRect.left;
            }
            else {
                offset += elementClientRect.top - scrollClientRect.top;
            }
            if (!(this.parentScroll instanceof Window)) {
                offset += scrollElement[this._scrollType];
            }
        }
        return offset;
    }
    countItemsPerWrapGroup() {
        if (this.isAngularUniversalSSR) {
            return Math.round(this.horizontal ? this.ssrViewportHeight / this.ssrChildHeight : this.ssrViewportWidth / this.ssrChildWidth);
        }
        let propertyName = this.horizontal ? 'offsetLeft' : 'offsetTop';
        let children = ((this.containerElementRef && this.containerElementRef.nativeElement) || this.contentElementRef.nativeElement).children;
        let childrenLength = children ? children.length : 0;
        if (childrenLength === 0) {
            return 1;
        }
        let firstOffset = children[0][propertyName];
        let result = 1;
        while (result < childrenLength && firstOffset === children[result][propertyName]) {
            ++result;
        }
        return result;
    }
    getScrollStartPosition() {
        let windowScrollValue = undefined;
        if (this.parentScroll instanceof Window) {
            windowScrollValue = window[this._pageOffsetType];
        }
        return windowScrollValue || this.getScrollElement()[this._scrollType] || 0;
    }
    resetWrapGroupDimensions() {
        const oldWrapGroupDimensions = this.wrapGroupDimensions;
        this.invalidateAllCachedMeasurements();
        if (!this.enableUnequalChildrenSizes || !oldWrapGroupDimensions || oldWrapGroupDimensions.numberOfKnownWrapGroupChildSizes === 0) {
            return;
        }
        const itemsPerWrapGroup = this.countItemsPerWrapGroup();
        for (let wrapGroupIndex = 0; wrapGroupIndex < oldWrapGroupDimensions.maxChildSizePerWrapGroup.length; ++wrapGroupIndex) {
            const oldWrapGroupDimension = oldWrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
            if (!oldWrapGroupDimension || !oldWrapGroupDimension.items || !oldWrapGroupDimension.items.length) {
                continue;
            }
            if (oldWrapGroupDimension.items.length !== itemsPerWrapGroup) {
                return;
            }
            let itemsChanged = false;
            let arrayStartIndex = itemsPerWrapGroup * wrapGroupIndex;
            for (let i = 0; i < itemsPerWrapGroup; ++i) {
                if (!this.compareItems(oldWrapGroupDimension.items[i], this.items[arrayStartIndex + i])) {
                    itemsChanged = true;
                    break;
                }
            }
            if (!itemsChanged) {
                ++this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += oldWrapGroupDimension.childWidth || 0;
                this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += oldWrapGroupDimension.childHeight || 0;
                this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = oldWrapGroupDimension;
            }
        }
    }
    calculateDimensions() {
        let scrollElement = this.getScrollElement();
        const maxCalculatedScrollBarSize = 25; // Note: Formula to auto-calculate doesn't work for ParentScroll, so we default to this if not set by consuming application
        this.calculatedScrollbarHeight = Math.max(Math.min(scrollElement.offsetHeight - scrollElement.clientHeight, maxCalculatedScrollBarSize), this.calculatedScrollbarHeight);
        this.calculatedScrollbarWidth = Math.max(Math.min(scrollElement.offsetWidth - scrollElement.clientWidth, maxCalculatedScrollBarSize), this.calculatedScrollbarWidth);
        let viewportWidth = scrollElement.offsetWidth - (this.scrollbarWidth || this.calculatedScrollbarWidth || (this.horizontal ? 0 : maxCalculatedScrollBarSize));
        let viewportHeight = scrollElement.offsetHeight - (this.scrollbarHeight || this.calculatedScrollbarHeight || (this.horizontal ? maxCalculatedScrollBarSize : 0));
        let content = (this.containerElementRef && this.containerElementRef.nativeElement) || this.contentElementRef.nativeElement;
        let itemsPerWrapGroup = this.countItemsPerWrapGroup();
        let wrapGroupsPerPage;
        let defaultChildWidth;
        let defaultChildHeight;
        if (this.isAngularUniversalSSR) {
            viewportWidth = this.ssrViewportWidth;
            viewportHeight = this.ssrViewportHeight;
            defaultChildWidth = this.ssrChildWidth;
            defaultChildHeight = this.ssrChildHeight;
            let itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
            let itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
            wrapGroupsPerPage = this.horizontal ? itemsPerRow : itemsPerCol;
        }
        else if (!this.enableUnequalChildrenSizes) {
            if (content.children.length > 0) {
                if (!this.childWidth || !this.childHeight) {
                    if (!this.minMeasuredChildWidth && viewportWidth > 0) {
                        this.minMeasuredChildWidth = viewportWidth;
                    }
                    if (!this.minMeasuredChildHeight && viewportHeight > 0) {
                        this.minMeasuredChildHeight = viewportHeight;
                    }
                }
                let child = content.children[0];
                let clientRect = this.getElementSize(child);
                this.minMeasuredChildWidth = Math.min(this.minMeasuredChildWidth, clientRect.width);
                this.minMeasuredChildHeight = Math.min(this.minMeasuredChildHeight, clientRect.height);
            }
            defaultChildWidth = this.childWidth || this.minMeasuredChildWidth || viewportWidth;
            defaultChildHeight = this.childHeight || this.minMeasuredChildHeight || viewportHeight;
            let itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
            let itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
            wrapGroupsPerPage = this.horizontal ? itemsPerRow : itemsPerCol;
        }
        else {
            let scrollOffset = scrollElement[this._scrollType] - (this.previousViewPort ? this.previousViewPort.padding : 0);
            let arrayStartIndex = this.previousViewPort.startIndexWithBuffer || 0;
            let wrapGroupIndex = Math.ceil(arrayStartIndex / itemsPerWrapGroup);
            let maxWidthForWrapGroup = 0;
            let maxHeightForWrapGroup = 0;
            let sumOfVisibleMaxWidths = 0;
            let sumOfVisibleMaxHeights = 0;
            wrapGroupsPerPage = 0;
            for (let i = 0; i < content.children.length; ++i) {
                ++arrayStartIndex;
                let child = content.children[i];
                let clientRect = this.getElementSize(child);
                maxWidthForWrapGroup = Math.max(maxWidthForWrapGroup, clientRect.width);
                maxHeightForWrapGroup = Math.max(maxHeightForWrapGroup, clientRect.height);
                if (arrayStartIndex % itemsPerWrapGroup === 0) {
                    let oldValue = this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
                    if (oldValue) {
                        --this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                        this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= oldValue.childWidth || 0;
                        this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= oldValue.childHeight || 0;
                    }
                    ++this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                    const items = this.items.slice(arrayStartIndex - itemsPerWrapGroup, arrayStartIndex);
                    this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = {
                        childWidth: maxWidthForWrapGroup,
                        childHeight: maxHeightForWrapGroup,
                        items: items
                    };
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += maxWidthForWrapGroup;
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += maxHeightForWrapGroup;
                    if (this.horizontal) {
                        let maxVisibleWidthForWrapGroup = Math.min(maxWidthForWrapGroup, Math.max(viewportWidth - sumOfVisibleMaxWidths, 0));
                        if (scrollOffset > 0) {
                            let scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleWidthForWrapGroup);
                            maxVisibleWidthForWrapGroup -= scrollOffsetToRemove;
                            scrollOffset -= scrollOffsetToRemove;
                        }
                        sumOfVisibleMaxWidths += maxVisibleWidthForWrapGroup;
                        if (maxVisibleWidthForWrapGroup > 0 && viewportWidth >= sumOfVisibleMaxWidths) {
                            ++wrapGroupsPerPage;
                        }
                    }
                    else {
                        let maxVisibleHeightForWrapGroup = Math.min(maxHeightForWrapGroup, Math.max(viewportHeight - sumOfVisibleMaxHeights, 0));
                        if (scrollOffset > 0) {
                            let scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleHeightForWrapGroup);
                            maxVisibleHeightForWrapGroup -= scrollOffsetToRemove;
                            scrollOffset -= scrollOffsetToRemove;
                        }
                        sumOfVisibleMaxHeights += maxVisibleHeightForWrapGroup;
                        if (maxVisibleHeightForWrapGroup > 0 && viewportHeight >= sumOfVisibleMaxHeights) {
                            ++wrapGroupsPerPage;
                        }
                    }
                    ++wrapGroupIndex;
                    maxWidthForWrapGroup = 0;
                    maxHeightForWrapGroup = 0;
                }
            }
            let averageChildWidth = this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
            let averageChildHeight = this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
            defaultChildWidth = this.childWidth || averageChildWidth || viewportWidth;
            defaultChildHeight = this.childHeight || averageChildHeight || viewportHeight;
            if (this.horizontal) {
                if (viewportWidth > sumOfVisibleMaxWidths) {
                    wrapGroupsPerPage += Math.ceil((viewportWidth - sumOfVisibleMaxWidths) / defaultChildWidth);
                }
            }
            else {
                if (viewportHeight > sumOfVisibleMaxHeights) {
                    wrapGroupsPerPage += Math.ceil((viewportHeight - sumOfVisibleMaxHeights) / defaultChildHeight);
                }
            }
        }
        let itemCount = this.items.length;
        let itemsPerPage = itemsPerWrapGroup * wrapGroupsPerPage;
        let pageCount_fractional = itemCount / itemsPerPage;
        let numberOfWrapGroups = Math.ceil(itemCount / itemsPerWrapGroup);
        let scrollLength = 0;
        let defaultScrollLengthPerWrapGroup = this.horizontal ? defaultChildWidth : defaultChildHeight;
        if (this.enableUnequalChildrenSizes) {
            let numUnknownChildSizes = 0;
            for (let i = 0; i < numberOfWrapGroups; ++i) {
                let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
                if (childSize) {
                    scrollLength += childSize;
                }
                else {
                    ++numUnknownChildSizes;
                }
            }
            scrollLength += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup);
        }
        else {
            scrollLength = numberOfWrapGroups * defaultScrollLengthPerWrapGroup;
        }
        if (this.headerElementRef) {
            scrollLength += this.headerElementRef.nativeElement.clientHeight;
        }
        let viewportLength = this.horizontal ? viewportWidth : viewportHeight;
        let maxScrollPosition = Math.max(scrollLength - viewportLength, 0);
        return {
            itemCount: itemCount,
            itemsPerWrapGroup: itemsPerWrapGroup,
            wrapGroupsPerPage: wrapGroupsPerPage,
            itemsPerPage: itemsPerPage,
            pageCount_fractional: pageCount_fractional,
            childWidth: defaultChildWidth,
            childHeight: defaultChildHeight,
            scrollLength: scrollLength,
            viewportLength: viewportLength,
            maxScrollPosition: maxScrollPosition
        };
    }
    calculatePadding(arrayStartIndexWithBuffer, dimensions) {
        if (dimensions.itemCount === 0) {
            return 0;
        }
        let defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
        let startingWrapGroupIndex = Math.floor(arrayStartIndexWithBuffer / dimensions.itemsPerWrapGroup) || 0;
        if (!this.enableUnequalChildrenSizes) {
            return defaultScrollLengthPerWrapGroup * startingWrapGroupIndex;
        }
        let numUnknownChildSizes = 0;
        let result = 0;
        for (let i = 0; i < startingWrapGroupIndex; ++i) {
            let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
            if (childSize) {
                result += childSize;
            }
            else {
                ++numUnknownChildSizes;
            }
        }
        result += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup);
        return result;
    }
    calculatePageInfo(scrollPosition, dimensions) {
        let scrollPercentage = 0;
        if (this.enableUnequalChildrenSizes) {
            const numberOfWrapGroups = Math.ceil(dimensions.itemCount / dimensions.itemsPerWrapGroup);
            let totalScrolledLength = 0;
            let defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
            for (let i = 0; i < numberOfWrapGroups; ++i) {
                let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
                if (childSize) {
                    totalScrolledLength += childSize;
                }
                else {
                    totalScrolledLength += defaultScrollLengthPerWrapGroup;
                }
                if (scrollPosition < totalScrolledLength) {
                    scrollPercentage = i / numberOfWrapGroups;
                    break;
                }
            }
        }
        else {
            scrollPercentage = scrollPosition / dimensions.scrollLength;
        }
        let startingArrayIndex_fractional = Math.min(Math.max(scrollPercentage * dimensions.pageCount_fractional, 0), dimensions.pageCount_fractional) * dimensions.itemsPerPage;
        let maxStart = dimensions.itemCount - dimensions.itemsPerPage - 1;
        let arrayStartIndex = Math.min(Math.floor(startingArrayIndex_fractional), maxStart);
        arrayStartIndex -= arrayStartIndex % dimensions.itemsPerWrapGroup; // round down to start of wrapGroup
        if (this.stripedTable) {
            let bufferBoundary = 2 * dimensions.itemsPerWrapGroup;
            if (arrayStartIndex % bufferBoundary !== 0) {
                arrayStartIndex = Math.max(arrayStartIndex - arrayStartIndex % bufferBoundary, 0);
            }
        }
        let arrayEndIndex = Math.ceil(startingArrayIndex_fractional) + dimensions.itemsPerPage - 1;
        let endIndexWithinWrapGroup = (arrayEndIndex + 1) % dimensions.itemsPerWrapGroup;
        if (endIndexWithinWrapGroup > 0) {
            arrayEndIndex += dimensions.itemsPerWrapGroup - endIndexWithinWrapGroup; // round up to end of wrapGroup
        }
        if (isNaN(arrayStartIndex)) {
            arrayStartIndex = 0;
        }
        if (isNaN(arrayEndIndex)) {
            arrayEndIndex = 0;
        }
        arrayStartIndex = Math.min(Math.max(arrayStartIndex, 0), dimensions.itemCount - 1);
        arrayEndIndex = Math.min(Math.max(arrayEndIndex, 0), dimensions.itemCount - 1);
        let bufferSize = this.bufferAmount * dimensions.itemsPerWrapGroup;
        let startIndexWithBuffer = Math.min(Math.max(arrayStartIndex - bufferSize, 0), dimensions.itemCount - 1);
        let endIndexWithBuffer = Math.min(Math.max(arrayEndIndex + bufferSize, 0), dimensions.itemCount - 1);
        return {
            startIndex: arrayStartIndex,
            endIndex: arrayEndIndex,
            startIndexWithBuffer: startIndexWithBuffer,
            endIndexWithBuffer: endIndexWithBuffer,
            scrollStartPosition: scrollPosition,
            scrollEndPosition: scrollPosition + dimensions.viewportLength,
            maxScrollPosition: dimensions.maxScrollPosition
        };
    }
    calculateViewport() {
        let dimensions = this.calculateDimensions();
        let offset = this.getElementsOffset();
        let scrollStartPosition = this.getScrollStartPosition();
        if (scrollStartPosition > (dimensions.scrollLength + offset) && !(this.parentScroll instanceof Window)) {
            scrollStartPosition = dimensions.scrollLength;
        }
        else {
            scrollStartPosition -= offset;
        }
        scrollStartPosition = Math.max(0, scrollStartPosition);
        let pageInfo = this.calculatePageInfo(scrollStartPosition, dimensions);
        let newPadding = this.calculatePadding(pageInfo.startIndexWithBuffer, dimensions);
        let newScrollLength = dimensions.scrollLength;
        return {
            startIndex: pageInfo.startIndex,
            endIndex: pageInfo.endIndex,
            startIndexWithBuffer: pageInfo.startIndexWithBuffer,
            endIndexWithBuffer: pageInfo.endIndexWithBuffer,
            padding: Math.round(newPadding),
            scrollLength: Math.round(newScrollLength),
            scrollStartPosition: pageInfo.scrollStartPosition,
            scrollEndPosition: pageInfo.scrollEndPosition,
            maxScrollPosition: pageInfo.maxScrollPosition
        };
    }
};
VirtualScrollerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['virtual-scroller-default-options',] }] }
];
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "executeRefreshOutsideAngularZone", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "enableUnequalChildrenSizes", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "useMarginInsteadOfTranslate", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "modifyOverflowStyleOfParentScroll", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "stripedTable", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "scrollbarWidth", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "scrollbarHeight", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "childWidth", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "childHeight", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "ssrChildWidth", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "ssrChildHeight", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "ssrViewportWidth", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "ssrViewportHeight", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "bufferAmount", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "scrollAnimationTime", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "resizeBypassRefreshThreshold", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "scrollThrottlingTime", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "scrollDebounceTime", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "checkResizeInterval", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "items", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "compareItems", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "horizontal", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "parentScroll", null);
__decorate([
    Output()
], VirtualScrollerComponent.prototype, "vsUpdate", void 0);
__decorate([
    Output()
], VirtualScrollerComponent.prototype, "vsChange", void 0);
__decorate([
    Output()
], VirtualScrollerComponent.prototype, "vsStart", void 0);
__decorate([
    Output()
], VirtualScrollerComponent.prototype, "vsEnd", void 0);
__decorate([
    ViewChild('content', { read: ElementRef, static: false })
], VirtualScrollerComponent.prototype, "contentElementRef", void 0);
__decorate([
    ViewChild('invisiblePadding', { read: ElementRef, static: false })
], VirtualScrollerComponent.prototype, "invisiblePaddingElementRef", void 0);
__decorate([
    ContentChild('header', { read: ElementRef, static: false })
], VirtualScrollerComponent.prototype, "headerElementRef", void 0);
__decorate([
    ContentChild('container', { read: ElementRef, static: false })
], VirtualScrollerComponent.prototype, "containerElementRef", void 0);
VirtualScrollerComponent = __decorate([
    Component({
        selector: 'virtual-scroller,[virtualScroller]',
        exportAs: 'virtualScroller',
        template: `
    <div class="total-padding" #invisiblePadding></div>
    <div class="scrollable-content" #content>
      <ng-content></ng-content>
    </div>
  `,
        host: {
            '[class.horizontal]': "horizontal",
            '[class.vertical]': "!horizontal",
            '[class.selfScroll]': "!parentScroll"
        },
        styles: [`
    :host {
      position: relative;
	  display: block;
      -webkit-overflow-scrolling: touch;
    }
	
	:host.horizontal.selfScroll {
      overflow-y: visible;
      overflow-x: auto;
	}
	:host.vertical.selfScroll {
      overflow-y: auto;
      overflow-x: visible;
	}
	
    .scrollable-content {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-width: 100vw;
      max-height: 100vh;
      position: absolute;
    }

	.scrollable-content ::ng-deep > * {
		box-sizing: border-box;
	}
	
	:host.horizontal {
		white-space: nowrap;
	}
	
	:host.horizontal .scrollable-content {
		display: flex;
	}
	
	:host.horizontal .scrollable-content ::ng-deep > * {
		flex-shrink: 0;
		flex-grow: 0;
		white-space: initial;
	}
	
    .total-padding {
      width: 1px;
      opacity: 0;
    }
    
    :host.horizontal .total-padding {
      height: 100%;
    }
  `]
    }),
    __param(4, Inject(PLATFORM_ID)),
    __param(5, Optional()), __param(5, Inject('virtual-scroller-default-options'))
], VirtualScrollerComponent);
export { VirtualScrollerComponent };
let VirtualScrollerModule = class VirtualScrollerModule {
};
VirtualScrollerModule = __decorate([
    NgModule({
        exports: [VirtualScrollerComponent],
        declarations: [VirtualScrollerComponent],
        imports: [CommonModule],
        providers: [
            {
                provide: 'virtual-scroller-default-options',
                useFactory: VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY
            }
        ]
    })
], VirtualScrollerModule);
export { VirtualScrollerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vc2VsZWN0L3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEtBQUssS0FBSyxNQUFNLG1CQUFtQixDQUFBO0FBYzFDLE1BQU0sVUFBVSx3Q0FBd0M7SUFDdkQsT0FBTztRQUNOLG9CQUFvQixFQUFFLENBQUM7UUFDdkIsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQixtQkFBbUIsRUFBRSxHQUFHO1FBQ3hCLG1CQUFtQixFQUFFLElBQUk7UUFDekIsNEJBQTRCLEVBQUUsQ0FBQztRQUMvQixpQ0FBaUMsRUFBRSxJQUFJO1FBQ3ZDLFlBQVksRUFBRSxLQUFLO0tBQ25CLENBQUM7QUFDSCxDQUFDO0FBZ0ZELElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBb2FwQyxZQUErQixPQUFtQixFQUM5QixRQUFtQixFQUNuQixJQUFZLEVBQ3JCLGlCQUFvQyxFQUN6QixVQUFrQixFQUV2QyxPQUFzQztRQU5SLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDOUIsYUFBUSxHQUFSLFFBQVEs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V0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUE7R0F6YTVDLHdCQUF3QixDQW1vQ3BDO1NBbm9DWSx3QkFBd0I7QUFncENyQyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtDQUFJLENBQUE7QUFBekIscUJBQXFCO0lBWGpDLFFBQVEsQ0FBQztRQUNULE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO1FBQ25DLFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixTQUFTLEVBQUU7WUFDVjtnQkFDQyxPQUFPLEVBQUUsa0NBQWtDO2dCQUMzQyxVQUFVLEVBQUUsd0NBQXdDO2FBQ3BEO1NBQ0Q7S0FDRCxDQUFDO0dBQ1cscUJBQXFCLENBQUk7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuXHRDb21wb25lbnQsXHJcblx0Q29udGVudENoaWxkLFxyXG5cdEVsZW1lbnRSZWYsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdEluamVjdCxcclxuXHRPcHRpb25hbCxcclxuXHRJbnB1dCxcclxuXHROZ01vZHVsZSxcclxuXHROZ1pvbmUsXHJcblx0T25DaGFuZ2VzLFxyXG5cdE9uRGVzdHJveSxcclxuXHRPbkluaXQsXHJcblx0T3V0cHV0LFxyXG5cdFJlbmRlcmVyMixcclxuXHRWaWV3Q2hpbGQsXHJcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXHJcblx0SW5qZWN0aW9uVG9rZW5cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCAqIGFzIHR3ZWVuIGZyb20gJ0B0d2VlbmpzL3R3ZWVuLmpzJ1xyXG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsZXJEZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGVmYXVsdG9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUGFnZUluZm8gfSBmcm9tICcuL2lwYWdlaW5mbyc7XHJcbmltcG9ydCB7IElWaWV3cG9ydCB9IGZyb20gJy4vaXZpZXdwb3J0JztcclxuXHJcbmltcG9ydCB7IFdyYXBHcm91cERpbWVuc2lvbnMgfSBmcm9tICcuL3dyYXBncm91cGRpbWVuc2lvbnMnO1xyXG5pbXBvcnQgeyBXcmFwR3JvdXBEaW1lbnNpb24gfSBmcm9tICcuL3dyYXBncm91cGRpbWVuc2lvbic7XHJcblxyXG5pbXBvcnQgeyBJRGltZW5zaW9ucyB9IGZyb20gJy4vaWRpbWVuc2lvbic7XHJcblxyXG4gXHJcblxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWSVJUVUFMX1NDUk9MTEVSX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IFZpcnR1YWxTY3JvbGxlckRlZmF1bHRPcHRpb25zIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0c2Nyb2xsVGhyb3R0bGluZ1RpbWU6IDAsXHJcblx0XHRzY3JvbGxEZWJvdW5jZVRpbWU6IDAsXHJcblx0XHRzY3JvbGxBbmltYXRpb25UaW1lOiA3NTAsXHJcblx0XHRjaGVja1Jlc2l6ZUludGVydmFsOiAxMDAwLFxyXG5cdFx0cmVzaXplQnlwYXNzUmVmcmVzaFRocmVzaG9sZDogNSxcclxuXHRcdG1vZGlmeU92ZXJmbG93U3R5bGVPZlBhcmVudFNjcm9sbDogdHJ1ZSxcclxuXHRcdHN0cmlwZWRUYWJsZTogZmFsc2VcclxuXHR9O1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICd2aXJ0dWFsLXNjcm9sbGVyLFt2aXJ0dWFsU2Nyb2xsZXJdJyxcclxuXHRleHBvcnRBczogJ3ZpcnR1YWxTY3JvbGxlcicsXHJcblx0dGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJ0b3RhbC1wYWRkaW5nXCIgI2ludmlzaWJsZVBhZGRpbmc+PC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsYWJsZS1jb250ZW50XCIgI2NvbnRlbnQ+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcblx0aG9zdDoge1xyXG5cdFx0J1tjbGFzcy5ob3Jpem9udGFsXSc6IFwiaG9yaXpvbnRhbFwiLFxyXG5cdFx0J1tjbGFzcy52ZXJ0aWNhbF0nOiBcIiFob3Jpem9udGFsXCIsXHJcblx0XHQnW2NsYXNzLnNlbGZTY3JvbGxdJzogXCIhcGFyZW50U2Nyb2xsXCJcclxuXHR9LFxyXG5cdHN0eWxlczogW2BcclxuICAgIDpob3N0IHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdCAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcclxuICAgIH1cclxuXHRcclxuXHQ6aG9zdC5ob3Jpem9udGFsLnNlbGZTY3JvbGwge1xyXG4gICAgICBvdmVyZmxvdy15OiB2aXNpYmxlO1xyXG4gICAgICBvdmVyZmxvdy14OiBhdXRvO1xyXG5cdH1cclxuXHQ6aG9zdC52ZXJ0aWNhbC5zZWxmU2Nyb2xsIHtcclxuICAgICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgICAgb3ZlcmZsb3cteDogdmlzaWJsZTtcclxuXHR9XHJcblx0XHJcbiAgICAuc2Nyb2xsYWJsZS1jb250ZW50IHtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBsZWZ0OiAwO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICBtYXgtd2lkdGg6IDEwMHZ3O1xyXG4gICAgICBtYXgtaGVpZ2h0OiAxMDB2aDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgfVxyXG5cclxuXHQuc2Nyb2xsYWJsZS1jb250ZW50IDo6bmctZGVlcCA+ICoge1xyXG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuXHR9XHJcblx0XHJcblx0Omhvc3QuaG9yaXpvbnRhbCB7XHJcblx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG5cdH1cclxuXHRcclxuXHQ6aG9zdC5ob3Jpem9udGFsIC5zY3JvbGxhYmxlLWNvbnRlbnQge1xyXG5cdFx0ZGlzcGxheTogZmxleDtcclxuXHR9XHJcblx0XHJcblx0Omhvc3QuaG9yaXpvbnRhbCAuc2Nyb2xsYWJsZS1jb250ZW50IDo6bmctZGVlcCA+ICoge1xyXG5cdFx0ZmxleC1zaHJpbms6IDA7XHJcblx0XHRmbGV4LWdyb3c6IDA7XHJcblx0XHR3aGl0ZS1zcGFjZTogaW5pdGlhbDtcclxuXHR9XHJcblx0XHJcbiAgICAudG90YWwtcGFkZGluZyB7XHJcbiAgICAgIHdpZHRoOiAxcHg7XHJcbiAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIDpob3N0Lmhvcml6b250YWwgLnRvdGFsLXBhZGRpbmcge1xyXG4gICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cdHB1YmxpYyB2aWV3UG9ydEl0ZW1zOiBhbnlbXTtcclxuXHRwdWJsaWMgd2luZG93ID0gd2luZG93O1xyXG5cclxuXHRwdWJsaWMgZ2V0IHZpZXdQb3J0SW5mbygpOiBJUGFnZUluZm8ge1xyXG5cdFx0bGV0IHBhZ2VJbmZvOiBJVmlld3BvcnQgPSB0aGlzLnByZXZpb3VzVmlld1BvcnQgfHwgPGFueT57fTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHN0YXJ0SW5kZXg6IHBhZ2VJbmZvLnN0YXJ0SW5kZXggfHwgMCxcclxuXHRcdFx0ZW5kSW5kZXg6IHBhZ2VJbmZvLmVuZEluZGV4IHx8IDAsXHJcblx0XHRcdHNjcm9sbFN0YXJ0UG9zaXRpb246IHBhZ2VJbmZvLnNjcm9sbFN0YXJ0UG9zaXRpb24gfHwgMCxcclxuXHRcdFx0c2Nyb2xsRW5kUG9zaXRpb246IHBhZ2VJbmZvLnNjcm9sbEVuZFBvc2l0aW9uIHx8IDAsXHJcblx0XHRcdG1heFNjcm9sbFBvc2l0aW9uOiBwYWdlSW5mby5tYXhTY3JvbGxQb3NpdGlvbiB8fCAwLFxyXG5cdFx0XHRzdGFydEluZGV4V2l0aEJ1ZmZlcjogcGFnZUluZm8uc3RhcnRJbmRleFdpdGhCdWZmZXIgfHwgMCxcclxuXHRcdFx0ZW5kSW5kZXhXaXRoQnVmZmVyOiBwYWdlSW5mby5lbmRJbmRleFdpdGhCdWZmZXIgfHwgMFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGV4ZWN1dGVSZWZyZXNoT3V0c2lkZUFuZ3VsYXJab25lOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHByb3RlY3RlZCBfZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBnZXQgZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXM7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXQgZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXModmFsdWU6IGJvb2xlYW4pIHtcclxuXHRcdGlmICh0aGlzLl9lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcyA9PT0gdmFsdWUpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2VuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzID0gdmFsdWU7XHJcblx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIHVzZU1hcmdpbkluc3RlYWRPZlRyYW5zbGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBtb2RpZnlPdmVyZmxvd1N0eWxlT2ZQYXJlbnRTY3JvbGw6IGJvb2xlYW47XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIHN0cmlwZWRUYWJsZTogYm9vbGVhbjtcclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgc2Nyb2xsYmFyV2lkdGg6IG51bWJlcjtcclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgc2Nyb2xsYmFySGVpZ2h0OiBudW1iZXI7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGNoaWxkV2lkdGg6IG51bWJlcjtcclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgY2hpbGRIZWlnaHQ6IG51bWJlcjtcclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgc3NyQ2hpbGRXaWR0aDogbnVtYmVyO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBzc3JDaGlsZEhlaWdodDogbnVtYmVyO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBzc3JWaWV3cG9ydFdpZHRoOiBudW1iZXIgPSAxOTIwO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBzc3JWaWV3cG9ydEhlaWdodDogbnVtYmVyID0gMTA4MDtcclxuXHJcblx0cHJvdGVjdGVkIF9idWZmZXJBbW91bnQ6IG51bWJlciA9IDA7XHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgZ2V0IGJ1ZmZlckFtb3VudCgpOiBudW1iZXIge1xyXG5cdFx0aWYgKHR5cGVvZiAodGhpcy5fYnVmZmVyQW1vdW50KSA9PT0gJ251bWJlcicgJiYgdGhpcy5fYnVmZmVyQW1vdW50ID49IDApIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2J1ZmZlckFtb3VudDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzID8gNSA6IDA7XHRcclxuXHRcdH1cclxuXHR9XHJcblx0cHVibGljIHNldCBidWZmZXJBbW91bnQodmFsdWU6IG51bWJlcikge1xyXG5cdFx0dGhpcy5fYnVmZmVyQW1vdW50ID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBzY3JvbGxBbmltYXRpb25UaW1lOiBudW1iZXI7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIHJlc2l6ZUJ5cGFzc1JlZnJlc2hUaHJlc2hvbGQ6IG51bWJlcjtcclxuXHJcblx0cHJvdGVjdGVkIF9zY3JvbGxUaHJvdHRsaW5nVGltZTogbnVtYmVyO1xyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGdldCBzY3JvbGxUaHJvdHRsaW5nVGltZSgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbFRocm90dGxpbmdUaW1lO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0IHNjcm9sbFRocm90dGxpbmdUaW1lKHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuX3Njcm9sbFRocm90dGxpbmdUaW1lID0gdmFsdWU7XHJcblx0XHR0aGlzLnVwZGF0ZU9uU2Nyb2xsRnVuY3Rpb24oKTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBfc2Nyb2xsRGVib3VuY2VUaW1lOiBudW1iZXI7XHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgZ2V0IHNjcm9sbERlYm91bmNlVGltZSgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbERlYm91bmNlVGltZTtcclxuXHR9XHJcblx0cHVibGljIHNldCBzY3JvbGxEZWJvdW5jZVRpbWUodmFsdWU6IG51bWJlcikge1xyXG5cdFx0dGhpcy5fc2Nyb2xsRGVib3VuY2VUaW1lID0gdmFsdWU7XHJcblx0XHR0aGlzLnVwZGF0ZU9uU2Nyb2xsRnVuY3Rpb24oKTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBvblNjcm9sbDogKCkgPT4gdm9pZDtcclxuXHRwcm90ZWN0ZWQgdXBkYXRlT25TY3JvbGxGdW5jdGlvbigpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLnNjcm9sbERlYm91bmNlVGltZSkge1xyXG5cdFx0XHR0aGlzLm9uU2Nyb2xsID0gPGFueT50aGlzLmRlYm91bmNlKCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xyXG5cdFx0XHR9LCB0aGlzLnNjcm9sbERlYm91bmNlVGltZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0aGlzLnNjcm9sbFRocm90dGxpbmdUaW1lKSB7XHJcblx0XHRcdHRoaXMub25TY3JvbGwgPSA8YW55PnRoaXMudGhyb3R0bGVUcmFpbGluZygoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlKTtcclxuXHRcdFx0fSwgdGhpcy5zY3JvbGxUaHJvdHRsaW5nVGltZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5vblNjcm9sbCA9ICgpID0+IHtcclxuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNoZWNrU2Nyb2xsRWxlbWVudFJlc2l6ZWRUaW1lcjogbnVtYmVyO1xyXG5cdHByb3RlY3RlZCBfY2hlY2tSZXNpemVJbnRlcnZhbDogbnVtYmVyO1xyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGdldCBjaGVja1Jlc2l6ZUludGVydmFsKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2hlY2tSZXNpemVJbnRlcnZhbDtcclxuXHR9XHJcblx0cHVibGljIHNldCBjaGVja1Jlc2l6ZUludGVydmFsKHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdGlmICh0aGlzLl9jaGVja1Jlc2l6ZUludGVydmFsID09PSB2YWx1ZSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fY2hlY2tSZXNpemVJbnRlcnZhbCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5hZGRTY3JvbGxFdmVudEhhbmRsZXJzKCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgX2l0ZW1zOiBhbnlbXSA9IFtdO1xyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGdldCBpdGVtcygpOiBhbnlbXSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXRlbXM7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXQgaXRlbXModmFsdWU6IGFueVtdKSB7XHJcblx0XHRpZiAodmFsdWUgPT09IHRoaXMuX2l0ZW1zKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pdGVtcyA9IHZhbHVlIHx8IFtdO1xyXG5cdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKHRydWUpO1xyXG5cdH1cclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgY29tcGFyZUl0ZW1zOiAoaXRlbTE6IGFueSwgaXRlbTI6IGFueSkgPT4gYm9vbGVhbiA9IChpdGVtMTogYW55LCBpdGVtMjogYW55KSA9PiBpdGVtMSA9PT0gaXRlbTI7XHJcblxyXG5cdHByb3RlY3RlZCBfaG9yaXpvbnRhbDogYm9vbGVhbjtcclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBnZXQgaG9yaXpvbnRhbCgpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9ob3Jpem9udGFsO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0IGhvcml6b250YWwodmFsdWU6IGJvb2xlYW4pIHtcclxuXHRcdHRoaXMuX2hvcml6b250YWwgPSB2YWx1ZTtcclxuXHRcdHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgcmV2ZXJ0UGFyZW50T3ZlcnNjcm9sbCgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHNjcm9sbEVsZW1lbnQgPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKTtcclxuXHRcdGlmIChzY3JvbGxFbGVtZW50ICYmIHRoaXMub2xkUGFyZW50U2Nyb2xsT3ZlcmZsb3cpIHtcclxuXHRcdFx0c2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteSddID0gdGhpcy5vbGRQYXJlbnRTY3JvbGxPdmVyZmxvdy55O1xyXG5cdFx0XHRzY3JvbGxFbGVtZW50LnN0eWxlWydvdmVyZmxvdy14J10gPSB0aGlzLm9sZFBhcmVudFNjcm9sbE92ZXJmbG93Lng7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5vbGRQYXJlbnRTY3JvbGxPdmVyZmxvdyA9IHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBvbGRQYXJlbnRTY3JvbGxPdmVyZmxvdzogeyB4OiBzdHJpbmcsIHk6IHN0cmluZyB9O1xyXG5cdHByb3RlY3RlZCBfcGFyZW50U2Nyb2xsOiBFbGVtZW50IHwgV2luZG93O1xyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGdldCBwYXJlbnRTY3JvbGwoKTogRWxlbWVudCB8IFdpbmRvdyB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50U2Nyb2xsO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0IHBhcmVudFNjcm9sbCh2YWx1ZTogRWxlbWVudCB8IFdpbmRvdykge1xyXG5cdFx0aWYgKHRoaXMuX3BhcmVudFNjcm9sbCA9PT0gdmFsdWUpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucmV2ZXJ0UGFyZW50T3ZlcnNjcm9sbCgpO1xyXG5cdFx0dGhpcy5fcGFyZW50U2Nyb2xsID0gdmFsdWU7XHJcblx0XHR0aGlzLmFkZFNjcm9sbEV2ZW50SGFuZGxlcnMoKTtcclxuXHJcblx0XHRjb25zdCBzY3JvbGxFbGVtZW50ID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KCk7XHJcblx0XHRpZiAodGhpcy5tb2RpZnlPdmVyZmxvd1N0eWxlT2ZQYXJlbnRTY3JvbGwgJiYgc2Nyb2xsRWxlbWVudCAhPT0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcclxuXHRcdFx0dGhpcy5vbGRQYXJlbnRTY3JvbGxPdmVyZmxvdyA9IHsgeDogc2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteCddLCB5OiBzY3JvbGxFbGVtZW50LnN0eWxlWydvdmVyZmxvdy15J10gfTtcclxuXHRcdFx0c2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteSddID0gdGhpcy5ob3Jpem9udGFsID8gJ3Zpc2libGUnIDogJ2F1dG8nO1xyXG5cdFx0XHRzY3JvbGxFbGVtZW50LnN0eWxlWydvdmVyZmxvdy14J10gPSB0aGlzLmhvcml6b250YWwgPyAnYXV0bycgOiAndmlzaWJsZSc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRAT3V0cHV0KClcclxuXHRwdWJsaWMgdnNVcGRhdGU6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xyXG5cclxuXHRAT3V0cHV0KClcclxuXHRwdWJsaWMgdnNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJUGFnZUluZm8+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUGFnZUluZm8+KCk7XHJcblxyXG5cdEBPdXRwdXQoKVxyXG5cdHB1YmxpYyB2c1N0YXJ0OiBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPigpO1xyXG5cclxuXHRAT3V0cHV0KClcclxuXHRwdWJsaWMgdnNFbmQ6IEV2ZW50RW1pdHRlcjxJUGFnZUluZm8+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUGFnZUluZm8+KCk7XHJcblxyXG5cdEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2UgfSlcclxuXHRwcm90ZWN0ZWQgY29udGVudEVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG5cdEBWaWV3Q2hpbGQoJ2ludmlzaWJsZVBhZGRpbmcnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2UgfSlcclxuXHRwcm90ZWN0ZWQgaW52aXNpYmxlUGFkZGluZ0VsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG5cdEBDb250ZW50Q2hpbGQoJ2hlYWRlcicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiBmYWxzZSB9KVxyXG5cdHByb3RlY3RlZCBoZWFkZXJFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xyXG5cclxuXHRAQ29udGVudENoaWxkKCdjb250YWluZXInLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2UgfSlcclxuXHRwcm90ZWN0ZWQgY29udGFpbmVyRWxlbWVudFJlZjogRWxlbWVudFJlZjtcclxuXHJcblx0cHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5hZGRTY3JvbGxFdmVudEhhbmRsZXJzKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlbW92ZVNjcm9sbEV2ZW50SGFuZGxlcnMoKTtcclxuXHRcdHRoaXMucmV2ZXJ0UGFyZW50T3ZlcnNjcm9sbCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xyXG5cdFx0bGV0IGluZGV4TGVuZ3RoQ2hhbmdlZCA9IHRoaXMuY2FjaGVkSXRlbXNMZW5ndGggIT09IHRoaXMuaXRlbXMubGVuZ3RoO1xyXG5cdFx0dGhpcy5jYWNoZWRJdGVtc0xlbmd0aCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xyXG5cclxuXHRcdGNvbnN0IGZpcnN0UnVuOiBib29sZWFuID0gIWNoYW5nZXMuaXRlbXMgfHwgIWNoYW5nZXMuaXRlbXMucHJldmlvdXNWYWx1ZSB8fCBjaGFuZ2VzLml0ZW1zLnByZXZpb3VzVmFsdWUubGVuZ3RoID09PSAwO1xyXG5cdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGluZGV4TGVuZ3RoQ2hhbmdlZCB8fCBmaXJzdFJ1bik7XHJcblx0fVxyXG5cclxuXHRcclxuXHRwdWJsaWMgbmdEb0NoZWNrKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuY2FjaGVkSXRlbXNMZW5ndGggIT09IHRoaXMuaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuY2FjaGVkSXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuXHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKHRydWUpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLnByZXZpb3VzVmlld1BvcnQgJiYgdGhpcy52aWV3UG9ydEl0ZW1zICYmIHRoaXMudmlld1BvcnRJdGVtcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGxldCBpdGVtc0FycmF5Q2hhbmdlZCA9IGZhbHNlO1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmlld1BvcnRJdGVtcy5sZW5ndGg7ICsraSkge1xyXG5cdFx0XHRcdGlmICghdGhpcy5jb21wYXJlSXRlbXModGhpcy5pdGVtc1t0aGlzLnByZXZpb3VzVmlld1BvcnQuc3RhcnRJbmRleFdpdGhCdWZmZXIgKyBpXSwgdGhpcy52aWV3UG9ydEl0ZW1zW2ldKSkge1xyXG5cdFx0XHRcdFx0aXRlbXNBcnJheUNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChpdGVtc0FycmF5Q2hhbmdlZCkge1xyXG5cdFx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbCh0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHJlZnJlc2goKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwodHJ1ZSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgaW52YWxpZGF0ZUFsbENhY2hlZE1lYXN1cmVtZW50cygpOiB2b2lkIHtcclxuXHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucyA9IHtcclxuXHRcdFx0bWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwOiBbXSxcclxuXHRcdFx0bnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXM6IDAsXHJcblx0XHRcdHN1bU9mS25vd25XcmFwR3JvdXBDaGlsZFdpZHRoczogMCxcclxuXHRcdFx0c3VtT2ZLbm93bldyYXBHcm91cENoaWxkSGVpZ2h0czogMFxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IHVuZGVmaW5lZDtcclxuXHJcblx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGludmFsaWRhdGVDYWNoZWRNZWFzdXJlbWVudEZvckl0ZW0oaXRlbTogYW55KTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcykge1xyXG5cdFx0XHRsZXQgaW5kZXggPSB0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHR0aGlzLmludmFsaWRhdGVDYWNoZWRNZWFzdXJlbWVudEF0SW5kZXgoaW5kZXgpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkSGVpZ2h0ID0gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgaW52YWxpZGF0ZUNhY2hlZE1lYXN1cmVtZW50QXRJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcykge1xyXG5cdFx0XHRsZXQgY2FjaGVkTWVhc3VyZW1lbnQgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2luZGV4XTtcclxuXHRcdFx0aWYgKGNhY2hlZE1lYXN1cmVtZW50KSB7XHJcblx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpbmRleF0gPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0LS10aGlzLndyYXBHcm91cERpbWVuc2lvbnMubnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXM7XHJcblx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZFdpZHRocyAtPSBjYWNoZWRNZWFzdXJlbWVudC5jaGlsZFdpZHRoIHx8IDA7XHJcblx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZEhlaWdodHMgLT0gY2FjaGVkTWVhc3VyZW1lbnQuY2hpbGRIZWlnaHQgfHwgMDtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggPSB1bmRlZmluZWQ7XHJcblx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNjcm9sbEludG8oaXRlbTogYW55LCBhbGlnblRvQmVnaW5uaW5nOiBib29sZWFuID0gdHJ1ZSwgYWRkaXRpb25hbE9mZnNldDogbnVtYmVyID0gMCwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIgPSB1bmRlZmluZWQsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcblx0XHRsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcclxuXHRcdGlmIChpbmRleCA9PT0gLTEpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2Nyb2xsVG9JbmRleChpbmRleCwgYWxpZ25Ub0JlZ2lubmluZywgYWRkaXRpb25hbE9mZnNldCwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2Nyb2xsVG9JbmRleChpbmRleDogbnVtYmVyLCBhbGlnblRvQmVnaW5uaW5nOiBib29sZWFuID0gdHJ1ZSwgYWRkaXRpb25hbE9mZnNldDogbnVtYmVyID0gMCwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIgPSB1bmRlZmluZWQsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcblx0XHRsZXQgbWF4UmV0cmllczogbnVtYmVyID0gNTtcclxuXHJcblx0XHRsZXQgcmV0cnlJZk5lZWRlZCA9ICgpID0+IHtcclxuXHRcdFx0LS1tYXhSZXRyaWVzO1xyXG5cdFx0XHRpZiAobWF4UmV0cmllcyA8PSAwKSB7XHJcblx0XHRcdFx0aWYgKGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjaygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBkaW1lbnNpb25zID0gdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKCk7XHJcblx0XHRcdGxldCBkZXNpcmVkU3RhcnRJbmRleCA9IE1hdGgubWluKE1hdGgubWF4KGluZGV4LCAwKSwgZGltZW5zaW9ucy5pdGVtQ291bnQgLSAxKTtcclxuXHRcdFx0aWYgKHRoaXMucHJldmlvdXNWaWV3UG9ydC5zdGFydEluZGV4ID09PSBkZXNpcmVkU3RhcnRJbmRleCkge1xyXG5cdFx0XHRcdGlmIChhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0YW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2soKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNjcm9sbFRvSW5kZXhfaW50ZXJuYWwoaW5kZXgsIGFsaWduVG9CZWdpbm5pbmcsIGFkZGl0aW9uYWxPZmZzZXQsIDAsIHJldHJ5SWZOZWVkZWQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnNjcm9sbFRvSW5kZXhfaW50ZXJuYWwoaW5kZXgsIGFsaWduVG9CZWdpbm5pbmcsIGFkZGl0aW9uYWxPZmZzZXQsIGFuaW1hdGlvbk1pbGxpc2Vjb25kcywgcmV0cnlJZk5lZWRlZCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgc2Nyb2xsVG9JbmRleF9pbnRlcm5hbChpbmRleDogbnVtYmVyLCBhbGlnblRvQmVnaW5uaW5nOiBib29sZWFuID0gdHJ1ZSwgYWRkaXRpb25hbE9mZnNldDogbnVtYmVyID0gMCwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIgPSB1bmRlZmluZWQsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcblx0XHRhbmltYXRpb25NaWxsaXNlY29uZHMgPSBhbmltYXRpb25NaWxsaXNlY29uZHMgPT09IHVuZGVmaW5lZCA/IHRoaXMuc2Nyb2xsQW5pbWF0aW9uVGltZSA6IGFuaW1hdGlvbk1pbGxpc2Vjb25kcztcclxuXHJcblx0XHRsZXQgZGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucygpO1xyXG5cdFx0bGV0IHNjcm9sbCA9IHRoaXMuY2FsY3VsYXRlUGFkZGluZyhpbmRleCwgZGltZW5zaW9ucykgKyBhZGRpdGlvbmFsT2Zmc2V0O1xyXG5cdFx0aWYgKCFhbGlnblRvQmVnaW5uaW5nKSB7XHJcblx0XHRcdHNjcm9sbCAtPSBkaW1lbnNpb25zLndyYXBHcm91cHNQZXJQYWdlICogZGltZW5zaW9uc1t0aGlzLl9jaGlsZFNjcm9sbERpbV07XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zY3JvbGxUb1Bvc2l0aW9uKHNjcm9sbCwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2Nyb2xsVG9Qb3NpdGlvbihzY3JvbGxQb3NpdGlvbjogbnVtYmVyLCBhbmltYXRpb25NaWxsaXNlY29uZHM6IG51bWJlciA9IHVuZGVmaW5lZCwgYW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSB1bmRlZmluZWQpOiB2b2lkIHtcclxuXHRcdHNjcm9sbFBvc2l0aW9uICs9IHRoaXMuZ2V0RWxlbWVudHNPZmZzZXQoKTtcclxuXHJcblx0XHRhbmltYXRpb25NaWxsaXNlY29uZHMgPSBhbmltYXRpb25NaWxsaXNlY29uZHMgPT09IHVuZGVmaW5lZCA/IHRoaXMuc2Nyb2xsQW5pbWF0aW9uVGltZSA6IGFuaW1hdGlvbk1pbGxpc2Vjb25kcztcclxuXHJcblx0XHRsZXQgc2Nyb2xsRWxlbWVudCA9IHRoaXMuZ2V0U2Nyb2xsRWxlbWVudCgpO1xyXG5cclxuXHRcdGxldCBhbmltYXRpb25SZXF1ZXN0OiBudW1iZXI7XHJcblxyXG5cdFx0aWYgKHRoaXMuY3VycmVudFR3ZWVuKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudFR3ZWVuLnN0b3AoKTtcclxuXHRcdFx0dGhpcy5jdXJyZW50VHdlZW4gPSB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFhbmltYXRpb25NaWxsaXNlY29uZHMpIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShzY3JvbGxFbGVtZW50LCB0aGlzLl9zY3JvbGxUeXBlLCBzY3JvbGxQb3NpdGlvbik7XHJcblx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSwgYW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2spO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgdHdlZW5Db25maWdPYmogPSB7IHNjcm9sbFBvc2l0aW9uOiBzY3JvbGxFbGVtZW50W3RoaXMuX3Njcm9sbFR5cGVdIH07XHJcblxyXG5cdFx0bGV0IG5ld1R3ZWVuID0gbmV3IHR3ZWVuLlR3ZWVuKHR3ZWVuQ29uZmlnT2JqKVxyXG5cdFx0XHQudG8oeyBzY3JvbGxQb3NpdGlvbiB9LCBhbmltYXRpb25NaWxsaXNlY29uZHMpXHJcblx0XHRcdC5lYXNpbmcodHdlZW4uRWFzaW5nLlF1YWRyYXRpYy5PdXQpXHJcblx0XHRcdC5vblVwZGF0ZSgoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdGlmIChpc05hTihkYXRhLnNjcm9sbFBvc2l0aW9uKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHNjcm9sbEVsZW1lbnQsIHRoaXMuX3Njcm9sbFR5cGUsIGRhdGEuc2Nyb2xsUG9zaXRpb24pO1xyXG5cdFx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5vblN0b3AoKCkgPT4ge1xyXG5cdFx0XHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvblJlcXVlc3QpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuc3RhcnQoKTtcclxuXHJcblx0XHRjb25zdCBhbmltYXRlID0gKHRpbWU/OiBudW1iZXIpID0+IHtcclxuXHRcdFx0aWYgKCFuZXdUd2VlbltcImlzUGxheWluZ1wiXSgpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRuZXdUd2Vlbi51cGRhdGUodGltZSk7XHJcblx0XHRcdGlmICh0d2VlbkNvbmZpZ09iai5zY3JvbGxQb3NpdGlvbiA9PT0gc2Nyb2xsUG9zaXRpb24pIHtcclxuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcblx0XHRcdFx0YW5pbWF0aW9uUmVxdWVzdCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGFuaW1hdGUoKTtcclxuXHRcdHRoaXMuY3VycmVudFR3ZWVuID0gbmV3VHdlZW47XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgaXNBbmd1bGFyVW5pdmVyc2FsU1NSOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZixcclxuXHRcdHByb3RlY3RlZCByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG5cdFx0cHJvdGVjdGVkIHJlYWRvbmx5IHpvbmU6IE5nWm9uZSxcclxuXHRcdHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcblx0XHRASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcblx0XHRAT3B0aW9uYWwoKSBASW5qZWN0KCd2aXJ0dWFsLXNjcm9sbGVyLWRlZmF1bHQtb3B0aW9ucycpXHJcblx0XHRvcHRpb25zOiBWaXJ0dWFsU2Nyb2xsZXJEZWZhdWx0T3B0aW9ucykge1xyXG5cdFx0XHRcclxuXHRcdHRoaXMuaXNBbmd1bGFyVW5pdmVyc2FsU1NSID0gaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKTtcclxuXHJcblx0XHR0aGlzLnNjcm9sbFRocm90dGxpbmdUaW1lID0gb3B0aW9ucy5zY3JvbGxUaHJvdHRsaW5nVGltZTtcclxuXHRcdHRoaXMuc2Nyb2xsRGVib3VuY2VUaW1lID0gb3B0aW9ucy5zY3JvbGxEZWJvdW5jZVRpbWU7XHJcblx0XHR0aGlzLnNjcm9sbEFuaW1hdGlvblRpbWUgPSBvcHRpb25zLnNjcm9sbEFuaW1hdGlvblRpbWU7XHJcblx0XHR0aGlzLnNjcm9sbGJhcldpZHRoID0gb3B0aW9ucy5zY3JvbGxiYXJXaWR0aDtcclxuXHRcdHRoaXMuc2Nyb2xsYmFySGVpZ2h0ID0gb3B0aW9ucy5zY3JvbGxiYXJIZWlnaHQ7XHJcblx0XHR0aGlzLmNoZWNrUmVzaXplSW50ZXJ2YWwgPSBvcHRpb25zLmNoZWNrUmVzaXplSW50ZXJ2YWw7XHJcblx0XHR0aGlzLnJlc2l6ZUJ5cGFzc1JlZnJlc2hUaHJlc2hvbGQgPSBvcHRpb25zLnJlc2l6ZUJ5cGFzc1JlZnJlc2hUaHJlc2hvbGQ7XHJcblx0XHR0aGlzLm1vZGlmeU92ZXJmbG93U3R5bGVPZlBhcmVudFNjcm9sbCA9IG9wdGlvbnMubW9kaWZ5T3ZlcmZsb3dTdHlsZU9mUGFyZW50U2Nyb2xsO1xyXG5cdFx0dGhpcy5zdHJpcGVkVGFibGUgPSBvcHRpb25zLnN0cmlwZWRUYWJsZTtcclxuXHJcblx0XHR0aGlzLmhvcml6b250YWwgPSBmYWxzZTtcclxuXHRcdHRoaXMucmVzZXRXcmFwR3JvdXBEaW1lbnNpb25zKCk7XHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCBnZXRFbGVtZW50U2l6ZShlbGVtZW50OiBIVE1MRWxlbWVudCkgOiBDbGllbnRSZWN0IHtcclxuXHRcdGxldCByZXN1bHQgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0bGV0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcblx0XHRsZXQgbWFyZ2luVG9wID0gcGFyc2VJbnQoc3R5bGVzWydtYXJnaW4tdG9wJ10sIDEwKSB8fCAwO1xyXG5cdFx0bGV0IG1hcmdpbkJvdHRvbSA9IHBhcnNlSW50KHN0eWxlc1snbWFyZ2luLWJvdHRvbSddLCAxMCkgfHwgMDtcclxuXHRcdGxldCBtYXJnaW5MZWZ0ID0gcGFyc2VJbnQoc3R5bGVzWydtYXJnaW4tbGVmdCddLCAxMCkgfHwgMDtcclxuXHRcdGxldCBtYXJnaW5SaWdodCA9IHBhcnNlSW50KHN0eWxlc1snbWFyZ2luLXJpZ2h0J10sIDEwKSB8fCAwO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0b3A6IHJlc3VsdC50b3AgKyBtYXJnaW5Ub3AsXHJcblx0XHRcdGJvdHRvbTogcmVzdWx0LmJvdHRvbSArIG1hcmdpbkJvdHRvbSxcclxuXHRcdFx0bGVmdDogcmVzdWx0LmxlZnQgKyBtYXJnaW5MZWZ0LFxyXG5cdFx0XHRyaWdodDogcmVzdWx0LnJpZ2h0ICsgbWFyZ2luUmlnaHQsXHJcblx0XHRcdHdpZHRoOiByZXN1bHQud2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQsXHJcblx0XHRcdGhlaWdodDogcmVzdWx0LmhlaWdodCArIG1hcmdpblRvcCArIG1hcmdpbkJvdHRvbVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBwcmV2aW91c1Njcm9sbEJvdW5kaW5nUmVjdDogQ2xpZW50UmVjdDtcclxuXHRwcm90ZWN0ZWQgY2hlY2tTY3JvbGxFbGVtZW50UmVzaXplZCgpOiB2b2lkIHtcclxuXHRcdGxldCBib3VuZGluZ1JlY3QgPSB0aGlzLmdldEVsZW1lbnRTaXplKHRoaXMuZ2V0U2Nyb2xsRWxlbWVudCgpKTtcclxuXHJcblx0XHRsZXQgc2l6ZUNoYW5nZWQ6IGJvb2xlYW47XHJcblx0XHRpZiAoIXRoaXMucHJldmlvdXNTY3JvbGxCb3VuZGluZ1JlY3QpIHtcclxuXHRcdFx0c2l6ZUNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IHdpZHRoQ2hhbmdlID0gTWF0aC5hYnMoYm91bmRpbmdSZWN0LndpZHRoIC0gdGhpcy5wcmV2aW91c1Njcm9sbEJvdW5kaW5nUmVjdC53aWR0aCk7XHJcblx0XHRcdGxldCBoZWlnaHRDaGFuZ2UgPSBNYXRoLmFicyhib3VuZGluZ1JlY3QuaGVpZ2h0IC0gdGhpcy5wcmV2aW91c1Njcm9sbEJvdW5kaW5nUmVjdC5oZWlnaHQpO1xyXG5cdFx0XHRzaXplQ2hhbmdlZCA9IHdpZHRoQ2hhbmdlID4gdGhpcy5yZXNpemVCeXBhc3NSZWZyZXNoVGhyZXNob2xkIHx8IGhlaWdodENoYW5nZSA+IHRoaXMucmVzaXplQnlwYXNzUmVmcmVzaFRocmVzaG9sZDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2l6ZUNoYW5nZWQpIHtcclxuXHRcdFx0dGhpcy5wcmV2aW91c1Njcm9sbEJvdW5kaW5nUmVjdCA9IGJvdW5kaW5nUmVjdDtcclxuXHRcdFx0aWYgKGJvdW5kaW5nUmVjdC53aWR0aCA+IDAgJiYgYm91bmRpbmdSZWN0LmhlaWdodCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgX2ludmlzaWJsZVBhZGRpbmdQcm9wZXJ0eTtcclxuXHRwcm90ZWN0ZWQgX29mZnNldFR5cGU7XHJcblx0cHJvdGVjdGVkIF9zY3JvbGxUeXBlO1xyXG5cdHByb3RlY3RlZCBfcGFnZU9mZnNldFR5cGU7XHJcblx0cHJvdGVjdGVkIF9jaGlsZFNjcm9sbERpbTtcclxuXHRwcm90ZWN0ZWQgX3RyYW5zbGF0ZURpcjtcclxuXHRwcm90ZWN0ZWQgX21hcmdpbkRpcjtcclxuXHRwcm90ZWN0ZWQgdXBkYXRlRGlyZWN0aW9uKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuaG9yaXpvbnRhbCkge1xyXG5cdFx0XHR0aGlzLl9pbnZpc2libGVQYWRkaW5nUHJvcGVydHkgPSAnd2lkdGgnO1xyXG5cdFx0XHR0aGlzLl9vZmZzZXRUeXBlID0gJ29mZnNldExlZnQnO1xyXG5cdFx0XHR0aGlzLl9wYWdlT2Zmc2V0VHlwZSA9ICdwYWdlWE9mZnNldCc7XHJcblx0XHRcdHRoaXMuX2NoaWxkU2Nyb2xsRGltID0gJ2NoaWxkV2lkdGgnO1xyXG5cdFx0XHR0aGlzLl9tYXJnaW5EaXIgPSAnbWFyZ2luLWxlZnQnO1xyXG5cdFx0XHR0aGlzLl90cmFuc2xhdGVEaXIgPSAndHJhbnNsYXRlWCc7XHJcblx0XHRcdHRoaXMuX3Njcm9sbFR5cGUgPSAnc2Nyb2xsTGVmdCc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5faW52aXNpYmxlUGFkZGluZ1Byb3BlcnR5ID0gJ2hlaWdodCc7XHJcblx0XHRcdHRoaXMuX29mZnNldFR5cGUgPSAnb2Zmc2V0VG9wJztcclxuXHRcdFx0dGhpcy5fcGFnZU9mZnNldFR5cGUgPSAncGFnZVlPZmZzZXQnO1xyXG5cdFx0XHR0aGlzLl9jaGlsZFNjcm9sbERpbSA9ICdjaGlsZEhlaWdodCc7XHJcblx0XHRcdHRoaXMuX21hcmdpbkRpciA9ICdtYXJnaW4tdG9wJztcclxuXHRcdFx0dGhpcy5fdHJhbnNsYXRlRGlyID0gJ3RyYW5zbGF0ZVknO1xyXG5cdFx0XHR0aGlzLl9zY3JvbGxUeXBlID0gJ3Njcm9sbFRvcCc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZGVib3VuY2UoZnVuYzogRnVuY3Rpb24sIHdhaXQ6IG51bWJlcik6IEZ1bmN0aW9uIHtcclxuXHRcdGNvbnN0IHRocm90dGxlZCA9IHRoaXMudGhyb3R0bGVUcmFpbGluZyhmdW5jLCB3YWl0KTtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhyb3R0bGVkWydjYW5jZWwnXSgpO1xyXG5cdFx0XHR0aHJvdHRsZWQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdH07XHJcblx0XHRyZXN1bHRbJ2NhbmNlbCddID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aHJvdHRsZWRbJ2NhbmNlbCddKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgdGhyb3R0bGVUcmFpbGluZyhmdW5jOiBGdW5jdGlvbiwgd2FpdDogbnVtYmVyKTogRnVuY3Rpb24ge1xyXG5cdFx0bGV0IHRpbWVvdXQgPSB1bmRlZmluZWQ7XHJcblx0XHRsZXQgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcclxuXHRcdGNvbnN0IHJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cdFx0XHRfYXJndW1lbnRzID0gYXJndW1lbnRzXHJcblxyXG5cdFx0XHRpZiAodGltZW91dCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHdhaXQgPD0gMCkge1xyXG5cdFx0XHRcdGZ1bmMuYXBwbHkoX3RoaXMsIF9hcmd1bWVudHMpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHRpbWVvdXQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0XHRmdW5jLmFwcGx5KF90aGlzLCBfYXJndW1lbnRzKTtcclxuXHRcdFx0XHR9LCB3YWl0KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJlc3VsdFsnY2FuY2VsJ10gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0aW1lb3V0KSB7XHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRcdHRpbWVvdXQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGg6IG51bWJlciA9IDA7XHJcblx0cHJvdGVjdGVkIGNhbGN1bGF0ZWRTY3JvbGxiYXJIZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBwYWRkaW5nOiBudW1iZXIgPSAwO1xyXG5cdHByb3RlY3RlZCBwcmV2aW91c1ZpZXdQb3J0OiBJVmlld3BvcnQgPSA8YW55Pnt9O1xyXG5cdHByb3RlY3RlZCBjdXJyZW50VHdlZW46IHR3ZWVuLlR3ZWVuO1xyXG5cdHByb3RlY3RlZCBjYWNoZWRJdGVtc0xlbmd0aDogbnVtYmVyO1xyXG5cclxuXHRwcm90ZWN0ZWQgZGlzcG9zZVNjcm9sbEhhbmRsZXI6ICgpID0+IHZvaWQgfCB1bmRlZmluZWQ7XHJcblx0cHJvdGVjdGVkIGRpc3Bvc2VSZXNpemVIYW5kbGVyOiAoKSA9PiB2b2lkIHwgdW5kZWZpbmVkO1xyXG5cclxuXHRwcm90ZWN0ZWQgcmVmcmVzaF9pbnRlcm5hbChpdGVtc0FycmF5TW9kaWZpZWQ6IGJvb2xlYW4sIHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCwgbWF4UnVuVGltZXM6IG51bWJlciA9IDIpOiB2b2lkIHtcclxuXHRcdC8vbm90ZTogbWF4UnVuVGltZXMgaXMgdG8gZm9yY2UgaXQgdG8ga2VlcCByZWNhbGN1bGF0aW5nIGlmIHRoZSBwcmV2aW91cyBpdGVyYXRpb24gY2F1c2VkIGEgcmUtcmVuZGVyIChkaWZmZXJlbnQgc2xpY2VkIGl0ZW1zIGluIHZpZXdwb3J0IG9yIHNjcm9sbFBvc2l0aW9uIGNoYW5nZWQpLlxyXG5cdFx0Ly9UaGUgZGVmYXVsdCBvZiAyeCBtYXggd2lsbCBwcm9iYWJseSBiZSBhY2N1cmF0ZSBlbm91Z2ggd2l0aG91dCBjYXVzaW5nIHRvbyBsYXJnZSBhIHBlcmZvcm1hbmNlIGJvdHRsZW5lY2tcclxuXHRcdC8vVGhlIGNvZGUgd291bGQgdHlwaWNhbGx5IHF1aXQgb3V0IG9uIHRoZSAybmQgaXRlcmF0aW9uIGFueXdheXMuIFRoZSBtYWluIHRpbWUgaXQnZCB0aGluayBtb3JlIHRoYW4gMiBydW5zIHdvdWxkIGJlIG5lY2Vzc2FyeSB3b3VsZCBiZSBmb3IgdmFzdGx5IGRpZmZlcmVudCBzaXplZCBjaGlsZCBpdGVtcyBvciBpZiB0aGlzIGlzIHRoZSAxc3QgdGltZSB0aGUgaXRlbXMgYXJyYXkgd2FzIGluaXRpYWxpemVkLlxyXG5cdFx0Ly9XaXRob3V0IG1heFJ1blRpbWVzLCBJZiB0aGUgdXNlciBpcyBhY3RpdmVseSBzY3JvbGxpbmcgdGhpcyBjb2RlIHdvdWxkIGJlY29tZSBhbiBpbmZpbml0ZSBsb29wIHVudGlsIHRoZXkgc3RvcHBlZCBzY3JvbGxpbmcuIFRoaXMgd291bGQgYmUgb2theSwgZXhjZXB0IGVhY2ggc2Nyb2xsIGV2ZW50IHdvdWxkIHN0YXJ0IGFuIGFkZGl0aW9uYWwgaW5maW50ZSBsb29wLiBXZSB3YW50IHRvIHNob3J0LWNpcmN1aXQgaXQgdG8gcHJldmVudCB0aGlzLlxyXG5cclxuXHRcdGlmIChpdGVtc0FycmF5TW9kaWZpZWQgJiYgdGhpcy5wcmV2aW91c1ZpZXdQb3J0ICYmIHRoaXMucHJldmlvdXNWaWV3UG9ydC5zY3JvbGxTdGFydFBvc2l0aW9uID4gMCkge1xyXG5cdFx0Ly9pZiBpdGVtcyB3ZXJlIHByZXBlbmRlZCwgc2Nyb2xsIGZvcndhcmQgdG8ga2VlcCBzYW1lIGl0ZW1zIHZpc2libGVcclxuXHRcdFx0bGV0IG9sZFZpZXdQb3J0ID0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0O1xyXG5cdFx0XHRsZXQgb2xkVmlld1BvcnRJdGVtcyA9IHRoaXMudmlld1BvcnRJdGVtcztcclxuXHRcdFx0XHJcblx0XHRcdGxldCBvbGRSZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2sgPSByZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2s7XHJcblx0XHRcdHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjayA9ICgpID0+IHtcclxuXHRcdFx0XHRsZXQgc2Nyb2xsTGVuZ3RoRGVsdGEgPSB0aGlzLnByZXZpb3VzVmlld1BvcnQuc2Nyb2xsTGVuZ3RoIC0gb2xkVmlld1BvcnQuc2Nyb2xsTGVuZ3RoO1xyXG5cdFx0XHRcdGlmIChzY3JvbGxMZW5ndGhEZWx0YSA+IDAgJiYgdGhpcy52aWV3UG9ydEl0ZW1zKSB7XHJcblx0XHRcdFx0XHRsZXQgb2xkU3RhcnRJdGVtID0gb2xkVmlld1BvcnRJdGVtc1swXTtcclxuXHRcdFx0XHRcdGxldCBvbGRTdGFydEl0ZW1JbmRleCA9IHRoaXMuaXRlbXMuZmluZEluZGV4KHggPT4gdGhpcy5jb21wYXJlSXRlbXMob2xkU3RhcnRJdGVtLCB4KSk7XHJcblx0XHRcdFx0XHRpZiAob2xkU3RhcnRJdGVtSW5kZXggPiB0aGlzLnByZXZpb3VzVmlld1BvcnQuc3RhcnRJbmRleFdpdGhCdWZmZXIpIHtcclxuXHRcdFx0XHRcdFx0bGV0IGl0ZW1PcmRlckNoYW5nZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnZpZXdQb3J0SXRlbXMubGVuZ3RoOyArK2kpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuY29tcGFyZUl0ZW1zKHRoaXMuaXRlbXNbb2xkU3RhcnRJdGVtSW5kZXggKyBpXSwgb2xkVmlld1BvcnRJdGVtc1tpXSkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGl0ZW1PcmRlckNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRpZiAoIWl0ZW1PcmRlckNoYW5nZWQpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnNjcm9sbFRvUG9zaXRpb24odGhpcy5wcmV2aW91c1ZpZXdQb3J0LnNjcm9sbFN0YXJ0UG9zaXRpb24gKyBzY3JvbGxMZW5ndGhEZWx0YSAsIDAsIG9sZFJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjayk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmIChvbGRSZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdG9sZFJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH1cdFx0XHRcclxuXHJcblx0XHR0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRpZiAoaXRlbXNBcnJheU1vZGlmaWVkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnJlc2V0V3JhcEdyb3VwRGltZW5zaW9ucygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgdmlld3BvcnQgPSB0aGlzLmNhbGN1bGF0ZVZpZXdwb3J0KCk7XHJcblxyXG5cdFx0XHRcdGxldCBzdGFydENoYW5nZWQgPSBpdGVtc0FycmF5TW9kaWZpZWQgfHwgdmlld3BvcnQuc3RhcnRJbmRleCAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnN0YXJ0SW5kZXg7XHJcblx0XHRcdFx0bGV0IGVuZENoYW5nZWQgPSBpdGVtc0FycmF5TW9kaWZpZWQgfHwgdmlld3BvcnQuZW5kSW5kZXggIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5lbmRJbmRleDtcclxuXHRcdFx0XHRsZXQgc2Nyb2xsTGVuZ3RoQ2hhbmdlZCA9IHZpZXdwb3J0LnNjcm9sbExlbmd0aCAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnNjcm9sbExlbmd0aDtcclxuXHRcdFx0XHRsZXQgcGFkZGluZ0NoYW5nZWQgPSB2aWV3cG9ydC5wYWRkaW5nICE9PSB0aGlzLnByZXZpb3VzVmlld1BvcnQucGFkZGluZztcclxuXHRcdFx0XHRsZXQgc2Nyb2xsUG9zaXRpb25DaGFuZ2VkID0gdmlld3BvcnQuc2Nyb2xsU3RhcnRQb3NpdGlvbiAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnNjcm9sbFN0YXJ0UG9zaXRpb24gfHwgdmlld3BvcnQuc2Nyb2xsRW5kUG9zaXRpb24gIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5zY3JvbGxFbmRQb3NpdGlvbiB8fCB2aWV3cG9ydC5tYXhTY3JvbGxQb3NpdGlvbiAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0Lm1heFNjcm9sbFBvc2l0aW9uO1xyXG5cclxuXHRcdFx0XHR0aGlzLnByZXZpb3VzVmlld1BvcnQgPSB2aWV3cG9ydDtcclxuXHJcblx0XHRcdFx0aWYgKHNjcm9sbExlbmd0aENoYW5nZWQpIHtcclxuXHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbnZpc2libGVQYWRkaW5nRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9pbnZpc2libGVQYWRkaW5nUHJvcGVydHksIGAke3ZpZXdwb3J0LnNjcm9sbExlbmd0aH1weGApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHBhZGRpbmdDaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy51c2VNYXJnaW5JbnN0ZWFkT2ZUcmFuc2xhdGUpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRlbnRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX21hcmdpbkRpciwgYCR7dmlld3BvcnQucGFkZGluZ31weGApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgYCR7dGhpcy5fdHJhbnNsYXRlRGlyfSgke3ZpZXdwb3J0LnBhZGRpbmd9cHgpYCk7XHJcblx0XHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2Via2l0VHJhbnNmb3JtJywgYCR7dGhpcy5fdHJhbnNsYXRlRGlyfSgke3ZpZXdwb3J0LnBhZGRpbmd9cHgpYCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5oZWFkZXJFbGVtZW50UmVmKSB7XHJcblx0XHRcdFx0XHRsZXQgc2Nyb2xsUG9zaXRpb24gPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKVt0aGlzLl9zY3JvbGxUeXBlXTtcclxuXHRcdFx0XHRcdGxldCBjb250YWluZXJPZmZzZXQgPSB0aGlzLmdldEVsZW1lbnRzT2Zmc2V0KCk7XHJcblx0XHRcdFx0XHRsZXQgb2Zmc2V0ID0gTWF0aC5tYXgoc2Nyb2xsUG9zaXRpb24gLSB2aWV3cG9ydC5wYWRkaW5nIC0gY29udGFpbmVyT2Zmc2V0ICsgdGhpcy5oZWFkZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0LCAwKTtcclxuXHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5oZWFkZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCBgJHt0aGlzLl90cmFuc2xhdGVEaXJ9KCR7b2Zmc2V0fXB4KWApO1xyXG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhlYWRlckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dlYmtpdFRyYW5zZm9ybScsIGAke3RoaXMuX3RyYW5zbGF0ZURpcn0oJHtvZmZzZXR9cHgpYCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRjb25zdCBjaGFuZ2VFdmVudEFyZzogSVBhZ2VJbmZvID0gKHN0YXJ0Q2hhbmdlZCB8fCBlbmRDaGFuZ2VkKSA/IHtcclxuXHRcdFx0XHRcdHN0YXJ0SW5kZXg6IHZpZXdwb3J0LnN0YXJ0SW5kZXgsXHJcblx0XHRcdFx0XHRlbmRJbmRleDogdmlld3BvcnQuZW5kSW5kZXgsXHJcblx0XHRcdFx0XHRzY3JvbGxTdGFydFBvc2l0aW9uOiB2aWV3cG9ydC5zY3JvbGxTdGFydFBvc2l0aW9uLFxyXG5cdFx0XHRcdFx0c2Nyb2xsRW5kUG9zaXRpb246IHZpZXdwb3J0LnNjcm9sbEVuZFBvc2l0aW9uLFxyXG5cdFx0XHRcdFx0c3RhcnRJbmRleFdpdGhCdWZmZXI6IHZpZXdwb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyLFxyXG5cdFx0XHRcdFx0ZW5kSW5kZXhXaXRoQnVmZmVyOiB2aWV3cG9ydC5lbmRJbmRleFdpdGhCdWZmZXIsXHJcblx0XHRcdFx0XHRtYXhTY3JvbGxQb3NpdGlvbjogdmlld3BvcnQubWF4U2Nyb2xsUG9zaXRpb25cclxuXHRcdFx0XHR9IDogdW5kZWZpbmVkO1xyXG5cclxuXHJcblx0XHRcdFx0aWYgKHN0YXJ0Q2hhbmdlZCB8fCBlbmRDaGFuZ2VkIHx8IHNjcm9sbFBvc2l0aW9uQ2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgaGFuZGxlQ2hhbmdlZCA9ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0Ly8gdXBkYXRlIHRoZSBzY3JvbGwgbGlzdCB0byB0cmlnZ2VyIHJlLXJlbmRlciBvZiBjb21wb25lbnRzIGluIHZpZXdwb3J0XHJcblx0XHRcdFx0XHRcdHRoaXMudmlld1BvcnRJdGVtcyA9IHZpZXdwb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyID49IDAgJiYgdmlld3BvcnQuZW5kSW5kZXhXaXRoQnVmZmVyID49IDAgPyB0aGlzLml0ZW1zLnNsaWNlKHZpZXdwb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyLCB2aWV3cG9ydC5lbmRJbmRleFdpdGhCdWZmZXIgKyAxKSA6IFtdO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnZzVXBkYXRlLmVtaXQodGhpcy52aWV3UG9ydEl0ZW1zKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChzdGFydENoYW5nZWQpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnZzU3RhcnQuZW1pdChjaGFuZ2VFdmVudEFyZyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmIChlbmRDaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy52c0VuZC5lbWl0KGNoYW5nZUV2ZW50QXJnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHN0YXJ0Q2hhbmdlZCB8fCBlbmRDaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnZzQ2hhbmdlLmVtaXQoY2hhbmdlRXZlbnRBcmcpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAobWF4UnVuVGltZXMgPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlLCByZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2ssIG1heFJ1blRpbWVzIC0gMSk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAocmVmcmVzaENvbXBsZXRlZENhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVmcmVzaENvbXBsZXRlZENhbGxiYWNrKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLmV4ZWN1dGVSZWZyZXNoT3V0c2lkZUFuZ3VsYXJab25lKSB7XHJcblx0XHRcdFx0XHRcdGhhbmRsZUNoYW5nZWQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnpvbmUucnVuKGhhbmRsZUNoYW5nZWQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAobWF4UnVuVGltZXMgPiAwICYmIChzY3JvbGxMZW5ndGhDaGFuZ2VkIHx8IHBhZGRpbmdDaGFuZ2VkKSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UsIHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaywgbWF4UnVuVGltZXMgLSAxKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChyZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdFx0cmVmcmVzaENvbXBsZXRlZENhbGxiYWNrKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldFNjcm9sbEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50U2Nyb2xsIGluc3RhbmNlb2YgV2luZG93ID8gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keSA6IHRoaXMucGFyZW50U2Nyb2xsIHx8IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFkZFNjcm9sbEV2ZW50SGFuZGxlcnMoKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5pc0FuZ3VsYXJVbml2ZXJzYWxTU1IpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBzY3JvbGxFbGVtZW50ID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KCk7XHJcblxyXG5cdFx0dGhpcy5yZW1vdmVTY3JvbGxFdmVudEhhbmRsZXJzKCk7XHJcblxyXG5cdFx0dGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50U2Nyb2xsIGluc3RhbmNlb2YgV2luZG93KSB7XHJcblx0XHRcdFx0dGhpcy5kaXNwb3NlU2Nyb2xsSGFuZGxlciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAnc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XHJcblx0XHRcdFx0dGhpcy5kaXNwb3NlUmVzaXplSGFuZGxlciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAncmVzaXplJywgdGhpcy5vblNjcm9sbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5kaXNwb3NlU2Nyb2xsSGFuZGxlciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHNjcm9sbEVsZW1lbnQsICdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcclxuXHRcdFx0XHRpZiAodGhpcy5fY2hlY2tSZXNpemVJbnRlcnZhbCA+IDApIHtcclxuXHRcdFx0XHRcdHRoaXMuY2hlY2tTY3JvbGxFbGVtZW50UmVzaXplZFRpbWVyID0gPGFueT5zZXRJbnRlcnZhbCgoKSA9PiB7IHRoaXMuY2hlY2tTY3JvbGxFbGVtZW50UmVzaXplZCgpOyB9LCB0aGlzLl9jaGVja1Jlc2l6ZUludGVydmFsKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHJlbW92ZVNjcm9sbEV2ZW50SGFuZGxlcnMoKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5jaGVja1Njcm9sbEVsZW1lbnRSZXNpemVkVGltZXIpIHtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmNoZWNrU2Nyb2xsRWxlbWVudFJlc2l6ZWRUaW1lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuZGlzcG9zZVNjcm9sbEhhbmRsZXIpIHtcclxuXHRcdFx0dGhpcy5kaXNwb3NlU2Nyb2xsSGFuZGxlcigpO1xyXG5cdFx0XHR0aGlzLmRpc3Bvc2VTY3JvbGxIYW5kbGVyID0gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmRpc3Bvc2VSZXNpemVIYW5kbGVyKSB7XHJcblx0XHRcdHRoaXMuZGlzcG9zZVJlc2l6ZUhhbmRsZXIoKTtcclxuXHRcdFx0dGhpcy5kaXNwb3NlUmVzaXplSGFuZGxlciA9IHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXRFbGVtZW50c09mZnNldCgpOiBudW1iZXIge1xyXG5cdFx0aWYgKHRoaXMuaXNBbmd1bGFyVW5pdmVyc2FsU1NSKSB7XHJcblx0XHRcdHJldHVybiAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBvZmZzZXQgPSAwO1xyXG5cclxuXHRcdGlmICh0aGlzLmNvbnRhaW5lckVsZW1lbnRSZWYgJiYgdGhpcy5jb250YWluZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcclxuXHRcdFx0b2Zmc2V0ICs9IHRoaXMuY29udGFpbmVyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RoaXMuX29mZnNldFR5cGVdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnBhcmVudFNjcm9sbCkge1xyXG5cdFx0XHRsZXQgc2Nyb2xsRWxlbWVudCA9IHRoaXMuZ2V0U2Nyb2xsRWxlbWVudCgpO1xyXG5cdFx0XHRsZXQgZWxlbWVudENsaWVudFJlY3QgPSB0aGlzLmdldEVsZW1lbnRTaXplKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcclxuXHRcdFx0bGV0IHNjcm9sbENsaWVudFJlY3QgPSB0aGlzLmdldEVsZW1lbnRTaXplKHNjcm9sbEVsZW1lbnQpO1xyXG5cdFx0XHRpZiAodGhpcy5ob3Jpem9udGFsKSB7XHJcblx0XHRcdFx0b2Zmc2V0ICs9IGVsZW1lbnRDbGllbnRSZWN0LmxlZnQgLSBzY3JvbGxDbGllbnRSZWN0LmxlZnQ7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0b2Zmc2V0ICs9IGVsZW1lbnRDbGllbnRSZWN0LnRvcCAtIHNjcm9sbENsaWVudFJlY3QudG9wO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoISh0aGlzLnBhcmVudFNjcm9sbCBpbnN0YW5jZW9mIFdpbmRvdykpIHtcclxuXHRcdFx0XHRvZmZzZXQgKz0gc2Nyb2xsRWxlbWVudFt0aGlzLl9zY3JvbGxUeXBlXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvZmZzZXQ7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY291bnRJdGVtc1BlcldyYXBHcm91cCgpOiBudW1iZXIge1xyXG5cdFx0aWYgKHRoaXMuaXNBbmd1bGFyVW5pdmVyc2FsU1NSKSB7XHJcblx0XHRcdHJldHVybiBNYXRoLnJvdW5kKHRoaXMuaG9yaXpvbnRhbCA/IHRoaXMuc3NyVmlld3BvcnRIZWlnaHQgLyB0aGlzLnNzckNoaWxkSGVpZ2h0IDogdGhpcy5zc3JWaWV3cG9ydFdpZHRoIC8gdGhpcy5zc3JDaGlsZFdpZHRoKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcHJvcGVydHlOYW1lID0gdGhpcy5ob3Jpem9udGFsID8gJ29mZnNldExlZnQnIDogJ29mZnNldFRvcCc7XHJcblx0XHRsZXQgY2hpbGRyZW4gPSAoKHRoaXMuY29udGFpbmVyRWxlbWVudFJlZiAmJiB0aGlzLmNvbnRhaW5lckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgfHwgdGhpcy5jb250ZW50RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5jaGlsZHJlbjtcclxuXHJcblx0XHRsZXQgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbiA/IGNoaWxkcmVuLmxlbmd0aCA6IDA7XHJcblx0XHRpZiAoY2hpbGRyZW5MZW5ndGggPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIDE7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGZpcnN0T2Zmc2V0ID0gY2hpbGRyZW5bMF1bcHJvcGVydHlOYW1lXTtcclxuXHRcdGxldCByZXN1bHQgPSAxO1xyXG5cdFx0d2hpbGUgKHJlc3VsdCA8IGNoaWxkcmVuTGVuZ3RoICYmIGZpcnN0T2Zmc2V0ID09PSBjaGlsZHJlbltyZXN1bHRdW3Byb3BlcnR5TmFtZV0pIHtcclxuXHRcdFx0KytyZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXRTY3JvbGxTdGFydFBvc2l0aW9uKCk6IG51bWJlciB7XHJcblx0XHRsZXQgd2luZG93U2Nyb2xsVmFsdWUgPSB1bmRlZmluZWQ7XHJcblx0XHRpZiAodGhpcy5wYXJlbnRTY3JvbGwgaW5zdGFuY2VvZiBXaW5kb3cpIHtcclxuXHRcdFx0d2luZG93U2Nyb2xsVmFsdWUgPSB3aW5kb3dbdGhpcy5fcGFnZU9mZnNldFR5cGVdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB3aW5kb3dTY3JvbGxWYWx1ZSB8fCB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKVt0aGlzLl9zY3JvbGxUeXBlXSB8fCAwO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIG1pbk1lYXN1cmVkQ2hpbGRXaWR0aDogbnVtYmVyO1xyXG5cdHByb3RlY3RlZCBtaW5NZWFzdXJlZENoaWxkSGVpZ2h0OiBudW1iZXI7XHJcblxyXG5cdHByb3RlY3RlZCB3cmFwR3JvdXBEaW1lbnNpb25zOiBXcmFwR3JvdXBEaW1lbnNpb25zO1xyXG5cclxuXHRwcm90ZWN0ZWQgcmVzZXRXcmFwR3JvdXBEaW1lbnNpb25zKCk6IHZvaWQge1xyXG5cdFx0Y29uc3Qgb2xkV3JhcEdyb3VwRGltZW5zaW9ucyA9IHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucztcclxuXHRcdHRoaXMuaW52YWxpZGF0ZUFsbENhY2hlZE1lYXN1cmVtZW50cygpO1xyXG5cclxuXHRcdGlmICghdGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcyB8fCAhb2xkV3JhcEdyb3VwRGltZW5zaW9ucyB8fCBvbGRXcmFwR3JvdXBEaW1lbnNpb25zLm51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzID09PSAwKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBpdGVtc1BlcldyYXBHcm91cDogbnVtYmVyID0gdGhpcy5jb3VudEl0ZW1zUGVyV3JhcEdyb3VwKCk7XHJcblx0XHRmb3IgKGxldCB3cmFwR3JvdXBJbmRleCA9IDA7IHdyYXBHcm91cEluZGV4IDwgb2xkV3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXAubGVuZ3RoOyArK3dyYXBHcm91cEluZGV4KSB7XHJcblx0XHRcdGNvbnN0IG9sZFdyYXBHcm91cERpbWVuc2lvbjogV3JhcEdyb3VwRGltZW5zaW9uID0gb2xkV3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbd3JhcEdyb3VwSW5kZXhdO1xyXG5cdFx0XHRpZiAoIW9sZFdyYXBHcm91cERpbWVuc2lvbiB8fCAhb2xkV3JhcEdyb3VwRGltZW5zaW9uLml0ZW1zIHx8ICFvbGRXcmFwR3JvdXBEaW1lbnNpb24uaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvbGRXcmFwR3JvdXBEaW1lbnNpb24uaXRlbXMubGVuZ3RoICE9PSBpdGVtc1BlcldyYXBHcm91cCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGl0ZW1zQ2hhbmdlZCA9IGZhbHNlO1xyXG5cdFx0XHRsZXQgYXJyYXlTdGFydEluZGV4ID0gaXRlbXNQZXJXcmFwR3JvdXAgKiB3cmFwR3JvdXBJbmRleDtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtc1BlcldyYXBHcm91cDsgKytpKSB7XHJcblx0XHRcdFx0aWYgKCF0aGlzLmNvbXBhcmVJdGVtcyhvbGRXcmFwR3JvdXBEaW1lbnNpb24uaXRlbXNbaV0sIHRoaXMuaXRlbXNbYXJyYXlTdGFydEluZGV4ICsgaV0pKSB7XHJcblx0XHRcdFx0XHRpdGVtc0NoYW5nZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWl0ZW1zQ2hhbmdlZCkge1xyXG5cdFx0XHRcdCsrdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzO1xyXG5cdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRXaWR0aHMgKz0gb2xkV3JhcEdyb3VwRGltZW5zaW9uLmNoaWxkV2lkdGggfHwgMDtcclxuXHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkSGVpZ2h0cyArPSBvbGRXcmFwR3JvdXBEaW1lbnNpb24uY2hpbGRIZWlnaHQgfHwgMDtcclxuXHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW3dyYXBHcm91cEluZGV4XSA9IG9sZFdyYXBHcm91cERpbWVuc2lvbjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNhbGN1bGF0ZURpbWVuc2lvbnMoKTogSURpbWVuc2lvbnMge1xyXG5cdFx0bGV0IHNjcm9sbEVsZW1lbnQgPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKTtcclxuXHJcblx0XHRjb25zdCBtYXhDYWxjdWxhdGVkU2Nyb2xsQmFyU2l6ZTogbnVtYmVyID0gMjU7IC8vIE5vdGU6IEZvcm11bGEgdG8gYXV0by1jYWxjdWxhdGUgZG9lc24ndCB3b3JrIGZvciBQYXJlbnRTY3JvbGwsIHNvIHdlIGRlZmF1bHQgdG8gdGhpcyBpZiBub3Qgc2V0IGJ5IGNvbnN1bWluZyBhcHBsaWNhdGlvblxyXG5cdFx0dGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0ID0gTWF0aC5tYXgoTWF0aC5taW4oc2Nyb2xsRWxlbWVudC5vZmZzZXRIZWlnaHQgLSBzY3JvbGxFbGVtZW50LmNsaWVudEhlaWdodCwgbWF4Q2FsY3VsYXRlZFNjcm9sbEJhclNpemUpLCB0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJIZWlnaHQpO1xyXG5cdFx0dGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggPSBNYXRoLm1heChNYXRoLm1pbihzY3JvbGxFbGVtZW50Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRWxlbWVudC5jbGllbnRXaWR0aCwgbWF4Q2FsY3VsYXRlZFNjcm9sbEJhclNpemUpLCB0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCk7XHJcblxyXG5cdFx0bGV0IHZpZXdwb3J0V2lkdGggPSBzY3JvbGxFbGVtZW50Lm9mZnNldFdpZHRoIC0gKHRoaXMuc2Nyb2xsYmFyV2lkdGggfHwgdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggfHwgKHRoaXMuaG9yaXpvbnRhbCA/IDAgOiBtYXhDYWxjdWxhdGVkU2Nyb2xsQmFyU2l6ZSkpO1xyXG5cdFx0bGV0IHZpZXdwb3J0SGVpZ2h0ID0gc2Nyb2xsRWxlbWVudC5vZmZzZXRIZWlnaHQgLSAodGhpcy5zY3JvbGxiYXJIZWlnaHQgfHwgdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0IHx8ICh0aGlzLmhvcml6b250YWwgPyBtYXhDYWxjdWxhdGVkU2Nyb2xsQmFyU2l6ZSA6IDApKTtcclxuXHJcblx0XHRsZXQgY29udGVudCA9ICh0aGlzLmNvbnRhaW5lckVsZW1lbnRSZWYgJiYgdGhpcy5jb250YWluZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHx8IHRoaXMuY29udGVudEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuXHJcblx0XHRsZXQgaXRlbXNQZXJXcmFwR3JvdXAgPSB0aGlzLmNvdW50SXRlbXNQZXJXcmFwR3JvdXAoKTtcclxuXHRcdGxldCB3cmFwR3JvdXBzUGVyUGFnZTtcclxuXHJcblx0XHRsZXQgZGVmYXVsdENoaWxkV2lkdGg7XHJcblx0XHRsZXQgZGVmYXVsdENoaWxkSGVpZ2h0O1xyXG5cclxuXHRcdGlmICh0aGlzLmlzQW5ndWxhclVuaXZlcnNhbFNTUikge1xyXG5cdFx0XHR2aWV3cG9ydFdpZHRoID0gdGhpcy5zc3JWaWV3cG9ydFdpZHRoO1xyXG5cdFx0XHR2aWV3cG9ydEhlaWdodCA9IHRoaXMuc3NyVmlld3BvcnRIZWlnaHQ7XHJcblx0XHRcdGRlZmF1bHRDaGlsZFdpZHRoID0gdGhpcy5zc3JDaGlsZFdpZHRoO1xyXG5cdFx0XHRkZWZhdWx0Q2hpbGRIZWlnaHQgPSB0aGlzLnNzckNoaWxkSGVpZ2h0O1xyXG5cdFx0XHRsZXQgaXRlbXNQZXJSb3cgPSBNYXRoLm1heChNYXRoLmNlaWwodmlld3BvcnRXaWR0aCAvIGRlZmF1bHRDaGlsZFdpZHRoKSwgMSk7XHJcblx0XHRcdGxldCBpdGVtc1BlckNvbCA9IE1hdGgubWF4KE1hdGguY2VpbCh2aWV3cG9ydEhlaWdodCAvIGRlZmF1bHRDaGlsZEhlaWdodCksIDEpO1xyXG5cdFx0XHR3cmFwR3JvdXBzUGVyUGFnZSA9IHRoaXMuaG9yaXpvbnRhbCA/IGl0ZW1zUGVyUm93IDogaXRlbXNQZXJDb2w7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICghdGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcykge1xyXG5cdFx0XHRpZiAoY29udGVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0aWYgKCF0aGlzLmNoaWxkV2lkdGggfHwgIXRoaXMuY2hpbGRIZWlnaHQpIHtcclxuXHRcdFx0XHRcdGlmICghdGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggJiYgdmlld3BvcnRXaWR0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggPSB2aWV3cG9ydFdpZHRoO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgJiYgdmlld3BvcnRIZWlnaHQgPiAwKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bGV0IGNoaWxkID0gY29udGVudC5jaGlsZHJlblswXTtcclxuXHRcdFx0XHRsZXQgY2xpZW50UmVjdCA9IHRoaXMuZ2V0RWxlbWVudFNpemUoY2hpbGQpO1xyXG5cdFx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZFdpZHRoID0gTWF0aC5taW4odGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGgsIGNsaWVudFJlY3Qud2lkdGgpO1xyXG5cdFx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IE1hdGgubWluKHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCwgY2xpZW50UmVjdC5oZWlnaHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkZWZhdWx0Q2hpbGRXaWR0aCA9IHRoaXMuY2hpbGRXaWR0aCB8fCB0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCB8fCB2aWV3cG9ydFdpZHRoO1xyXG5cdFx0XHRkZWZhdWx0Q2hpbGRIZWlnaHQgPSB0aGlzLmNoaWxkSGVpZ2h0IHx8IHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCB8fCB2aWV3cG9ydEhlaWdodDtcclxuXHRcdFx0bGV0IGl0ZW1zUGVyUm93ID0gTWF0aC5tYXgoTWF0aC5jZWlsKHZpZXdwb3J0V2lkdGggLyBkZWZhdWx0Q2hpbGRXaWR0aCksIDEpO1xyXG5cdFx0XHRsZXQgaXRlbXNQZXJDb2wgPSBNYXRoLm1heChNYXRoLmNlaWwodmlld3BvcnRIZWlnaHQgLyBkZWZhdWx0Q2hpbGRIZWlnaHQpLCAxKTtcclxuXHRcdFx0d3JhcEdyb3Vwc1BlclBhZ2UgPSB0aGlzLmhvcml6b250YWwgPyBpdGVtc1BlclJvdyA6IGl0ZW1zUGVyQ29sO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IHNjcm9sbE9mZnNldCA9IHNjcm9sbEVsZW1lbnRbdGhpcy5fc2Nyb2xsVHlwZV0gLSAodGhpcy5wcmV2aW91c1ZpZXdQb3J0ID8gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnBhZGRpbmcgOiAwKTtcclxuXHJcblx0XHRcdGxldCBhcnJheVN0YXJ0SW5kZXggPSB0aGlzLnByZXZpb3VzVmlld1BvcnQuc3RhcnRJbmRleFdpdGhCdWZmZXIgfHwgMDtcclxuXHRcdFx0bGV0IHdyYXBHcm91cEluZGV4ID0gTWF0aC5jZWlsKGFycmF5U3RhcnRJbmRleCAvIGl0ZW1zUGVyV3JhcEdyb3VwKTtcclxuXHJcblx0XHRcdGxldCBtYXhXaWR0aEZvcldyYXBHcm91cCA9IDA7XHJcblx0XHRcdGxldCBtYXhIZWlnaHRGb3JXcmFwR3JvdXAgPSAwO1xyXG5cdFx0XHRsZXQgc3VtT2ZWaXNpYmxlTWF4V2lkdGhzID0gMDtcclxuXHRcdFx0bGV0IHN1bU9mVmlzaWJsZU1heEhlaWdodHMgPSAwO1xyXG5cdFx0XHR3cmFwR3JvdXBzUGVyUGFnZSA9IDA7XHJcblxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcclxuXHRcdFx0XHQrK2FycmF5U3RhcnRJbmRleDtcclxuXHRcdFx0XHRsZXQgY2hpbGQgPSBjb250ZW50LmNoaWxkcmVuW2ldO1xyXG5cdFx0XHRcdGxldCBjbGllbnRSZWN0ID0gdGhpcy5nZXRFbGVtZW50U2l6ZShjaGlsZCk7XHJcblxyXG5cdFx0XHRcdG1heFdpZHRoRm9yV3JhcEdyb3VwID0gTWF0aC5tYXgobWF4V2lkdGhGb3JXcmFwR3JvdXAsIGNsaWVudFJlY3Qud2lkdGgpO1xyXG5cdFx0XHRcdG1heEhlaWdodEZvcldyYXBHcm91cCA9IE1hdGgubWF4KG1heEhlaWdodEZvcldyYXBHcm91cCwgY2xpZW50UmVjdC5oZWlnaHQpO1xyXG5cclxuXHRcdFx0XHRpZiAoYXJyYXlTdGFydEluZGV4ICUgaXRlbXNQZXJXcmFwR3JvdXAgPT09IDApIHtcclxuXHRcdFx0XHRcdGxldCBvbGRWYWx1ZSA9IHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbd3JhcEdyb3VwSW5kZXhdO1xyXG5cdFx0XHRcdFx0aWYgKG9sZFZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdC0tdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzO1xyXG5cdFx0XHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkV2lkdGhzIC09IG9sZFZhbHVlLmNoaWxkV2lkdGggfHwgMDtcclxuXHRcdFx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZEhlaWdodHMgLT0gb2xkVmFsdWUuY2hpbGRIZWlnaHQgfHwgMDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQrK3RoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5udW1iZXJPZktub3duV3JhcEdyb3VwQ2hpbGRTaXplcztcclxuXHRcdFx0XHRcdGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy5zbGljZShhcnJheVN0YXJ0SW5kZXggLSBpdGVtc1BlcldyYXBHcm91cCwgYXJyYXlTdGFydEluZGV4KTtcclxuXHRcdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbd3JhcEdyb3VwSW5kZXhdID0ge1xyXG5cdFx0XHRcdFx0XHRjaGlsZFdpZHRoOiBtYXhXaWR0aEZvcldyYXBHcm91cCxcclxuXHRcdFx0XHRcdFx0Y2hpbGRIZWlnaHQ6IG1heEhlaWdodEZvcldyYXBHcm91cCxcclxuXHRcdFx0XHRcdFx0aXRlbXM6IGl0ZW1zXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZFdpZHRocyArPSBtYXhXaWR0aEZvcldyYXBHcm91cDtcclxuXHRcdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRIZWlnaHRzICs9IG1heEhlaWdodEZvcldyYXBHcm91cDtcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5ob3Jpem9udGFsKSB7XHJcblx0XHRcdFx0XHRcdGxldCBtYXhWaXNpYmxlV2lkdGhGb3JXcmFwR3JvdXAgPSBNYXRoLm1pbihtYXhXaWR0aEZvcldyYXBHcm91cCwgTWF0aC5tYXgodmlld3BvcnRXaWR0aCAtIHN1bU9mVmlzaWJsZU1heFdpZHRocywgMCkpO1xyXG5cdFx0XHRcdFx0XHRpZiAoc2Nyb2xsT2Zmc2V0ID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdGxldCBzY3JvbGxPZmZzZXRUb1JlbW92ZSA9IE1hdGgubWluKHNjcm9sbE9mZnNldCwgbWF4VmlzaWJsZVdpZHRoRm9yV3JhcEdyb3VwKTtcclxuXHRcdFx0XHRcdFx0XHRtYXhWaXNpYmxlV2lkdGhGb3JXcmFwR3JvdXAgLT0gc2Nyb2xsT2Zmc2V0VG9SZW1vdmU7XHJcblx0XHRcdFx0XHRcdFx0c2Nyb2xsT2Zmc2V0IC09IHNjcm9sbE9mZnNldFRvUmVtb3ZlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRzdW1PZlZpc2libGVNYXhXaWR0aHMgKz0gbWF4VmlzaWJsZVdpZHRoRm9yV3JhcEdyb3VwO1xyXG5cdFx0XHRcdFx0XHRpZiAobWF4VmlzaWJsZVdpZHRoRm9yV3JhcEdyb3VwID4gMCAmJiB2aWV3cG9ydFdpZHRoID49IHN1bU9mVmlzaWJsZU1heFdpZHRocykge1xyXG5cdFx0XHRcdFx0XHRcdCsrd3JhcEdyb3Vwc1BlclBhZ2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGxldCBtYXhWaXNpYmxlSGVpZ2h0Rm9yV3JhcEdyb3VwID0gTWF0aC5taW4obWF4SGVpZ2h0Rm9yV3JhcEdyb3VwLCBNYXRoLm1heCh2aWV3cG9ydEhlaWdodCAtIHN1bU9mVmlzaWJsZU1heEhlaWdodHMsIDApKTtcclxuXHRcdFx0XHRcdFx0aWYgKHNjcm9sbE9mZnNldCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRsZXQgc2Nyb2xsT2Zmc2V0VG9SZW1vdmUgPSBNYXRoLm1pbihzY3JvbGxPZmZzZXQsIG1heFZpc2libGVIZWlnaHRGb3JXcmFwR3JvdXApO1xyXG5cdFx0XHRcdFx0XHRcdG1heFZpc2libGVIZWlnaHRGb3JXcmFwR3JvdXAgLT0gc2Nyb2xsT2Zmc2V0VG9SZW1vdmU7XHJcblx0XHRcdFx0XHRcdFx0c2Nyb2xsT2Zmc2V0IC09IHNjcm9sbE9mZnNldFRvUmVtb3ZlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRzdW1PZlZpc2libGVNYXhIZWlnaHRzICs9IG1heFZpc2libGVIZWlnaHRGb3JXcmFwR3JvdXA7XHJcblx0XHRcdFx0XHRcdGlmIChtYXhWaXNpYmxlSGVpZ2h0Rm9yV3JhcEdyb3VwID4gMCAmJiB2aWV3cG9ydEhlaWdodCA+PSBzdW1PZlZpc2libGVNYXhIZWlnaHRzKSB7XHJcblx0XHRcdFx0XHRcdFx0Kyt3cmFwR3JvdXBzUGVyUGFnZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCsrd3JhcEdyb3VwSW5kZXg7XHJcblxyXG5cdFx0XHRcdFx0bWF4V2lkdGhGb3JXcmFwR3JvdXAgPSAwO1xyXG5cdFx0XHRcdFx0bWF4SGVpZ2h0Rm9yV3JhcEdyb3VwID0gMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBhdmVyYWdlQ2hpbGRXaWR0aCA9IHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRXaWR0aHMgLyB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXM7XHJcblx0XHRcdGxldCBhdmVyYWdlQ2hpbGRIZWlnaHQgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkSGVpZ2h0cyAvIHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5udW1iZXJPZktub3duV3JhcEdyb3VwQ2hpbGRTaXplcztcclxuXHRcdFx0ZGVmYXVsdENoaWxkV2lkdGggPSB0aGlzLmNoaWxkV2lkdGggfHwgYXZlcmFnZUNoaWxkV2lkdGggfHwgdmlld3BvcnRXaWR0aDtcclxuXHRcdFx0ZGVmYXVsdENoaWxkSGVpZ2h0ID0gdGhpcy5jaGlsZEhlaWdodCB8fCBhdmVyYWdlQ2hpbGRIZWlnaHQgfHwgdmlld3BvcnRIZWlnaHQ7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5ob3Jpem9udGFsKSB7XHJcblx0XHRcdFx0aWYgKHZpZXdwb3J0V2lkdGggPiBzdW1PZlZpc2libGVNYXhXaWR0aHMpIHtcclxuXHRcdFx0XHRcdHdyYXBHcm91cHNQZXJQYWdlICs9IE1hdGguY2VpbCgodmlld3BvcnRXaWR0aCAtIHN1bU9mVmlzaWJsZU1heFdpZHRocykgLyBkZWZhdWx0Q2hpbGRXaWR0aCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICh2aWV3cG9ydEhlaWdodCA+IHN1bU9mVmlzaWJsZU1heEhlaWdodHMpIHtcclxuXHRcdFx0XHRcdHdyYXBHcm91cHNQZXJQYWdlICs9IE1hdGguY2VpbCgodmlld3BvcnRIZWlnaHQgLSBzdW1PZlZpc2libGVNYXhIZWlnaHRzKSAvIGRlZmF1bHRDaGlsZEhlaWdodCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGl0ZW1Db3VudCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xyXG5cdFx0bGV0IGl0ZW1zUGVyUGFnZSA9IGl0ZW1zUGVyV3JhcEdyb3VwICogd3JhcEdyb3Vwc1BlclBhZ2U7XHJcblx0XHRsZXQgcGFnZUNvdW50X2ZyYWN0aW9uYWwgPSBpdGVtQ291bnQgLyBpdGVtc1BlclBhZ2U7XHJcblx0XHRsZXQgbnVtYmVyT2ZXcmFwR3JvdXBzID0gTWF0aC5jZWlsKGl0ZW1Db3VudCAvIGl0ZW1zUGVyV3JhcEdyb3VwKTtcclxuXHJcblx0XHRsZXQgc2Nyb2xsTGVuZ3RoID0gMDtcclxuXHJcblx0XHRsZXQgZGVmYXVsdFNjcm9sbExlbmd0aFBlcldyYXBHcm91cCA9IHRoaXMuaG9yaXpvbnRhbCA/IGRlZmF1bHRDaGlsZFdpZHRoIDogZGVmYXVsdENoaWxkSGVpZ2h0O1xyXG5cdFx0aWYgKHRoaXMuZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMpIHtcclxuXHRcdFx0bGV0IG51bVVua25vd25DaGlsZFNpemVzID0gMDtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZldyYXBHcm91cHM7ICsraSkge1xyXG5cdFx0XHRcdGxldCBjaGlsZFNpemUgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2ldICYmIHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbaV1bdGhpcy5fY2hpbGRTY3JvbGxEaW1dO1xyXG5cdFx0XHRcdGlmIChjaGlsZFNpemUpIHtcclxuXHRcdFx0XHRcdHNjcm9sbExlbmd0aCArPSBjaGlsZFNpemU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCsrbnVtVW5rbm93bkNoaWxkU2l6ZXM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzY3JvbGxMZW5ndGggKz0gTWF0aC5yb3VuZChudW1Vbmtub3duQ2hpbGRTaXplcyAqIGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2Nyb2xsTGVuZ3RoID0gbnVtYmVyT2ZXcmFwR3JvdXBzICogZGVmYXVsdFNjcm9sbExlbmd0aFBlcldyYXBHcm91cDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5oZWFkZXJFbGVtZW50UmVmKSB7XHJcblx0XHRcdHNjcm9sbExlbmd0aCArPSB0aGlzLmhlYWRlckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHZpZXdwb3J0TGVuZ3RoID0gdGhpcy5ob3Jpem9udGFsID8gdmlld3BvcnRXaWR0aCA6IHZpZXdwb3J0SGVpZ2h0O1xyXG5cdFx0bGV0IG1heFNjcm9sbFBvc2l0aW9uID0gTWF0aC5tYXgoc2Nyb2xsTGVuZ3RoIC0gdmlld3BvcnRMZW5ndGgsIDApO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGl0ZW1Db3VudDogaXRlbUNvdW50LFxyXG5cdFx0XHRpdGVtc1BlcldyYXBHcm91cDogaXRlbXNQZXJXcmFwR3JvdXAsXHJcblx0XHRcdHdyYXBHcm91cHNQZXJQYWdlOiB3cmFwR3JvdXBzUGVyUGFnZSxcclxuXHRcdFx0aXRlbXNQZXJQYWdlOiBpdGVtc1BlclBhZ2UsXHJcblx0XHRcdHBhZ2VDb3VudF9mcmFjdGlvbmFsOiBwYWdlQ291bnRfZnJhY3Rpb25hbCxcclxuXHRcdFx0Y2hpbGRXaWR0aDogZGVmYXVsdENoaWxkV2lkdGgsXHJcblx0XHRcdGNoaWxkSGVpZ2h0OiBkZWZhdWx0Q2hpbGRIZWlnaHQsXHJcblx0XHRcdHNjcm9sbExlbmd0aDogc2Nyb2xsTGVuZ3RoLFxyXG5cdFx0XHR2aWV3cG9ydExlbmd0aDogdmlld3BvcnRMZW5ndGgsXHJcblx0XHRcdG1heFNjcm9sbFBvc2l0aW9uOiBtYXhTY3JvbGxQb3NpdGlvblxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjYWNoZWRQYWdlU2l6ZTogbnVtYmVyID0gMDtcclxuXHRwcm90ZWN0ZWQgcHJldmlvdXNTY3JvbGxOdW1iZXJFbGVtZW50czogbnVtYmVyID0gMDtcclxuXHJcblx0cHJvdGVjdGVkIGNhbGN1bGF0ZVBhZGRpbmcoYXJyYXlTdGFydEluZGV4V2l0aEJ1ZmZlcjogbnVtYmVyLCBkaW1lbnNpb25zOiBJRGltZW5zaW9ucyk6IG51bWJlciB7XHJcblx0XHRpZiAoZGltZW5zaW9ucy5pdGVtQ291bnQgPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXAgPSBkaW1lbnNpb25zW3RoaXMuX2NoaWxkU2Nyb2xsRGltXTtcclxuXHRcdGxldCBzdGFydGluZ1dyYXBHcm91cEluZGV4ID0gTWF0aC5mbG9vcihhcnJheVN0YXJ0SW5kZXhXaXRoQnVmZmVyIC8gZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cCkgfHwgMDtcclxuXHJcblx0XHRpZiAoIXRoaXMuZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMpIHtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXAgKiBzdGFydGluZ1dyYXBHcm91cEluZGV4O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBudW1Vbmtub3duQ2hpbGRTaXplcyA9IDA7XHJcblx0XHRsZXQgcmVzdWx0ID0gMDtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3RhcnRpbmdXcmFwR3JvdXBJbmRleDsgKytpKSB7XHJcblx0XHRcdGxldCBjaGlsZFNpemUgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2ldICYmIHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbaV1bdGhpcy5fY2hpbGRTY3JvbGxEaW1dO1xyXG5cdFx0XHRpZiAoY2hpbGRTaXplKSB7XHJcblx0XHRcdFx0cmVzdWx0ICs9IGNoaWxkU2l6ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQrK251bVVua25vd25DaGlsZFNpemVzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXN1bHQgKz0gTWF0aC5yb3VuZChudW1Vbmtub3duQ2hpbGRTaXplcyAqIGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXApO1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2FsY3VsYXRlUGFnZUluZm8oc2Nyb2xsUG9zaXRpb246IG51bWJlciwgZGltZW5zaW9uczogSURpbWVuc2lvbnMpOiBJUGFnZUluZm8ge1xyXG5cdFx0bGV0IHNjcm9sbFBlcmNlbnRhZ2UgPSAwO1xyXG5cdFx0aWYgKHRoaXMuZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMpIHtcclxuXHRcdFx0Y29uc3QgbnVtYmVyT2ZXcmFwR3JvdXBzID0gTWF0aC5jZWlsKGRpbWVuc2lvbnMuaXRlbUNvdW50IC8gZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cCk7XHJcblx0XHRcdGxldCB0b3RhbFNjcm9sbGVkTGVuZ3RoID0gMDtcclxuXHRcdFx0bGV0IGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXAgPSBkaW1lbnNpb25zW3RoaXMuX2NoaWxkU2Nyb2xsRGltXTtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZldyYXBHcm91cHM7ICsraSkge1xyXG5cdFx0XHRcdGxldCBjaGlsZFNpemUgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2ldICYmIHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbaV1bdGhpcy5fY2hpbGRTY3JvbGxEaW1dO1xyXG5cdFx0XHRcdGlmIChjaGlsZFNpemUpIHtcclxuXHRcdFx0XHRcdHRvdGFsU2Nyb2xsZWRMZW5ndGggKz0gY2hpbGRTaXplO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0b3RhbFNjcm9sbGVkTGVuZ3RoICs9IGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoc2Nyb2xsUG9zaXRpb24gPCB0b3RhbFNjcm9sbGVkTGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRzY3JvbGxQZXJjZW50YWdlID0gaSAvIG51bWJlck9mV3JhcEdyb3VwcztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2Nyb2xsUGVyY2VudGFnZSA9IHNjcm9sbFBvc2l0aW9uIC8gZGltZW5zaW9ucy5zY3JvbGxMZW5ndGg7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHN0YXJ0aW5nQXJyYXlJbmRleF9mcmFjdGlvbmFsID0gTWF0aC5taW4oTWF0aC5tYXgoc2Nyb2xsUGVyY2VudGFnZSAqIGRpbWVuc2lvbnMucGFnZUNvdW50X2ZyYWN0aW9uYWwsIDApLCBkaW1lbnNpb25zLnBhZ2VDb3VudF9mcmFjdGlvbmFsKSAqIGRpbWVuc2lvbnMuaXRlbXNQZXJQYWdlO1xyXG5cclxuXHRcdGxldCBtYXhTdGFydCA9IGRpbWVuc2lvbnMuaXRlbUNvdW50IC0gZGltZW5zaW9ucy5pdGVtc1BlclBhZ2UgLSAxO1xyXG5cdFx0bGV0IGFycmF5U3RhcnRJbmRleCA9IE1hdGgubWluKE1hdGguZmxvb3Ioc3RhcnRpbmdBcnJheUluZGV4X2ZyYWN0aW9uYWwpLCBtYXhTdGFydCk7XHJcblx0XHRhcnJheVN0YXJ0SW5kZXggLT0gYXJyYXlTdGFydEluZGV4ICUgZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cDsgLy8gcm91bmQgZG93biB0byBzdGFydCBvZiB3cmFwR3JvdXBcclxuXHJcblx0XHRpZiAodGhpcy5zdHJpcGVkVGFibGUpIHtcclxuXHRcdFx0bGV0IGJ1ZmZlckJvdW5kYXJ5ID0gMiAqIGRpbWVuc2lvbnMuaXRlbXNQZXJXcmFwR3JvdXA7XHJcblx0XHRcdGlmIChhcnJheVN0YXJ0SW5kZXggJSBidWZmZXJCb3VuZGFyeSAhPT0gMCkge1xyXG5cdFx0XHRcdGFycmF5U3RhcnRJbmRleCA9IE1hdGgubWF4KGFycmF5U3RhcnRJbmRleCAtIGFycmF5U3RhcnRJbmRleCAlIGJ1ZmZlckJvdW5kYXJ5LCAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBhcnJheUVuZEluZGV4ID0gTWF0aC5jZWlsKHN0YXJ0aW5nQXJyYXlJbmRleF9mcmFjdGlvbmFsKSArIGRpbWVuc2lvbnMuaXRlbXNQZXJQYWdlIC0gMTtcclxuXHRcdGxldCBlbmRJbmRleFdpdGhpbldyYXBHcm91cCA9IChhcnJheUVuZEluZGV4ICsgMSkgJSBkaW1lbnNpb25zLml0ZW1zUGVyV3JhcEdyb3VwO1xyXG5cdFx0aWYgKGVuZEluZGV4V2l0aGluV3JhcEdyb3VwID4gMCkge1xyXG5cdFx0XHRhcnJheUVuZEluZGV4ICs9IGRpbWVuc2lvbnMuaXRlbXNQZXJXcmFwR3JvdXAgLSBlbmRJbmRleFdpdGhpbldyYXBHcm91cDsgLy8gcm91bmQgdXAgdG8gZW5kIG9mIHdyYXBHcm91cFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpc05hTihhcnJheVN0YXJ0SW5kZXgpKSB7XHJcblx0XHRcdGFycmF5U3RhcnRJbmRleCA9IDA7XHJcblx0XHR9XHJcblx0XHRpZiAoaXNOYU4oYXJyYXlFbmRJbmRleCkpIHtcclxuXHRcdFx0YXJyYXlFbmRJbmRleCA9IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0YXJyYXlTdGFydEluZGV4ID0gTWF0aC5taW4oTWF0aC5tYXgoYXJyYXlTdGFydEluZGV4LCAwKSwgZGltZW5zaW9ucy5pdGVtQ291bnQgLSAxKTtcclxuXHRcdGFycmF5RW5kSW5kZXggPSBNYXRoLm1pbihNYXRoLm1heChhcnJheUVuZEluZGV4LCAwKSwgZGltZW5zaW9ucy5pdGVtQ291bnQgLSAxKTtcclxuXHJcblx0XHRsZXQgYnVmZmVyU2l6ZSA9IHRoaXMuYnVmZmVyQW1vdW50ICogZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cDtcclxuXHRcdGxldCBzdGFydEluZGV4V2l0aEJ1ZmZlciA9IE1hdGgubWluKE1hdGgubWF4KGFycmF5U3RhcnRJbmRleCAtIGJ1ZmZlclNpemUsIDApLCBkaW1lbnNpb25zLml0ZW1Db3VudCAtIDEpO1xyXG5cdFx0bGV0IGVuZEluZGV4V2l0aEJ1ZmZlciA9IE1hdGgubWluKE1hdGgubWF4KGFycmF5RW5kSW5kZXggKyBidWZmZXJTaXplLCAwKSwgZGltZW5zaW9ucy5pdGVtQ291bnQgLSAxKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzdGFydEluZGV4OiBhcnJheVN0YXJ0SW5kZXgsXHJcblx0XHRcdGVuZEluZGV4OiBhcnJheUVuZEluZGV4LFxyXG5cdFx0XHRzdGFydEluZGV4V2l0aEJ1ZmZlcjogc3RhcnRJbmRleFdpdGhCdWZmZXIsXHJcblx0XHRcdGVuZEluZGV4V2l0aEJ1ZmZlcjogZW5kSW5kZXhXaXRoQnVmZmVyLFxyXG5cdFx0XHRzY3JvbGxTdGFydFBvc2l0aW9uOiBzY3JvbGxQb3NpdGlvbixcclxuXHRcdFx0c2Nyb2xsRW5kUG9zaXRpb246IHNjcm9sbFBvc2l0aW9uICsgZGltZW5zaW9ucy52aWV3cG9ydExlbmd0aCxcclxuXHRcdFx0bWF4U2Nyb2xsUG9zaXRpb246IGRpbWVuc2lvbnMubWF4U2Nyb2xsUG9zaXRpb25cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2FsY3VsYXRlVmlld3BvcnQoKTogSVZpZXdwb3J0IHtcclxuXHRcdGxldCBkaW1lbnNpb25zID0gdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKCk7XHJcblx0XHRsZXQgb2Zmc2V0ID0gdGhpcy5nZXRFbGVtZW50c09mZnNldCgpO1xyXG5cclxuXHRcdGxldCBzY3JvbGxTdGFydFBvc2l0aW9uID0gdGhpcy5nZXRTY3JvbGxTdGFydFBvc2l0aW9uKCk7XHJcblx0XHRpZiAoc2Nyb2xsU3RhcnRQb3NpdGlvbiA+IChkaW1lbnNpb25zLnNjcm9sbExlbmd0aCArIG9mZnNldCkgJiYgISh0aGlzLnBhcmVudFNjcm9sbCBpbnN0YW5jZW9mIFdpbmRvdykpIHtcclxuXHRcdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbiA9IGRpbWVuc2lvbnMuc2Nyb2xsTGVuZ3RoO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbiAtPSBvZmZzZXQ7XHJcblx0XHR9XHJcblx0XHRzY3JvbGxTdGFydFBvc2l0aW9uID0gTWF0aC5tYXgoMCwgc2Nyb2xsU3RhcnRQb3NpdGlvbik7XHJcblxyXG5cdFx0bGV0IHBhZ2VJbmZvID0gdGhpcy5jYWxjdWxhdGVQYWdlSW5mbyhzY3JvbGxTdGFydFBvc2l0aW9uLCBkaW1lbnNpb25zKTtcclxuXHRcdGxldCBuZXdQYWRkaW5nID0gdGhpcy5jYWxjdWxhdGVQYWRkaW5nKHBhZ2VJbmZvLnN0YXJ0SW5kZXhXaXRoQnVmZmVyLCBkaW1lbnNpb25zKTtcclxuXHRcdGxldCBuZXdTY3JvbGxMZW5ndGggPSBkaW1lbnNpb25zLnNjcm9sbExlbmd0aDtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzdGFydEluZGV4OiBwYWdlSW5mby5zdGFydEluZGV4LFxyXG5cdFx0XHRlbmRJbmRleDogcGFnZUluZm8uZW5kSW5kZXgsXHJcblx0XHRcdHN0YXJ0SW5kZXhXaXRoQnVmZmVyOiBwYWdlSW5mby5zdGFydEluZGV4V2l0aEJ1ZmZlcixcclxuXHRcdFx0ZW5kSW5kZXhXaXRoQnVmZmVyOiBwYWdlSW5mby5lbmRJbmRleFdpdGhCdWZmZXIsXHJcblx0XHRcdHBhZGRpbmc6IE1hdGgucm91bmQobmV3UGFkZGluZyksXHJcblx0XHRcdHNjcm9sbExlbmd0aDogTWF0aC5yb3VuZChuZXdTY3JvbGxMZW5ndGgpLFxyXG5cdFx0XHRzY3JvbGxTdGFydFBvc2l0aW9uOiBwYWdlSW5mby5zY3JvbGxTdGFydFBvc2l0aW9uLFxyXG5cdFx0XHRzY3JvbGxFbmRQb3NpdGlvbjogcGFnZUluZm8uc2Nyb2xsRW5kUG9zaXRpb24sXHJcblx0XHRcdG1heFNjcm9sbFBvc2l0aW9uOiBwYWdlSW5mby5tYXhTY3JvbGxQb3NpdGlvblxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcblx0ZXhwb3J0czogW1ZpcnR1YWxTY3JvbGxlckNvbXBvbmVudF0sXHJcblx0ZGVjbGFyYXRpb25zOiBbVmlydHVhbFNjcm9sbGVyQ29tcG9uZW50XSxcclxuXHRpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuXHRwcm92aWRlcnM6IFtcclxuXHRcdHtcclxuXHRcdFx0cHJvdmlkZTogJ3ZpcnR1YWwtc2Nyb2xsZXItZGVmYXVsdC1vcHRpb25zJyxcclxuXHRcdFx0dXNlRmFjdG9yeTogVklSVFVBTF9TQ1JPTExFUl9ERUZBVUxUX09QVElPTlNfRkFDVE9SWVxyXG5cdFx0fVxyXG5cdF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxlck1vZHVsZSB7IH0iXX0=