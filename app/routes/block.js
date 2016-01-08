module.exports = function(app){

	app.get('/createCoin', function(req, res) {
		res.json({result: app.get('source')})
	});


};


