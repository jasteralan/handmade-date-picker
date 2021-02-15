import { 
    format, startOfWeek, addDays, addMonths, addYears, 
    isSameDay, isValid as isValidDate
} from 'date-fns';

export { addMonths, addYears, isSameDay, isValidDate };

const DAYS_OF_DATE_OPTIONS = 42;

export function chunk(arr, size) {
    let len = arr.length, 
        i = 0, 
        chunked = [];

    while(i < len) {
        const row = Math.floor(i / size);
        if(i % size === 0) {
            chunked[row] = [];
        }

        chunked[row].push(arr[i]);
        i++;
    }

    return chunked;
}

export function isoFmt(selected) {
    return format(selected, 'yyyy-MM-dd');
}

export function yearFmt(selected) {
    return format(selected, 'yyyy');
}

export function monthYearFmt(selected) {
    return format(selected, 'MMM yyyy');
}

export function dateOptions(ofYear, ofMonth) {
    let start = startOfWeek(new Date(ofYear, ofMonth, 1));

    return [...new Array(DAYS_OF_DATE_OPTIONS)].map((_, i) => {
        const date = addDays(start, i);
        return [date, format(date, 'dd')];
    });
}

export function monthOptions() {
    return [...new Array(12)].map((_, i) => ([
        i, format(new Date('1900', i), 'MMM')
    ]));
}

export function yearOptions(ofYear) {
    const fromYear = ofYear - (ofYear % 10) - 1;

    return [...new Array(12)].map((_, i) => fromYear + i);
}
