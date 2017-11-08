'use strict';

angular
  .module('atm.controllers')
  .controller('AtmCtrl', AtmCtrl);

AtmCtrl.$inject = ['$scope','$rootScope','$location','$routeParams','ngToast','ENV','FormUtils','AtmService', 'ModalManager', 'atm'];

function AtmCtrl($scope,$rootScope,$location,$routeParams,ngToast,ENV,FormUtils,AtmService, ModalManager, atm){

  /**-------------------------------
         View Model Definition
  ---------------------------------**/

  var vm = this;
  // Models / Variables
  vm.atm = {};
  vm.valorDeposito = null;
  vm.valorSaque = null;

  vm.op = 0;

  // Functions
  vm.init = init;
  vm.setOperacao=setOperacao;
  vm.realizarDeposito = realizarDeposito;
  vm.realizarSaque = realizarSaque;
 
  /**-------------------------------
           Implementation
  ---------------------------------**/

  /* init
  -------------------------------------------*/
  function init(){
    initAtm();
    //vm.showUploadPopup = ModalManager.modal();
  }
  
  /*
  -------------------------------------------*/
  function realizarDeposito(){
    var payload = {valorDeposito : vm.valorDeposito};

    AtmService.depositarATM(payload, success, error);

    function success(data){
      obterSaldo();
      vm.valorDepositado = data.data.valorDepositado;
      vm.valorDeposito = null;
      vm.op = "depositado";
    }

    function error(data){
      vm.valorDeposito = null;
      vm.op="erro";
      vm.mensagemErro = data.data;
    }
  } 

  /*
  -------------------------------------------*/
  function realizarSaque(){
    var payload = {valorSaque : vm.valorSaque};

    AtmService.sacarATM(payload, success, error);

    function success(data){
      obterNotas(vm.valorSaque);
      obterSaldo();
      vm.valorSacado = data.data.valorSacado;
      vm.valorSaque = null;
      vm.op = "sacado";
    }

    function error(data){
      vm.valorSaque = null;
      vm.op="erro";
      vm.mensagemErro = data.data;

      // ngToast.create({
      //   className: 'danger',
      //   content: data
      // });
    }
  }

  /*
  -------------------------------------------*/
  function obterSaldo(){
    AtmService.saldoATM().then(function(data){
      console.log("saldo");
      console.log(data);

      vm.saldoAtual = data.saldoAtual;
      vm.atm.saldoTotal = vm.saldoAtual;
    });
  }

  /*
  -------------------------------------------*/
  function obterNotas(valor) {
    var payload = {valorRequisitado : valor}

    AtmService.obterMinimoNotas(payload, success, error);

    function success(data){
      obterSaldo();
      vm.numeroNotas = data.data;
    }

    function error(data){
      ngToast.create({
        className: 'danger',
        content: data
      });
    }
  }

  /*
  -------------------------------------------*/
  function initAtm() {
     AtmService.initATM().then(function(data){
      console.log("init");
      console.log(data);
      vm.atm = data;
    });
  }

  /*
  -------------------------------------------*/
  function showUpload() {
      vm.showUploaded = false;
      vm.showUploadPopup.hide();
      vm.dzMethods.removeAllFiles();
  }

  function setOperacao(op){
    vm.op = op;
  }
}
