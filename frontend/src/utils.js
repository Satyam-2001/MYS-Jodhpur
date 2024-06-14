import moment from "moment"

export function heightFormat(value) {
    return `${Math.floor(value / 12)}' ${value % 12}"`
    return `${Math.floor(value / 12)}' ${value % 12}''  (${Math.round(value * 2.54)} cms)`
}

export function dateFormat(value) {
    return moment(new Date(value)).format('Do MMMM, YYYY')
}

export function timeFormat(value) {
    return moment(new Date(value)).format('hh:mm A')
}

export function formatMessageDate(date) {
    const now = moment();
    const messageDate = moment(date);

    if (now.isSame(messageDate, 'day')) {
        return 'Today';
    } else if (now.subtract(1, 'days').isSame(messageDate, 'day')) {
        return 'Yesterday';
    } else {
        return moment(new Date(date)).format('Do MMMM, YYYY')
    }
}