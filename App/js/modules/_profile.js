var _Profile = (function (window) {
  'use strict';

  var _Settings = {
    // Tabs
    $trigger: $('.nurse-tab-link'),
    $tabs: $('.tabs'),

    /* Currently hard Coded to be 0 but when we get the login API we can tie this to the user profile */
    $nurseEndPoint: 'http://soa.cerdelga.tew-staging.com/api/Nurse/0',
    $treatmentCentreEndPoint: 'http://soa.cerdelga.tew-staging.com/api/TreatmentCentre/0', /* 0 is hard coded this should be tied up with the nurse data api  */

    $profileData : {'Nurse': [], 'TreatmentCentre':[]}
   
  };


  // Tabs
  var _nurseViewTabs = function ($clickedItem) {
    var tabId = $clickedItem.data('tab');
    var tab = $('.tabs[data-tab="' + tabId + '"]');

    // Remove Active from all the Triggers and only add to the clicked one
    $('.nurse-tab-link').removeClass('active');
    $clickedItem.addClass('active');

    // Remove Active from all Tabs and add to the clicked one
    $('.tabs').removeClass('active');
    tab.addClass('active');
  };

  // Nurse Data GET
  var _getNurseData = function () {
    $('.link-profile').unbind('click'); // To avoid multiple clicks if the data is taking longer to come through from the server
    //Ajax Call Here using Multiple Simultaenous call
    return $.when(
      $.get(_Settings.$nurseEndPoint, function(data){
        _Settings.$profileData.Nurse.push(data);
      }),

      $.get(_Settings.$treatmentCentreEndPoint, function(data){
        _Settings.$profileData.TreatmentCentre.push(data);
      })
    ).then(_getNurseSuccess);



    //TEWLibrary.fetchData(_Settings.$nurseEndPoint, 'GET', {}).done(_getNurseSuccess).fail(_getNurseFailure);
  };

  var _getNurseSuccess = function () {
    /* This will render the Template */
    var $data = _Settings.$profileData;
    console.info('Nurse Data', $data);
    _TemplateLoader.init('profile', $data);
    $('.link-profile').bind('click'); // Rebinding the click event so that user can go back in the profile section if need be
  }

  var _getNurseFailure = function (xhr) {
    console.info(xhr.status);
  }




  var bindUIActions = function () {

    /* Nurse / Patient Name click Event on the top  */
    $('.link-profile').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      //Call Nurse Api to load the data
      _getNurseData();
    });


    //Tabs
    $(document).on('click','.nurse-tab-link', function (e) {
      e.preventDefault();
      console.info('hello i am clicked');
      _nurseViewTabs($(this));
    });



  };




  // 
  return {
    init: bindUIActions
  }
}());