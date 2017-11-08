'use strict';

angular
  .module('atm.controllers')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope','$rootScope','$location','$auth','ngToast','FormUtils','LoginService', '$window'];

function LoginCtrl($scope,$rootScope,$location,$auth,ngToast,FormUtils,LoginService, $window){

  /**-------------------------------
         View Model Definition
  ---------------------------------**/

  var vm = this;

  // Functions
  vm.init = init;
  vm.login = login;

  /**-------------------------------
           Implementation
  ---------------------------------**/

  /*
  -------------------------------------------*/
  function init(){
    if ($rootScope.usuarioLogado != undefined && $auth.getToken() != '') {
      $location.path('/');
    }
  }

  /*
  -------------------------------------------*/
  function login(){
    /*FormUtils.setDirty(vm.formLogin);
    if(vm.formLogin.$invalid) return;

    $auth.login({
      email:vm.email,
      password:vm.senha
    }).then(function(response) {
      _obterDadosUsuario();
    })
    .catch(function(response) {
      ngToast.create({
        className: 'danger',
        content: response.data.mensagem
      });
    });*/
    
    $location.path('/home');
  }

  /*
  -------------------------------------------*/
  function _obterDadosUsuario(){
    LoginService.obterDadosUsuario().then(successCallback,errorCallback)

    function successCallback(data){
      $rootScope.usuarioLogado = data.usuario;
      _redirectToWhere();
    }

    function errorCallback(data){
      ngToast.create({
        className: 'danger',
        content: data.mensagem
      });
    }
  }
}
