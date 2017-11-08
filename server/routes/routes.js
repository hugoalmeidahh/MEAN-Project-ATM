const {Todo} = require('../models/todo')

const atmCtrl = require('../controllers/atm')

module.exports = function(app,db){

	app.post('/api/obterMinimoNotas', (req, res) => {
		atmCtrl.obterMinimoNotas(req.body.valorRequisitado).then((data) => {
		    res.send({data})
		}, (e) => {
		  	console.log(e);
		    res.status(400).send(e);
		});
	});

	app.post('/api/fazerDeposito', (req, res) => {
		atmCtrl.depositoAtm(req.body.valorDeposito).then((data) => {
		    res.send({data})
		}, (e) => {
		  	console.log(e);
		    res.status(400).send(e);
		});
	});

	app.post('/api/fazerSaque', (req, res) => {
		atmCtrl.saqueAtm(req.body.valorSaque).then((data) => {
		    res.send({data})
		}, (e) => {
		  	console.log(e);
		    res.status(400).send(e);
		});
	});

	app.get('/api/obterSaldoAtm', (req,res)=>{
		atmCtrl.saldoAtm(req.body.valorSaque).then((data) => {
		    res.send({data})
		}, (e) => {
		  	console.log(e);
		    res.status(400).send(e);
		});
	});




	// app.post('/notes', (req, res) => {
	// 	//TODO: create note here.
	// 	console.log(req.body)
	// 	res.send('HELLO NOTE');
	// });

	// app.get('/notes', (req,res)=>{
	// 	console.log("teste get");
	// 	res.send('my get api')
	// });


	// app.post('/todos', (req,res) => {
	// 	let todo = new Todo({
	// 		title: req.body.text
	// 	})

	// 	todo.save().then((doc) => {
	// 		res.send(doc);
	// 	},(e) => {
	// 		res.status(400).send(e);
	// 	});
	// });

	// app.get('/todos', (req, res) => {
	//   Todo.find().then((todos) => {
	//     res.send({todos})
	//   }, (e) => {
	//     res.status(400).send(e)
	//   })
	// });
	
	// app.get('/todos/:id', (req, res) => {
	//   let id = req.params.id
	//   if (!ObjectId.isValid(id)) {
	//     return res.status(404).send('ID is not valid')
	//   }

	//   Todo.findById(id).then((todo) => {
	//     if (!todo) {
	//       return res.status(404).send()
	//     }
	//     res.send({todo})
	//   }).catch((e) => {
	//     res.status(400).send()
	//   })
	// })

	//app.get('*', (req, res) => {

	// atmService().obterMinimoNotas(1150).then((data) => {
	//     res.send({data})
	//   }, (e) => {
	//   	console.log(e);
	//     res.status(400).send(e);
	//   })

	// // res.status(200).send({minimo});
	//});
};