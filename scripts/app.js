var addTreatmentCentreSettings,
addTreatmentCentre = {
    settings: {
        $formId: '',
        $treatmentEndPoint: 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/'
    },

    init: function (formId) {
        addTreatmentCentreSettings = this.settings;
        addTreatmentCentreSettings.$formId = formId;
        this.bindUIActions();

    },

    bindUIActions: function () {
        addTreatmentCentre.validateMe();
        $('#add-treatment-centre').on('submit', function (e) {
            e.preventDefault();
            addTreatmentCentre.validateMe();
        });

        $('.cancel').on('click', function(e) {
            e.preventDefault();
            addTreatmentCentre.resetFields();
            $('.treatment-centre-choice').removeClass('hide-me');

        });
    },


    validateMe: function () {
        //console.info(addTreatmentCentreSettings.$formId);
        addTreatmentCentreSettings.$formId.validate({

            //Event Triggered as you type in the input boxes
            onfocusout: function (el, e) {
                $(el).valid();
            },

            onkeydown: function (el, e) {
                $(el).valid();
            },

            rules: {
                addCentreName: "required",
                addUnitName: "required",
                addStreetName: "required",
                addCity: "required",
                addCounty: "required",
                addPostCode: "required",
                addPhone: "required"
            },
            messages: {
                addCentreName: "Please Enter a Treatment Centre Name",
                addUnitName: "Please Enter a Unit Name",
                addStreetName: "Please Enter a Street Name",
                addCity: "Please Enter a City Name",
                addCounty: "Please Enter a County",
                addPostCode: "Please Enter a Postcode",
                addPhone: "Please Enter a Phone"
            },


            submitHandler: function () {
                addTreatmentCentre.addCentre();
            }
        });
    },
    
    addCentre: function () {
        /* Data capture */
        var centreName = $('input[id="addCentreName"]').val();
        var unitName = $('input[id="addCentreName"]').val();
        var streetName = $('input[id="addStreetName"]').val();
        var city = $('input[id="addCity"]').val();
        var county = $('input[id="addCounty"]').val();
        var postCode = $('input[id="addPostCode"]').val();
        var phone = $('#addPhone').val();

        /* Align Data to the API or JSON File to post it */
        var $data = {
            "CentreName": centreName,
            "UnitName": unitName,
            "StreetName": streetName,
            "City": city,
            "County": county,
            "PostCode": postCode,
            "PhoneNumber": phone,
            "InReview": true
        };

        /* Ajax Posting of the data aligned above */
        $.ajax({
            url: addTreatmentCentreSettings.$treatmentEndPoint,
            type: 'POST',
            //data: data,
            contentType: 'application/json',
            data: JSON.stringify($data),
            //contentType: "application/json",
            crossDomain: true,
            //dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                // alert('successfully posted data !!!');
                addTreatmentCentre.resetFields();
                $('.add-treatment-centre').addClass('hide-me');
                $('.treatment-centre-review').removeClass('hide-me');


            },
            error: function (data, textStatus, error) {
                console.info(error);
            }
        });
    },

    resetFields: function () {
        $('input[id="addCentreName"]').val('');
        $('input[id="addUnitName"]').val('');
        $('input[id="addStreetName"]').val('');
        $('input[id="addCity"]').val('');
        $('input[id="addCounty"]').val('');
        $('input[id="addPostCode"]').val('');
        $('input[id="addPhone"]').val('');
    }

};
/**
* Module : _ChooseTreatmentCentre
* Public Api : _ChooseTreatmentCentre.init();
* Created on : 24/10/2017
* Author : Leo Jacobs
*/
 
var _ChooseTreatmentCentre = (function(window){
'use strict';

  var _Settings = {
    $chooseTreatmentCentreEndPoint : 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/',
    $selectedItem: null
  }

  /* Methods*/
  var _displayChoiceScreen = function(){
    $('form').parent().addClass('hide-me');
    $('.treatment-centre-choice').removeClass('hide-me');
  };

  var _optionSelected = function(){
    _Settings.$selectedItem = null;
    _Settings.$selectedItem = $('#chooseTreatmentCentre').find(':selected').val();
    
    //Incorrect link gets the data id 
    $('.incorrect-centre').prop('data-id',_Settings.$selectedItem );
    
    //Update URL ID 
    _updateTreatmentCentreSettings.$id = _Settings.$selectedItem;
  };

  var _fetchData = function(){
    return $.ajax({
      url: _Settings.$chooseTreatmentCentreEndPoint + _Settings.$selectedItem,
      type: 'GET'
    }).done(_success).fail(_failure);
  };

  var _success = function(data){
    
    //For UI only Remove Existing item from the TreatmentCentre 
    $('#centreName').val(data.CentreName);
    $('#unitName').val(data.UnitName);
    $('#streetName').val(data.StreetName);
    $('#city').val(data.City);
    $('#county').val(data.County);
    $('#postCode').val(data.PostCode);
    $('#phone').val(data.PhoneNumber);
    $('form').parent().addClass('hide-me');
    $('.view-treatment-centre').removeClass('hide-me');

    // To give the .incorrect-centre link a data id
    $('.incorrect-centre').attr('data-id', data.Id);
    $('.link-profile').attr('data-id', data.Id);

  };

  var _failure = function(xhr){
    console.info(xhr.status);
  };

 /* Events */
  var _bindUIActions = function(){
    $.ajax({
      url: 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/',
      type: 'GET',
      success: function (data, jqXHR, textStatus) {
        console.info(data);
        $.each(data, function (index, treatmentcentre) {
          //console.info(treatmentcentre);
          $('#chooseTreatmentCentre').append('<option value="' + treatmentcentre.Id + '">' + treatmentcentre.CentreName + '</option>');
          //nurseViewSettings.$treatmentCentreId = data[0].treatmentcentre.Id;
        });
      },
      error: function (data, xhr, textStatus) {
        console.info(xhr);
      }
    });

    //Display the Treatment Choice Screen on click of change-centre link
    $('.change-centre').on('click', function(e){
      e.preventDefault();
      _displayChoiceScreen();
    });

    //Option selected Event
    $('#chooseTreatmentCentre').on('change',function(){
      _optionSelected();
    });

    //Once option is selected - Submit Event 
    $('.new-centre-submit').on('click', function(e){
      e.preventDefault();
      _fetchData();
    });
    
  };

  
 
  return {
    init: _bindUIActions
  }
}(window));
var _CustomFontLoader = (function (window) {

  /* Private Settings  */
  var _PrivateSettings = {
    customFonts: ['/fonts/Cabin-Regular.woff', '/fonts/Cabin-Bold.woff', '/fonts/Changa-Bold.woff', '/fonts/fontawesome-webfont.woff', '/fonts/MaterialIcons-Regular.woff2'],
    fontCSSFile: '/css/fastTrackFonts.css',
    isSuccess: false
  };

  /* Font Success */
  var _fontSuccess = function (data) {
    _PrivateSettings.isSuccess = true;
  }

  /* Font Failure Method */
  var _fontFailure = function (xhr) {
    console.info(xhr.status);
  };

 /* Append Font css */
  var _appendFontCss = function () {
    $("<link />")
      .appendTo($("head"))
      .attr({
        type: 'text/css',
        rel: 'stylesheet'
      })
      .attr('href', _PrivateSettings.fontCSSFile);
  };

  /* Ajax Fetch Fonts  */
  var _ajaxFetch = function () {
    return $.each(_PrivateSettings.customFonts, function (i, u) {
      $.ajax({
        url: u,
        beforeSend: function (xhr) {
          xhr.overrideMimeType("application/octet-stream");
        },
        async: false // this makes the global variable being access
      }).done(_fontSuccess).fail(_fontFailure);
    });
  };

  /* Public Init Method  */
  var init = function () {
    _ajaxFetch();
    if(_PrivateSettings.isSuccess){
      _appendFontCss();
    }
  };

  return {
    init: init
  }
}(window));

