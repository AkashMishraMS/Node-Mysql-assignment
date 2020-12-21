const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const { checkToken } = require('../../auth/token_validation')
// get use list
router.get('/',  userController.getUserList)

// user by id
router.get('/:id', checkToken, userController.getUserByID)

// create new user
router.post('/', checkToken, userController.createNewUser)

// update user
router.put('/:id', checkToken,  userController.updateUser)

// delete user
router.delete('/:id', checkToken,  userController.deleteUser)

//search based on Name, City, Email, number
router.get('/search/:query', checkToken ,userController.searchUser)

// login
router.post('/login', userController.login)

module.exports = router