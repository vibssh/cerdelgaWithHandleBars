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
    $treatmentCentreEndPoint: 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/0', /* 0 is hard coded this should be tied up with the nurse data api  */
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

  var _updateFullName = function(){
    var newNameValue = $('#newName').val();
    
    var formData = {
      "FullName": newNameValue,
      "Email": $('#email').val(),
      "Password": $('#password').val()
    };

    TEWLibrary.fetchData(_Settings.nurseEndPoint, 'PUT', { $data: formData }).done(_updateFullNameSuccess).fail(_updateNameFail);
  };
 
  var _updateFullNameSuccess = function(data){
    $('.name-edit-block').hide();
    $('#newName').val('');
    //Updating the exisiting input field
    $('#fullName').val(data.FullName);
    $('#nurse-name-form').find('.form-field').css('display', 'block');

    // Just for Display Purpose 
    var fullName = data.FullName;
    var firstName = FullName.substring(0, FullName.indexOf(' '));

    $('.nurse-title').text(fullName);
    $('.link-profile').text(firstName);
  };

  var _updateNameFail = function(xhr){
    console.info(xhr.status);
  };

  return {
    init: bindUIActions
  }

}(window));