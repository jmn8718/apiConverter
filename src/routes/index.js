var express = require('express');
var router = express.Router();

var upload = require('./upload');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res, next) {
    res.render('home');
});

router.get('/api_documentation', function(req, res, next) {
    res.render('api_documentation', { title: 'API DOC' });
});


router.use('/upload', upload);

module.exports = router;
