angular
  .module('atm.utils')
  .factory('LoadingManager',LoadingManager);
  
LoadingManager.$inject = ['$rootScope'];
  
function LoadingManager($rootScope) {
  
  var loadingManager = this;
  loadingManager.waitingStack = [];
  loadingManager.servicesUrl = null;
  loadingManager.timestamp = null;
  $rootScope.waiting = false;
  
  /**------------------------------
          Metodos Expostos
  -------------------------------**/
  
  var metodos = {
    get        : get,        // Obtem as propriedades do manager
    config     : config,     // Configura os parametros do manager
    reset      : reset,      // Reseta os parametros do manager
    getWait    : getWait,    // Obtem um objeto de espera
    addWait    : addWait,    // Adiciona uma espera ao manager
    removeWait : removeWait  // Remove uma espera do manager
  }
  
   return metodos;
  
  /**------------------------------
           Implementação
  -------------------------------**/

  /* Obtem as propriedades do manager
  -------------------------------------*/
  function get(){
    return {
      servicesUrl:loadingManager.servicesUrl,
      waitingStack:loadingManager.waitingStack,
      timestamp:loadingManager.timestamp
    };
  }
  
  /* Obtem um objeto de espera
  ------------------------------------*/
  function getWait(waitObject){
    for(var i=0;i<loadingManager.waitingStack.length;i++){
      var storedObject = loadingManager.waitingStack[i];
      if(isEqual(storedObject,waitObject))
        return storedObject;
    }
    return null;
  }
  
  /* Configura os parametros do manager
  ---------------------------------------*/
  function config(params){
    if(params.servicesUrl!=undefined) loadingManager.servicesUrl = params.servicesUrl;
    loadingManager.timestamp = new Date().valueOf();
  }
  
  /* Reseta os parametros do manager
  ------------------------------------*/
  function reset(){
    loadingManager.servicesUrl = null;
    loadingManager.timestamp = null;
  }
  
  /* Atualiza o status de espera do rootScope
  ---------------------------------------------*/
  function updateWaitingStatus(){
    var requireWaiting = loadingManager.waitingStack.length>0;
    if($rootScope.waiting!=requireWaiting){
      $rootScope.waiting = requireWaiting;
    }
  }
  
  /* Adiciona uma espera ao manager
  ------------------------------------*/  
  function addWait(waitObject){
    loadingManager.waitingStack.push(waitObject);
    updateWaitingStatus();
  }
  
  /* Remove uma espera do manager
  ------------------------------------*/
  function removeWait(waitObject){
    var removeIndex = undefined;
    for(var i=0;i<loadingManager.waitingStack.length;i++){
      var storedObject = loadingManager.waitingStack[i];
      if(isEqual(storedObject,waitObject)){
        removeIndex=i;
        break
      }
    }
    if(removeIndex!=undefined){
      loadingManager.waitingStack.splice(removeIndex,1);
      updateWaitingStatus();
    }
  }
  
  /* Função de comparação entre objetos de espera
  -------------------------------------------------*/
  function isEqual(a,b){
    if(!b) return false;
    // Iterate in properties to compare values
    var aPropLength = 0;
    var bPropLength = 0;
    for(var property in a){
      if(b[property]){ // b have same property name
        if(a[property] && typeof(a[property])=='object'){ // Recursively compare Object properties
          if(!isEqual(a[property],b[property])) return false;
        }else{
          if(!(a[property]===b[property])) return false; // a and b properties have different values
        }
      }else{
        return false; // b don't have a's property
      }
      aPropLength++;
    }
    for(var property in b) bPropLength++;
    if(aPropLength!==bPropLength) return false; // b have more properties than a
    return true;
  }
}