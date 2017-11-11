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
    $nurseEndPoint: 'http://soa-cerdelga.tew-dev.com/api/emsmock/updateUser/',

    //User Data
    $userData: null
  };

  var bindUIActions = function () {
    /* Getting the initial UserData from the session storage */
    _Settings.$userData = JSON.parse(sessionStorage.getItem('userData'));

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
    /* Constructing the data to be sent to update the user info */    
    var $data = {
      "Id": _Settings.$userData.UserId,
      "FullName": newNameValue,
      "Password": _Settings.$userData.Password,
      "TreatmentCentreId": parseInt(_Settings.$userData.TreatmentCentreId)
    };

    //Resetting the userdata in sessionstorage with new value of Treatment Centre ID
    //var userData = JSON.parse(sessionStorage.getItem("userData"));

    _Settings.$userData["FullName"] = $data.FullName;

    sessionStorage.removeItem('userData');
    sessionStorage.setItem('userData', JSON.stringify(_Settings.$userData));

    _APIHandler.init(_Settings.$nurseEndPoint, 'POST', true, _updateFullNameSuccess($data.FullName), _updateNameFail, $data);

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
    var existingPassword = _Settings.$userData.Password;
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

    var $data = {
      "Id": _Settings.$userData.UserId,
      "FullName": _Settings.$userData.FullName,
      "Password": newPasswordValue,
      "TreatmentCentreId": parseInt(_Settings.$selectedItem)
    };


    if (newPasswordValue.length > 0) {
      //Resetting the userdata in sessionstorage with new value of Treatment Centre ID
      _Settings.$userData["Password"] = $data.Password;
      sessionStorage.removeItem('userData');
      sessionStorage.setItem('userData', JSON.stringify(_Settings.$userData));

      _APIHandler.init(_Settings.$nurseEndPoint, 'POST', true, _updatePasswordSuccess($data), _updatePasswordFail, $data);
      
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