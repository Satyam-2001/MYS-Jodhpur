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