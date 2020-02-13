const express = require('express');
const router= express.Router()

const { createTrans, getUserTransaction} = require('../controllers/transController')
const auth = require('../middleware/auth')

router.post('/create',auth,  createTrans)
router.get('/userTrans',auth, getUserTransaction)


module.exports = router