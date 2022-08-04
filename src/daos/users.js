import Container from "../container.js"
import usersSchema from "../schemas/usersSchema"



class UserContainer extends Container {
    constructor() {
        super("users", usersSchema)
    }
}

module.exports = UserContainer