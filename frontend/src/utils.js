import moment from "moment"

export const min_height = 48
export const max_height = 75
export const min_age = 18
export const max_age = 60
export const min_income = 0
export const max_income = 100

export function ageFormat(value) {
    if (parseInt(value) >= max_age) return 'above'
    return `${value} years`
}

export function heightFormat(value) {
    if (value >= max_height) return 'above'
    return `${Math.floor(value / 12)}' ${value % 12}"`
    return `${Math.floor(value / 12)}' ${value % 12}''  (${Math.round(value * 2.54)} cms)`
}

export function incomeFormat(value) {
    if (parseInt(value) >= max_income) return 'above'
    return `${value} lakh${value > 1 ? 's' : ''}`
}

export function dateFormat(value) {
    return moment(new Date(value)).format('Do MMM, YYYY')
}

export function timeFormat(value) {
    return moment(new Date(value)).format('hh:mm A')
}

export function formatMessageDate(date) {
    const now = moment();
    const messageDate = moment(date);

    if (now.isSame(messageDate, 'day')) {
        return 'Today';
    }
    if (now.subtract(1, 'days').isSame(messageDate, 'day')) {
        return 'Yesterday';
    }
    if (now.isSame(messageDate, 'year')) {
        return moment(new Date(date)).format('D MMMM')
    }
    return moment(new Date(date)).format('D MMMM, YYYY')
}

export function lastSeenDate(date) {
    const now = moment();
    const messageDate = moment(date);

    if (now.isSame(messageDate, 'day')) {
        return moment(new Date(date)).format('hh:mm A');
    }
    if (now.subtract(1, 'days').isSame(messageDate, 'day')) {
        return 'Yesterday';
    }
    return moment(new Date(date)).format('D MMMM, YY')
}