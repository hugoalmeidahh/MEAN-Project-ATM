'use strict';

angular
  .module('atm')
  .controller('RootCtrl', RootCtrl);

RootCtrl.$inject = ['$scope','$rootScope','$route','$location','$timeout','$auth','ngToast','ENV','LoadingManager','LoginService', 'ModalManager', 'FormUtils'];

function RootCtrl($scope,$rootScope,$route,$location,$timeout,$auth,ngToast,ENV,LoadingManager,LoginService, ModalManager, FormUtils){

  /**-------------------------------
         View Model Definition
  ---------------------------------**/

  var vm = this;
  $scope.imgBaseUrl = ENV.imgBaseUrl;
  
  $rootScope.logout = logout;

  // Functions
  vm.init = init;

  /**-------------------------------
           Implementation
  ---------------------------------**/

  /*
  -------------------------------------------*/
  function init(){
    _updateScreenSize();
  }
  
  /*
  -------------------------------------------*/
  function logout(){
    $location.path('/login');
  }

  /* Responsive layout helper
  ---------------------------------------------------- */
  $(window).bind("load resize", function(){
    _updateScreenSize();
    $scope.$apply();
  });

  function _updateScreenSize() {
    var windowWidth = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;

    // Extra small devices (portrait phones, less than 576px)
    if (windowWidth < 576){$rootScope.screenSize = 0;} // col-xs-
    // Small devices (landscape phones, 576px and up)
    if (windowWidth >= 576){$rootScope.screenSize = 1;}  // col-sm-
    // Medium devices (tablets, 768px and up)
    if (windowWidth >= 768){$rootScope.screenSize = 2;}  // col-md-
    // Large devices (desktops, 992px and up)
    if (windowWidth >= 992){$rootScope.screenSize = 3;}  // col-lg-
    // Extra large devices (large desktops, 1200px and up)
    if (windowWidth >= 1200){$rootScope.screenSize = 4;}  // col-xl-
  }
}
