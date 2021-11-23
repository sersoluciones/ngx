import { DateTime } from './datetime';
import { Datepicker } from './datepicker';

interface ILPOptionDropdowns {
    minYear?: number;
    maxYear?: number | null;
    months?: boolean;
    years?: boolean | string;
}

interface ILPOptionShotcutItem {
    enable?: boolean;
    text?: string;
}

interface ILPOptionShotcuts {
    enable?: boolean;
    title?: string;

    today?: ILPOptionShotcutItem;
    yesterday?: ILPOptionShotcutItem;

    actualWeek?: ILPOptionShotcutItem;
    runningWeek?: ILPOptionShotcutItem;
    lastWeek?: ILPOptionShotcutItem;
    weekBack?: ILPOptionShotcutItem;
    nextWeek?: ILPOptionShotcutItem;
    weekNext?: ILPOptionShotcutItem;

    actualMonth?: ILPOptionShotcutItem;
    runningMonth?: ILPOptionShotcutItem;
    lastMonth?: ILPOptionShotcutItem;
    month1Back?: ILPOptionShotcutItem;
    nextMonth?: ILPOptionShotcutItem;
    month1Next?: ILPOptionShotcutItem;

    actualTrimester?: ILPOptionShotcutItem;
    runningTrimester?: ILPOptionShotcutItem;
    lastTrimester?: ILPOptionShotcutItem;
    month3Back?: ILPOptionShotcutItem;
    nextTrimester?: ILPOptionShotcutItem;
    month3Next?: ILPOptionShotcutItem;

    actualSemester?: ILPOptionShotcutItem;
    runningSemester?: ILPOptionShotcutItem;
    lastSemester?: ILPOptionShotcutItem;
    month6Back?: ILPOptionShotcutItem;
    nextSemester?: ILPOptionShotcutItem;
    month6Next?: ILPOptionShotcutItem;

    actualYear?: ILPOptionShotcutItem;
    runningYear?: ILPOptionShotcutItem;
    lastYear?: ILPOptionShotcutItem;
    month12Back?: ILPOptionShotcutItem;
    nextYear?: ILPOptionShotcutItem;
    month12Next?: ILPOptionShotcutItem;

}

interface ILPOptionButtonText {
    apply?: string;
    cancel?: string;
    previousMonth?: string;
    nextMonth?: string;
    reset?: string;
}

interface ILPOptionTooltip {
    one: string;
    other: string;
    many?: string;
}

interface ILPTimePicker {
    label?: string;
    labelStart?: string;
    labelEnd?: string;
}

export interface ILPConfiguration {
    element?: HTMLElement | HTMLInputElement;
    elementEnd?: HTMLElement | HTMLInputElement | null;
    parentEl?: HTMLElement | null;
    firstDay?: number;
    format?: string | object;
    lang?: string;
    delimiter?: string;
    numberOfMonths?: number;
    numberOfColumns?: number;
    startDate?: DateTime | Date | string | number;
    endDate?: DateTime | Date | string | number;
    zIndex?: number;
    minDate?: DateTime | Date | string | number;
    maxDate?: DateTime | Date | string | number;
    minDays?: number;
    maxDays?: number;
    switchingMonths?: number | null;
    selectForward?: boolean;
    selectBackward?: boolean;
    splitView?: boolean;
    inlineMode?: boolean;
    singleMode?: boolean;
    shortcuts?: ILPOptionShotcuts;
    timePicker?: boolean;
    timePickerText?: ILPTimePicker;
    autoApply?: boolean;
    allowRepick?: boolean;
    showWeekNumbers?: boolean;
    showTooltip?: boolean;
    scrollToDate?: boolean;
    mobileFriendly?: boolean;
    resetButton?: boolean | object;
    autoRefresh?: boolean;
    lockDaysFormat?: string;
    lockDays?: any[];
    disallowLockDaysInRange?: boolean;
    lockDaysInclusivity?: string;
    lockDaysFilter?: (date1: DateTime | null, date2: DateTime | null, totalPicked: number) => boolean;
    highlightedDaysFormat?: string;
    highlightedDays?: any[];
    dropdowns?: ILPOptionDropdowns;
    buttonText?: ILPOptionButtonText;
    tooltipText?: ILPOptionTooltip;
    tooltipPluralSelector?: (arg: number) => string;
    footerHTML?: string | null;
    setup?: (picker: Datepicker) => void;
    tooltipNumber?: (totalDays: number) => number;
    plugins?: string[];
    position?: string;

    // Plugins
    ranges?: {
        position?: string;
        customRanges?: object;
        force?: boolean;
    };
    multiselect?: {
        max?: number | null;
    };
    keyboardnav?: {
        firstTabIndex?: number;
    };
}
