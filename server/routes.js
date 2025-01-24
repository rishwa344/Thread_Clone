const express = require("express");
const {signin,login} = require('./controllers/user-controller');

const router = express.Router();
router.post('/signin',signin);
router.post('/login',login);

module.exports = router;