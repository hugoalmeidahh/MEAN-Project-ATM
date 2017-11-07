const NOTAS = [20,50]; //[1,2,5,10,20,50,100];

const atmService = () =>{

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
 	}

 	return { obterMinimoNotas };
};

module.exports = atmService;

count = (value) =>{
	return value.length;
};




		// let _minimoNotas = 0;
 		// let _qtdNotasDisponiveis = count(NOTAS);	

 		// do{

 		// 	if(valorRequisitado >= NOTAS[_qtdNotasDisponiveis]){
 		// 		let calc = valorRequisitado / NOTAS[_qtdNotasDisponiveis];
 		// 		_minimoNotas += Math.round( calc ); 
 		// 		valorRequisitado %= NOTAS[_qtdNotasDisponiveis];

 		// 	}else{
 		// 		_qtdNotasDisponiveis--;
 				
 		// 		if(_qtdNotasDisponiveis == -1){
 		// 			return new Error('Notas indisponivel para saque.');
 		// 			break;
 					
 		// 		}
 		// 	}

 		// }while(valorRequisitado > 0);
 		
 		// return _minimoNotas 