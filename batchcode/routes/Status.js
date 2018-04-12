'use strict';

const express = require('express');
const Status = require('../controllers/Status');
const router = express.Router();

router.get('/', Status.status);
router.get('/start', Status.start);
router.get('/stop', Status.stop);

module.exports = router