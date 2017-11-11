var _ForgottenPassword = (function (window) {
  'use strict';
  var _pvtSettings = {
    $forgottenPwdReqEndPoint: 'http://soa-cerdelga.tew-dev.com/api/emsmock/forgotPasswordRequest'
  };

  var _loginBeforeSend = function () {
    var divLoading = '<div class="loading">' + '<img src="/images/icons/loading.gif"/>' + '</div>';    
    $('.login-form').append(divLoading);
  };


  var _forgottenSuccess = function(){
    $('.forgotten').hide();
    $('.forgotten-success').addClass('reveal');
    // setTimeout(function () {
    //     window.location = "/";
    // }, 10000);
  };

  var _forgottenFailure = function (xhr) {
    $('.loading').remove();
    var xhrStatus = xhr.status;
    var status = TEWLibrary.ajaxErrorHandler(xhrStatus);
    var errorBody = "<div>" + "<img src='/images/icons/" + status + ".png'/ style='width: 50%; margin: 0 auto; display: block;'>" + "</div>";
    $('#login-error-message').find('.panel-heading').html('Server returned ' + status);
    $('#login-error-message').find('.panel-body').html(errorBody);
    $('#login-error-message').fadeIn();
  };

  var _PostDataForgottenPwd = function () {
    var forgottenEmail = $('#email-forgotten').val();

    // Data to send
    var $data = {
      "Email": forgottenEmail
    };

    //Ajax Call Here
    TEWLibrary.fetchData(_pvtSettings.$forgottenPwdReqEndPoint, 'POST', {
      $data: $data,
      $beforeSend: _loginBeforeSend
    }).done(_forgottenSuccess).fail(_forgottenFailure);
  };


  var init = function () {
    $('.request-pwd-btn').on('click', function (e) {
      e.preventDefault();
    });
  };

  return {
    init: init,
    forgotPasswordRequest: _PostDataForgottenPwd
  }


}(window));


$(document).on('click', 'button.request-pwd-btn', function (e) {
  e.preventDefault();
  //Forgotten Password AJAX
  //Capturing POST DATA


});