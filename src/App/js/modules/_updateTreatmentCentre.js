/* Update Treatment Centre JS */
var _updateTreatmentCentreSettings,
  updateTreatmentCentre = {

    settings: {
      $treatmentCentreEndPoint: 'http://soa-cerdelga.tew-dev.com/api/TreatmentCentre/',
      $putUrl: ''
    },

    init: function () {
      //   var id;
      //   var url;
      _updateTreatmentCentreSettings = this.settings;
      _updateTreatmentCentreSettings.$id = $('.incorrect-centre').data('id');
      this.bindUIActions();
      $.ajax({
        url: _updateTreatmentCentreSettings.$treatmentCentreEndPoint,
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