let env = process.env.NODE_ENV || 'development';

if(env === 'development'){
	process.env.PORT = 8000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/atm-database-demo';
}else if(env === 'test'){
	process.env.PORT = 8000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/atm-test';
}