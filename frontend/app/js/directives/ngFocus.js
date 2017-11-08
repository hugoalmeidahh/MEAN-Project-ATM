angular
  .module('atm.directives')
  .directive('ngFocus', ngFocus);

function ngFocus(){
  var FOCUS_CLASS = "ng-focused";
  var PRISTINE_CLASS = "ng-pristine";
  var DIRTY_CLASS = "ng-dirty";
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$focused = false;
      element.bind('focus', function(evt) {
        element.addClass(FOCUS_CLASS);
        scope.$evalAsync(function() {ctrl.$focused = true;});
      }).bind('blur', function(evt) {
        element.removeClass(FOCUS_CLASS);
        element.removeClass(PRISTINE_CLASS);
        element.addClass(DIRTY_CLASS);
        ctrl.$pristine = false;
        ctrl.$dirty = true;
        scope.$evalAsync(function() {ctrl.$focused = false;});
      });
    }
  }
}