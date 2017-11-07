# MEAN-Project-ATM

Endpoints::

/obterMinimoNotas 
POST::
	return:{
		minimo:number
	}


/deposito
POST::
	return:{
		valorDepositado:number,
		saldoAtual:number
	}


/saque
POST::
	return {
		qtdNotas:number,
		valorSacado:number,
		saldoAtual:number 
	}