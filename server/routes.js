const express = require("express");
const {signin} = require('./controllers/user-controller');

const router = express.Router();
router.get('/api/signin',signin);

module.exports = router;