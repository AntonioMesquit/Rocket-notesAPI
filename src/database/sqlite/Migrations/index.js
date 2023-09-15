const sqlConnection = require('..')
const createUsers = require("./createUsers");
async function migrationsRun(){
    const schemas = [
        createUsers

    ].join("");

    sqlConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));

   
}
module.exports = migrationsRun