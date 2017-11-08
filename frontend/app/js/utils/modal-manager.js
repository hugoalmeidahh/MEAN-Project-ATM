angular
  .module('atm.utils')
  .factory('ModalManager',ModalManager);
  
ModalManager.$inject = ['$rootScope'];
  
function ModalManager($rootScope) {
  var Modal = function Modal() {
    this.isVisible = false;
  };
  
  Modal.prototype = {};
  Modal.prototype.show = _show;
  Modal.prototype.hide = _hide;
  Modal.prototype.toggle = _toggle;
  Modal.prototype.replaceShow = _replaceShow;
  Modal.prototype.replaceHide = _replaceHide;
  Modal.prototype.replaceToggle = _replaceToggle;
  
  /**------------------------------
          Metodos Expostos
  -------------------------------**/
  
  var metodos = {
    modal : modal
  }
  
   return metodos;
  
  /**------------------------------
           Implementação
  -------------------------------**/

  /* 
  -------------------------------------*/
  function modal(){
    var newModal = new Modal();
    
    return newModal;
  }
  
  /* 
  ------------------------------------*/
  function _show(params){
    this.isVisible = true;
    for(var key in params){
      this[key] = params[key]
    }
  }
  
  /* 
  ------------------------------------*/
  function _hide(params){
    this.isVisible = false;
    for(var key in params){
      this[key] = params[key]
    }
  }
  
  /* 
  ------------------------------------*/
  function _toggle(params){
    this.isVisible = !this.isVisible;
    for(var key in params){
      this[key] = params[key]
    }
  }
  
  /* 
  ------------------------------------*/
  function _replaceShow(newFunction){
    this.show = function(){
      newFunction.apply(this,arguments);
      this.isVisible = true;
    }
  }
  
  /* 
  ------------------------------------*/
  function _replaceHide(newFunction){
    this.hide = function(){
      newFunction.apply(this,arguments);
      this.isVisible = false;
    }
  }
  
  /* 
  ------------------------------------*/
  function _replaceToggle(newFunction){
    this.toggle = function(){
      newFunction.apply(this,arguments);
      this.isVisible = !this.isVisible;
    }
  }
}