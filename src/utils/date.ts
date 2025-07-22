import { hasValueLegacy } from '../utils/check';

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

    } else if (hasValueLegacy(options.fromStr) && /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/g.test(options.fromStr)) {
        start = new Date(options.fromStr);
    } else if (hasValueLegacy(options.from)) {
        start = options.from;
    }

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);

    if (hasValueLegacy(options.days)) {
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

/**
     * @param f1 Fecha inicial
     * @param f2 Fecha final
     * @param t Unidad de tiempo (hours, days)
     */
export function diffDate(f1: Date, f2: Date, t: 'hours' | 'days' | 'months') {
    let diff = f2.getTime() - f1.getTime();

    switch (t) {
        case 'hours':
            return (diff / (1000 * 60 * 60));

        case 'days':
            return (diff / (1000 * 60 * 60 * 24));

        case 'months':
            diff = (f1.getTime() - f2.getTime()) / 1000; // Diferencia en segundos
            diff /= (60 * 60 * 24 * 7 * 4); // Diferencia en meses aproximados
            return Math.abs(Math.round(diff)); // Valor absoluto y redondeado al entero más cercano
    }
}

export function getDate(value: any) {

    if (typeof (value) === 'string' && !(/[\+zZ]/.test(value))) {
        value = value + 'Z';
    }

    return new Date(value);

}
