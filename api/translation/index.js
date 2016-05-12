/**
 * Created by Urriel.
 */

var express = require('express');
var router = express.Router();
var controller = require('./controller');

/**
 * /api/translate
 */

router.use('/translate', controller.translate);

module.exports = router;