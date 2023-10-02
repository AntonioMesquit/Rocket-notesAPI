const { Router } = require('express')
const UsersControllers = require("../controllers/usercontrollers")
const multer = require('multer')
const uploadConfig = require('../configs/upload')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const routerUsers = Router()
const upload = multer(uploadConfig.Multer)


const userControler = new UsersControllers()

routerUsers.post("/", userControler.create)
routerUsers.put("/", ensureAuthenticated, userControler.update)
routerUsers.patch("/avatar", ensureAuthenticated, upload.single("avatar") , (request,response) => {
    console.log(request.file.filename)
    response.json()
})

module.exports = routerUsers