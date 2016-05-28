var express = require('express');
var router = express.Router();

var blueprint = require('./blueprint');
var raml = require('./raml');
var templates = require('./templates');
var uploads = require('./uploads');

router.use('/blueprint', blueprint);
router.use('/raml', raml);
router.use('/templates', templates);
router.use('/uploads', uploads);

module.exports = router;
