var express = require('express');
var mongojs = require('mongojs');

var router = express.Router();

var databaseUrl = "ngforum";
var collections = ["users", "messages"];
var db = mongojs(databaseUrl, collections);

/* GET All Messages */
router.get('/messages', function(req, res, next) {
	db.messages.find(function(err, messages) {
		if (err) {
			res.send(err);
		} else {
			res.json(messages);
		}
	});
});

/* POST/SAVE a Message */
router.post('/message', function(req, res, next) {
	console.log(req.body);
	var message = req.body;
	if (!message.text || !message.subject) {
		res.status(400);
		res.json({
			"error": "Invalid Data"
		});
	} else {
		db.messages.save(message, function(err, result) {
			if (err) {
				res.send(err);
			} else {
				res.json(result);
			}
		})
	}
});

/* PUT/UPDATE a Message */
router.put('/message/:id', function(req, res, next) {
	var message = req.body;
	var updObj = {};
	if (message.subject) {
		updObj.subject = message.subject;
	}
	if (message.content) {
		updObj.content = message.content;
	}
	if (!updObj) {
		res.status(400);
		res.json({
			"error": "Invalid Data"
		});
	} else {
		db.messages.update({
			_id: mongojs.ObjectId(req.params.id)
		}, updObj, {}, function(err, result) {
			if (err) {
				res.send(err);
			} else {
				res.json(result);
			}
		});
	}
});

module.exports = router;