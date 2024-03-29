// tslint:disable: prefer-for-of
import { LPCore } from './core';
import { DateTime } from './datetime';
import { ILPConfiguration } from './interfaces';
import * as style from './scss/main';
import { dateIsLocked, findNestedMonthItem } from './utils';

export class Calendar extends LPCore {
    constructor(options: ILPConfiguration) {
        super(options);
    }

    protected render() {
        // this.emit('before:render', this.ui);

        const mainBlock = document.createElement('div');
        mainBlock.className = style.containerMain;
        const months = document.createElement('div');
        months.className = style.containerMonths;

        if (style[`columns${this.options.numberOfColumns}`]) {
            months.classList.remove(style.columns2, style.columns3, style.columns4);
            months.classList.add(style[`columns${this.options.numberOfColumns}`]);
        }

        if (this.options.splitView) {
            months.classList.add(style.splitView);
        }

        if (this.options.showWeekNumbers) {
            months.classList.add(style.showWeekNumbers);
        }

        const today = new Date();
        const startDate = this.calendars[0].clone();
        const startMonthIdx = startDate.getMonth();
        const totalMonths = startDate.getMonth() + this.options.numberOfMonths;

        let calendarIdx = 0;
        for (let idx = startMonthIdx; idx < totalMonths; idx += 1) {
            let dateIterator = startDate.clone();
            dateIterator.setDate(1);
            dateIterator.setSeconds(0);

            /* if (this.options.timePicker) {
                dateIterator.setHours(0);
                dateIterator.setMinutes(0);
            } else {
                dateIterator.setHours(today.getHours());
                dateIterator.setMinutes(today.getMinutes());
            } */

            if (this.options.splitView) {
                dateIterator = this.calendars[calendarIdx].clone();
            } else {
                dateIterator.setMonth(idx);
            }

            months.appendChild(this.renderMonth(dateIterator, calendarIdx));

            calendarIdx += 1;
        }

        this.ui.innerHTML = '';

        mainBlock.appendChild(months);

        if (this.options.resetButton) {
            let resetButton;
            if (typeof this.options.resetButton === 'function') {
                resetButton = this.options.resetButton.call(this);
            } else {
                resetButton = document.createElement('button');
                resetButton.type = 'button';
                resetButton.className = style.resetButton;
                resetButton.innerHTML = this.options.buttonText.reset;
            }

            resetButton.addEventListener('click', (e) => {
                e.preventDefault();

                // tslint:disable-next-line: no-string-literal
                this['clearSelection']();
            });

            mainBlock
                .querySelector(`.${style.monthItem}:last-child`)
                .querySelector(`.${style.monthItemHeader}`)
                .appendChild(resetButton);
        }

        if (this.options.shortcuts.enable) {
            mainBlock.appendChild(this.renderShortcuts());
        }

        this.ui.appendChild(mainBlock);

        if (this.options.timePicker) {
            this.ui.appendChild(this.renderTimePicker());
        }

        if (!this.options.autoApply || this.options.footerHTML) {
            this.ui.appendChild(this.renderFooter());
        }

        if (this.options.showTooltip) {
            this.ui.appendChild(this.renderTooltip());
        }

        this.ui.dataset.plugins = (this.options.plugins || []).join('|');

        this.emit('render', this.ui);
    }

    protected renderMonth(date: DateTime, calendarIdx: number) {
        const startDate = date.clone();

        const totalDays = 32 - new Date(startDate.getFullYear(), startDate.getMonth(), 32).getDate();

        const month = document.createElement('div');
        month.className = style.monthItem;

        const monthHeader = document.createElement('div');
        monthHeader.className = style.monthItemHeader;

        const monthAndYear = document.createElement('div');

        if (this.options.dropdowns.months) {
            const selectMonths = document.createElement('select');
            selectMonths.className = style.monthItemName;

            for (let x = 0; x < 12; x += 1) {
                const option = document.createElement('option');
                // day 2 because iOS bug with `toLocaleString`
                // https://github.com/wakirin/Litepicker/issues/113
                const monthName = new DateTime(new Date(date.getFullYear(), x, 2, 0, 0, 0));
                const optionMonth = new DateTime(new Date(date.getFullYear(), x, 1, 0, 0, 0));

                option.value = String(x);
                option.text = monthName.toLocaleString(this.options.lang, { month: 'long' });
                option.disabled = (this.options.minDate
                    && optionMonth.isBefore(new DateTime(this.options.minDate), 'month'))
                    || (this.options.maxDate && optionMonth.isAfter(new DateTime(this.options.maxDate), 'month'));
                option.selected = optionMonth.getMonth() === date.getMonth();

                selectMonths.appendChild(option);
            }

            selectMonths.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;

                let idx = 0;

                if (this.options.splitView) {
                    const monthItem = target.closest(`.${style.monthItem}`);
                    idx = findNestedMonthItem(monthItem);
                }

                this.calendars[idx].setMonth(Number(target.value));
                this.render();

                this.emit('change:month', this.calendars[idx], idx, e);
            });

