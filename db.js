const Sequelize = require("sequelize");
const sequelize = new Sequelize('nodejs','root','Wew8WRBCnolRwsaE',{
    host: 'localhost',
    dialect: 'mysql'

})

const db = {}

db.Todo = sequelize.import(__dirname + "/models/todo.js")
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
