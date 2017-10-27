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
       
        loginValidation.resetValidate($('#reset-password'));

        //Enable login submit button
        $("#login input").on('keyup', function () {
            loginValidation.enableMe($('#login'));
        });

        if(loginSettings.isValid){
            loginValidation.enableMe($('#login'));
        }

       

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