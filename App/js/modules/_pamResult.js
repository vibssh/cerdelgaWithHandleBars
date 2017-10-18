var _PAMResult = (function (window) {
  'use strict';
  var _bindUIActions = function () {
    
    /* Retake PAM Test */  
    $('.take-pam').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      _TakePAM.init();
    });
  };

  return {
    init: _bindUIActions
  }
}(window));