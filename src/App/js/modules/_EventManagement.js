/**
* Module : _EventManagement
* Public Api : _EventManagement.init();
* Created on : 06.11.2017
* Author : Leo Jacobs
*/
 
var _EventManagement = (function(window){
'use strict';
  var _PrivateSettings = {
    Topics: ["xmlData"]
  }
 
  var init = function(){
    /* Build Pack XML Data */
    PubSub.subscribe(_PrivateSettings.Topics[0], function(msg, data){
      $('#send-collation').on('click', function(e){
        _CollationModule.init(data);
      });
    });
  }
 
  return {
    Topic: _PrivateSettings.Topics,
    init: init
  }
}(window));