            monthAndYear.appendChild(selectMonths);
        } else {
            const monthName = document.createElement('strong');
            monthName.className = style.monthItemName;
            monthName.innerHTML = date.toLocaleString(this.options.lang, { month: 'long' });
            monthAndYear.appendChild(monthName);
        }

        if (this.options.dropdowns.years) {
            const selectYears = document.createElement('select');
            selectYears.className = style.monthItemYear;

            const minYear = this.options.dropdowns.minYear;
            const maxYear = this.options.dropdowns.maxYear
                ? this.options.dropdowns.maxYear
                : (new Date()).getFullYear();

            if (date.getFullYear() > maxYear) {
                const option = document.createElement('option');
                option.value = String(date.getFullYear());
                option.text = String(date.getFullYear());
                option.selected = true;
                option.disabled = true;

                selectYears.appendChild(option);
            }

            for (let x = maxYear; x >= minYear; x -= 1) {
                const option = document.createElement('option');
                const optionYear = new DateTime(new Date(x, 0, 1, 0, 0, 0));
                option.value = String(x);
                option.text = String(x);
                option.disabled = (this.options.minDate
                    && optionYear.isBefore(new DateTime(this.options.minDate), 'year'))
                    || (this.options.maxDate
                        && optionYear.isAfter(new DateTime(this.options.maxDate), 'year'));
                option.selected = date.getFullYear() === x;

                selectYears.appendChild(option);
            }

            if (date.getFullYear() < minYear) {
                const option = document.createElement('option');
                option.value = String(date.getFullYear());
                option.text = String(date.getFullYear());
                option.selected = true;
                option.disabled = true;

                selectYears.appendChild(option);
            }

            if (this.options.dropdowns.years === 'asc') {
                const childs = Array.prototype.slice.call(selectYears.childNodes);
                const options = childs.reverse();
                selectYears.innerHTML = '';
                options.forEach((y) => {
                    y.innerHTML = y.value;
                    selectYears.appendChild(y);
                });
            }

            selectYears.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;

                let idx = 0;

                if (this.options.splitView) {
                    const monthItem = target.closest(`.${style.monthItem}`);
                    idx = findNestedMonthItem(monthItem);
                }

                this.calendars[idx].setFullYear(Number(target.value));
                this.render();

                this.emit('change:year', this.calendars[idx], idx, e);
            });

            monthAndYear.appendChild(selectYears);
        } else {
            const monthYear = document.createElement('span');
            monthYear.className = style.monthItemYear;
            monthYear.innerHTML = String(date.getFullYear());
            monthAndYear.appendChild(monthYear);
        }

        const previousMonthButton = document.createElement('button');
        previousMonthButton.type = 'button';
        previousMonthButton.className = style.buttonPreviousMonth;
        previousMonthButton.innerHTML = this.options.buttonText.previousMonth;

        const nextMonthButton = document.createElement('button');
        nextMonthButton.type = 'button';
        nextMonthButton.className = style.buttonNextMonth;
        nextMonthButton.innerHTML = this.options.buttonText.nextMonth;

        monthHeader.appendChild(previousMonthButton);
        monthHeader.appendChild(monthAndYear);
        monthHeader.appendChild(nextMonthButton);

        if (this.options.minDate
            && startDate.isSameOrBefore(new DateTime(this.options.minDate), 'month')) {
            month.classList.add(style.noPreviousMonth);
        }

        if (this.options.maxDate
            && startDate.isSameOrAfter(new DateTime(this.options.maxDate), 'month')) {
            month.classList.add(style.noNextMonth);
        }

        const weekdaysRow = document.createElement('div');
        weekdaysRow.className = style.monthItemWeekdaysRow;

        if (this.options.showWeekNumbers) {
            weekdaysRow.innerHTML = '<div>W</div>';
        }

        for (let w = 1; w <= 7; w += 1) {
            // 7 days, 4 is «Thursday» (new Date(1970, 0, 1, 12, 0, 0, 0))
            const dayIdx = 7 - 4 + this.options.firstDay + w;
            const weekday = document.createElement('div');
            weekday.innerHTML = this.weekdayName(dayIdx);
            weekday.title = this.weekdayName(dayIdx, 'long');
            weekdaysRow.appendChild(weekday);
        }

        const days = document.createElement('div');
        days.className = style.containerDays;

        const skipDays = this.calcSkipDays(startDate);

        if (this.options.showWeekNumbers && skipDays) {
            days.appendChild(this.renderWeekNumber(startDate));
        }

        for (let idx = 0; idx < skipDays; idx += 1) {
            const dummy = document.createElement('div');
            days.appendChild(dummy);
        }

        // tslint:disable-next-line: prefer-for-of
        for (let idx = 1; idx <= totalDays; idx += 1) {
            startDate.setDate(idx);

            if (this.options.showWeekNumbers && startDate.getDay() === this.options.firstDay) {
                days.appendChild(this.renderWeekNumber(startDate));
            }

            days.appendChild(this.renderDay(startDate));
        }

        month.appendChild(monthHeader);
        month.appendChild(weekdaysRow);
        month.appendChild(days);

        this.emit('render:month', month, date);

        return month;
    }

    protected renderDay(date: DateTime) {
        date.setHours(0);

        const day = document.createElement('div');
        day.className = style.dayItem;
        day.innerHTML = String(date.getDate());
        day.dataset.time = String(date.getTime());

        if (date.toDateString() === (new Date()).toDateString()) {
            day.classList.add(style.isToday);
        }

        if (this.datePicked.length) {
            if (this.datePicked[0].toDateString() === date.toDateString()) {
                day.classList.add(style.isStartDate);

                if (this.options.singleMode) {
                    day.classList.add(style.isEndDate);
                }
            }

            if (this.datePicked.length === 2
                && this.datePicked[1].toDateString() === date.toDateString()) {
                day.classList.add(style.isEndDate);
            }

            if (this.datePicked.length === 2) {
                if (date.isBetween(this.datePicked[0], this.datePicked[1])) {
                    day.classList.add(style.isInRange);
                }
            }
        } else if (this.options.startDate) {
            const startDate = this.options.startDate as DateTime;
            const endDate = this.options.endDate as DateTime;

            if (startDate.toDateString() === date.toDateString()) {
                day.classList.add(style.isStartDate);

                if (this.options.singleMode) {
                    day.classList.add(style.isEndDate);
                }
            }

            if (endDate && endDate.toDateString() === date.toDateString()) {
                day.classList.add(style.isEndDate);
            }

            if (startDate && endDate) {
                if (date.isBetween(startDate, endDate)) {
                    day.classList.add(style.isInRange);
                }
            }
        }

        if (this.options.minDate && date.isBefore(new DateTime(this.options.minDate))) {
            day.classList.add(style.isLocked);
        }

        if (this.options.maxDate && date.isAfter(new DateTime(this.options.maxDate))) {
            day.classList.add(style.isLocked);
        }

        if (this.options.minDays > 1
            && this.datePicked.length === 1) {
            const minDays = this.options.minDays - 1; // subtract selected day
            const left = this.datePicked[0].clone().subtract(minDays, 'day');
            const right = this.datePicked[0].clone().add(minDays, 'day');

            if (date.isBetween(left, this.datePicked[0], '(]')) {
                day.classList.add(style.isLocked);
            }

            if (date.isBetween(this.datePicked[0], right, '[)')) {
                day.classList.add(style.isLocked);
            }
        }

        if (this.options.maxDays
            && this.datePicked.length === 1) {
            const maxDays = this.options.maxDays;
            const left = this.datePicked[0].clone().subtract(maxDays, 'day');
            const right = this.datePicked[0].clone().add(maxDays, 'day');

            if (date.isSameOrBefore(left)) {
                day.classList.add(style.isLocked);
            }

            if (date.isSameOrAfter(right)) {
                day.classList.add(style.isLocked);
            }
        }

        if (this.options.selectForward
            && this.datePicked.length === 1
            && date.isBefore(this.datePicked[0])) {
            day.classList.add(style.isLocked);
        }

        if (this.options.selectBackward
            && this.datePicked.length === 1
            && date.isAfter(this.datePicked[0])) {
            day.classList.add(style.isLocked);
        }

        const locked = dateIsLocked(date, this.options, this.datePicked);

        if (locked) {
            day.classList.add(style.isLocked);
        }

        if (this.options.highlightedDays.length) {
            const isHighlighted = this.options.highlightedDays
                .filter((d) => {
                    if (d instanceof Array) {
                        return date.isBetween(d[0], d[1], '[]');
                    }

                    return d.isSame(date, 'day');
                }).length;

            if (isHighlighted) {
                day.classList.add(style.isHighlighted);
            }
        }

        // fix bug iOS 10-12 - https://github.com/wakirin/Litepicker/issues/124
        day.tabIndex = !day.classList.contains('is-locked') ? 0 : -1;

        this.emit('render:day', day, date);

        return day;
    }

    protected setShortcutValue(from: Date, to: Date) { }

    protected renderShortcuts() {

        const shortcuts = document.createElement('div');
        shortcuts.className = style.containerShortcuts;

        const title = document.createElement('div');
        title.className = style.shortcutsTitle;
        title.innerText = this.options.shortcuts.title;
        shortcuts.appendChild(title);

        if (this.options.shortcuts.today?.enable) {

            const todayButton = document.createElement('button');
            todayButton.type = 'button';
            todayButton.className = style.buttonToday;
            todayButton.innerText = this.options.shortcuts.today.text;

            todayButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);
                from.setMilliseconds(0);

                const to = new Date();
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);
                to.setMilliseconds(0);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(todayButton);

        }

        if (this.options.shortcuts.yesterday?.enable) {

            const yesterdayButton = document.createElement('button');
            yesterdayButton.type = 'button';
            yesterdayButton.className = style.buttonYesterday;
            yesterdayButton.innerText = this.options.shortcuts.yesterday.text;

            yesterdayButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setDate(from.getDate() - 1);
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);
                from.setMilliseconds(0);

                const to = new Date();
                to.setDate(to.getDate() - 1);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);
                to.setMilliseconds(0);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(yesterdayButton);

        }

        if (this.options.shortcuts.actualWeek?.enable) {

            const actualWeekButton = document.createElement('button');
            actualWeekButton.type = 'button';
            actualWeekButton.className = style.buttonActualWeek;
            actualWeekButton.innerText = this.options.shortcuts.actualWeek.text;

            actualWeekButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();

                const day = from.getDay(),
                    diff = from.getDate() - day + (day === 0 ? -6 : 1);
                from.setDate(diff);

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date();
                to.setDate(diff + 6);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(actualWeekButton);

        }

        if (this.options.shortcuts.runningWeek?.enable) {

            const runningWeekButton = document.createElement('button');
            runningWeekButton.type = 'button';
            runningWeekButton.className = style.buttonRunningWeek;
            runningWeekButton.innerText = this.options.shortcuts.runningWeek.text;

            runningWeekButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();

                const day = from.getDay(),
                    diff = from.getDate() - day + (day === 0 ? -6 : 1);
                from.setDate(diff);

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date();
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(runningWeekButton);

        }

        if (this.options.shortcuts.weekBack?.enable) {

            const weekBackButton = document.createElement('button');
            weekBackButton.type = 'button';
            weekBackButton.className = style.buttonWeekBack;
            weekBackButton.innerText = this.options.shortcuts.weekBack.text;

            weekBackButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);
                from.setDate(from.getDate() - 7);

                const to = new Date();
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(weekBackButton);

        }

        if (this.options.shortcuts.lastWeek?.enable) {

            const lastWeekButton = document.createElement('button');
            lastWeekButton.type = 'button';
            lastWeekButton.className = style.buttonLastWeek;
            lastWeekButton.innerText = this.options.shortcuts.lastWeek.text;

            lastWeekButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();

                const day = from.getDay(),
                    diff = (from.getDate() - day + (day === 0 ? -6 : 1) - 7);
                from.setDate(diff);

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date();
                to.setDate(diff + 6);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(lastWeekButton);

        }

        if (this.options.shortcuts.nextWeek?.enable) {

            const nextWeekButton = document.createElement('button');
            nextWeekButton.type = 'button';
            nextWeekButton.className = style.buttonNextWeek;
            nextWeekButton.innerText = this.options.shortcuts.nextWeek.text;

            nextWeekButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setDate(from.getDate() - from.getDay() + 8);
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 6);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(nextWeekButton);

        }

        if (this.options.shortcuts.weekNext?.enable) {

            const weekNextButton = document.createElement('button');
            weekNextButton.type = 'button';
            weekNextButton.className = style.buttonWeekNext;
            weekNextButton.innerText = this.options.shortcuts.weekNext.text;

            weekNextButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date();
                to.setDate(to.getDate() + 7);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(weekNextButton);

        }

        if (this.options.shortcuts.actualMonth?.enable) {

            const actualMonthButton = document.createElement('button');
            actualMonthButton.type = 'button';
            actualMonthButton.className = style.buttonActualMonth;
            actualMonthButton.innerText = this.options.shortcuts.actualMonth.text;

            actualMonthButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                const year = d.getFullYear();

                const from = new Date(year, d.getMonth(), 1);
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(year, d.getMonth() + 1, 0);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(actualMonthButton);

        }

        if (this.options.shortcuts.runningMonth?.enable) {

            const runningMonthButton = document.createElement('button');
            runningMonthButton.type = 'button';
            runningMonthButton.className = style.buttonRunningMonth;
            runningMonthButton.innerText = this.options.shortcuts.runningMonth.text;

            runningMonthButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                const year = d.getFullYear();

                const from = new Date(year, d.getMonth(), 1);
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(year, d.getMonth(), d.getDate());
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(runningMonthButton);

        }

        if (this.options.shortcuts.lastMonth?.enable) {

            const lastMonthButton = document.createElement('button');
            lastMonthButton.type = 'button';
            lastMonthButton.className = style.buttonLastMonth;
            lastMonthButton.innerText = this.options.shortcuts.lastMonth.text;

            lastMonthButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                const year = d.getFullYear();

                const from = new Date(year, d.getMonth() - 1, 1);
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(year, d.getMonth(), 0);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(lastMonthButton);

        }

        if (this.options.shortcuts.month1Back?.enable) {

            const month1BackButton = document.createElement('button');
            month1BackButton.type = 'button';
            month1BackButton.className = style.buttonMonthBack;
            month1BackButton.innerText = this.options.shortcuts.month1Back.text;

            month1BackButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);
                from.setMonth(from.getMonth() - 1);

                const to = new Date();
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(month1BackButton);

        }

        if (this.options.shortcuts.nextMonth?.enable) {

            const nextMonthButton = document.createElement('button');
            nextMonthButton.type = 'button';
            nextMonthButton.className = style.buttonNextSMonth;
            nextMonthButton.innerText = this.options.shortcuts.nextMonth.text;

            nextMonthButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setMonth(from.getMonth() + 1);
                from.setDate(1);
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(from.getFullYear(), from.getMonth() + 1, 0);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(nextMonthButton);

        }

        if (this.options.shortcuts.month1Next?.enable) {

            const month1NextButton = document.createElement('button');
            month1NextButton.type = 'button';
            month1NextButton.className = style.buttonNext1Month;
            month1NextButton.innerText = this.options.shortcuts.month1Next.text;

            month1NextButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(from);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);
                to.setMonth(to.getMonth() + 1);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(month1NextButton);

        }

        if (this.options.shortcuts.actualTrimester?.enable) {

            const actualTrimesterButton = document.createElement('button');
            actualTrimesterButton.type = 'button';
            actualTrimesterButton.className = style.buttonActualTrimester;
            actualTrimesterButton.innerText = this.options.shortcuts.actualTrimester.text;

            actualTrimesterButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                const year = d.getFullYear();

                const quarter = Math.floor((d.getMonth() + 3) / 3);
                let from: Date = null;
                let to: Date = null;

                switch (quarter) {
                    case 1:
                        from = new Date(year, 0, 1);
                        to = new Date(year, 2, 31);
                        break;

                    case 2:
                        from = new Date(year, 3, 1);
                        to = new Date(year, 5, 30);
                        break;

                    case 3:
                        from = new Date(year, 6, 1);
                        to = new Date(year, 8, 30);
                        break;

                    case 4:
                        from = new Date(year, 9, 1);
                        to = new Date(year, 11, 31);
                        break;
                }

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(actualTrimesterButton);

        }

        if (this.options.shortcuts.runningTrimester?.enable) {

            const runningTrimesterButton = document.createElement('button');
            runningTrimesterButton.type = 'button';
            runningTrimesterButton.className = style.buttonRunningTrimester;
            runningTrimesterButton.innerText = this.options.shortcuts.runningTrimester.text;

            runningTrimesterButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                const year = d.getFullYear();

                const quarter = Math.floor((d.getMonth() + 3) / 3);
                let from: Date = null;

                switch (quarter) {
                    case 1:
                        from = new Date(year, 0, 1);
                        break;

                    case 2:
                        from = new Date(year, 3, 1);
                        break;

                    case 3:
                        from = new Date(year, 6, 1);
                        break;

                    case 4:
                        from = new Date(year, 9, 1);
                        break;
                }

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date();
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(runningTrimesterButton);

        }

        if (this.options.shortcuts.lastTrimester?.enable) {

            const lastTrimesterButton = document.createElement('button');
            lastTrimesterButton.type = 'button';
            lastTrimesterButton.className = style.buttonLastTrimester;
            lastTrimesterButton.innerText = this.options.shortcuts.lastTrimester.text;

            lastTrimesterButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                let year = d.getFullYear();

                let quarter = Math.floor((d.getMonth() + 3) / 3) - 1;

                if (quarter === 0) {
                    quarter = 4;
                    year--;
                }

                let from: Date = null;
                let to: Date = null;

                switch (quarter) {
                    case 1:
                        from = new Date(year, 0, 1);
                        to = new Date(year, 2, 31);
                        break;

                    case 2:
                        from = new Date(year, 3, 1);
                        to = new Date(year, 5, 30);
                        break;

                    case 3:
                        from = new Date(year, 6, 1);
                        to = new Date(year, 8, 30);
                        break;

                    case 4:
                        from = new Date(year, 9, 1);
                        to = new Date(year, 11, 31);
                        break;
                }

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(lastTrimesterButton);

        }

        if (this.options.shortcuts.month3Back?.enable) {

            const month3BackButton = document.createElement('button');
            month3BackButton.type = 'button';
            month3BackButton.className = style.button3Month;
            month3BackButton.innerText = this.options.shortcuts.month3Back.text;

            month3BackButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                for (let i = 0; i <= 2; i++) {
                    from.setMonth(from.getMonth() - 1);
                }

                const to = new Date();
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(month3BackButton);

        }

        if (this.options.shortcuts.nextTrimester?.enable) {

            const nextTrimesterButton = document.createElement('button');
            nextTrimesterButton.type = 'button';
            nextTrimesterButton.className = style.buttonNextTrimester;
            nextTrimesterButton.innerText = this.options.shortcuts.nextTrimester.text;

            nextTrimesterButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                let year = d.getFullYear();

                let quarter = Math.floor((d.getMonth() + 3) / 3) + 1;

                console.log(quarter);

                if (quarter === 5) {
                    quarter = 1;
                    year++;
                }

                let from: Date = null;
                let to: Date = null;

                switch (quarter) {
                    case 1:
                        from = new Date(year, 0, 1);
                        to = new Date(year, 2, 31);
                        break;

                    case 2:
                        from = new Date(year, 3, 1);
                        to = new Date(year, 5, 30);
                        break;

                    case 3:
                        from = new Date(year, 6, 1);
                        to = new Date(year, 8, 30);
                        break;

                    case 4:
                        from = new Date(year, 9, 1);
                        to = new Date(year, 11, 31);
                        break;
                }

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(nextTrimesterButton);

        }

        if (this.options.shortcuts.month3Next?.enable) {

            const month3NextButton = document.createElement('button');
            month3NextButton.type = 'button';
            month3NextButton.className = style.buttonNext3Month;
            month3NextButton.innerText = this.options.shortcuts.month3Next.text;

            month3NextButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(from);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);
                to.setMonth(to.getMonth() + 3);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(month3NextButton);

        }

        if (this.options.shortcuts.actualSemester?.enable) {

            const actualSemesterButton = document.createElement('button');
            actualSemesterButton.type = 'button';
            actualSemesterButton.className = style.buttonActualSemester;
            actualSemesterButton.innerText = this.options.shortcuts.actualSemester.text;

            actualSemesterButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                const year = d.getFullYear();

                let from: Date = null;
                let to: Date = null;

                if (d.getMonth() > 5) {
                    from = new Date(year, 6, 1);
                    to = new Date(year, 11, 31);
                } else {
                    from = new Date(year, 0, 1);
                    to = new Date(year, 5, 30);
                }

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(actualSemesterButton);

        }

        if (this.options.shortcuts.runningSemester?.enable) {

            const runningSemesterButton = document.createElement('button');
            runningSemesterButton.type = 'button';
            runningSemesterButton.className = style.buttonRunningSemester;
            runningSemesterButton.innerText = this.options.shortcuts.runningSemester.text;

            runningSemesterButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                const year = d.getFullYear();

                let from: Date = null;

                if (d.getMonth() > 5) {
                    from = new Date(year, 6, 1);
                } else {
                    from = new Date(year, 0, 1);
                }

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date();
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(runningSemesterButton);

        }

        if (this.options.shortcuts.lastSemester?.enable) {

            const lastSemesterButton = document.createElement('button');
            lastSemesterButton.type = 'button';
            lastSemesterButton.className = style.buttonLastSemester;
            lastSemesterButton.innerText = this.options.shortcuts.lastSemester.text;

            lastSemesterButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                let year = d.getFullYear();

                let from: Date = null;
                let to: Date = null;

                if (d.getMonth() > 5) {
                    from = new Date(year, 0, 1);
                    to = new Date(year, 5, 30);
                } else {
                    year--;
                    from = new Date(year, 6, 1);
                    to = new Date(year, 11, 31);
                }

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(lastSemesterButton);

        }

        if (this.options.shortcuts.month6Back?.enable) {

            const month6BackButton = document.createElement('button');
            month6BackButton.type = 'button';
            month6BackButton.className = style.button6Month;
            month6BackButton.innerText = this.options.shortcuts.month6Back.text;

            month6BackButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                for (let i = 0; i <= 5; i++) {
                    from.setMonth(from.getMonth() - 1);
                }

                const to = new Date();
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(month6BackButton);

        }

        if (this.options.shortcuts.nextSemester?.enable) {

            const nextSemesterButton = document.createElement('button');
            nextSemesterButton.type = 'button';
            nextSemesterButton.className = style.buttonNextSemester;
            nextSemesterButton.innerText = this.options.shortcuts.nextSemester.text;

            nextSemesterButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                let year = d.getFullYear();

                let from: Date = null;
                let to: Date = null;

                if (d.getMonth() > 5) {
                    year++;
                    from = new Date(year, 0, 1);
                    to = new Date(year, 5, 30);
                } else {
                    from = new Date(year, 6, 1);
                    to = new Date(year, 11, 31);
                }

                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(nextSemesterButton);

        }

        if (this.options.shortcuts.month6Next?.enable) {

            const month6NextButton = document.createElement('button');
            month6NextButton.type = 'button';
            month6NextButton.className = style.buttonNext6Month;
            month6NextButton.innerText = this.options.shortcuts.month6Next.text;

            month6NextButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(from);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);
                to.setMonth(to.getMonth() + 6);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(month6NextButton);

        }

        if (this.options.shortcuts.actualYear?.enable) {

            const actualYearButton = document.createElement('button');
            actualYearButton.type = 'button';
            actualYearButton.className = style.buttonActualYear;
            actualYearButton.innerText = this.options.shortcuts.actualYear.text;

            actualYearButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                const year = d.getFullYear();

                const from = new Date(year, 0, 1);
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(year, 11, 31);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(actualYearButton);

        }

        if (this.options.shortcuts.runningYear?.enable) {

            const runningYearButton = document.createElement('button');
            runningYearButton.type = 'button';
            runningYearButton.className = style.buttonRunningYear;
            runningYearButton.innerText = this.options.shortcuts.runningYear.text;

            runningYearButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                const year = d.getFullYear();

                const from = new Date(year, 0, 1);
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date();
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(runningYearButton);

        }

        if (this.options.shortcuts.lastYear?.enable) {

            const lastYearButton = document.createElement('button');
            lastYearButton.type = 'button';
            lastYearButton.className = style.buttonLastYear;
            lastYearButton.innerText = this.options.shortcuts.lastYear.text;

            lastYearButton.addEventListener('click', (e) => {
                e.preventDefault();

                const d = new Date();
                const year = d.getFullYear() - 1;

                const from = new Date(year, 0, 1);
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(year, 11, 31);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(lastYearButton);

        }

        if (this.options.shortcuts.month12Back?.enable) {

            const month12BackButton = document.createElement('button');
            month12BackButton.type = 'button';
            month12BackButton.className = style.button12Month;
            month12BackButton.innerText = this.options.shortcuts.month12Back.text;

            month12BackButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                for (let i = 0; i <= 11; i++) {
                    from.setMonth(from.getMonth() - 1);
                }

                const to = new Date();
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(month12BackButton);

        }

        if (this.options.shortcuts.nextYear?.enable) {

            const nextYearButton = document.createElement('button');
            nextYearButton.type = 'button';
            nextYearButton.className = style.buttonNextYear;
            nextYearButton.innerText = this.options.shortcuts.nextYear.text;

            nextYearButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setMonth(0);
                from.setDate(1);
                from.setFullYear(from.getFullYear() + 1);
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(from.getFullYear(), 11, 31);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(nextYearButton);

        }

        if (this.options.shortcuts.month12Next?.enable) {

            const month12NextButton = document.createElement('button');
            month12NextButton.type = 'button';
            month12NextButton.className = style.buttonNext12Month;
            month12NextButton.innerText = this.options.shortcuts.month12Next.text;

            month12NextButton.addEventListener('click', (e) => {
                e.preventDefault();

                const from = new Date();
                from.setHours(0);
                from.setMinutes(0);
                from.setSeconds(0);

                const to = new Date(from);
                to.setHours(23);
                to.setMinutes(59);
                to.setSeconds(59);
                to.setMonth(to.getMonth() + 12);

                this.setShortcutValue(from, to);
            });

            shortcuts.appendChild(month12NextButton);

        }

        return shortcuts;
    }

    protected renderTimePicker() {

        const times = document.createElement('div');
        times.className = style.containerTime;

        const divider = document.createElement('span');
        divider.className = 'time-divider';
        divider.innerText = ' : ';

        (this.options.singleMode ? [0] : [0, 1]).forEach((item) => {

            const time = document.createElement('div');
            time.className = style.containerTimeItem;

            if (this.options.singleMode) {
                time.innerHTML = `<span>${this.options.timePickerText.label}: </span>`;
            } else if (0 === item) {
                time.innerHTML = `<span>${this.options.timePickerText.labelStart}: </span>`;
            } else {
                time.innerHTML = `<span style="min-width: 62px;">${this.options.timePickerText.labelEnd}: </span>`;
            }

            const hours = document.createElement('select');
            hours.className = `hour-range time${item}-hour`;

            const actualHour = typeof (this.datePicked[item]) === 'undefined' ? this.timePicked[item].getHours() : this.datePicked[item].getHours();
            let actualHourMeridiem = actualHour;

            if (actualHourMeridiem > 12) {
                actualHourMeridiem = actualHourMeridiem - 12;
            }

            for (let index = 1; index < 13; index++) {

                hours.appendChild(new Option(
                    (index + '').replace(/^(\d{1})$/, '0$1'), index + '', false, actualHourMeridiem === index
                ));
            }

            hours.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;
                this.timePicked[item].setHours(Number(target.value));
            });

            time.appendChild(hours);

            time.appendChild(divider.cloneNode(true));

            const minutes = document.createElement('select');
            minutes.className = `minute-range time${item}-minute`;

            const actualMinute = typeof (this.datePicked[item]) === 'undefined' ? this.timePicked[item].getMinutes() : this.datePicked[item].getMinutes();
            for (let index = 0; index < 60; index++) {
                minutes.appendChild(new Option(
                    (index + '').replace(/^(\d{1})$/, '0$1'), index + '', false, actualMinute === index
                ));
            }

            minutes.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;
                this.timePicked[item].setMinutes(Number(target.value));
            });

            time.appendChild(minutes);

            const meridiem = document.createElement('select');
            meridiem.className = `minute-range time${item}-meridiem`;

            meridiem.appendChild(new Option(
                'AM', 'AM', false, actualHour < 12
            ));

            meridiem.appendChild(new Option(
                'PM', 'PM', false, actualHour >= 12
            ));

            meridiem.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;

                if (target.value === 'PM' && this.timePicked[item].getHours() < 12) {
                    this.timePicked[item].setHours(this.timePicked[item].getHours() + 12);
                }

                if (target.value === 'AM' && this.timePicked[item].getHours() > 12) {
                    this.timePicked[item].setHours(this.timePicked[item].getHours() - 12);
                }
            });

            time.appendChild(meridiem);

            times.appendChild(time);
        });

        return times;
    }

    protected renderFooter() {
        const footer = document.createElement('div');
        footer.className = style.containerFooter;

        if (this.options.footerHTML) {
            footer.innerHTML = this.options.footerHTML;
        } else {
            footer.innerHTML = `
      <button type="button" class="${style.buttonCancel}">${this.options.buttonText.cancel}</button>
      <button type="button" class="${style.buttonApply}">${this.options.buttonText.apply}</button>
      `;
        }

        if (!this.options.singleMode && this.datePicked.length < 2) {
            footer.querySelector(`.${style.buttonApply}`).setAttribute('disabled', '');
        }

        this.emit('render:footer', footer);

        return footer;
    }

    protected renderWeekNumber(date) {
        const wn = document.createElement('div');
        const week = date.getWeek(this.options.firstDay);
        wn.className = style.weekNumber;
        wn.innerHTML = week === 53 && date.getMonth() === 0 ? '53 / 1' : week;

        return wn;
    }

    protected renderTooltip() {
        const t = document.createElement('div');
        t.className = style.containerTooltip;

        return t;
    }

    private weekdayName(day, representation: 'short' | 'long' | 'narrow' = 'short') {
        return new Date(1970, 0, day, 12, 0, 0, 0)
            .toLocaleString(this.options.lang, { weekday: representation });
    }

    private calcSkipDays(date) {
        let total = date.getDay() - this.options.firstDay;
        if (total < 0) { total += 7; }

        return total;
    }
}
