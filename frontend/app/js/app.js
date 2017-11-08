'use strict';

/**-------------------------------
       Module Definition
---------------------------------**/
Dropzone.autoDiscover = false;

angular.module('atm', [
  'atm.controllers',
  'atm.services',
  'atm.directives',
  'atm.utils',
  'atm.filters',
  'atm.dto',
  'atm.models',
  'envConfig',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngAnimate',
  'ui.bootstrap',
  'ngToast',
  'ngMask',
  'angucomplete-alt',
  'satellizer',
  'thatisuday.dropzone'
]);

angular.module('atm.controllers', []);
angular.module('atm.services', []);
angular.module('atm.utils', []);
angular.module('atm.directives', []);
angular.module('atm.filters', []);
angular.module('atm.dto', []);
angular.module('atm.models', []);
