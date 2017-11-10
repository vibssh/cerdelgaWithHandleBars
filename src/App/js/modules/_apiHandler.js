/**
 * Module : _APIHandler
 * Public Api : _APIHandler.();
 * Created on : 
 * Author : 
 */

var _APIHandler = (function (window) {
  'use strict';
  var _PrivateSettings = {
    $maxRetryCount: 1
  };

  var init = function ($endpoint, $apiMethod, $tokenRequired, $success, $failure, $params) {
    _PrivateSettings.$endpoint = $endpoint;
    _PrivateSettings.$apiMethod = $apiMethod;
    _PrivateSettings.$tokenRequired = $tokenRequired;
    _PrivateSettings.$params = $params || {} || null || undefined;
    _PrivateSettings.$retryCount = 0;
    _PrivateSettings.$success = $success;
    _PrivateSettings.$failure = $failure;
    _executeAPI();
  };

  var _executeAPI = function () {
    var _getUserBeforeSend = function (xhr) {
      xhr.setRequestHeader('Authorization', 'bearer ' + _TokenHandler.tokenSettings.$token);
    };

    var _requestFailure = function (xhr) {
      var errorCode = xhr.status;
      if (errorCode === 401) {
        _PrivateSettings.$retryCount += 1;
        if (_PrivateSettings.$retryCount > _PrivateSettings.$maxRetryCount) {
          _PrivateSettings.$failure();
        } else {
          _executeAPI();
        }
      } else if (errorCode === 404) {
        _PrivateSettings.$failure();
      }
    };

    if (_PrivateSettings.$tokenRequired) {
      //DO the method if else timer
      var userData = JSON.parse(sessionStorage.getItem('userData'));
      var currentTime = new Date().getTime();
      var futureTime = new Date(userData.Expiry).getTime();
      console.info('Current Time ', currentTime);
      console.info('Future Time', futureTime);

      if (currentTime >= futureTime) {
        _TokenHandler.init(_executeAPI);

      } else {
        
          TEWLibrary.fetchData(_PrivateSettings.$endpoint, _PrivateSettings.$apiMethod, {
            $beforeSend: _getUserBeforeSend,
            $data: _PrivateSettings.$params
          }).done(_PrivateSettings.$success).fail(_requestFailure);
      }
    } else {
      TEWLibrary.fetchData(_PrivateSettings.$endpoint, _PrivateSettings.$apiMethod, {
        $data: _PrivateSettings.$params
      }).done(_PrivateSettings.$success).fail(_PrivateSettings.$failure);
    }

  };

  return {
    init: init
  }
}(window));