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