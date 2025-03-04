import { hasValue } from '../utils/check';

export const formatterRangeDates = Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: '2-digit',
    hour12: true,
    minute: '2-digit',
    timeZone: "America/Bogota",
    // timeZoneName: "shortOffset",
});

export interface DateRangeOptions {
    days?: number;
    currentMonth?: boolean;
    from?: Date;
    fromStr?: string;
}

/**
 * @description
 * Función para obtener el inicio y fin de un rango de dias ó actual mes
 */
export function getDateRange(options: DateRangeOptions): { start: Date, end: Date } {

    let start = new Date();
    let end = new Date();

    if (options.currentMonth) {

        const date = new Date();
        start = new Date(date.getFullYear(), date.getMonth(), 1);
        end = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    } else if (hasValue(options.fromStr) && /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/g.test(options.fromStr)) {
        start = new Date(options.fromStr);
    } else if (hasValue(options.from)) {
        start = options.from;
    }

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);

    if (hasValue(options.days)) {
        end.setDate(end.getDate() + options.days);
    }

    return {
        start, end
    };
}

/**
 * @description
 * Función para obtener el inicio y fin del dia actual
 */
export function getToday(): { start: Date, end: Date } {

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 0);

    return {
        start, end
    };
}

/**
 * @description
 * Función para obtener el inicio y fin del día de ayer
 * @returns {Date}
 */
export function getYesterday(): { start: Date, end: Date } {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() - 1);

    const start = new Date(tomorrow);
    start.setHours(0, 0, 0, 0);

    const end = new Date(tomorrow);
    end.setHours(23, 59, 59, 0);

    return {
        start, end
    };
}

/**
 * @description
 * Función para obtener el inicio y fin del día de mañana
 * @returns {Date}
 */
export function getTomorrow(): { start: Date, end: Date } {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const start = new Date(tomorrow);
    start.setHours(0, 0, 0, 0);

    const end = new Date(tomorrow);
    end.setHours(23, 59, 59, 0);

    return {
        start, end
    };
}

/**
 * @description
 * Función para obtener el inicio y fin del mes actual
 * @returns {Date}
 */
export function getMonth(): { start: Date, end: Date } {

    const date = new Date();

    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 0);

    return {
        start, end
    };
}

export function getYear(): { start: Date, end: Date } {

    const date = new Date();

    const start = new Date(date.getFullYear(), 0, 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date.getFullYear(), 11, 31);
    end.setHours(23, 59, 59, 0);

    return {
        start, end
    };
}

export function getWeek(): { start: Date, end: Date } {
    const now = new Date();

    const dayOfWeek = now.getDay();

    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { start: monday, end: sunday };
}

export function getDate(value: any) {

    if (typeof (value) === 'string' && !(/[\+zZ]/.test(value))) {
        value = value + 'Z';
    }

    return new Date(value);

}
