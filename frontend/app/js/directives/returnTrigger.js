angular
  .module('atm.directives')
  .directive('returnTrigger', returnTrigger);
  
function returnTrigger(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      
      var trigger = {
        selector:attrs.returnTrigger.split(',')[0],
        event:attrs.returnTrigger.split(',')[1]
      }
      
      var targetElement = $(trigger.selector);
      if(targetElement.length<1){
        console.log("Return Trigger:")
        console.log(element[0].outerHTML);
        console.log('>> A diretiva não conseguiu encontrar o elemento especificado pelo seletor "'+trigger.selector+'"');
      }
      
      element.bind("keydown keypress", function (event) {
        if(event.which === 13){
          targetElement.trigger(trigger.event);
          event.preventDefault();
        }
      });
        
      return;
    }
  }
}