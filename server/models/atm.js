const mongoose = require('mongoose');

const ATM = mongoose.model('atm',{
	saldoTotal:{
		type:String,
		require:true,
		minLength:1,
		trim:true
	},
});

module.exports = {Todo};