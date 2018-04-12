'use strict';

const express = require('express');
const User = require('../controllers/User');
const router = express.Router();

router.post('/login', User.login);
router.get('/list', User.list);
router.post('/register', User.add);
router.post('/update', User.update);

module.exports = router