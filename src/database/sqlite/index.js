const sqlite3 = require('sqlite3'); //drive
const sqlite = require('sqlite'); //coneccao
const path = require('path'); //biblioteca do node para salvar o bd



async function sqliteConection(){
    const dataBase = await sqlite.open({
        //aonde quero salvar
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database

    })
   return dataBase
}
module.exports = sqliteConection