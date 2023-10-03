const { Router } = require('express')
const UsersControllers = require("../controllers/usercontrollers")
const UserAvatarController = require("../controllers/userAvatarController")
const multer = require('multer')
const uploadConfig = require('../configs/upload')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const routerUsers = Router()
const upload = multer(uploadConfig.Multer)



const userControler = new UsersControllers()
const userAvatarController = new UserAvatarController()
routerUsers.post("/", userControler.create)
routerUsers.put("/", ensureAuthenticated, userControler.update)
routerUsers.patch("/avatar", ensureAuthenticated, upload.single("avatar") , userAvatarController.update);

module.exports = routerUsers