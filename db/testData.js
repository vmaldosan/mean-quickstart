var databaseUrl = "ngforum";
var collections = ["users", "messages"];
var mongojs = require("mongojs");
var db = mongojs(databaseUrl, collections);

db.messages.drop();

db.messages.save({
	subject: 'Message 1', 
	content: 'Lorem ipsum Incididunt voluptate veniam reprehenderit Excepteur deserunt dolor eu laboris sunt id quis in cillum Ut laboris eiusmod velit reprehenderit in voluptate consectetur esse occaecat enim ex anim do qui culpa.', 
	updated: new Date() 
}, function(err, saved) {
	if (err || !saved) {
		console.log("Message not saved");
		console.log(err);
	} else {
		console.log("Message saved");
		console.log(saved);
	}
});

db.messages.save({
	subject: 'Message 2', 
	content: 'Lorem ipsum Deserunt non consectetur aute deserunt eiusmod laboris aute exercitation sit dolor nostrud sit minim qui mollit ut fugiat nulla in ullamco.', 
	updated: new Date()
}, function(err, saved) {
	if (err || !saved) {
		console.log("Message not saved");
		console.log(err);
	} else {
		console.log("Message saved");
		console.log(saved);
	}
});

db.messages.save({
	subject: 'Message 3', 
	content: 'Lorem ipsum Eiusmod dolore dolor ut exercitation consequat sunt nisi eu sunt voluptate in Excepteur sunt in dolore Duis adipisicing nostrud commodo cillum est laboris reprehenderit minim eu sed sunt nisi adipisicing.', 
	updated: new Date()
}, function(err, saved) {
	if (err || !saved) {
		console.log("Message not saved");
		console.log(err);
	} else {
		console.log("Message saved");
		console.log(saved);
	}
});