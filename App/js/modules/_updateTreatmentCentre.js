/* Update Treatment Centre JS */
var updateTreatmentCentre = {
  init: function () {
      var id;
      var url;
      var treatmentEndPoint = 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/';
      this.bindUIActions();

      // This is to populate the select list to change the treatment centre
      $.ajax({
          url: treatmentEndPoint,
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
          updateTreatmentCentre.getCentreData($(this));
      });

      // Enable Submit Update Button only if input value is changed
      $('#update-treatment-centre').find('input').on('change', function () {
          updateTreatmentCentre.inputChanged($(this));
      });

      // Update TC 
      $('#update-treatment-centre').on('submit', function (e) {
          e.preventDefault();
          updateTreatmentCentre.updateCentre();
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

      //Changing the Centre
      $('.change-centre').on('click', function (e) {
          e.preventDefault();
          updateTreatmentCentre.changeCentre($(this));
      });

  },

  getCentreData: function ($clickedItem) {
      id = $clickedItem.data('id');
      console.info('I am the new id ' + id);

      url = treatmentEndPoint + id;

      //Getting the data to update
      $.ajax({
          url: url,
          type: 'GET',
          dataType: 'JSON',
          success: function (data, jqXHR, textStatus) {
              var centreName = data.CentreName;
              var unitName = data.UnitName;
              var streetName = data.StreetName;
              var city = data.City;
              var county = data.County;
              var postCode = data.PostCode;
              var phoneNumber = data.PhoneNumber;

              //Initial Values of the Fields
              $('#updateCentreName').val(centreName);
              $('#updateUnitName').val(unitName);
              $('#updateStreetName').val(streetName);
              $('#updateCity').val(city);
              $('#updateCounty').val(county);
              $('#updatePostCode').val(postCode);
              $('#updatePhoneNumber').val(phoneNumber);


              //on Success will show the data
              updateTreatmentCentre.showMe();
          },

          error: function (data, jqXHR, textStatus) {
              console.info(jqXHR.statusText);
          }
      });
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
          $(".new-centre-submit").removeAttr('disabled');
      }

  },

  updateCentre: function () {
      var centreName = $('#updateCentreName').val();
      var unitName = $('#updateUnitName').val();
      var streetName = $('#updateStreetName').val();
      var city = $('#updateCity').val();
      var county = $('#updateCounty').val();
      var postCode = $('#updatePostCode').val();
      var phoneNumber = $('#updatePhoneNumber').val();

      var treatmentCentreData = {
          "CentreName": centreName,
          "UnitName": unitName,
          "StreetName": streetName,
          "City": city,
          "County": county,
          "PostCode": postCode,
          "PhoneNumber": phoneNumber,
          "InReview": true
      };


      $.ajax({
          // url: url, commented as at the moment its not putting it back
          url: treatmentEndPoint + id,
          type: 'PUT',
          accessControlAllowOrigin: '*',
         contentType: 'application/json',
          data: JSON.stringify(treatmentCentreData),
          //dataType: 'JSON',
          crossDomain: true,
          success: function (data, textStatus, jqXHR) {
              //console.info('Updated Successfully');
              $('.update-treatment-centre').addClass('hide-me');
              $('.tabs').removeClass('active');
              $('.treatment-centre-review').removeClass('hide-me');
          },
          error: function (data, textStatus, error) {
              console.info('I am failed');
          }
      });
  },

  changeCentre: function ($clickedItem) {
      id = $clickedItem.data('id');
      console.info(id);
  }

};