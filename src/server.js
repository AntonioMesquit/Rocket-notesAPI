require("express-async-errors")
const AppError =require("./utills/AppError")
const express = require('express')
const routes = require("./routes")
const migrationsRun = require("./database/sqlite/Migrations")
const app = express()
app.use(express.json())

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
const PORT = 3333
app.listen(PORT, () => console.log(`ola, estamos rodando na porta ${PORT}`))


