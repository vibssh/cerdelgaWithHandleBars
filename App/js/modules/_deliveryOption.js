// Personalised Pack Delivery Options 
var s,
    deliveryOptions = {
        settings: {
            $trigger: $('.pam-choice-content'),
            $continue: $('.continue-btn'),
            $container: $('#pam-questionnaire'),
            $deliveryEndPoint: 'http://localhost:3000/homeDelivery'
        },
        init: function ($container) {
            s = this.settings;
            s.$container = $container;
            this.bindUIActions();
        },

        bindUIActions: function () {

            //Choosing the Delivery Options
            $(document).on('click', '.pam-choice-content', function (e) {
                e.preventDefault();
                deliveryOptions.delivery($(this));
            });

            //Continue Button on Step 1 to move to Step 2
            $(document).on('click', '#step-2', function (e) {
                e.preventDefault();
                deliveryOptions.stepCompleted();
            });

            //Continue Button on Step 2 to move to Step 3
            $(document).on('click', '#step-home-3', function (e) {
                e.preventDefault();
                //Data to Post for Home Delivery
                var $homeData = {
                    "FullName": $('#fullDeliveryName').val(),
                    "HouseName": $('#houseDeliveryName').val(),
                    "StreetName": $('#streetDeliveryName').val(),
                    "City": $('#deliveryCity').val(),
                    "County": $('#deliveryCounty').val(),
                    "PostCode": $('#deliveryPostCode').val(),
                    "PhoneNumber": $('#deliveryPhoneNumber').val()
                };

                console.info('Data Captured', $homeData);
                //Post Data for Home Delivery
                TEWLibrary.fetchData(s.$deliveryEndPoint, 'POST', {
                    $data: $homeData
                }).done(deliveryOptions.homeDeliverySuccess).fail(deliveryOptions.homeDeliveryFailure);

            });

            //Continue Button on Step 2 to move to Step 3
            $(document).on('click', '#step-treatment-3', function (e) {
                e.preventDefault();
                deliveryOptions.stepToPAM();
            });

            $(document).on('click', '.home-choice-btn', function (e) {
                $('#home-address').css('display', 'block');
                //Adding Delivery Choice in the local storage to be used when the process is completed and pack is sent for collation
                sessionStorage.removeItem('deliveryChoice');
                sessionStorage.setItem('deliveryChoice', 'Home');
            });

            $(document).on('click', '.treatment-choice-btn', function (e) {
                $('#treatment-address').css('display', 'block');
                //Adding Delivery Choice in the local storage to be used when the process is completed and pack is sent for collation
                sessionStorage.removeItem('deliveryChoice');
                sessionStorage.setItem('deliveryChoice', 'Treatment-Centre');
            });

            $(document).on('click', '.dose-btn', function (e) {
                e.preventDefault();
                $('.continue-btn').css('visibility', 'visible');
                deliveryOptions.dosingLevel($(this));
            });

            $(document).on('click', '.ghost-btn', function () {
                deliveryOptions.personalisedBack($(this));
            });

            $(document).on('click', '.skip-pam', function(e){
                e.preventDefault();
                console.info('skipping Pam');
            });
        },


        /* Home Delivery Data Posting */
        homeDeliverySuccess: function (data) {
            console.info('Data Posted ', data);
            var questionData = _pamQuestionnaireData.init();
            _TemplateLoader.init('pamQuestionnaire', questionData);
        },

        //Ajax Failure
        homeDeliveryFailure: function (xhr) {
            var xhrStatus = xhr.status;
            var status = TEWLibrary.ajaxErrorHandler(xhrStatus);
            var errorBody = "<div>" + "<img src='/images/icons/" + status + ".png'/>" + "</div>";
            $('#login-error-message').find('.panel-heading').html('Server returned ' + status);
            $('#login-error-message').find('.panel-body').html(errorBody);
            $('#login-error-message').fadeIn();
        },


        //Step Counter Getting Completed Class
        stepCompleted: function () {
            var stepCircle = $('.step-title-container').find('li.active');
            stepCircle.removeClass('active').addClass('completed');
            var sibling = $('.completed').next('li');
            sibling.addClass('active');
            $('.select-delivery').hide();
            $('.general-details').removeClass('hide-me');
        },

        stepToPAM: function () {
            var stepCircle = $('.step-title-container').find('li.active');
            stepCircle.removeClass('active').addClass('completed');
            var sibling = $('.completed').next('li');
            sibling.addClass('active');
           
            var questionData = _pamQuestionnaireData.init();
            var tplName = 'pamQuestionnaire';
            var Template = Cerdelga.templates[tplName](questionData);
            $('.general-details').html(Template);
            location.hash = tplName;
            $('.skip-pam').removeClass('hide-me');

            // $.get(url, function (data) {
            //     $(element).html(data);
            //     $('.skip-pam').removeClass('hide-me');
            // });
        },


        dosingLevel: function ($clickedItem) {
            var doseLevel = $($clickedItem)[0].dataset.dose; // Capture dose info on click
            //check if dose exist in the localstorage if it does remove it and set the new value based on clicked item
            if (sessionStorage.getItem("dose") !== null) {
                sessionStorage.removeItem("dose");
                sessionStorage.setItem("dose", doseLevel);
            } else {
                sessionStorage.setItem("dose", doseLevel);
            }
        },

        delivery: function ($clickedItem) {
            $('.pam-choice-content').removeClass('selected');
            $clickedItem.addClass('selected');
            var choiceClass = $($clickedItem)[0].dataset.choice;
            if ($('#step-2').hasClass('treatment-choice-btn')) {
                $('#step-2').removeClass('treatment-choice-btn');
            }
            if ($('#step-2').hasClass('home-choice-btn')) {
                $('#step-2').removeClass('home-choice-btn');
            }
            $('#step-2').addClass(choiceClass).css('visibility', 'visible');
        },

        personalisedBack: function ($clicked) {
            var parentElement = $($clicked).closest('[id]');
            $(parentElement[0]).hide();
            $('.general-details').addClass('hide-me');
            $('a.continue-btn').css('visibility', 'hidden');
            $('.select-delivery').show();
            $('.step-title-container').find('li.active').removeClass('active');
            $('.step-title-container').find('li.completed').removeClass('completed').addClass('active');
        }

    };