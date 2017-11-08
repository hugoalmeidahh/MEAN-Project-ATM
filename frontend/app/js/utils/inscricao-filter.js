angular
  .module('atm.filters')
  .filter('espelhoInscricao',espelhoInscricao);

function espelhoInscricao(){
  return function(inscricao, size) {
    if(!inscricao)
      return undefined;
    var newInscricao = inscricao;
    for (i = inscricao.length; i < size; i++){
      newInscricao = "0"+newInscricao
    }
    
    return newInscricao;
  };
}