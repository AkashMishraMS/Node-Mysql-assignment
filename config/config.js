const mysql = require('mysql')

// store connection property in ENV file 
const dbconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"user"
})
dbconnection.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connection Estiblished with Database')
})

module.exports = dbconnection