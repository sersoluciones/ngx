import { AirDatepickerOptions } from "./base/datepicker";


export interface EssiDateInputSettings {
    classes?: string;
    timePicker?: boolean;
    inputFormat?: string;
    clear?: boolean;
    escapeToClose?: boolean;
    shortcuts?: IEssiDateOptionShotcuts,
    calendarOptions?: AirDatepickerOptions;
}

export interface EssiDateRangeInputSettings extends EssiDateInputSettings {
    startDateField?: string;
    endDateField?: string;
    forceRangeField?: string;
}

interface IEssiDateOptionShotcuts {
    enable?: boolean;
    title?: string;

    today?: IEssiDateOptionShotcutItem;
    yesterday?: IEssiDateOptionShotcutItem;

    actualWeek?: IEssiDateOptionShotcutItem;
    runningWeek?: IEssiDateOptionShotcutItem;
    lastWeek?: IEssiDateOptionShotcutItem;
    weekBack?: IEssiDateOptionShotcutItem;
    nextWeek?: IEssiDateOptionShotcutItem;
    weekNext?: IEssiDateOptionShotcutItem;

    actualMonth?: IEssiDateOptionShotcutItem;
    runningMonth?: IEssiDateOptionShotcutItem;
    lastMonth?: IEssiDateOptionShotcutItem;
    month1Back?: IEssiDateOptionShotcutItem;
    nextMonth?: IEssiDateOptionShotcutItem;
    month1Next?: IEssiDateOptionShotcutItem;

    actualTrimester?: IEssiDateOptionShotcutItem;
    runningTrimester?: IEssiDateOptionShotcutItem;
    lastTrimester?: IEssiDateOptionShotcutItem;
    month3Back?: IEssiDateOptionShotcutItem;
    nextTrimester?: IEssiDateOptionShotcutItem;
    month3Next?: IEssiDateOptionShotcutItem;

    actualSemester?: IEssiDateOptionShotcutItem;
    runningSemester?: IEssiDateOptionShotcutItem;
    lastSemester?: IEssiDateOptionShotcutItem;
    month6Back?: IEssiDateOptionShotcutItem;
    nextSemester?: IEssiDateOptionShotcutItem;
    month6Next?: IEssiDateOptionShotcutItem;

    actualYear?: IEssiDateOptionShotcutItem;
    runningYear?: IEssiDateOptionShotcutItem;
    lastYear?: IEssiDateOptionShotcutItem;
    month12Back?: IEssiDateOptionShotcutItem;
    nextYear?: IEssiDateOptionShotcutItem;
    month12Next?: IEssiDateOptionShotcutItem;

}

interface IEssiDateOptionShotcutItem {
    enable?: boolean;
    text?: string;
}
