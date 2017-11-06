/**
 * Module : _CollationModule
 * Public Api : _CollationModule.init();
 * Created on : 06.11.2017
 * Author : Leo Jacobs
 */

var _CollationModule = (function (window) {
  'use strict';


  var init = function ($data) {
    var dialogBox = $('<div id="xml-box" style="padding: 1em;"></div>');
    dialogBox.text($data);
    
    $('#xml-content').html(dialogBox);

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
  }

  return {
    init: init
  }
}(window));