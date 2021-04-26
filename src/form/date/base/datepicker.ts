import { Calendar } from './calendar';
import { DateTime } from './datetime';
import { ILPConfiguration } from './interfaces';
import * as style from './scss/main';
import { dateIsLocked, findNestedMonthItem, rangeIsLocked } from './utils';

export class Datepicker extends Calendar {
    public preventClick = false;
    protected triggerElement;
    protected backdrop;

    constructor(options: ILPConfiguration) {
        super(options);
        this.bindEvents();
    }

    protected scrollToDate(el) {
        if (this.options.scrollToDate) {
            const startDate = this.options.startDate instanceof DateTime ? this.options.startDate.clone() : null;
            const endDate = this.options.endDate instanceof DateTime ? this.options.endDate.clone() : null;

            if (this.options.startDate && (!el || el === this.options.element)) {
                startDate.setDate(1);
                this.calendars[0] = startDate.clone();
            } else if (el && this.options.endDate && el === this.options.elementEnd) {
                endDate.setDate(1);
                if (this.options.numberOfMonths > 1 && endDate.isAfter(startDate)) {
                    endDate.setMonth(endDate.getMonth() - (this.options.numberOfMonths - 1));
                }
                this.calendars[0] = endDate.clone();
            }
        }
    }

    private bindEvents() {
        document.addEventListener('click', this.onClick.bind(this), true);

        this.ui = document.createElement('div');
        this.ui.className = style.datepicker;
        this.ui.style.display = 'none';
        this.ui.addEventListener('mouseenter', this.onMouseEnter.bind(this), true);
        this.ui.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);

        if (this.options.autoRefresh) {
            if (this.options.element instanceof HTMLElement) {
                this.options.element.addEventListener('keyup', this.onInput.bind(this), true);
            }
            if (this.options.elementEnd instanceof HTMLElement) {
                this.options.elementEnd.addEventListener('keyup', this.onInput.bind(this), true);
            }
        } else {
            if (this.options.element instanceof HTMLElement) {
                this.options.element.addEventListener('change', this.onInput.bind(this), true);
            }
            if (this.options.elementEnd instanceof HTMLElement) {
                this.options.elementEnd.addEventListener('change', this.onInput.bind(this), true);
            }
        }

        if (this.options.parentEl) {
            if (this.options.parentEl instanceof HTMLElement) {
                this.options.parentEl.appendChild(this.ui);
            } else {
                (document.querySelector(this.options.parentEl) as HTMLElement).appendChild(this.ui);
            }
        } else {
            if (this.options.inlineMode) {
                if (this.options.element instanceof HTMLInputElement) {
                    this.options.element.parentNode.appendChild(this.ui);
                } else {
                    this.options.element.appendChild(this.ui);
                }
            } else {
                document.body.appendChild(this.ui);
            }
        }

        this.updateInput();

        this.init();

        if (typeof this.options.setup === 'function') {
            this.options.setup.call(this, this);
        }

        this.render();

