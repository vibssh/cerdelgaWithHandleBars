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
    $strength: $('.new-password-item').find('.strength')
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

  };

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






  return {
    init: bindUIActions
  }

}(window));