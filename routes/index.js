var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Data = mongoose.model('Data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/data', function(req, res, next){
	var data = new Data(req.body);

	data.save(function(err, data){
		if (err) throw err;
		res.json(data);
	});
});

router.get('/data', function(req, res){
	Data.find(function(err, data){
		if (err) throw err;
		res.json(data);
	});
});

module.exports = router;
