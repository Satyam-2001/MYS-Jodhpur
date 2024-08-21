const getYearsBackDate = (year) => {
    if (year === undefined) return
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - year);
    return currentDate;
}

function getSortQuery(sortby, prefix = 'basic_info.') {
    if (!sortby) return {}
    if (sortby[0] === '-') return { [`${prefix}${sortby.substring(1)}`]: -1 }
    return { [`${prefix}${sortby}`]: 1 }
}

function concatProfileId(...profileLists) {
    const array = []
    const flatList = (list) => list.map(data => data.user)
    for (let list of profileLists) {
        array.splice(0, 0, ...flatList(list || []))
    }
    return array
}

function getFilterQuery(filters, user, options) {
    if (!filters) return
    const { search, min_age, max_age, min_height, max_height, min_income, max_income, gender, education, family_status, family_type, family_values, ...selection_filter } = filters
    const isLoggedIn = !!user
    const userGender = user?.basic_info?.gender
    const oppositeGender = userGender === 'Men' ? 'Women' : 'Men'
    const genderValue = isLoggedIn ? oppositeGender : gender
    const filter = {}

    const family = ['family_status', 'family_type', 'family_values']
    family.forEach((key) => {
        if (!filters[key]) return;
        const regexValues = filters[key].split(',').map(value => `^${value}$`);
        filter[`family.${key}`] = { $regex: regexValues.join('|'), $options: 'i' };
    })

    if (options.exclude && user?._id) {
        const hideProfiles = concatProfileId(user.blocked_users, user.they_declined, user.you_declined, user.matchinterest)
        filter['_id'] = { $nin: hideProfiles };
    }

    Object.keys(selection_filter).forEach(key => {
        const regexValues = selection_filter[key].split(',').map(value => `^${value}$`);
        filter[`basic_info.${key}`] = { $regex: regexValues.join('|'), $options: 'i' };
    })

    if (education) {
        const educationRegexPattern = education.split(',').map(degree => `(^|,\\s*)${degree}(\\s*,|$)`).join('|');
        filter[`basic_info.education`] = { $regex: educationRegexPattern, $options: 'i' };
    }
    if (search) filter['basic_info.name'] = { $regex: search, $options: 'i' }
    if (min_age || max_age) filter['basic_info.date_of_birth'] = { $lte: getYearsBackDate(min_age || 0), $gte: getYearsBackDate(max_age || 100) }
    if (max_height || min_height) filter['basic_info.height'] = { $lte: max_height || 100, $gte: min_height || 0 }
    if (max_income || min_income) filter['basic_info.income'] = { $lte: max_income || 1000, $gte: min_income || 0 }
    if (genderValue) filter['basic_info.gender'] = { $regex: `^${genderValue}$`, $options: 'i' }
    return filter
}

module.exports = {
    getSortQuery,
    concatProfileId,
    getFilterQuery
}