angular.module('atm')
  .config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('HttpInterceptor');
  $httpProvider.useApplyAsync(true);
}]);

angular.module('atm').factory('HttpInterceptor', ['$q','$location','$rootScope','ENV','LoadingManager',
  function HttpInterceptor($q,$location,$rootScope,ENV,LoadingManager) {
    
    // Configura o loading manager para a url do servidor
    LoadingManager.config({servicesUrl:ENV.servicesBaseUrl});
    
    /* Observe route change start
    ---------------------------------------------------- */
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      $rootScope.exibirLogin = next.originalPath==="/login";
    });

    /* Observe route change succes
    ---------------------------------------------------- */
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      var path = $location.path();
      var activeRoute = path.split('/')[1];
      var activeSubRoute = path.split('/')[2];

      $rootScope.activeRoute = activeRoute;
      $rootScope.activeSubRoute = activeSubRoute;
    });
    
   /**------------------------------
                Methods
    -------------------------------**/
    
    return {
      request       : request,
      requestError  : requestError,
      response      : response,
      responseError : responseError
    };
    
    /**------------------------------
            Implementation
    -------------------------------**/
    
    /* Observe request
    ---------------------------------------------------- */
    function request(config) {
      var requestUrl = config.url;
      
      var isPolling = config.params?config.params.polling:false;
      
      if(requestUrl.indexOf(ENV.servicesBaseUrl)!=-1 && !isPolling)
        LoadingManager.addWait({url:requestUrl});
      return config;
    }
    
    /* Observe request error
    ---------------------------------------------------- */
    function requestError(rejection) {
      var rejectionUrl = rejection.config.url;
      if(rejectionUrl.indexOf(ENV.servicesBaseUrl)!=-1)
        LoadingManager.removeWait({url:rejectionUrl});
      return $q.reject(rejection);
    }

    /* Observe request response
    ---------------------------------------------------- */
    function response(response) {
      var responseUrl = response.config.url;
      if(responseUrl.indexOf(ENV.servicesBaseUrl)!=-1)
        LoadingManager.removeWait({url:responseUrl});
      return response;
    }

    /* Observe request error response
    ---------------------------------------------------- */
    function responseError(rejection) {
      var rejectionUrl = rejection.config.url;
      if(rejectionUrl.indexOf(ENV.servicesBaseUrl)!=-1)
        LoadingManager.removeWait({url:rejectionUrl});
      
      if(rejection.status===401) $location.path('/login');
      
      return $q.reject(rejection);
    }
}]);