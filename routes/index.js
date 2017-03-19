var express = require('express');
var router = express.Router();

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

module.exports = router;