        if (this.options.inlineMode) {
            this.show();
        }
    }

    private updateInput() {
        if (!(this.options.element instanceof HTMLInputElement)) { return; }

        const startDate = this.options.startDate as DateTime;
        const endDate = this.options.endDate as DateTime;

        if (this.options.singleMode && startDate) {
            this.options.element.value = startDate.format(this.options.format, this.options.lang);
        } else if (!this.options.singleMode && startDate && endDate) {
            const startValue = startDate.format(this.options.format, this.options.lang);
            const endValue = endDate.format(this.options.format, this.options.lang);

            if (this.options.elementEnd instanceof HTMLInputElement) {
                this.options.element.value = startValue;
                this.options.elementEnd.value = endValue;
            } else {
                this.options.element.value = `${startValue}${this.options.delimiter}${endValue}`;
            }
        }

        if (!startDate && !endDate) {
            this.options.element.value = '';

            if (this.options.elementEnd instanceof HTMLInputElement) {
                this.options.elementEnd.value = '';
            }
        }
    }

    private isSamePicker(el) {
        const picker = el.closest(`.${style.datepicker}`);

        return picker === this.ui;
    }

    private shouldShown(el) {
        return !el.disabled && (el === this.options.element
            || (this.options.elementEnd && el === this.options.elementEnd));
    }

    private shouldResetDatePicked() {
        return this.options.singleMode || this.datePicked.length === 2;
    }

    private shouldSwapDatePicked() {
        return this.datePicked.length === 2
            && this.datePicked[0].getTime() > this.datePicked[1].getTime();
    }

    private shouldCheckLockDays() {
        return this.options.disallowLockDaysInRange
            && this.datePicked.length === 2;
    }

    show(el = null) {
        this.emit('before:show', el);

        const element = el ? el : this.options.element;
        this.triggerElement = element;

        if (this.isShowning()) {
            return;
        }

        if (this.options.inlineMode) {
            this.ui.style.position = 'relative';
            this.ui.style.display = 'inline-block';
            this.ui.style.top = null;
            this.ui.style.left = null;
            this.ui.style.bottom = null;
            this.ui.style.right = null;
            return;
        }

        this.scrollToDate(el);

        this.render();

        this.ui.style.position = 'absolute';
        this.ui.style.display = 'block';
        this.ui.style.zIndex = this.options.zIndex + '';

        const position = this.findPosition(element);

        this.ui.style.top = `${position.top}px`;
        this.ui.style.left = `${position.left}px`;
        this.ui.style.right = null;
        this.ui.style.bottom = null;

        this.emit('show', el);
    }

    hide() {
        if (!this.isShowning()) {
            return;
        }

        this.datePicked.length = 0;
        this.updateInput();

        if (this.options.inlineMode) {
            this.render();
            return;
        }

        this.ui.style.display = 'none';

        this.emit('hide');
    }

    getDate(): DateTime {
        return this.getStartDate();
    }

    getStartDate(): DateTime {
        if (this.options.startDate) {
            return (this.options.startDate as DateTime).clone();
        }

        return null;
    }

    getEndDate(): DateTime {
        if (this.options.endDate) {
            return (this.options.endDate as DateTime).clone();
        }

        return null;
    }

    setDate(date: any, force: boolean = false) {
        const d = new DateTime(
            date,
            this.options.format,
            this.options.lang,
        );

        const isLocked = dateIsLocked(d, this.options, [d]);

        if (isLocked && !force) {
            this.emit('error:date', d);
        } else {
            this.setStartDate(date);

            if (this.options.inlineMode) {
                this.render();
            }

            this.emit('selected', this.getDate());
        }
    }

    protected setShortcutValue(from: Date, to: Date) {
        this.setDateRange(from, to, true);
        this.hide();
    }

    setStartDate(date: any) {

        if (!date) { return; }

        this.options.startDate = new DateTime(
            date,
            this.options.format,
            this.options.lang,
        );

        if (!this.options.timePicker) {
            this.options.startDate.setHours(0);
            this.options.startDate.setMinutes(0);
            this.options.startDate.setSeconds(0);
        }

        this.updateInput();
    }

    setEndDate(date: any) {

        if (!date) { return; }

        this.options.endDate = new DateTime(
            date,
            this.options.format,
            this.options.lang,
        );

        if (!this.options.timePicker) {
            this.options.endDate.setHours(23);
            this.options.endDate.setMinutes(59);
            this.options.endDate.setSeconds(59);
        }

        if ((this.options.startDate as DateTime).getTime() > this.options.endDate.getTime()) {
            this.options.endDate = (this.options.startDate as DateTime).clone();
            this.options.startDate = new DateTime(
                date,
                this.options.format,
                this.options.lang,
            );
        }

        this.updateInput();
    }

    setDateRange(date1: any, date2: any, force: boolean = false) {
        // stop repicking by resetting the trigger element
        this.triggerElement = undefined;

        const d1 = new DateTime(
            date1,
            this.options.format,
            this.options.lang,
        );
        const d2 = new DateTime(
            date2,
            this.options.format,
            this.options.lang,
        );

        let isLocked = false;

        if (this.options.disallowLockDaysInRange) {
            isLocked = rangeIsLocked([d1, d2], this.options);
        } else {
            isLocked = dateIsLocked(d1, this.options, [d1, d2])
                || dateIsLocked(d2, this.options, [d1, d2]);
        }

        if (isLocked && !force) {
            this.emit('error:range', [d1, d2]);
        } else {
            this.setStartDate(d1);
            this.setEndDate(d2);

            if (this.options.inlineMode) {
                this.render();
            }

            this.updateInput();

            this.emit('selected', this.getStartDate(), this.getEndDate());
        }
    }

    gotoDate(date: any, idx = 0) {
        const toDate = new DateTime(date);
        toDate.setDate(1);
        this.calendars[idx] = toDate.clone();
        this.render();
    }

    setLockDays(array: any) {
        this.options.lockDays = DateTime.convertArray(
            array,
            this.options.lockDaysFormat,
        );
        this.render();
    }

    setHighlightedDays(array: any) {
        this.options.highlightedDays = DateTime.convertArray(
            array,
            this.options.highlightedDaysFormat,
        );
        this.render();
    }

    setOptions(options: any) {
        delete options.element;
        delete options.elementEnd;
        delete options.parentEl;

        if (options.startDate) {
            options.startDate = new DateTime(
                options.startDate,
                this.options.format,
                this.options.lang,
            );
        }

        if (options.endDate) {
            options.endDate = new DateTime(
                options.endDate,
                this.options.format,
                this.options.lang,
            );
        }

        const dropdowns = { ...this.options.dropdowns, ...options.dropdowns };
        const buttonText = { ...this.options.buttonText, ...options.buttonText };
        const tooltipText = { ...this.options.tooltipText, ...options.tooltipText };

        this.options = { ...this.options, ...options };
        this.options.dropdowns = { ...dropdowns };
        this.options.buttonText = { ...buttonText };
        this.options.tooltipText = { ...tooltipText };

        if (this.options.singleMode && !(this.options.startDate instanceof DateTime)) {
            this.options.startDate = null;
            this.options.endDate = null;
        }
        if (!this.options.singleMode
            && (!(this.options.startDate instanceof DateTime)
                || !(this.options.endDate instanceof DateTime))) {
            this.options.startDate = null;
            this.options.endDate = null;
        }

        for (let idx = 0; idx < this.options.numberOfMonths; idx += 1) {
            const date = this.options.startDate
                ? (this.options.startDate as DateTime).clone()
                : new DateTime();
            date.setDate(1);
            date.setMonth(date.getMonth() + idx);
            this.calendars[idx] = date;
        }

        if (this.options.lockDays.length) {
            this.options.lockDays = DateTime.convertArray(
                this.options.lockDays,
                this.options.lockDaysFormat,
            );
        }

        if (this.options.highlightedDays.length) {
            this.options.highlightedDays = DateTime.convertArray(
                this.options.highlightedDays,
                this.options.highlightedDaysFormat,
            );
        }

        this.render();

        if (this.options.inlineMode) {
            this.show();
        }

        this.updateInput();
    }

    clearSelection() {
        this.options.startDate = null;
        this.options.endDate = null;
        this.datePicked.length = 0;

        this.updateInput();

        if (this.isShowning()) {
            this.render();
        }

        this.emit('clear:selection');
    }

    destroy() {
        if (this.ui && this.ui.parentNode) {
            this.ui.parentNode.removeChild(this.ui);
            this.ui = null;
        }

        this.emit('destroy');
    }

    private onClick(e) {
        const target = e.target as HTMLElement;

        if (!target || !this.ui) {
            return;
        }

        // Click on element
        if (this.shouldShown(target)) {
            this.show(target);
            return;
        }

        // Click outside picker
        if (!target.closest(`.${style.datepicker}`) && this.isShowning()) {
            this.hide();
            return;
        }

        if (!this.isSamePicker(target)) {
            return;
        }

        this.emit('before:click', target);

        if (this.preventClick) {
            this.preventClick = false;
            return;
        }

        // Click on date
        if (target.classList.contains(style.dayItem)) {
            e.preventDefault();

            if (target.classList.contains(style.isLocked)) {
                return;
            }

            if (this.shouldResetDatePicked()) {
                this.datePicked.length = 0;
            }

            const datePicked = new DateTime(target.dataset.time);

            if (this.options.timePicker) {
                datePicked.setHours(this.timePicked[this.datePicked.length].getHours());
                datePicked.setMinutes(this.timePicked[this.datePicked.length].getMinutes());
            }

            this.datePicked[this.datePicked.length] = datePicked;

            if (this.shouldSwapDatePicked()) {
                const tempDate = this.datePicked[1].clone();
                this.datePicked[1] = this.datePicked[0].clone();
                this.datePicked[0] = tempDate.clone();
            }

            if (this.shouldCheckLockDays()) {
                const locked = rangeIsLocked(this.datePicked, this.options);

                if (locked) {
                    this.emit('error:range', this.datePicked);

                    this.datePicked.length = 0;
                }
            }

            this.render();

            this.emit('preselect', ...[...this.datePicked].map(d => d.clone()));

            if (this.options.autoApply) {
                if (this.options.singleMode && this.datePicked.length) {
                    this.setDate(this.datePicked[0]);
                    this.hide();
                } else if (!this.options.singleMode && this.datePicked.length === 2) {
                    this.setDateRange(this.datePicked[0], this.datePicked[1]);
                    this.hide();
                }
            }
            return;
        }

        // Click on button previous month
        if (target.classList.contains(style.buttonPreviousMonth)) {
            e.preventDefault();

            let idx = 0;
            let numberOfMonths = this.options.switchingMonths || this.options.numberOfMonths;

            if (this.options.splitView) {
                const monthItem = target.closest(`.${style.monthItem}`);
                idx = findNestedMonthItem(monthItem);
                numberOfMonths = 1;
            }

            this.calendars[idx].setMonth(this.calendars[idx].getMonth() - numberOfMonths);
            this.gotoDate(this.calendars[idx], idx);

            this.emit('change:month', this.calendars[idx], idx);
            return;
        }

        // Click on button next month
        if (target.classList.contains(style.buttonNextMonth)) {
            e.preventDefault();

            let idx = 0;
            let numberOfMonths = this.options.switchingMonths || this.options.numberOfMonths;

            if (this.options.splitView) {
                const monthItem = target.closest(`.${style.monthItem}`);
                idx = findNestedMonthItem(monthItem);
                numberOfMonths = 1;
            }

            this.calendars[idx].setMonth(this.calendars[idx].getMonth() + numberOfMonths);
            this.gotoDate(this.calendars[idx], idx);

            this.emit('change:month', this.calendars[idx], idx);
            return;
        }

        // Click on button cancel
        if (target.classList.contains(style.buttonCancel)) {
            e.preventDefault();

            this.hide();

            this.emit('button:cancel');
        }

        // Click on button apply
        if (target.classList.contains(style.buttonApply)) {
            e.preventDefault();

            if (this.options.singleMode && this.datePicked.length) {
                this.setDate(this.datePicked[0]);
            } else if (!this.options.singleMode && this.datePicked.length === 2) {
                this.setDateRange(this.datePicked[0], this.datePicked[1]);
            }

            this.hide();

            this.emit('button:apply', this.options.startDate, this.options.endDate);
        }
    }

    private showTooltip(element, text) {
        const tooltip = this.ui.querySelector(`.${style.containerTooltip}`) as HTMLElement;
        tooltip.style.visibility = 'visible';
        tooltip.innerHTML = text;

        const pickerBCR = this.ui.getBoundingClientRect();
        const tooltipBCR = tooltip.getBoundingClientRect();
        const dayBCR = element.getBoundingClientRect();
        let top = dayBCR.top;
        let left = dayBCR.left;

        if (this.options.inlineMode && this.options.parentEl) {
            const parentBCR = (this.ui.parentNode as HTMLElement).getBoundingClientRect();
            top -= parentBCR.top;
            left -= parentBCR.left;
        } else {
            top -= pickerBCR.top;
            left -= pickerBCR.left;
        }

        top -= tooltipBCR.height;
        left -= tooltipBCR.width / 2;
        left += dayBCR.width / 2;

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;

        this.emit('tooltip', tooltip, element);
    }

    private hideTooltip() {
        const tooltip = this.ui.querySelector(`.${style.containerTooltip}`) as HTMLElement;
        tooltip.style.visibility = 'hidden';
    }

    private shouldAllowMouseEnter(el: HTMLElement) {
        return !this.options.singleMode
            && !el.classList.contains(style.isLocked);
    }

    private shouldAllowRepick() {
        return this.options.elementEnd
            && this.options.allowRepick
            && this.options.startDate
            && this.options.endDate;
    }

    private isDayItem(el: HTMLElement) {
        return el.classList.contains(style.dayItem);
    }

    private onMouseEnter(event) {
        const target = event.target as HTMLElement;
        if (!this.isDayItem(target)) {
            return;
        }

        if (this.shouldAllowMouseEnter(target)) {
            if (this.shouldAllowRepick()) {
                if (this.triggerElement === this.options.element) {
                    this.datePicked[0] = (this.options.endDate as DateTime).clone();
                } else if (this.triggerElement === this.options.elementEnd) {
                    this.datePicked[0] = (this.options.startDate as DateTime).clone();
                }
            }

            if (this.datePicked.length !== 1) {
                return;
            }

            const startDateElement = this.ui
                .querySelector(`.${style.dayItem}[data-time="${this.datePicked[0].getTime()}"]`);
            let date1 = this.datePicked[0].clone();
            let date2 = new DateTime(target.dataset.time);
            let isFlipped = false;

            if (date1.getTime() > date2.getTime()) {
                const tempDate = date1.clone();
                date1 = date2.clone();
                date2 = tempDate.clone();
                isFlipped = true;
            }
            const allDayItems = Array.prototype.slice.call(this.ui.querySelectorAll(`.${style.dayItem}`));
            allDayItems.forEach((d: HTMLElement) => {
                const date = new DateTime(d.dataset.time);
                const day = this.renderDay(date);

                if (date.isBetween(date1, date2)) {
                    day.classList.add(style.isInRange);
                }

                d.className = day.className;
            });

            target.classList.add(style.isEndDate);

            if (isFlipped) {
                if (startDateElement) {
                    startDateElement.classList.add(style.isFlipped);
                }

                target.classList.add(style.isFlipped);
            } else {
                if (startDateElement) {
                    startDateElement.classList.remove(style.isFlipped);
                }
                target.classList.remove(style.isFlipped);
            }

            if (this.options.showTooltip) {
                let days = date2.diff(date1, 'day') + 1;

                if (typeof this.options.tooltipNumber === 'function') {
                    days = this.options.tooltipNumber.call(this, days);
                }

                if (days > 0) {
                    const pluralName = this.pluralSelector(days);
                    const pluralText = this.options.tooltipText[pluralName]
                        ? this.options.tooltipText[pluralName]
                        : `[${pluralName}]`;
                    const text = `${days} ${pluralText}`;

                    this.showTooltip(target, text);

                    // fix bug iOS 10-12 - https://github.com/wakirin/Litepicker/issues/124
                    const ua = window.navigator.userAgent;
                    const iDevice = /(iphone|ipad)/i.test(ua);
                    const iOS11or12 = /OS 1([0-2])/i.test(ua);
                    if (iDevice && iOS11or12) {
                        target.dispatchEvent(new Event('click'));
                    }
                } else {
                    this.hideTooltip();
                }
            }
        }
    }

    private onMouseLeave(event) {
        const target = event.target as any;

        if (!this.options.allowRepick
            || (this.options.allowRepick && !this.options.startDate && !this.options.endDate)) {
            return;
        }

        this.datePicked.length = 0;
        this.render();
    }

    private onInput(event) {
        let [startValue, endValue] = this.parseInput();
        let isValid = false;
        const dateFormat = this.options.format;

        if (this.options.elementEnd) {
            isValid = startValue instanceof DateTime
                && endValue instanceof DateTime
                && startValue.format(dateFormat) === (this.options.element as HTMLInputElement).value
                && endValue.format(dateFormat) === (this.options.elementEnd as HTMLInputElement).value;
        } else if (this.options.singleMode) {
            isValid = startValue instanceof DateTime
                && startValue.format(dateFormat) === (this.options.element as HTMLInputElement).value;
        } else {
            isValid = startValue instanceof DateTime
                && endValue instanceof DateTime
                // tslint:disable-next-line: max-line-length
                && `${startValue.format(dateFormat)}${this.options.delimiter}${endValue.format(dateFormat)}` === (this.options.element as HTMLInputElement).value;
        }

        if (isValid) {
            if (endValue && startValue.getTime() > endValue.getTime()) {
                const tempDate = startValue.clone();
                startValue = endValue.clone();
                endValue = tempDate.clone();
            }

            this.options.startDate = new DateTime(
                startValue,
                this.options.format,
                this.options.lang,
            );

            if (endValue) {
                this.options.endDate = new DateTime(
                    endValue,
                    this.options.format,
                    this.options.lang,
                );
            }

            this.updateInput();
            this.render();

            let dateGo = startValue.clone();
            let monthIdx = 0;
            let isStart = true;

            if (this.options.elementEnd) {
                isStart = startValue.format(dateFormat) === event.target.value;
            } else {
                isStart = event.target.value.startsWith(startValue.format(dateFormat));
            }

            if (!isStart) {
                dateGo = endValue.clone();
                monthIdx = this.options.numberOfMonths - 1;
            }

            this.emit('selected', this.getStartDate(), this.getEndDate());

            this.gotoDate(dateGo, monthIdx);
        }
    }
}
