var registrationSettings,
    registration = {
        settings: {
            $treatmentCentreEndPoint : 'http://soa-cerdelga.tew-dev.com/api/TreatmentCentre'
        },

        /* Initialize the Module */
        init: function ($endPoint) {
            registrationSettings = this.settings;
            registrationSettings.$registrationEndPoint = $endPoint;
            registrationSettings.$newUserData = [];
            this.bindUIActions();

            // Password Validator  - for Jquery validation
            /**
             * To allow on NHS Email through ... client side validation 
             */
            $.validator.addMethod("domain", function (value, element) {
                return this.optional(element) || ['nhs.com'].indexOf(value.split('@').pop()) != -1;
            }, 'Enter a valid email address');


            $.validator.addMethod("pwcheck", function (value) {
                // debugger;
                return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
                    &&
                    /[a-z]/.test(value) // has a lowercase letter
                    &&
                    /[A-Z]/.test(value) // has uppercase letter
                    &&
                    /[0-9]/.test(value) // has number
                    &&
                    /[~`!#$%_@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(value);
            });

            $.validator.addMethod("namecheck", function (value, element) {
                return value.indexOf(' ') === -1 ? false : true;
            });
        },

        /* Bind Events */
        bindUIActions: function () {

            //Step Completed
            $(document).on('click', '.continue-setup-btn a.active', function (e) {
                e.preventDefault();
                /* Capturing the data to post */
                var registrationNurseData = {
                    "Email": $('#RegEmail').val(),
                    "FullName": $('#RegFullName').val(),
                    "Password": $('#RegPassword').val()
                };

                /* Push the collected data to the New User Array */
                registrationSettings.$newUserData.push(registrationNurseData);
                registration.stepCompleted();


                /* Getting the List of treatment Centres */
                $.ajax({
                    url: registrationSettings.$treatmentCentreEndPoint,
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (data, jqXHR, textStatus) {
                        console.info(data);
                        $.each(data, function (index, treatmentcentre) {
                            //console.info(treatmentcentre);
                            $('#chooseTreatmentCentre').append('<option value="' + treatmentcentre.Id + '">' + treatmentcentre.CentreName + '</option>');
                            //nurseViewSettings.$treatmentCentreId = data[0].treatmentcentre.Id;
                        });
                    },
                    error: function (data, jqXHR, textStatus) {
                        console.info(textStatus.statusText);
                    }
                });

               // console.info('CONTINUE BUTTON CLICKED DATA', registrationSettings.$newUserData);
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
                var treatmentCentreSelected = $('#chooseTreatmentCentre option:selected').attr('value');
                // console.info('The data to be sent ', registrationSettings.$newUserData);
                // console.info('Treatment Centre Selected ID', treatmentCentreSelected);
                //Adding treatment Centre choosen 
                if (treatmentCentreSelected !== 0 || treatmentCentreSelected === null || treatmentCentreSelected === undefined){
                    registrationSettings.$newUserData[0]["TreatmentCentreChosen"] = parseInt(treatmentCentreSelected);
                 } else {
                    registrationSettings.$newUserData[0]["TreatmentCentreChosen"] = 0;
                 }
                
                


                //var treatmentCentreSelected = $('#chooseTreatmentCentre option:selected')[0].innerText; // Capturing the Chosen Treatment Centre
                //registrationSettings.$newUserData[0]['treatmentCentreChosen'] = treatmentCentreSelected; // To add key value to exisiting User Object

                //Ajax POSTING
                TEWLibrary.fetchData(registrationSettings.$registrationEndPoint, 'POST', {
                    $data: registrationSettings.$newUserData[0],
                    $beforeSend: registration.beforeSend
                }).done(registration.registrationSuccess).fail(registration.registrationFailure);
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

                //Event Triggered as you type in the input boxes
                onkeyup: function (el, e) {
                    $(el).valid();
                },
                rules: {

                    RegFullName: {
                        required: true,
                        namecheck: true,
                        minlength: 2
                    },

                    RegEmail: {
                        required: true,
                        email: true,
                        domain: true
                    }
                },

                messages: {
                    RegFullName: {
                        required: "We need your Full name to create your profile and address you",
                        namecheck: "Your full name must be entered like so : John Doe"
                    },

                    RegEmail: {
                        required: "We need your email address to contact you",
                        email: "Your email address must be in the format of name@domain.com"
                       // domain: "Only NHS email address is allowed to login the system"

                    }
                }
            });




            $('input').on('blur keyup', function () {
                if ($('#registration-form').valid()) {
                    //$('.new-password-validation').removeClass('showMe');// checks form for validity
                    $('.continue-setup-btn a').removeClass('disabled'); // enables button
                    $('.continue-setup-btn  a').addClass('active');

                } else {
                    $('.continue-setup-btn a').addClass('disabled'); // enables button
                    $('.continue-setup-btn a').removeClass('active'); // disables button
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
            $('#login-error-message').find('.panel-body').append('<h4 style="text-align: center;">' + $('#RegFullName').val() + '</h4>');
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