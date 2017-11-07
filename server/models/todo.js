const mongoose = require('mongoose');

const Todo = mongoose.model('Todo',{
	title:{
		type:String,
		require:true,
		minLength:1,
		trim:true
	},
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