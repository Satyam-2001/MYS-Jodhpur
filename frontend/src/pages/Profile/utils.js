export function filterProfileValue(array) {
    if (!array) return []
    return array?.filter(({ value }) => !!value)
}