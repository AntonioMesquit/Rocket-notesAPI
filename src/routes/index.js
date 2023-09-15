const {Router} = require("express");
const { route } = require("./routes.users");

const routes = Router()
const routerUsers = require("./routes.users")

routes.use('/users' , routerUsers)
module.exports = routes