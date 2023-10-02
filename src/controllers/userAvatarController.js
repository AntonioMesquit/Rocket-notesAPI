const AppError = require("../utills/AppError");
const knex = require("knex");
const DiskStorage = require("../providers/DiskStorage")ç

class userAvatarController {
async update(request,response){
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const diskStorage = new DiskStorage()

    const user = await knex("users")
    .where({id: user_id}).first()

    if(!user){
        throw new AppError("Somente usuarios autenticados podem mudar o avatar" , 401)
    }
    if(user.avatar){
 await diskStorage.deleteFile(user.avatar)
    }
    const filename = await diskStorage.saveFile(avatarFileName)
    user.avatar = filename

    await knex("users").update(user).where({id: user_id})

    return response.json(user)
}
}
module.exports = userAvatarController