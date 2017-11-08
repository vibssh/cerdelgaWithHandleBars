//Reset password JS
/**
 * Currently the valid data to pass in reset page is with old password being P@55w0rd
 */


var resetSettings,
resetPassword = {
    settings : {
        $resetEndPoint: 'http://soa.tew-dev.com/api/emsmock/passwordreset',
        $resetVerifyEndPoint: 'http://soa-cerdelga.tew-dev.com/api/emsmock/passwordResetLoad'
    },

    init: function() {
        resetSettings = this.settings;
        this.bindUIActions();

        /* on Load checking if the token and email are valid  */
        //capture the email and token to post to reset verify endpoint and on success show the reset password form else on error show error screen
        var email = _VerifyEmailUrl.getUrlParameter('email');
        var token = _VerifyEmailUrl.getUrlParameter('token');
       
        // Data to post to verify endpoint
      var resetPostData = {
        'Email': email,
        'Token': token
      };

         //Ajax Call Here
      TEWLibrary.fetchData(resetSettings.$resetVerifyEndPoint, 'POST', {
        $data: resetPostData
      }).done(resetPassword._resetVerifySuccess).fail(resetPassword._resetVerifyFailure);
    },

    bindUIActions: function() {
        $(document).on('click', '.reset-ready', function (e) {
            e.preventDefault();
            resetPassword.resetPass();
        });
    },


    _resetVerifySuccess: function(){
        $('#reset-pwd-form').fadeIn();
    },

    _resetVerifyFailure: function(){
        $('#invalid-resetData').fadeIn();
    },


    updatePassword: function() {
        //Capture the data to be updated
        var updatedPasswordValue = $('#resetPassword').val();

        /* The data below is hardcoded needs to be dynamic when we get the api sorted by 3rd party */
        var postData = {
            "fullName": "Tom Jerry",
            "email": "tom@jerry.com",
            "password": updatedPasswordValue,
            "treatmentCentreChosen": "Treatment Centre 1",
            "id": 1
        }

        var urlToPost = resetSettings.$resetEndPoint + "/" + 1; // 1 is the id of the patient. This needs to captured either by giving a data attr to the reset button or from backend 
        
        //Do Ajax posting here
        TEWLibrary.fetchData(urlToPost, 'PUT', {$data: postData, $beforeSend: resetPassword.updatePasswordBeforeSend}).done(resetPassword.updatePasswordSuccess).fail(resetPassword.updatePasswordFail);
    },

    //Reset password

    resetPass: function () {
        //Capture the data to be updated
        var email = $('#emailResetPassword').val();
        var oldPass = $('#oldResetPassword').val();
        var newPass = $('#resetPassword').val();

        /* The data below is hardcoded needs to be dynamic when we get the api sorted by 3rd party */
        var postData = {

            "Email": email,
            "Password": oldPass,
            "NewPassword": newPass
        };
        
        //Do Ajax posting here
        TEWLibrary.fetchData(resetSettings.$resetEndPoint, 'POST', { $data: postData, $beforeSend: resetPassword.updatePasswordBeforeSend }).done(resetPassword.updatePasswordSuccess).fail(resetPassword.updatePasswordFail);
    },

    updatePasswordBeforeSend: function() {
        //Animation of posting data
        var divLoading = '<div class="loading">' + '<img src="/images/icons/loading.gif"/>' + '</div>';
        console.info('before send triggerd', divLoading);
        $('.login-form').append(divLoading);
    },

    updatePasswordSuccess: function(data) {
        //If Ajax update successful run this method
        $('.loading').remove();
        $('#reset-pwd').hide();
        $('#login-error-message').hide();
        $('.forgotten-success').addClass('reveal');
    },

    updatePasswordFail: function(xhr) {
        //If Ajax update failed run this method
        $('.loading').remove();
        var xhrStatus = xhr.status;
        var status = TEWLibrary.ajaxErrorHandler(xhrStatus);
        var errorBody = "<div>" + "<img src='/images/icons/" + status + ".png'/>" + "</div>";
        $('#login-error-message').find('.panel-heading').html('Server returned ' + status);
        $('#login-error-message').find('.panel-body').html(errorBody);
        $('#login-error-message').fadeIn();
    }

};