var _FooterLinks = (function(window){
  'use strict';
  var _loadClickedTemplate = function($clicked){
    
    var templateName = $clicked[0].className;
    _TemplateLoader.init(templateName);
  };

  var _bindUIActions = function(){
    $('.post-footer-right a').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      $("html, body").animate({ scrollTop: 0 }, 100);
      _loadClickedTemplate($(this));
      $('#content').addClass('pages');
    });
  };

  var _historyTrackFooterLinks = function(){
    _HistoryBackModule.init();          
    $('.back-link').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $("html, body").animate({ scrollTop: 0 }, 100);
        history.back();
    });
  };

  return {
    init: _bindUIActions,
    footerHistory: _historyTrackFooterLinks
  }

}(window));
var _ForgottenPassword = (function (window) {
  'use strict';
  var _pvtSettings = {
    $forgottenPwdReqEndPoint: 'http://soa.tew-dev.com/api/emsmock/forgotPasswordRequest'
  };

  var _loginBeforeSend = function () {
    var divLoading = '<div class="loading">' + '<img src="/images/icons/loading.gif"/>' + '</div>';    
    $('.login-form').append(divLoading);
  };


  var _forgottenSuccess = function(){
    $('.forgotten').hide();
    $('.forgotten-success').addClass('reveal');
    setTimeout(function () {
        window.location = "/";
    }, 10000);
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
/* Global Variables to be used throughout the applications */
var _NurseEndPoint = 'http://soa.cerdelga.tew-staging.com/api/Nurse/';
var _TreatmentEndPoint = 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/';
var _IsLoggedInEndPoint = 'http://soa.tew-dev.com/api/emsmock/isLoggedin/';

var _HandlebarsTemplate = (function (window) {

  var _header = function () {
   
    var headerTpl = Cerdelga.templates.header; // Without any data being passed
    $('#header').append(headerTpl);
  }; 

  var _footer = function () {
    
    var footerTpl = Cerdelga.templates.footer;
    $('#footer').append(footerTpl);
  };

  var _login = function () {
    _TemplateLoader.init('login');

  };

  var init = function () {
    _header();
    _footer();
    _login();
  }

  return {
    init: init
  }

}(window));
var _HistoryBackModule = (function (window) {
  'use strict';
  

  var init = function () {
    $(window).on('popstate', function (event) {
      var $hashLink = location.hash.split('#')[1];
      var data = function($hashLink){
          var dataHandler = {
            "pamQuestionnaire" : function(){
                return _pamQuestionnaireData.init();
            },

            "profile" : function(){
              return _Profile.getNurseData();
            },

            "default" : function(){
              return undefined;
            }
          };

          return (dataHandler[$hashLink] || dataHandler['default'])();
      };

      var $data =  data($hashLink) || undefined;
      console.info($data);
      var Template = Cerdelga.templates[$hashLink]($data);
      $('#content').html(Template);
      
      //var Template = Cerdelga.templates[$hashLink]($data);
      //$('#content').html(Template);
    });
  }

  return {
    init: init
  }
}(window));
var isLoggedInSettings,
isLoggedInModule = {
     settings : {
         $isLoggedIn : null
     },

    init: function() {
        isLoggedInSettings = this.settings;

        //Getting the session Storage item which was set on the successful login 
        isLoggedInSettings.$isLoggedIn = sessionStorage.getItem('isLoggedIn');

        //This is to redirect the user to login page is its false
        if (isLoggedInSettings.$isLoggedIn === 'false' || isLoggedInSettings.$isLoggedIn === null) {
            location.reload();
        }

        this.bindUIActions(); 

    },

    bindUIActions: function() {
        //Ajax POSTING
        var $isLoggedInEndPoint = _IsLoggedInEndPoint + isLoggedInSettings.$isLoggedIn;
        TEWLibrary.fetchData($isLoggedInEndPoint, 'GET', {}).done(isLoggedInModule.success).fail(isLoggedInModule.fail);
    },

    //isLoggedIn Success
    success: function (data) {
        console.info(data);
    },

    fail: function (response) {
        console.info(response);
    }
};

var _LoginModule = (function (window) {
  var _privateSettings = {
    $loginEndPoint: 'http://soa.tew-dev.com/api/emsmock/login',
    $nurseEndPoint: 'http://soa.cerdelga.tew-staging.com/api/Nurse/0'
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
var loginSettings,
loginValidation = {
    settings: {
    },

    init: function () {
        loginSettings = this.settings;
        this.bindUIActions();
        loginSettings.isValid = false;
    },

    bindUIActions: function () {
        loginValidation.validateMe($("#login"));
        loginValidation.forgottenValidate($('#forgotten-password'));
        loginValidation.resetValidate($('#reset-password'));

        //Enable login submit button
        $("#login input").on('keyup', function () {
            loginValidation.enableMe($('#login'));
        });

        if(loginSettings.isValid){
            loginValidation.enableMe($('#login'));
        }

        $("#forgotten-password input").on('keyup', function () {
            loginValidation.enableMe($('#forgotten-password'));
        });

        //Disable form submission by enter key 
        $(window).keydown(function (event) {
            if ((event.keyCode === 13) && (loginSettings.isValid === false)) {
                event.preventDefault();
            }
        });
    },

    validateMe: function ($form) {
        $form.validate({

            //Event Triggered as you type in the input boxes
            onkeyup: function (el, e) {
                $(el).valid();
            },

            rules: {
                email: {
                    required: true,
                    email: true
                },
                authpassword: {
                    required: true,
                    minlength: 8

                }
            },
            messages: {
                authpassword: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 8 characters long"
                },
                email: "Please enter a valid email address"
            },


            submitHandler: function ($form) {
                
            }
        });
    },

    forgottenValidate: function ($forgottenForm) {
        $forgottenForm.validate({

            //Event Triggered as you type in the input boxes
            onkeyup: function (el, e) {
                $(el).valid();
            },

            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 5

                }
            },
            messages: {
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                email: "Please enter a valid email address"
            },


            submitHandler: function ($form) {
                
            }
        });

    },

    resetValidate: function ($resetForm) {
        $resetForm.validate({

            //Event Triggered as you type in the input boxes
            onkeyup: function (el, e) {
                $(el).valid();
            },

            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                email: "Please enter a valid email address"
            },

            submitHandler: function ($form) {
                $('.login-form').hide();
                $('.forgotten-success').addClass('reveal');
                setTimeout(function () {
                    window.location = "/";
                }, 10000);
            } 
        });

    },

    enableMe: function ($submitForm) {
        if ($($submitForm).valid()) {
            loginSettings.isValid = true;
            $('button[type="submit"]').removeClass('disabled');
        } else {
            loginSettings.isValid = false;
            $('button[type="submit"]').addClass('disabled');
        }

    }
} 
var modalSettings,
  Modal = {
    settings: {
    },

    init: function (modalBackDrop, modalContent, modalDirection, modalTimeOut) {
      modalSettings = this.settings;
      modalSettings.$modalBackDrop = modalBackDrop;
      modalSettings.$modalContent = modalContent;
      modalSettings.$modalDirection = modalDirection;
      modalSettings.$modalTimeOut = modalTimeOut;

      /*On Load give direction to the Content to come from by adding class */
      modalSettings.$modalContent.addClass(modalSettings.$modalDirection);
    },

    
    modalPopOpen: function () {
      //Activating Modal
      modalSettings.$modalBackDrop.fadeIn().addClass('activate');
      setTimeout(function () {
        modalSettings.$modalContent.removeClass(modalSettings.$modalDirection);
      }, modalSettings.$modalTimeOut);

    },

    modalPopClose: function () {
      modalSettings.$modalContent.addClass(modalSettings.$modalDirection);
      modalSettings.$modalBackDrop.removeClass('activate').fadeOut();
    },
   
  };
var newPasswordSettings,
newPasswordValidation = {
    settings: {
        el: ''
    },

    init: function (el) {
        newPasswordSettings = this.settings;
        newPasswordSettings.el = el;
        this.bindUIActions();
    },

    bindUIActions: function () {
        $(newPasswordSettings.el).on('keyup', function () {
            newPasswordValidation.newPasswordValidCheck();
        });
    },

    /* Validation of New Password Matches the criteria 
    ** Minimum 8 characters consisting of  1 lowercase, 1 uppercase, 1 number, 1 special character 
    **/

    newPasswordValidCheck: function () {
        $('.new-password-validation').addClass('showMe');
        var newPasswordValue = $(newPasswordSettings.el).val();

        /* Validation regex */
        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        var specials = /[~`!#$%_@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g;


      

        if (newPasswordValue.length >= 8) {
            $('.new-password-item').find('.strength').addClass('valid');
        } else {
            $('.new-password-item').find('.strength').removeClass('valid');
        }

        /* if it contains uppercase */
        if (newPasswordValue.match(upperCase)) {
            $('.new-password-item').find('.uppercase').addClass('valid');
        } else {
            $('.new-password-item').find('.uppercase').removeClass('valid');
        }

        if (newPasswordValue.match(lowerCase)) {
            $('.new-password-item').find('.lowercase').addClass('valid');
        } else {
            $('.new-password-item').find('.lowercase').removeClass('valid');
        }

        if (newPasswordValue.match(numbers)) {
            $('.new-password-item').find('.number').addClass('valid');
        } else {
            $('.new-password-item').find('.number').removeClass('valid');
        }

        if (newPasswordValue.match(specials)) {
            $('.new-password-item').find('.special').addClass('valid');
        } else {
            $('.new-password-item').find('.special').removeClass('valid');
        }

        if ($('.new-password-list').length === $('.new-password-list.valid').length) {
            $('.new-password-validation').removeClass('showMe');
        } else {
            $('.new-password-validation').addClass('showMe');
        }
    }
};
var _PAMExplanation = (function (window) {
  'use strict';

  /* PAM Explanation from Result Page */
  var init = function (el) {
    $(el).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      _TemplateLoader.init('pamExplanation');
    });
  };

  return {
    init: init
  }

}(window));
String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};

var pamSettings,
    pamLevels = {
        settings: {
            enrolTpl: {
                ClientExtId: "994959312",
                ClientPassKey: "fum4Umpqua8e",
                SubGroupExtId: "568471853",
                ThirdPartyIdentifier: "",
                PrimaryEmail: "no-reply@the-earthworks.com"
            },
            submitQuestionnaireData: '',
            $pamEnrolEndpoint: 'http://soa.cerdelga.tew-staging.com/api/pam/enrol/uat',
            $pamSubmitEndpoint: 'http://soa.cerdelga.tew-staging.com/api/pam/submit/uat',
            answers: [],
            stronglyDisagreeAnswers: 0,
            disAgreeAnswers: 0,
            agreeAnswers: 0,
            stronglyAgreeAnswers: 0,
            naAnswers: 0
        },

        init: function () {
            pamSettings = this.settings;
            this.bindUIActions();
            
            console.info('Answers :', pamSettings.answers);
            console.info('pamSettings.naAnswers ', pamSettings.naAnswers);
            console.info('pamSettings.stronglyDisagreeAnswers ', pamSettings.stronglyDisagreeAnswers);
            console.info('pamSettings.agreeAnswers ', pamSettings.agreeAnswers);
            console.info('pamSettings.stronglyAgreeAnswers ', pamSettings.stronglyAgreeAnswers);


            /* Modal Details */
            pamSettings.$modalTimeOut = 200;
            pamSettings.$modalDirection = 'top';
            pamSettings.$modalBackDrop = $('.m-modal');
            pamSettings.$modalContent = $('.m-modal__table');

            /* PAM Modal */
            Modal.init(pamSettings.$modalBackDrop, pamSettings.$modalContent, pamSettings.$modalDirection, pamSettings.$modalTimeOut);
        },

        bindUIActions: function () {
            $('.page-list-item').on('click', function (event) {
                $('li.page-list-item').not($(this)).removeClass('selected');
                $('li.page-list-item').not($(this)).next().slideUp();
                $(this).toggleClass('selected');
                $(this).next().slideToggle();
                var offset = $(this).offset();
                $('html, body').animate({
                    scrollTop: offset.top - 500
                }, 250);
            });

            
            $('.answer').on('click', function (event) {
                pamLevels.answerToggle();
            });

            $('.pam-results').on('click', function (event) {
                //Submit Questionnaire Method First
                pamLevels.submitQuestionnaire();

                //Enrol UAT AJAX Handler
                TEWLibrary.fetchData(pamSettings.$pamEnrolEndpoint, 'POST', {
                    $data: pamSettings.submitQuestionnaireData,
                    $beforeSend: pamLevels.pamBeforeSend
                }).done(pamLevels.enrolSuccess).fail(pamLevels.postFailed);
            });

            $('.modal-action-btn__accept').on('click', function(e){
                e.preventDefault();
                pamSettings.answers = [];
                pamLevels.pamModalClose();
            });
        },

        answerToggle: function () {
            var subSection = $(event.target).closest('div.book-subsection');
            var questionLi = subSection.prev();
            var checkbox = questionLi.find('span.pam-checkbox-span').first();
            var allAnswers = subSection.find('div.answer');
            var evtAnswer = ($(event.target).hasClass('answer')) ? $(event.target) : $(event.target).parent();
            var selected = evtAnswer.hasClass('selected');
            allAnswers.removeClass('selected');

            if (!selected)
                evtAnswer.addClass('selected');

            if (subSection.find('div.answer.selected').length > 0) {
                checkbox.addClass('selected');

                if (checkbox.children('span').length === 0)
                    checkbox.append('<span></span>');
            } else {
                checkbox.removeClass('selected');
                checkbox.children('span').remove();
            }

            if ($('body').find('.pam-checkbox-span.selected').length === 10) {
                $('.pam-results').removeAttr('disabled');
                $('.pam-results').removeClass('disabled');
            } else {
                $('.pam-results').attr('disabled', 'disabled');
                $('.pam-results').addClass('disabled');
            }
        },

        submitQuestionnaire: function () {
            var tpid = pamLevels.uuid();
            var questionArr = [1, 2, 4, 5, 6, 7, 10, 11, 12, 13];
            var answerArr = [1, 2, 3, 4, 0];

            pamSettings.submitQuestionnaireData = pamSettings.enrolTpl;
            pamSettings.submitQuestionnaireData.ThirdPartyIdentifier = tpid;

            var bookSections = document.querySelectorAll('.book-subsection');
            var questions = document.querySelectorAll('.page-list-item');
            var answer = document.querySelectorAll('.answer');
            var answers = document.querySelectorAll('.answer.selected');

            $.each(bookSections, function (i, e) {                
                $.each($(e).find('.answer'), function (j, f) {
                    if ($(f).hasClass('selected')) {
                        pamSettings.answers.push({
                            QuestionId: questionArr[i],
                            AnswerId: answerArr[j]
                        });
                    }
                });
            });


            $.each(answers, function (l, m) {
                var selectedAnswer = answers[l];
                console.info('selectedAnswer', selectedAnswer);
                var pointsScored = $(selectedAnswer)[0].dataset.points;
                
                //console.info('Points Scored ', pointsScored);
                switch (pointsScored) {
                    case "0":
                        pamSettings.naAnswers += 1;
                        break;

                    case "1":
                        pamSettings.stronglyDisagreeAnswers += 1;
                        break;

                    case "2":
                        pamSettings.disAgreeAnswers += 1;
                        break;

                    case "3":
                        pamSettings.agreeAnswers += 1;
                        break;

                    case "4":
                        pamSettings.stronglyAgreeAnswers += 1;
                        break;

                    default:
                        console.info('something gone wrong here ');
                }
            });

            //Remove these logs once production ready
            console.info('Answers :', pamSettings.answers);
            console.info('pamSettings.naAnswers ', pamSettings.naAnswers);
            console.info('pamSettings.stronglyDisagreeAnswers ', pamSettings.stronglyDisagreeAnswers);
            console.info('pamSettings.agreeAnswers ', pamSettings.agreeAnswers);
            console.info('pamSettings.stronglyAgreeAnswers ', pamSettings.stronglyAgreeAnswers);
        },

        pamBeforeSend: function () {
            var divLoading = '<div class="loading">' + '<img src="/images/icons/loading.gif"/>' + '</div>';
            //console.info('before send triggerd', divLoading);
            $('#pam-result-beforeSend').html(divLoading);
        },

        enrolSuccess: function (data) {
            $('#pam-result-beforeSend').empty();
            //This is where we do another Ajax Call
            var survey = {
                user: pamSettings.submitQuestionnaireData,
                language: 'enu',
                surveyType: 'PAM10',
                systemName: 'CerdelgaGenzyme',
                answers: pamSettings.answers
            };

            TEWLibrary.fetchData(pamSettings.$pamSubmitEndpoint, 'POST', {
                $data: survey,
                $beforeSend: pamLevels.pamBeforeSend
            }).done(pamLevels.pamSubmitSuccess).fail(pamLevels.postFailed);
        },

        pamModalClose: function(){
            //resetting the answers array
            pamSettings.naAnswers = 0;
            pamSettings.stronglyDisagreeAnswers = 0;
            pamSettings.agreeAnswers = 0;
            pamSettings.stronglyAgreeAnswers = 0;
            Modal.modalPopClose();
            $('#pam-result-beforeSend').empty();
        },

        pamSubmitSuccess: function (data) {
            if (pamSettings.naAnswers >= 3 || pamSettings.stronglyDisagreeAnswers === 10 || pamSettings.agreeAnswers === 10 || pamSettings.stronglyAgreeAnswers === 10) {
                /* TODO MAKE A MODAL HERE  */
                //console.info($('.m-modal'));
                Modal.modalPopOpen();
                //alert('Unusual answer pattern: It’s possible the survey respondent didn’t understand the questions or did not answer truthfully');

                $('.page-list-item').removeClass('selected');
                $('.answer').removeClass('selected');
                $('.pam-checkbox-span').removeClass('selected');
                $('.pam-checkbox-span').find('span').remove();
                $('.book-subsection').hide();
                $('.pam-results').addClass('disabled').prop('disabled', 'disabled');
                $('#pam-result-beforeSend').empty();

            } else {
               
                //console.info('This is the Data on PAM Submit Success ', data);
                //var score = data.Score;
                var level = data.Level;

                if (data.Success) {
                    $('#pam-result-beforeSend').empty();
                    sessionStorage.setItem("pam-level", level);

                    /* Template Loader and History setter */
                    _TemplateLoader.init('pamResult', data);
                    
                } else {
                    console.log(response);
                }
            }
        },

        enrolFailed: function (xhr) {
            $('.loading').remove();
            var xhrStatus = xhr.status;
            var status = TEWLibrary.ajaxErrorHandler(xhrStatus);
            var errorBody = "<div>" + "<img src='/images/icons/" + status + ".png'/>" + "</div>";
            $('#login-error-message').find('.panel-heading').html('Server returned ' + status);
            $('#login-error-message').find('.panel-body').html(errorBody);
            $('#login-error-message').fadeIn();
        },

        pad2: function (n) {
            return n < 10 ? '0' + n : n
        },

        uuid: function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

    };




























//var pam = {

//    init: function () {
//        alert('submit questionnaire');
//        this.bindEvents();
//        this.getQuestions();
//    },

//    answerArr: [
//        { id: 0, text: 'Disagree Strongly', iconUrl: '' },
//        { id: 1, text: 'Disagree', iconUrl: '' },
//        { id: 2, text: 'Agree', iconUrl: '' },
//        { id: 3, text: 'Strongly Agree', iconUrl: '' },
//        { id: 4, text: 'Not Applicable', iconUrl: '' }
//    ],
//    enrolTpl: {
//        ClientExtId: "994959312",
//        ClientPassKey: "fum4Umpqua8e",
//        SubGroupExtId: "568471853",
//        ThirdPartyIdentifier: "",
//        PrimaryEmail: "no-reply@the-earthworks.com"
//    },
//    questionTpl: '<div class="page-list">' +
//        '<li class="page-list-item" data-subpage="{0}">' +
//        '<span class="pam-checkbox-span" data-subpage="{0}">' +
//        '<input type="checkbox" id="pgsLabel" data-check="{0}" class="pages-checkbox" />' +
//        '</span>' +
//        '<label class="pages-label">{1}</label>' +
//        '<div class="page-button">' +
//        '<button class="book-btn book-subsection-btn" data-subpage="{0}"></button>' +
//        '</div>' +
//        '</li>' +
//        '<div class="book-subsection" data-subpage="{0}" style="display:none;">' +
//        '<div style=""></div>' +
//        '<div class="answer"><div class="pam-sprite pam-sprite-strongdisagree"></div><div class="pam-sprite-text">Disagree Strongly</div></div>' +
//        '<div class="answer"><div class="pam-sprite pam-sprite-disagree"></div><div class="pam-sprite-text">Disagree</div></div>' +
//        '<div class="answer"><div class="pam-sprite pam-sprite-agree"></div><div class="pam-sprite-text">Agree</div></div>' +
//        '<div class="answer"><div class="pam-sprite pam-sprite-strongagree"></div><div class="pam-sprite-text">Agree Strongly</div></div>' +
//        '<div class="answer"><div class="pam-sprite pam-sprite-na"></div><div class="pam-sprite-text">Not Applicable</div></div>' +
//        '</div>' +
//        '</div>',

//    bindEvents: function () {
//        $('body').on('click', 'li.page-list-item', function (event) {
//            $('.page-list-item.selected').not(this).each(function () {
//                $(this).removeClass('selected');
//                $(this).next().slideUp();
//            });

//            var offset = $(this).offset();
//            $('html, body').animate({ scrollTop: offset.top - 500 }, 250);
//        });

//        $('body').on('click', 'div.answer', function (event) {

//            var subSection = $(event.target).closest('div.book-subsection');
//            var questionLi = subSection.prev();
//            var checkbox = questionLi.find('span.pam-checkbox-span').first();
//            var allAnswers = subSection.find('div.answer');
//            var evtAnswer = ($(event.target).hasClass('answer')) ? $(event.target) : $(event.target).parent();
//            var selected = evtAnswer.hasClass('selected');
//            allAnswers.removeClass('selected');

//            if (!selected)
//                evtAnswer.addClass('selected');

//            if (subSection.find('div.answer.selected').length > 0) {
//                checkbox.addClass('selected');

//                if (checkbox.children('span').length === 0)
//                    checkbox.append('<span></span>');
//            } else {
//                checkbox.removeClass('selected');
//                checkbox.children('span').remove();
//            }

//            if ($('body').find('.pam-checkbox-span.selected').length === 10) {
//                $('.pam-results').removeAttr('disabled');
//                $('.pam-results').removeClass('disabled');
//            } else {
//                $('.pam-results').attr('disabled', 'disabled');
//                $('.pam-results').addClass('disabled');
//            }
//        });

//        $('body').on('click', 'button.pam-results', function (event) {
//            //console.info('i am clicked');
//            //pam.submitQuestionnaire();
//        });
//    },




//    submitQuestionnaire: function () {

//        var tpid = pam.uuid();
//        var questionArr = [1, 2, 4, 5, 6, 7, 10, 11, 12, 13];
//        var answerArr = [1, 2, 3, 4, 0];

//        var data = pam.enrolTpl;
//        data.ThirdPartyIdentifier = tpid;

//        console.info(data);
//        var answers = [];
//        var stronglyDisagreeAnswers = 0;
//        var agreeAnswers = 0;
//        var stronglyAgreeAnswers = 0;
//        var naAnswers = 0;

//        $.each($('div.book-subsection'), function (i, e) {

//            if ($(e).find('.selected').length === 0)
//                answers.push({ QuestionId: i + 1 });
//            else {
//                $.each($(e).find('.answer'), function (j, f) {
//                    if ($(f).hasClass('selected')) {
//                        answers.push({ QuestionId: questionArr[i], AnswerId: answerArr[j] });

//                        naAnswers += (answerArr[j] === 0) ? 1 : 0;
//                        stronglyDisagreeAnswers += (answerArr[1] === 0) ? 1 : 0;
//                        agreeAnswers += (answerArr[3] === 0) ? 1 : 0;
//                        stronglyAgreeAnswers += (answerArr[4] === 0) ? 1 : 0;
//                    }
//                });
//            }
//        });

//        if (naAnswers >= 3 || stronglyDisagreeAnswers === 10 || agreeAnswers === 10 || stronglyAgreeAnswers === 10) {
//            alert('Unusual answer pattern: It’s possible the survey respondent didn’t understand the questions or did not answer truthfully');
//            return;
//        }

//        $.ajax({
//            type: 'POST',
//            url: 'http://soa.cerdelga.tew-staging.com/api/pam/enrol/uat',
//            dataType: 'text/json',
//            data: data
//        }).always(function (response) {

//            var survey = {
//                user: data,
//                language: 'enu',
//                surveyType: 'PAM10',
//                systemName: 'CerdelgaGenzyme',
//                answers: answers
//            };

//            console.log(survey);

//            $.ajax({
//                type: 'POST',
//                url: 'http://soa.cerdelga.tew-staging.com/api/pam/submit/uat',
//                dataType: 'text/json',
//                data: survey,
//                success: function (response, textStatus, jqXHR) {
//                    var data = $.parseJSON(response.responseText);

//                    var score = data.Score;
//                    var level = data.Level;
//                    console.info('Score: ' + score + '; Level: ' + level);
//                },

//                error: function (response, textStatus, jqXHR) {
//                    console.info(textStatus.statusText);
//                }

//            });


//        });


//    },

//    pad2: function (n) { return n < 10 ? '0' + n : n },

//    uuid: function () {
//        var d = new Date().getTime();
//        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//            var r = (d + Math.random() * 16) % 16 | 0;
//            d = Math.floor(d / 16);
//            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//        });
//        return uuid;
//    }
//}
 var _pamQuestionnaireData = (function (window) {
   var _answersData = {
     answers: [{
         id: 0,
         text: 'Disagree Strongly',
         iconUrl: '',
         points: 1
       },
       {
         id: 1,
         text: 'Disagree',
         iconUrl: '',
         points: 2
       },
       {
         id: 2,
         text: 'Agree',
         iconUrl: '',
         points: 3
       },
       {
         id: 3,
         text: 'Strongly Agree',
         iconUrl: '',
         points: 4
       },
       {
         id: 4,
         text: 'Not Applicable',
         iconUrl: '',
         points: 0
       }
     ]
   };

   var init = function () {
     var qData = {
       //Answers Array
       answers: [
         {
          id: 0,
          text: 'Disagree Strongly',
          iconUrl: '',
          points: 1
          },
          {
            id: 1,
            text: 'Disagree',
            iconUrl: '',
            points: 2
          },
          {
            id: 2,
            text: 'Agree',
            iconUrl: '',
            points: 3
          },
          {
            id: 3,
            text: 'Strongly Agree',
            iconUrl: '',
            points: 4
          },
          {
            id: 4,
            text: 'Not Applicable',
            iconUrl: '',
            points: 0
          }
        ],

       // Questionnaire Data
       questions: [
         {
           id: 0,
           text: 'I am the person who is responsible for taking care of my health',
           answers: _answersData.answers
         },
         {
           id: 1,
           text: 'Taking an active role in my own healthcare is the most important thing that affects my health',
           answers: _answersData.answers
         },
         {
           id: 2,
           text: 'I know what each of my prescribed medications do',
           answers: _answersData.answers
         },
         {
           id: 3,
           text: 'I am confident that I can tell whether I need to go to the doctor or whether I can take care of a health problem myself',
           answers: _answersData.answers
         },
         {
           id: 4,
           text: 'I am confident that I can tell a doctor or nurse concerns I have even when he or she does not ask',
           answers: _answersData.answers
         },
         {
           id: 5,
           text: 'I am confident that I can carry out medical treatments I may need to do at home',
           answers: _answersData.answers
         },
         {
           id: 6,
           text: 'I have been able to maintain lifestyle changes, like healthy eating or exercising',
           answers: _answersData.answers
         },
         {
           id: 7,
           text: 'I know how to prevent problems with my health',
           answers: _answersData.answers
         },
         {
           id: 8,
           text: 'I am confident I can work out solutions when new problems arise with my health',
           answers: _answersData.answers
         },
         {
           id: 9,
           text: 'I am confident that I can maintain lifestyle changes, like healthy eating and exercising, even during times of stress',
           answers: _answersData.answers
         }
       ]
     };

     return qData;
   }

   return {
     init: init
   }
 }(window));
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
var pamSurveyDisclaimer = {
    settings: {
        $pamWarning: $('.pam-create'),
        $personalisedWarning: $('.personalised-choice'),
        $pamButton: $('.pam-warning-button'),
        $personalisedButton: $('.personalised-warning-button')
    },
    init: function () {
        this.bindUIActions();

        /* Check if the Local storage exists if it does than dont show the entire block */
        if (localStorage.getItem("pamChoice") === null) {
            $('.pam-create').removeClass('hide-me');
        } else {
            $('.pam-create').addClass('hide-me');
        }


        if (localStorage.getItem("personalisedChoice") === null) {
            $('.personalised-choice').removeClass('hide-me');
        } else {
            $('.personalised-choice').addClass('hide-me');
        }


        /*If the user is logged out or navigated to the Home page which in this case is the login page then remove the localStorage */
        //if (window.location.pathname === '/') {
        //    localStorage.removeItem("pamChoice");
        //    localStorage.removeItem("personalisedChoice");
        //}

    },
    bindUIActions: function () {
        $(document).on('click', '.pam-warning-button', function (e) {
            e.preventDefault();
            pamSurveyDisclaimer.pamDisclaimerOff($('.pam-create'));
        });

        $(document).on('click', '.personalised-warning-button', function (e) {
            e.preventDefault();
            pamSurveyDisclaimer.personalisedDisclaimerOff($('.personalised-choice'));
        });

        //Questionnaire button click event
        $('.select-questionnaire').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var questionData = _pamQuestionnaireData.init();
            _TemplateLoader.init('pamQuestionnaire',questionData );
        });

        //Create a book button click event
        $('.select-bookcreator').on('click', function (e) {
            console.info('bookcreator link clicked');
            e.preventDefault();
            e.stopPropagation();
            // var welcomeTPL = Cerdelga.templates.welcome;
            // $('#content').html(welcomeTPL);
        });

    },
    pamDisclaimerOff: function (warning) {
        warning.addClass('hide-me');
        localStorage.setItem('pamChoice', 'yes');
    },

    personalisedDisclaimerOff: function (warning) {
        warning.addClass('hide-me');
        localStorage.setItem('personalisedChoice', 'yes');
    }

};
var _Profile = (function (window) {
  'use strict';

  var _Settings = {
    // Tabs
    $trigger: $('.nurse-tab-link'),
    $tabs: $('.tabs'),

    /* Currently hard Coded to be 0 but when we get the login API we can tie this to the user profile */
    $nurseEndPoint: 'http://soa.cerdelga.tew-staging.com/api/Nurse/0',
    $treatmentCentreEndPoint: 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/0',
    /* 0 is hard coded this should be tied up with the nurse data api  */

    $profileId: $('.link-profile').data('id'),

    $profileData: {
      'Nurse': [],
      'TreatmentCentre': []
    }

  };


  // Tabs
  var _nurseViewTabs = function ($clickedItem) {
    var tabId = $clickedItem.data('tab');
    var tab = $('.tabs[data-tab="' + tabId + '"]');

    // Remove Active from all the Triggers and only add to the clicked one
    $('.nurse-tab-link').removeClass('active');
    $clickedItem.addClass('active');

    // Remove Active from all Tabs and add to the clicked one
    $('.tabs').removeClass('active');
    tab.addClass('active');
  };

  // Nurse Data GET
  var _getNurseData = function () {
    //$('.link-profile').unbind('click'); // To avoid multiple clicks if the data is taking longer to come through from the server
    //Ajax Call Here using Multiple Simultaenous call
    return $.when(
      $.get(_Settings.$nurseEndPoint, function (data) {
        _Settings.$profileData.Nurse.push(data);
      }),

      $.get(_Settings.$treatmentCentreEndPoint, function (data) {
        _Settings.$profileData.TreatmentCentre.push(data);


      })
    ).then(_getNurseSuccess);

    //TEWLibrary.fetchData(_Settings.$nurseEndPoint, 'GET', {}).done(_getNurseSuccess).fail(_getNurseFailure);
  };

  var _getNurseSuccess = function () {
    /* This will render the Template */
    var $data = _Settings.$profileData;
    console.info('Nurse Data', $data);
    _TemplateLoader.init('profile', $data);
   // $('.link-profile').bind('click'); // Rebinding the click event so that user can go back in the profile section if need be
  }

  var _getNurseFailure = function (xhr) {
    console.info(xhr.status);
  }

  var bindUIActions = function () {
    /* Nurse / Patient Name click Event on the top  */
    $('.link-profile').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      //Call Nurse Api to load the data
     _getNurseData();
    });


    //Tabs
    $(document).on('click', '.nurse-tab-link', function (e) {
      e.preventDefault();
      _nurseViewTabs($(this));
    });
  };

  // 
  return {
    init: bindUIActions,
    getNurseData: _getNurseData,
    settings: _Settings
  }

}());
var _ProfileDetailsUpdate = (function (window) {
  var _Settings = {
    // Field Edits
    $editPwd: $('.password-block').find('.edit'),
    $fName: $('input[id="fullName"]'),

    //Password Edit Block
    $pwdEditBlock: $('.password-edit-block'),
    $pwdInputs: $('.password-wrapper').find('input'),
    $toggleBtn: $('.toggle-password'),

    //User Edit Block
    $usrEditBlock: $('.name-edit-block'),

    //Reset Name Buttons 
    $resetBtn: $('.reset'),

    //Reset Password Edit
    $resetPwdBtn: $('.password-reset'),


    //Ajax Reference fields
    $currentFirstName: $('#fullName'),
    $newFirstName: $('#newName'),
    $nurseEmail: $('#email'),
    $oldPassword: $('#password'),
    $currentPassword: $('#currentPassword'),
    $newPassword: $('#newPassword'),

    /*Submit FullName button */
    $nameSubmitBtn: $('.name-submit'),

    /*Password Change button*/
    $pwdSubmitBtn: $('.password-submit'),

    /* Change Password Validation */
    $currentPasswordInput: $('.password-edit-block').find('.current-password-validation'),

    /* New Password Validation */
    $newPasswordInput: $('.password-edit-block').find('.new-password-validation'),

    /* New Password Validation inputs */
    $newPasswordItem: $('.new-password-item'),
    $newPasswordList: $('.new-password-list'),

    $lowerCase: $('.new-password-item').find('.lowercase'),
    $upperCase: $('.new-password-item').find('.uppercase'),
    $number: $('.new-password-item').find('.number'),
    $special: $('.new-password-item').find('.special'),
    $strength: $('.new-password-item').find('.strength'),

    /* Endpoints to update data */
    /* Currently hard Coded to be 0 but when we get the login API we can tie this to the user profile */
    $nurseEndPoint: 'http://soa.cerdelga.tew-staging.com/api/Nurse/0',
    $treatmentCentreEndPoint: 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/0',
    /* 0 is hard coded this should be tied up with the nurse data api  */
  };

  var bindUIActions = function () {

    /* Full Name Edit Field show Event */
    $(document).on('click', '.name-edit-btn', function (e) {
      e.preventDefault();
      _editFullName($(this));
    });

    /* Password Edit Field Show Event */
    $(document).on('click', '.password-edit-btn', function (e) {
      e.preventDefault();
      _editPassword($(this));
    });

    /* Reset Full name Event */
    $(document).on('click', '.reset', function (e) {
      e.preventDefault();
      _resetField('.name-edit-block');
    });

    /* Reset Password Event */
    $(document).on('click', '.password-reset', function (e) {
      e.preventDefault();
      _resetField('.password-edit-block');
    });

    //Posting the Name Data
    $('#nurse-name-form').unbind('.submit').on('submit', function (e) {
      e.preventDefault();
      _updateFullName();
    });


    /**
     * PASSWORD RELATED 
     */

    //Current Password Validation
    $(document).on('blur', '#currentPassword', function () {
      _currentPasswordValidation();
      _disableUpdatePassword();
      if ($('#currentPassword').val().length === 0) {
        $('.password-edit-block').find('.current-password-validation').hide();
      };
    });


    // If new password field is empty don't show error message
    $(document).on('blur', '#newPassword', function () {
      if ($('#newPassword').val().length === 0) {
        $('.password-edit-block').find('.new-password-validation').removeClass('showMe');
      };
      _disableUpdatePassword();
    });

    //Posting the Password Data
    $('#nurse-password-form').unbind('.submit').on('submit', function (event) {
      event.preventDefault();
      _updatePassword();
    });

    //Toggle ShowPassword
    $(document).on('click', '.toggle-password', function (e) {
      e.preventDefault();
      _showPwd($(this));
  });


  }; //End of bindUIActions

  //METHODS 
  var _editFullName = function ($clicked) {
    $clicked.parent().hide();
    $('.name-edit-block').fadeIn();
  };

  var _editPassword = function ($clicked) {
    $clicked.parent().hide();
    $('.password-edit-block').fadeIn();
  };

  var _resetField = function ($fieldToReset) {
    var el = $($fieldToReset).find('input').not('input[type="submit"]');
    $(el).val('');
    $($fieldToReset).hide();
    $($fieldToReset).prev().css('display', 'block');
    $('.password-edit-block').find('.current-password-validation').hide();
    $('.password-edit-block').find('.new-password-validation').removeClass('showMe');
  };

  var _updateFullName = function () {
    var newNameValue = $('#newName').val();

    var formData = {
      "FullName": newNameValue,
      "Email": $('#email').val(),
      "Password": $('#password').val()
    };

    $.ajax({
      url: _Settings.$nurseEndPoint,
      type: 'PUT',
      data: formData,
      success: function () {
        _updateFullNameSuccess(formData.FullName);
      },
      error: function (xhr) {
        _updateNameFail(xhr);
      }
    });
  };

  var _updateFullNameSuccess = function (name) {
    $('.name-edit-block').hide();
    $('#newName').val('');
    //Updating the exisiting input field
    $('#fullName').val(name);
    $('#nurse-name-form').find('.form-field').css('display', 'block');

    // Just for Display Purpose 
    var firstName = name.substring(0, name.indexOf(' '));

    $('.nurse-title').html(name);
    $('.link-profile').html(firstName);
  };

  var _updateNameFail = function (xhr) {
    console.info(xhr);
  };


  /* Checking Current Password matches with the exisiting Password */
  var _currentPasswordValidation = function () {

    var existingPassword = $('#password').val();
    console.info(existingPassword);
    var currentPassword = $('#currentPassword').val();

    if (currentPassword !== existingPassword) {
      $('.password-edit-block').find('.current-password-validation').css('display', 'inline-block');
    } else {
      $('.password-edit-block').find('.current-password-validation').css('display', 'none');
    }

  };

  /* Update Button on Password Disabled if error blocks are visible*/
  var _disableUpdatePassword = function () {
    var currentPasswordInput = $('.password-edit-block').find('.current-password-validation');
    var newPasswordInput = $('.password-edit-block').find('.new-password-validation');
    if (currentPasswordInput.is(":visible") || newPasswordInput.is(":visible")) {
      $('.password-submit').prop('disabled', true);
    } else {
      $('.password-submit').prop('disabled', false);
    };
  };


  //show Current Password
  var _showPwd = function ($clickedItem) {
    var value = $clickedItem.parent().prev('input').val();
    var valLength = value.length;
    if (valLength > 0) {
        if ($($clickedItem).hasClass('showPassword')) {
            $clickedItem.hide();
            $clickedItem.next('.hidePassword').css('display', 'block');
            $clickedItem.parent().prev('input').attr('type', 'text');
        }

        if ($($clickedItem).hasClass('hidePassword')) {
            $clickedItem.hide();
            $clickedItem.prev('.showPassword').css('display', 'block');
            $clickedItem.parent().prev('input').attr('type', 'password');
        }
    }
}
  //Update Nurse Password
  var _updatePassword = function () {
    var newPasswordValue = $('#newPassword').val();

    var updatedFormData = {
      "FullName": $('#fullName').val(),
      "Email": $('#email').val(),
      "Password": newPasswordValue
    };


    if (newPasswordValue.length > 0) {
      TEWLibrary.fetchData(_Settings.$nurseEndPoint, 'PUT', {
        $data: updatedFormData        
      }).done(_updatePasswordSuccess(updatedFormData)).fail(_updatePasswordFail);
    }
  };

  var _updatePasswordSuccess = function (data) {
    
     $('.password-edit-block').hide();
     $('#newPassword').val('');

    //Updating the exisiting input field
     $('#password').val(data.Password);
     $('#nurse-password-form').find('.form-field').css('display', 'block');
  };

  var _updatePasswordFail = function (xhr) {
    console.info(xhr.status);
  }


  return {
    init: bindUIActions
  }

}(window));
var registrationSettings,
registration = {
    settings: {

    },

    /* Initialize the Module */
    init: function ($endPoint) {
        registrationSettings = this.settings;
        registrationSettings.$registrationEndPoint = $endPoint;
        registrationSettings.$newUserData = [];
        this.bindUIActions();
    },
    
    /* Bind Events */
    bindUIActions: function () {

        //Step Completed
        $(document).on('click', '.continue-setup-btn a.active', function (e) {
            e.preventDefault();
            /* Capturing the data to post */
            var registrationNurseData = {
                "Email": $('#RegEmail').val(),
                "Full Name": $('#RegFullName').val(),
                "Password": $('#RegPassword').val()
            };

            /* Push the collected data to the New User Array */
            registrationSettings.$newUserData.push(registrationNurseData);
            registration.stepCompleted();

            console.info('CONTINUE BUTTON CLICKED DATA', registrationSettings.$newUserData);
        });

        //Back
        $(document).on('click', '.back-btn > a', function (e) {
            e.preventDefault();
            registration.setupBackOff();
        });

        //Enable the finish Button
        $('#chooseTreatmentCentre').on('change', function () {
            $('.finish-btn > a').removeClass('disabled').addClass('enabled');
        });

        //Finish 
        $(document).on('click', '.finish-btn > a', function (e) {
            e.preventDefault();
             var treatmentCentreSelected = $('#chooseTreatmentCentre option:selected')[0].innerText; // Capturing the Chosen Treatment Centre
             registrationSettings.$newUserData[0]['treatmentCentreChosen'] = treatmentCentreSelected; // To add key value to exisiting User Object
            
             //Ajax POSTING
             TEWLibrary.fetchData(registrationSettings.$registrationEndPoint, 'POST', {$data: registrationSettings.$newUserData[0], $beforeSend: registration.beforeSend}).done(registration.registrationSuccess).fail(registration.registrationFailure);
        });

        //Finish Btn click while waiting for review screen
        $(document).on('click', '.next-slide', function () {
            registration.takeBackToLogin('/');
        });

        // KeyDown Event
        $(document).on('keydown', '#registration-form input', function () {
            registration.registrationValidate($('#registration-form'));
        });

    },


    /* Methods */
    //Validation on Fields 
    registrationValidate: function ($registrationForm) {
       // debugger;
        $registrationForm.validate({
            rules: {

                RegFullName: {
                    required: true,
                    namecheck: true,
                    minlength: 2
                },

                email: {
                    required: true,
                    email: true
                },

                password: {
                    required: true,
                    minlength: 8,
                    pwcheck: true

                }
            },

            messages: {
                RegFullName: {
                    required: "We need your Full name to create your profile and address you",
                    namecheck: "Your full name must be entered like so : John Doe"
                },

                email: {
                    required: "We need your email address to contact you",
                    email: "Your email address must be in the format of name@domain.com"
                },

                password: {

                }
            }
        });


        // Password Validator  - for Jquery validation
        $.validator.addMethod("pwcheck", function (value) {
           // debugger;
            return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
                && /[a-z]/.test(value) // has a lowercase letter
                && /[A-Z]/.test(value) // has uppercase letter
                && /[0-9]/.test(value) // has number
                && /[~`!#$%_@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(value);
        });

        $.validator.addMethod("namecheck", function (value, element) {
            return value.indexOf(' ') === -1 ? false : true;
        });

        $('#RegPassword').on('keyup', function () {

            if ($('#registration-form').valid()) {
                //$('.new-password-validation').removeClass('showMe');// checks form for validity
                $('.continue-setup-btn a').removeClass('disabled');   // enables button
                $('.continue-setup-btn  a').addClass('active');

            } else {
                $('.continue-setup-btn a').addClass('disabled');   // enables button
                $('.continue-setup-btn a').removeClass('active');   // disables button
            }
        });

    },

    //Step Counter Getting Completed Class
    stepCompleted: function () {
        var stepCircle = $('.step-title-container').find('li.active');
        stepCircle.removeClass('active').addClass('completed');
        var sibling = $('.completed').next('li');
        sibling.addClass('active');
        $('.registration-profile').hide();
        $('.treatment-setup').addClass('active');
    },

    //Registration BeforeSend
    beforeSend: function () {
        var divLoading = '<div class="loading">' + '<img src="/images/icons/loading.gif"/>' + '</div>';
        console.info('before send triggerd', divLoading);
        $('#choose-treatment-centre').append(divLoading);
    },

    //Registration Success
    registrationSuccess: function (data) {
        console.info('registration Success ', data);
        registration.finishRegistration();
    },

    registrationFailure: function (xhr) {
         $('.loading').remove();
         var xhrStatus = xhr.status;
         var status = TEWLibrary.ajaxErrorHandler(xhrStatus);
         var errorBody = "<div>" + "<img src='/images/icons/" + status + ".png'/>" + "</div>";
         $('#login-error-message').find('.panel-heading').html('Server returned ' + status);
         $('#login-error-message').find('.panel-body').html(errorBody);
         $('#login-error-message').find('.panel-body').append('<h4 style="text-align: center;">' +$('#RegFullName').val() + '</h4>');
         $('#login-error-message').fadeIn();
    },

    setupBackOff: function () {
        var stepCircle = $('li.completed');
        stepCircle.removeClass().addClass('active');
        $('#login-error-message').hide();
        $('.loading').remove();
        $('.step-title-container').find('li').removeClass('active');
        $('.treatment-setup').removeClass('active');
        $('.registration-profile').fadeIn();
        registrationSettings.$newUserData = []; // Resetting the array so that it can take any changes to the data a user needs to make for posting to registration api
    },

    registrationReview: function ($clicked) {
        $('form#choose-treatment-centre').hide();
        $('.treatment-centre-review').removeClass('hide-me');
        $($clicked).addClass('next-slide');
    },

    takeBackToLogin: function ($url) {
        location.href = $url;
    },

    // This is put on hold as we need to get the review process in place first before its actually submitted
    finishRegistration: function () {
        
        $('.treatment-setup').removeClass('active');
        $('.final-success').fadeIn();
        var stepCircle = $('.step-title-container').find('li');
        stepCircle.removeClass('active').addClass('completed');

        /*TODO collect the data and post it to the api for user login */
        var postedEmail = $('#RegEmail').val();
        var postedToken = 'ABCDEF0123456789'; //This is hard coded value at the moment

        var domainOrigin = document.location.origin; // Get the domain name of the portal
        var constructedVerifyLink = domainOrigin + '/?action=verify&email = ' + postedEmail + '&token=' + postedToken; // This needs to go to email so user can receive this email

        /* For demo purpose adding the above constructed link to the button url to verify */
        $('#verify-link').attr('href', constructedVerifyLink);
    }

};
var showPasswordSettings,
showPassword = {

    settings: {
        element : ''
    },

    init: function() {
        showPasswordSettings = this.settings;
        this.bindUIActions();

        //Find the @ within an anchor tag and wrap a span around the element
        var el = $('a');
        el.html(function (i, html) {
            return html.replace('@', '<span class="change-font">@</span>');
        });
    },

    bindUIActions: function() {
        $(document).on('click', '.show-btn', function (e) {
            e.preventDefault();
            showPassword.showPasswordField($(this)[0]);
        });

        $(document).on('click', '.hide-btn', function (e) {
            showPassword.hidePasswordField($(this)[0]);
        });
    },

    showPasswordField: function ($clicked) {
        var passwordField = $($clicked).parent().prev()[0];
        var nextBtn = $($clicked).next()[0];
        
       $(passwordField).attr('type', 'text');
        $($clicked).css('display', 'none');
        $(nextBtn).css('display', 'block');
    },

    hidePasswordField: function ($clicked) {
        var prevBtn = $($clicked).prev()[0];
        var passwordField = $($clicked).parent().prev()[0];
       
       
        $(passwordField).attr('type', 'password');
        $(prevBtn).css('display', 'block');
        $($clicked).css('display', 'none');
    }
};
var _TakePAM = (function () {

  var init = function(){
    //Resetting the PAM settings here
    $('#pam-result-beforeSend').empty();
    pamSettings.naAnswers = 0;
    pamSettings.stronglyDisagreeAnswers = 0;
    pamSettings.agreeAnswers = 0;
    pamSettings.stronglyAgreeAnswers = 0;
    pamSettings.answers=[];
   
    var questionData = _pamQuestionnaireData.init();
    _TemplateLoader.init('pamQuestionnaire', questionData);    
}

  return {
    init: init
  }
}());




var _TemplateLoader = (function (window) {
  'use strict';
  var init = function (tplName, data) {
   var $tplName = tplName || location.hash.split('#')[1] || undefined;
   var $data = data || undefined;
   var Template = Cerdelga.templates[$tplName]($data);
   $('#content').html(Template);
   location.hash = tplName;
   
    // location.hash = tplName;
    // var pathName = location.pathname.split('/')[1];
    // var previousTplName = pathName.substr(0, pathName.indexOf('.')); 
    // var stateObj = {
    //   'Tpl': tplName,
    //   'previous_url': previousTplName
    // };
    // history.pushState(stateObj, tplName, tplName + '.html');

    //On hashchange make the template different
    //console.info('window location ', window.location.hash);

  };

  return {
    init: init
  }
}(window));
var treatmentCentreChoice = {
  
  init: function() {
      this.bindUIActions();
  },

  bindUIActions: function() {
      $('.change-centre').on('click', function(e) {
          e.preventDefault();
          treatmentCentreChoice.showChoiceScreen();
      });
  },

  showChoiceScreen: function () {
      $('form').parent().addClass('hide-me');
      $('.treatment-centre-choice').removeClass('hide-me');
      
  }


};
/* Update Treatment Centre JS */
var _updateTreatmentCentreSettings,
  updateTreatmentCentre = {

    settings: {
      $treatmentCentreEndPoint: 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/',
      $putUrl: ''
    },

    init: function () {
      //   var id;
      //   var url;
      _updateTreatmentCentreSettings = this.settings;
      _updateTreatmentCentreSettings.$id = $('.incorrect-centre').data('id');
      this.bindUIActions();
    },

    bindUIActions: function () {
      $('.incorrect-centre').on('click', function (e) {
        e.preventDefault();
        updateTreatmentCentre.getCentreData();
      });

      // Enable Submit Update Button only if input value is changed
      $('#update-treatment-centre').find('input').on('change', function () {
        updateTreatmentCentre.inputChanged($(this));
      });

      // Update TC 
      $('#update-treatment-centre').on('submit', function (e) {
        e.preventDefault();
        updateTreatmentCentre.updateTreatmentCentre();
      });
      

      // Add TC
      $('.add-new-centre').on('click', function (e) {
        e.preventDefault();
        updateTreatmentCentre.showAddCentre();
      });

      // Reset to Treatment Centre Tab
      $('.reset').on('click', function (e) {
        e.preventDefault();
        updateTreatmentCentre.reset();
      });

    },
    getCentreData: function ($clicked) {
      //Get the input fields value and push it to the next screen
      var $centreName = $('#centreName').val(),
        $unitName = $('#unitName').val(),
        $streetName = $('#streetName').val(),
        $city = $('#city').val(),
        $county = $('#county').val(),
        $postCode = $('#postCode').val(),
        $phoneNumber = $('#phone').val();

      //Align the data to update centre
      $('#updateCentreName').val($centreName);
      $('#updateUnitName').val($unitName);
      $('#updateStreetName').val($streetName);
      $('#updateCity').val($city);
      $('#updateCounty').val($county);
      $('#updatePostCode').val($postCode);
      $('#updatePhoneNumber').val($phoneNumber);

      //UI Show
      updateTreatmentCentre.showMe();
      _updateTreatmentCentreSettings.$putUrl = _updateTreatmentCentreSettings.$treatmentCentreEndPoint + _updateTreatmentCentreSettings.$id;
      console.info('PUT URL: ', _updateTreatmentCentreSettings.$treatmentCentreEndPoint + _updateTreatmentCentreSettings.$id);
    },

    showMe: function () {
      $('form').parent().addClass('hide-me');
      $('.update-treatment-centre').removeClass('hide-me').fadeIn();
    },

    showAddCentre: function () {
      $('.treatment-centre-choice').addClass('hide-me');
      $('.add-treatment-centre').removeClass('hide-me');
    },

    reset: function () {
      $('form').parent().addClass('hide-me');
      $('.view-treatment-centre').removeClass('hide-me');
      $('.treatment-centre-choice').addClass('hide-me');
    },

    //check if Data is changed to enable the button
    inputChanged: function ($input) {
      if ($input.val()) {
        //$(".update-submit").removeAttr('disabled');
      }

    },

    updateTreatmentCentre: function () {
     console.info('id ', _updateTreatmentCentreSettings.$id );
      var $data = {
        "InReview": true,
        "CentreName": $('#updateCentreName').val(),
        "UnitName": $('#updateUnitName').val(),
        "StreetName": $('#updateStreetName').val(),
        "City": $('#updateCity').val(),
        "County": $('#updateCounty').val(),
        "PostCode": $('#updatePostCode').val(),
        "PhoneNumber": $('#updatePhoneNumber').val()
      }

      return $.ajax({
        url: _updateTreatmentCentreSettings.$putUrl,
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify($data),
      }).done(updateTreatmentCentre._success).fail(updateTreatmentCentre._failure);

      console.info('Updated Data', $data);
    },

    _success: function(){
      $('.update-treatment-centre').addClass('hide-me');
      $('.tabs').removeClass('active');
      $('.treatment-centre-review').removeClass('hide-me');
    },

    _failure: function(xhr){
      console.info(xhr.status)
    }




























    // updateCentre: function () {
    //   var centreName = $('#updateCentreName').val();
    //   var unitName = $('#updateUnitName').val();
    //   var streetName = $('#updateStreetName').val();
    //   var city = $('#updateCity').val();
    //   var county = $('#updateCounty').val();
    //   var postCode = $('#updatePostCode').val();
    //   var phoneNumber = $('#updatePhoneNumber').val();

    //   var treatmentCentreData = {
    //     "Id": _updateTreatmentCentreSettings.$id,
    //     "CentreName": centreName,
    //     "UnitName": unitName,
    //     "StreetName": streetName,
    //     "City": city,
    //     "County": county,
    //     "PostCode": postCode,
    //     "PhoneNumber": phoneNumber,
    //     "InReview": true
    //   };


    //   $.ajax({
    //     // url: url, commented as at the moment its not putting it back
    //     url: _updateTreatmentCentreSettings.$treatmentCentreEndPoint + _updateTreatmentCentreSettings.$id,
    //     type: 'PUT',
    //     accessControlAllowOrigin: '*',
    //     contentType: 'application/json',
    //     data: JSON.stringify(treatmentCentreData),
    //     //dataType: 'JSON',
    //     crossDomain: true,
    //     success: function (data, textStatus, jqXHR) {
    //       //console.info('Updated Successfully');
    //       $('.update-treatment-centre').addClass('hide-me');
    //       $('.tabs').removeClass('active');
    //       $('.treatment-centre-review').removeClass('hide-me');

    //     },
    //     error: function (data, textStatus, error) {
    //       console.info('I am failed');
    //     }
    //   });
    // }


  };
var welcomeSettings,
    welcomeSlide = {
        settings: {
            $slide: $('.welcome-slide'),
            $radios: $('.welcome-dots').find('input[type="radio"]'),
            $noshow: $('.no-show-slide')
        },


        init: function () {
            welcomeSettings = this.settings;
            this.bindUIActions();
        },

        bindUIActions: function () {

            //Clicking Dots
            $("input[type='radio']").on('change', function () {
                welcomeSlide.dotsNavigation();
            });

            //Clicking Next Button
            $('.next > a').on('click', function (e) {
                e.preventDefault();
                console.info('hello');
                welcomeSlide.nextNav();
            });

            //Clicking Back Button
            $('.back > a').on('click', function (e) {
                e.preventDefault();
                welcomeSlide.prevNav();
            });


            //Clicking Finish Button
            $('.welcome-btn.finish').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                /* Template Loading and History State */
                _TemplateLoader.init('pamChoice');
            });

            //Clicking Don't Show me these welcome screens
            $('.no-show-slide').on('click', function () {
                welcomeSlide.dontShow();
            });
        },
        
        //Dots Navigation
        dotsNavigation: function () {
            $('.welcome-dots').find('input[type="radio"]').each(function (i, e) {
                var id = $('input[type="radio"]:checked').attr('id');

                $('.welcome-slide').each(function (index) {
                    var screen = $('.welcome-slide[data-id="' + id + '"]');
                    $('.welcome-slide').removeClass('active');
                    screen.addClass('active');
                    var i = index;
                    var pos = index * 1000;
                    //var posAfter = index * 1000 * 2;
                    var currentSlide = $('.welcome-slide.active').next();
                    var pastSlide = $('.welcome-slide.active').prev();

                    if ($(this).hasClass('active')) {
                        $('.welcome-screen-wrapper').css('transform', 'translateX(-' + pos + 'px)');
                        ('-webkit-transform', 'translateX(-' + pos + 'px)');
                        ('-ms-transform', 'translateX(-' + pos + 'px)');
                        ('-moz-transform', 'translateX(-' + pos + 'px)');
                        ('-o-transform', 'translateX(-' + pos + 'px)');
                        //$(this).prev().css('transform', 'translateX(-' + posAfter + 'px)');
                    }

                    if (pastSlide.length > 0) {
                        $('.back').css('display', 'inline-block');
                    } else {
                        $('.back').css('display', 'none');
                    }

                    if (currentSlide.length < 1) {
                        $('.back').css('display', 'inline-block');
                        $('.next').css('display', 'none');
                        $('.finish').css('display', 'inline-block');
                    } else {
                        $('.next').css('display', 'inline-block');
                        $('.finish').css('display', 'none');
                    }
                });
            });
        },

        //Next Navigation
        nextNav: function () {
            var i = $('.welcome-slide.active').next().index() + 1;
            var j = $('.welcome-slide.active').next().index();
            var slide = $('.welcome-slide[data-id="screen-' + i + '"]');
            var input = $('input[name="screen-dots"]');
            $('.welcome-slide').removeClass('active');
            $(slide).addClass('active');

            //Dots controlled for Next Navigation
            $(input).each(function (index) {
                var radioId = 'screen-' + i;
                var activeRadio = $('input[name="screen-dots"][id="' + radioId + '"]');
                $('.welcome-dots').find('input[type="radio"]').attr('checked', false);
                $(activeRadio).prop('checked', true);
            });

            var nextSlide = $(slide).next();
            var idx = $(slide).index() * 1000;
            $('.welcome-screen-wrapper').css('transform', 'translateX(-' + idx + 'px)');
            ('-webkit-transform', 'translateX(-' + idx + 'px)');
            ('-ms-transform', 'translateX(-' + idx + 'px)');
            ('-moz-transform', 'translateX(-' + idx + 'px)');
            ('-o-transform', 'translateX(-' + idx + 'px)');

            if (nextSlide.length > 0) {
                $('.back').css('display', 'inline-block');
            } else {
                $('.next').css('display', 'none');
                $('.finish').css('display', 'inline-block');
            }
        },

        //Back Navigation
        prevNav: function () {
            var i = $('.welcome-slide.active').prev().index() + 1;
            var j = $('.welcome-slide.active').next().index();
            var slide = $('.welcome-slide[data-id="screen-' + i + '"]');
            var input = $('input[name="screen-dots"]');
            $('.welcome-slide').removeClass('active');
            $(slide).addClass('active');

            //Dots controlled for Next Navigation
            $(input).each(function (index) {
                var radioId = 'screen-' + i;
                var activeRadio = $('input[name="screen-dots"][id="' + radioId + '"]');
                $('.welcome-dots').find('input[type="radio"]').attr('checked', false);
                $(activeRadio).prop('checked', true);
            });

            var prevSlide = $(slide).prev();
            var idx = $(slide).index() * 1000;
            $('.welcome-screen-wrapper').css('transform', 'translateX(-' + idx + 'px)');
            ('-webkit-transform', 'translateX(-' + idx + 'px)');
            ('-ms-transform', 'translateX(-' + idx + 'px)');
            ('-moz-transform', 'translateX(-' + idx + 'px)');
            ('-o-transform', 'translateX(-' + idx + 'px)');

            if (prevSlide.length > 0) {
                $('.back').css('display', 'inline-block');
                $('.finish').css('display', 'none');
                $('.next').css('display', 'inline-block');
            } else {
                $('.back').css('display', 'none');
                $('.next').css('display', 'inline-block');
                $('.finish').css('display', 'none');
            }
        },

        //Don't show welcome screen
        dontShow: function () {
            localStorage.setItem('welcomeMsg', 'no');
        }

    };
