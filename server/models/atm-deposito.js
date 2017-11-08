const mongoose = require('mongoose');

const ATMDeposito = mongoose.model('atm-deposito',{
	valorDeposito:{
		type:Number,
		require:true,
		minLength:1,
		trim:true
	},
	dataDeposito:{ type : Date, default: Date.now }
});

module.exports = {ATMDeposito};