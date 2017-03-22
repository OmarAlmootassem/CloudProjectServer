var express = require('express');
var mongoose = require('mongoose');
var AWS = require('aws-sdk');
var cradle = require('cradle');

var router = express.Router();
var Data = mongoose.model('Data');
var dynamodb = new AWS.DynamoDB.DocumentClient();
var couch = new(cradle.Connection)('104.196.42.6', 5984, { auth: {username: 'admin', password: 'p3qmVsnM'}}).database('test');

couch.exists(function(err, exists){
	if (err){
		console.error(err);
	} else if (!exists){
		couch.create(function(err){

		});
	}
});

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

router.post('/dynamo_data', function(req, res, next){
	console.log(req.body);
	var data = req.body;
	var params = {
		TableName: "Test",
		Item: data
	};
	dynamodb.put(params, function(err, data){
		if (err){
			console.error(err);
			throw err;
		} else {
			console.log(data);
			res.json(data);
		}
	});
});

router.get('/dynamo_data', function(req, res){
	var params = {
		TableName: "Test",
		Key: {test: "testt"}
	};
	dynamodb.get(params, function(err, data){
		if (err){
			console.error(err);
			throw err;
		} else {
			console.log(data);
			res.json(data);
		}
	});
});

router.post('/couch_data', function(req, res, next){
	couch.save(req.body, function(err, data){
		if (err){
			console.error(err);
			throw err;
		} else {
			console.log(data);
			res.json(data);
		}
	})
});

router.get('/couch_data', function(req, res){
	couch.all(function(err, data){
		if (err){
			console.error(err);
			throw err;
		} else {
			console.log(data);
			res.json(data);
		}
	});
});

module.exports = router;
