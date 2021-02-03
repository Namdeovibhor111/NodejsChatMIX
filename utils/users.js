const users = [];

function userjoin(id,username,room){
    const user = {id,username,room};

    users.push(user);
    return user;
}

function getCurrentUser(id){
    return users.find(user => user.id === id);
}
//user leaves
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }
}
//get room users
function getRoomUsers(room){
    return users.filter(users => user.room === room);
}

module.exports = {
    userjoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};