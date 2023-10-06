require("express-async-errors")
require("dotenv/config")
const AppError =require("./utills/AppError")
const express = require('express')
const routes = require("./routes")
const uploadConfig = require("./configs/upload")
const cors = require("cors")
const migrationsRun = require("./database/sqlite/Migrations")
const app = express()
app.use(cors())
app.use(express.json())


app.use("/files" , express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)
migrationsRun();
app.use((error, request, response, next) =>{
if(error instanceof AppError){
    return response.status(error.statusCode).json({
        status: "error",
        message: error.message
    })
} 
console.error(error);
return response.status(500).json({
    status: "error",
    message: "Internal server error"
})
})
const PORT = process.env.SERVER_PORT || 3333
app.listen(PORT, () => console.log(`ola, estamos rodando na porta ${PORT}`))


