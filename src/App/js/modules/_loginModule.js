var _LoginModule = (function (window) {
  var _privateSettings = {
    $loginEndPoint: 'http://soa.tew-dev.com/api/emsmock/login',
    $nurseEndPoint: 'http://soa.cerdelga.tew-dev.com/api/Nurse/0'
  };

  var _loginBeforeSend = function () {
    //Login Before Send
    var divLoading = '<div class="loading">' + '<img src="/images/icons/loading.gif"/>' + '</div>';
    $('.login-form').append(divLoading);
  };

  var _loginSuccess = function (data) {
    //Change the Url if token etc is in the url
    var currentUrl = document.location.href; 
    if (currentUrl.indexOf('token') > -1) {
      var newUrl = currentUrl.substring(0, currentUrl.indexOf('?'));
      history.pushState({}, "Cerdelga", newUrl); // Removing the valid check query string
    }
 
    //Setting logged in state in the session storage
    var isLoggedIn = data.LoggedIn;
    sessionStorage.setItem('isLoggedIn', isLoggedIn);



    $('#content').attr('class', '');
    $('.header-nav').removeClass('hide-me');
    if (localStorage.getItem("welcomeMsg") !== null) {
      /* Template Loading and History State */
      _TemplateLoader.init('pamChoice');
    } else {
      /* Template Loading and History State */
      _TemplateLoader.init('welcome');
      
    }

    //Ajax Call Here for Nurse Data only if success
    TEWLibrary.fetchData(_privateSettings.$nurseEndPoint, 'GET', {            
    }).done(_nurseSuccess).fail(_nurseFailure);
  };

//Nurse data pulled into UI
var _nurseSuccess = function(data){
  var fullName = data.FullName;
  var firstName = fullName.substring(0, fullName.indexOf(' '));  
  $('.link-profile').html(firstName); 
  _Profile.getNurseData(); 
};


var _nurseFailure = function(xhr){
  console.info(xhr.status);
};


  var _loginFailure = function (xhr) {
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

  var _bindUIActions = function () {
    $('.valid-fields').on('click', function (e) {
      e.preventDefault();
      //Capturing Data to Post
      var authEmail = $('#authEmail').val();
      var authPwd = $('#authPassword').val();

      // Data to send
      var $data = {
        "Email": authEmail,
        "Password": authPwd
      };

      //Ajax Call Here for login
      TEWLibrary.fetchData(_privateSettings.$loginEndPoint, 'POST', {
        $data: $data,
        $beforeSend: _loginBeforeSend
      }).done(_loginSuccess).fail(_loginFailure);

      

    });

    /* Forgotten password template Loading */
    $('.forgotten-password-btn').on('click', function(e){
      e.preventDefault();
      _TemplateLoader.init('forgottenPassword');
    });

    /* Registration template Loading */
    $('.register-btn').on('click', function(e){
      e.preventDefault();
      _TemplateLoader.init('registeration');
    });
  };

  var init = function () {
    _bindUIActions();
  };

  return {
    init: init
  }
}(window));