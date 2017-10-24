/**
* Module : _ChooseTreatmentCentre
* Public Api : _ChooseTreatmentCentre.init();
* Created on : 24/10/2017
* Author : Leo Jacobs
*/
 
var _ChooseTreatmentCentre = (function(window){
'use strict';

  var _Settings = {
    $chooseTreatmentCentreEndPoint : 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/',
    $selectedItem: null
  }

  /* Methods*/
  var _displayChoiceScreen = function(){
    $('form').parent().addClass('hide-me');
    $('.treatment-centre-choice').removeClass('hide-me');
  };

  var _optionSelected = function(){
    _Settings.$selectedItem = null;
    _Settings.$selectedItem = $('#chooseTreatmentCentre').find(':selected').val();
    console.info(_Settings.$selectedItem);
    
  
  };

  var _fetchData = function(){
    return $.ajax({
      url: _Settings.$chooseTreatmentCentreEndPoint + _Settings.$selectedItem,
      type: 'GET'
    }).done(_success).fail(_failure);
  };

  var _success = function(data){
    console.info(data);
    //For UI only Remove Existing item from the TreatmentCentre 
    $('#centreName').val(data.CentreName);
    $('#unitName').val(data.UnitName);
    $('#streetName').val(data.StreetName);
    $('#city').val(data.City);
    $('#county').val(data.County);
    $('form').parent().addClass('hide-me');
    $('.view-treatment-centre').removeClass('hide-me');
  };

  var _failure = function(xhr){
    console.info(xhr.status);
  };

 /* Events */
  var _bindUIActions = function(){
    $.ajax({
      url: 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/',
      type: 'GET',
      success: function (data, jqXHR, textStatus) {
        console.info(data);
        $.each(data, function (index, treatmentcentre) {
          //console.info(treatmentcentre);
          $('#chooseTreatmentCentre').append('<option value="' + treatmentcentre.Id + '">' + treatmentcentre.CentreName + '</option>');
          //nurseViewSettings.$treatmentCentreId = data[0].treatmentcentre.Id;
        });
      },
      error: function (data, xhr, textStatus) {
        console.info(xhr);
      }
    });

    //Display the Treatment Choice Screen on click of change-centre link
    $('.change-centre').on('click', function(e){
      e.preventDefault();
      _displayChoiceScreen();
    });

    //Option selected Event
    $('#chooseTreatmentCentre').on('change',function(){
      _optionSelected();
    });

    //Once option is selected - Submit Event 
    $('.new-centre-submit').on('click', function(e){
      e.preventDefault();
      _fetchData();
    });
    
  };

  
 
  return {
    init: _bindUIActions
  }
}(window));