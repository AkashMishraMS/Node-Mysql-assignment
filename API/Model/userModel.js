let dbconnection = require('../../config/config')
let user = function (user) {
    this.ID = user.ID
    this.Name = user.Name
    this.City = user.City
    this.Email = user.Email
    this.Password = user.Password
    this.number = user.number
}
user.getUser = (result) => {
let numPerPage = 5;
let page = 2
let skip = (page-1) * numPerPage; 
let limit = skip + ',' + numPerPage; // Here we compute the LIMIT parameter for MySQL query
dbconnection.query('SELECT count(*) as numRows FROM customer',function (err, rows, fields) {
    if(err) {
        console.log("error: ", err);
        result(err, null);
    }else{
        var numRows = rows[0].numRows;
        var numPages = Math.ceil(numRows / numPerPage);
        dbconnection.query('SELECT * FROM customer LIMIT ' + limit,function (err, rows, fields) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }else{
                console.log(rows)
                result(null, rows,numPages);
            }
        });            
    }
});
}

// get user by id

user.getUserbyID = (id, result) => {
    dbconnection.query(`select * from customer where ID = ?`, id, (err, res) => {
        if (err) {
            console.log('error while fetching user')
            result(null, err)
        } else {
            result(null, res)
        }
    })
}

// create new User
user.createUser = (userData, result) => {
    dbconnection.query(`insert into customer SET ?`, userData, (err, res) => {
        if (err) {
            console.log('err', err)
            result(null, err)
        } else {
            console.log('inserted sucessfully')
            result(null, result)
        }
    })
}

// update user 

user.userUpdate = (id, userData, result) => {
    dbconnection.query(`update customer SET Name=? where ID = ?`, [userData.Name, id], (err, res) =>{
        if (err) {
            console.log('err', err)
            result(null, err)
        } else {
            console.log('updated sucessfully')
            result(null, result)
        }
    })
}

user.removeUser = (id, result) => {
    dbconnection.query(`delete from customer where id = ?`, [id], (err, res) => {
        if (err) {
            console.log('err while deleting', err)
            result(null, err)
        } else {
            console.log('deleted sucessfully')
            result(null, result)
        }
    })
}

user.userlogin = (email, cb) => {
    dbconnection.query(`select * from customer where Email = ?`, [email],(err, result) => {
        if (err) {
            console.log('err', err)
         return cb(null, err)
        } else {
            console.log('results', result[0])
        return cb(null, result[0])
        }
    })
}

user.search = (searchStr, cb) => {
    let term = searchStr
   dbconnection.query('SELECT ID, Name, City, Email, number from customer where Name like "%'+term+'%" OR Email like "%'+term+'%" OR City like "%'+term+'%" OR number like "%'+term+'%"', (err, results) => {
    if (err) {
        console.log('err', err)
        cb(null, err)
    } else {
        console.log('search happened')
        cb(null, results)
        if (!results || results.length < 0) {
            console.log('Sorry we have no Records')
        } else {
            console.log('Search Result', results)
        }
    }
   })
}
module.exports = user
