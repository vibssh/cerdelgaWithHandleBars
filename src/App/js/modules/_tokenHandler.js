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
    
    $newToken : '',
    $futureTime: ''
  }
 
  var init = function(){
    var userData = JSON.parse(sessionStorage.getItem('userData'));
    var loginData = {
      "Email": userData.UserName,
      "Password": userData.Password
    };

    TEWLibrary.fetchData(_PrivateSettings.$tokenReceiverApi, 'POST', {$data: loginData} ).done(_getTokenSuccess).fail(_getTokenFailure);
  };

  var _getTokenSuccess = function(data){
    //Setting session storage with User data
    console.info('Login Success', data);
    var userData = JSON.parse(sessionStorage.getItem('userData'));
    var userDataToStore = {
      "UserName": data.userName,
      "Password": userData.Password,
      "UserId": data.userId,
      "Token": data.access_token,
      "Expiry": data[".expires"]
    };

    sessionStorage.removeItem('userData');
    sessionStorage.setItem('userData', JSON.stringify(userDataToStore));    
    
  };

  var _getTokenFailure = function(xhr){
    console.info('Relogin Attempt Failure ', xhr.status);
  };
 
  return {
    init: init
  }
}(window));