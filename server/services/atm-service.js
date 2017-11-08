//const {Todo} = require('./server/models/todo'); example

const {ATM} = require('../models/atm');
const {Deposito} = require('../models/atm-deposito');
const {Saque} = require('../models/atm-saque');

const atmService = () =>{

	const NOTAS = obterNotasAtm();

 	const obterMinimoNotas = (valorRequisitado) => {
 		return new Promise((resolve,reject) => {
			let _minimoNotas = 0;
	 		let _qtdNotasDisponiveis = count(NOTAS);	

	 		do{
	 			if(valorRequisitado >= NOTAS[_qtdNotasDisponiveis]){
	 				let calc = valorRequisitado / NOTAS[_qtdNotasDisponiveis];
	 				_minimoNotas += Math.round( calc ); 
	 				valorRequisitado %= NOTAS[_qtdNotasDisponiveis];
	 			}else{
	 				_qtdNotasDisponiveis--;
	 				
	 				if(_qtdNotasDisponiveis == -1){
	 					return reject("Notas insuficiente para saque.");
	 					break;
	 				}
	 			}
	 		}while(valorRequisitado > 0);
	 		
	 		return resolve(_minimoNotas);
 		});
 	};

 	const depositoAtm = (valorDeposito) =>{
 		return new Promise((resolve,reject) => {
 			fnDepositarAtm(valorDeposito).then((atm_deposito)=>{
 				let novoDeposito = {valorDepositado:valorDeposito, atm:atm_deposito};
 				return resolve(novoDeposito);
 			},(e)=>{
 				return reject(e);
 			});
 		});
 	};

 	const saqueAtm = (valorSaque) =>{
		return new Promise((resolve,reject) => {
 			fnSacarAtm(valorSaque).then((atm_saque)=>{
 				let novoSaque = {valorSacado:valorSaque, atm:atm_saque};
 				return resolve(novoSaque);
 			},(e)=>{
 				return reject(e);
 			});
 		});
 	};

 	const obterSaldoAtm = () =>{
 		return new Promise((resolve,reject) => {
 			obterAtm().then((atm) => {
				return resolve({saldoAtual:atm[0].saldoTotal, atm:{_id:atm[0]._id}});
			},(e) => {
				return reject(e); 
			});
 		});
 	};

 	return { obterMinimoNotas, depositoAtm, saqueAtm, obterSaldoAtm };
};

module.exports = atmService;

count = (value) =>{
	return value.length;
};

obterNotasAtm = () =>{
	return [20,50,100];
};

obterAtm = () =>{
	return new Promise((resolve,reject) => {
		 ATM.find().limit(1)
		.then((atm) => {
			return resolve(atm);
		}, (e) => {
			return reject(e);
		})
	});
};

atualizaAtm = (atm) =>{
	return new Promise((resolve, reject) => {
		ATM.findByIdAndUpdate(atm._id, { saldoTotal: atm.saldoTotal },(err, atm) => {
		  if (err) return reject(err);
		  return resolve(atm);
		});
	});
};

criaNovoAtm = (valorDeposito) => {
	return new Promise((resolve, reject) => {
		let atm = new ATM({
			saldoTotal: valorDeposito
		})

		atm.save().then((atm) => {
			return resolve({atm});
		},(e) => {
			return reject(e); 
		});
	});
};

fnDepositarAtm = (valorDeposito) => {
	return new Promise((resolve, reject) => {
		obterAtm().then((atm) => {
			if(atm.length > 0){
				atm[0].saldoTotal += parseInt(valorDeposito);

				atualizaAtm(atm[0]).then((atm) => {
					return resolve(atm);
				},(e) => {
					return reject(e); 
				});

				// ATM.findByIdAndUpdate(atm[0]._id, { saldoTotal: atm[0].saldoTotal },(err, atm) => {
				//   if (err) return reject(err);
				//   return resolve(atm);
				// });

			}else{
				criaNovoAtm(valorDeposito).then((atm) => {
					return resolve(atm);
				},(e) => {
					return reject(e); 
				});
				// let atm = new ATM({
				// 	saldoTotal: valorDeposito
				// })

				// atm.save().then((atm) => {
				// 	return resolve({atm});
				// },(e) => {
				// 	return reject(e); 
				// });
			}
			
		});
	});
};

fnSacarAtm = (valorSaque) =>{
	return new Promise((resolve, reject) => {
		obterAtm().then((atm) => {
			if(atm[0].saldoTotal < valorSaque) return reject("Valor de saque indisponivel, valor em conta R$:" + (atm[0].saldoTotal/100).toFixed(2));
			if(atm[0].saldoTotal == 0) return reject("Sua conta esta em R$" + (atm[0].saldoTotal/100).toFixed(2) + ", Não pode realizar essa operação." )
			
			atm[0].saldoTotal -= parseInt(valorSaque);
			
			atualizaAtm(atm[0]).then((atm) => {
				return resolve(atm);
			},(e) => {
				return reject(e); 
			});
		});
	});
};