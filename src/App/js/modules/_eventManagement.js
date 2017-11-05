/**
* Module : _EventManagement
* Public Api : _EventManagement.init();
* Created on : 05.11.2017
* Author : Leo Jacobs
*/
 
var _EventManagement = (function(window){
'use strict';
  var _PrivateSettings = { 
    Topics : ['pamLevel'] 
  }
 
  var init = function(){
    
    /* PAM Level Result */
    PubSub.subscribe(_PrivateSettings.Topics[0], function(msg, data){
      //console.info(_PrivateSettings.Topics[0]);
      $('#result').addClass('level-' + data); // This will give the Pam Level Result Class to get the image
    });
  }
 
  return {
    Topic: _PrivateSettings.Topics,
    init: init
  }
}(window));