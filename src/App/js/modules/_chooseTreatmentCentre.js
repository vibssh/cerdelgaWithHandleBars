/**
* Module : _ChooseTreatmentCentre
* Public Api : _ChooseTreatmentCentre.init();
* Created on : 24/10/2017
* Author : Leo Jacobs
*/
 
var _ChooseTreatmentCentre = (function(window){
'use strict';

  var _Settings = {
    $chooseTreatmentCentreEndPoint : 'http://soa-cerdelga.tew-dev.com/api/TreatmentCentre',
    $updateTreatmentCentreEndPoint : 'http://soa-cerdelga.tew-dev.com/api/emsmock/updateUser',
    $selectedItem: null
  }

  /* Methods*/
  var _displayChoiceScreen = function(){
    $('form').parent().addClass('hide-me');
    $('.treatment-centre-choice').removeClass('hide-me');
  };

  var _optionSelected = function(){
    _Settings.$selectedItem = $('#chooseTreatmentCentre').find(':selected').val();
    console.info('OptionSelected', _Settings.$selectedItem);
  };

  var _updateData = function(){
    //Construct the Data to post to the updateUser Endpoint
    var userData = JSON.parse(sessionStorage.getItem("userData"));
    
    var $data = {
     "Id": userData.UserId,
     "FullName": userData.FullName,
     "Password": userData.Password,
     "TreatmentCentreId": parseInt(_Settings.$selectedItem)
    };

    //Resetting the userdata in sessionstorage with new value of Treatment Centre ID
    var userData = JSON.parse(sessionStorage.getItem("userData"));
        
    userData["TreatmentCentreId"] = $data.TreatmentCentreId;
    console.info('Nurse Success UserData ', userData);
    
    sessionStorage.removeItem('userData');
    sessionStorage.setItem('userData', JSON.stringify(userData));

    console.info('Update Data ', $data);
    _APIHandler.init(_Settings.$updateTreatmentCentreEndPoint, 'POST', true, _success, _failure, $data);
  };
  

  var _success = function(){
    //Getting newly Selected Treatment Centre Data
    TEWLibrary.fetchData(_Settings.$chooseTreatmentCentreEndPoint + "/" + parseInt(_Settings.$selectedItem), 'GET').done(_fetchSuccess).fail(_failure);

  };

  var _fetchSuccess = function(data){
    $('#centreName').val(data.CentreName);
    $('#unitName').val(data.UnitName);
    $('#streetName').val(data.StreetName);
    $('#city').val(data.City);
    $('#county').val(data.County);
    $('#postCode').val(data.PostCode);
    $('#phone').val(data.PhoneNumber);
   $('form').parent().addClass('hide-me');
   $('.view-treatment-centre').removeClass('hide-me');
  };

  var _failure = function(xhr){
    console.info(xhr.status);
  };

 /* Events */
  var _bindUIActions = function(){ 
    //Display the Treatment Choice Screen on click of change-centre link
    $(document).on('click', '.change-centre', function(e){
      e.preventDefault();
      console.info('Change Centre is clicked');
      _displayChoiceScreen();
    });

    //Option selected Event
    $('#chooseTreatmentCentre').on('change',function(){
      _optionSelected();
    });

    //Once option is selected - Submit Event 
    $('.new-centre-submit').on('click', function(e){
      e.preventDefault();
      _updateData();      
    });
    
  };

  
 
  return {
    init: _bindUIActions
  }
}(window));