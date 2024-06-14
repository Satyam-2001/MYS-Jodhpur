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

module.exports = {
    addUserSocket,
    removeUserSocketByUserId,
    removeUserSocketBySocketId,
    getRelationByUserId,
    getRelationBySocketId
}