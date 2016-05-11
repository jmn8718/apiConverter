var express = require('express');
var router = express.Router();

var blueprint = require('./blueprint');
var raml = require('./raml');

router.use('/blueprint', blueprint);
router.use('/raml', raml);

module.exports = router;
