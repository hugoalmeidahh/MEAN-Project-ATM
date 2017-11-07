const mongoose = require('mongoose');

const ATM = mongoose.model('atm',{
	numeroAtm:{
		type:String,
		require:true,
		minLength:1,
		trim:true
	},
	notasDisponiveis:{
		
	}
	completed:{
		type:Boolean,
		default:false
	},
	completedAt:{
		type:Number,
		default:null
	}
});

module.exports = {Todo};