/**
* Module : _GenerateGUID
* Public Api : _GenerateGUID.init();
* Created on : 12.11.2017
* Author : Leo Jacobs
*/
 
var _GenerateGUID = (function(window){
'use strict';

  var init = function(){
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
 
  return {
    init: init
  }
}(window));