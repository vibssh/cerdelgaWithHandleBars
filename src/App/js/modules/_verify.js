var _VerifyEmailUrl = (function (window) {

  var _Settings = {
    $verifyEndPoint: 'http://soa.tew-dev.com/api/emsmock/verify'
  };


  var _getUrlParameter = function (sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  var _verifySuccess = function (data) {
    $('.login-section').append('<em class="text-success" style="display: block; text-align: center; color:#4cae4c;">' + 'Your account is now verified and activated. Now login and enjoy the portal ' + '</em>');
  };

  var _verifyFailure = function (xhr) {
    $('.loading').remove();
    var xhrStatus = xhr.status;
    var status = TEWLibrary.ajaxErrorHandler(xhrStatus);

    if (xhr.statusText !== 'Conflict' || xhr.status === '409') {
      var errorBody = "<div>" + "<img src='/images/icons/" + status + ".png'/ style='width: 50%; margin: 0 auto; display: block;'>" + "</div>";
      $('#login-error-message').find('.panel-heading').html('Server returned ' + status);
      $('#login-error-message').find('.panel-body').html(errorBody);
      if ((xhr.responseJSON) && (xhr.responseJSON.Message)) {
        var serverResponseMessage = xhr.responseJSON.Message;
        $('.panel-body').append('<p style="text-align:center; color:#a94442;">' + serverResponseMessage + '</p>');
        $('#login-error-message').fadeIn();
        $('#verify-email').addClass('hide-me');
      }
    } else {
      $('#verify-email').removeClass('hide-me');
      if ($('#login-error-message')) {
        $('#login-error-message').fadeOut();
      }

    }
  };

  var init = function () {
    var currentUrl = window.location.href;
    if (currentUrl.indexOf('token') > -1) {

      //Do an ajax post to the verify Endpoint
      var emailString = _getUrlParameter('email'); // Getting email from the url string
      var tokenString = _getUrlParameter('token'); // Getting token from the url string

      var email = emailString,
        token = tokenString;

      // Data to post to verify endpoint
      var verifyPostData = {
        'Email': email,
        'Token': token
      };

      //Ajax Call Here
      TEWLibrary.fetchData(_Settings.$verifyEndPoint, 'POST', {
        $data: verifyPostData
      }).done(_verifySuccess).fail(_verifyFailure);
    }
  };

  return {
    init: init
  }
}(window));