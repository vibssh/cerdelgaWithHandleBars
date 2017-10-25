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