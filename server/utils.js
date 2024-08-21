const mongoose = require("mongoose")

let user_socket_relation = []

function addUserSocket(user_id, socket_id) {
    user_socket_relation.push({
        user_id,
        socket_id
    })
}

function removeUserSocketByUserId(user_id) {
    user_socket_relation = user_socket_relation.filter(relation => relation.user_id !== user_id)
}

function removeUserSocketBySocketId(socket_id) {
    user_socket_relation = user_socket_relation.filter(relation => relation.socket_id !== socket_id)
}


function getRelationByUserId(user_id) {
    return user_socket_relation.find(relation => relation.user_id === user_id)
}

function getRelationBySocketId(socket_id) {
    return user_socket_relation.find(relation => relation.socket_id === socket_id)
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function generateBio(user) {
    const intro = `Hello! I’m ${user.name}, a ${getAge(user.date_of_birth)}-year-old`
    const education = ` I’ve completed my ${user.education} and currently working as a ${user.occupation}.\n\n`
    const looking_for = `I’m looking for a life partner who shares similar values and interests.`
    const bio = intro + (' ' + user?.gender?.toLowerCase()) + '.' + education + looking_for
    return bio
}

function isSameId(id_1, id_2) {
    // Convert both IDs to strings if they are Mongoose ObjectId instances
    if (mongoose.Types.ObjectId.isValid(id_1)) {
        id_1 = id_1.toString();
    }
    if (mongoose.Types.ObjectId.isValid(id_2)) {
        id_2 = id_2.toString();
    }

    // Compare the string representations of both IDs
    return id_1 === id_2;
}

function userIncludes(array, userId) {
    if (!userId || !array) return
    return !!array.find((data) => isSameId(data.user, userId))
}

function userFilter(array, userId) {
    return array.filter((data) => !isSameId(data.user, userId))
}

function userAdd(array, userId) {
    return [{ user: userId }].concat(array)
}


module.exports = {
    addUserSocket,
    removeUserSocketByUserId,
    removeUserSocketBySocketId,
    getRelationByUserId,
    getRelationBySocketId,
    getAge,
    generateBio,
    isSameId,
    userIncludes,
    userFilter,
    userAdd
}