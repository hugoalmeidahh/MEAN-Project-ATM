'use strict';

angular
  .module('atm.services')
  .factory('AtmService', AtmService);

AtmService.$inject = ['$q','ObterAtmAPI', 'ObterNotasAPI', 'ObterSaldoAPI', 'DepositarAPI', 'SacarAPI'];
function AtmService($q,ObterAtmAPI, ObterNotasAPI, ObterSaldoAPI, DepositarAPI, SacarAPI){


  /**-------------------------------------
                Methods
  --------------------------------------**/
  var methods = {
    initATM:initATM,
    obterMinimoNotas:obterMinimoNotas,
    saldoATM:saldoATM,
    depositarATM:depositarATM,
    sacarATM:sacarATM
  }

  return methods;

  /**-------------------------------------
              Implementation
  --------------------------------------**/

  /* Inicializa ATM
  -------------------------------------------*/
  function initATM(){
    var defer = $q.defer();

    ObterAtmAPI.get({},function(data){

      if(!data){defer.reject();return;}
      defer.resolve(data.data);
    
    },function(data){
        defer.reject(data);
      }
    );

    return defer.promise;
  }

  // /* GET : Obter quantidade de notas 
  // -------------------------------------------*/
  // function obterMinimoNotas(){
  //   var defer = $q.defer();

  //   ObterNotasAPI.get({},function(data){

  //     if(!data){defer.reject();return;}
  //     defer.resolve(data.data);
    
  //   },function(data){
  //       defer.reject(data);
  //     }
  //   );

  //   return defer.promise;
  // }

  /* GET : Obter saldo atualizado
  -------------------------------------------*/
  function saldoATM(){
    var defer = $q.defer();

    ObterSaldoAPI.get({},function(data){

      if(!data){defer.reject();return;}
      defer.resolve(data.data);
    
    },function(data){
        defer.reject(data);
      }
    );

    return defer.promise;
  }

    /* POST : Fazer deposito
  -------------------------------------------*/
  function obterMinimoNotas(payload, successCallback, errorCallback ) {
    ObterNotasAPI.save(payload,function(data){successCallback(data.toJSON());},function(data){errorCallback(data)});
  }

  /* POST : Fazer deposito
  -------------------------------------------*/
  function depositarATM(payload, successCallback, errorCallback ) {
    DepositarAPI.save(payload,function(data){successCallback(data.toJSON());},function(data){errorCallback(data)});
  }

  /* POST : Fazer saque
  -------------------------------------------*/
  function sacarATM(payload, successCallback, errorCallback ) {
    SacarAPI.save(payload,function(data){successCallback(data.toJSON());},function(data){errorCallback(data)});
  }
};



/**-------------------------------------
           API Resources
--------------------------------------**/
/*
  GET:
-----------------------------------------------------*/
angular.module('atm.services')
 .factory('ObterAtmAPI', ['$resource', 'ENV', function ObterAtmAPI($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/initAtm', {}, {});
}]);

/*GET:
-----------------------------------------------------*/
angular.module('atm.services')
 .factory('ObterSaldoAPI', ['$resource', 'ENV', function ObterAtmAPI($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/obterSaldoAtm', {}, {});
}]);

/*POST:
-----------------------------------------------------*/
angular.module('atm.services')
 .factory('ObterNotasAPI', ['$resource', 'ENV', function ObterAtmAPI($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/obterMinimoNotas', {}, {});
}]);
 
/*
  POST:
-----------------------------------------------------*/
angular.module('atm.services')
 .factory('DepositarAPI', ['$resource', 'ENV', function DepositarAPI($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/fazerDeposito', {}, {});
}]);

/*
POST:
-----------------------------------------------------*/
angular.module('atm.services')
 .factory('SacarAPI', ['$resource', 'ENV', function SacarAPI($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/fazerSaque', {}, {});
}]);