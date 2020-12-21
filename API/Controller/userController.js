const userModal = require('../Model/userModel');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.getUserList = (req, res) => {
    // console.log('Get All Employee')
    userModal.getUser((err, user) => {
        console.log('user', user)
        if (err) 
            resp.send(err);
            console.log('user', user)
            res.send(user)
        
    })
}

// get user by ID 

exports.getUserByID = (req, res) => {
    // console.log('get user by ID')
    userModal.getUserbyID(req.params.id, (err, user) => {
        // console.log('req.params.id', req.params.id)
        if (err) {
            res.send(err)
        } else {
            console.log('user by id', user)
        }
    })
}

//create new user

exports.createNewUser = (req, res) => {
    // console.log('create new user', req.body)
    const body = req.body;
    console.log('body', body)
    const salt = genSaltSync(10);
    body.Password = hashSync(body.Password, salt);
    console.log('create new user', req.body)
    const userData = new userModal(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success:'false', message:'Please Enter Details'})
    } else {
        userModal.createUser(userData, (err, user) => {
          if (err) {
            res.send({status: false, message:'something went wrong'})
          } else {
              res.send({status: true, message:'user inserted successfully'})
          }
        })
    }
}

exports.updateUser = (req, res) => {
    const userData = new userModal( req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success:'false', message:'Please Enter Details'})
    } else {
        userModal.userUpdate(req.params.id, userData, (err, user) => {
          if (err) {
            res.send({status: false, message:'something went wrong'})
          } else {
              res.send({status: true, message:'user update successfully'})
          }
        })
    }
}

exports.deleteUser = (req, res) => {
    userModal.removeUser(req.params.id, (err, user) => {
        if (err) 
            res.send(err)
            res.json({ 
            success:true,
            message:'user deleted successfully'})
        
    })
}

exports.searchUser = (req, res) => {
  userModal.search(req.params.query,(err, user) => {
    if (err) res.send(err)
    res.json({
      success:true,
      message:'Search Result is Ready'
    })
  })
}

exports.login = (req, res) => {
      const body = req.body;
      console.log(body)
      userModal.userlogin(body.Email, (err, results) => {
          console.log('cont',err, results)
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
        const result = compareSync(body.Password, results.Password);
        console.log('result', result, body.Password, results.Password)
        if (result) {
            console.log(results.Password)
          results.Password = undefined;
          const jsontoken = sign({ result: results }, "demo123", {
            expiresIn: "1h"
          });
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken
          });
        } else {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
      });
    }