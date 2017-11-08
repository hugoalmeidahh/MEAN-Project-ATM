'use strict';

angular
  .module('atm.services')
  .factory('LoginService', LoginService);

LoginService.$inject = ['$q','UsuarioLogadoResource', 'LogoutResource', 'UsuariosUpdatePassResource', '$auth', '$rootScope', 'CheckToRedirectResource'];
function LoginService($q,UsuarioLogadoResource, LogoutResource, UsuariosUpdatePassResource, $auth, $rootScope, CheckToRedirectResource){


  /**-------------------------------------
                Methods
  --------------------------------------**/
  var methods = {
    obterDadosUsuario : obterDadosUsuario,
    logout: logout,
    updatePassword: updatePassword,
    checkToRedirect: checkToRedirect
  }

  return methods;


  /**-------------------------------------
              Implementation
  --------------------------------------**/

  /* Get cliente pesquisa
  -------------------------------------------*/
  function obterDadosUsuario(){
    var defer = $q.defer();

    UsuarioLogadoResource.get({},function(data){
      if(!data){defer.reject();return;}
      defer.resolve(data);
      },
      function(data){
        defer.reject(data);
      }
    );

    return defer.promise;
  }

  /* Get logout user
  -------------------------------------------*/
  function logout() {
    var defer = $q.defer();

    LogoutResource.get({}, function(data) {
      if (!data) { defer.reject(); return; }
      defer.resolve(data);
      $auth.setToken('');
      $rootScope.usuarioLogado = undefined;
    }, function() { defer.reject(data); });

    return defer.promise;
  }

  /* Atualiza a senha do usuario autenticado
  -------------------------------------------*/
  function updatePassword(payload, successCallback, errorCallback ) {
    var defer = $q.defer();
    UsuariosUpdatePassResource.save(payload,function(data){successCallback(data.toJSON());},function(data){errorCallback(data)});
    defer.promise;
  }

  /*
  -------------------------------------------*/
  function checkToRedirect(id) {
    var defer = $q.defer();

    CheckToRedirectResource.get({contrapropostaId: id}, function(data) {
      if (!data) { defer.reject(); return; }
      defer.resolve(data);
    }, function() { defer.reject(data); });

    return defer.promise;
  }

};

/**-------------------------------------
           API Resources
--------------------------------------**/
/*
  POST:
-----------------------------------------------------*/
angular.module('atm.services')
 .factory('UsuarioLogadoResource', ['$resource', 'ENV', function UsuarioLogadoResource($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/obter_dados_usuario/', {}, {});
}]);

/*
  GET:
-----------------------------------------------------*/
angular.module('atm.services')
 .factory('LogoutResource', ['$resource', 'ENV', function LogoutResource($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/logout/', {}, {});
}]);

/*
  POST:
-----------------------------------------------------*/
angular.module('atm.services')
 .factory('UsuariosUpdatePassResource', ['$resource', 'ENV', function UsuariosUpdatePassResource($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/usuarios/alterar-senha', {}, {});
}]);

/*
  GET:
-----------------------------------------------------*/
angular.module('atm.services')
 .factory('CheckToRedirectResource', ['$resource', 'ENV', function CheckToRedirectResource($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/login/short_url/:contrapropostaId', {contrapropostaId: '@contrapropostaId'}, {});
}]);
