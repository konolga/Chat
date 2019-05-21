const users = []

const addUser = ({ id, username, token, password}) => {
    // Clean the data
    username = username.trim().toLowerCase();


    // Validate the data
    if (!username) {
        return {
            error: 'Username is required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.token === token && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is taken!'
        }
    }

    // Store user
    const user = { id, username, token }
    users.push(user)
    return { user }

}


addUser({
    id:22,
    usename:"olga",
    token:1
})

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsers = () => {
    return users
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsers
}
