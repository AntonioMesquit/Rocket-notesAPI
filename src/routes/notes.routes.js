const { Router } = require('express')

const NotesController = require('../controllers/notesController')

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.post('/:user_id', notesController.create)


module.exports = notesRoutes