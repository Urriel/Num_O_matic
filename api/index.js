/**
 * Created by Urriel.
 */

var express = require('express');
var router = express.Router();

/**
 * /api routing file
 */

router.use('/api', require('./translation'));

module.exports = router;