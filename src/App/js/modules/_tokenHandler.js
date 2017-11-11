/**
* Module : _TokenHandler
* Public Api : _TokenHandler.init();
* Created on : 08.11.2017
* Author : Leo Jacobs
*/
 
var _TokenHandler = (function(window){
'use strict';
  var _PrivateSettings = {
    $tokenReceiverApi : 'http://soa-cerdelga.tew-dev.com/api/emsmock/login', // Login Endpoint     
    $callback: null,
    $userData: null,
    $token: ''
  }
 
  var init = function(callback){
    _PrivateSettings.$userData = JSON.parse(sessionStorage.getItem('userData'));    
    var loginData = {
      "Email": _PrivateSettings.$userData.UserName,
      "Password": _PrivateSettings.$userData.Password
    };
    _PrivateSettings.$callback = callback;
    TEWLibrary.fetchData(_PrivateSettings.$tokenReceiverApi, 'POST', {$data: loginData} ).done(_getTokenSuccess).fail(_getTokenFailure);
  };

  var _getTokenSuccess = function(data){
    //Setting session storage with User data         
    var userDataToStore = {
      "UserName": data.userName,
      "Password": _PrivateSettings.$userData.Password,
      "UserId": data.userId,
      "Token": data.access_token,
      "Expiry": data[".expires"]
    };
    
    sessionStorage.removeItem('userData');
    sessionStorage.setItem('userData', JSON.stringify(userDataToStore));  
    _PrivateSettings.$token = data.access_token;  
    console.info(_PrivateSettings.$token);
    _PrivateSettings.$callback();
  };

  var _getTokenFailure = function(xhr){
    console.info('Relogin Attempt Failure ', xhr.status);
  };
 
  return {
    init: init,
    tokenSettings: _PrivateSettings
  }
}(window));