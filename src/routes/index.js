const {Router} = require("express");

const routerUsers = require("./routes.users")
const routerNotes = require("./notes.routes")

const routes = Router()
routes.use('/users' , routerUsers)
routes.use('/notes' , routerNotes)
module.exports = routes