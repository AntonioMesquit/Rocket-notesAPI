const { Router } = require('express')
const UsersControllers = require("../controllers/usercontrollers")
const routerUsers = Router()


const userControler = new UsersControllers()

routerUsers.post("/", userControler.create)
routerUsers.put("/:id", userControler.update)

module.exports = routerUsers