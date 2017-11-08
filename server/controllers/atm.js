const ATMServices = require('../services/atm-service');

module.exports = {
	obterMinimoNotas(valorRequisitado){
		return ATMServices().obterMinimoNotas(valorRequisitado);
	},

	depositoAtm(valorDeposito){
		return ATMServices().depositoAtm(valorDeposito);
	},

	saqueAtm(valorSaque){
		return ATMServices().saqueAtm(valorSaque);
	},

	saldoAtm(){
		return ATMServices().obterSaldoAtm();
	}

};