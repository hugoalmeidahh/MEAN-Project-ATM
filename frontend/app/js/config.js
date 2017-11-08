'use strict';

/* Satellizer $authProvider
----------------------------------------*/
angular.module('atm')
  .config(['$authProvider','ENV',function($authProvider,ENV) {
    $authProvider.baseUrl = ENV.servicesBaseUrl;
    $authProvider.loginUrl = '/login';
    $authProvider.withCredentials = false;
    $authProvider.tokenHeader = 'Poliedro-Auth-Token';
    $authProvider.tokenType  = '' ;
  }
]);

/* ngToast
----------------------------------------*/
angular.module('atm')
  .config(['ngToastProvider',function(ngToastProvider) {
    ngToastProvider.configure({
      animation:"fade",
      verticalPosition:"bottom",
      dismissButton:true,
      timeout:8000
    });
  }
]);

/* UI-Bootstrap Datepicker
----------------------------------------
angular.module('poliedroBancoQuestoes')
.config(['uibDatepickerConfig','uibDatepickerPopupConfig',function(uibDatepickerConfig,uibDatepickerPopupConfig){
  uibDatepickerConfig.showWeeks = false;

  uibDatepickerPopupConfig.altInputFormats = [];
  uibDatepickerPopupConfig.clearText = 'Limpar';
  uibDatepickerPopupConfig.closeText = 'Fechar';
  uibDatepickerPopupConfig.currentText = 'Hoje';
  uibDatepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
  uibDatepickerPopupConfig.showButtonBar = false;
}])*/


/* Rotas Angular
----------------------------------------*/
angular.module('atm')
  .config(function($routeProvider, $sceDelegateProvider) {
    $routeProvider

    .when('/', {
      redirectTo: '/atm'
    })

    .when('/atm', {
      templateUrl: 'templates/atm/atm.html',
      controller: 'AtmCtrl as vm',
      resolve:{
        atm: ['$route','AtmService',function($route,AtmService) {

          AtmService.initATM().then(function(data){
            if(data == undefined){
              var payload = {valorDeposito : 0};

              AtmService.depositarATM(payload, success, error);

              function success(data){
                AtmService.initATM().then(function(data){
                  return data;
                });
              }
              function error(err){
                return err;
              }
            }else{
              return data;
            }
            
          });

        }]}
    })

    .otherwise({
      redirectTo: '/'
    });
});
