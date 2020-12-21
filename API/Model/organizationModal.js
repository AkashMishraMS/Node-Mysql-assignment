let dbconnection = require('../../config/config')
let orgModal = function (user) {
    this.oid = user.oid
    this.oname = user.oname
}

// getAll user
orgModal.getList = (result) => {
let numPerPage = 5;
let page = 2
let skip = (page-1) * numPerPage; 
let limit = skip + ',' + numPerPage; // Here we compute the LIMIT parameter for MySQL query
dbconnection.query('SELECT count(*) as numRows FROM organization',function (err, rows, fields) {
    if(err) {
        console.log("error: ", err);
        result(err, null);
    }else{
        var numRows = rows[0].numRows;
        var numPages = Math.ceil(numRows / numPerPage);
        dbconnection.query('SELECT * FROM user_info LIMIT ' + limit,function (err, rows, fields) {
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

// create new User
orgModal.addOrg = (userData, result) => {
    dbconnection.query(`insert into organization SET ?`, userData, (err, res) => {
        if (err) {
            console.log('err', err)
            result(null, err)
        } else {
            console.log('inserted sucessfully')
            result(null, result)
        }
    })
}

module.exports = orgModal
