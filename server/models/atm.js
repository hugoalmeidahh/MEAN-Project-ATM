const mongoose = require('mongoose');

const ATM = mongoose.model('atm',{
	saldoTotal:{type:Number},
	notasDisponiveis:{type:Array, default:[1,2,5,10,20,50,100]},
	atualizadoEm:{type:Date, default:new Date()}
});

module.exports = {ATM};