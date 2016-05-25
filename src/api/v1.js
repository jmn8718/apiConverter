var express = require('express');
var router = express.Router();

var blueprint = require('./blueprint');
var raml = require('./raml');
var templates = require('./templates');

router.use('/blueprint', blueprint);
router.use('/raml', raml);
router.use('/templates', templates);

module.exports = router;
