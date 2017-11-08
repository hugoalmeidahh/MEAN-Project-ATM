
const mongoose = require('mongoose');

const ATMSaque = mongoose.model('atm-saque',{
	valorSacado:{
		type:Number,
		require:true,
		minLength:1,
		trim:true
	},
	dataDoSaque:{ type : Date, default: Date.now }
});

module.exports = {ATMSaque};