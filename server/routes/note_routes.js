module.exports = function(app,db){

	app.post('/notes', (req, res) => {
		//TODO: create note here.
		console.log(req.body)
		res.send('HELLO NOTE');
	});

	app.get('/notes', (req,res)=>{
		console.log("teste get");
		res.send('my get api')
	});

};