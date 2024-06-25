import moment from 'moment';

export function defaultDateFormat(moment) {
    return moment.format('MMM DD, yyyy');
}

export function defaultTimeFormat(moment) {
    return moment.format('MMM DD, yyyy HH:mm:ss');
}

export function defaultTimestampFormat(timestamp) {
    return moment(timestamp).format('MMM DD, yyyy HH:mm:ss');
}

export function utcToLocalTime(date) {
    let utcOffset = date.utcOffset();
    let utc = moment(date.valueOf()).add(utcOffset, 'minutes');
    return utc;
}

export function utcToLocalTimestamp(date) {
    let utc = utcToLocalTime(date).unix();
    return utc;
}

export function toUTCTime(date) {
    let utcOffset = date.utcOffset();
    let utc = moment(date.valueOf()).subtract(utcOffset, 'minutes');
    return utc;
}

export function toUTCTimestamp(date) {
    let utc = toUTCTime(date).unix();
    return utc;
}
