const { hash, compare } = require('bcryptjs')
const AppError = require('../utills/AppError')
const sqlConnection = require('../database/sqlite');


class usercontrollers {
  async create(request, response) {
    const { name, email, password } = request.body
    const database = await sqlConnection()
    const checkUserExists = await (database.get("SELECT * FROM users WHERE email = (?)", [email])) //verificar se existe email igual

    if (checkUserExists) {
      throw new AppError("Este email ja esta em uso!")
    }


    const hashedPassword = await hash(password, 8)
    await database.run("INSERT INTO users(name, email, password) VALUES(?,?,?)", [name, email, hashedPassword])



    return response.status(201).json()



  }
  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.params;
    const database = await sqlConnection()
    const user = await database.get("SELECT * FROM users where id = (?)", [id])
    if (!user) {
      throw new AppError("Usuário não encontrado!")
    }
    const userwithUpdateEmail = await database.get("SELECT * FROM users Where email = (?)", [email])
    if (userwithUpdateEmail && userwithUpdateEmail.id !== user.id) {
      throw new AppError("Este email ja esta em uso!")
    }
    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError("Voce precisa informar senha antiga para redefinir sua senha");
    }
    if (password && old_password) {
      const checkoldpassword = await compare(old_password, user.password);
      if (!checkoldpassword) {
        throw new AppError("Senha antiga invalida!")
      }
      user.password = await hash(password, 8)
    }


    await database.run("UPDATE users SET name = ?, email = ?,password = ?, updated_at = DATETIME('now') WHERE id =?", [user.name, user.email, user.password, id]);

    return response.json({
    'message': 'Usuário atualizado com sucesso!'
    })
  }
}
module.exports = usercontrollers