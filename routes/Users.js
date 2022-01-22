const express = require('express');
 const router = express.Router();
  const {RegisterUser, LoginUser, UserList, UserlistById, update} =  require('../controller/Users');
 const {validator} = require('../validatore/validatore');
  const {Authentication, TokenAuthorization} = require('../middleware/auth')

router.post('/create',  validator,  RegisterUser)
router.post('/signin', LoginUser);
router.get('/users', Authentication, UserList);
router.get('/users/:id',  UserlistById);
router.put('/user/update/:id', Authentication,TokenAuthorization, update);

 module.exports = router;