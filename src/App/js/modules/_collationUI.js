/**
 * Module : _CollationModule
 * Public Api : _CollationModule.init();
 * Created on : 06.11.2017
 * Author : Leo Jacobs
 */

var _CollationModule = (function (window) {
  'use strict';

  var _Settings = {
    $collationEndpoint : 'http://soa-cerdelga.tew-dev.com/api/BookOrdering/sendBookOrder'
  }

  var init = function ($data) {
    
    var userData = JSON.parse(sessionStorage.getItem('userData'));

    // Data to Send to an api
    var orderNumber = _GenerateGUID.init();
    var xmlData = $data;
    var fullName = userData.FullName;
    var email = userData.UserName;


    var $collationData = {
      "OrderId": orderNumber,      
      "XmlData": xmlData,
      "FullName": fullName, 
      "Email": email
    };

    _APIHandler.init(_Settings.$collationEndpoint, 'POST', true, _success, _failure, $collationData);
  };

  var _success = function(){

    //This is just a temp screen needs to change as per the design
    $('#xml-content').html('Data successfully Sent');

    /* Modal Construct */
    var $modalTimeOut = 200;
    var $modalDirection = 'top';
    var $modalBackDrop = $('#xmlModal');
    var $modalContent = $('.m-modal__table');

    /* PAM Modal */
    Modal.init($modalBackDrop, $modalContent, $modalDirection, $modalTimeOut);

    Modal.modalPopOpen();
    $modalBackDrop.on('click', function (e) {
      Modal.modalPopClose();
    });
  };

  var _failure = function(xhr){
    console.info(xhr.status);
  };

  return {
    init: init
  }
}(window));