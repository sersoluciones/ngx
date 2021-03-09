import { ILPConfiguration } from './base/interfaces';

export interface DateInputSettings {
    classes?: string;
    timePicker?: boolean;
    inputFormat?: string;
    clear?: boolean;
    calendarOptions?: ILPConfiguration;
}

export interface DateRangeInputSettings {
    classes?: string;
    startDateField?: string;
    endDateField?: string;
    forceRangeField?: string;
    timePicker?: boolean;
    inputFormat?: string;
    clear?: boolean;
    calendarOptions?: ILPConfiguration;
}
