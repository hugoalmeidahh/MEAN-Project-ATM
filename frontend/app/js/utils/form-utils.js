angular.module('atm.utils')
  .factory('FormUtils', FormUtils);

function FormUtils(){
  /**------------------------------
          Metodos Expostos
  -------------------------------**/
  
  var metodos = {
    setDirty    : setDirty,
    setPristine : setPristine
  }
  
  return metodos;
  
  /**------------------------------
           Implementação
  -------------------------------**/
  
  /* Marca o formulario e todos seus campos com dirty
  -----------------------------------------------------*/
  function setDirty(form){
    form.$setDirty();
    var formControls = form.$$controls;
    
    for(var i=0;i<formControls.length;i++){
      if(formControls[i].$setDirty)
        formControls[i].$setDirty();
    }
    
    return;
  }
  
  /* Marca o formulario e todos seus campos com pristine
  -----------------------------------------------------*/
  function setPristine(form){
    form.$setPristine();
    var formControls = form.$$controls;
    
    for(var i=0;i<formControls.length;i++){
      if(formControls[i].$setPristine)
        formControls[i].$setPristine();
    }
    
    return;
  }
}