/*TEW Lib
 * Author   : Leo Jacobs
 * Company  : The Earthworks
 * Email    : leo@the-earthworks.com
 * DOC      : 18.11.2016
 */

// Checking for Namespace if it exists use that or create a new one
(function (window) {
  'use strict';

  function tewLibFunction() {
      var tewLibObj = { 
          //Accordian
          accordian: function (trigger, triggers, contents) {

              $.each(trigger, function (i) {
                  var thisTrigger = trigger[i];
                  var nextItem = $(thisTrigger).next();

                  if (nextItem.is(":visible")) {
                      nextItem.slideUp();
                      $(thisTrigger).removeClass('selected');
                  } else {
                      contents.slideUp();
                      triggers.removeClass('selected');
                      nextItem.slideDown();
                      $(thisTrigger).addClass('selected');
                  }
              });

          },

          //Ajax Utility
          fetchData: function ($endpoint, $method, options) {
              var options = options || {};
              var $data = options.$data || null || undefined;
              var $beforeSend = options.$beforeSend || null || undefined;
              var $dataType = options.$dataType || null;
              return $.ajax({
                  url: $endpoint,
                  type: $method,
                  dataType: $dataType,
                  crossDomain: true,
                  data: $data,
                  beforeSend: $beforeSend
              });
          },

          //Ajax Error Handler
          ajaxErrorHandler: function ($xhrStatus) {
              var errorCode = {
                  0: function () {
                      return 0;
                  },
                  302: function () {
                      return 302;
                  },
                  400: function () {
                      return 400;
                  },
                  401: function () {
                      return 401;
                  },
                  403: function () {
                      return 0;
                  },
                  404: function () {
                      return 404;
                  },
                  409: function() {
                      return 409;
                  },
                  418: function () {
                      return 418;
                  },
                  500: function () {
                      return 500;
                  },
                  502: function () {
                      return 502; 
                  },
                  'default': function () {
                      return 'unknown';
                  }

              };
              return (errorCode[$xhrStatus] || errorCode['default'])();
          }
      };
      return tewLibObj;
  };

  if (typeof (window.TEWLibrary) === 'undefined' || typeof jQuery !== 'undefined') {
      window.TEWLibrary = tewLibFunction();
  }

}(window));