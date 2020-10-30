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
var VirtualScrollerComponent = /** @class */ (function () {
    function VirtualScrollerComponent(element, renderer, zone, changeDetectorRef, platformId, options) {
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
        this.compareItems = function (item1, item2) { return item1 === item2; };
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
    Object.defineProperty(VirtualScrollerComponent.prototype, "viewPortInfo", {
        get: function () {
            var pageInfo = this.previousViewPort || {};
            return {
                startIndex: pageInfo.startIndex || 0,
                endIndex: pageInfo.endIndex || 0,
                scrollStartPosition: pageInfo.scrollStartPosition || 0,
                scrollEndPosition: pageInfo.scrollEndPosition || 0,
                maxScrollPosition: pageInfo.maxScrollPosition || 0,
                startIndexWithBuffer: pageInfo.startIndexWithBuffer || 0,
                endIndexWithBuffer: pageInfo.endIndexWithBuffer || 0
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollerComponent.prototype, "enableUnequalChildrenSizes", {
        get: function () {
            return this._enableUnequalChildrenSizes;
        },
        set: function (value) {
            if (this._enableUnequalChildrenSizes === value) {
                return;
            }
            this._enableUnequalChildrenSizes = value;
            this.minMeasuredChildWidth = undefined;
            this.minMeasuredChildHeight = undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollerComponent.prototype, "bufferAmount", {
        get: function () {
            if (typeof (this._bufferAmount) === 'number' && this._bufferAmount >= 0) {
                return this._bufferAmount;
            }
            else {
                return this.enableUnequalChildrenSizes ? 5 : 0;
            }
        },
        set: function (value) {
            this._bufferAmount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollerComponent.prototype, "scrollThrottlingTime", {
        get: function () {
            return this._scrollThrottlingTime;
        },
        set: function (value) {
            this._scrollThrottlingTime = value;
            this.updateOnScrollFunction();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollerComponent.prototype, "scrollDebounceTime", {
        get: function () {
            return this._scrollDebounceTime;
        },
        set: function (value) {
            this._scrollDebounceTime = value;
            this.updateOnScrollFunction();
        },
        enumerable: true,
        configurable: true
    });
    VirtualScrollerComponent.prototype.updateOnScrollFunction = function () {
        var _this_1 = this;
        if (this.scrollDebounceTime) {
            this.onScroll = this.debounce(function () {
                _this_1.refresh_internal(false);
            }, this.scrollDebounceTime);
        }
        else if (this.scrollThrottlingTime) {
            this.onScroll = this.throttleTrailing(function () {
                _this_1.refresh_internal(false);
            }, this.scrollThrottlingTime);
        }
        else {
            this.onScroll = function () {
                _this_1.refresh_internal(false);
            };
        }
    };
    Object.defineProperty(VirtualScrollerComponent.prototype, "checkResizeInterval", {
        get: function () {
            return this._checkResizeInterval;
        },
        set: function (value) {
            if (this._checkResizeInterval === value) {
                return;
            }
            this._checkResizeInterval = value;
            this.addScrollEventHandlers();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollerComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            if (value === this._items) {
                return;
            }
            this._items = value || [];
            this.refresh_internal(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollerComponent.prototype, "horizontal", {
        get: function () {
            return this._horizontal;
        },
        set: function (value) {
            this._horizontal = value;
            this.updateDirection();
        },
        enumerable: true,
        configurable: true
    });
    VirtualScrollerComponent.prototype.revertParentOverscroll = function () {
        var scrollElement = this.getScrollElement();
        if (scrollElement && this.oldParentScrollOverflow) {
            scrollElement.style['overflow-y'] = this.oldParentScrollOverflow.y;
            scrollElement.style['overflow-x'] = this.oldParentScrollOverflow.x;
        }
        this.oldParentScrollOverflow = undefined;
    };
    Object.defineProperty(VirtualScrollerComponent.prototype, "parentScroll", {
        get: function () {
            return this._parentScroll;
        },
        set: function (value) {
            if (this._parentScroll === value) {
                return;
            }
            this.revertParentOverscroll();
            this._parentScroll = value;
            this.addScrollEventHandlers();
            var scrollElement = this.getScrollElement();
            if (this.modifyOverflowStyleOfParentScroll && scrollElement !== this.element.nativeElement) {
                this.oldParentScrollOverflow = { x: scrollElement.style['overflow-x'], y: scrollElement.style['overflow-y'] };
                scrollElement.style['overflow-y'] = this.horizontal ? 'visible' : 'auto';
                scrollElement.style['overflow-x'] = this.horizontal ? 'auto' : 'visible';
            }
        },
        enumerable: true,
        configurable: true
    });
    VirtualScrollerComponent.prototype.ngOnInit = function () {
        this.addScrollEventHandlers();
    };
    VirtualScrollerComponent.prototype.ngOnDestroy = function () {
        this.removeScrollEventHandlers();
        this.revertParentOverscroll();
    };
    VirtualScrollerComponent.prototype.ngOnChanges = function (changes) {
        var indexLengthChanged = this.cachedItemsLength !== this.items.length;
        this.cachedItemsLength = this.items.length;
        var firstRun = !changes.items || !changes.items.previousValue || changes.items.previousValue.length === 0;
        this.refresh_internal(indexLengthChanged || firstRun);
    };
    VirtualScrollerComponent.prototype.ngDoCheck = function () {
        if (this.cachedItemsLength !== this.items.length) {
            this.cachedItemsLength = this.items.length;
            this.refresh_internal(true);
            return;
        }
        if (this.previousViewPort && this.viewPortItems && this.viewPortItems.length > 0) {
            var itemsArrayChanged = false;
            for (var i = 0; i < this.viewPortItems.length; ++i) {
                if (!this.compareItems(this.items[this.previousViewPort.startIndexWithBuffer + i], this.viewPortItems[i])) {
                    itemsArrayChanged = true;
                    break;
                }
            }
            if (itemsArrayChanged) {
                this.refresh_internal(true);
            }
        }
    };
    VirtualScrollerComponent.prototype.refresh = function () {
        this.refresh_internal(true);
    };
    VirtualScrollerComponent.prototype.invalidateAllCachedMeasurements = function () {
        this.wrapGroupDimensions = {
            maxChildSizePerWrapGroup: [],
            numberOfKnownWrapGroupChildSizes: 0,
            sumOfKnownWrapGroupChildWidths: 0,
            sumOfKnownWrapGroupChildHeights: 0
        };
        this.minMeasuredChildWidth = undefined;
        this.minMeasuredChildHeight = undefined;
        this.refresh_internal(false);
    };
    VirtualScrollerComponent.prototype.invalidateCachedMeasurementForItem = function (item) {
        if (this.enableUnequalChildrenSizes) {
            var index = this.items && this.items.indexOf(item);
            if (index >= 0) {
                this.invalidateCachedMeasurementAtIndex(index);
            }
        }
        else {
            this.minMeasuredChildWidth = undefined;
            this.minMeasuredChildHeight = undefined;
        }
        this.refresh_internal(false);
    };
    VirtualScrollerComponent.prototype.invalidateCachedMeasurementAtIndex = function (index) {
        if (this.enableUnequalChildrenSizes) {
            var cachedMeasurement = this.wrapGroupDimensions.maxChildSizePerWrapGroup[index];
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
    };
    VirtualScrollerComponent.prototype.scrollInto = function (item, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback) {
        if (alignToBeginning === void 0) { alignToBeginning = true; }
        if (additionalOffset === void 0) { additionalOffset = 0; }
        if (animationMilliseconds === void 0) { animationMilliseconds = undefined; }
        if (animationCompletedCallback === void 0) { animationCompletedCallback = undefined; }
        var index = this.items.indexOf(item);
        if (index === -1) {
            return;
        }
        this.scrollToIndex(index, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback);
    };
    VirtualScrollerComponent.prototype.scrollToIndex = function (index, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback) {
        var _this_1 = this;
        if (alignToBeginning === void 0) { alignToBeginning = true; }
        if (additionalOffset === void 0) { additionalOffset = 0; }
        if (animationMilliseconds === void 0) { animationMilliseconds = undefined; }
        if (animationCompletedCallback === void 0) { animationCompletedCallback = undefined; }
        var maxRetries = 5;
        var retryIfNeeded = function () {
            --maxRetries;
            if (maxRetries <= 0) {
                if (animationCompletedCallback) {
                    animationCompletedCallback();
                }
                return;
            }
            var dimensions = _this_1.calculateDimensions();
            var desiredStartIndex = Math.min(Math.max(index, 0), dimensions.itemCount - 1);
            if (_this_1.previousViewPort.startIndex === desiredStartIndex) {
                if (animationCompletedCallback) {
                    animationCompletedCallback();
                }
                return;
            }
            _this_1.scrollToIndex_internal(index, alignToBeginning, additionalOffset, 0, retryIfNeeded);
        };
        this.scrollToIndex_internal(index, alignToBeginning, additionalOffset, animationMilliseconds, retryIfNeeded);
    };
    VirtualScrollerComponent.prototype.scrollToIndex_internal = function (index, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback) {
        if (alignToBeginning === void 0) { alignToBeginning = true; }
        if (additionalOffset === void 0) { additionalOffset = 0; }
        if (animationMilliseconds === void 0) { animationMilliseconds = undefined; }
        if (animationCompletedCallback === void 0) { animationCompletedCallback = undefined; }
        animationMilliseconds = animationMilliseconds === undefined ? this.scrollAnimationTime : animationMilliseconds;
        var dimensions = this.calculateDimensions();
        var scroll = this.calculatePadding(index, dimensions) + additionalOffset;
        if (!alignToBeginning) {
            scroll -= dimensions.wrapGroupsPerPage * dimensions[this._childScrollDim];
        }
        this.scrollToPosition(scroll, animationMilliseconds, animationCompletedCallback);
    };
    VirtualScrollerComponent.prototype.scrollToPosition = function (scrollPosition, animationMilliseconds, animationCompletedCallback) {
        var _this_1 = this;
        if (animationMilliseconds === void 0) { animationMilliseconds = undefined; }
        if (animationCompletedCallback === void 0) { animationCompletedCallback = undefined; }
        scrollPosition += this.getElementsOffset();
        animationMilliseconds = animationMilliseconds === undefined ? this.scrollAnimationTime : animationMilliseconds;
        var scrollElement = this.getScrollElement();
        var animationRequest;
        if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = undefined;
        }
        if (!animationMilliseconds) {
            this.renderer.setProperty(scrollElement, this._scrollType, scrollPosition);
            this.refresh_internal(false, animationCompletedCallback);
            return;
        }
        var tweenConfigObj = { scrollPosition: scrollElement[this._scrollType] };
        var newTween = new tween.Tween(tweenConfigObj)
            .to({ scrollPosition: scrollPosition }, animationMilliseconds)
            .easing(tween.Easing.Quadratic.Out)
            .onUpdate(function (data) {
            if (isNaN(data.scrollPosition)) {
                return;
            }
            _this_1.renderer.setProperty(scrollElement, _this_1._scrollType, data.scrollPosition);
            _this_1.refresh_internal(false);
        })
            .onStop(function () {
            cancelAnimationFrame(animationRequest);
        })
            .start();
        var animate = function (time) {
            if (!newTween["isPlaying"]()) {
                return;
            }
            newTween.update(time);
            if (tweenConfigObj.scrollPosition === scrollPosition) {
                _this_1.refresh_internal(false, animationCompletedCallback);
                return;
            }
            _this_1.zone.runOutsideAngular(function () {
                animationRequest = requestAnimationFrame(animate);
            });
        };
        animate();
        this.currentTween = newTween;
    };
    VirtualScrollerComponent.prototype.getElementSize = function (element) {
        var result = element.getBoundingClientRect();
        var styles = getComputedStyle(element);
        var marginTop = parseInt(styles['margin-top'], 10) || 0;
        var marginBottom = parseInt(styles['margin-bottom'], 10) || 0;
        var marginLeft = parseInt(styles['margin-left'], 10) || 0;
        var marginRight = parseInt(styles['margin-right'], 10) || 0;
        return {
            top: result.top + marginTop,
            bottom: result.bottom + marginBottom,
            left: result.left + marginLeft,
            right: result.right + marginRight,
            width: result.width + marginLeft + marginRight,
            height: result.height + marginTop + marginBottom
        };
    };
    VirtualScrollerComponent.prototype.checkScrollElementResized = function () {
        var boundingRect = this.getElementSize(this.getScrollElement());
        var sizeChanged;
        if (!this.previousScrollBoundingRect) {
            sizeChanged = true;
        }
        else {
            var widthChange = Math.abs(boundingRect.width - this.previousScrollBoundingRect.width);
            var heightChange = Math.abs(boundingRect.height - this.previousScrollBoundingRect.height);
            sizeChanged = widthChange > this.resizeBypassRefreshThreshold || heightChange > this.resizeBypassRefreshThreshold;
        }
        if (sizeChanged) {
            this.previousScrollBoundingRect = boundingRect;
            if (boundingRect.width > 0 && boundingRect.height > 0) {
                this.refresh_internal(false);
            }
        }
    };
    VirtualScrollerComponent.prototype.updateDirection = function () {
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
    };
    VirtualScrollerComponent.prototype.debounce = function (func, wait) {
        var throttled = this.throttleTrailing(func, wait);
        var result = function () {
            throttled['cancel']();
            throttled.apply(this, arguments);
        };
        result['cancel'] = function () {
            throttled['cancel']();
        };
        return result;
    };
    VirtualScrollerComponent.prototype.throttleTrailing = function (func, wait) {
        var timeout = undefined;
        var _arguments = arguments;
        var result = function () {
            var _this = this;
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
    };
    VirtualScrollerComponent.prototype.refresh_internal = function (itemsArrayModified, refreshCompletedCallback, maxRunTimes) {
        //note: maxRunTimes is to force it to keep recalculating if the previous iteration caused a re-render (different sliced items in viewport or scrollPosition changed).
        //The default of 2x max will probably be accurate enough without causing too large a performance bottleneck
        //The code would typically quit out on the 2nd iteration anyways. The main time it'd think more than 2 runs would be necessary would be for vastly different sized child items or if this is the 1st time the items array was initialized.
        //Without maxRunTimes, If the user is actively scrolling this code would become an infinite loop until they stopped scrolling. This would be okay, except each scroll event would start an additional infinte loop. We want to short-circuit it to prevent this.
        var _this_1 = this;
        if (refreshCompletedCallback === void 0) { refreshCompletedCallback = undefined; }
        if (maxRunTimes === void 0) { maxRunTimes = 2; }
        if (itemsArrayModified && this.previousViewPort && this.previousViewPort.scrollStartPosition > 0) {
            //if items were prepended, scroll forward to keep same items visible
            var oldViewPort_1 = this.previousViewPort;
            var oldViewPortItems_1 = this.viewPortItems;
            var oldRefreshCompletedCallback_1 = refreshCompletedCallback;
            refreshCompletedCallback = function () {
                var scrollLengthDelta = _this_1.previousViewPort.scrollLength - oldViewPort_1.scrollLength;
                if (scrollLengthDelta > 0 && _this_1.viewPortItems) {
                    var oldStartItem_1 = oldViewPortItems_1[0];
                    var oldStartItemIndex = _this_1.items.findIndex(function (x) { return _this_1.compareItems(oldStartItem_1, x); });
                    if (oldStartItemIndex > _this_1.previousViewPort.startIndexWithBuffer) {
                        var itemOrderChanged = false;
                        for (var i = 1; i < _this_1.viewPortItems.length; ++i) {
                            if (!_this_1.compareItems(_this_1.items[oldStartItemIndex + i], oldViewPortItems_1[i])) {
                                itemOrderChanged = true;
                                break;
                            }
                        }
                        if (!itemOrderChanged) {
                            _this_1.scrollToPosition(_this_1.previousViewPort.scrollStartPosition + scrollLengthDelta, 0, oldRefreshCompletedCallback_1);
                            return;
                        }
                    }
                }
                if (oldRefreshCompletedCallback_1) {
                    oldRefreshCompletedCallback_1();
                }
            };
        }
        this.zone.runOutsideAngular(function () {
            requestAnimationFrame(function () {
                if (itemsArrayModified) {
                    _this_1.resetWrapGroupDimensions();
                }
                var viewport = _this_1.calculateViewport();
                var startChanged = itemsArrayModified || viewport.startIndex !== _this_1.previousViewPort.startIndex;
                var endChanged = itemsArrayModified || viewport.endIndex !== _this_1.previousViewPort.endIndex;
                var scrollLengthChanged = viewport.scrollLength !== _this_1.previousViewPort.scrollLength;
                var paddingChanged = viewport.padding !== _this_1.previousViewPort.padding;
                var scrollPositionChanged = viewport.scrollStartPosition !== _this_1.previousViewPort.scrollStartPosition || viewport.scrollEndPosition !== _this_1.previousViewPort.scrollEndPosition || viewport.maxScrollPosition !== _this_1.previousViewPort.maxScrollPosition;
                _this_1.previousViewPort = viewport;
                if (scrollLengthChanged) {
                    _this_1.renderer.setStyle(_this_1.invisiblePaddingElementRef.nativeElement, _this_1._invisiblePaddingProperty, viewport.scrollLength + "px");
                }
                if (paddingChanged) {
                    if (_this_1.useMarginInsteadOfTranslate) {
                        _this_1.renderer.setStyle(_this_1.contentElementRef.nativeElement, _this_1._marginDir, viewport.padding + "px");
                    }
                    else {
                        _this_1.renderer.setStyle(_this_1.contentElementRef.nativeElement, 'transform', _this_1._translateDir + "(" + viewport.padding + "px)");
                        _this_1.renderer.setStyle(_this_1.contentElementRef.nativeElement, 'webkitTransform', _this_1._translateDir + "(" + viewport.padding + "px)");
                    }
                }
                if (_this_1.headerElementRef) {
                    var scrollPosition = _this_1.getScrollElement()[_this_1._scrollType];
                    var containerOffset = _this_1.getElementsOffset();
                    var offset = Math.max(scrollPosition - viewport.padding - containerOffset + _this_1.headerElementRef.nativeElement.clientHeight, 0);
                    _this_1.renderer.setStyle(_this_1.headerElementRef.nativeElement, 'transform', _this_1._translateDir + "(" + offset + "px)");
                    _this_1.renderer.setStyle(_this_1.headerElementRef.nativeElement, 'webkitTransform', _this_1._translateDir + "(" + offset + "px)");
                }
                var changeEventArg = (startChanged || endChanged) ? {
                    startIndex: viewport.startIndex,
                    endIndex: viewport.endIndex,
                    scrollStartPosition: viewport.scrollStartPosition,
                    scrollEndPosition: viewport.scrollEndPosition,
                    startIndexWithBuffer: viewport.startIndexWithBuffer,
                    endIndexWithBuffer: viewport.endIndexWithBuffer,
                    maxScrollPosition: viewport.maxScrollPosition
                } : undefined;
                if (startChanged || endChanged || scrollPositionChanged) {
                    var handleChanged = function () {
                        // update the scroll list to trigger re-render of components in viewport
                        _this_1.viewPortItems = viewport.startIndexWithBuffer >= 0 && viewport.endIndexWithBuffer >= 0 ? _this_1.items.slice(viewport.startIndexWithBuffer, viewport.endIndexWithBuffer + 1) : [];
                        _this_1.vsUpdate.emit(_this_1.viewPortItems);
                        if (startChanged) {
                            _this_1.vsStart.emit(changeEventArg);
                        }
                        if (endChanged) {
                            _this_1.vsEnd.emit(changeEventArg);
                        }
                        if (startChanged || endChanged) {
                            _this_1.changeDetectorRef.markForCheck();
                            _this_1.vsChange.emit(changeEventArg);
                        }
                        if (maxRunTimes > 0) {
                            _this_1.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
                            return;
                        }
                        if (refreshCompletedCallback) {
                            refreshCompletedCallback();
                        }
                    };
                    if (_this_1.executeRefreshOutsideAngularZone) {
                        handleChanged();
                    }
                    else {
                        _this_1.zone.run(handleChanged);
                    }
                }
                else {
                    if (maxRunTimes > 0 && (scrollLengthChanged || paddingChanged)) {
                        _this_1.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
                        return;
                    }
                    if (refreshCompletedCallback) {
                        refreshCompletedCallback();
                    }
                }
            });
        });
    };
    VirtualScrollerComponent.prototype.getScrollElement = function () {
        return this.parentScroll instanceof Window ? document.scrollingElement || document.documentElement || document.body : this.parentScroll || this.element.nativeElement;
    };
    VirtualScrollerComponent.prototype.addScrollEventHandlers = function () {
        var _this_1 = this;
        if (this.isAngularUniversalSSR) {
            return;
        }
        var scrollElement = this.getScrollElement();
        this.removeScrollEventHandlers();
        this.zone.runOutsideAngular(function () {
            if (_this_1.parentScroll instanceof Window) {
                _this_1.disposeScrollHandler = _this_1.renderer.listen('window', 'scroll', _this_1.onScroll);
                _this_1.disposeResizeHandler = _this_1.renderer.listen('window', 'resize', _this_1.onScroll);
            }
            else {
                _this_1.disposeScrollHandler = _this_1.renderer.listen(scrollElement, 'scroll', _this_1.onScroll);
                if (_this_1._checkResizeInterval > 0) {
                    _this_1.checkScrollElementResizedTimer = setInterval(function () { _this_1.checkScrollElementResized(); }, _this_1._checkResizeInterval);
                }
            }
        });
    };
    VirtualScrollerComponent.prototype.removeScrollEventHandlers = function () {
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
    };
    VirtualScrollerComponent.prototype.getElementsOffset = function () {
        if (this.isAngularUniversalSSR) {
            return 0;
        }
        var offset = 0;
        if (this.containerElementRef && this.containerElementRef.nativeElement) {
            offset += this.containerElementRef.nativeElement[this._offsetType];
        }
        if (this.parentScroll) {
            var scrollElement = this.getScrollElement();
            var elementClientRect = this.getElementSize(this.element.nativeElement);
            var scrollClientRect = this.getElementSize(scrollElement);
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
    };
    VirtualScrollerComponent.prototype.countItemsPerWrapGroup = function () {
        if (this.isAngularUniversalSSR) {
            return Math.round(this.horizontal ? this.ssrViewportHeight / this.ssrChildHeight : this.ssrViewportWidth / this.ssrChildWidth);
        }
        var propertyName = this.horizontal ? 'offsetLeft' : 'offsetTop';
        var children = ((this.containerElementRef && this.containerElementRef.nativeElement) || this.contentElementRef.nativeElement).children;
        var childrenLength = children ? children.length : 0;
        if (childrenLength === 0) {
            return 1;
        }
        var firstOffset = children[0][propertyName];
        var result = 1;
        while (result < childrenLength && firstOffset === children[result][propertyName]) {
            ++result;
        }
        return result;
    };
    VirtualScrollerComponent.prototype.getScrollStartPosition = function () {
        var windowScrollValue = undefined;
        if (this.parentScroll instanceof Window) {
            windowScrollValue = window[this._pageOffsetType];
        }
        return windowScrollValue || this.getScrollElement()[this._scrollType] || 0;
    };
    VirtualScrollerComponent.prototype.resetWrapGroupDimensions = function () {
        var oldWrapGroupDimensions = this.wrapGroupDimensions;
        this.invalidateAllCachedMeasurements();
        if (!this.enableUnequalChildrenSizes || !oldWrapGroupDimensions || oldWrapGroupDimensions.numberOfKnownWrapGroupChildSizes === 0) {
            return;
        }
        var itemsPerWrapGroup = this.countItemsPerWrapGroup();
        for (var wrapGroupIndex = 0; wrapGroupIndex < oldWrapGroupDimensions.maxChildSizePerWrapGroup.length; ++wrapGroupIndex) {
            var oldWrapGroupDimension = oldWrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
            if (!oldWrapGroupDimension || !oldWrapGroupDimension.items || !oldWrapGroupDimension.items.length) {
                continue;
            }
            if (oldWrapGroupDimension.items.length !== itemsPerWrapGroup) {
                return;
            }
            var itemsChanged = false;
            var arrayStartIndex = itemsPerWrapGroup * wrapGroupIndex;
            for (var i = 0; i < itemsPerWrapGroup; ++i) {
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
    };
    VirtualScrollerComponent.prototype.calculateDimensions = function () {
        var scrollElement = this.getScrollElement();
        var maxCalculatedScrollBarSize = 25; // Note: Formula to auto-calculate doesn't work for ParentScroll, so we default to this if not set by consuming application
        this.calculatedScrollbarHeight = Math.max(Math.min(scrollElement.offsetHeight - scrollElement.clientHeight, maxCalculatedScrollBarSize), this.calculatedScrollbarHeight);
        this.calculatedScrollbarWidth = Math.max(Math.min(scrollElement.offsetWidth - scrollElement.clientWidth, maxCalculatedScrollBarSize), this.calculatedScrollbarWidth);
        var viewportWidth = scrollElement.offsetWidth - (this.scrollbarWidth || this.calculatedScrollbarWidth || (this.horizontal ? 0 : maxCalculatedScrollBarSize));
        var viewportHeight = scrollElement.offsetHeight - (this.scrollbarHeight || this.calculatedScrollbarHeight || (this.horizontal ? maxCalculatedScrollBarSize : 0));
        var content = (this.containerElementRef && this.containerElementRef.nativeElement) || this.contentElementRef.nativeElement;
        var itemsPerWrapGroup = this.countItemsPerWrapGroup();
        var wrapGroupsPerPage;
        var defaultChildWidth;
        var defaultChildHeight;
        if (this.isAngularUniversalSSR) {
            viewportWidth = this.ssrViewportWidth;
            viewportHeight = this.ssrViewportHeight;
            defaultChildWidth = this.ssrChildWidth;
            defaultChildHeight = this.ssrChildHeight;
            var itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
            var itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
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
                var child = content.children[0];
                var clientRect = this.getElementSize(child);
                this.minMeasuredChildWidth = Math.min(this.minMeasuredChildWidth, clientRect.width);
                this.minMeasuredChildHeight = Math.min(this.minMeasuredChildHeight, clientRect.height);
            }
            defaultChildWidth = this.childWidth || this.minMeasuredChildWidth || viewportWidth;
            defaultChildHeight = this.childHeight || this.minMeasuredChildHeight || viewportHeight;
            var itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
            var itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
            wrapGroupsPerPage = this.horizontal ? itemsPerRow : itemsPerCol;
        }
        else {
            var scrollOffset = scrollElement[this._scrollType] - (this.previousViewPort ? this.previousViewPort.padding : 0);
            var arrayStartIndex = this.previousViewPort.startIndexWithBuffer || 0;
            var wrapGroupIndex = Math.ceil(arrayStartIndex / itemsPerWrapGroup);
            var maxWidthForWrapGroup = 0;
            var maxHeightForWrapGroup = 0;
            var sumOfVisibleMaxWidths = 0;
            var sumOfVisibleMaxHeights = 0;
            wrapGroupsPerPage = 0;
            for (var i = 0; i < content.children.length; ++i) {
                ++arrayStartIndex;
                var child = content.children[i];
                var clientRect = this.getElementSize(child);
                maxWidthForWrapGroup = Math.max(maxWidthForWrapGroup, clientRect.width);
                maxHeightForWrapGroup = Math.max(maxHeightForWrapGroup, clientRect.height);
                if (arrayStartIndex % itemsPerWrapGroup === 0) {
                    var oldValue = this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
                    if (oldValue) {
                        --this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                        this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= oldValue.childWidth || 0;
                        this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= oldValue.childHeight || 0;
                    }
                    ++this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                    var items = this.items.slice(arrayStartIndex - itemsPerWrapGroup, arrayStartIndex);
                    this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = {
                        childWidth: maxWidthForWrapGroup,
                        childHeight: maxHeightForWrapGroup,
                        items: items
                    };
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += maxWidthForWrapGroup;
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += maxHeightForWrapGroup;
                    if (this.horizontal) {
                        var maxVisibleWidthForWrapGroup = Math.min(maxWidthForWrapGroup, Math.max(viewportWidth - sumOfVisibleMaxWidths, 0));
                        if (scrollOffset > 0) {
                            var scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleWidthForWrapGroup);
                            maxVisibleWidthForWrapGroup -= scrollOffsetToRemove;
                            scrollOffset -= scrollOffsetToRemove;
                        }
                        sumOfVisibleMaxWidths += maxVisibleWidthForWrapGroup;
                        if (maxVisibleWidthForWrapGroup > 0 && viewportWidth >= sumOfVisibleMaxWidths) {
                            ++wrapGroupsPerPage;
                        }
                    }
                    else {
                        var maxVisibleHeightForWrapGroup = Math.min(maxHeightForWrapGroup, Math.max(viewportHeight - sumOfVisibleMaxHeights, 0));
                        if (scrollOffset > 0) {
                            var scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleHeightForWrapGroup);
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
            var averageChildWidth = this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
            var averageChildHeight = this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
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
        var itemCount = this.items.length;
        var itemsPerPage = itemsPerWrapGroup * wrapGroupsPerPage;
        var pageCount_fractional = itemCount / itemsPerPage;
        var numberOfWrapGroups = Math.ceil(itemCount / itemsPerWrapGroup);
        var scrollLength = 0;
        var defaultScrollLengthPerWrapGroup = this.horizontal ? defaultChildWidth : defaultChildHeight;
        if (this.enableUnequalChildrenSizes) {
            var numUnknownChildSizes = 0;
            for (var i = 0; i < numberOfWrapGroups; ++i) {
                var childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
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
        var viewportLength = this.horizontal ? viewportWidth : viewportHeight;
        var maxScrollPosition = Math.max(scrollLength - viewportLength, 0);
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
    };
    VirtualScrollerComponent.prototype.calculatePadding = function (arrayStartIndexWithBuffer, dimensions) {
        if (dimensions.itemCount === 0) {
            return 0;
        }
        var defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
        var startingWrapGroupIndex = Math.floor(arrayStartIndexWithBuffer / dimensions.itemsPerWrapGroup) || 0;
        if (!this.enableUnequalChildrenSizes) {
            return defaultScrollLengthPerWrapGroup * startingWrapGroupIndex;
        }
        var numUnknownChildSizes = 0;
        var result = 0;
        for (var i = 0; i < startingWrapGroupIndex; ++i) {
            var childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
            if (childSize) {
                result += childSize;
            }
            else {
                ++numUnknownChildSizes;
            }
        }
        result += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup);
        return result;
    };
    VirtualScrollerComponent.prototype.calculatePageInfo = function (scrollPosition, dimensions) {
        var scrollPercentage = 0;
        if (this.enableUnequalChildrenSizes) {
            var numberOfWrapGroups = Math.ceil(dimensions.itemCount / dimensions.itemsPerWrapGroup);
            var totalScrolledLength = 0;
            var defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
            for (var i = 0; i < numberOfWrapGroups; ++i) {
                var childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
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
        var startingArrayIndex_fractional = Math.min(Math.max(scrollPercentage * dimensions.pageCount_fractional, 0), dimensions.pageCount_fractional) * dimensions.itemsPerPage;
        var maxStart = dimensions.itemCount - dimensions.itemsPerPage - 1;
        var arrayStartIndex = Math.min(Math.floor(startingArrayIndex_fractional), maxStart);
        arrayStartIndex -= arrayStartIndex % dimensions.itemsPerWrapGroup; // round down to start of wrapGroup
        if (this.stripedTable) {
            var bufferBoundary = 2 * dimensions.itemsPerWrapGroup;
            if (arrayStartIndex % bufferBoundary !== 0) {
                arrayStartIndex = Math.max(arrayStartIndex - arrayStartIndex % bufferBoundary, 0);
            }
        }
        var arrayEndIndex = Math.ceil(startingArrayIndex_fractional) + dimensions.itemsPerPage - 1;
        var endIndexWithinWrapGroup = (arrayEndIndex + 1) % dimensions.itemsPerWrapGroup;
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
        var bufferSize = this.bufferAmount * dimensions.itemsPerWrapGroup;
        var startIndexWithBuffer = Math.min(Math.max(arrayStartIndex - bufferSize, 0), dimensions.itemCount - 1);
        var endIndexWithBuffer = Math.min(Math.max(arrayEndIndex + bufferSize, 0), dimensions.itemCount - 1);
        return {
            startIndex: arrayStartIndex,
            endIndex: arrayEndIndex,
            startIndexWithBuffer: startIndexWithBuffer,
            endIndexWithBuffer: endIndexWithBuffer,
            scrollStartPosition: scrollPosition,
            scrollEndPosition: scrollPosition + dimensions.viewportLength,
            maxScrollPosition: dimensions.maxScrollPosition
        };
    };
    VirtualScrollerComponent.prototype.calculateViewport = function () {
        var dimensions = this.calculateDimensions();
        var offset = this.getElementsOffset();
        var scrollStartPosition = this.getScrollStartPosition();
        if (scrollStartPosition > (dimensions.scrollLength + offset) && !(this.parentScroll instanceof Window)) {
            scrollStartPosition = dimensions.scrollLength;
        }
        else {
            scrollStartPosition -= offset;
        }
        scrollStartPosition = Math.max(0, scrollStartPosition);
        var pageInfo = this.calculatePageInfo(scrollStartPosition, dimensions);
        var newPadding = this.calculatePadding(pageInfo.startIndexWithBuffer, dimensions);
        var newScrollLength = dimensions.scrollLength;
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
    };
    VirtualScrollerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['virtual-scroller-default-options',] }] }
    ]; };
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
            template: "\n    <div class=\"total-padding\" #invisiblePadding></div>\n    <div class=\"scrollable-content\" #content>\n      <ng-content></ng-content>\n    </div>\n  ",
            host: {
                '[class.horizontal]': "horizontal",
                '[class.vertical]': "!horizontal",
                '[class.selfScroll]': "!parentScroll"
            },
            styles: ["\n    :host {\n      position: relative;\n\t  display: block;\n      -webkit-overflow-scrolling: touch;\n    }\n\t\n\t:host.horizontal.selfScroll {\n      overflow-y: visible;\n      overflow-x: auto;\n\t}\n\t:host.vertical.selfScroll {\n      overflow-y: auto;\n      overflow-x: visible;\n\t}\n\t\n    .scrollable-content {\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      max-width: 100vw;\n      max-height: 100vh;\n      position: absolute;\n    }\n\n\t.scrollable-content ::ng-deep > * {\n\t\tbox-sizing: border-box;\n\t}\n\t\n\t:host.horizontal {\n\t\twhite-space: nowrap;\n\t}\n\t\n\t:host.horizontal .scrollable-content {\n\t\tdisplay: flex;\n\t}\n\t\n\t:host.horizontal .scrollable-content ::ng-deep > * {\n\t\tflex-shrink: 0;\n\t\tflex-grow: 0;\n\t\twhite-space: initial;\n\t}\n\t\n    .total-padding {\n      width: 1px;\n      opacity: 0;\n    }\n    \n    :host.horizontal .total-padding {\n      height: 100%;\n    }\n  "]
        }),
        __param(4, Inject(PLATFORM_ID)),
        __param(5, Optional()), __param(5, Inject('virtual-scroller-default-options'))
    ], VirtualScrollerComponent);
    return VirtualScrollerComponent;
}());
export { VirtualScrollerComponent };
var VirtualScrollerModule = /** @class */ (function () {
    function VirtualScrollerModule() {
    }
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
    return VirtualScrollerModule;
}());
export { VirtualScrollerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vc2VsZWN0L3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEtBQUssS0FBSyxNQUFNLG1CQUFtQixDQUFBO0FBYzFDLE1BQU0sVUFBVSx3Q0FBd0M7SUFDdkQsT0FBTztRQUNOLG9CQUFvQixFQUFFLENBQUM7UUFDdkIsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQixtQkFBbUIsRUFBRSxHQUFHO1FBQ3hCLG1CQUFtQixFQUFFLElBQUk7UUFDekIsNEJBQTRCLEVBQUUsQ0FBQztRQUMvQixpQ0FBaUMsRUFBRSxJQUFJO1FBQ3ZDLFlBQVksRUFBRSxLQUFLO0tBQ25CLENBQUM7QUFDSCxDQUFDO0FBZ0ZEO0lBb2FDLGtDQUErQixPQUFtQixFQUM5QixRQUFtQixFQUNuQixJQUFZLEVBQ3JCLGlCQUFvQyxFQUN6QixVQUFrQixFQUV2QyxPQUFzQztRQU5SLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixTQUFJLEdBQUosSUFBSSxDQUFR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QUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NFQUNyQjtJQUd2QztRQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzt5RUFDckI7SUEvTjlCLHdCQUF3QjtRQXBFcEMsU0FBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLG9DQUFvQztZQUM5QyxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSwrSkFLUjtZQUNGLElBQUksRUFBRTtnQkFDTCxvQkFBb0IsRUFBRSxZQUFZO2dCQUNsQyxrQkFBa0IsRUFBRSxhQUFhO2dCQUNqQyxvQkFBb0IsRUFBRSxlQUFlO2FBQ3JDO3FCQUNRLHU4QkFvRFA7U0FDRixDQUFDO1FBeWFDLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ25CLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO09BemE1Qyx3QkFBd0IsQ0Ftb0NwQztJQUFELCtCQUFDO0NBQUEsQUFub0NELElBbW9DQztTQW5vQ1ksd0JBQXdCO0FBZ3BDckM7SUFBQTtJQUFxQyxDQUFDO0lBQXpCLHFCQUFxQjtRQVhqQyxRQUFRLENBQUM7WUFDVCxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUNuQyxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUN4QyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsU0FBUyxFQUFFO2dCQUNWO29CQUNDLE9BQU8sRUFBRSxrQ0FBa0M7b0JBQzNDLFVBQVUsRUFBRSx3Q0FBd0M7aUJBQ3BEO2FBQ0Q7U0FDRCxDQUFDO09BQ1cscUJBQXFCLENBQUk7SUFBRCw0QkFBQztDQUFBLEFBQXRDLElBQXNDO1NBQXpCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0Q29tcG9uZW50LFxyXG5cdENvbnRlbnRDaGlsZCxcclxuXHRFbGVtZW50UmVmLFxyXG5cdEV2ZW50RW1pdHRlcixcclxuXHRJbmplY3QsXHJcblx0T3B0aW9uYWwsXHJcblx0SW5wdXQsXHJcblx0TmdNb2R1bGUsXHJcblx0Tmdab25lLFxyXG5cdE9uQ2hhbmdlcyxcclxuXHRPbkRlc3Ryb3ksXHJcblx0T25Jbml0LFxyXG5cdE91dHB1dCxcclxuXHRSZW5kZXJlcjIsXHJcblx0Vmlld0NoaWxkLFxyXG5cdENoYW5nZURldGVjdG9yUmVmLFxyXG5cdEluamVjdGlvblRva2VuXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgKiBhcyB0d2VlbiBmcm9tICdAdHdlZW5qcy90d2Vlbi5qcydcclxuaW1wb3J0IHsgVmlydHVhbFNjcm9sbGVyRGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2RlZmF1bHRvcHRpb25zJztcclxuaW1wb3J0IHsgSVBhZ2VJbmZvIH0gZnJvbSAnLi9pcGFnZWluZm8nO1xyXG5pbXBvcnQgeyBJVmlld3BvcnQgfSBmcm9tICcuL2l2aWV3cG9ydCc7XHJcblxyXG5pbXBvcnQgeyBXcmFwR3JvdXBEaW1lbnNpb25zIH0gZnJvbSAnLi93cmFwZ3JvdXBkaW1lbnNpb25zJztcclxuaW1wb3J0IHsgV3JhcEdyb3VwRGltZW5zaW9uIH0gZnJvbSAnLi93cmFwZ3JvdXBkaW1lbnNpb24nO1xyXG5cclxuaW1wb3J0IHsgSURpbWVuc2lvbnMgfSBmcm9tICcuL2lkaW1lbnNpb24nO1xyXG5cclxuIFxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVklSVFVBTF9TQ1JPTExFUl9ERUZBVUxUX09QVElPTlNfRkFDVE9SWSgpOiBWaXJ0dWFsU2Nyb2xsZXJEZWZhdWx0T3B0aW9ucyB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHNjcm9sbFRocm90dGxpbmdUaW1lOiAwLFxyXG5cdFx0c2Nyb2xsRGVib3VuY2VUaW1lOiAwLFxyXG5cdFx0c2Nyb2xsQW5pbWF0aW9uVGltZTogNzUwLFxyXG5cdFx0Y2hlY2tSZXNpemVJbnRlcnZhbDogMTAwMCxcclxuXHRcdHJlc2l6ZUJ5cGFzc1JlZnJlc2hUaHJlc2hvbGQ6IDUsXHJcblx0XHRtb2RpZnlPdmVyZmxvd1N0eWxlT2ZQYXJlbnRTY3JvbGw6IHRydWUsXHJcblx0XHRzdHJpcGVkVGFibGU6IGZhbHNlXHJcblx0fTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAndmlydHVhbC1zY3JvbGxlcixbdmlydHVhbFNjcm9sbGVyXScsXHJcblx0ZXhwb3J0QXM6ICd2aXJ0dWFsU2Nyb2xsZXInLFxyXG5cdHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwidG90YWwtcGFkZGluZ1wiICNpbnZpc2libGVQYWRkaW5nPjwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInNjcm9sbGFibGUtY29udGVudFwiICNjb250ZW50PlxyXG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG5cdGhvc3Q6IHtcclxuXHRcdCdbY2xhc3MuaG9yaXpvbnRhbF0nOiBcImhvcml6b250YWxcIixcclxuXHRcdCdbY2xhc3MudmVydGljYWxdJzogXCIhaG9yaXpvbnRhbFwiLFxyXG5cdFx0J1tjbGFzcy5zZWxmU2Nyb2xsXSc6IFwiIXBhcmVudFNjcm9sbFwiXHJcblx0fSxcclxuXHRzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHQgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XHJcbiAgICB9XHJcblx0XHJcblx0Omhvc3QuaG9yaXpvbnRhbC5zZWxmU2Nyb2xsIHtcclxuICAgICAgb3ZlcmZsb3cteTogdmlzaWJsZTtcclxuICAgICAgb3ZlcmZsb3cteDogYXV0bztcclxuXHR9XHJcblx0Omhvc3QudmVydGljYWwuc2VsZlNjcm9sbCB7XHJcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICAgIG92ZXJmbG93LXg6IHZpc2libGU7XHJcblx0fVxyXG5cdFxyXG4gICAgLnNjcm9sbGFibGUtY29udGVudCB7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgbWF4LXdpZHRoOiAxMDB2dztcclxuICAgICAgbWF4LWhlaWdodDogMTAwdmg7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIH1cclxuXHJcblx0LnNjcm9sbGFibGUtY29udGVudCA6Om5nLWRlZXAgPiAqIHtcclxuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0fVxyXG5cdFxyXG5cdDpob3N0Lmhvcml6b250YWwge1xyXG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuXHR9XHJcblx0XHJcblx0Omhvc3QuaG9yaXpvbnRhbCAuc2Nyb2xsYWJsZS1jb250ZW50IHtcclxuXHRcdGRpc3BsYXk6IGZsZXg7XHJcblx0fVxyXG5cdFxyXG5cdDpob3N0Lmhvcml6b250YWwgLnNjcm9sbGFibGUtY29udGVudCA6Om5nLWRlZXAgPiAqIHtcclxuXHRcdGZsZXgtc2hyaW5rOiAwO1xyXG5cdFx0ZmxleC1ncm93OiAwO1xyXG5cdFx0d2hpdGUtc3BhY2U6IGluaXRpYWw7XHJcblx0fVxyXG5cdFxyXG4gICAgLnRvdGFsLXBhZGRpbmcge1xyXG4gICAgICB3aWR0aDogMXB4O1xyXG4gICAgICBvcGFjaXR5OiAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICA6aG9zdC5ob3Jpem9udGFsIC50b3RhbC1wYWRkaW5nIHtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHRwdWJsaWMgdmlld1BvcnRJdGVtczogYW55W107XHJcblx0cHVibGljIHdpbmRvdyA9IHdpbmRvdztcclxuXHJcblx0cHVibGljIGdldCB2aWV3UG9ydEluZm8oKTogSVBhZ2VJbmZvIHtcclxuXHRcdGxldCBwYWdlSW5mbzogSVZpZXdwb3J0ID0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0IHx8IDxhbnk+e307XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzdGFydEluZGV4OiBwYWdlSW5mby5zdGFydEluZGV4IHx8IDAsXHJcblx0XHRcdGVuZEluZGV4OiBwYWdlSW5mby5lbmRJbmRleCB8fCAwLFxyXG5cdFx0XHRzY3JvbGxTdGFydFBvc2l0aW9uOiBwYWdlSW5mby5zY3JvbGxTdGFydFBvc2l0aW9uIHx8IDAsXHJcblx0XHRcdHNjcm9sbEVuZFBvc2l0aW9uOiBwYWdlSW5mby5zY3JvbGxFbmRQb3NpdGlvbiB8fCAwLFxyXG5cdFx0XHRtYXhTY3JvbGxQb3NpdGlvbjogcGFnZUluZm8ubWF4U2Nyb2xsUG9zaXRpb24gfHwgMCxcclxuXHRcdFx0c3RhcnRJbmRleFdpdGhCdWZmZXI6IHBhZ2VJbmZvLnN0YXJ0SW5kZXhXaXRoQnVmZmVyIHx8IDAsXHJcblx0XHRcdGVuZEluZGV4V2l0aEJ1ZmZlcjogcGFnZUluZm8uZW5kSW5kZXhXaXRoQnVmZmVyIHx8IDBcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBleGVjdXRlUmVmcmVzaE91dHNpZGVBbmd1bGFyWm9uZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwcm90ZWN0ZWQgX2VuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzOiBib29sZWFuID0gZmFsc2U7XHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgZ2V0IGVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2VuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0IGVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzKHZhbHVlOiBib29sZWFuKSB7XHJcblx0XHRpZiAodGhpcy5fZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMgPT09IHZhbHVlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcyA9IHZhbHVlO1xyXG5cdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgPSB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyB1c2VNYXJnaW5JbnN0ZWFkT2ZUcmFuc2xhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgbW9kaWZ5T3ZlcmZsb3dTdHlsZU9mUGFyZW50U2Nyb2xsOiBib29sZWFuO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBzdHJpcGVkVGFibGU6IGJvb2xlYW47XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIHNjcm9sbGJhcldpZHRoOiBudW1iZXI7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIHNjcm9sbGJhckhlaWdodDogbnVtYmVyO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBjaGlsZFdpZHRoOiBudW1iZXI7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGNoaWxkSGVpZ2h0OiBudW1iZXI7XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIHNzckNoaWxkV2lkdGg6IG51bWJlcjtcclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgc3NyQ2hpbGRIZWlnaHQ6IG51bWJlcjtcclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgc3NyVmlld3BvcnRXaWR0aDogbnVtYmVyID0gMTkyMDtcclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgc3NyVmlld3BvcnRIZWlnaHQ6IG51bWJlciA9IDEwODA7XHJcblxyXG5cdHByb3RlY3RlZCBfYnVmZmVyQW1vdW50OiBudW1iZXIgPSAwO1xyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGdldCBidWZmZXJBbW91bnQoKTogbnVtYmVyIHtcclxuXHRcdGlmICh0eXBlb2YgKHRoaXMuX2J1ZmZlckFtb3VudCkgPT09ICdudW1iZXInICYmIHRoaXMuX2J1ZmZlckFtb3VudCA+PSAwKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9idWZmZXJBbW91bnQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5lbmFibGVVbmVxdWFsQ2hpbGRyZW5TaXplcyA/IDUgOiAwO1x0XHJcblx0XHR9XHJcblx0fVxyXG5cdHB1YmxpYyBzZXQgYnVmZmVyQW1vdW50KHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuX2J1ZmZlckFtb3VudCA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgc2Nyb2xsQW5pbWF0aW9uVGltZTogbnVtYmVyO1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyByZXNpemVCeXBhc3NSZWZyZXNoVGhyZXNob2xkOiBudW1iZXI7XHJcblxyXG5cdHByb3RlY3RlZCBfc2Nyb2xsVGhyb3R0bGluZ1RpbWU6IG51bWJlcjtcclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsVGhyb3R0bGluZ1RpbWUoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxUaHJvdHRsaW5nVGltZTtcclxuXHR9XHJcblx0cHVibGljIHNldCBzY3JvbGxUaHJvdHRsaW5nVGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLl9zY3JvbGxUaHJvdHRsaW5nVGltZSA9IHZhbHVlO1xyXG5cdFx0dGhpcy51cGRhdGVPblNjcm9sbEZ1bmN0aW9uKCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgX3Njcm9sbERlYm91bmNlVGltZTogbnVtYmVyO1xyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGdldCBzY3JvbGxEZWJvdW5jZVRpbWUoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxEZWJvdW5jZVRpbWU7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXQgc2Nyb2xsRGVib3VuY2VUaW1lKHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuX3Njcm9sbERlYm91bmNlVGltZSA9IHZhbHVlO1xyXG5cdFx0dGhpcy51cGRhdGVPblNjcm9sbEZ1bmN0aW9uKCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgb25TY3JvbGw6ICgpID0+IHZvaWQ7XHJcblx0cHJvdGVjdGVkIHVwZGF0ZU9uU2Nyb2xsRnVuY3Rpb24oKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5zY3JvbGxEZWJvdW5jZVRpbWUpIHtcclxuXHRcdFx0dGhpcy5vblNjcm9sbCA9IDxhbnk+dGhpcy5kZWJvdW5jZSgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlKTtcclxuXHRcdFx0fSwgdGhpcy5zY3JvbGxEZWJvdW5jZVRpbWUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodGhpcy5zY3JvbGxUaHJvdHRsaW5nVGltZSkge1xyXG5cdFx0XHR0aGlzLm9uU2Nyb2xsID0gPGFueT50aGlzLnRocm90dGxlVHJhaWxpbmcoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSk7XHJcblx0XHRcdH0sIHRoaXMuc2Nyb2xsVGhyb3R0bGluZ1RpbWUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMub25TY3JvbGwgPSAoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjaGVja1Njcm9sbEVsZW1lbnRSZXNpemVkVGltZXI6IG51bWJlcjtcclxuXHRwcm90ZWN0ZWQgX2NoZWNrUmVzaXplSW50ZXJ2YWw6IG51bWJlcjtcclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBnZXQgY2hlY2tSZXNpemVJbnRlcnZhbCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoZWNrUmVzaXplSW50ZXJ2YWw7XHJcblx0fVxyXG5cdHB1YmxpYyBzZXQgY2hlY2tSZXNpemVJbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XHJcblx0XHRpZiAodGhpcy5fY2hlY2tSZXNpemVJbnRlcnZhbCA9PT0gdmFsdWUpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2NoZWNrUmVzaXplSW50ZXJ2YWwgPSB2YWx1ZTtcclxuXHRcdHRoaXMuYWRkU2Nyb2xsRXZlbnRIYW5kbGVycygpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIF9pdGVtczogYW55W10gPSBbXTtcclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBnZXQgaXRlbXMoKTogYW55W10ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2l0ZW1zO1xyXG5cdH1cclxuXHRwdWJsaWMgc2V0IGl0ZW1zKHZhbHVlOiBhbnlbXSkge1xyXG5cdFx0aWYgKHZhbHVlID09PSB0aGlzLl9pdGVtcykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faXRlbXMgPSB2YWx1ZSB8fCBbXTtcclxuXHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbCh0cnVlKTtcclxuXHR9XHJcblxyXG5cdEBJbnB1dCgpXHJcblx0cHVibGljIGNvbXBhcmVJdGVtczogKGl0ZW0xOiBhbnksIGl0ZW0yOiBhbnkpID0+IGJvb2xlYW4gPSAoaXRlbTE6IGFueSwgaXRlbTI6IGFueSkgPT4gaXRlbTEgPT09IGl0ZW0yO1xyXG5cclxuXHRwcm90ZWN0ZWQgX2hvcml6b250YWw6IGJvb2xlYW47XHJcblx0QElucHV0KClcclxuXHRwdWJsaWMgZ2V0IGhvcml6b250YWwoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faG9yaXpvbnRhbDtcclxuXHR9XHJcblx0cHVibGljIHNldCBob3Jpem9udGFsKHZhbHVlOiBib29sZWFuKSB7XHJcblx0XHR0aGlzLl9ob3Jpem9udGFsID0gdmFsdWU7XHJcblx0XHR0aGlzLnVwZGF0ZURpcmVjdGlvbigpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHJldmVydFBhcmVudE92ZXJzY3JvbGwoKTogdm9pZCB7XHJcblx0XHRjb25zdCBzY3JvbGxFbGVtZW50ID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KCk7XHJcblx0XHRpZiAoc2Nyb2xsRWxlbWVudCAmJiB0aGlzLm9sZFBhcmVudFNjcm9sbE92ZXJmbG93KSB7XHJcblx0XHRcdHNjcm9sbEVsZW1lbnQuc3R5bGVbJ292ZXJmbG93LXknXSA9IHRoaXMub2xkUGFyZW50U2Nyb2xsT3ZlcmZsb3cueTtcclxuXHRcdFx0c2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteCddID0gdGhpcy5vbGRQYXJlbnRTY3JvbGxPdmVyZmxvdy54O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMub2xkUGFyZW50U2Nyb2xsT3ZlcmZsb3cgPSB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgb2xkUGFyZW50U2Nyb2xsT3ZlcmZsb3c6IHsgeDogc3RyaW5nLCB5OiBzdHJpbmcgfTtcclxuXHRwcm90ZWN0ZWQgX3BhcmVudFNjcm9sbDogRWxlbWVudCB8IFdpbmRvdztcclxuXHRASW5wdXQoKVxyXG5cdHB1YmxpYyBnZXQgcGFyZW50U2Nyb2xsKCk6IEVsZW1lbnQgfCBXaW5kb3cge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudFNjcm9sbDtcclxuXHR9XHJcblx0cHVibGljIHNldCBwYXJlbnRTY3JvbGwodmFsdWU6IEVsZW1lbnQgfCBXaW5kb3cpIHtcclxuXHRcdGlmICh0aGlzLl9wYXJlbnRTY3JvbGwgPT09IHZhbHVlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnJldmVydFBhcmVudE92ZXJzY3JvbGwoKTtcclxuXHRcdHRoaXMuX3BhcmVudFNjcm9sbCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5hZGRTY3JvbGxFdmVudEhhbmRsZXJzKCk7XHJcblxyXG5cdFx0Y29uc3Qgc2Nyb2xsRWxlbWVudCA9IHRoaXMuZ2V0U2Nyb2xsRWxlbWVudCgpO1xyXG5cdFx0aWYgKHRoaXMubW9kaWZ5T3ZlcmZsb3dTdHlsZU9mUGFyZW50U2Nyb2xsICYmIHNjcm9sbEVsZW1lbnQgIT09IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XHJcblx0XHRcdHRoaXMub2xkUGFyZW50U2Nyb2xsT3ZlcmZsb3cgPSB7IHg6IHNjcm9sbEVsZW1lbnQuc3R5bGVbJ292ZXJmbG93LXgnXSwgeTogc2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteSddIH07XHJcblx0XHRcdHNjcm9sbEVsZW1lbnQuc3R5bGVbJ292ZXJmbG93LXknXSA9IHRoaXMuaG9yaXpvbnRhbCA/ICd2aXNpYmxlJyA6ICdhdXRvJztcclxuXHRcdFx0c2Nyb2xsRWxlbWVudC5zdHlsZVsnb3ZlcmZsb3cteCddID0gdGhpcy5ob3Jpem9udGFsID8gJ2F1dG8nIDogJ3Zpc2libGUnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0QE91dHB1dCgpXHJcblx0cHVibGljIHZzVXBkYXRlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcclxuXHJcblx0QE91dHB1dCgpXHJcblx0cHVibGljIHZzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPigpO1xyXG5cclxuXHRAT3V0cHV0KClcclxuXHRwdWJsaWMgdnNTdGFydDogRXZlbnRFbWl0dGVyPElQYWdlSW5mbz4gPSBuZXcgRXZlbnRFbWl0dGVyPElQYWdlSW5mbz4oKTtcclxuXHJcblx0QE91dHB1dCgpXHJcblx0cHVibGljIHZzRW5kOiBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBhZ2VJbmZvPigpO1xyXG5cclxuXHRAVmlld0NoaWxkKCdjb250ZW50JywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlIH0pXHJcblx0cHJvdGVjdGVkIGNvbnRlbnRFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xyXG5cclxuXHRAVmlld0NoaWxkKCdpbnZpc2libGVQYWRkaW5nJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlIH0pXHJcblx0cHJvdGVjdGVkIGludmlzaWJsZVBhZGRpbmdFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xyXG5cclxuXHRAQ29udGVudENoaWxkKCdoZWFkZXInLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2UgfSlcclxuXHRwcm90ZWN0ZWQgaGVhZGVyRWxlbWVudFJlZjogRWxlbWVudFJlZjtcclxuXHJcblx0QENvbnRlbnRDaGlsZCgnY29udGFpbmVyJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlIH0pXHJcblx0cHJvdGVjdGVkIGNvbnRhaW5lckVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG5cdHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuYWRkU2Nyb2xsRXZlbnRIYW5kbGVycygpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5yZW1vdmVTY3JvbGxFdmVudEhhbmRsZXJzKCk7XHJcblx0XHR0aGlzLnJldmVydFBhcmVudE92ZXJzY3JvbGwoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcclxuXHRcdGxldCBpbmRleExlbmd0aENoYW5nZWQgPSB0aGlzLmNhY2hlZEl0ZW1zTGVuZ3RoICE9PSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuXHRcdHRoaXMuY2FjaGVkSXRlbXNMZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuXHJcblx0XHRjb25zdCBmaXJzdFJ1bjogYm9vbGVhbiA9ICFjaGFuZ2VzLml0ZW1zIHx8ICFjaGFuZ2VzLml0ZW1zLnByZXZpb3VzVmFsdWUgfHwgY2hhbmdlcy5pdGVtcy5wcmV2aW91c1ZhbHVlLmxlbmd0aCA9PT0gMDtcclxuXHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChpbmRleExlbmd0aENoYW5nZWQgfHwgZmlyc3RSdW4pO1xyXG5cdH1cclxuXHJcblx0XHJcblx0cHVibGljIG5nRG9DaGVjaygpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLmNhY2hlZEl0ZW1zTGVuZ3RoICE9PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLmNhY2hlZEl0ZW1zTGVuZ3RoID0gdGhpcy5pdGVtcy5sZW5ndGg7XHJcblx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbCh0cnVlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5wcmV2aW91c1ZpZXdQb3J0ICYmIHRoaXMudmlld1BvcnRJdGVtcyAmJiB0aGlzLnZpZXdQb3J0SXRlbXMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRsZXQgaXRlbXNBcnJheUNoYW5nZWQgPSBmYWxzZTtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZpZXdQb3J0SXRlbXMubGVuZ3RoOyArK2kpIHtcclxuXHRcdFx0XHRpZiAoIXRoaXMuY29tcGFyZUl0ZW1zKHRoaXMuaXRlbXNbdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyICsgaV0sIHRoaXMudmlld1BvcnRJdGVtc1tpXSkpIHtcclxuXHRcdFx0XHRcdGl0ZW1zQXJyYXlDaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaXRlbXNBcnJheUNoYW5nZWQpIHtcclxuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwodHJ1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZWZyZXNoKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKHRydWUpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGludmFsaWRhdGVBbGxDYWNoZWRNZWFzdXJlbWVudHMoKTogdm9pZCB7XHJcblx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMgPSB7XHJcblx0XHRcdG1heENoaWxkU2l6ZVBlcldyYXBHcm91cDogW10sXHJcblx0XHRcdG51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzOiAwLFxyXG5cdFx0XHRzdW1PZktub3duV3JhcEdyb3VwQ2hpbGRXaWR0aHM6IDAsXHJcblx0XHRcdHN1bU9mS25vd25XcmFwR3JvdXBDaGlsZEhlaWdodHM6IDBcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBpbnZhbGlkYXRlQ2FjaGVkTWVhc3VyZW1lbnRGb3JJdGVtKGl0ZW06IGFueSk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMpIHtcclxuXHRcdFx0bGV0IGluZGV4ID0gdGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XHJcblx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlQ2FjaGVkTWVhc3VyZW1lbnRBdEluZGV4KGluZGV4KTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggPSB1bmRlZmluZWQ7XHJcblx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZEhlaWdodCA9IHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGludmFsaWRhdGVDYWNoZWRNZWFzdXJlbWVudEF0SW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMpIHtcclxuXHRcdFx0bGV0IGNhY2hlZE1lYXN1cmVtZW50ID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpbmRleF07XHJcblx0XHRcdGlmIChjYWNoZWRNZWFzdXJlbWVudCkge1xyXG5cdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5tYXhDaGlsZFNpemVQZXJXcmFwR3JvdXBbaW5kZXhdID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdC0tdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzO1xyXG5cdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRXaWR0aHMgLT0gY2FjaGVkTWVhc3VyZW1lbnQuY2hpbGRXaWR0aCB8fCAwO1xyXG5cdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRIZWlnaHRzIC09IGNhY2hlZE1lYXN1cmVtZW50LmNoaWxkSGVpZ2h0IHx8IDA7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZFdpZHRoID0gdW5kZWZpbmVkO1xyXG5cdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgPSB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzY3JvbGxJbnRvKGl0ZW06IGFueSwgYWxpZ25Ub0JlZ2lubmluZzogYm9vbGVhbiA9IHRydWUsIGFkZGl0aW9uYWxPZmZzZXQ6IG51bWJlciA9IDAsIGFuaW1hdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyID0gdW5kZWZpbmVkLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cdFx0bGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XHJcblx0XHRpZiAoaW5kZXggPT09IC0xKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNjcm9sbFRvSW5kZXgoaW5kZXgsIGFsaWduVG9CZWdpbm5pbmcsIGFkZGl0aW9uYWxPZmZzZXQsIGFuaW1hdGlvbk1pbGxpc2Vjb25kcywgYW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNjcm9sbFRvSW5kZXgoaW5kZXg6IG51bWJlciwgYWxpZ25Ub0JlZ2lubmluZzogYm9vbGVhbiA9IHRydWUsIGFkZGl0aW9uYWxPZmZzZXQ6IG51bWJlciA9IDAsIGFuaW1hdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyID0gdW5kZWZpbmVkLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cdFx0bGV0IG1heFJldHJpZXM6IG51bWJlciA9IDU7XHJcblxyXG5cdFx0bGV0IHJldHJ5SWZOZWVkZWQgPSAoKSA9PiB7XHJcblx0XHRcdC0tbWF4UmV0cmllcztcclxuXHRcdFx0aWYgKG1heFJldHJpZXMgPD0gMCkge1xyXG5cdFx0XHRcdGlmIChhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0YW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2soKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgZGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucygpO1xyXG5cdFx0XHRsZXQgZGVzaXJlZFN0YXJ0SW5kZXggPSBNYXRoLm1pbihNYXRoLm1heChpbmRleCwgMCksIGRpbWVuc2lvbnMuaXRlbUNvdW50IC0gMSk7XHJcblx0XHRcdGlmICh0aGlzLnByZXZpb3VzVmlld1BvcnQuc3RhcnRJbmRleCA9PT0gZGVzaXJlZFN0YXJ0SW5kZXgpIHtcclxuXHRcdFx0XHRpZiAoYW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zY3JvbGxUb0luZGV4X2ludGVybmFsKGluZGV4LCBhbGlnblRvQmVnaW5uaW5nLCBhZGRpdGlvbmFsT2Zmc2V0LCAwLCByZXRyeUlmTmVlZGVkKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5zY3JvbGxUb0luZGV4X2ludGVybmFsKGluZGV4LCBhbGlnblRvQmVnaW5uaW5nLCBhZGRpdGlvbmFsT2Zmc2V0LCBhbmltYXRpb25NaWxsaXNlY29uZHMsIHJldHJ5SWZOZWVkZWQpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHNjcm9sbFRvSW5kZXhfaW50ZXJuYWwoaW5kZXg6IG51bWJlciwgYWxpZ25Ub0JlZ2lubmluZzogYm9vbGVhbiA9IHRydWUsIGFkZGl0aW9uYWxPZmZzZXQ6IG51bWJlciA9IDAsIGFuaW1hdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyID0gdW5kZWZpbmVkLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cdFx0YW5pbWF0aW9uTWlsbGlzZWNvbmRzID0gYW5pbWF0aW9uTWlsbGlzZWNvbmRzID09PSB1bmRlZmluZWQgPyB0aGlzLnNjcm9sbEFuaW1hdGlvblRpbWUgOiBhbmltYXRpb25NaWxsaXNlY29uZHM7XHJcblxyXG5cdFx0bGV0IGRpbWVuc2lvbnMgPSB0aGlzLmNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcclxuXHRcdGxldCBzY3JvbGwgPSB0aGlzLmNhbGN1bGF0ZVBhZGRpbmcoaW5kZXgsIGRpbWVuc2lvbnMpICsgYWRkaXRpb25hbE9mZnNldDtcclxuXHRcdGlmICghYWxpZ25Ub0JlZ2lubmluZykge1xyXG5cdFx0XHRzY3JvbGwgLT0gZGltZW5zaW9ucy53cmFwR3JvdXBzUGVyUGFnZSAqIGRpbWVuc2lvbnNbdGhpcy5fY2hpbGRTY3JvbGxEaW1dO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2Nyb2xsVG9Qb3NpdGlvbihzY3JvbGwsIGFuaW1hdGlvbk1pbGxpc2Vjb25kcywgYW5pbWF0aW9uQ29tcGxldGVkQ2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNjcm9sbFRvUG9zaXRpb24oc2Nyb2xsUG9zaXRpb246IG51bWJlciwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIgPSB1bmRlZmluZWQsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcblx0XHRzY3JvbGxQb3NpdGlvbiArPSB0aGlzLmdldEVsZW1lbnRzT2Zmc2V0KCk7XHJcblxyXG5cdFx0YW5pbWF0aW9uTWlsbGlzZWNvbmRzID0gYW5pbWF0aW9uTWlsbGlzZWNvbmRzID09PSB1bmRlZmluZWQgPyB0aGlzLnNjcm9sbEFuaW1hdGlvblRpbWUgOiBhbmltYXRpb25NaWxsaXNlY29uZHM7XHJcblxyXG5cdFx0bGV0IHNjcm9sbEVsZW1lbnQgPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKTtcclxuXHJcblx0XHRsZXQgYW5pbWF0aW9uUmVxdWVzdDogbnVtYmVyO1xyXG5cclxuXHRcdGlmICh0aGlzLmN1cnJlbnRUd2Vlbikge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRUd2Vlbi5zdG9wKCk7XHJcblx0XHRcdHRoaXMuY3VycmVudFR3ZWVuID0gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghYW5pbWF0aW9uTWlsbGlzZWNvbmRzKSB7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoc2Nyb2xsRWxlbWVudCwgdGhpcy5fc2Nyb2xsVHlwZSwgc2Nyb2xsUG9zaXRpb24pO1xyXG5cdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UsIGFuaW1hdGlvbkNvbXBsZXRlZENhbGxiYWNrKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHR3ZWVuQ29uZmlnT2JqID0geyBzY3JvbGxQb3NpdGlvbjogc2Nyb2xsRWxlbWVudFt0aGlzLl9zY3JvbGxUeXBlXSB9O1xyXG5cclxuXHRcdGxldCBuZXdUd2VlbiA9IG5ldyB0d2Vlbi5Ud2Vlbih0d2VlbkNvbmZpZ09iailcclxuXHRcdFx0LnRvKHsgc2Nyb2xsUG9zaXRpb24gfSwgYW5pbWF0aW9uTWlsbGlzZWNvbmRzKVxyXG5cdFx0XHQuZWFzaW5nKHR3ZWVuLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG5cdFx0XHQub25VcGRhdGUoKGRhdGEpID0+IHtcclxuXHRcdFx0XHRpZiAoaXNOYU4oZGF0YS5zY3JvbGxQb3NpdGlvbikpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShzY3JvbGxFbGVtZW50LCB0aGlzLl9zY3JvbGxUeXBlLCBkYXRhLnNjcm9sbFBvc2l0aW9uKTtcclxuXHRcdFx0XHR0aGlzLnJlZnJlc2hfaW50ZXJuYWwoZmFsc2UpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQub25TdG9wKCgpID0+IHtcclxuXHRcdFx0XHRjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25SZXF1ZXN0KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LnN0YXJ0KCk7XHJcblxyXG5cdFx0Y29uc3QgYW5pbWF0ZSA9ICh0aW1lPzogbnVtYmVyKSA9PiB7XHJcblx0XHRcdGlmICghbmV3VHdlZW5bXCJpc1BsYXlpbmdcIl0oKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bmV3VHdlZW4udXBkYXRlKHRpbWUpO1xyXG5cdFx0XHRpZiAodHdlZW5Db25maWdPYmouc2Nyb2xsUG9zaXRpb24gPT09IHNjcm9sbFBvc2l0aW9uKSB7XHJcblx0XHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlLCBhbmltYXRpb25Db21wbGV0ZWRDYWxsYmFjayk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG5cdFx0XHRcdGFuaW1hdGlvblJlcXVlc3QgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHRhbmltYXRlKCk7XHJcblx0XHR0aGlzLmN1cnJlbnRUd2VlbiA9IG5ld1R3ZWVuO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGlzQW5ndWxhclVuaXZlcnNhbFNTUjogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcblx0XHRwcm90ZWN0ZWQgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuXHRcdHByb3RlY3RlZCByZWFkb25seSB6b25lOiBOZ1pvbmUsXHJcblx0XHRwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG5cdFx0QEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxyXG5cdFx0QE9wdGlvbmFsKCkgQEluamVjdCgndmlydHVhbC1zY3JvbGxlci1kZWZhdWx0LW9wdGlvbnMnKVxyXG5cdFx0b3B0aW9uczogVmlydHVhbFNjcm9sbGVyRGVmYXVsdE9wdGlvbnMpIHtcclxuXHRcdFx0XHJcblx0XHR0aGlzLmlzQW5ndWxhclVuaXZlcnNhbFNTUiA9IGlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCk7XHJcblxyXG5cdFx0dGhpcy5zY3JvbGxUaHJvdHRsaW5nVGltZSA9IG9wdGlvbnMuc2Nyb2xsVGhyb3R0bGluZ1RpbWU7XHJcblx0XHR0aGlzLnNjcm9sbERlYm91bmNlVGltZSA9IG9wdGlvbnMuc2Nyb2xsRGVib3VuY2VUaW1lO1xyXG5cdFx0dGhpcy5zY3JvbGxBbmltYXRpb25UaW1lID0gb3B0aW9ucy5zY3JvbGxBbmltYXRpb25UaW1lO1xyXG5cdFx0dGhpcy5zY3JvbGxiYXJXaWR0aCA9IG9wdGlvbnMuc2Nyb2xsYmFyV2lkdGg7XHJcblx0XHR0aGlzLnNjcm9sbGJhckhlaWdodCA9IG9wdGlvbnMuc2Nyb2xsYmFySGVpZ2h0O1xyXG5cdFx0dGhpcy5jaGVja1Jlc2l6ZUludGVydmFsID0gb3B0aW9ucy5jaGVja1Jlc2l6ZUludGVydmFsO1xyXG5cdFx0dGhpcy5yZXNpemVCeXBhc3NSZWZyZXNoVGhyZXNob2xkID0gb3B0aW9ucy5yZXNpemVCeXBhc3NSZWZyZXNoVGhyZXNob2xkO1xyXG5cdFx0dGhpcy5tb2RpZnlPdmVyZmxvd1N0eWxlT2ZQYXJlbnRTY3JvbGwgPSBvcHRpb25zLm1vZGlmeU92ZXJmbG93U3R5bGVPZlBhcmVudFNjcm9sbDtcclxuXHRcdHRoaXMuc3RyaXBlZFRhYmxlID0gb3B0aW9ucy5zdHJpcGVkVGFibGU7XHJcblxyXG5cdFx0dGhpcy5ob3Jpem9udGFsID0gZmFsc2U7XHJcblx0XHR0aGlzLnJlc2V0V3JhcEdyb3VwRGltZW5zaW9ucygpO1xyXG5cdH1cclxuXHRcclxuXHRwcm90ZWN0ZWQgZ2V0RWxlbWVudFNpemUoZWxlbWVudDogSFRNTEVsZW1lbnQpIDogQ2xpZW50UmVjdCB7XHJcblx0XHRsZXQgcmVzdWx0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdGxldCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cdFx0bGV0IG1hcmdpblRvcCA9IHBhcnNlSW50KHN0eWxlc1snbWFyZ2luLXRvcCddLCAxMCkgfHwgMDtcclxuXHRcdGxldCBtYXJnaW5Cb3R0b20gPSBwYXJzZUludChzdHlsZXNbJ21hcmdpbi1ib3R0b20nXSwgMTApIHx8IDA7XHJcblx0XHRsZXQgbWFyZ2luTGVmdCA9IHBhcnNlSW50KHN0eWxlc1snbWFyZ2luLWxlZnQnXSwgMTApIHx8IDA7XHJcblx0XHRsZXQgbWFyZ2luUmlnaHQgPSBwYXJzZUludChzdHlsZXNbJ21hcmdpbi1yaWdodCddLCAxMCkgfHwgMDtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dG9wOiByZXN1bHQudG9wICsgbWFyZ2luVG9wLFxyXG5cdFx0XHRib3R0b206IHJlc3VsdC5ib3R0b20gKyBtYXJnaW5Cb3R0b20sXHJcblx0XHRcdGxlZnQ6IHJlc3VsdC5sZWZ0ICsgbWFyZ2luTGVmdCxcclxuXHRcdFx0cmlnaHQ6IHJlc3VsdC5yaWdodCArIG1hcmdpblJpZ2h0LFxyXG5cdFx0XHR3aWR0aDogcmVzdWx0LndpZHRoICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0LFxyXG5cdFx0XHRoZWlnaHQ6IHJlc3VsdC5oZWlnaHQgKyBtYXJnaW5Ub3AgKyBtYXJnaW5Cb3R0b21cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgcHJldmlvdXNTY3JvbGxCb3VuZGluZ1JlY3Q6IENsaWVudFJlY3Q7XHJcblx0cHJvdGVjdGVkIGNoZWNrU2Nyb2xsRWxlbWVudFJlc2l6ZWQoKTogdm9pZCB7XHJcblx0XHRsZXQgYm91bmRpbmdSZWN0ID0gdGhpcy5nZXRFbGVtZW50U2l6ZSh0aGlzLmdldFNjcm9sbEVsZW1lbnQoKSk7XHJcblxyXG5cdFx0bGV0IHNpemVDaGFuZ2VkOiBib29sZWFuO1xyXG5cdFx0aWYgKCF0aGlzLnByZXZpb3VzU2Nyb2xsQm91bmRpbmdSZWN0KSB7XHJcblx0XHRcdHNpemVDaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCB3aWR0aENoYW5nZSA9IE1hdGguYWJzKGJvdW5kaW5nUmVjdC53aWR0aCAtIHRoaXMucHJldmlvdXNTY3JvbGxCb3VuZGluZ1JlY3Qud2lkdGgpO1xyXG5cdFx0XHRsZXQgaGVpZ2h0Q2hhbmdlID0gTWF0aC5hYnMoYm91bmRpbmdSZWN0LmhlaWdodCAtIHRoaXMucHJldmlvdXNTY3JvbGxCb3VuZGluZ1JlY3QuaGVpZ2h0KTtcclxuXHRcdFx0c2l6ZUNoYW5nZWQgPSB3aWR0aENoYW5nZSA+IHRoaXMucmVzaXplQnlwYXNzUmVmcmVzaFRocmVzaG9sZCB8fCBoZWlnaHRDaGFuZ2UgPiB0aGlzLnJlc2l6ZUJ5cGFzc1JlZnJlc2hUaHJlc2hvbGQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNpemVDaGFuZ2VkKSB7XHJcblx0XHRcdHRoaXMucHJldmlvdXNTY3JvbGxCb3VuZGluZ1JlY3QgPSBib3VuZGluZ1JlY3Q7XHJcblx0XHRcdGlmIChib3VuZGluZ1JlY3Qud2lkdGggPiAwICYmIGJvdW5kaW5nUmVjdC5oZWlnaHQgPiAwKSB7XHJcblx0XHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIF9pbnZpc2libGVQYWRkaW5nUHJvcGVydHk7XHJcblx0cHJvdGVjdGVkIF9vZmZzZXRUeXBlO1xyXG5cdHByb3RlY3RlZCBfc2Nyb2xsVHlwZTtcclxuXHRwcm90ZWN0ZWQgX3BhZ2VPZmZzZXRUeXBlO1xyXG5cdHByb3RlY3RlZCBfY2hpbGRTY3JvbGxEaW07XHJcblx0cHJvdGVjdGVkIF90cmFuc2xhdGVEaXI7XHJcblx0cHJvdGVjdGVkIF9tYXJnaW5EaXI7XHJcblx0cHJvdGVjdGVkIHVwZGF0ZURpcmVjdGlvbigpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLmhvcml6b250YWwpIHtcclxuXHRcdFx0dGhpcy5faW52aXNpYmxlUGFkZGluZ1Byb3BlcnR5ID0gJ3dpZHRoJztcclxuXHRcdFx0dGhpcy5fb2Zmc2V0VHlwZSA9ICdvZmZzZXRMZWZ0JztcclxuXHRcdFx0dGhpcy5fcGFnZU9mZnNldFR5cGUgPSAncGFnZVhPZmZzZXQnO1xyXG5cdFx0XHR0aGlzLl9jaGlsZFNjcm9sbERpbSA9ICdjaGlsZFdpZHRoJztcclxuXHRcdFx0dGhpcy5fbWFyZ2luRGlyID0gJ21hcmdpbi1sZWZ0JztcclxuXHRcdFx0dGhpcy5fdHJhbnNsYXRlRGlyID0gJ3RyYW5zbGF0ZVgnO1xyXG5cdFx0XHR0aGlzLl9zY3JvbGxUeXBlID0gJ3Njcm9sbExlZnQnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuX2ludmlzaWJsZVBhZGRpbmdQcm9wZXJ0eSA9ICdoZWlnaHQnO1xyXG5cdFx0XHR0aGlzLl9vZmZzZXRUeXBlID0gJ29mZnNldFRvcCc7XHJcblx0XHRcdHRoaXMuX3BhZ2VPZmZzZXRUeXBlID0gJ3BhZ2VZT2Zmc2V0JztcclxuXHRcdFx0dGhpcy5fY2hpbGRTY3JvbGxEaW0gPSAnY2hpbGRIZWlnaHQnO1xyXG5cdFx0XHR0aGlzLl9tYXJnaW5EaXIgPSAnbWFyZ2luLXRvcCc7XHJcblx0XHRcdHRoaXMuX3RyYW5zbGF0ZURpciA9ICd0cmFuc2xhdGVZJztcclxuXHRcdFx0dGhpcy5fc2Nyb2xsVHlwZSA9ICdzY3JvbGxUb3AnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGRlYm91bmNlKGZ1bmM6IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIpOiBGdW5jdGlvbiB7XHJcblx0XHRjb25zdCB0aHJvdHRsZWQgPSB0aGlzLnRocm90dGxlVHJhaWxpbmcoZnVuYywgd2FpdCk7XHJcblx0XHRjb25zdCByZXN1bHQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRocm90dGxlZFsnY2FuY2VsJ10oKTtcclxuXHRcdFx0dGhyb3R0bGVkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR9O1xyXG5cdFx0cmVzdWx0WydjYW5jZWwnXSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhyb3R0bGVkWydjYW5jZWwnXSgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHRocm90dGxlVHJhaWxpbmcoZnVuYzogRnVuY3Rpb24sIHdhaXQ6IG51bWJlcik6IEZ1bmN0aW9uIHtcclxuXHRcdGxldCB0aW1lb3V0ID0gdW5kZWZpbmVkO1xyXG5cdFx0bGV0IF9hcmd1bWVudHMgPSBhcmd1bWVudHM7XHJcblx0XHRjb25zdCByZXN1bHQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHRcdFx0X2FyZ3VtZW50cyA9IGFyZ3VtZW50c1xyXG5cclxuXHRcdFx0aWYgKHRpbWVvdXQpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh3YWl0IDw9IDApIHtcclxuXHRcdFx0XHRmdW5jLmFwcGx5KF90aGlzLCBfYXJndW1lbnRzKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHR0aW1lb3V0ID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0ZnVuYy5hcHBseShfdGhpcywgX2FyZ3VtZW50cyk7XHJcblx0XHRcdFx0fSwgd2FpdCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRyZXN1bHRbJ2NhbmNlbCddID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGltZW91dCkge1xyXG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHRcdFx0XHR0aW1lb3V0ID0gdW5kZWZpbmVkO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoOiBudW1iZXIgPSAwO1xyXG5cdHByb3RlY3RlZCBjYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuXHRwcm90ZWN0ZWQgcGFkZGluZzogbnVtYmVyID0gMDtcclxuXHRwcm90ZWN0ZWQgcHJldmlvdXNWaWV3UG9ydDogSVZpZXdwb3J0ID0gPGFueT57fTtcclxuXHRwcm90ZWN0ZWQgY3VycmVudFR3ZWVuOiB0d2Vlbi5Ud2VlbjtcclxuXHRwcm90ZWN0ZWQgY2FjaGVkSXRlbXNMZW5ndGg6IG51bWJlcjtcclxuXHJcblx0cHJvdGVjdGVkIGRpc3Bvc2VTY3JvbGxIYW5kbGVyOiAoKSA9PiB2b2lkIHwgdW5kZWZpbmVkO1xyXG5cdHByb3RlY3RlZCBkaXNwb3NlUmVzaXplSGFuZGxlcjogKCkgPT4gdm9pZCB8IHVuZGVmaW5lZDtcclxuXHJcblx0cHJvdGVjdGVkIHJlZnJlc2hfaW50ZXJuYWwoaXRlbXNBcnJheU1vZGlmaWVkOiBib29sZWFuLCByZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSB1bmRlZmluZWQsIG1heFJ1blRpbWVzOiBudW1iZXIgPSAyKTogdm9pZCB7XHJcblx0XHQvL25vdGU6IG1heFJ1blRpbWVzIGlzIHRvIGZvcmNlIGl0IHRvIGtlZXAgcmVjYWxjdWxhdGluZyBpZiB0aGUgcHJldmlvdXMgaXRlcmF0aW9uIGNhdXNlZCBhIHJlLXJlbmRlciAoZGlmZmVyZW50IHNsaWNlZCBpdGVtcyBpbiB2aWV3cG9ydCBvciBzY3JvbGxQb3NpdGlvbiBjaGFuZ2VkKS5cclxuXHRcdC8vVGhlIGRlZmF1bHQgb2YgMnggbWF4IHdpbGwgcHJvYmFibHkgYmUgYWNjdXJhdGUgZW5vdWdoIHdpdGhvdXQgY2F1c2luZyB0b28gbGFyZ2UgYSBwZXJmb3JtYW5jZSBib3R0bGVuZWNrXHJcblx0XHQvL1RoZSBjb2RlIHdvdWxkIHR5cGljYWxseSBxdWl0IG91dCBvbiB0aGUgMm5kIGl0ZXJhdGlvbiBhbnl3YXlzLiBUaGUgbWFpbiB0aW1lIGl0J2QgdGhpbmsgbW9yZSB0aGFuIDIgcnVucyB3b3VsZCBiZSBuZWNlc3Nhcnkgd291bGQgYmUgZm9yIHZhc3RseSBkaWZmZXJlbnQgc2l6ZWQgY2hpbGQgaXRlbXMgb3IgaWYgdGhpcyBpcyB0aGUgMXN0IHRpbWUgdGhlIGl0ZW1zIGFycmF5IHdhcyBpbml0aWFsaXplZC5cclxuXHRcdC8vV2l0aG91dCBtYXhSdW5UaW1lcywgSWYgdGhlIHVzZXIgaXMgYWN0aXZlbHkgc2Nyb2xsaW5nIHRoaXMgY29kZSB3b3VsZCBiZWNvbWUgYW4gaW5maW5pdGUgbG9vcCB1bnRpbCB0aGV5IHN0b3BwZWQgc2Nyb2xsaW5nLiBUaGlzIHdvdWxkIGJlIG9rYXksIGV4Y2VwdCBlYWNoIHNjcm9sbCBldmVudCB3b3VsZCBzdGFydCBhbiBhZGRpdGlvbmFsIGluZmludGUgbG9vcC4gV2Ugd2FudCB0byBzaG9ydC1jaXJjdWl0IGl0IHRvIHByZXZlbnQgdGhpcy5cclxuXHJcblx0XHRpZiAoaXRlbXNBcnJheU1vZGlmaWVkICYmIHRoaXMucHJldmlvdXNWaWV3UG9ydCAmJiB0aGlzLnByZXZpb3VzVmlld1BvcnQuc2Nyb2xsU3RhcnRQb3NpdGlvbiA+IDApIHtcclxuXHRcdC8vaWYgaXRlbXMgd2VyZSBwcmVwZW5kZWQsIHNjcm9sbCBmb3J3YXJkIHRvIGtlZXAgc2FtZSBpdGVtcyB2aXNpYmxlXHJcblx0XHRcdGxldCBvbGRWaWV3UG9ydCA9IHRoaXMucHJldmlvdXNWaWV3UG9ydDtcclxuXHRcdFx0bGV0IG9sZFZpZXdQb3J0SXRlbXMgPSB0aGlzLnZpZXdQb3J0SXRlbXM7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgb2xkUmVmcmVzaENvbXBsZXRlZENhbGxiYWNrID0gcmVmcmVzaENvbXBsZXRlZENhbGxiYWNrO1xyXG5cdFx0XHRyZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2sgPSAoKSA9PiB7XHJcblx0XHRcdFx0bGV0IHNjcm9sbExlbmd0aERlbHRhID0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnNjcm9sbExlbmd0aCAtIG9sZFZpZXdQb3J0LnNjcm9sbExlbmd0aDtcclxuXHRcdFx0XHRpZiAoc2Nyb2xsTGVuZ3RoRGVsdGEgPiAwICYmIHRoaXMudmlld1BvcnRJdGVtcykge1xyXG5cdFx0XHRcdFx0bGV0IG9sZFN0YXJ0SXRlbSA9IG9sZFZpZXdQb3J0SXRlbXNbMF07XHJcblx0XHRcdFx0XHRsZXQgb2xkU3RhcnRJdGVtSW5kZXggPSB0aGlzLml0ZW1zLmZpbmRJbmRleCh4ID0+IHRoaXMuY29tcGFyZUl0ZW1zKG9sZFN0YXJ0SXRlbSwgeCkpO1xyXG5cdFx0XHRcdFx0aWYgKG9sZFN0YXJ0SXRlbUluZGV4ID4gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyKSB7XHJcblx0XHRcdFx0XHRcdGxldCBpdGVtT3JkZXJDaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy52aWV3UG9ydEl0ZW1zLmxlbmd0aDsgKytpKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCF0aGlzLmNvbXBhcmVJdGVtcyh0aGlzLml0ZW1zW29sZFN0YXJ0SXRlbUluZGV4ICsgaV0sIG9sZFZpZXdQb3J0SXRlbXNbaV0pKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpdGVtT3JkZXJDaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYgKCFpdGVtT3JkZXJDaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zY3JvbGxUb1Bvc2l0aW9uKHRoaXMucHJldmlvdXNWaWV3UG9ydC5zY3JvbGxTdGFydFBvc2l0aW9uICsgc2Nyb2xsTGVuZ3RoRGVsdGEgLCAwLCBvbGRSZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2spO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAob2xkUmVmcmVzaENvbXBsZXRlZENhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRvbGRSZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2soKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9XHRcdFx0XHJcblxyXG5cdFx0dGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuXHJcblx0XHRcdFx0aWYgKGl0ZW1zQXJyYXlNb2RpZmllZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5yZXNldFdyYXBHcm91cERpbWVuc2lvbnMoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGV0IHZpZXdwb3J0ID0gdGhpcy5jYWxjdWxhdGVWaWV3cG9ydCgpO1xyXG5cclxuXHRcdFx0XHRsZXQgc3RhcnRDaGFuZ2VkID0gaXRlbXNBcnJheU1vZGlmaWVkIHx8IHZpZXdwb3J0LnN0YXJ0SW5kZXggIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5zdGFydEluZGV4O1xyXG5cdFx0XHRcdGxldCBlbmRDaGFuZ2VkID0gaXRlbXNBcnJheU1vZGlmaWVkIHx8IHZpZXdwb3J0LmVuZEluZGV4ICE9PSB0aGlzLnByZXZpb3VzVmlld1BvcnQuZW5kSW5kZXg7XHJcblx0XHRcdFx0bGV0IHNjcm9sbExlbmd0aENoYW5nZWQgPSB2aWV3cG9ydC5zY3JvbGxMZW5ndGggIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5zY3JvbGxMZW5ndGg7XHJcblx0XHRcdFx0bGV0IHBhZGRpbmdDaGFuZ2VkID0gdmlld3BvcnQucGFkZGluZyAhPT0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnBhZGRpbmc7XHJcblx0XHRcdFx0bGV0IHNjcm9sbFBvc2l0aW9uQ2hhbmdlZCA9IHZpZXdwb3J0LnNjcm9sbFN0YXJ0UG9zaXRpb24gIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5zY3JvbGxTdGFydFBvc2l0aW9uIHx8IHZpZXdwb3J0LnNjcm9sbEVuZFBvc2l0aW9uICE9PSB0aGlzLnByZXZpb3VzVmlld1BvcnQuc2Nyb2xsRW5kUG9zaXRpb24gfHwgdmlld3BvcnQubWF4U2Nyb2xsUG9zaXRpb24gIT09IHRoaXMucHJldmlvdXNWaWV3UG9ydC5tYXhTY3JvbGxQb3NpdGlvbjtcclxuXHJcblx0XHRcdFx0dGhpcy5wcmV2aW91c1ZpZXdQb3J0ID0gdmlld3BvcnQ7XHJcblxyXG5cdFx0XHRcdGlmIChzY3JvbGxMZW5ndGhDaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW52aXNpYmxlUGFkZGluZ0VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5faW52aXNpYmxlUGFkZGluZ1Byb3BlcnR5LCBgJHt2aWV3cG9ydC5zY3JvbGxMZW5ndGh9cHhgKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwYWRkaW5nQ2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMudXNlTWFyZ2luSW5zdGVhZE9mVHJhbnNsYXRlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250ZW50RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9tYXJnaW5EaXIsIGAke3ZpZXdwb3J0LnBhZGRpbmd9cHhgKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIGAke3RoaXMuX3RyYW5zbGF0ZURpcn0oJHt2aWV3cG9ydC5wYWRkaW5nfXB4KWApO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGVudEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dlYmtpdFRyYW5zZm9ybScsIGAke3RoaXMuX3RyYW5zbGF0ZURpcn0oJHt2aWV3cG9ydC5wYWRkaW5nfXB4KWApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuaGVhZGVyRWxlbWVudFJlZikge1xyXG5cdFx0XHRcdFx0bGV0IHNjcm9sbFBvc2l0aW9uID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KClbdGhpcy5fc2Nyb2xsVHlwZV07XHJcblx0XHRcdFx0XHRsZXQgY29udGFpbmVyT2Zmc2V0ID0gdGhpcy5nZXRFbGVtZW50c09mZnNldCgpO1xyXG5cdFx0XHRcdFx0bGV0IG9mZnNldCA9IE1hdGgubWF4KHNjcm9sbFBvc2l0aW9uIC0gdmlld3BvcnQucGFkZGluZyAtIGNvbnRhaW5lck9mZnNldCArIHRoaXMuaGVhZGVyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCwgMCk7XHJcblx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaGVhZGVyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgYCR7dGhpcy5fdHJhbnNsYXRlRGlyfSgke29mZnNldH1weClgKTtcclxuXHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5oZWFkZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3ZWJraXRUcmFuc2Zvcm0nLCBgJHt0aGlzLl90cmFuc2xhdGVEaXJ9KCR7b2Zmc2V0fXB4KWApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y29uc3QgY2hhbmdlRXZlbnRBcmc6IElQYWdlSW5mbyA9IChzdGFydENoYW5nZWQgfHwgZW5kQ2hhbmdlZCkgPyB7XHJcblx0XHRcdFx0XHRzdGFydEluZGV4OiB2aWV3cG9ydC5zdGFydEluZGV4LFxyXG5cdFx0XHRcdFx0ZW5kSW5kZXg6IHZpZXdwb3J0LmVuZEluZGV4LFxyXG5cdFx0XHRcdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbjogdmlld3BvcnQuc2Nyb2xsU3RhcnRQb3NpdGlvbixcclxuXHRcdFx0XHRcdHNjcm9sbEVuZFBvc2l0aW9uOiB2aWV3cG9ydC5zY3JvbGxFbmRQb3NpdGlvbixcclxuXHRcdFx0XHRcdHN0YXJ0SW5kZXhXaXRoQnVmZmVyOiB2aWV3cG9ydC5zdGFydEluZGV4V2l0aEJ1ZmZlcixcclxuXHRcdFx0XHRcdGVuZEluZGV4V2l0aEJ1ZmZlcjogdmlld3BvcnQuZW5kSW5kZXhXaXRoQnVmZmVyLFxyXG5cdFx0XHRcdFx0bWF4U2Nyb2xsUG9zaXRpb246IHZpZXdwb3J0Lm1heFNjcm9sbFBvc2l0aW9uXHJcblx0XHRcdFx0fSA6IHVuZGVmaW5lZDtcclxuXHJcblxyXG5cdFx0XHRcdGlmIChzdGFydENoYW5nZWQgfHwgZW5kQ2hhbmdlZCB8fCBzY3JvbGxQb3NpdGlvbkNoYW5nZWQpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGhhbmRsZUNoYW5nZWQgPSAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdC8vIHVwZGF0ZSB0aGUgc2Nyb2xsIGxpc3QgdG8gdHJpZ2dlciByZS1yZW5kZXIgb2YgY29tcG9uZW50cyBpbiB2aWV3cG9ydFxyXG5cdFx0XHRcdFx0XHR0aGlzLnZpZXdQb3J0SXRlbXMgPSB2aWV3cG9ydC5zdGFydEluZGV4V2l0aEJ1ZmZlciA+PSAwICYmIHZpZXdwb3J0LmVuZEluZGV4V2l0aEJ1ZmZlciA+PSAwID8gdGhpcy5pdGVtcy5zbGljZSh2aWV3cG9ydC5zdGFydEluZGV4V2l0aEJ1ZmZlciwgdmlld3BvcnQuZW5kSW5kZXhXaXRoQnVmZmVyICsgMSkgOiBbXTtcclxuXHRcdFx0XHRcdFx0dGhpcy52c1VwZGF0ZS5lbWl0KHRoaXMudmlld1BvcnRJdGVtcyk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoc3RhcnRDaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy52c1N0YXJ0LmVtaXQoY2hhbmdlRXZlbnRBcmcpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZW5kQ2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMudnNFbmQuZW1pdChjaGFuZ2VFdmVudEFyZyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmIChzdGFydENoYW5nZWQgfHwgZW5kQ2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy52c0NoYW5nZS5lbWl0KGNoYW5nZUV2ZW50QXJnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKG1heFJ1blRpbWVzID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVmcmVzaF9pbnRlcm5hbChmYWxzZSwgcmVmcmVzaENvbXBsZXRlZENhbGxiYWNrLCBtYXhSdW5UaW1lcyAtIDEpO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0XHRcdHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaygpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5leGVjdXRlUmVmcmVzaE91dHNpZGVBbmd1bGFyWm9uZSkge1xyXG5cdFx0XHRcdFx0XHRoYW5kbGVDaGFuZ2VkKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy56b25lLnJ1bihoYW5kbGVDaGFuZ2VkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKG1heFJ1blRpbWVzID4gMCAmJiAoc2Nyb2xsTGVuZ3RoQ2hhbmdlZCB8fCBwYWRkaW5nQ2hhbmdlZCkpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5yZWZyZXNoX2ludGVybmFsKGZhbHNlLCByZWZyZXNoQ29tcGxldGVkQ2FsbGJhY2ssIG1heFJ1blRpbWVzIC0gMSk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAocmVmcmVzaENvbXBsZXRlZENhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRcdHJlZnJlc2hDb21wbGV0ZWRDYWxsYmFjaygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXRTY3JvbGxFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudFNjcm9sbCBpbnN0YW5jZW9mIFdpbmRvdyA/IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkgOiB0aGlzLnBhcmVudFNjcm9sbCB8fCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBhZGRTY3JvbGxFdmVudEhhbmRsZXJzKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuaXNBbmd1bGFyVW5pdmVyc2FsU1NSKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgc2Nyb2xsRWxlbWVudCA9IHRoaXMuZ2V0U2Nyb2xsRWxlbWVudCgpO1xyXG5cclxuXHRcdHRoaXMucmVtb3ZlU2Nyb2xsRXZlbnRIYW5kbGVycygpO1xyXG5cclxuXHRcdHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnBhcmVudFNjcm9sbCBpbnN0YW5jZW9mIFdpbmRvdykge1xyXG5cdFx0XHRcdHRoaXMuZGlzcG9zZVNjcm9sbEhhbmRsZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xyXG5cdFx0XHRcdHRoaXMuZGlzcG9zZVJlc2l6ZUhhbmRsZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ3Jlc2l6ZScsIHRoaXMub25TY3JvbGwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZGlzcG9zZVNjcm9sbEhhbmRsZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihzY3JvbGxFbGVtZW50LCAnc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XHJcblx0XHRcdFx0aWYgKHRoaXMuX2NoZWNrUmVzaXplSW50ZXJ2YWwgPiAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNoZWNrU2Nyb2xsRWxlbWVudFJlc2l6ZWRUaW1lciA9IDxhbnk+c2V0SW50ZXJ2YWwoKCkgPT4geyB0aGlzLmNoZWNrU2Nyb2xsRWxlbWVudFJlc2l6ZWQoKTsgfSwgdGhpcy5fY2hlY2tSZXNpemVJbnRlcnZhbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCByZW1vdmVTY3JvbGxFdmVudEhhbmRsZXJzKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuY2hlY2tTY3JvbGxFbGVtZW50UmVzaXplZFRpbWVyKSB7XHJcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5jaGVja1Njcm9sbEVsZW1lbnRSZXNpemVkVGltZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmRpc3Bvc2VTY3JvbGxIYW5kbGVyKSB7XHJcblx0XHRcdHRoaXMuZGlzcG9zZVNjcm9sbEhhbmRsZXIoKTtcclxuXHRcdFx0dGhpcy5kaXNwb3NlU2Nyb2xsSGFuZGxlciA9IHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5kaXNwb3NlUmVzaXplSGFuZGxlcikge1xyXG5cdFx0XHR0aGlzLmRpc3Bvc2VSZXNpemVIYW5kbGVyKCk7XHJcblx0XHRcdHRoaXMuZGlzcG9zZVJlc2l6ZUhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0RWxlbWVudHNPZmZzZXQoKTogbnVtYmVyIHtcclxuXHRcdGlmICh0aGlzLmlzQW5ndWxhclVuaXZlcnNhbFNTUikge1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgb2Zmc2V0ID0gMDtcclxuXHJcblx0XHRpZiAodGhpcy5jb250YWluZXJFbGVtZW50UmVmICYmIHRoaXMuY29udGFpbmVyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XHJcblx0XHRcdG9mZnNldCArPSB0aGlzLmNvbnRhaW5lckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFt0aGlzLl9vZmZzZXRUeXBlXTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5wYXJlbnRTY3JvbGwpIHtcclxuXHRcdFx0bGV0IHNjcm9sbEVsZW1lbnQgPSB0aGlzLmdldFNjcm9sbEVsZW1lbnQoKTtcclxuXHRcdFx0bGV0IGVsZW1lbnRDbGllbnRSZWN0ID0gdGhpcy5nZXRFbGVtZW50U2l6ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcblx0XHRcdGxldCBzY3JvbGxDbGllbnRSZWN0ID0gdGhpcy5nZXRFbGVtZW50U2l6ZShzY3JvbGxFbGVtZW50KTtcclxuXHRcdFx0aWYgKHRoaXMuaG9yaXpvbnRhbCkge1xyXG5cdFx0XHRcdG9mZnNldCArPSBlbGVtZW50Q2xpZW50UmVjdC5sZWZ0IC0gc2Nyb2xsQ2xpZW50UmVjdC5sZWZ0O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdG9mZnNldCArPSBlbGVtZW50Q2xpZW50UmVjdC50b3AgLSBzY3JvbGxDbGllbnRSZWN0LnRvcDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCEodGhpcy5wYXJlbnRTY3JvbGwgaW5zdGFuY2VvZiBXaW5kb3cpKSB7XHJcblx0XHRcdFx0b2Zmc2V0ICs9IHNjcm9sbEVsZW1lbnRbdGhpcy5fc2Nyb2xsVHlwZV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gb2Zmc2V0O1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNvdW50SXRlbXNQZXJXcmFwR3JvdXAoKTogbnVtYmVyIHtcclxuXHRcdGlmICh0aGlzLmlzQW5ndWxhclVuaXZlcnNhbFNTUikge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCh0aGlzLmhvcml6b250YWwgPyB0aGlzLnNzclZpZXdwb3J0SGVpZ2h0IC8gdGhpcy5zc3JDaGlsZEhlaWdodCA6IHRoaXMuc3NyVmlld3BvcnRXaWR0aCAvIHRoaXMuc3NyQ2hpbGRXaWR0aCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHByb3BlcnR5TmFtZSA9IHRoaXMuaG9yaXpvbnRhbCA/ICdvZmZzZXRMZWZ0JyA6ICdvZmZzZXRUb3AnO1xyXG5cdFx0bGV0IGNoaWxkcmVuID0gKCh0aGlzLmNvbnRhaW5lckVsZW1lbnRSZWYgJiYgdGhpcy5jb250YWluZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHx8IHRoaXMuY29udGVudEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuY2hpbGRyZW47XHJcblxyXG5cdFx0bGV0IGNoaWxkcmVuTGVuZ3RoID0gY2hpbGRyZW4gPyBjaGlsZHJlbi5sZW5ndGggOiAwO1xyXG5cdFx0aWYgKGNoaWxkcmVuTGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHJldHVybiAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBmaXJzdE9mZnNldCA9IGNoaWxkcmVuWzBdW3Byb3BlcnR5TmFtZV07XHJcblx0XHRsZXQgcmVzdWx0ID0gMTtcclxuXHRcdHdoaWxlIChyZXN1bHQgPCBjaGlsZHJlbkxlbmd0aCAmJiBmaXJzdE9mZnNldCA9PT0gY2hpbGRyZW5bcmVzdWx0XVtwcm9wZXJ0eU5hbWVdKSB7XHJcblx0XHRcdCsrcmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0U2Nyb2xsU3RhcnRQb3NpdGlvbigpOiBudW1iZXIge1xyXG5cdFx0bGV0IHdpbmRvd1Njcm9sbFZhbHVlID0gdW5kZWZpbmVkO1xyXG5cdFx0aWYgKHRoaXMucGFyZW50U2Nyb2xsIGluc3RhbmNlb2YgV2luZG93KSB7XHJcblx0XHRcdHdpbmRvd1Njcm9sbFZhbHVlID0gd2luZG93W3RoaXMuX3BhZ2VPZmZzZXRUeXBlXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gd2luZG93U2Nyb2xsVmFsdWUgfHwgdGhpcy5nZXRTY3JvbGxFbGVtZW50KClbdGhpcy5fc2Nyb2xsVHlwZV0gfHwgMDtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBtaW5NZWFzdXJlZENoaWxkV2lkdGg6IG51bWJlcjtcclxuXHRwcm90ZWN0ZWQgbWluTWVhc3VyZWRDaGlsZEhlaWdodDogbnVtYmVyO1xyXG5cclxuXHRwcm90ZWN0ZWQgd3JhcEdyb3VwRGltZW5zaW9uczogV3JhcEdyb3VwRGltZW5zaW9ucztcclxuXHJcblx0cHJvdGVjdGVkIHJlc2V0V3JhcEdyb3VwRGltZW5zaW9ucygpOiB2b2lkIHtcclxuXHRcdGNvbnN0IG9sZFdyYXBHcm91cERpbWVuc2lvbnMgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnM7XHJcblx0XHR0aGlzLmludmFsaWRhdGVBbGxDYWNoZWRNZWFzdXJlbWVudHMoKTtcclxuXHJcblx0XHRpZiAoIXRoaXMuZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMgfHwgIW9sZFdyYXBHcm91cERpbWVuc2lvbnMgfHwgb2xkV3JhcEdyb3VwRGltZW5zaW9ucy5udW1iZXJPZktub3duV3JhcEdyb3VwQ2hpbGRTaXplcyA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgaXRlbXNQZXJXcmFwR3JvdXA6IG51bWJlciA9IHRoaXMuY291bnRJdGVtc1BlcldyYXBHcm91cCgpO1xyXG5cdFx0Zm9yIChsZXQgd3JhcEdyb3VwSW5kZXggPSAwOyB3cmFwR3JvdXBJbmRleCA8IG9sZFdyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwLmxlbmd0aDsgKyt3cmFwR3JvdXBJbmRleCkge1xyXG5cdFx0XHRjb25zdCBvbGRXcmFwR3JvdXBEaW1lbnNpb246IFdyYXBHcm91cERpbWVuc2lvbiA9IG9sZFdyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW3dyYXBHcm91cEluZGV4XTtcclxuXHRcdFx0aWYgKCFvbGRXcmFwR3JvdXBEaW1lbnNpb24gfHwgIW9sZFdyYXBHcm91cERpbWVuc2lvbi5pdGVtcyB8fCAhb2xkV3JhcEdyb3VwRGltZW5zaW9uLml0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAob2xkV3JhcEdyb3VwRGltZW5zaW9uLml0ZW1zLmxlbmd0aCAhPT0gaXRlbXNQZXJXcmFwR3JvdXApIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBpdGVtc0NoYW5nZWQgPSBmYWxzZTtcclxuXHRcdFx0bGV0IGFycmF5U3RhcnRJbmRleCA9IGl0ZW1zUGVyV3JhcEdyb3VwICogd3JhcEdyb3VwSW5kZXg7XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXNQZXJXcmFwR3JvdXA7ICsraSkge1xyXG5cdFx0XHRcdGlmICghdGhpcy5jb21wYXJlSXRlbXMob2xkV3JhcEdyb3VwRGltZW5zaW9uLml0ZW1zW2ldLCB0aGlzLml0ZW1zW2FycmF5U3RhcnRJbmRleCArIGldKSkge1xyXG5cdFx0XHRcdFx0aXRlbXNDaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFpdGVtc0NoYW5nZWQpIHtcclxuXHRcdFx0XHQrK3RoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5udW1iZXJPZktub3duV3JhcEdyb3VwQ2hpbGRTaXplcztcclxuXHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkV2lkdGhzICs9IG9sZFdyYXBHcm91cERpbWVuc2lvbi5jaGlsZFdpZHRoIHx8IDA7XHJcblx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZEhlaWdodHMgKz0gb2xkV3JhcEdyb3VwRGltZW5zaW9uLmNoaWxkSGVpZ2h0IHx8IDA7XHJcblx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFt3cmFwR3JvdXBJbmRleF0gPSBvbGRXcmFwR3JvdXBEaW1lbnNpb247XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjYWxjdWxhdGVEaW1lbnNpb25zKCk6IElEaW1lbnNpb25zIHtcclxuXHRcdGxldCBzY3JvbGxFbGVtZW50ID0gdGhpcy5nZXRTY3JvbGxFbGVtZW50KCk7XHJcblxyXG5cdFx0Y29uc3QgbWF4Q2FsY3VsYXRlZFNjcm9sbEJhclNpemU6IG51bWJlciA9IDI1OyAvLyBOb3RlOiBGb3JtdWxhIHRvIGF1dG8tY2FsY3VsYXRlIGRvZXNuJ3Qgd29yayBmb3IgUGFyZW50U2Nyb2xsLCBzbyB3ZSBkZWZhdWx0IHRvIHRoaXMgaWYgbm90IHNldCBieSBjb25zdW1pbmcgYXBwbGljYXRpb25cclxuXHRcdHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhckhlaWdodCA9IE1hdGgubWF4KE1hdGgubWluKHNjcm9sbEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gc2Nyb2xsRWxlbWVudC5jbGllbnRIZWlnaHQsIG1heENhbGN1bGF0ZWRTY3JvbGxCYXJTaXplKSwgdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0KTtcclxuXHRcdHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoID0gTWF0aC5tYXgoTWF0aC5taW4oc2Nyb2xsRWxlbWVudC5vZmZzZXRXaWR0aCAtIHNjcm9sbEVsZW1lbnQuY2xpZW50V2lkdGgsIG1heENhbGN1bGF0ZWRTY3JvbGxCYXJTaXplKSwgdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGgpO1xyXG5cclxuXHRcdGxldCB2aWV3cG9ydFdpZHRoID0gc2Nyb2xsRWxlbWVudC5vZmZzZXRXaWR0aCAtICh0aGlzLnNjcm9sbGJhcldpZHRoIHx8IHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoIHx8ICh0aGlzLmhvcml6b250YWwgPyAwIDogbWF4Q2FsY3VsYXRlZFNjcm9sbEJhclNpemUpKTtcclxuXHRcdGxldCB2aWV3cG9ydEhlaWdodCA9IHNjcm9sbEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gKHRoaXMuc2Nyb2xsYmFySGVpZ2h0IHx8IHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhckhlaWdodCB8fCAodGhpcy5ob3Jpem9udGFsID8gbWF4Q2FsY3VsYXRlZFNjcm9sbEJhclNpemUgOiAwKSk7XHJcblxyXG5cdFx0bGV0IGNvbnRlbnQgPSAodGhpcy5jb250YWluZXJFbGVtZW50UmVmICYmIHRoaXMuY29udGFpbmVyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB8fCB0aGlzLmNvbnRlbnRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG5cdFx0bGV0IGl0ZW1zUGVyV3JhcEdyb3VwID0gdGhpcy5jb3VudEl0ZW1zUGVyV3JhcEdyb3VwKCk7XHJcblx0XHRsZXQgd3JhcEdyb3Vwc1BlclBhZ2U7XHJcblxyXG5cdFx0bGV0IGRlZmF1bHRDaGlsZFdpZHRoO1xyXG5cdFx0bGV0IGRlZmF1bHRDaGlsZEhlaWdodDtcclxuXHJcblx0XHRpZiAodGhpcy5pc0FuZ3VsYXJVbml2ZXJzYWxTU1IpIHtcclxuXHRcdFx0dmlld3BvcnRXaWR0aCA9IHRoaXMuc3NyVmlld3BvcnRXaWR0aDtcclxuXHRcdFx0dmlld3BvcnRIZWlnaHQgPSB0aGlzLnNzclZpZXdwb3J0SGVpZ2h0O1xyXG5cdFx0XHRkZWZhdWx0Q2hpbGRXaWR0aCA9IHRoaXMuc3NyQ2hpbGRXaWR0aDtcclxuXHRcdFx0ZGVmYXVsdENoaWxkSGVpZ2h0ID0gdGhpcy5zc3JDaGlsZEhlaWdodDtcclxuXHRcdFx0bGV0IGl0ZW1zUGVyUm93ID0gTWF0aC5tYXgoTWF0aC5jZWlsKHZpZXdwb3J0V2lkdGggLyBkZWZhdWx0Q2hpbGRXaWR0aCksIDEpO1xyXG5cdFx0XHRsZXQgaXRlbXNQZXJDb2wgPSBNYXRoLm1heChNYXRoLmNlaWwodmlld3BvcnRIZWlnaHQgLyBkZWZhdWx0Q2hpbGRIZWlnaHQpLCAxKTtcclxuXHRcdFx0d3JhcEdyb3Vwc1BlclBhZ2UgPSB0aGlzLmhvcml6b250YWwgPyBpdGVtc1BlclJvdyA6IGl0ZW1zUGVyQ29sO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoIXRoaXMuZW5hYmxlVW5lcXVhbENoaWxkcmVuU2l6ZXMpIHtcclxuXHRcdFx0aWYgKGNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGlmICghdGhpcy5jaGlsZFdpZHRoIHx8ICF0aGlzLmNoaWxkSGVpZ2h0KSB7XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMubWluTWVhc3VyZWRDaGlsZFdpZHRoICYmIHZpZXdwb3J0V2lkdGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMubWluTWVhc3VyZWRDaGlsZFdpZHRoID0gdmlld3BvcnRXaWR0aDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICghdGhpcy5taW5NZWFzdXJlZENoaWxkSGVpZ2h0ICYmIHZpZXdwb3J0SGVpZ2h0ID4gMCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGxldCBjaGlsZCA9IGNvbnRlbnQuY2hpbGRyZW5bMF07XHJcblx0XHRcdFx0bGV0IGNsaWVudFJlY3QgPSB0aGlzLmdldEVsZW1lbnRTaXplKGNoaWxkKTtcclxuXHRcdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRXaWR0aCA9IE1hdGgubWluKHRoaXMubWluTWVhc3VyZWRDaGlsZFdpZHRoLCBjbGllbnRSZWN0LndpZHRoKTtcclxuXHRcdFx0XHR0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgPSBNYXRoLm1pbih0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQsIGNsaWVudFJlY3QuaGVpZ2h0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZGVmYXVsdENoaWxkV2lkdGggPSB0aGlzLmNoaWxkV2lkdGggfHwgdGhpcy5taW5NZWFzdXJlZENoaWxkV2lkdGggfHwgdmlld3BvcnRXaWR0aDtcclxuXHRcdFx0ZGVmYXVsdENoaWxkSGVpZ2h0ID0gdGhpcy5jaGlsZEhlaWdodCB8fCB0aGlzLm1pbk1lYXN1cmVkQ2hpbGRIZWlnaHQgfHwgdmlld3BvcnRIZWlnaHQ7XHJcblx0XHRcdGxldCBpdGVtc1BlclJvdyA9IE1hdGgubWF4KE1hdGguY2VpbCh2aWV3cG9ydFdpZHRoIC8gZGVmYXVsdENoaWxkV2lkdGgpLCAxKTtcclxuXHRcdFx0bGV0IGl0ZW1zUGVyQ29sID0gTWF0aC5tYXgoTWF0aC5jZWlsKHZpZXdwb3J0SGVpZ2h0IC8gZGVmYXVsdENoaWxkSGVpZ2h0KSwgMSk7XHJcblx0XHRcdHdyYXBHcm91cHNQZXJQYWdlID0gdGhpcy5ob3Jpem9udGFsID8gaXRlbXNQZXJSb3cgOiBpdGVtc1BlckNvbDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBzY3JvbGxPZmZzZXQgPSBzY3JvbGxFbGVtZW50W3RoaXMuX3Njcm9sbFR5cGVdIC0gKHRoaXMucHJldmlvdXNWaWV3UG9ydCA/IHRoaXMucHJldmlvdXNWaWV3UG9ydC5wYWRkaW5nIDogMCk7XHJcblxyXG5cdFx0XHRsZXQgYXJyYXlTdGFydEluZGV4ID0gdGhpcy5wcmV2aW91c1ZpZXdQb3J0LnN0YXJ0SW5kZXhXaXRoQnVmZmVyIHx8IDA7XHJcblx0XHRcdGxldCB3cmFwR3JvdXBJbmRleCA9IE1hdGguY2VpbChhcnJheVN0YXJ0SW5kZXggLyBpdGVtc1BlcldyYXBHcm91cCk7XHJcblxyXG5cdFx0XHRsZXQgbWF4V2lkdGhGb3JXcmFwR3JvdXAgPSAwO1xyXG5cdFx0XHRsZXQgbWF4SGVpZ2h0Rm9yV3JhcEdyb3VwID0gMDtcclxuXHRcdFx0bGV0IHN1bU9mVmlzaWJsZU1heFdpZHRocyA9IDA7XHJcblx0XHRcdGxldCBzdW1PZlZpc2libGVNYXhIZWlnaHRzID0gMDtcclxuXHRcdFx0d3JhcEdyb3Vwc1BlclBhZ2UgPSAwO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XHJcblx0XHRcdFx0KythcnJheVN0YXJ0SW5kZXg7XHJcblx0XHRcdFx0bGV0IGNoaWxkID0gY29udGVudC5jaGlsZHJlbltpXTtcclxuXHRcdFx0XHRsZXQgY2xpZW50UmVjdCA9IHRoaXMuZ2V0RWxlbWVudFNpemUoY2hpbGQpO1xyXG5cclxuXHRcdFx0XHRtYXhXaWR0aEZvcldyYXBHcm91cCA9IE1hdGgubWF4KG1heFdpZHRoRm9yV3JhcEdyb3VwLCBjbGllbnRSZWN0LndpZHRoKTtcclxuXHRcdFx0XHRtYXhIZWlnaHRGb3JXcmFwR3JvdXAgPSBNYXRoLm1heChtYXhIZWlnaHRGb3JXcmFwR3JvdXAsIGNsaWVudFJlY3QuaGVpZ2h0KTtcclxuXHJcblx0XHRcdFx0aWYgKGFycmF5U3RhcnRJbmRleCAlIGl0ZW1zUGVyV3JhcEdyb3VwID09PSAwKSB7XHJcblx0XHRcdFx0XHRsZXQgb2xkVmFsdWUgPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW3dyYXBHcm91cEluZGV4XTtcclxuXHRcdFx0XHRcdGlmIChvbGRWYWx1ZSkge1xyXG5cdFx0XHRcdFx0XHQtLXRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5udW1iZXJPZktub3duV3JhcEdyb3VwQ2hpbGRTaXplcztcclxuXHRcdFx0XHRcdFx0dGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZFdpZHRocyAtPSBvbGRWYWx1ZS5jaGlsZFdpZHRoIHx8IDA7XHJcblx0XHRcdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRIZWlnaHRzIC09IG9sZFZhbHVlLmNoaWxkSGVpZ2h0IHx8IDA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Kyt0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXM7XHJcblx0XHRcdFx0XHRjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMuc2xpY2UoYXJyYXlTdGFydEluZGV4IC0gaXRlbXNQZXJXcmFwR3JvdXAsIGFycmF5U3RhcnRJbmRleCk7XHJcblx0XHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW3dyYXBHcm91cEluZGV4XSA9IHtcclxuXHRcdFx0XHRcdFx0Y2hpbGRXaWR0aDogbWF4V2lkdGhGb3JXcmFwR3JvdXAsXHJcblx0XHRcdFx0XHRcdGNoaWxkSGVpZ2h0OiBtYXhIZWlnaHRGb3JXcmFwR3JvdXAsXHJcblx0XHRcdFx0XHRcdGl0ZW1zOiBpdGVtc1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdHRoaXMud3JhcEdyb3VwRGltZW5zaW9ucy5zdW1PZktub3duV3JhcEdyb3VwQ2hpbGRXaWR0aHMgKz0gbWF4V2lkdGhGb3JXcmFwR3JvdXA7XHJcblx0XHRcdFx0XHR0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkSGVpZ2h0cyArPSBtYXhIZWlnaHRGb3JXcmFwR3JvdXA7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuaG9yaXpvbnRhbCkge1xyXG5cdFx0XHRcdFx0XHRsZXQgbWF4VmlzaWJsZVdpZHRoRm9yV3JhcEdyb3VwID0gTWF0aC5taW4obWF4V2lkdGhGb3JXcmFwR3JvdXAsIE1hdGgubWF4KHZpZXdwb3J0V2lkdGggLSBzdW1PZlZpc2libGVNYXhXaWR0aHMsIDApKTtcclxuXHRcdFx0XHRcdFx0aWYgKHNjcm9sbE9mZnNldCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRsZXQgc2Nyb2xsT2Zmc2V0VG9SZW1vdmUgPSBNYXRoLm1pbihzY3JvbGxPZmZzZXQsIG1heFZpc2libGVXaWR0aEZvcldyYXBHcm91cCk7XHJcblx0XHRcdFx0XHRcdFx0bWF4VmlzaWJsZVdpZHRoRm9yV3JhcEdyb3VwIC09IHNjcm9sbE9mZnNldFRvUmVtb3ZlO1xyXG5cdFx0XHRcdFx0XHRcdHNjcm9sbE9mZnNldCAtPSBzY3JvbGxPZmZzZXRUb1JlbW92ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0c3VtT2ZWaXNpYmxlTWF4V2lkdGhzICs9IG1heFZpc2libGVXaWR0aEZvcldyYXBHcm91cDtcclxuXHRcdFx0XHRcdFx0aWYgKG1heFZpc2libGVXaWR0aEZvcldyYXBHcm91cCA+IDAgJiYgdmlld3BvcnRXaWR0aCA+PSBzdW1PZlZpc2libGVNYXhXaWR0aHMpIHtcclxuXHRcdFx0XHRcdFx0XHQrK3dyYXBHcm91cHNQZXJQYWdlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRsZXQgbWF4VmlzaWJsZUhlaWdodEZvcldyYXBHcm91cCA9IE1hdGgubWluKG1heEhlaWdodEZvcldyYXBHcm91cCwgTWF0aC5tYXgodmlld3BvcnRIZWlnaHQgLSBzdW1PZlZpc2libGVNYXhIZWlnaHRzLCAwKSk7XHJcblx0XHRcdFx0XHRcdGlmIChzY3JvbGxPZmZzZXQgPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IHNjcm9sbE9mZnNldFRvUmVtb3ZlID0gTWF0aC5taW4oc2Nyb2xsT2Zmc2V0LCBtYXhWaXNpYmxlSGVpZ2h0Rm9yV3JhcEdyb3VwKTtcclxuXHRcdFx0XHRcdFx0XHRtYXhWaXNpYmxlSGVpZ2h0Rm9yV3JhcEdyb3VwIC09IHNjcm9sbE9mZnNldFRvUmVtb3ZlO1xyXG5cdFx0XHRcdFx0XHRcdHNjcm9sbE9mZnNldCAtPSBzY3JvbGxPZmZzZXRUb1JlbW92ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0c3VtT2ZWaXNpYmxlTWF4SGVpZ2h0cyArPSBtYXhWaXNpYmxlSGVpZ2h0Rm9yV3JhcEdyb3VwO1xyXG5cdFx0XHRcdFx0XHRpZiAobWF4VmlzaWJsZUhlaWdodEZvcldyYXBHcm91cCA+IDAgJiYgdmlld3BvcnRIZWlnaHQgPj0gc3VtT2ZWaXNpYmxlTWF4SGVpZ2h0cykge1xyXG5cdFx0XHRcdFx0XHRcdCsrd3JhcEdyb3Vwc1BlclBhZ2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQrK3dyYXBHcm91cEluZGV4O1xyXG5cclxuXHRcdFx0XHRcdG1heFdpZHRoRm9yV3JhcEdyb3VwID0gMDtcclxuXHRcdFx0XHRcdG1heEhlaWdodEZvcldyYXBHcm91cCA9IDA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgYXZlcmFnZUNoaWxkV2lkdGggPSB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMuc3VtT2ZLbm93bldyYXBHcm91cENoaWxkV2lkdGhzIC8gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm51bWJlck9mS25vd25XcmFwR3JvdXBDaGlsZFNpemVzO1xyXG5cdFx0XHRsZXQgYXZlcmFnZUNoaWxkSGVpZ2h0ID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLnN1bU9mS25vd25XcmFwR3JvdXBDaGlsZEhlaWdodHMgLyB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubnVtYmVyT2ZLbm93bldyYXBHcm91cENoaWxkU2l6ZXM7XHJcblx0XHRcdGRlZmF1bHRDaGlsZFdpZHRoID0gdGhpcy5jaGlsZFdpZHRoIHx8IGF2ZXJhZ2VDaGlsZFdpZHRoIHx8IHZpZXdwb3J0V2lkdGg7XHJcblx0XHRcdGRlZmF1bHRDaGlsZEhlaWdodCA9IHRoaXMuY2hpbGRIZWlnaHQgfHwgYXZlcmFnZUNoaWxkSGVpZ2h0IHx8IHZpZXdwb3J0SGVpZ2h0O1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuaG9yaXpvbnRhbCkge1xyXG5cdFx0XHRcdGlmICh2aWV3cG9ydFdpZHRoID4gc3VtT2ZWaXNpYmxlTWF4V2lkdGhzKSB7XHJcblx0XHRcdFx0XHR3cmFwR3JvdXBzUGVyUGFnZSArPSBNYXRoLmNlaWwoKHZpZXdwb3J0V2lkdGggLSBzdW1PZlZpc2libGVNYXhXaWR0aHMpIC8gZGVmYXVsdENoaWxkV2lkdGgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodmlld3BvcnRIZWlnaHQgPiBzdW1PZlZpc2libGVNYXhIZWlnaHRzKSB7XHJcblx0XHRcdFx0XHR3cmFwR3JvdXBzUGVyUGFnZSArPSBNYXRoLmNlaWwoKHZpZXdwb3J0SGVpZ2h0IC0gc3VtT2ZWaXNpYmxlTWF4SGVpZ2h0cykgLyBkZWZhdWx0Q2hpbGRIZWlnaHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBpdGVtQ291bnQgPSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuXHRcdGxldCBpdGVtc1BlclBhZ2UgPSBpdGVtc1BlcldyYXBHcm91cCAqIHdyYXBHcm91cHNQZXJQYWdlO1xyXG5cdFx0bGV0IHBhZ2VDb3VudF9mcmFjdGlvbmFsID0gaXRlbUNvdW50IC8gaXRlbXNQZXJQYWdlO1xyXG5cdFx0bGV0IG51bWJlck9mV3JhcEdyb3VwcyA9IE1hdGguY2VpbChpdGVtQ291bnQgLyBpdGVtc1BlcldyYXBHcm91cCk7XHJcblxyXG5cdFx0bGV0IHNjcm9sbExlbmd0aCA9IDA7XHJcblxyXG5cdFx0bGV0IGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXAgPSB0aGlzLmhvcml6b250YWwgPyBkZWZhdWx0Q2hpbGRXaWR0aCA6IGRlZmF1bHRDaGlsZEhlaWdodDtcclxuXHRcdGlmICh0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzKSB7XHJcblx0XHRcdGxldCBudW1Vbmtub3duQ2hpbGRTaXplcyA9IDA7XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZXcmFwR3JvdXBzOyArK2kpIHtcclxuXHRcdFx0XHRsZXQgY2hpbGRTaXplID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpXSAmJiB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2ldW3RoaXMuX2NoaWxkU2Nyb2xsRGltXTtcclxuXHRcdFx0XHRpZiAoY2hpbGRTaXplKSB7XHJcblx0XHRcdFx0XHRzY3JvbGxMZW5ndGggKz0gY2hpbGRTaXplO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQrK251bVVua25vd25DaGlsZFNpemVzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2Nyb2xsTGVuZ3RoICs9IE1hdGgucm91bmQobnVtVW5rbm93bkNoaWxkU2l6ZXMgKiBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNjcm9sbExlbmd0aCA9IG51bWJlck9mV3JhcEdyb3VwcyAqIGRlZmF1bHRTY3JvbGxMZW5ndGhQZXJXcmFwR3JvdXA7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuaGVhZGVyRWxlbWVudFJlZikge1xyXG5cdFx0XHRzY3JvbGxMZW5ndGggKz0gdGhpcy5oZWFkZXJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB2aWV3cG9ydExlbmd0aCA9IHRoaXMuaG9yaXpvbnRhbCA/IHZpZXdwb3J0V2lkdGggOiB2aWV3cG9ydEhlaWdodDtcclxuXHRcdGxldCBtYXhTY3JvbGxQb3NpdGlvbiA9IE1hdGgubWF4KHNjcm9sbExlbmd0aCAtIHZpZXdwb3J0TGVuZ3RoLCAwKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRpdGVtQ291bnQ6IGl0ZW1Db3VudCxcclxuXHRcdFx0aXRlbXNQZXJXcmFwR3JvdXA6IGl0ZW1zUGVyV3JhcEdyb3VwLFxyXG5cdFx0XHR3cmFwR3JvdXBzUGVyUGFnZTogd3JhcEdyb3Vwc1BlclBhZ2UsXHJcblx0XHRcdGl0ZW1zUGVyUGFnZTogaXRlbXNQZXJQYWdlLFxyXG5cdFx0XHRwYWdlQ291bnRfZnJhY3Rpb25hbDogcGFnZUNvdW50X2ZyYWN0aW9uYWwsXHJcblx0XHRcdGNoaWxkV2lkdGg6IGRlZmF1bHRDaGlsZFdpZHRoLFxyXG5cdFx0XHRjaGlsZEhlaWdodDogZGVmYXVsdENoaWxkSGVpZ2h0LFxyXG5cdFx0XHRzY3JvbGxMZW5ndGg6IHNjcm9sbExlbmd0aCxcclxuXHRcdFx0dmlld3BvcnRMZW5ndGg6IHZpZXdwb3J0TGVuZ3RoLFxyXG5cdFx0XHRtYXhTY3JvbGxQb3NpdGlvbjogbWF4U2Nyb2xsUG9zaXRpb25cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2FjaGVkUGFnZVNpemU6IG51bWJlciA9IDA7XHJcblx0cHJvdGVjdGVkIHByZXZpb3VzU2Nyb2xsTnVtYmVyRWxlbWVudHM6IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBjYWxjdWxhdGVQYWRkaW5nKGFycmF5U3RhcnRJbmRleFdpdGhCdWZmZXI6IG51bWJlciwgZGltZW5zaW9uczogSURpbWVuc2lvbnMpOiBudW1iZXIge1xyXG5cdFx0aWYgKGRpbWVuc2lvbnMuaXRlbUNvdW50ID09PSAwKSB7XHJcblx0XHRcdHJldHVybiAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwID0gZGltZW5zaW9uc1t0aGlzLl9jaGlsZFNjcm9sbERpbV07XHJcblx0XHRsZXQgc3RhcnRpbmdXcmFwR3JvdXBJbmRleCA9IE1hdGguZmxvb3IoYXJyYXlTdGFydEluZGV4V2l0aEJ1ZmZlciAvIGRpbWVuc2lvbnMuaXRlbXNQZXJXcmFwR3JvdXApIHx8IDA7XHJcblxyXG5cdFx0aWYgKCF0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzKSB7XHJcblx0XHRcdHJldHVybiBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwICogc3RhcnRpbmdXcmFwR3JvdXBJbmRleDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbnVtVW5rbm93bkNoaWxkU2l6ZXMgPSAwO1xyXG5cdFx0bGV0IHJlc3VsdCA9IDA7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJ0aW5nV3JhcEdyb3VwSW5kZXg7ICsraSkge1xyXG5cdFx0XHRsZXQgY2hpbGRTaXplID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpXSAmJiB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2ldW3RoaXMuX2NoaWxkU2Nyb2xsRGltXTtcclxuXHRcdFx0aWYgKGNoaWxkU2l6ZSkge1xyXG5cdFx0XHRcdHJlc3VsdCArPSBjaGlsZFNpemU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0KytudW1Vbmtub3duQ2hpbGRTaXplcztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmVzdWx0ICs9IE1hdGgucm91bmQobnVtVW5rbm93bkNoaWxkU2l6ZXMgKiBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwKTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNhbGN1bGF0ZVBhZ2VJbmZvKHNjcm9sbFBvc2l0aW9uOiBudW1iZXIsIGRpbWVuc2lvbnM6IElEaW1lbnNpb25zKTogSVBhZ2VJbmZvIHtcclxuXHRcdGxldCBzY3JvbGxQZXJjZW50YWdlID0gMDtcclxuXHRcdGlmICh0aGlzLmVuYWJsZVVuZXF1YWxDaGlsZHJlblNpemVzKSB7XHJcblx0XHRcdGNvbnN0IG51bWJlck9mV3JhcEdyb3VwcyA9IE1hdGguY2VpbChkaW1lbnNpb25zLml0ZW1Db3VudCAvIGRpbWVuc2lvbnMuaXRlbXNQZXJXcmFwR3JvdXApO1xyXG5cdFx0XHRsZXQgdG90YWxTY3JvbGxlZExlbmd0aCA9IDA7XHJcblx0XHRcdGxldCBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwID0gZGltZW5zaW9uc1t0aGlzLl9jaGlsZFNjcm9sbERpbV07XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZXcmFwR3JvdXBzOyArK2kpIHtcclxuXHRcdFx0XHRsZXQgY2hpbGRTaXplID0gdGhpcy53cmFwR3JvdXBEaW1lbnNpb25zLm1heENoaWxkU2l6ZVBlcldyYXBHcm91cFtpXSAmJiB0aGlzLndyYXBHcm91cERpbWVuc2lvbnMubWF4Q2hpbGRTaXplUGVyV3JhcEdyb3VwW2ldW3RoaXMuX2NoaWxkU2Nyb2xsRGltXTtcclxuXHRcdFx0XHRpZiAoY2hpbGRTaXplKSB7XHJcblx0XHRcdFx0XHR0b3RhbFNjcm9sbGVkTGVuZ3RoICs9IGNoaWxkU2l6ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dG90YWxTY3JvbGxlZExlbmd0aCArPSBkZWZhdWx0U2Nyb2xsTGVuZ3RoUGVyV3JhcEdyb3VwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHNjcm9sbFBvc2l0aW9uIDwgdG90YWxTY3JvbGxlZExlbmd0aCkge1xyXG5cdFx0XHRcdFx0c2Nyb2xsUGVyY2VudGFnZSA9IGkgLyBudW1iZXJPZldyYXBHcm91cHM7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNjcm9sbFBlcmNlbnRhZ2UgPSBzY3JvbGxQb3NpdGlvbiAvIGRpbWVuc2lvbnMuc2Nyb2xsTGVuZ3RoO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBzdGFydGluZ0FycmF5SW5kZXhfZnJhY3Rpb25hbCA9IE1hdGgubWluKE1hdGgubWF4KHNjcm9sbFBlcmNlbnRhZ2UgKiBkaW1lbnNpb25zLnBhZ2VDb3VudF9mcmFjdGlvbmFsLCAwKSwgZGltZW5zaW9ucy5wYWdlQ291bnRfZnJhY3Rpb25hbCkgKiBkaW1lbnNpb25zLml0ZW1zUGVyUGFnZTtcclxuXHJcblx0XHRsZXQgbWF4U3RhcnQgPSBkaW1lbnNpb25zLml0ZW1Db3VudCAtIGRpbWVuc2lvbnMuaXRlbXNQZXJQYWdlIC0gMTtcclxuXHRcdGxldCBhcnJheVN0YXJ0SW5kZXggPSBNYXRoLm1pbihNYXRoLmZsb29yKHN0YXJ0aW5nQXJyYXlJbmRleF9mcmFjdGlvbmFsKSwgbWF4U3RhcnQpO1xyXG5cdFx0YXJyYXlTdGFydEluZGV4IC09IGFycmF5U3RhcnRJbmRleCAlIGRpbWVuc2lvbnMuaXRlbXNQZXJXcmFwR3JvdXA7IC8vIHJvdW5kIGRvd24gdG8gc3RhcnQgb2Ygd3JhcEdyb3VwXHJcblxyXG5cdFx0aWYgKHRoaXMuc3RyaXBlZFRhYmxlKSB7XHJcblx0XHRcdGxldCBidWZmZXJCb3VuZGFyeSA9IDIgKiBkaW1lbnNpb25zLml0ZW1zUGVyV3JhcEdyb3VwO1xyXG5cdFx0XHRpZiAoYXJyYXlTdGFydEluZGV4ICUgYnVmZmVyQm91bmRhcnkgIT09IDApIHtcclxuXHRcdFx0XHRhcnJheVN0YXJ0SW5kZXggPSBNYXRoLm1heChhcnJheVN0YXJ0SW5kZXggLSBhcnJheVN0YXJ0SW5kZXggJSBidWZmZXJCb3VuZGFyeSwgMCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYXJyYXlFbmRJbmRleCA9IE1hdGguY2VpbChzdGFydGluZ0FycmF5SW5kZXhfZnJhY3Rpb25hbCkgKyBkaW1lbnNpb25zLml0ZW1zUGVyUGFnZSAtIDE7XHJcblx0XHRsZXQgZW5kSW5kZXhXaXRoaW5XcmFwR3JvdXAgPSAoYXJyYXlFbmRJbmRleCArIDEpICUgZGltZW5zaW9ucy5pdGVtc1BlcldyYXBHcm91cDtcclxuXHRcdGlmIChlbmRJbmRleFdpdGhpbldyYXBHcm91cCA+IDApIHtcclxuXHRcdFx0YXJyYXlFbmRJbmRleCArPSBkaW1lbnNpb25zLml0ZW1zUGVyV3JhcEdyb3VwIC0gZW5kSW5kZXhXaXRoaW5XcmFwR3JvdXA7IC8vIHJvdW5kIHVwIHRvIGVuZCBvZiB3cmFwR3JvdXBcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaXNOYU4oYXJyYXlTdGFydEluZGV4KSkge1xyXG5cdFx0XHRhcnJheVN0YXJ0SW5kZXggPSAwO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGlzTmFOKGFycmF5RW5kSW5kZXgpKSB7XHJcblx0XHRcdGFycmF5RW5kSW5kZXggPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFycmF5U3RhcnRJbmRleCA9IE1hdGgubWluKE1hdGgubWF4KGFycmF5U3RhcnRJbmRleCwgMCksIGRpbWVuc2lvbnMuaXRlbUNvdW50IC0gMSk7XHJcblx0XHRhcnJheUVuZEluZGV4ID0gTWF0aC5taW4oTWF0aC5tYXgoYXJyYXlFbmRJbmRleCwgMCksIGRpbWVuc2lvbnMuaXRlbUNvdW50IC0gMSk7XHJcblxyXG5cdFx0bGV0IGJ1ZmZlclNpemUgPSB0aGlzLmJ1ZmZlckFtb3VudCAqIGRpbWVuc2lvbnMuaXRlbXNQZXJXcmFwR3JvdXA7XHJcblx0XHRsZXQgc3RhcnRJbmRleFdpdGhCdWZmZXIgPSBNYXRoLm1pbihNYXRoLm1heChhcnJheVN0YXJ0SW5kZXggLSBidWZmZXJTaXplLCAwKSwgZGltZW5zaW9ucy5pdGVtQ291bnQgLSAxKTtcclxuXHRcdGxldCBlbmRJbmRleFdpdGhCdWZmZXIgPSBNYXRoLm1pbihNYXRoLm1heChhcnJheUVuZEluZGV4ICsgYnVmZmVyU2l6ZSwgMCksIGRpbWVuc2lvbnMuaXRlbUNvdW50IC0gMSk7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhcnRJbmRleDogYXJyYXlTdGFydEluZGV4LFxyXG5cdFx0XHRlbmRJbmRleDogYXJyYXlFbmRJbmRleCxcclxuXHRcdFx0c3RhcnRJbmRleFdpdGhCdWZmZXI6IHN0YXJ0SW5kZXhXaXRoQnVmZmVyLFxyXG5cdFx0XHRlbmRJbmRleFdpdGhCdWZmZXI6IGVuZEluZGV4V2l0aEJ1ZmZlcixcclxuXHRcdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbjogc2Nyb2xsUG9zaXRpb24sXHJcblx0XHRcdHNjcm9sbEVuZFBvc2l0aW9uOiBzY3JvbGxQb3NpdGlvbiArIGRpbWVuc2lvbnMudmlld3BvcnRMZW5ndGgsXHJcblx0XHRcdG1heFNjcm9sbFBvc2l0aW9uOiBkaW1lbnNpb25zLm1heFNjcm9sbFBvc2l0aW9uXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNhbGN1bGF0ZVZpZXdwb3J0KCk6IElWaWV3cG9ydCB7XHJcblx0XHRsZXQgZGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucygpO1xyXG5cdFx0bGV0IG9mZnNldCA9IHRoaXMuZ2V0RWxlbWVudHNPZmZzZXQoKTtcclxuXHJcblx0XHRsZXQgc2Nyb2xsU3RhcnRQb3NpdGlvbiA9IHRoaXMuZ2V0U2Nyb2xsU3RhcnRQb3NpdGlvbigpO1xyXG5cdFx0aWYgKHNjcm9sbFN0YXJ0UG9zaXRpb24gPiAoZGltZW5zaW9ucy5zY3JvbGxMZW5ndGggKyBvZmZzZXQpICYmICEodGhpcy5wYXJlbnRTY3JvbGwgaW5zdGFuY2VvZiBXaW5kb3cpKSB7XHJcblx0XHRcdHNjcm9sbFN0YXJ0UG9zaXRpb24gPSBkaW1lbnNpb25zLnNjcm9sbExlbmd0aDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNjcm9sbFN0YXJ0UG9zaXRpb24gLT0gb2Zmc2V0O1xyXG5cdFx0fVxyXG5cdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbiA9IE1hdGgubWF4KDAsIHNjcm9sbFN0YXJ0UG9zaXRpb24pO1xyXG5cclxuXHRcdGxldCBwYWdlSW5mbyA9IHRoaXMuY2FsY3VsYXRlUGFnZUluZm8oc2Nyb2xsU3RhcnRQb3NpdGlvbiwgZGltZW5zaW9ucyk7XHJcblx0XHRsZXQgbmV3UGFkZGluZyA9IHRoaXMuY2FsY3VsYXRlUGFkZGluZyhwYWdlSW5mby5zdGFydEluZGV4V2l0aEJ1ZmZlciwgZGltZW5zaW9ucyk7XHJcblx0XHRsZXQgbmV3U2Nyb2xsTGVuZ3RoID0gZGltZW5zaW9ucy5zY3JvbGxMZW5ndGg7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhcnRJbmRleDogcGFnZUluZm8uc3RhcnRJbmRleCxcclxuXHRcdFx0ZW5kSW5kZXg6IHBhZ2VJbmZvLmVuZEluZGV4LFxyXG5cdFx0XHRzdGFydEluZGV4V2l0aEJ1ZmZlcjogcGFnZUluZm8uc3RhcnRJbmRleFdpdGhCdWZmZXIsXHJcblx0XHRcdGVuZEluZGV4V2l0aEJ1ZmZlcjogcGFnZUluZm8uZW5kSW5kZXhXaXRoQnVmZmVyLFxyXG5cdFx0XHRwYWRkaW5nOiBNYXRoLnJvdW5kKG5ld1BhZGRpbmcpLFxyXG5cdFx0XHRzY3JvbGxMZW5ndGg6IE1hdGgucm91bmQobmV3U2Nyb2xsTGVuZ3RoKSxcclxuXHRcdFx0c2Nyb2xsU3RhcnRQb3NpdGlvbjogcGFnZUluZm8uc2Nyb2xsU3RhcnRQb3NpdGlvbixcclxuXHRcdFx0c2Nyb2xsRW5kUG9zaXRpb246IHBhZ2VJbmZvLnNjcm9sbEVuZFBvc2l0aW9uLFxyXG5cdFx0XHRtYXhTY3JvbGxQb3NpdGlvbjogcGFnZUluZm8ubWF4U2Nyb2xsUG9zaXRpb25cclxuXHRcdH07XHJcblx0fVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG5cdGV4cG9ydHM6IFtWaXJ0dWFsU2Nyb2xsZXJDb21wb25lbnRdLFxyXG5cdGRlY2xhcmF0aW9uczogW1ZpcnR1YWxTY3JvbGxlckNvbXBvbmVudF0sXHJcblx0aW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcblx0cHJvdmlkZXJzOiBbXHJcblx0XHR7XHJcblx0XHRcdHByb3ZpZGU6ICd2aXJ0dWFsLXNjcm9sbGVyLWRlZmF1bHQtb3B0aW9ucycsXHJcblx0XHRcdHVzZUZhY3Rvcnk6IFZJUlRVQUxfU0NST0xMRVJfREVGQVVMVF9PUFRJT05TX0ZBQ1RPUllcclxuXHRcdH1cclxuXHRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsZXJNb2R1bGUgeyB9Il19