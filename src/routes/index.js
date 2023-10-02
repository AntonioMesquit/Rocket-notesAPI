const {Router} = require("express");

const routerUsers = require("./routes.users")
const routerNotes = require("./notes.routes")
const routerTags = require ("./tags.routes")
const routerSessions = require ("./sessions.routes")

const routes = Router()
routes.use('/users' , routerUsers)
routes.use('/notes' , routerNotes)
routes.use('/tags' , routerTags)
routes.use('/sessions' , routerSessions)
module.exports = routes